import Image from "next/image";
import Link from "next/link";
import formattedDate from "@/helpers/formattedDate";
import styles from "./blogsByCategory.module.css";
function BlogsByCategory({ blogs, categoryName }) {
  return (
    <div className={styles.container}>
      <div className={styles.slugContainer}>
        <h1>{categoryName.replace(/-/g, " ")}</h1>
        <div className={styles.allBlogs}>
          {blogs.map((item) => (
            <div className={styles.blog} key={item._id}>
              <div className={styles.imageContainer}>
                <h3 className={styles.titleOverLay}>{item.title}</h3>
                <Image fill src={"/images/blogPicture2.png"} alt={item.title} />
              </div>
              <p className={styles.category}>{item.category.name}</p>
              <h3 className={styles.blogTitle}>{item.title}</h3>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
              <span>Made4cloud / {formattedDate(item?.createdAt)}</span>
              <Link
                className={styles.readAllLink}
                href={`/blog/${categoryName.replace(
                  / /g,
                  "-"
                )}/${item.title.replace(/ /g, "-")}`}
              >
                READ ALL
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogsByCategory;
