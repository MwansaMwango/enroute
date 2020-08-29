import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid } from "@material-ui/core/";
export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <h2> Newsfeed</h2>

      <Slider {...settings}>
        <div>
          <h3>Jene Wilson from marking just earned 20pts...</h3>
        </div>
        <div>
          <h3>Redeem new bose headphones with only 250pts...</h3>
        </div>
        <div>
          <h3>Rachel Hunter has completed a trip to Belmont...</h3>
        </div>
        <div>
          <h3>Redeem lunch for two at Suchi Kings - 150pts</h3>
        </div>
        <div>
          <h3>You have saved 500kgs of GGE his year</h3>
        </div>
      </Slider>
    </div>
  );
}
