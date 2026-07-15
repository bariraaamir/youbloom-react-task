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

    // Check +254 followed by exactly 9 digits
    const isValidFormat = /^\+254\d{9}$/.test(phone);

    if (!isValidFormat) {
      setError("Enter a valid phone number (e.g. +254712345678)");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-80"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <label className="block text-sm font-medium mb-1">
          Phone Number
        </label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+254712345678"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;