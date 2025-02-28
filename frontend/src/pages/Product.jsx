import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Heading from "../components/Heading";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart} = useShopContext();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState(null);
  const [size, setSize] = useState("");

  const getSingleProduct = () => {
    const product = products?.find((p) => p._id === productId);
    if (product) {
      setProduct(product);
      setImage(product.images[0]);
      return;
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [products, productId]);

  return product ? (
    <div>
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-12 mt-10">
        {/* left side */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex flex-row sm:flex-col sm:gap-3 sm:overflow-x-hidden justify-between sm:justify-normal w-full sm:w-[18.6%] overflow-x-auto">
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="product-image"
                className="w-[24%] h-auto sm:w-full flex-shrink-0 cursor-pointer hover:opacity-70"
                onClick={() => setImage(img)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="product-image" className="w-full h-auto" />
          </div>
        </div>

        {/* right side */}
        <div className="">
          <h1 className="text-2xl font-medium ">{product?.name}</h1>
          <span className="flex items-center gap-1 mt-3">
            <img src={assets.star_icon} alt="star-icon" className="w-3" />
            <img src={assets.star_icon} alt="star-icon" className="w-3" />
            <img src={assets.star_icon} alt="star-icon" className="w-3" />
            <img src={assets.star_icon} alt="star-icon" className="w-3" />
            <img src={assets.star_dull_icon} alt="star-icon" className="w-3" />
            <span className="ml-2">(122)</span>
          </span>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {product?.price}
          </p>
          <p className="mt-5 text-gray-500 text-[16px] md:w-4/5">
            {product?.description}
          </p>
          <p className="mt-8 text-[18px]">Select size</p>
          <div className="flex gap-3 mt-4">
            {product?.sizes?.map((s, index) => (
              <span
                key={index}
                onClick={() => setSize(s)}
                className={`border py-2 px-4 bg-gray-100 text-[18px] cursor-pointer ${
                  s === size ? "border-[1.5px] border-blue-400" : ""
                } hover:border-blue-500 `}
              >
                {s}
              </span>
            ))}
          </div>
          <button
            className="mt-8 py-3 px-8 bg-black text-white text-sm cursor-pointer transition transform active:scale-90 hover:bg-black/90"
            onClick={() => {
              addToCart(product._id, size);
            }}
          >
            ADD TO CART
          </button>
          <p className="mt-8 h-[1px] bg-gray-300 sm:w-4/5"></p>
          <p className="text-gray-500 text-sm mt-7 mb-2">
            100% Original product.
          </p>
          <p className="text-gray-500 text-sm mb-2">
            Easy return and exchange policy within 7 days.
          </p>
          <p className="text-gray-500 text-sm">
            Cash on delivery is available on this product.
          </p>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <span className="border text-sm px-5 py-3 font-semibold">
            Description
          </span>
          <span className="border text-sm px-5 py-3">Reviews (122)</span>
        </div>
        <div className="border p-6 text-sm text-gray-500 flex flex-col gap-6">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      <div className="mt-24">
        <div className="text-2xl sm:text-3xl text-left pb-4">
          <Heading text1={"RELATED"} text2={"PRODUCTS"} />
        </div>
        <RelatedProduct
          category={product.category}
          subCategory={product.subCategory}
        />
       
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
