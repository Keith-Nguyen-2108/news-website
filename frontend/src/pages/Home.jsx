import React from "react";
import Section from "../components/section/Section";
import Slider from "../components/slider/Slider";

const Home = () => {
  return (
    <div className="home" style={{ overflow: "hidden" }}>
      <Slider />
      <Section />
    </div>
  );
};

export default Home;
