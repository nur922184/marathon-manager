import React from "react";
import { FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import logo1 from '../Images/logo/australian_athletics-logo_brandlogos.net_wbpjd.png'
import logo2 from '../Images/logo/nestle-logo-brandlogos.net_-512x512.png'
import logo3 from '../Images/logo/pantene-vector-logo.png'
import logo4 from '../Images/logo/Rocky-Mountain-ATV-logo-Brandlogos.net_.png'
import logo5 from '../Images/logo/xbox-logo-vector.png'
import Swal from "sweetalert2";

const SponsorsNewsletter = () => {
    const subcrive = (e)=>{
        e.preventDefault();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been successful",
            showConfirmButton: false,
            timer: 1500
          });
    }
    return (
        <div className="container mx-auto px-4 py-2">
            {/* Sponsors & Partners Section */}
            <section className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-6">Our Sponsors & Partners</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <img src={logo1} alt="Sponsor 1" className="w-full h-auto" />
                    <img src={logo2} alt="Sponsor 2" className="w-full h-auto" />
                    <img src={logo3} alt="Sponsor 3" className="w-full h-auto" />
                    <img src={logo4} alt="Sponsor 4" className="w-full h-auto" />
                    <img src={logo5} alt="Sponsor 5" className="w-full h-auto" />
                </div>
            </section>

            {/* Newsletter Subscription Section */}
            <section className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
                <p className="text-gray-300 mb-6">Subscribe to get the latest updates on upcoming marathons.</p>
                <form onSubmit={subcrive}>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">

                        <div className="relative w-full sm:w-auto">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="pl-10 pr-4 py-2 w-full sm:w-96 rounded-md text-black focus:outline-none"
                            />
                        </div>
                        <button
                            class=" card-button font-sans flex justify-center gap-2 items-center shadow-xl text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 rounded-2xl group"
                            type="submit"
                        >
                            Subscribe
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 19"
                                class="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                            >
                                <path
                                    class="fill-gray-800 group-hover:fill-gray-800"
                                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </form>
                <div className="mt-6 flex justify-center space-x-4">
                    <FaFacebook className="text-xl hover:text-blue-500 cursor-pointer" />
                    <FaTwitter className="text-xl hover:text-blue-400 cursor-pointer" />
                    <FaInstagram className="text-xl hover:text-pink-500 cursor-pointer" />
                </div>
            </section>
        </div>
    );
};

export default SponsorsNewsletter;
