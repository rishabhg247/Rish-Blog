import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer className="mt-[100px] p-[20px] flex justify-between text-white bg-violet-400">
      <img className="h-[50px]" src={Logo} alt="" />
      <div>
        <p>Designed By <b>Rishabh_Gupta</b></p>
      <span>Made with <span className="text-red-500 text-xl">♥️</span> and <b>React.js</b></span>
      </div>
    </footer>
  );
};

export default Footer;
