import React, { Component } from "react";
import Slider from "react-slick";
import { LiveDebateItem } from "../../components/LiveDebates/liveDebateItem/LiveDebateItem";


export default function AutoSlider({debates}) {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
       vertical: true,
      verticalSwiping: true,

      beforeChange: function(currentSlide, nextSlide) {
        console.log("before change", currentSlide, nextSlide);
      },
      afterChange: function(currentSlide) {
        console.log("after change", currentSlide);
      }
    };
    return (
      <div style={{height:"210px"}}>
        
        <Slider {...settings}>
          <div>
            {
                debates.map((debate)=>(

                    <LiveDebateItem key={debate?._id}  debate={debate}/>

                ))
            }
          </div>
        </Slider>
      </div>
    );
  }
