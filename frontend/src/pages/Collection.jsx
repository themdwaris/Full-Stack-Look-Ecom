import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useShopContext } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import { assets } from "../assets/assets";

const Collection = () => {
  const { products, search, setSearch, currentPage, setCurrentPage } =
    useShopContext();
  const [filterProducts, setFilterProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sort, setSort] = useState("");
  const [productNotAvailable, setProductNotAvailable] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const perPage = 20;

  const filterByCategory = (e) => {
    const { name } = e.target;
    if (category?.includes(name)) {
      setCategory((prev) => prev.filter((c) => c !== name));

      // for object
      // setData((prev) => ({...prev,category:prev.category.filter((c) => c !== name)}));
    } else {
      setCategory((prev) => [...prev, name]);

      // for object
      // setData((prev)=>({...prev,category:[...prev.category,name]}))
    }
  };

  const filterBySubCategory = (e) => {
    const { name } = e.target;
    if (subCategory.includes(name)) {
      setSubCategory((prev) => prev.filter((c) => c !== name));
    } else {
      setSubCategory((prev) => [...prev, name]);
    }
  };

  const applyFilterToProducts = () => {
    if (!products || products.length === 0) return;
    let filterProducts = products.length > 0 && products.slice();
    if (category.length > 0) {
      filterProducts = filterProducts.filter((p) =>
        category.includes(p.category)
      );
    }
    if (subCategory.length > 0) {
      filterProducts = filterProducts.filter((p) =>
        subCategory.includes(p.subCategory)
      );
    }
    if (filterProducts.length === 0) {
      setProductNotAvailable(true);
    } else {
      setProductNotAvailable(false);
    }
    setFilterProducts(filterProducts);
  };

  const sortProduct = () => {
    if (!products || products.length === 0) return;
    let sortProducts = products.length > 0 && products.slice();
    if (sort === "relavent") {
      setFilterProducts(products.length > 0 && products);
    }
    if (sort === "high-low") {
      sortProducts = sortProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "low-high") {
      sortProducts = sortProducts.sort((a, b) => a.price - b.price);
    }
    setFilterProducts(sortProducts);
  };

  const filterBySearch = () => {
    if (!products || products.length === 0) return;
    let searchProducts = products.length > 0 && products.slice();
    if (searchProducts.length > 0) {
      searchProducts = searchProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (searchProducts.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setFilterProducts(searchProducts);
  };

  const numOfPage = Math.ceil(
    filterProducts.length > 0 && filterProducts.length / perPage
  );
  let startIndex = currentPage * perPage;
  let lastIndex = startIndex + perPage;
  // console.log(numOfPage, startIndex, lastIndex, filterProducts.length || 0);

  useEffect(() => {
    if (products && products.length > 0) {
      applyFilterToProducts();
    }
  }, [category, subCategory, productNotAvailable, products]);

  useEffect(() => {
    if (products && products.length > 0) {
      sortProduct();
    }
  }, [sort, products]);

  useEffect(() => {
    // Debouncing technique
    const clear = setTimeout(() => {
      if (products && products.length > 0) {
        filterBySearch();
      }
    }, 400);
    return () => clearTimeout(clear);
  }, [searchQuery, notFound]);

  return (
    <div className="w-full">
      {/* filter by search-bar */}
      {search && (
        <div
          className={`w-full max-w-2xl mx-auto p-6 flex items-center justify-center gap-3 transition-all bg-gray-100 sm:bg-white`}
        >
          <input
            type="text"
            placeholder="Search prodcut"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-4 rounded-full outline-none border text-gray-700 border-gray-400"
          />
          <img
            src={assets.cross_icon}
            alt="cross-icon"
            className="w-[14px] cursor-pointer transition-all transform active:scale-90"
            onClick={() => setSearch(false)}
          />
        </div>
      )}
      <div className="flex flex-col gap-1 sm:flex-row sm:gap-6 pt-6 sm:pt-10 border-t">
        {/* filter by category */}
        <div className="min-w-60 mb-5 sm:h-screen sm:sticky sm:top-20">
          <p
            className="flex items-center gap-2 text-xl text-gray-700 cursor-pointer my-2 sm:cursor-default"
            onClick={() => setShowFilter(!showFilter)}
          >
            FILTERS
            <img
              src={assets.dropdown_icon}
              alt="arrow-icon"
              className={`w-2 sm:hidden inline-block transition-all ${
                showFilter && "rotate-90"
              }`}
            />
          </p>
          <div className={`${showFilter ? "" : "hidden"} sm:block`}>
            <div
              className={`border border-gray-300 py-2 pl-5 mt-6 flex flex-col gap-2`}
            >
              <p className="pb-1 text-gray-800 font-medium">CATEGORIES</p>
              <label htmlFor="men" className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="Men"
                  id="men"
                  className="w-3"
                  checked={category.includes("Men")}
                  onChange={filterByCategory}
                />
                <span className="text-gray-900 text-sm font-light pl-1 leading-3">
                  Men
                </span>
              </label>
              <label htmlFor="women" className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="Women"
                  id="women"
                  className="w-3"
                  checked={category.includes("Women")}
                  onChange={filterByCategory}
                />
                <span className="text-gray-900 text-sm font-light pl-1">
                  Women
                </span>
              </label>
              <label htmlFor="kids" className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="Kids"
                  id="kids"
                  className="w-3"
                  checked={category.includes("Kids")}
                  onChange={filterByCategory}
                />
                <span className="text-gray-900 text-sm font-light pl-1">
                  Kids
                </span>
              </label>
            </div>
            <div
              className={`border border-gray-300 py-2 pl-5 mt-6 flex flex-col gap-2`}
            >
              <p className="pb-1 text-gray-800 font-medium">TYPE</p>
              <label htmlFor="topwear" className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="Topwear"
                  id="topwear"
                  className="w-3"
                  checked={subCategory.includes("Topwear")}
                  onChange={filterBySubCategory}
                />
                <span className="text-gray-900 text-sm font-light pl-1">
                  Topwear
                </span>
              </label>
              <label htmlFor="bottomwear" className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="Bottomwear"
                  id="bottomwear"
                  className="w-3"
                  checked={subCategory.includes("Bottomwear")}
                  onChange={filterBySubCategory}
                />
                <span className="text-gray-900 text-sm font-light pl-1">
                  Bottomwear
                </span>
              </label>
              <label htmlFor="winterwear" className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="Winterwear"
                  id="winterwear"
                  className="w-3"
                  checked={subCategory.includes("Winterwear")}
                  onChange={filterBySubCategory}
                />
                <span className="text-gray-900 text-sm font-light pl-1">
                  Winterwear
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="grow">
          {/* filter by price */}
          <div className="w-full flex justify-between items-start">
            <div className="text-[18px] sm:text-2xl">
              <Heading text1={"ALL"} text2={"COLLECTION"} />
            </div>
            <select
              name="priceWise"
              id=""
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 border w-[140px] sm:w-fit outline-blue-400"
            >
              <option value="relavent">Sort: Relavent</option>
              <option value="low-high">Sort: Low to High</option>
              <option value="high-low">Sort: High to Low</option>
            </select>
          </div>

          {/* product list */}
          {productNotAvailable || notFound ? (
            <h1 className="h-[300px] text-xl sm:text-2xl flex items-center justify-center text-gray-700">
              Product not available yet
            </h1>
          ) : (
            <div className="mt-6 md:mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {filterProducts?.length > 0 &&
                filterProducts?.slice(startIndex,lastIndex)?.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    image={product.images}
                    title={product.name}
                    price={product.price}
                  />
                ))}
            </div>
          )}

          {/* ***********pagination********* */}

          <div className="mt-20 flex justify-center items-center gap-4">
            <button
              disabled={currentPage <= 0}
              className="px-4 py-1 border border-black cursor-pointer transition transform active:scale-90 hover:bg-black hover:text-white"
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {currentPage + 1} / {numOfPage}
            </span>
            <button
              disabled={currentPage >= numOfPage - 1}
              className="px-4 py-1 border border-black cursor-pointer transition transform active:scale-90 hover:bg-black hover:text-white"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
