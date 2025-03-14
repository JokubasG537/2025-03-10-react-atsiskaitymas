import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "../style/HomeStyle/CTA.scss";

const ctaData = [
  {
    headline: "Share Your Voice, Get Discovered!",
    subtext: "Join a community of influencers and bloggers. Share your experiences and get recognized.",
    buttonText: "Start Posting",
    background: "https://media.istockphoto.com/id/1223044293/photo/close-up-businessman-using-laptop-sitting-at-work-desk.jpg?s=612x612&w=0&k=20&c=hPGS-KoDmxnBfbV-AgCpJ47bmNOtBv-i5QEKhPMJSTA="
  },
  {
    headline: "Find Honest Reviews, Make Informed Choices",
    subtext: "Explore real testimonials and product insights from trusted bloggers.",
    buttonText: "Browse Reviews",
    background: "https://www.providesupport.com/blog/wp-content/uploads/2017/04/Keeping-customers-happy.jpg"
  },
  {
    headline: "Boost Your Product Visibility",
    subtext: "Leverage influencer marketing to get your products in front of the right audience.",
    buttonText: "Partner With Us",
    background: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/2bS9Rd8vBFkIcnziIbAqSY/426ec3a30c1f8dfe120bb9dd8a3c324d/GettyImages-1227481145.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000"
  },
];

const CTA = () => {
  const navigate = useNavigate();

  const handleButtonClick = (text) => {
    if (text === "Browse Reviews") {
      const testimonialsSection = document.getElementById("testimonials-container");
      if (testimonialsSection) {
        testimonialsSection.scrollIntoView({ behavior: "smooth" });
      }
    } else if (text === "Partner With Us") {
      navigate("/admin/products/new");
    } else if (text === "Start Posting") {
      navigate("/admin/posts/new");
    }
  };

  return (
    <div className="cta-section">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
      >
        {ctaData.map((cta, index) => (
          <SwiperSlide
            key={index}
            className="cta-slide"
            style={{ backgroundImage: `url(${cta.background})` }}
          >
            <h2>{cta.headline}</h2>
            <p>{cta.subtext}</p>
            <button
              className="cta-button"
              onClick={() => handleButtonClick(cta.buttonText)}
            >
              {cta.buttonText}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CTA;
