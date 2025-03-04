import React, { useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { navigate, backendUrl, token, setToken,fetchCartData,setUser } = useShopContext();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentState, setCurrentState] = useState("Login");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const res = await axios.post(`${backendUrl}/api/user/register`, {
          fullname,
          email,
          password,
        });
        if (res.data.success) {
          setToken(res.data.token);
          navigate("/");
          setUser(res.data.user)
          localStorage.setItem("token", token);
          localStorage.setItem("user",JSON.stringify(res.data.user))
          toast.success("Signup successfull");
          console.log(res);
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (res?.data?.success) {
          setToken(res?.data?.token);
          setUser(res.data.user)
          localStorage.setItem("token", token);
          localStorage.setItem("user",JSON.stringify(res.data.user))
          navigate("/");
          toast.success("Login successful");
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log("Failed to authenticate:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token && token.length > 0) {
      navigate("/");
      fetchCartData(token)
    }
  }, [token]);
  return (
    <div className="w-full flex flex-col justify-center items-center py-20 sm:py-28">
      <div className="flex items-center gap-3">
        <h1 className="prata-regular text-4xl">{currentState}</h1>
        <p className="w-8 sm:w-11 h-[2px] bg-gradient-to-l from-cyan-400 to-blue-500"></p>
      </div>
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-[400px] mx-auto flex flex-col gap-4 mt-8"
      >
        {currentState === "Login" ? null : (
          <input
            type="text"
            placeholder="Full name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-3 py-3 border border-black outline-blue-400 "
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-3 border border-black outline-blue-400 "
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-3 border border-black outline-blue-400 "
        />
        <div className="flex justify-between -mt-2">
          <p className="cursor-pointer hover:underline">Forget password?</p>
          {currentState === "Login" ? (
            <p
              className="cursor-pointer underline"
              onClick={() => setCurrentState("Sign Up")}
            >
              Create account
            </p>
          ) : (
            <p
              className="cursor-pointer underline"
              onClick={() => setCurrentState("Login")}
            >
              Login here
            </p>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-2/5 p-3 bg-gradient-to-l from-cyan-400 to-blue-500 text-white cursor-pointer transition transform active:scale-90 hover:bg-opacity-15"
          >
            {currentState === "Login" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
