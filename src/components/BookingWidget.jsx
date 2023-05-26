import { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from './UserContext.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookingWidget({ place }) {
	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');
	const [numberOfGuests, setNumberOfGuests] = useState(1);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [redirect, setRedirect] = useState('');
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			setName(user.name);
		}
	}, [user]);
	let numberOfNights = 0;
	if (checkIn && checkOut) {
		numberOfNights = differenceInCalendarDays(
			new Date(checkOut),
			new Date(checkIn)
		);
	}

	function validateBookingForm() {
		if (new Date(checkIn) > new Date(checkOut)) {
			toast.error('Please Select Valid CheckIn & CheckOut Dates', {
				position: toast.POSITION.BOTTOM_CENTER,
				closeButton: true,
				progress: false,
				autoClose: true,
			});
			return false;
		}
		if (numberOfGuests > place.maxGuests) {
			toast.error(`Only allowed Maximum of ${place.maxGuests} people`, {
				position: toast.POSITION.BOTTOM_CENTER,
				closeButton: true,
				progress: false,
				autoClose: true,
			});
			return false;
		}
		if (
			checkIn === '' ||
			checkOut === '' ||
			numberOfGuests === '' ||
			numberOfGuests <= 0 ||
			name.trim() === '' ||
			phone === '' ||
			phone.toString().length !== 10
		) {
			toast.error('Please Enter Fill All Valid Data', {
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
	const disablePastDate = () => {
		const today = new Date();
		const year = today.getFullYear();
		let month = today.getMonth() + 1;
		let day = today.getDate();
		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;

		return `${year}-${month}-${day}`;
	};

	async function bookThisPlace() {
		if (!user) {
			setRedirect('/login');
			toast.success('Please Login First', {
				position: toast.POSITION.BOTTOM_CENTER,
				closeButton: true,
				progress: false,
				autoClose: true,
			});
		} else {
			if (validateBookingForm() === true) {
				const response = await axios.post('/api/bookings', {
					checkIn,
					checkOut,
					numberOfGuests,
					name,
					phone,
					place: place._id,
					price: numberOfNights * place.price,
				});
				toast.success('Booking successful', {
					position: toast.POSITION.BOTTOM_CENTER,
					closeButton: true,
					progress: false,
					autoClose: true,
				});
				const bookingId = response.data._id;
				setRedirect(`/account/bookings/${bookingId}`);
			} else {
				return;
			}
		}
	}

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	return (
		<div className="bg-white border shadow-2xl p-4 rounded-2xl">
			<div className="text-2xl text-center">
				Price: ${place.price} / per night
			</div>
			<div className="border rounded-2xl mt-4">
				<div className="flex flex-col md:flex-row">
					<div className="py-3 px-4">
						<label>Check in:</label>
						<input
							type="date"
							className="focus:outline-none border-primary cursor-pointer"
							min={disablePastDate()}
							value={checkIn}
							onChange={(ev) => setCheckIn(ev.target.value)}
						/>
					</div>
					<div className="py-3 px-4 border-l">
						<label>Check out:</label>
						<input
							type="date"
							value={checkOut}
							className="focus:outline-none border-primary cursor-pointer"
							onChange={(ev) => setCheckOut(ev.target.value)}
						/>
					</div>
				</div>
				<div className="py-3 px-4 border-t">
					<label>Number of guests:</label>
					<input
						type="number"
						className="focus:outline-none border-primary"
						value={numberOfGuests}
						onChange={(ev) => setNumberOfGuests(ev.target.value)}
					/>
				</div>
				{numberOfNights > 0 && (
					<div className="py-3 px-4 border-t">
						<label>Your full name:</label>
						<input
							type="text"
							className="focus:outline-none border-primary"
							value={name}
							onChange={(ev) => setName(ev.target.value)}
						/>
						<label>Phone number:</label>
						<input
							type="tel"
							className="focus:outline-none border-primary"
							value={phone}
							onChange={(ev) => setPhone(ev.target.value)}
						/>
					</div>
				)}
			</div>
			<button
				onClick={bookThisPlace}
				className="primary mt-4">
				Book this place
				{numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
			</button>
		</div>
	);
}
