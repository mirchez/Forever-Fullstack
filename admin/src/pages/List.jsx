import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { currency } from "../App";
const List = ({ token }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/product/list"
      );
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Product removed successfully");
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/*-----------List Table Title----------- */}
      </div>
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className="text-center">Action</b>
      </div>
      {/* -----------Product List----------- */}
      {list.map((item, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm"
        >
          <img src={item.image} alt="product image" className="w-12" />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>
            {currency}
            {item.price}
          </p>
          <p
            onClick={() => removeProduct(item._id)}
            className="text-right md:text-center cursor-pointer text-lg"
          >
            X
          </p>
        </div>
      ))}
    </>
  );
};

export default List;
