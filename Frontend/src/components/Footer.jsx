import { assets } from "../assets//assets.js";
const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="logo image" className="mb-5 w-32 " />
          <p className="w-full md:w-2/3 text-gray-600">
            Discover the essence of our brand, committed to quality and customer
            satisfaction since 2025. Join us on this timeless journey of
            innovation and style.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1 (555) 123-4567</li>
            <li>foreverCompany@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr className="bg-[#414141]" />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ forever.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
