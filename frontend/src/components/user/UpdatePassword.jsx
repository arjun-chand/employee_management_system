import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/joy/Alert';
import { useNavigate } from 'react-router-dom';

export default function UpdatePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const updatePassword = async () => {
        try {
            const response = await axios.put('http://localhost:3100/security', {
                oldPassword,
                newPassword,
                confirmNewPassword
            },
            {
                withCredentials: true // This ensures cookies are sent with the request
            });
            setMessage(response.data.message);
            setError('');
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                navigate('/');
            }, 3000);
        } catch (error) {
            setMessage('');
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Server error');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Update Password</h2>
                </div>
                {showAlert && <Alert severity="success" onClose={() => setShowAlert(false)} variant="outlined" sx={{ mb: 2 }}>Password updated successfully</Alert>}
                {error && <Alert severity="error" variant="outlined" sx={{ mb: 2 }}>{error}</Alert>}
                <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); updatePassword(); }}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="oldPassword" className="sr-only">Old Password</label>
                            <input id="oldPassword" name="oldPassword" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="sr-only">New Password</label>
                            <input id="newPassword" name="newPassword" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="confirmNewPassword" className="sr-only">Confirm New Password</label>
                            <input id="confirmNewPassword" name="confirmNewPassword" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
