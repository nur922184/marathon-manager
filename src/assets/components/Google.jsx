import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Google = () => {
    const { continueToGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleLogin = () => {
        continueToGoogle()
            .then(() => {
                // যদি আগে কোনো path থাকে তাহলে সেটাতে নিয়ে যাবে, নাহলে হোম পেইজে
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error("Login Failed:", error);
            });
    };

    return (
        <div>
            <button onClick={handleGoogleLogin} className="btn bg-white/5">
                <FaGoogle /> Login with Google
            </button>
        </div>
    );
};

export default Google;