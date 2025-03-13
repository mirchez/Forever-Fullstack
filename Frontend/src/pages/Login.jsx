import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurretState] = useState("Login");
  const { token, setToken, navigate, backendUrl, getUserCart } =
    useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("adminpass");
  const [email, setEmail] = useState("admin@forever.com");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sing Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Not valid credentials");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
      getUserCart(token);
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 mt-14 mb-40 gap-4 text-gray-800 mx-auto"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          type="text"
          placeholder="Name"
          className="w-full px-3 py-3 border border-gray-800"
        />
      )}

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        type="email"
        placeholder="Email"
        className="w-full px-3 py-3 border border-gray-800"
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        type="password"
        placeholder="Password"
        className="w-full px-3 py-3 border border-gray-800"
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password ?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurretState("Sing Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p onClick={() => setCurretState("Login")} className="cursor-pointer">
            Login Here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sing In" : "Sing Up"}
      </button>
    </form>
  );
};

export default Login;
