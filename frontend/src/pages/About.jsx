import React from 'react'
import Heading from '../components/Heading'
import { assets } from '../assets/assets'
import NewsletterBox from "../components/NewsletterBox"

const About = () => {
  return (
    <div className='w-full'>
      <div className='text-2xl sm:text-3xl py-6 sm:pt-12 text-center'>
        <Heading text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='flex flex-col sm:flex-row justify-center gap-10'>
        <div className='w-full max-w-[450px] h-auto'>
          <img src={assets.about_img} alt="about-image" className='w-full '/>
        </div>
        <div className='w-full md:w-1/2 text-[16px] text-gray-500 flex flex-col gap-4 justify-center'>
          <p className='w-full'>Look was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <p className='text-gray-700 font-semibold my-3 text-xl'>Our Mission</p>
          <p>Our mission at Look is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      <div className='text-2xl sm:text-3xl pb-10 pt-16'>
        <Heading text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center'>
        <div className='border border-gray-300 px-8 py-10 min-h-64 flex flex-col justify-center items-center gap-5'>
          <p className=' text-xl font-semibold text-gray-700 text-center'>Quality Assurance</p>
          <p className=' text-center text-sm text-gray-500'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border border-gray-300 px-8 py-10 h-64 flex flex-col justify-center items-center gap-5'>
          <p className=' text-xl font-semibold text-gray-700 text-center'>Convenience</p>
          <p className=' text-center text-sm text-gray-500'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border border-gray-300 px-8 py-10 h-64 flex flex-col justify-center items-center gap-5'>
          <p className=' text-xl font-semibold text-gray-700 text-center'>Exceptional Customer Service:</p>
          <p className=' text-center text-sm text-gray-500'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority..</p>
        </div>
      </div>
      <div className='my-16'>
        <NewsletterBox/>
      </div>
    </div>
  )
}

export default About