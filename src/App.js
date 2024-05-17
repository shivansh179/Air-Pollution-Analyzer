import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Login.jsx';
import Signup from './Component/Singup.jsx';
import PrivateRoute from './PrivateRoute';
import Aqi from './Component/Aqi.jsx';
 import LoginWithNumber from './Component/LoginWithNumber.jsx'


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/phone_login" element={<LoginWithNumber />} />
                <Route
                    path="/aqi"
                    element={
                        <PrivateRoute>
                            <Aqi/>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
