import Slider from "react-slick";
import { AvatarsImg } from "../../../utils/data";
import "./AvatarCarousel.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const AvatarCarousel = ({ currentAvatar, onChange }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1
    };

    const handleClick = (avatar) => {
        onChange("avatar", avatar)
    }
    return (
        <div style={{ marginBottom: "0rem", width: "100%" }}>

            <Slider {...settings}>
                {
                    AvatarsImg.map((img, index) => (

                        <div className={`avatar_item ${currentAvatar === img ? "active_avatar" : ""}`} key={index} onClick={() => handleClick(img)}>
                            <img width={"40px"} src={img} alt="avatar1" />

                        </div>
                    ))
                }


            </Slider>
        </div>
    )
}

export default AvatarCarousel