import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';

export default function RegisterPage() {
	const [redirect, setRedirect] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	let [loading, setLoading] = useState(false);

	const onSubmit = async (datas) => {
		setLoading(true);
		try {
			await axios.post('/api/register', datas);
			toast.success('Registration successful', {
				position: toast.POSITION.BOTTOM_CENTER,
				closeButton: true,
				progress: false,
				autoClose: true,
			});
			setRedirect(true);
			setLoading(false);
		} catch (e) {
			toast.success('Registration Fail', {
				position: toast.POSITION.BOTTOM_CENTER,
				closeButton: true,
				progress: false,
				autoClose: true,
			});
			setLoading(false);
		}
	};

	if (redirect) {
		return <Navigate to={'/login'} />;
	}

	return (
		<>
			<div className="mt-0 md:mt-24 grow flex items-center justify-around">
				<div className="mb-64 w-full">
					<h1 className="text-2xl font-semibold text-center mb-4">Register</h1>
					<form
						className="max-w-md mx-auto"
						onSubmit={handleSubmit(onSubmit)}>
						<input
							type="text"
							className="focus:outline-none border-primary"
							placeholder="John Doe"
							{...register('name', { required: true })}
						/>
						<div>
							{errors.name && (
								<p className="text-red-700 text-sm">Name is required</p>
							)}
						</div>
						<input
							type="email"
							className="focus:outline-none border-primary"
							placeholder="your@email.com"
							{...register('email', {
								required: true,
								pattern:
									/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							})}
						/>
						<div>
							{errors.email && (
								<p className="text-red-700 text-sm">Please check the Email</p>
							)}
						</div>
						<input
							type="password"
							className="focus:outline-none border-primary"
							placeholder="password"
							{...register('password', { required: true })}
						/>
						<div>
							{errors.password && (
								<p className="text-red-700 text-sm">Password is required</p>
							)}
						</div>
						<button className="primary hover:bg-gray-300 hover:text-black hover:font-bold ease-out duration-500">
							Register
						</button>
						<div className="text-center py-2 text-gray-500">
							Already a member?{' '}
							<Link
								className="text-black hover:underline ease-out duration-500"
								to={'/login'}>
								Login
							</Link>
						</div>
					</form>
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
		</>
	);
}
