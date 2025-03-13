import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const Content = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 botder-t">
        <Title />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt="contact image"
          className="w-full md:max-w-[480px]"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600 ">Our Store</p>
          <p className="text-gray-500">
            54708 Milestone Station <br /> Suite 35, Washington, US
          </p>
          <p className="text-gray-500">
            Tel: +1 (555) 123-4567 <br /> Email: foreverCompany@gmail.com
          </p>
          <p className="font-semibold text-center text-gray-600">
            Carrers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our team and job openings
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white hover:rounded-xl transition-all duration-500 ease-in-out ">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default Content;
