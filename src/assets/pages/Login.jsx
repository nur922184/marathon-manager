import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Login = () => {

    const [show, setShow] = useState(false)

    return (
        <div className=' flex  justify-center items-center'>
            <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl p-10">
                <h2 className='text-center text-2xl font-semibold mt-5 mb-6'>Login Your Account</h2>
                <hr />
                <form  className="card-body"> {/*onSubmit={hanldeSubmiteLogin}*/}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={show ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" required />
                        {/* {
                            error.Login && (
                                <label className="label text-sm text-red-600">
                                    {error.Login}
                                </label>
                            )
                        } */}
                        <div onClick={() => setShow(!show)} className='btn btn-sm w-10 absolute right-4 top-11 '>
                            {
                                show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </div>
                        <label className="label">
                            <span className="label-text-alt link link-hover" > {/* onClick={handleForgotPassword}*/}
                                Forgot password?
                            </span>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-outline">Login</button>
                    </div>
                </form>
                <button  className="btn"> {/* onClick={continueToGoogle} */}
                    <FaGoogle></FaGoogle> Login with Google
                </button>
                <p className='text-center'> Don t Have An Account ? <NavLink to="/register" className='text-blue-700 font-semibold'>Register</NavLink></p>
            </div>
        </div>
    );
};

export default Login;