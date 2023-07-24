import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);setPosts(res.data);
      } catch (err) {console.log(err)}
    };
    fetchData();
  }, [cat]);

  return (
    <div>
      <div className="min-h-[70vh] px-20">
        {posts.map((post) => (
          <div className="h-[270px] p-4 border shadow-lg border-violet-200 rounded-md my-10 flex justify-between gap-10" key={post.id}>
            <div className="flex justify-center items-center w-2/6">
              <img className="w-full max-h-[270px] shadow-xl rounded-md h-full object-cover" src={post.img} alt="image" />
            </div>
            <div className="flex flex-col w-4/6 gap-3 ">
              <Link className="link" to={`/post/${post.id}`}>
                <h1 className="text-2xl font-serif font-semibold ">{post.title}</h1>
              </Link>
              <p className="text-lg font-base">{post.desc.substring(0, 340)}{post.desc.length > 100 ? "..." : ""}</p>
              <Link className="link" to={`/post/${post.id}`}>
              <button className="text-violet-500 mt-4 self-start border border-violet-500 rounded-sm px-3 py-1 hover:text-white hover:bg-violet-500">Open full Blog</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
