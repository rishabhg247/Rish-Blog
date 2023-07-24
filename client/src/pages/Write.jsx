import React, { useState,useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const { currentUser } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [cat, setCat] = useState("");
  const [imgUploaded1, setImgUploaded1] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if(currentUser===null){navigate('/login')};
  },[])
  let mainObj={title,desc:value,cat,img:file,date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),uid:currentUser?.id}
  const handleClick = async (e) => {
    if(!currentUser){return alert("Please login first..")}
    e.preventDefault();
    if(value===""||title===""||file===""||cat===""){return alert("Please fill all details properly...")}
    e.preventDefault();
    try {
      await axios.post(`/posts/`,mainObj);
      navigate('/');setTimeout(()=>{alert("Post has been Created")},[1500])
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col px-20 mt-10">
      <h1 className="font-mono text-2xl mb-5 font-semibold">Create a new Blog!!</h1>
      <form className="flex gap-20 ">
      <div className=" flex w-full flex-col gap-5">
        <input required
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded-sm border-violet-200"
        />
        <div className="h-[300px] border border-gray-300 overflow-scroll">
          <ReactQuill required
            className="h-full "
            theme="snow"
            onChange={(e)=>{setValue(e.slice(3,e.length-4))}}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-2">
        <div className="border border-gray-300 p-2 flex flex-col justify-between">
        {imgUploaded1?  <div className='flex gap-2 justify-center items-center'>
                            <h1 className="text-2xl text-green-500 font-bold">&#x2713;</h1>
                            <img src={file} alt="Img" className=' rounded-full w-12 h-12 relative self-center sm:self-end' />
                        </div>
                     :
                        <div>
                        <input style={{ display: "none" }} type="file" id="file" name=""
                          onChange={(e) =>{setFile(URL.createObjectURL(e.target.files[0]));setImgUploaded1(true)}}/>
                        <label className="px-2 text-medium font-medium cursor-pointer" htmlFor="file">
                          Upload Image
                        </label>
                        </div>
                   }
        </div>
        <div className="item border border-gray-300 p-2 px-6 flex flex-col justify-start gap-2">
          <h1 className="text-xl">Category</h1>
          <div className=" flex items-center gap-2 text-violet-500">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label className="text-base font-medium" htmlFor="art">Art</label>
          </div>
          <div className="cat flex items-center gap-2 text-violet-500">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label className="text-base font-medium" htmlFor="science">Science</label>
          </div>
          <div className="cat flex items-center gap-2 text-violet-500">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label  className="text-base font-medium" htmlFor="technology">Technology</label>
          </div>
          <div className="cat flex items-center gap-2 text-violet-500">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label  className="text-base font-medium" htmlFor="food">Food</label>
          </div>
        </div>
        <div className="flex justify-between">
            <button type="submit"
              onClick={handleClick}
              className="cursor-pointer text-white bg-violet-500 border border-violet-500 px-3 py-1"
            >
              Publish
            </button>
          </div>
      </div>
      </form>
    </div>
  );
};

export default Write;
