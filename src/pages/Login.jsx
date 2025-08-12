import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await loginUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-indigo-300 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
