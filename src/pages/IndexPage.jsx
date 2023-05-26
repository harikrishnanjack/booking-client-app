import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Image from '../components/Image';
import ClipLoader from 'react-spinners/ClipLoader';

export default function IndexPage() {
	const [places, setPlaces] = useState([]);
	let [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		axios.get('/api/places').then((response) => {
			setPlaces(response.data);
			setLoading(false);
		});
	}, []);
	return (
		<>
			<div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
				{places.length > 0 &&
					places.map((place) => (
						<Link
							to={'/place/' + place._id}
							key={place._id}>
							<div className="bg-gray-500 rounded-t-2xl flex">
								{place.photos?.[0] && (
									<Image
										className="rounded-t-2xl object-cover aspect-square"
										src={place.photos?.[0]}
										alt=""
									/>
								)}
							</div>
							<div className="bg-gray-300 rounded-b-2xl p-2">
								<h2 className="font-bold">{place.address}</h2>
								<h3 className="text-sm text-gray-500">{place.title}</h3>
								<div className="mt-1">
									<span className="font-bold">${place.price}</span> per night
								</div>
							</div>
						</Link>
					))}
				{places.length === 0 && !loading && (
					<div className="flex justify-center items-center mt-24 text-primary text-lg">
						***No Data***
					</div>
				)}
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
		</>
	);
}
