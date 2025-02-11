import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import bg from '../Images/login.jpg';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Google from '../components/Google';

const Login = () => {
    const { setUser, Login, ForgotPassword } = useContext(AuthContext);
    const [error, setError] = useState({});
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);  // Loading state
    const location = useLocation();
    const navigate = useNavigate();

    const handleForgotPassword = () => {
        const email = prompt("Enter your email address for password reset:");
        if (!email) {
            toast.error("Please provide a valid email address.", { position: "top-center", autoClose: 3000 });
            return;
        }
        ForgotPassword(email)
            .then(() => {
                toast.success("Password reset email sent successfully.", { position: "top-center", autoClose: 3000 });
            })
            .catch((error) => {
                let errorMessage = "Something went wrong. Please try again.";
                if (error.code === "auth/user-not-found") {
                    errorMessage = "No user found with this email.";
                } else if (error.code === "auth/invalid-email") {
                    errorMessage = "Invalid email address.";
                }
                toast.error(errorMessage, { position: "top-center", autoClose: 3000 });
            });
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');

        Login(email, password)
            .then((result) => {
                setLoading(false);  // Stop loading
                const user = result.user;
                setUser(user);
                navigate(location?.state ? location.state : "/", { state: { successMessage: "Successfully logged in!" } });
            })
            .catch((error) => {
                setLoading(false);  // Stop loading
                let errorMessage = "Login failed. Please try again.";
                if (error.code === "auth/user-not-found") {
                    errorMessage = "No user found with this email. Please register first.";
                } else if (error.code === "auth/wrong-password") {
                    errorMessage = "Incorrect password. Please try again.";
                } else if (error.code === "auth/too-many-requests") {
                    errorMessage = "Too many login attempts. Please try again later.";
                }
                toast.error(errorMessage, { position: "top-center", autoClose: 3000 });
                setError({ ...error, Login: errorMessage });
            });
    };

    return (
        <div>
            <div
                style={{ backgroundImage: `url(${bg})` }}
                className='flex h-screen justify-center items-center bg-cover'>
                <div className="bg-white/10 backdrop-blur-lg dark:bg-white/10 dark:text-white w-full max-w-lg shrink-0 shadow-2xl p-10">
                    <h2 className='text-center text-2xl font-semibold mt-5 mb-6'>Login Your Account</h2>
                    <hr />
                    <form onSubmit={handleSubmitLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered dark:bg-slate-800" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text dark:text-white">Password</span>
                            </label>
                            <input type={show ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered dark:bg-slate-800" required />
                            {error.Login && <label className="label text-sm text-red-600">{error.Login}</label>}
                            <div onClick={() => setShow(!show)} className='absolute right-4 top-12 cursor-pointer'>
                                {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </div>
                            <label className="label">
                                <span className="label-text-alt link link-hover dark:text-fuchsia-300" onClick={handleForgotPassword}>
                                    Forgot password?
                                </span>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button
                                className="btn btn-outline dark:text-yellow-50 flex items-center justify-center"
                                disabled={loading} // Disable button when loading
                            >
                                {loading ? (
                                    <span className="loading loading-spinner text-success"></span>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </div>
                    </form>
                    <Google />
                    <p className='text-center'> Don't Have An Account? <NavLink to="/register" className='text-blue-700 font-semibold link-hover dark:text-blue-400'>Register</NavLink></p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
