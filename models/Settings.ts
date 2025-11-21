import mongoose ,{Schema,Document} from 'mongoose'

export interface ISettings extends Document {
    userId: Types.ObjectId;
    defaultRemainderDays: number;
    notificationChannels: {channel: string; enabled: boolena}[];
    locale?: string;
    timezone?: string;
    createdAt: Date;
    updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>({
    userId: {
        types: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    defaultRemainderDays: {
        type: Number,
        default: 3
    },
    notificationChannels: [{channel: String, enabled: Boolean}],
    locale: {type: String},
    timezone: {
        type: String
    }
},{timestamps: true});

SettingsSchema.index({userId: 1},{unique: true});

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema)