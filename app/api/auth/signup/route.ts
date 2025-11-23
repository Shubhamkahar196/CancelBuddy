import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Settings from "@/models/Settings";
import AuditLog from "@/models/AuditLog";
import { signUpSchema } from "@/schemas/signUpSchema";
import { signAuthToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const parsed = signUpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten(), message: "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, password, timezone } = parsed.data;

    // 🔒 Extra safety for TS + runtime
    if (!password) {
      return NextResponse.json(
        { ok: false, message: "Password is required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json(
        { ok: false, message: "Email already in use" },
        { status: 409 }
      );
    }

    // ✅ TS now knows password is string, not string | undefined
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      timezone: timezone || "Asia/Kolkata",
    });

    // Create default settings
    await Settings.create({
      userId: user._id,
      timezone: user.timezone,
      locale: user.locale,
    });

    // Audit log
    await AuditLog.create({
      actorUserId: user._id,
      action: "USER_SIGNUP",
      resourceType: "USER",
      resourceId: user._id.toString(),
      detail: { email: user.email },
    });

    // JWT
    const token = signAuthToken({
      userId: user._id.toString(),
      email: user.email,
      plan: user.plan,
    });

    const res = NextResponse.json(
      {
        ok: true,
        message: "Signup successful",
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          plan: user.plan,
          timezone: user.timezone,
        },
      },
      { status: 201 }
    );

    const isProd = process.env.NODE_ENV === "production";

    res.cookies.set("cb_token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: Number(process.env.JWT_EXPIRES_IN_DAYS || 7) * 24 * 60 * 60,
    });

    return res;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
