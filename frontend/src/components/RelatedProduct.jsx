import React, { useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import ProductCard from "./ProductCard";

const RelatedProduct = ({ category, subCategory }) => {
  const perPage = 4;
  const { products, currentPage,setCurrentPage } = useShopContext();
  const [relatedProduct, setRelatedProduct] = useState([]);

  const numOfPage = Math.ceil(relatedProduct.length / perPage);
  let startIndex = currentPage * perPage;
  let lastIndex = startIndex + perPage;

  useEffect(() => {
    let relProduct = [...products];
    if (relProduct.length > 0) {
      relProduct = relProduct.filter((p) => p.category === category);
      relProduct = relProduct.filter((p) => p.subCategory === subCategory);
      setRelatedProduct(relProduct);
    }
  }, [products, category, subCategory]);

  return (
    <div>
      <div className="mt-6 md:mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {relatedProduct?.length > 0 &&
          relatedProduct
            ?.slice(startIndex, lastIndex)
            ?.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.images}
                title={product.name}
                price={product.price}
              />
            ))}
      </div>
      <div className="mt-20 flex justify-center items-center gap-4">
        <button
          disabled={currentPage<=0}
          className="px-4 py-1 border border-black cursor-pointer transition transform active:scale-90 hover:bg-black hover:text-white"
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>{currentPage+1} / {numOfPage}</span>
        <button
        disabled={currentPage>=numOfPage-1}
          className="px-4 py-1 border border-black cursor-pointer transition transform active:scale-90 hover:bg-black hover:text-white"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RelatedProduct;
