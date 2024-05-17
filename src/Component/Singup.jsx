import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/login");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <main className="flex flex-col items-center justify-center w-screen h-screen bg-amber-600">
            <section className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6">FocusApp</h1>
                <form className="flex flex-col w-64 space-y-4" onSubmit={onSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="email-address" className="font-bold text-xl">Email address</label>
                        <input
                            type="email"
                            id="email-address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email address"
                            className="mt-2 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-bold text-xl">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            className="mt-2 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
                    >
                        Sign up
                    </button>
                </form>
                <p className="text-sm text-gray-700 mt-4">
                    Already have an account?{' '}
                    <NavLink to="/login" className="text-blue-500 hover:underline">
                        Sign in
                    </NavLink>
                </p>
            </section>
        </main>
    );
}

export default Signup;
