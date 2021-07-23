import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Listing } from './listing.schema';

// User document
export type UserDocument = User & Document;

// Creating User schema
@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Listing' }] })
  listings: Listing[];

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: Date.now() })
  signUpDate: Date;
}

// Exporting user model
export const UserSchema = SchemaFactory.createForClass(User);
