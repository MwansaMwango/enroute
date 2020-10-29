import React, { Component } from "react";
import Slider from "react-slick";
import { Grid } from "@material-ui/core/";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../node_modules/slick-carousel/slick/slick.css";
import ImgMediaCard from "../ImgMediaCard";
import ImgMediaCardStats from "../ImgMediaCardStats";
import Typography from "@material-ui/core/Typography";

export default function SimpleSlider(feedList) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // pauseOnFocus: true,
  };
  return (
    <div>
      <Slider {...settings}>
        <div>
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            <ImgMediaCard feed={feedList[0]} />
          </h3>
        </div>
        <div>
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            <ImgMediaCardStats feed={feedList[1]} />
          </h3>
        </div>
        <div>
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            <ImgMediaCard feed={feedList[2]} />
          </h3>
        </div>
        {/* <div>
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            <ImgMediaCard feed={feedList[3]} />
          </h3>
        </div>
        <div>
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            <ImgMediaCard feed={feedList[4]} />
          </h3>
        </div> */}
      </Slider>
    </div>
  );
}
