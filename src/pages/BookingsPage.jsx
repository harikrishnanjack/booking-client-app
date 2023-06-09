import { useEffect, useState } from 'react';
import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import BookingDates from '../components/BookingDates';
import PlaceImg from '../components/PlaceImg';
import ClipLoader from 'react-spinners/ClipLoader';

export default function BookingsPage() {
	const [bookings, setBookings] = useState([]);
	let [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		axios.get('/api/bookings').then((response) => {
			setBookings(response.data);
			setLoading(false);
		});
	}, []);
	return (
		<div>
			<AccountNav />
			<div className="flex flex-col gap-2">
				{bookings?.length > 0 &&
					bookings.map((booking) => (
						<Link
							to={`/account/bookings/${booking._id}`}
							key={booking._id}
							className="flex gap-4 bg-gray-300 rounded-2xl overflow-hidden">
							<div className="w-48">
								<PlaceImg place={booking.place} />
							</div>
							<div className="py-3 pr-3 grow">
								<h2 className="text-xl">{booking.place.title}</h2>
								<div className="text-xl">
									<BookingDates
										booking={booking}
										className="mb-2 mt-4 text-gray-500"
									/>
									<div className="flex gap-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-8 h-8">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
											/>
										</svg>
										<span className="text-2xl">
											Total price: ${booking.price}
										</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				{bookings.length === 0 && !loading && (
					<div className="flex justify-center items-center mt-24 text-primary text-lg">
						***No Bookings***
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
		</div>
	);
}
