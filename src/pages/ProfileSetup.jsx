import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

const relationships = [
  "Mother", "Father", "Brother", "Sister", "Grandfather",
  "Grandmother", "Uncle", "Aunt", "Cousin", "Friend", "Teacher", "Mentor"
];

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "bn", label: "বাংলা" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
];

export default function ProfileSetup() {
  const { user, token } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("relationship", data.relationship);
      formData.append("language", data.language);
      formData.append("avatar", data.avatar[0]);

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/profile/setup`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      navigate("/chat");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 to-pink-200 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Profile Setup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Relationship */}
          <div>
            <label className="block mb-1 font-medium">Select Relationship</label>
            <select
              {...register("relationship", { required: "Relationship is required" })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">-- Choose --</option>
              {relationships.map((rel) => (
                <option key={rel} value={rel}>{rel}</option>
              ))}
            </select>
            {errors.relationship && <p className="text-red-500 text-sm">{errors.relationship.message}</p>}
          </div>

          {/* Language */}
          <div>
            <label className="block mb-1 font-medium">Preferred Language</label>
            <select
              {...register("language", { required: "Language is required" })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">-- Choose --</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
            {errors.language && <p className="text-red-500 text-sm">{errors.language.message}</p>}
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="block mb-1 font-medium">Upload Avatar</label>
            <input
              type="file"
              accept="image/*"
              {...register("avatar", { required: "Avatar is required" })}
              onChange={handleAvatarChange}
              className="w-full"
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="mt-3 w-24 h-24 rounded-full object-cover"
              />
            )}
            {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
