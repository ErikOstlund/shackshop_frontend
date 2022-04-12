import React, { useState, useEffect } from 'react';
import { server } from '../../lib/api';
import {
	Listing,
	ListingsData,
	DeleteListingData,
	DeleteListingVariables
} from './types';

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBaths
      numOfBeds
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
	title: string;
}

export const Listings = ({ title }: Props) => {
	const [listings, setListings] = useState<Listing[]>([]);

	useEffect(() => {
		fetchListings();
	}, []);

	const fetchListings = async () => {
		const { data } = await server.fetch<ListingsData>({ query: LISTINGS });

		setListings(data.listings);
	};

	const deleteListing = async (id: string) => {
		await server.fetch<DeleteListingData, DeleteListingVariables>({
			query: DELETE_LISTING,
			variables: {
				id
			}
		});
		setListings(listings.filter((listing) => listing.id !== id));
	};

	const allListings = listings ? (
		<ul>
			{listings.map((listing) => {
				return (
					<li key={listing.id}>
						{listing.title}
						<button onClick={() => deleteListing(listing.id)}>Delete</button>
					</li>
				);
			})}
		</ul>
	) : null;

	return (
		<div>
			<h2>{title}</h2>
			{allListings}
		</div>
	);
};
