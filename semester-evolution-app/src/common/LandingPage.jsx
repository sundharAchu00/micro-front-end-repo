import React from "react";
import CommonNavBar from "./CommonNavBar";
import MainCarosel from "./MainCarosel";
import Footer from "./Footer";
import AboutUs from "./AboutUs";

const LandingPage = () => {
  return (
    <div>
      {/* <ResponsiveAppBar /> */}
      <CommonNavBar />
      <MainCarosel />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default LandingPage;
