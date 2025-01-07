"use client";
import Image from "next/image";
import CommentForm from "./CommentForm";
import { useState } from "react";
import formattedDate from "@/helpers/formattedDate";

function Comments({ blogComments, blogId }) {
  const [comments, setComments] = useState(blogComments || []);

  return (
    <div className=" bg-gray-200 p-2 rounded  mt-5">
      <h1 className="text-center text-xl text-red-600 mb-6 mt-4">
        Comment section
      </h1>

      <CommentForm blogId={blogId} setComments={setComments} />

      {comments.map((comment) => (
        <div
          key={comment._id}
          className="p-4 rounded-xl bg-gray-300 mt-7  mb-5 max-w-full"
        >
          <div className="flex items-center gap-2 mb-3 max-w-full">
            <Image
              className="rounded-full"
              src={"/images/Unknown_person.jpg"}
              width={50}
              height={50}
              alt="user_image"
            />
            <div className="text-gray-700">
              <h3>{comment.author}</h3>
              <p>{formattedDate(comment?.createdAt)}</p>
            </div>
          </div>

          <p className="max-w-full break-words overflow-hidden">
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
