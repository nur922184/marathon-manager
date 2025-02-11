import React from "react";
import { FaUsers, FaBullseye, FaEye } from "react-icons/fa";

const teamMembers = [
    {
        name: "Md.Nuruzzaman",
        role: "founder & ceo Open IT Institute",
        img: "https://i.ibb.co.com/ThqSXn9/468478725-2357109847956765-5882425726693989952-n.jpg",
        dis: "MD. Nuruzzaman, a remarkably capable individual, stands as a successful entrepreneur and currently serves as the Chief Officer at Open IT Institute. His adept management extends to Open IT Institute, where he oversees operations with precision and dedication."
    },
    {
        name: "Md. Moniruzzaman",
        role: "Level 1 Instructor & Mentor",
        img: "https://i.ibb.co.com/SdGzwsX/01405253803.jpg",
        dis: "Md.Moniruzzaman, recognized for his exceptional skill set, currently holds the position of Executive Mentor at Open IT Institute. Simultaneously, he is actively engaged in pursuing Label One courses,"
    },
    {
        name: "কামাল হোসেন",
        role: "instructor",
        dis: "Kamal Hussain, recognized for his exceptional skill set, currently holds the position of Executive Officer at Open IT Institute. Simultaneously, he is actively engaged in pursuing Label One courses, further enhancing his expertise and contributing to the advancement of the organization.",
        img: "https://i.ibb.co.com/bjT0sgvY/silhouette-woman-with-short-hair-against-purple-pink-gradient-background-1387470-2737.jpg",
    },
];

const AboutUs = () => {
    return (
        <div className="container mx-auto p-6">
            {/* Mission & Vision Section */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">About Us</h1>
                <p className="text-gray-600 mt-2">Learn more about our mission, vision, and team.</p> <br />
                <p>Conventional team building exercises are conducted outdoors and off-site. This is a significant investment of time and money so its worth asking if they deliver the expected results.
                    If the idea is to enjoy a day of activity and share some laughs, just about any team-building activities will hit the mark.
                    If you want team members(even the shy ones) to really speak their mind, empathize with each other and build genuine connectedness, you might want to try working with a certified LSP Facilitator.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-center">
                <div className="bg-gray-100 dark:bg-white/5 dark:text-yellow-50  p-6 rounded-lg shadow-lg">
                    <FaBullseye className="text-5xl text-blue-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">Our Mission</h2>
                    <p className="text-gray-500 mt-2">
                        Our mission is to empower individuals with knowledge and skills through high-quality education and mentorship.
                    </p>
                </div>
                <div className="bg-gray-100 dark:bg-white/5 dark:text-yellow-50  p-6 rounded-lg shadow-lg">
                    <FaEye className="text-5xl text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Our Vision</h2>
                    <p className="text-gray-600 mt-2">
                        We envision a future where education is accessible, practical, and impactful for everyone.
                    </p>
                </div>
            </div>

            {/* Team Section */}
            <div className="text-center mt-12">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Meet Our Team</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
                {teamMembers.map((member, index) => (
                    <div key={index} className="bg-white dark:bg-white/5 dark:text-yellow-50  p-4 rounded-lg shadow-lg text-center">
                        <img
                            src={member.img}
                            alt={member.name}
                            className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
                        />
                        <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
                        <h5 className="text-gray-600 text-">{member.role}</h5>
                        <hr className="py-2 mt-2" />
                        <p className="text-gray-800 dark:text-yellow-50">{member.dis}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutUs;
