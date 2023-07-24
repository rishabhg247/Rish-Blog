import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="w-[98.5vw] border-b border-slate-200 px-3" >
  <div className="py-2 flex items-center justify-between">
    <div className="logo">
      <Link to="/">
        <div style={{
        fontFamily: "'Dancing Script', cursive",
        fontWeight: 300,
      }} className="flex justify-center items-center text-2xl">
          <p className="border border-white rounded-full bg-violet-500 text-white px-1 py-3">Rish</p><p>Blog</p>
        </div>
      </Link>
    </div>
    <div className="flex items-center gap-4">
      <Link to="/">
        <h6 className="text-lg font-medium">HOME</h6>
      </Link>
      <Link to="/?cat=art">
        <h6 className="text-lg font-medium">ART</h6>
      </Link>
      <Link to="/?cat=science">
        <h6 className="text-lg font-medium">SCIENCE</h6>
      </Link>
      <Link to="/?cat=technology">
        <h6 className="text-lg font-medium">TECHNOLOGY</h6>
      </Link>
      <Link to="/?cat=food">
        <h6 className="text-lg font-medium">FOOD</h6>
      </Link>
      <span className="text-xl  font-mono text-violet-800 font-semibold"> {currentUser?`Hi ${currentUser.username}`:null}</span>
      {currentUser ? (
        <button onClick={logout} className="text-base hover:text-violet-500 rounded-md border border-violet-500 px-4 py-1 font-medium">
          Logout
        </button>
      ) : (
        <Link className="text-base hover:text-violet-500 rounded-md border border-violet-500 px-4 py-1 font-medium" to="/login">
          Login
        </Link>
      )}
      <span className="write">
        <Link className="link" to="/write">
          <div className="bg-violet-500 rounded-md font-medium flex items-center justify-center text-white border-2 px-4 py-1 border hover:text-violet-500 hover:bg-white hover:border-violet-500">
            Write a Blog
          </div>
        </Link>
      </span>
    </div>
  </div>
</div>
  );
};

export default Navbar;
