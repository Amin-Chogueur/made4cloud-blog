"use client";
import { useState } from "react";
import styles from "./sideBar.module.css";
import Link from "next/link";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { usePathname } from "next/navigation";

function SideBar({ allCategories }) {
  const pathName = usePathname();
  const [showCategories, setShoCategories] = useState(false);
  function handleShowCategories() {
    setShoCategories((prev) => !prev);
  }

  return (
    <>
      <div className={styles.sideBar}>
        <div className={styles.sticky}>
          <h2>Blogs Categories</h2>
          {
            <ol>
              <li className={pathName === "/blog" ? styles.active : " "}>
                <Link href={"/blog"}>All Blogs</Link>
              </li>
              {allCategories?.map((category, i) => (
                <li
                  key={i}
                  className={
                    pathName.includes(
                      `/blog/${category.name.replace(/ /g, "-")}`
                    )
                      ? styles.active
                      : " "
                  }
                >
                  <Link href={`/blog/${category.name.replace(/ /g, "-")}`}>
                    {category.name.replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ol>
          }
        </div>
      </div>

      <div className={styles.sideBarPhone}>
        <button onClick={handleShowCategories}>
          Blogs Categories
          <MdKeyboardDoubleArrowDown style={{ margin: "auto" }} />
        </button>

        {showCategories && (
          <ol>
            <li className={pathName === "/blog" ? styles.active : " "}>
              <Link href={"/blog"} onClick={() => setShoCategories(false)}>
                All Blogs
              </Link>
            </li>
            {allCategories?.map((category, i) => (
              <li
                key={i}
                className={
                  pathName.includes(`/blog/${category.name.replace(/ /g, "-")}`)
                    ? styles.active
                    : " "
                }
              >
                <Link
                  href={`/blog/${category.name.replace(/ /g, "-")}`}
                  onClick={() => setShoCategories(false)}
                >
                  {category.name.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}

export default SideBar;
