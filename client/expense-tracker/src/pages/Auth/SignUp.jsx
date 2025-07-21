import React, { useState } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/Inputs/input';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = '';

    if (!fullName) return setError('Please enter your name');
    if (!validateEmail(email)) return setError('Please enter a valid email address');
    if (!password) return setError('Please enter a password');
    if (password.length < 8) return setError('Password must be at least 8 characters long');

    setError('');

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { userId } = response.data;
      navigate('/verify-otp', { state: { userId } });
    } catch (error) {
      setError(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center h-full w-full">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl animate-fadeIn">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-indigo-700 animate-pulse">Join Us 🚀</h2>
            <p className="text-sm text-gray-600 mt-2">
              Create your account by filling out the details below.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="flex justify-center">
              <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={({ target }) => setFullName(target.value)}
                  placeholder="Sathwik"
                  className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Minimum 8 Characters"
                className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
              />
            </div>

            {error && <p className="text-red-500 text-sm animate-fadeIn">{error}</p>}

            <button
              type="submit"
              className="w-full py-2.5 font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-600 mt-3">
              Already have an account?{' '}
              <Link
                className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
      `}</style>
    </AuthLayout>
  );
};

export default SignUp;
