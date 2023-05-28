import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddressLink from '../components/AddressLink';
import BookingDates from '../components/BookingDates';
import PlaceGallery from '../components/PlaceGallery';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookingPage() {
	const { id } = useParams();
	const [booking, setBooking] = useState(null);
	let [loading, setLoading] = useState(false);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (id) {
			setLoading(true);
			axios.get('/api/bookings').then((response) => {
				const foundBooking = response.data.find(({ _id }) => _id === id);
				if (foundBooking) {
					setBooking(foundBooking);
					setLoading(false);
				}
			});
		}
	}, [id]);

	if (!booking) {
		return '';
	}
	const deleteBooking = (id) => {
		axios
			.delete(`/api/bookings/${id}`)
			.then(() => {
				toast.success('Booking Cancelled successfully', {
					position: toast.POSITION.BOTTOM_CENTER,
					closeButton: true,
					progress: false,
					autoClose: true,
				});
				setRedirect(true);
			})
			.catch((error) => {
				toast.error('Error Cancelling booking', {
					position: toast.POSITION.BOTTOM_CENTER,
					closeButton: true,
					progress: false,
					autoClose: true,
				});
				setRedirect(false);
			});
	};
	const handleDelete = (id) => {
		deleteBooking(id);
	};
	if (redirect) {
		return <Navigate to={'/'} />;
	}

	return (
		<div className="my-8">
			<h1 className="text-3xl">{booking?.place?.title}</h1>
			<AddressLink className="my-2 block">{booking.place.address}</AddressLink>
			<div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
				<div>
					<h2 className="text-2xl mb-4">Your booking information:</h2>
					<BookingDates booking={booking} />
					<div className="mt-4">
						<button
							onClick={() => handleDelete(booking?._id)}
							className="primary hover:bg-gray-300 hover:text-black hover:font-bold ease-out duration-500">
							Cancel Booking
						</button>
					</div>
				</div>
				<div className="bg-primary p-6 text-white rounded-2xl">
					<div>Total price</div>
					<div className="text-3xl">${booking?.price}</div>
				</div>
			</div>
			<PlaceGallery place={booking?.place} />
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
