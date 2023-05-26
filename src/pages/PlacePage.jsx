import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddressLink from '../components/AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import BookingWidget from '../components/BookingWidget';
import ClipLoader from 'react-spinners/ClipLoader';

export default function PlacePage() {
	const { id } = useParams();
	const [place, setPlace] = useState(null);
	let [loading, setLoading] = useState(false);
	useEffect(() => {
		if (!id) {
			return;
		}
		setLoading(true);
		axios.get(`/api/places/${id}`).then((response) => {
			setPlace(response.data);
			setLoading(false);
		});
	}, [id]);

	if (!place) return '';

	return (
		<div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
			<h1 className="text-3xl">{place.title}</h1>
			<AddressLink>{place.address}</AddressLink>
			<PlaceGallery place={place} />
			<div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
				<div className="bg-white p-5 md:p-0 shadow-lg rounded-2xl flex flex-col justify-start md:justify-center items-start md:items-center">
					<div className="my-4">
						<h2 className="font-semibold text-2xl">Description</h2>
						{place.description}
					</div>
					✔️Check-in: {place.checkIn}
					<br />
					✔️Check-out: {place.checkOut}
					<br />
					✔️Max number of guests: {place.maxGuests}
				</div>
				<div>
					<BookingWidget place={place} />
				</div>
			</div>
			<div className="bg-white shadow-lg border border-primary rounded-2xl -mx-8 px-8 py-8 border-t">
				<div>
					<h2 className="font-semibold text-2xl">Extra info</h2>
				</div>
				<div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
					{place.extraInfo}
				</div>
			</div>
			<div className="w-full flex justify-center items-center mt-20">
				<ClipLoader
					loading={loading}
					size={50}
					aria-label="Loading Spinner"
					data-testid="loader"
					color="#F5385D"
				/>
			</div>
		</div>
	);
}
