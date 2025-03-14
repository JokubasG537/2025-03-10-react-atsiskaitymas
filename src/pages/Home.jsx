import Testimonials from "../components/Testimonials"
import CTA from "../components/CTA"
import Trending from "../components/Trending"
import "../style/Home.scss"
const Home = () => {
  return (
    <div className="home">
      <CTA/>
      <div className="trending-testimonials-wrapper">
      <Trending/>
      <Testimonials/>
      </div>
    </div>
  )
}

export default Home