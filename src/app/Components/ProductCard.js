import styles from "../CSS/ComponentStyle/productCard.module.css";
import Slider from "react-slick";

export const ProductCard = ({ dataArray }) => {
  const rateStar = [
    { id: 1, star: "dsads" },
    { id: 2, star: "dsada" },
  ];

  const settings = {
    centerPadding: "100px",
    slidesToShow: 4,
    infinite: false,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
  };

  return (
    <div className={styles.mainView}>
      <Slider
        {...settings}
        draggable
        autoplaySpeed={true}
      >
        {dataArray.map((row) => (
          <div className={styles.slideContainer}>
            <div className={styles.salesContainer}>
              <div className={styles.sales}>{row.sale}</div>
            </div>

            <div className={styles.imageContainer}>
              <div className={styles.firstImageContainer}>
                <img
                  src={row.firstImageUrl}
                  className={`${styles.firstImage} ${styles.image}`}
                  alt="First Image"
                />
                <img
                  src={row.secondImageUrl}
                  className={`${styles.secondImage} ${styles.image}`}
                  alt="Second Image"
                />
              </div>
              <div className={styles.detailsContainer}>
                <div className={styles.itemName}>{row.itemName}</div>
                <div className={styles.priceContainer}>
                  <div className={styles.productPriceName}>
                    {row.firstPrice}
                  </div>
                  <div className={styles.comparePriceName}>
                    {row.secondPrice}
                  </div>
                </div>
                <div className={styles.rateContainer}>
                  {rateStar.map((star) => (
                    <img
                      key={star.id}
                      src={star.star}
                      className={styles.star}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
