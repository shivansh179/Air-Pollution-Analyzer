import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import app from '../firebase';

const Signup = () => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user phone number in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email,
                name,
                number,
                uid: user.uid
            });

            toast.success('Signup successful!');
            
            setTimeout(() => {
                
                navigate('/login');
            }, 3000);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            toast.error('Signup failed: ' + errorMessage);
        }
    };

    return (
        <main
            className="flex flex-col items-center p-10 justify-center w-screen md:h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/air.jpg')` }} // Replace with your image URL
        >
            <ToastContainer />
            <section className="flex flex-col items-center justify-center bg-cover backdrop-blur-lg bg-opacity-90 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl text-white md:text-4xl lg:text-4xl font-bold mb-6">Air Pollution Analyzer - Sign Up</h1>
                <form className="flex flex-col w-64 space-y-4" onSubmit={onSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-bold text-blue-300 text-xl">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2 p-2 border border-gray-300 font-mono font-bold rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email-address" className="font-bold text-blue-300 text-xl">Email address</label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            required
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 p-2 border border-gray-300 font-mono font-bold rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-bold text-blue-300 text-xl">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 p-2 border border-gray-300 font-mono font-bold rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="number" className="font-bold text-blue-300 text-xl">Phone Number</label>
                        <input
                            id="number"
                            name="number"
                            type="tel"
                            required
                            placeholder="Phone Number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="mt-2 p-2 border border-gray-300 font-mono font-bold rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
                    >
                        Sign up
                    </button>
                </form>
                <p className="text-sm text-white mt-4">
                    Already have an account?{' '}
                    <NavLink to="/login" className="text-orange-500 hover:underline">
                        Sign in
                    </NavLink>
                </p>
            </section>
        </main>
    );
};

export default Signup;
