import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const ListProduct = ({ token }) => {
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      
      const res = await axios.get(`${backendUrl}/api/product/getproducts`, {
        headers: { token },
      });
      if (res?.data?.success) {
        
        // console.log(res.data);
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log("failed to fetch products:", error);

      toast.error(error.message);
    }
  };

  const deleteProduct=async(id)=>{
    try {
      const res = await axios.post(`${backendUrl}/api/product/delete`,{id},{headers:{token}})
      if(res?.data?.success){
        toast.success("Product deleted")
        await fetchProduct()
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log("failed to delete:",error);
      toast.error(error.message)
      
    }
  }
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="w-full pb-4">
      
      <p className="text-xl pb-3 ">Total Products {products.length}</p>
      <div className="mt-2 flex flex-col gap-4 items-center">
        {/* ***********table head row*********** */}
        <div className="hidden w-full sm:grid grid-cols-[1.2fr_5fr_2fr_2.5fr_1.5fr] p-1 border bg-[#03b3ff] bg-opacity-[37.3%] ">
          <p className="font-semibold pl-3 ">Image</p>
          <p className="font-semibold ">Title</p>
          <p className="font-semibold ">Category</p>
          <p className="font-semibold ">Price</p>
          <p className="font-semibold ">Action</p>
        </div>
        {/* // **********Product table********* */}
       {products?.length>0&&products?.map((p)=>( <div key={p._id} className="w-full grid grid-cols-[1fr] sm:grid-cols-[4fr_3fr]  px-3 py-1 border">
          <div className="flex items-center gap-5 sm:gap-10 ">
            <img
              src={p?.images?.[0]}
              alt="p-image"
              className="w-[40px] sm:w-[55px] self-start"
            />
            <div className="w-full flex gap-2 items-center justify-between">
              <p className="text-sm">{p.name}</p>
              <p className="sm:mr-8 text-sm ">{p.category}</p>
            </div>
          </div>
          <div className="w-full flex items-center gap-2 justify-between sm:justify-around mt-2 sm:mt-0">
            <p>&#8377;{p.price}</p>
            <img
              src={assets.bin_icon}
              alt="delete-icon"
              className="w-5 cursor-pointer transition transform active:scale-75"
              onClick={()=>deleteProduct(p._id)}
            />
          </div>
        </div>))}
      </div>
    </div>
  );
};

export default ListProduct;
