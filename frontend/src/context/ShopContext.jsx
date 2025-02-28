import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [user,setUser]=useState(JSON.parse(localStorage.getItem("user"))||{})
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token")||"");
  const {pathname} =useLocation()

  const addToCart = async (itemId, size) => {
    if(!token){
      navigate("/login")
      toast.warning("Please login for add to cart")
      return;
    }
    let cartData = structuredClone(cartItems);
    if (!size) {
      toast.error("Select a size");
      return;
    }
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log("Failed to add to cart", error);
        toast.error(error.message);
      }
    }
  };

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          totalQuantity += cartItems[itemId][size];
        }
      }
    }
    return totalQuantity;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity > 0) {
      cartData[itemId][size] = quantity; // Update quantity
    } else {
      delete cartData[itemId][size]; // Remove item if quantity is 0
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log("Failed to add to cart", error);
        toast.error(error.message);
      }
    }
  };

  const getTotalPrice = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      const product = products.find((p) => p._id === items);

      if (!product) {
        continue;
      }
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items] && cartItems[items][item] > 0) {
            totalAmount += product.price * cartItems[items][item];
          }
        } catch (error) {
          console.error(
            `Error processing itemId ${items}, size ${item}:`,
            error
          );
        }
      }
    }

    return totalAmount;
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/getproducts`);
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.log("Failed to fetch products:", error);
      toast.error(error.message);
    }
  };

  const fetchCartData = async (token) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (res?.data?.success) {
        // console.log(res.data);

        setCartItems(res.data.cartData);
      }
    } catch (error) {
      console.log("Failed to fetch cart data:", error);
      toast.error(error.message);
    }
  };

  const scrollToTop=()=>{
    window.scrollTo(0,0)
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (token && localStorage.getItem("token")) {
      fetchCartData(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user")))
    }
  }, []);

  
  useEffect(()=>{
    scrollToTop()
  },[pathname])
 
  const value = {
    products,
    setProducts,
    currency,
    delivery_fee,
    search,
    setSearch,
    cartItems,
    setCartItems,
    addToCart,
    calculateTotalQuantity,
    updateQuantity,
    getTotalPrice,
    navigate,
    currentPage,
    setCurrentPage,
    backendUrl,
    token,
    setToken,
    fetchCartData,
    user,setUser,
    scrollToTop
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

const useShopContext = () => useContext(ShopContext);

export { ShopContext, ShopContextProvider, useShopContext };
