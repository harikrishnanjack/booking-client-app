import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';

import axios from 'axios';
import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';
import AccountNav from '../components/AccountNav';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';

export default function PlacesFormPage() {
	const { id } = useParams();
	const [title, setTitle] = useState('');
	const [address, setAddress] = useState('');
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDescription] = useState('');
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState('');
	const [checkIn, setCheckIn] = useState('12:00 PM');
	const [checkOut, setCheckOut] = useState('11:00 AM');
	const [maxGuests, setMaxGuests] = useState(1);
	const [price, setPrice] = useState(100);
	const [redirect, setRedirect] = useState(false);
	let [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!id) {
			return;
		}
		setLoading(true);
		axios.get('/api/places/' + id).then((response) => {
			const { data } = response;
			setTitle(data.title);
			setAddress(data.address);
			setAddedPhotos(data.photos);
			setDescription(data.description);
			setPerks(data.perks);
			setExtraInfo(data.extraInfo);
			setCheckIn(data.checkIn);
			setCheckOut(data.checkOut);
			setMaxGuests(data.maxGuests);
			setPrice(data.price);
			setLoading(false);
		});
	}, [id]);

	function inputHeader(text) {
		return <h2 className="text-2xl mt-4">{text}</h2>;
	}
	function inputDescription(text) {
		return <p className="text-gray-500 text-sm">{text}</p>;
	}
	function preInput(header, description) {
		return (
			<>
				{inputHeader(header)}
				{inputDescription(description)}
			</>
		);
	}
	function validatePlacesForm() {
		if (
			title.trim() === '' ||
			address === '' ||
			addedPhotos.length === 0 ||
			description.trim() === '' ||
			extraInfo.trim() === '' ||
			checkIn.trim() === '' ||
			checkOut.trim() === '' ||
			perks.length === 0 ||
			maxGuests === ''
		) {
			toast.error('Please Fill All Valid Data', {
				position: toast.POSITION.BOTTOM_CENTER,
				closeButton: true,
				progress: false,
				autoClose: true,
			});
			return false;
		} else {
			return true;
		}
	}
	async function savePlace(ev) {
		ev.preventDefault();
		if (validatePlacesForm() === true) {
			const placeData = {
				title,
				address,
				addedPhotos,
				description,
				perks,
				extraInfo,
				checkIn,
				checkOut,
				maxGuests,
				price,
			};
			setLoading(true);
			if (id) {
				await axios.put('/api/places', {
					id,
					...placeData,
				});
				setRedirect(true);
				setLoading(false);
				toast.success('Data Updated Successfully', {
					position: toast.POSITION.BOTTOM_CENTER,
					closeButton: true,
					progress: false,
					autoClose: true,
				});
			} else {
				await axios.post('/api/places', placeData);
				setRedirect(true);
				setLoading(false);
				toast.success('Data Added Successfully', {
					position: toast.POSITION.BOTTOM_CENTER,
					closeButton: true,
					progress: false,
					autoClose: true,
				});
			}
		} else {
			return;
		}
	}

	if (redirect) {
		return <Navigate to={'/account/places'} />;
	}

	return (
		<div>
			<AccountNav />
			<form onSubmit={savePlace}>
				{preInput(
					'Title',
					'Title for your place. should be short and catchy as in advertisement'
				)}
				<input
					type="text"
					className="focus:outline-none border-primary"
					value={title}
					onChange={(ev) => setTitle(ev.target.value)}
					placeholder="Title for my apartment"
				/>
				{preInput('Address', 'Address to this place')}
				<input
					type="text"
					className="focus:outline-none border-primary"
					value={address}
					onChange={(ev) => setAddress(ev.target.value)}
					placeholder="address"
				/>
				{preInput('Photos', 'more = better')}
				<PhotosUploader
					addedPhotos={addedPhotos}
					onChange={setAddedPhotos}
				/>
				{preInput('Description', 'description of the place')}
				<textarea
					value={description}
					className="focus:outline-none border-primary"
					onChange={(ev) => setDescription(ev.target.value)}
				/>
				{preInput('Perks', 'select all the perks of your place')}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
					<Perks
						selected={perks}
						onChange={setPerks}
					/>
				</div>
				{preInput('Extra info', 'house rules, etc')}
				<textarea
					className="focus:outline-none border-primary"
					value={extraInfo}
					onChange={(ev) => setExtraInfo(ev.target.value)}
				/>
				{preInput(
					'Check in&out times',
					'add check in and out times, remember to have some time window for cleaning the room between guests'
				)}
				<div className="grid gap-2 sm:grid-cols-3">
					<div>
						<h3 className="mt-2 -mb-1">Check in time</h3>
						<input
							type="text"
							disabled
							className="focus:outline-none border-primary"
							value={checkIn}
							onChange={(ev) => setCheckIn(ev.target.value)}
							placeholder="14:00"
						/>
					</div>
					<div>
						<h3 className="mt-2 -mb-1">Check out time</h3>
						<input
							type="text"
							disabled
							className="focus:outline-none border-primary"
							value={checkOut}
							onChange={(ev) => setCheckOut(ev.target.value)}
							placeholder="11"
						/>
					</div>
					<div>
						<h3 className="mt-2 -mb-1">Max number of guests</h3>
						<input
							type="number"
							className="focus:outline-none border-primary"
							value={maxGuests}
							onChange={(ev) => setMaxGuests(ev.target.value)}
						/>
					</div>
				</div>
				<div className="my-4">
					<button
						className={
							'primary hover:bg-gray-300 hover:text-black hover:font-bold ease-out duration-500'
						}>
						Save & Add
					</button>
				</div>
			</form>
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
