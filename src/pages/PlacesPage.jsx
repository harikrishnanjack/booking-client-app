import { Link, useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';
import PlacesFormPage from './PlacesFormPage';
import AccountNav from '../components/AccountNav';
import PlaceImg from '../components/PlaceImg';
// import PlaceImg from "../PlaceImg";
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PlacesPage() {
	const [places, setPlaces] = useState([]);
	let [loading, setLoading] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const deletePlace = (id) => {
		axios
			.delete(`/api/user-places/${id}`)
			.then(() => {
				toast.success('Accomodation Deleted successfully', {
					position: toast.POSITION.BOTTOM_CENTER,
					closeButton: true,
					progress: false,
					autoClose: true,
				});
				setPlaces(places.filter((item) => item._id !== id));
			})
			.catch((error) => {
				toast.error('Error Deleting', {
					position: toast.POSITION.BOTTOM_CENTER,
					closeButton: true,
					progress: false,
					autoClose: true,
				});
			});
	};
	const handleDelete = (id) => {
		deletePlace(id);
	};

	useEffect(() => {
		setLoading(true);
		axios.get('/api/user-places').then(({ data }) => {
			setPlaces(data);
			setLoading(false);
		});
	}, []);

	return (
		<div>
			<AccountNav />
			<div className="text-center">
				<Link
					className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
					to={'/account/places/new'}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6">
						<path
							fillRule="evenodd"
							d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
							clipRule="evenodd"
						/>
					</svg>
					Add New Place
				</Link>
			</div>
			<div className="mt-4 flex flex-col gap-2">
				{places.length > 0 &&
					places.map((place) => (
						<div key={place._id}>
							<div className="mt-0 flex justify-end">
								<button
									onClick={() => handleDelete(place._id)}
									className="border border-primary text-primary hover:bg-primary hover:text-white ease-out duration-500 px-3 rounded-2xl">
									Delete {place.title}
								</button>
							</div>
							<Link
								to={'/account/places/' + place._id}
								key={place._id}
								className="flex cursor-pointer gap-4 bg-gray-300 p-4 rounded-2xl">
								<div className="flex w-32 h-32 bg-gray-300">
									<PlaceImg place={place} />
								</div>
								<div className="grow-0 shrink">
									<h2 className="text-xl">{place.title}</h2>
									<p className="text-sm mt-2">{place.description}</p>
								</div>
							</Link>
						</div>
					))}
			</div>
			{places.length === 0 && !loading && (
				<div className="flex justify-center items-center mt-24 text-primary text-lg">
					***No Places Available***
				</div>
			)}
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
