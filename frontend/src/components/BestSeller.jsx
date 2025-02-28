import React, { useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import ProductCard from "./ProductCard";
import Heading from "./Heading";

const BestSeller = () => {
  const { products } = useShopContext();
  const [bestSellerProduct, setBestSellerProduct] = useState([]);
  // console.log(products);

  useEffect(() => {
    if (products?.length > 0) {
      const bestProduct = products?.filter((p) => p?.bestSeller);
      setBestSellerProduct(bestProduct?.slice(0, 5));
    }
  }, [products]);
  // console.log(bestSellerProduct);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Heading text1={"BEST"} text2={"SELLER"} />
        <p className="text-gray-500 text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
          cumque consequuntur doloribus.
        </p>
      </div>
      <div className="mt-6 md:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellerProduct.length > 0 &&
          bestSellerProduct.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.images}
              title={product.name}
              price={product.price}
            />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
