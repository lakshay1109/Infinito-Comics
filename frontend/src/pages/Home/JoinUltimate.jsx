import React, { useState, useEffect } from "react";
import bgImage from '../../../assets/Images/bgImage.png'; // 🔹 Background image for full section
import character from '../../../assets/Images/character.png'; // 🔹 Character image (left side)
import JoinUltimateShimmer from "../../shimmer/landingPageShimmer/JoinUltimateShimmer";
const JoinUltimate = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      // fetch data / preload hero image ...
      setTimeout(() => setLoading(false), 2400); // demo
    }, []);
  return loading?<JoinUltimateShimmer/>: (
    // 🔸 Parent container with responsive layout and background image
    <div
      className='w-full min-h-[500px] flex flex-col md:flex-row justify-between items-center bg-cover bg-center px-4 mt-8'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* 🔹 Left Section: Character Image (takes 40% width on md+ screens, 100% on mobile) */}
      <div
        className='w-full md:w-[40%] h-[300px] md:h-[500px] bg-cover bg-center'
        style={{ backgroundImage: `url(${character})` }}
      ></div>

      {/* 🔹 Right Section: Text content */}
      <div className='w-full md:w-[50%] h-full flex flex-col justify-center text-center md:text-left'>
        {/* 🔸 Heading Text */}
        <h1 className='text-white font-bold text-2xl sm:text-3xl md:text-4xl p-3 my-5'>
          JOIN THE ULTIMATE UNIVERSE
        </h1>

        {/* 🔸 Description Paragraph */}
        <p className='text-white text-sm sm:text-base md:text-lg px-3 pb-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, perspiciatis aliquam? Unde ab, mollitia illum sed tenetur error, animi aliquid dolorem optio aperiam quas odio recusandae natus, rem ipsum vero.
        </p>

        {/* 🔸 Call to Action Button */}
        <div className='flex justify-center md:justify-start'>
          <button className="bg-red-600 hover:bg-red-700 text-white m-4 py-3 px-5 text-sm md:text-lg transition-all duration-300 w-[120px]">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinUltimate;
