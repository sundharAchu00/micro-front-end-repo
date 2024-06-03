import React from "react";
import { MainCaroselData } from "./MainCaroselData";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const MainCarosel = () => {
  const items = MainCaroselData.map((item) => (
    <img
      className="cursor-pointer rounded object-fit-cover vw-100 "
      role="presentation"
      src={item.image}
      style={{
        // width: "100%",
        height: "400px",
      }}
      alt=""
    />
  ));

  return (
    <div className="ps-2 pe-2 mt-2 rounded">
      <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
      />
    </div>
  );
};

export default MainCarosel;
