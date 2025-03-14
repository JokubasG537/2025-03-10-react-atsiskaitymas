import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "../style/HomeStyle/Testimonials.scss";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testimonialsRes, usersRes] = await Promise.all([
          axios.get("http://localhost:3000/testimonials"),
          axios.get("http://localhost:3000/users"),
        ]);

        setTestimonials(testimonialsRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getUser = (userId) => users.find((user) => user.id === userId);

  return (
    <div id="testimonials-container">
      <h2>Here Is What People Say</h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={false} //{ delay: 5000, disableOnInteraction: false }
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial) => {
          const user = getUser(testimonial.user_id);
          return (
            <SwiperSlide key={testimonial.id} className="testimonial-card">
              {user && (
                <>
                  <img src={user.profilePic} alt={user.name} className="profile-pic" />
                  <h3>{user.name}</h3>
                  <p>{testimonial.content}</p>
                  <div className="rating">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Testimonials;
