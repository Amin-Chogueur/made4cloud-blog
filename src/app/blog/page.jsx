import styles from "./blog.module.css";
import Link from "next/link";
import { getBlogsFromMyApi } from "@/blogData/blogData";
import Image from "next/image";
import PaginationComponents from "@/components/pagination/PaginationComponents";
import formattedDate from "@/helpers/formattedDate";
export default async function Blog({ searchParams }) {
  const params = await searchParams;
  const page = params.page;
  const { blogs, totalBlogs } = await getBlogsFromMyApi(page);
  return (
    <>
      <main>
        <h1 className={styles.blogsTitle}>All Blogs </h1>
        <div className={styles.allBlogs}>
          {blogs.map((blog) => (
            <div className={styles.blog} key={blog._id}>
              <div className={styles.imageContainer}>
                <h3 className={styles.titleOverLay}>{blog.title}</h3>
                <Image fill src={"/images/blogPicture2.png"} alt={blog.title} />
              </div>
              <p className={styles.category}>{blog.category.name}</p>
              <h3 className={styles.title}>{blog.title}</h3>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              <span>Made4cloud / {formattedDate(blog?.createdAt)}</span>
              <Link
                className={styles.readAllLink}
                href={`/blog/${blog.category.name.replace(
                  / /g,
                  "-"
                )}/${blog.title.replace(/ /g, "-")}`}
              >
                READ ALL
              </Link>
            </div>
          ))}
        </div>
      </main>
      <PaginationComponents url={"/blog"} totalBlogs={totalBlogs} perPage={6} />
    </>
  );
}
