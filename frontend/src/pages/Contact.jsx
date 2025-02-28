import React from "react";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Heading from "../components/Heading";

const Contact = () => {
  return (
    <div className="w-full">
      <div className="text-2xl sm:text-3xl py-6 sm:pt-12 text-center">
        <Heading text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-10 ">
        <div className="w-full max-w-[450px] h-auto">
          <img src={assets.contact_img} alt="about-image" className="w-full " />
        </div>
        <div className="w-full md:w-1/3 text-[16px] text-gray-500 flex flex-col gap-4 justify-center ">
          <p className="text-gray-700 text-xl font-bold">Our store</p>
          <p>272173 Maghar Station</p>

          <p className="">
            Suite 350, Uttar Pradesh, India
          </p>
          <p>Tel: (415) 555-0132</p>
          <p>Email: admin@look.com</p>
          <p className="text-gray-700 text-xl font-bold">Careers at Look</p>
          <p>Learn more about our teams and job openings.</p>
          <button className="w-full max-w-[150px] border border-black px-4 py-3 bg-black text-white transition transform ease-linear active:scale-90 cursor-pointer hover:bg-white hover:text-black">
            Explore jobs
          </button>
        </div>
      </div>

      <div className="my-16">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default Contact;
