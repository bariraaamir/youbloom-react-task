import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }

    if (!phone.startsWith("+254")) {
      setError("Phone number must start with +254");
      return;
    }

    const isValidFormat = /^\+254\d{9}$/.test(phone);

    if (!isValidFormat) {
      setError("Enter a valid phone number (e.g. +254712345678)");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white/80 backdrop-blur-sm border border-purple-100 p-8 rounded-2xl shadow-xl shadow-purple-100">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              Y
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-1 text-center text-gray-800">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Sign in with your phone number
          </p>

          <form onSubmit={handleLogin}>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254712345678"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            />

            <div className="min-h-[20px] mb-2">
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-medium py-2.5 rounded-lg hover:bg-purple-700 active:scale-[0.98] transition-all shadow-md shadow-purple-200 mt-2"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-6">
            Use format: +254 followed by 9 digits
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;