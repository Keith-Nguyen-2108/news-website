import React from "react";
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

const Section = () => {
  AOS.init();
  return (
    <div>
      <Section1 category={category} />
      <Section2 category={category} />
      <Section3 category={category} />
      <Section4 category={category} />
      <Section5 category={category} />
      <SectionPost category={category} />
    </div>
  );
};

export default Section;
