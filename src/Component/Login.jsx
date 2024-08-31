import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import app from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast.success("You're logged in");
                navigate("/aqi");
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                toast.error("Wrong Credentials");
            });
    }

    return (
        <>
                           <main
                    className="flex flex-col items-center p-10 justify-center w-screen h-screen bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('/air.jpg')` }} // Replace with your image URL
                >
                    <ToastContainer />
                    <section className="flex flex-col items-center justify-center bg-cover backdrop-blur-lg bg-opacity-90 p-6 rounded-lg shadow-lg">
                        <h1 className="text-2xl text-white md:text-4xl lg:text-4xl font-bold mb-6">Air Pollution Analyzer</h1>
                        <form className="flex flex-col w-64 space-y-4" onSubmit={onLogin}>
                            <div className="flex flex-col">
                                <label htmlFor="email-address" className="font-bold text-blue-300 text-xl">Email address</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email address"
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-2 p-2 border border-gray-300 font-mono font-bold rounded"
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
                            >
                                Login
                            </button>
                        </form>
                        <p className="text-sm text-white mt-4">
                            No account yet?{' '}
                            <NavLink to="/signup" className="text-orange-500 hover:underline">
                                Sign up
                            </NavLink>
                        </p>
                        {/* <p className="text-sm text- mt-2">
                            Or{' '}
                            <NavLink to="/phone_login" className="text-orange-500 hover:underline">
                                Login With Phone Number
                            </NavLink>
                        </p> */}
                    </section>
                </main>

        </>
    );
}

export default Login;
