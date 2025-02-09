import { useState, useEffect } from "react";
import styles from "../CSS/ComponentStyle/slider.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Slider = ({ deviceType }) => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 7, partialVisibilityGutter: 40 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 7, partialVisibilityGutter: 30 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2, partialVisibilityGutter: 30 }
  };

  const flightData = [
    { id: 1, img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSAExWJ5EPerubHT1mQuLT9oD-81_tk_XEi5TxkAPSrqq1lyn3hRhZ2B_fSLWsb1j1m56-mfrfKDiV5W8b7NEjgN8NS1DhS1ACUz657lFc", label: "London" },
    { id: 2, img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQg4MYNbmaonVOzl9RKy1L535kvBCGuOztbjNydGZIp8HdZtcfO1TaKHmzOt6I-k2lxglcMGi8_XZgqOgfVN-5W6A7HIWDD5ufJn3XKXAQ", label: "Istanbul" },
    { id: 3, img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQY2fy_JS2iGmbN10ikQ0ufPBAn_cRcf7pGbn2RENmflCPM8QqR6WiLBkeK-vUukAMGf4n8i0nFumLxX-1HNl-XZs-8vQPbXAoUylpOuQ", label: "Dubai" },
    { id: 4, img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSe0nYB3tBC2TNxXTHu5G-Yh0A8Oo1GcVp4ArdYUV8it8unl5O9hPp2yNVmQu4gQZWtA7JlOEznzHzrO3rw7aQe08AB-dwRlQtF1M1ZUQ", label: "Cairo" },
    { id: 5, img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSKOoREm_2Tk6KsGaEzb1IWmmmMGCwrRIYOLinMnZ5b98honyGH6xyk4m4bH1YDOOPPBm3UJSfP2mq0hsnXPX5B7MCkyfvBel1awtUfzw", label: "Paris" },
    { id: 6, img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQm9WhqhDwwBX-DFPwaSopJAUGdWEokdGbCUpSMIOetUO5Dq0onNnHcQqQsrhVrRFXGU3i1faOTUkgLq0hItxyfwTLuLMoeoflBIBj62Q", label: "Milan" },
    { id: 7, img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR--IYDnisCXiS58qMrbc1Aut75k1ltNQMNkNyx2uyJnL_1pBBpx6etQkxlyNY7oHPHqed2a4sDlg5jMb558aaSFr1N01m9hH90ZydiVw", label: "Riyadh" }
  ]

  return (
    <div className={styles.mainContainer}>
      <div className={styles.descStyle}>Popular destinations from Beirut</div>
      <div className={styles.sliderContainer}>
        <Carousel
          additionalTransfrom={0}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable={false}
          infinite
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable={false}
          arrows={true}
        >
          {flightData.map((value) => (
            <img key={value.id} className={styles.image} src={`${value.img}`} alt="Slide 1" />))}
        </Carousel>
      </div>
    </div>
  );
};
