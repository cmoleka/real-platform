/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Listing, ListingDocument } from '../../schemas/listing.schema';

@Injectable()
export class ListingsService {
  constructor(
    @InjectModel(Listing.name)
    private readonly listingModel: Model<ListingDocument>,
  ) {}

  async createListing(createListingDto): Promise<Listing> {
    const createListing = new this.listingModel(createListingDto);
    return createListing.save();
  }

  async getListings() {
    const listings = await this.listingModel.find().exec();
    return listings.map((list) => list);
  }

  async getSingleListing(listingId: string) {
    const listing = this.findListing(listingId);
    return listing;
  }

  async updateListing(listingId: string, updateData) {
    const updatedListing = await this.listingModel.updateOne(
      { _id: listingId },
      updateData,
      { new: true, upsert: true, rawResult: true },
    );
    return updatedListing;
  }

  async deleteListing(listingId: string) {
    await this.listingModel.deleteOne({ _id: listingId }).exec();
  }

  private async findListing(id: string): Promise<Listing> {
    let listing;
    try {
      listing = await this.listingModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find listing.');
    }
    if (!listing) throw new NotFoundException('Could not find listing.');
    return listing;
  }
}
