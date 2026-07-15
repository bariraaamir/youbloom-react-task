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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-purple-600 hover:underline mb-4 inline-block"
        >
          ← Back to Main Page
        </button>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {user && (
          <div className="bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-semibold mb-2">{user.name}</h1>
            <p className="text-gray-500 mb-4">@{user.username}</p>

            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Phone:</span> {user.phone}</p>
              <p><span className="font-medium">Website:</span> {user.website}</p>
              <p><span className="font-medium">Company:</span> {user.company?.name}</p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {user.address?.street}, {user.address?.city}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailPage;