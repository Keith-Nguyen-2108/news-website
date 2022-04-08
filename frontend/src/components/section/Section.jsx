import React, { useEffect, useState } from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import AOS from "aos";
import "aos/dist/aos.css";
import "./section.css";
import Section3 from "./Section3";
import SectionPost from "./SectionPost";
import Section4 from "./Section4";
import Section5 from "./Section5";
import { axiosGetData } from "../axios";

const Section = () => {
  AOS.init();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      await axiosGetData.get("/post/").then((res) => {
        let data = Object.values(res.data).filter(
          (item) => item.status === "Approved"
        );
        // console.log(data);
        setPosts(data);
      });
    };
    getPosts();
  }, []);

  const topThreePostsForSection1 = posts && posts.slice(0, 3);
  const nextSixPostsForSection2 = posts && posts.slice(3, 9);
  const nextFourPostsForSection3 = posts && posts.slice(9, 13);
  const nextFourPostsForSection4 = posts && posts.slice(13, 17);
  const nextFourPostsForSection5 = posts && posts.slice(17, 21);
  const takeAllRemainingPosts = posts && posts.slice(21, posts.length - 1);

  return (
    <React.Fragment>
      <Section1 posts={topThreePostsForSection1} />
      <Section2 posts={nextSixPostsForSection2} />
      <Section3 posts={nextFourPostsForSection3} />
      <Section4 posts={nextFourPostsForSection4} />
      <Section5 posts={nextFourPostsForSection5} />
      <SectionPost posts={takeAllRemainingPosts} />
    </React.Fragment>
  );
};

export default Section;
