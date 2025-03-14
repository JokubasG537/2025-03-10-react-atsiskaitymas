import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "../style/HomeStyle/Trending.scss";

const Trending = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        const filteredProducts = response.data.filter((product) => product.isTrendingToday);
        setTrendingProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching trending products:", error);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <div className="trending-section">
      <h2>Trending Today</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {trendingProducts.map((product) => (
          <SwiperSlide key={product.id} className="trending-slide">
            <Link to={`/products/${product.id}`} className="product-link">
              <div className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Trending;
