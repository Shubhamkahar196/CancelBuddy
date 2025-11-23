import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN_DAYS = Number(process.env.JWT_EXPIRES_IN_DAYS || 7);

if(!JWT_SECRET){
    console.warn("JWT_SECRET is not defined. set in your .env file");
}

export type JwtPayload = {
    userId: string;
    email: string;
    plan: "FREE" | "PRO" | "ENTERPRISE";
}

/**
 * Sign an auth token (used on signup/login)
 */

export function signAuthToken(payload: JwtPayload): string{
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not set in environment");
    }

    return jwt.sign(payload, JWT_SECRET,{
        expiresIn: `${JWT_EXPIRES_IN_DAYS}d`  //7d
    })
}

/**
 * Verify token and return payload, or null if invalid/expired
 */


export function verifyAuthToken(token:string):JwtPayload | null {
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not set in environment");
    }

    try {
        return jwt.verify(token,JWT_SECRET) as JwtPayload;
    } catch  {
        return null
    }
}