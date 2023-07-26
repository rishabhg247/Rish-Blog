import React, { useEffect,useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post,setPost]=useState("");
  const [postUser,setPostUser]=useState(null);
  const [comment,setComment]=useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const fetchData = async () => {
    try {let res = await axios.get(`http://localhost:8800/api/posts/${postId}`);setPost(res.data);
    let res2 = await axios.get(`http://localhost:8800/api/posts/username/${postId}`);setPostUser(res2.data[0].username)
  }
    catch(err){console.log(err)}
  };
  useEffect(() => {
    fetchData();
  }, [postId]);
  async function addComment(){
    if(!currentUser){ setComment("");return alert("Please Login to write a comment")}
    if(!comment){return alert("Please Write something..")}
    let tempComment = { name: currentUser.username, comment: comment };
    let [currentComments,result]=[null,null]
    if(post.comments){currentComments = JSON.parse(post.comments);result = [...currentComments, tempComment]}else{result=[tempComment]}
    let resultString = JSON.stringify(result);
    try {
      await axios.put(`http://localhost:8800/api/posts/${postId}`, {resultString});
      fetchData();setComment("")
    } catch (err) {console.error("Error updating comments:", err)};
  }
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {post.length !== 0 ?
        <div className="m-10">
          <div className="flex justify-center items-center gap-10">
            <div className="w-1/2 h-[60vh] ">
              <img className="w-full h-full object-cover" src={post.img} alt="Post Image"/>
            </div>
            <div className="w-1/2 min-h-[60vh] flex flex-col gap-4">
              <p className="text-2xl font-serif font-semibold ">{post.title}...</p>
              <p className="text-xl font-base">{post.desc}</p>
              <p className="text-base text-slate-600 font-medium">Posted by {postUser} {moment(post.date).fromNow()}...</p>
            </div>
          </div>
          <div className="mt-5 ">
            <h1 className="text-2xl border-double py-2 border-b-2 border-t-2 border-slate-200 font-serif font-semibold">Comments :-
            </h1>
            {post.comments?
            <div>
            {JSON.parse(post.comments).map((i,I)=>{
              return(
                <div key={I} className="flex border-2 items-center rounded-lg px-4 border-violet-200  my-2 gap-2">
                  <div className="text-lg font-semibold">{i.name}</div>:
                  <div>{i.comment}</div>
                </div>
              )
            })}
          </div>
            :
            <h1 className="text-lg font-semibold">No comments Yet..</h1>
            }
            <div className="flex flex-col mt-4">
              <label htmlFor="comment" className="text-lg font-semibold">Write a Comment...</label>
              <input id="comment" value={comment} className="px-3 py-2 border-2 border-zinc-300 rounded-lg" type="text" onChange={(e)=>{setComment(e.target.value)}}/>
            </div>
            <button onClick={()=>{addComment()}} className="cursor-pointer rounded-md mt-2 text-white bg-violet-500 border border-violet-500 px-3 py-1">Submit</button>
          </div>
        </div>
        :
        null}
    </>
  );
};

export default Single;
