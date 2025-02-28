import React from 'react'
import Heading from './Heading';
import { useShopContext } from '../context/ShopContext';

const CartTotal = () => {
  const {currency,delivery_fee,getTotalPrice,navigate}=useShopContext()
  return (
    
          <div className="w-full flex flex-col gap-2 text-sm ">
            <p className="flex justify-between ">
              <span>Subtotal</span>
              <span>
                {currency}
                {getTotalPrice()}.00
              </span>
            </p>
            <hr />
            <p className="flex justify-between">
              <span>Shipping Fee</span>
              <span>
                {getTotalPrice() > 0
                  ? `${currency}${delivery_fee}.00`
                  : `${currency}0`}
              </span>
            </p>
            <hr />
            <p className="font-bold flex justify-between ">
              <span>Total</span>
              <span>
                {getTotalPrice() === 0
                  ? `${currency}0`
                  : `${currency}${getTotalPrice() + delivery_fee}.00`}
              </span>
            </p>
            {/* <div className="text-end pt-5">
              <button onClick={()=>{
                if(getTotalPrice()>0){
                  navigate("/place-order")
                }else return;
              }} className="py-3 px-4 sm:px-5 bg-black text-white text-sm cursor-pointer transition transform active:scale-90">
                {text}
              </button>
            </div> */}
          </div>
        
  )
}

export default CartTotal