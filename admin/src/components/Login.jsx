import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import LoadingOverlay from "./LoadingOverlay";
import Loader from "./Loader";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Login = ({ setToken, loading, setLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (res?.data?.success) {
        setToken(res.data.token);
        setLoading(false);
        toast.success("Login successful");
      } else {
        setLoading(false);
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("failed to login:", error);
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center bg-gray-50 px-5">
      {loading && (
        <LoadingOverlay>
          <Loader />
        </LoadingOverlay>
      )}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-[400px] mx-auto px-4 py-10 border rounded-lg flex flex-col gap-5 shadow-xl"
      >
        <h1 className="text-2xl font-semibold mb-4 text-left bg-gradient-to-l from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-blue-500"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-blue-500"
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full p-2 text-white font-medium rounded-md bg-gradient-to-r from-cyan-400 to-blue-500 cursor-pointer transition transform active:scale-90"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
