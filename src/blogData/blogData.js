import axios from "axios";

///////////////////////////////////////////////////////////
const API_URL = process.env.NEXT_PUBLIC_API_URL;
// export async function getAllBlogs() {
//   try {
//     const res = await axios.get(`${API_URL}/api/allBlogs`);
//     const allBlogs = res.data;
//     return allBlogs;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function getBlogsFromMyApi(page = "1") {
  try {
    const res = await axios.get(`${API_URL}/api/blogs?page=${page}`);
    const { blogs, totalBlogs } = res.data;
    return { blogs, totalBlogs };
  } catch (error) {
    console.log(error);
  }
}
export async function getBlogsByCategory(categoryName, page = "1") {
  try {
    const response = await axios.get(
      `${API_URL}/api/blogs/${categoryName}?page=${page}`
    );
    const { blogs, blogsPerCategory } = response.data;
    return { blogs, blogsPerCategory };
  } catch (error) {
    console.log(error);
  }
}

export async function getBlog(categoryName, blogTitle) {
  try {
    const response = await axios.get(
      `${API_URL}/api/blogs/${categoryName}/${blogTitle}`
    );
    const blog = response.data;
    return blog;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllCategories() {
  try {
    const res = await axios.get(`${API_URL}/api/category`);
    const allCategories = res.data;
    return allCategories;
  } catch (error) {
    console.log(error);
  }
}
