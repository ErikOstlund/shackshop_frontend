import React from 'react';
import { useQuery, useMutation } from '../../lib/api';
import {
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
	// using custom useQuery hook to get Listings
	const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

	// using custom useMutation hook to delete a Listing
	const [
		deleteListing,
		{ loading: deleteListingLoading, error: deleteListingError }
	] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

	const handleDeleteListing = async (id: string) => {
		await deleteListing({ id });

		refetch();
	};

	const listings = data ? data.listings : null;

	const allListings = listings ? (
		<ul>
			{listings.map((listing) => {
				return (
					<li key={listing.id}>
						{listing.title}
						<button onClick={() => handleDeleteListing(listing.id)}>
							Delete
						</button>
					</li>
				);
			})}
		</ul>
	) : null;

	if (loading) {
		return <h2>Loading...</h2>;
	}

	if (error) {
		return <h2>Oops! Server error. Try again later.</h2>;
	}

	const deleteListingLoadingMessage = deleteListingLoading ? (
		<h4>Deleting...</h4>
	) : null;

	// deleting error
	const deleteListingErrorMessage = deleteListingError ? (
		<h4>Oops! Server error. Try again later.</h4>
	) : null;

	return (
		<div>
			<h2>{title}</h2>
			{allListings}
			{deleteListingLoadingMessage}
			{deleteListingErrorMessage}
		</div>
	);
};
