import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onFormChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((produc) => produc._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        //api call for COD
        case "cod":
          try {
            const response = await axios.post(
              backendUrl + "/api/order/place",
              orderData,
              { headers: { token } }
            );

            if (response.data.success) {
              navigate("/orders");
              setCartItems({});
            } else {
              toast.error(response.data.message);
            }
          } catch (e) {
            console.log(e.message);
          }
          break;
        case "stripe":
          try {
            const responseStripe = await axios.post(
              import.meta.env.VITE_BACKEND_URL + "/api/order/stripe",
              orderData,
              { headers: { token } }
            );
            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              console.log(session_url);
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
            }
          } catch (error) {
            toast.error(error.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onFormSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/*---------------Left Side--------------------*/}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onFormChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />

          <input
            onChange={onFormChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <input
          onChange={onFormChangeHandler}
          name="email"
          value={formData.email}
          required
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        <input
          onChange={onFormChangeHandler}
          name="street"
          value={formData.street}
          required
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        <div className="flex gap-3">
          <input
            onChange={onFormChangeHandler}
            name="city"
            value={formData.city}
            required
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />

          <input
            onChange={onFormChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onFormChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            required
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />

          <input
            onChange={onFormChangeHandler}
            name="country"
            value={formData.country}
            required
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <input
          onChange={onFormChangeHandler}
          name="phone"
          value={formData.phone}
          required
          type="number"
          placeholder="Phone Number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/*---------------Right Side--------------------*/}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/*---------------Payment  Method Selection--------------------*/}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border-b border-r p-2 px-3 cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-200" : ""
                }`}
              ></p>
              <img
                src={assets.stripe_logo}
                alt="stripe logo"
                className="h-5 mx-4 "
              />
            </div>

            <div
              onClick={() => toast.error("Razor Payment not aviable in demo")}
              className="flex items-center gap-3 border-b border-r p-2 px-3 cursor-pointe hover:scale-105 transition duration-300 ease-in-outr"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-200" : ""
                }`}
              ></p>
              <img
                src={assets.razorpay_logo}
                alt="razorpay logo"
                className="h-5 mx-4 "
              />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border-b border-r p-2 px-3 cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-200" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm hover:scale-95 hover:rounded-sm transition duration-300 ease-in-out"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
