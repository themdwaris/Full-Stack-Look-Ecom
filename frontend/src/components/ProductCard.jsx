import React from "react";
import { useShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductCard = ({ id, image, title, price }) => {
  const { currency } = useShopContext();

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer" >
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt="product-image"
          className="hover:scale-110 transition ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-sm overflow-ellipsis">{title}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductCard;
