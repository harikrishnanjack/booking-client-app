import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../components/AccountNav';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AccountPage() {
	const [redirect, setRedirect] = useState(null);
	const { ready, user, setUser } = useContext(UserContext);
	let { subpage } = useParams();

	if (subpage === undefined) {
		subpage = 'profile';
	}

	async function logout() {
		await axios.post('/api/logout');
		setRedirect('/');
		toast.warn('Logout successful', {
			position: toast.POSITION.BOTTOM_CENTER,
			closeButton: true,
			progress: false,
			autoClose: true,
		});
		setUser(null);
	}

	if (ready && !user && !redirect) {
		return <Navigate to={'/login'} />;
	}

	if (redirect) {
		return <Navigate to={redirect} />;
	}
	return (
		<div>
			<AccountNav />
			{user && subpage === 'profile' && (
				<div className="max-w-lg mx-auto mt-10 rounded-2xl p-10 bg-slate-200">
					<h2 className="text-center text-xl font-semibold">Your Profile</h2>
					<p className="font-normal text-lg text-center">
						Logged in as {user?.name}{' '}
					</p>
					<p className="font-normal text-xs text-center">Email:{user?.email}</p>
					<br />
					<button
						onClick={logout}
						className="primary max-w-sm hover:bg-gray-300 hover:text-black hover:font-bold ease-out duration-500">
						Logout
					</button>
				</div>
			)}
			{subpage === 'places' && <PlacesPage />}
		</div>
	);
}
