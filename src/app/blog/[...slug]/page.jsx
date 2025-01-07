// Ensures the page is rendered dynamically
export const dynamic = "force-dynamic";
import styles from "./slug.module.css";
import { getBlogsByCategory, getBlog } from "@/blogData/blogData";
import PaginationComponents from "@/components/pagination/PaginationComponents";
import Comments from "@/components/commentSection/Comments";
import BlogError from "@/components/BlogError";
import BlogDetail from "@/components/blogDetail/BlogDetail";
import BlogsByCategory from "@/components/blogsByCategory/BlogsByCategory";

const formatText = (text) => text.replace(/-/g, " ");

export async function generateMetadata({ params }) {
  const slugparam = await params;
  const slug = slugparam.slug;

  if (slug.length === 1) {
    const categoryName = formatText(slug[0]);
    return {
      title: `${categoryName} blogs made by Made4Cloud LTD`,
      description: `Explore blogs about ${categoryName} from Made4Cloud LTD. `,
    };
  } else if (slug.length === 2) {
    const categoryName = formatText(slug[0]);
    const blogTitle = formatText(slug[1]);
    return {
      title: `${blogTitle || "Blog"} - ${categoryName} `,
      description: `In this blog you will learn more about ${
        blogTitle || "this blog"
      } `,
    };
  }
  return {
    title: "Made4Cloud Blogs",
    description: "Discover our latest blogs at Made4Cloud LTD.",
  };
}

export async function generateStaticParams() {
  return []; // Dynamically fetch params at runtime
}

export default async function Blog({ params, searchParams }) {
  const searchparam = await searchParams;
  const page = searchparam.page;
  const slugParam = await params;
  const slug = slugParam.slug;

  if (slug.length === 2) {
    const categoryName = slug[0];
    const blogTitle = slug[1];
    const blog = await getBlog(categoryName, blogTitle);

    if (!blog) {
      return <BlogError />;
    }
    return (
      <div className={styles.backgroundDiv}>
        {/* <div className={`${styles.container} ${styles.containerSingleBlog}`}>
          <div className={`${styles.slugContainer} ${styles.slugPost}`}>
            <div className={styles.singleBlog}>
              <div className={styles.imageBigContainer}>
                <h3 className={styles.titleOverLay}>{blog?.title}</h3>
                <Image
                  fill
                  src={"/images/blogPicture2.png"}
                  alt={blog?.title}
                />
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
        </div> */}
        <BlogDetail blog={blog} />

        <Comments blogComments={blog.comments} blogId={blog._id} />
      </div>
    );
  }

  if (slug.length === 1) {
    const categoryName = slug[0];
    const { blogs, blogsPerCategory } = await getBlogsByCategory(
      categoryName,
      page
    );

    if (!blogs) {
      return (
        <div>
          <h1 className="text-2xl text-center mt-[200px]">
            No blogs for this category yet
          </h1>
        </div>
      );
    }

    return (
      <>
        {/* <div className={styles.container}>
          <div className={styles.slugContainer}>
            <h1>{categoryName.replace(/-/g, " ")}</h1>
            <div className={styles.allBlogs}>
              {blogs.map((item) => (
                <div className={styles.blog} key={item._id}>
                  <div className={styles.imageContainer}>
                    <h3 className={styles.titleOverLay}>{item.title}</h3>
                    <Image
                      fill
                      src={"/images/blogPicture2.png"}
                      alt={item.title}
                    />
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
        </div> */}
        <BlogsByCategory blogs={blogs} categoryName={categoryName} />

        <PaginationComponents
          url={`/blog/${categoryName.replace(/ /g, "-")}`}
          totalBlogs={blogsPerCategory}
        />
      </>
    );
  }
}
