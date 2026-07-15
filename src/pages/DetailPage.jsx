import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../services/api";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (err) {
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-4 py-8">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-sm font-medium text-purple-600 hover:text-purple-800 mb-4 inline-flex items-center gap-1 transition"
        >
          ← Back to Users
        </button>

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

        {user && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur text-white text-2xl font-bold flex items-center justify-center mb-3">
                {getInitials(user.name)}
              </div>
              <h1 className="text-xl font-bold text-white">{user.name}</h1>
              <p className="text-purple-100 text-sm">@{user.username}</p>
            </div>

            <div className="p-6 space-y-4">
              <DetailRow icon="✉️" label="Email" value={user.email} />
              <DetailRow icon="📞" label="Phone" value={user.phone} />
              <DetailRow icon="🌐" label="Website" value={user.website} />
              <DetailRow
                icon="🏢"
                label="Company"
                value={user.company?.name}
              />
              <DetailRow
                icon="📍"
                label="Address"
                value={`${user.address?.street}, ${user.address?.city}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
      <span className="text-lg">{icon}</span>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}

export default DetailPage;