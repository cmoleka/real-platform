/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post('create')
  async createListing(@Body() createListingDto) {
    const listing = await this.listingsService.createListing(createListingDto);
    return listing;
  }

  @Get()
  async getAllListings() {
    const listings = await this.listingsService.getListings();
    return listings;
  }

  @Get('single')
  getListing(@Query('id') listId: string) {
    return this.listingsService.getSingleListing(listId);
  }

  @Patch('update')
  async updateListing(@Query('id') listId, @Body() updateListingDto) {
    await this.listingsService.updateListing(listId, updateListingDto);
  }

  @Delete('remove')
  async removeListing(@Query('id') listId: string) {
    await this.listingsService.deleteListing(listId);
  }
}
