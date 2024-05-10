import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between flex-col  lg:flex-row gap-[50px] lg:gap-[130px] xl:gap-0 ">
          {/* ========= about img ======== */}
          <div className="relative z-10 w-3/4 lg:w-1/2  xl:w-[770px] order-2 lg:order-1">
            <img src={aboutImg} alt="about_img" />
            <div className=" w-[200px] md:w-[300px] absolute bottom-4 right-[-30%]  md:right-[-7%]  lg:right-[22%] z-20">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>

          {/* =========== about content ============ */}
          <div className=" w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Proud to Have Experienced Doctors</h2>
            <p className="text__para">
            Our team of dedicated physicians brings over a decade of experience to our hospital. With 10 years of MBBS training, they have honed their skills and expertise in providing exceptional care to our patients. Whether it's routine check-ups, complex diagnoses, or specialized treatments, our doctors are committed to your well-being.
            </p>
            <p className="text__para mt-[30px]">
            Our commitment to excellence drives us forward. We stay informed about the latest medical breakthroughs, ensuring that our patients receive the best care possible. 
            </p>
            {/* <Link to="/">
              <button className="btn"></button>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
