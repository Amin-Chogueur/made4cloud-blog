import Image from "next/image";
import formattedDate from "@/helpers/formattedDate";
import styles from "./blog.module.css";
function BlogDetail({ blog }) {
  const createdDate = formattedDate(blog?.createdAt);
  return (
    <div className={`${styles.container} ${styles.containerSingleBlog}`}>
      <div className={`${styles.slugContainer} ${styles.slugPost}`}>
        <div className={styles.singleBlog}>
          <div className={styles.imageBigContainer}>
            <h3 className={styles.titleOverLay}>{blog?.title}</h3>
            <Image fill src={"/images/blogPicture2.png"} alt={blog?.title} />
          </div>
          <p className={styles.category}>{blog.category.name}</p>
          <h3 className={styles.title}>{blog.title}</h3>

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
          <span>Made4cloud / {createdDate}</span>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
