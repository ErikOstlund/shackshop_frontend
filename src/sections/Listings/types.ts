interface Listing {
	id: string;
	title: string;
	image: string;
	address: string;
	price: number;
	numOfGuests: number;
	numOfBeds: number;
	numOfBaths: number;
	rating: number;
}

// this is what's returned from api call
export interface ListingsData {
	listings: Listing[];
}
