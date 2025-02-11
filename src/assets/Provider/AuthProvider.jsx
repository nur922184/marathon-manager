import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword,  signInWithPopup,  signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.init";
export const AuthContext = createContext()
import { toast, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
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
        Swal.fire({
          title: "Are you sure?",
          text: "You want to log out?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, log out!",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            setLoding(true);
            signOut(auth)
              .then(() => {
                toast.info("Successfully Logout!", {
                  position: "top-center",
                  autoClose: 3000,
                });
              })
              .catch((error) => {
                toast.error(`Logout failed: ${error.message}`, {
                  position: "top-center",
                });
              });
          }
        });
      };
    const continueToGoogle = () => {
        setLoding(true); 
       return signInWithPopup(auth, Porvider)
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




