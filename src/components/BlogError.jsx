export default function BlogError() {
  return (
    <div className="h-[80vh] flex flex-col gap-10 justify-center items-center mt-[100px]">
      <h1 className="text-red-700 text-2xl">Oops! Something went wrong</h1>
      <p> "We couldn't process your request."</p>
      <a className="text-cyan-600 underline" href="/blog">
        Back to Blogs
      </a>
    </div>
  );
}
