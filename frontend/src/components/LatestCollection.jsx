import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { useShopContext } from "../context/ShopContext";
import ProductCard from "./ProductCard";

const LatestCollection = () => {
  const { products } = useShopContext();
  const [latestProduct, setLatestProduct] = useState([]);
  
  useEffect(() => {
    setLatestProduct(products.slice(10,20));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Heading text1={"LATEST"} text2={"COLLECTION"} />
        <p className="text-gray-500 text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
          cumque consequuntur doloribus.
        </p>
      </div>
      <div className="mt-6 md:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.length > 0 &&
          latestProduct.map((product) => (
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

export default LatestCollection;
