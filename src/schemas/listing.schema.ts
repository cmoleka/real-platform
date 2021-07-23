import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Listing document
export type ListingDocument = Listing & Document;

// Creating Listing Schema, modeled after Listing interface.
@Schema()
export class Listing {
  @Prop({ required: true })
  title: string;

  @Prop([String])
  images: string[];

  @Prop(
    raw({
      address: { type: String },
      city: { type: String },
      neighborhood: { type: String },
      country: { type: String },
    }),
  )
  location: Record<string, any>;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  propertyType: string;

  @Prop()
  postedBy: string;

  @Prop(
    raw({
      phones: { type: [String] },
      emails: { type: String },
    }),
  )
  contact: Record<string, any>;

  @Prop(
    raw({
      description: { type: String },
      numRooms: { type: String },
      numToilets: { type: String },
      numBaths: { type: String },
    }),
  )
  details: Record<string, any>;

  @Prop({ default: Date.now() })
  addedOn: Date;
}

// Exporting Listing model
export const ListingSchema = SchemaFactory.createForClass(Listing);
