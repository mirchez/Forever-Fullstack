import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Produc = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((product) => {
      if (product._id === productId) {
        setProductData(product);
        setImage(product.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity easy-in duration-500 opacity-100">
      {/*---------------Product Data---------------*/}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*-------------------Product Images-------------------*/}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, idx) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                alt="product image"
                key={idx}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              alt="product main image"
              className="w-full h-auto"
            />
          </div>
        </div>
        {/*-------------------Product Information----------------------*/}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData?.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star icon" className="w-3.5" />
            <img
              src={assets.star_dull_icon}
              alt="star icon"
              className="w-3.5"
            />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, idx) => (
                <button
                  onClick={() => setSize(item)}
                  key={idx}
                  className={`border-b border-r py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className=" bg-black text-white px-8 py-3 text-sm active:bg-gray-700 hover:scale-95 transition-all duration-500 ease-in-out"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product</p>
            <p>Cash on delivery is aviable on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/*-------------------Description adn Review Section----------------------*/}
      <div className="mt-20">
        <div className="flex ">
          <p className="border border-gray-400 px-5 py-3 text-sm">
            Description
          </p>
          <p className="border border-gray-400 px-5 py-3 text-sm">
            Reviews (122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-400 px-6 py-6 text-sm text-gray-500">
          <p>
            Discover the exceptional quality of this product, meticulously
            crafted to elevate your daily experience. Made from premium
            materials, it combines durability, functionality, and timeless
            style, ensuring it stands out in any setting. Whether you're looking
            for something practical for everyday use or a statement piece to
            enhance your collection, this item delivers on all fronts. Its
            thoughtful design includes ergonomic features for comfort, a sleek
            finish for aesthetic appeal, and versatile functionality to suit a
            variety of needs.
          </p>
          <p>
            Hear from our satisfied customers about their experience with this
            item. Quality, comfort, and value are consistently praised, making
            it a top choice.
          </p>
        </div>
      </div>
      {/*----------------Display Related Products--------------------*/}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Produc;
