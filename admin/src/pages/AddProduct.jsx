import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import LoadingOverlay from "../components/LoadingOverlay";

const AddProduct = ({ token, loading, setLoading }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      setLoading(true);
      const res = await axios.post(
        `${backendUrl}/api/product/addproduct`,
        formData,
        { headers: { token } }
      );
      if (res.data.success) {
        // console.log(res);
        setLoading(false);
        toast.success("Product added");
        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
        
      } else {
        setLoading(false);
        toast.error("Failed to add product");
      }
    } catch (error) {
      setLoading(false);
      console.log("failed to add product", error);
      toast.error(error.message);
    }
  };

  const handleSizes = (e) => {
    const { name } = e.target;
    if (sizes.includes(name)) {
      setSizes((prev) => prev.filter((size) => size !== name));
    } else {
      setSizes((prev) => [...prev, name]);
    }
  };

  return (
    <div className="w-full py-4">
      {loading && (
        <LoadingOverlay>
          <Loader />
        </LoadingOverlay>
      )}
      <form onSubmit={submitHandler} className="w-full">
        <div>
          <p className="pb-3 text-xl">Add Product Here</p>
          <p className="py-2">Upload image</p>
          <div className="flex items-center gap-3">
            <label htmlFor="image1">
              <input
                type="file"
                name="image1"
                id="image1"
                required
                hidden
                onChange={(e) => setImage1(e.target.files[0])}
              />
              <img
                src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
                id="image1"
                alt="file-image"
                className="w-20 cursor-pointer "
              />
            </label>
            <label htmlFor="image2">
              <input
                type="file"
                name="image2"
                id="image2"
                hidden
                onChange={(e) => setImage2(e.target.files[0])}
              />
              <img
                src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
                id="image2"
                alt="file-image"
                className="w-20 cursor-pointer "
              />
            </label>
            <label htmlFor="image3">
              <input
                type="file"
                name="image3"
                id="image3"
                hidden
                onChange={(e) => setImage3(e.target.files[0])}
              />
              <img
                src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
                id="image3"
                alt="file-image"
                className="w-20 cursor-pointer "
              />
            </label>
            <label htmlFor="image4">
              <input
                type="file"
                name="image4"
                id="image4"
                hidden
                onChange={(e) => setImage4(e.target.files[0])}
              />
              <img
                src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
                id="image4"
                alt="file-image"
                className="w-20 cursor-pointer "
              />
            </label>
          </div>
        </div>
        <div className="mt-3">
          <p className="py-2">Product Title</p>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter title"
            required
            className="w-full max-w-[500px] px-3 py-2 rounded-md border border-gray-300 outline-blue-500"
          />
        </div>
        <div className="mt-3">
          <p className="py-2">Product Description</p>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            rows={3}
            className="w-full max-w-[500px] px-3 py-2 rounded-md border border-gray-300 outline-blue-500"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
          <div>
            <p className="py-2">Category</p>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full sm:w-28 border border-gray-300 outline-blue-500 px-3 py-2 rounded-md"
            >
              <option value="Men">
                Men
              </option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p className="py-2">Sub category</p>
            <select
              name="subCategory"
              onChange={(e) => setSubCategory(e.target.value)}
              required
              className="w-full sm:w-28 border border-gray-300 outline-blue-500 px-3 py-2 rounded-md"
            >
              <option value="Topwear">
                Topwear
              </option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <p className="py-2">Product price</p>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Enter price"
              className="w-full sm:w-32 px-3 py-2 border-gray-300 outline-blue-500 border rounded-md"
            />
          </div>
        </div>
        <div>
          <p className="py-3">Product sizes</p>
          <div className="flex items-center gap-3">
            <div>
              <label
                htmlFor="S"
                className={`inline-block text-white cursor-pointer p-3 leading-3 ${
                  sizes.includes("S") ? "bg-blue-700" : "bg-[#03b3ff]"
                }`}
              >
                S
              </label>
              <input
                type="checkbox"
                name="S"
                id="S"
                hidden
                // onClick={()=>setSelected("S")}
                onChange={handleSizes}
              />
            </div>
            <div>
              <label
                htmlFor="M"
                className={`inline-block text-white  cursor-pointer p-3 leading-3 ${
                  sizes.includes("M") ? "bg-blue-700" : "bg-[#03b3ff]"
                }`}
              >
                M
              </label>
              <input
                type="checkbox"
                name="M"
                id="M"
                hidden
                // onClick={()=>setSelected("M")}
                onChange={handleSizes}
              />
            </div>
            <div>
              <label
                htmlFor="L"
                className={`inline-block text-white cursor-pointer p-3 leading-3 ${
                  sizes.includes("L") ? "bg-blue-700" : "bg-[#03b3ff]"
                }`}
              >
                L
              </label>
              <input
                type="checkbox"
                name="L"
                id="L"
                hidden
                // onClick={()=>setSelected("L")}
                onChange={handleSizes}
              />
            </div>
            <div>
              <label
                htmlFor="XL"
                className={`inline-block text-white cursor-pointer p-3 leading-3 ${
                  sizes.includes("XL") ? "bg-blue-700" : "bg-[#03b3ff]"
                }`}
              >
                XL
              </label>
              <input
                type="checkbox"
                name="XL"
                id="XL"
                hidden
                // onClick={()=>setSelected("XL")}
                onChange={handleSizes}
              />
            </div>
            <div>
              <label
                htmlFor="XXL"
                className={`inline-block text-white cursor-pointer p-3 leading-3 ${
                  sizes.includes("XXL") ? "bg-blue-700" : "bg-[#03b3ff]"
                }`}
              >
                XXL
              </label>
              <input
                type="checkbox"
                name="XXL"
                id="XXL"
                hidden
                // onClick={()=>setSelected("XXL")}
                onChange={handleSizes}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center py-2 my-3">
          <input
            type="checkbox"
            name="bestSeller"
            id="bestseller"
            checked={bestSeller}
            onChange={() => setBestSeller((prev) => !prev)}
          />
          <label htmlFor="bestSeller" className="text-[17px]">
            Bestseller
          </label>
        </div>
        <button className="w-28 px-5 py-3 text-white font-medium bg-gradient-to-r from-cyan-400 to-blue-500 cursor-pointer outline-none transition transform active:scale-90">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
