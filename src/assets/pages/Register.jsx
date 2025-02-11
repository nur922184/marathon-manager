import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import bg from "../Images/login.jpg";
import Google from "../components/Google";

const Register = () => {
    const { crateNewUser, setUser, UpdateUserProfile } = useContext(AuthContext);
    const [error, setError] = useState({});
    const [ErrorPass, setErrorPass] = useState({});
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.target);
        const name = form.get("name");
        const photoUrl = form.get("photo");
        const email = form.get("email");
        const Password = form.get("password");

        let hasError = false;

        // Name Validation
        if (name.length < 5) {
            setError({ ...error, name: "Name must be at least 5 characters long" });
            hasError = true;
        } else {
            setError({ ...error, name: "" });
        }

        // Password Validation
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (Password.length < 6) {
            setErrorPass({ ...ErrorPass, password: "Password must be at least 6 characters long" });
            hasError = true;
        } else if (!specialCharRegex.test(Password)) {
            setErrorPass({ ...ErrorPass, password: "Password must include at least one special character" });
            hasError = true;
        } else {
            setErrorPass({ ...ErrorPass, password: "" });
        }
        if (hasError) {
            setLoading(false);
            return;
        }

        // API Call
        crateNewUser(email, Password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                UpdateUserProfile({ displayName: name, photoURL: photoUrl })
                    .then(() => {
                        navigate("/", { state: { successMessage: "Successfully registered!" } });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === "auth/email-already-in-use") {
                    setError({ ...error, email: "This email is already in use. Please try logging in." });
                } else {
                    console.log(errorMessage);
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <div
                style={{
                    backgroundImage: `url(${bg})`,
                }}
                className="flex justify-center bg-cover bg-center"
            >
                <div className="bg-white/10 backdrop-blur-lg w-full max-w-lg shrink-0 shadow-2xl p-10 dark:bg-white/10 dark:text-white">
                    <h2 className="text-center text-2xl font-semibold mt-5 mb-6">Register a new Account</h2>
                    <hr />
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered dark:bg-slate-800" required />
                        </div>
                        {error.name && (
                            <label className="label">
                                <span className="label-text text-red-400">{error.name}</span>
                            </label>
                        )}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Photo Url</span>
                            </label>
                            <input type="text" name="photo" placeholder="PhotoUrl" className="input input-bordered dark:bg-slate-800" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered dark:bg-slate-800" required />
                            {error.email && (
                                <label className="label">
                                    <span className="label-text text-red-400">{error.email}</span>
                                </label>
                            )}
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text dark:text-white">Password</span>
                            </label>
                            <input type={show ? "text" : "password"} name="password" placeholder="password" className="input input-bordered dark:bg-slate-800" required />
                            {ErrorPass.password && (
                                <label className="label">
                                    <span className="label-text text-red-400">{ErrorPass.password}</span>
                                </label>
                            )}
                            <div onClick={() => setShow(!show)} className="absolute right-4 top-12 cursor-pointer">
                                {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline dark:text-yellow-100 bg-white/5 backdrop-blur-lg" disabled={loading}>
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </div>
                    </form>
                    <Google></Google>
                    <p className="text-center mt-3">
                        Already Have An Account ? <NavLink to="/login" className="text-blue-700 font-semibold">Login</NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
