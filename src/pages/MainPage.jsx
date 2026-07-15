import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/api";

function MainPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Users</h1>
            <p className="text-sm text-gray-500">
              {filteredUsers.length} people found
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-purple-600 hover:text-purple-800 bg-white px-4 py-2 rounded-lg shadow-sm border border-purple-100 hover:shadow transition"
          >
            Logout
          </button>
        </div>

        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
          />
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-100 rounded-lg p-4 text-center">
            {error}
          </p>
        )}

        {!loading && !error && (
          <ul className="space-y-3">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => navigate(`/detail/${user.id}`)}
                className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-purple-200 hover:-translate-y-0.5 transition-all flex items-center gap-4"
              >
                <div className="w-11 h-11 shrink-0 rounded-full bg-purple-100 text-purple-700 font-semibold flex items-center justify-center">
                  {getInitials(user.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
                <span className="ml-auto text-gray-300 group-hover:text-purple-400 transition">
                  →
                </span>
              </li>
            ))}

            {filteredUsers.length === 0 && (
              <p className="text-gray-400 text-center py-8">
                No users found matching "{search}"
              </p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MainPage;