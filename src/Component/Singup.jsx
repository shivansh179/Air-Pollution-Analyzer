import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from '../firebase';
import Aqi from './Aqi';

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
            console.log(user);

            // Store user phone number in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email,
                name,
                number,
                uid: user.uid
            });
             
             

            navigate("/login");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center w-screen h-screen bg-amber-600">
            <section className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-amber-600">FocusApp</h1>
                <form className="flex flex-col w-80 space-y-4" onSubmit={onSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-bold text-xl text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter Name"
                            className="mt-2 p-3 border border-gray-300 rounded-md focus:ring focus:ring-amber-400 focus:outline-none"
                        />
                        
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email-address" className="font-bold text-xl text-gray-700">Email address</label>
                        <input
                            type="email"
                            id="email-address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email address"
                            className="mt-2 p-3 border border-gray-300 rounded-md focus:ring focus:ring-amber-400 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-bold text-xl text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            className="mt-2 p-3 border border-gray-300 rounded-md focus:ring focus:ring-amber-400 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="number" className="font-bold text-xl text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            id="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                            placeholder="Phone Number"
                            className="mt-2 p-3 border border-gray-300 rounded-md focus:ring focus:ring-amber-400 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-amber-600 text-white py-3 rounded-md hover:bg-amber-700 transition"
                    >
                        Sign up
                    </button>
                </form>
                <p className="text-sm text-gray-700 mt-4">
                    Already have an account?{' '}
                    <NavLink to="/login" className="text-amber-600 hover:underline">
                        Sign in
                    </NavLink>
                </p>
            </section>
        </main>
    );
};

export default Signup;
