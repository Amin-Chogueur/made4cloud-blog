"use client";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CommentForm({ blogId, setComments }) {
  const [commentData, setCommentData] = useState({
    author: "",
    email: "",
    content: "",
  });
  const [status, setStatus] = useState("Post Comment");
  async function handleSubmitComment(e) {
    e.preventDefault();
    setStatus("In Progress...");
    try {
      const newComment = { ...commentData, blogId };
      const res = await axios.post(
        "https://made4cloud-admin.vercel.app/api/comments",
        newComment
      );
      const createdComment = res.data;
      console.log(createdComment);
      setComments((comments) => [...comments, createdComment]);
      setCommentData({
        author: "",
        email: "",
        content: "",
      });
      toast.success("Comment sent successfuly");
    } catch (error) {
      console.log(error);
      toast.error("Error sending Comment!");
    } finally {
      setStatus("Post Comment");
    }
  }
  return (
    <>
      <form
        className="flex flex-col gap-6 sm:gap-7"
        onSubmit={handleSubmitComment}
      >
        <div>
          <p className="text-sm sm:text-base">
            Leave a Reply{" "}
            <span className="text-gray-500">
              (Your email address will not be published).
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-7">
          <input
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full sm:w-[48%]"
            type="text"
            placeholder="Name..."
            required
            name="author"
            value={commentData.author}
            onChange={(e) =>
              setCommentData({
                ...commentData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <input
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full sm:w-[48%]"
            type="email"
            placeholder="Email..."
            required
            name="email"
            value={commentData.email}
            onChange={(e) =>
              setCommentData({
                ...commentData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>

        <textarea
          className="rounded-lg p-3 min-h-[200px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
          placeholder="Your Comment"
          required
          name="content"
          value={commentData.content}
          onChange={(e) =>
            setCommentData({ ...commentData, [e.target.name]: e.target.value })
          }
        ></textarea>

        <button className="bg-cyan-600 p-3 rounded-md w-full sm:w-auto text-white font-semibold mt-4 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500">
          {status}
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default CommentForm;
