import React from "react";
import Layout from "../components/layout/layout";
import Contactus from "../assests/Aboutus.jpg";
const About = () => {
  return (
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%", gap: "2rem" }}
      >
        <div style={{ width: "50%", height: "70%" }}>
          <img src={Contactus} style={{ width: "100%", height: "100%" }}></img>
        </div>
        <div
          style={{ width: "30%" }}
          className="flex-column d-flex "
        >
          <h1
            className="p-3 text-center"
            style={{ backgroundColor: "black", color: "white" }}
          >
            {" "}
            ABOUT US{" "}
          </h1>
          <p>
            Welcome to AyushEcom, where your online shopping
            experience is our top priority. Our commitment to customer
            satisfaction is reflected in our seamless journey. As a premier
            destination for high-quality products, we curate a diverse selection
            to cater to your unique needs. With a user-friendly interface,
            secure payments, and efficient delivery, we ensure a hassle-free
            experience. Whether you seek fashion trends, electronics, or home
            decor,  AyushEcom is your ultimate destination. Shop
            with confidence and thank you for choosing us, where satisfaction is
            our business..
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
