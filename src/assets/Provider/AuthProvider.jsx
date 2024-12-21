import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword,  signInWithPopup,  signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.init";
export const AuthContext = createContext()
import { toast, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthProviders = ({ children }) => {
    const auth = getAuth(app);
    const Porvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    const [loading, setLoding] = useState(true)
    // console.log(loading, user)
    const crateNewUser = (email, password) => {
        setLoding(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const ForgotPassword  = (email) => {
        return sendPasswordResetEmail(auth, email)
    };
    const Logout = () => {
        setLoding(true);
        toast.info("Successfully Logout!", {
            position: "top-center",
            autoClose: 3000, 
        });
        return signOut(auth)
    }

    const continueToGoogle = () => {
        setLoding(true); 
        signInWithPopup(auth, Porvider)
            .then((result) => {
                const user = result.user;
                setUser(user); 
                navigate("/"); 
                toast.success("Successfully logged in with Google!", {
                    position: "top-center",
                    autoClose: 3000,
                });
            })
    };

    const Login = (email, password) => {
                setLoding(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const UpdateUserProfile = (update) => {
                return updateProfile(auth.currentUser, update)
            }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoding(false)
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const AutInfo = {
        user,
        setUser,
        crateNewUser,
        Logout,
        Login,
        continueToGoogle, 
        loading, 
        UpdateUserProfile, 
        ForgotPassword
    }

    return (
        <AuthContext.Provider value={AutInfo} >
            {children}
            {/* <ToastContainer></ToastContainer> */}
        </AuthContext.Provider>
    );
};

export default AuthProviders;




