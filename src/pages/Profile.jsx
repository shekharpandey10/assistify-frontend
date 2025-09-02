import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import { User, Mail, Shield } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Avatar Circle */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold shadow-md">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.name}
          </h1>
          <p className="text-gray-500">{user.role}</p>
        </div>

        {/* Info Section */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
            <User className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700 font-medium">{user.name}</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
            <Mail className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">{user.email}</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
            <Shield className="w-5 h-5 text-purple-600" />
            <span className="text-gray-700 capitalize">{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
