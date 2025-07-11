import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner/Spinner';
import { CommonApiUrl } from '../HttpCommon';
import { AdminContext } from '../Context/AdminContext/AdminContext';

// ✅ Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "Minimum 3 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Minimum 8 characters").required("Password is required"),
  terms: yup.bool().oneOf([true], "You must accept the terms"),
});

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AdminContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${CommonApiUrl}/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      Swal.fire("Good job!", "Your account has been created!", "success");
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Left Image */}
          <div className="hidden md:flex w-1/2 items-center justify-center bg-blue-50">
            <img
              src="https://i.postimg.cc/TP2tNcYW/Ecommerce-web-page-cuate.png"
              alt="illustration"
              className="max-w-[85%] h-auto"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
              <h1 className="text-3xl font-extrabold text-gray-800">Create your account</h1>
              <p className="text-sm text-gray-500 mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                {/* Name */}
                <div>
                  <input
                    {...register("name")}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <input
                    {...register("email")}
                    placeholder="Email Address"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-600"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                {/* Terms */}
                <div className="flex items-center">
                  <input
                    {...register("terms")}
                    type="checkbox"
                    className="mr-2 h-4 w-4 border-gray-300 rounded text-blue-600"
                  />
                  <label className="text-sm text-gray-700">
                    I agree to the <span className="underline">Terms & Conditions</span>
                  </label>
                </div>
                {errors.terms && <p className="text-red-500 text-sm -mt-3">{errors.terms.message}</p>}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
