export interface ListingInterface {
    title: string;
    refNumber: string;
    images: string[];
    location: {
        address: string;
        city: string;
        neighborhood: string;
        country: string;
    };
    price: string;
    propertyType: string;
    postedBy: string;
    contact: {
        phones: string[];
        emails: string[];
    };
    details: {
        description: string[];
        numRooms: string;
        numToilets: string;
        numBaths: string;
    };
    addedOn: Date;
}
