import SideBar from "@/components/sideBar/SideBar";
import styles from "./layoutStyle.module.css";
import { getAllCategories } from "@/blogData/blogData";
export const metadata = {
  title:
    "Made4Cloud Ltd Blog | Insights on CloudCraze, B2B Commerce, and Cloud Solutions",
  description:
    "Stay updated with the latest blogs from Made4Cloud Ltd, covering CloudCraze tips, B2B Commerce trends, Sales Cloud, Service Cloud, and more cloud technologies.",
  keywords: [
    "CloudCraze blog",
    "cloud technology insights",
    "B2B Commerce blogs",
    "Sales Cloud",
    "Service Cloud",
    "cloud solutions blog",
    "Made4Cloud Ltd",
  ],
};

export default async function BlogsLayout({ children }) {
  const allCategories = await getAllCategories();
  return (
    <div className={styles.layoutStyle}>
      {" "}
      <SideBar allCategories={allCategories} />
      <div className={styles.mainSection}>{children}</div>
    </div>
  );
}
