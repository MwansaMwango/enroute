import React, { Component } from "react";
import Slider from "react-slick";
import { Grid } from "@material-ui/core/";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../node_modules/slick-carousel/slick/slick.css";
// import "./style.css";
// import './slick.css';
// import './slick-theme.css';

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // pauseOnFocus: true,
  };
  return (
    <div >
      
      <h2 style={{"display": "flex", "justifyContent":"center"}}> Newsfeed</h2>

      <Slider {...settings}  >
        <div  >
          <h3 style={{"display": "flex", "justifyContent":"center"}} >Jene Wilson from marking just earned 20pts...</h3>
        </div>
        <div>
          <h3 style={{"display": "flex", "justifyContent":"center"}}>Redeem new bose headphones with only 250pts...</h3>
        </div>
        <div>
          <h3 style={{"display": "flex", "justifyContent":"center"}}>Rachel Hunter has completed a trip to Belmont...</h3>
        </div>
        <div>
          <h3 style={{"display": "flex", "justifyContent":"center"}}>Redeem lunch for two at Suchi Kings - 150pts</h3>
        </div>
        <div>
          <h3 style={{"display": "flex", "justifyContent":"center"}}>You have saved 500kgs of Co2 his year</h3>
        </div>
      </Slider>
    </div>
  );
}
