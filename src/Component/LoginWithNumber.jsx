import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
 import { useNavigate } from 'react-router-dom';
import app from '../firebase'


const PhoneNumberVerification = () => {
  
  const navigate = useNavigate();
  const auth  = getAuth(app);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!phoneNumber || !username) {
      toast.error('Please enter phone number and username');
      return;
    }

   
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      
     
      size: 'invisible',
      callback: () => {
        console.log('reCAPTCHA verification successful');

            }
      

      
    }, auth);


    signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      .then((result) => {
        setConfirmationResult(result);
        toast.success('OTP sent to your phone number');
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        toast.error('Error sending OTP');
      });

    recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    });
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!verificationCode || !confirmationResult) {
      toast.error('Please enter OTP');
      return;
    }

    confirmationResult.confirm(verificationCode)
      .then((result) => {
        const user = result.user;
        console.log('User signed in successfully:', user);
        toast.success('OTP verified');
        navigate('/Aqi', { state: { username } });
      })
      .catch((error) => {
        console.error('Error verifying OTP:', error);
        toast.error('Invalid OTP');
      });
  };

  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, []);

  return (
    <>
      <Toaster/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-700">Phone Number Verification</h1>
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="form-group">
              <label htmlFor="phone-number" className="block text-sm font-medium text-gray-600">Phone Number</label>
              <input
                type="tel"
                id="phone-number"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div id="recaptcha-container"></div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">Send OTP</button>
          </form>
          {confirmationResult && (
            <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
              <div className="form-group">
                <label htmlFor="verification-code" className="block text-sm font-medium text-gray-600">Verification Code</label>
                <input
                  type="text"
                  id="verification-code"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <button type="submit" className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">Verify OTP</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default PhoneNumberVerification;
