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
import { category } from "../slider/sliderItem";
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

  return (
    <div>
      <Section1 posts={topThreePostsForSection1} />
      <Section2 posts={nextSixPostsForSection2} />
      <Section3 category={category} />
      <Section4 category={category} />
      <Section5 category={category} />
      <SectionPost category={category} />
    </div>
  );
};

export default Section;
