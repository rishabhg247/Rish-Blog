import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs,setInputs]=useState({username: "",password: "",});
  const [loader,setLoader]=useState(false)
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }setLoader(false);
  };
  return (
    <div  className=' flex w-full gap-3  flex-col items-center '>
      <h1  className='sm:text-2xl text-base font-medium'>Login</h1>
      <form className="p-8 border flex flex-col gap-4  border-slate-200  shadow-lg'">
        <div>
          <label className='text-sm font-bold' htmlFor="username">Username</label>
          <input required className='border sm:w-[300px] w-[250px] text-md rounded-md shadow-md p-1 block border-slate-200' type="text" placeholder="username" name="username" onChange={handleChange}/>
        </div>
        <div>
          <label className='text-sm font-bold' htmlFor="password">Password</label>
          <input required className='border text-md p-1 rounded-md sm:w-[300px] w-[250px] shadow-md block border-slate-200' type="password" placeholder="password" name="password" onChange={handleChange}/>
        </div>
        {loader?
        <button className='w-full  py-2 my-3 text-slate-700 rounded-md text-md font-medium  text-sm bg-slate-200  text-center' >Login</button>
        :
        <button className='w-full  py-2 my-3 text-white rounded-md text-md font-medium text-sm bg-violet-600  text-center' onClick={handleSubmit}>Login</button>
        }
        {err && <p className="text-red-600">{err}</p>}
        <span>
          Don't you have an account? <Link className="text-violet-600" to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
