import React from 'react';
import { useNavigate } from 'react-router-dom';
import InfinitoLogo from '../../../assets/Images/LoginLogo.png'; // Your Infinito logo
import Avatar from '../../../assets/Images/Signup/Avatar.png'; // Character avatar
import ComicImg from '../../../assets/Images/Signup/ComicImg.png';
import CharacterImg from '../../../assets/Images/Signup/CharacterImg.png';
import CommunityImg from '../../../assets/Images/Signup/CommunityImg.png';
import GamesImg from '../../../assets/Images/Signup/GamesImg.png';
import { ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';

const SignupStep5 = ({onBack}) => {
  const user = useSelector((store)=>store.user)
  const navigate = useNavigate();

  return (
    <div className=" w-[50%] bg-white px-24 py-10 flex flex-col items-center h-[78%]  font-sans relative">
          <div
            className="absolute top-5 left-5 p-2 rounded-full cursor-pointer bg-red-100 text-red-700 hover:text-red-600 hover:bg-red-200    transition-all duration-200"
            onClick={() => onBack()}
          >   
            <ArrowLeft size={20} />
         </div>
      {/* Logo */}
      <div className="absolute top-6 flex flex-col items-center">
        <img src={InfinitoLogo} alt="Infinito" className="w-[200px] m-4" />
        <p className="text-xl tracking-widest text-black mt-[-5px] font-semibold ">All set, let the adventure begin! </p>
      </div>

      {/* Main Content */}
      <div className="flex w-full max-w-[1000px] mt-28  justify-between items-start">
        {/* Left: Avatar & Username */}
        <div className="flex flex-col items-center mt-4 ml-[-20px] gap-2">
          <img src={Avatar} alt="Character" className="h-[300px] object-contain" />
          <p className="text-[10px] text-[#666666] font-semibold tracking-widest mt-2">USER NAME</p>
          <p className="text-sm font-semibold tracking-wide lowercase mt-[-5px] ">{user.username}</p>
        </div>

        {/* Right: Interactive Tiles */}
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => navigate('/')}
            className=" flex flex-col items-center justify-center"
          >
            <img src={ComicImg} alt="Characters" className=" w-[180px] h-[180px]  object-contain" />

          </button>

          <button
            onClick={() => navigate('/')}
            className=" flex flex-col items-center justify-center"
          >
            <img src={CharacterImg} alt="Characters" className=" w-[180px] h-[180px]  object-contain" />

          </button>

          <button
            onClick={() => navigate('/')}
            className=" flex flex-col items-center justify-center"
          >
            <img src={CommunityImg} alt="Characters" className=" w-[180px] h-[180px]  object-contain" />

          </button>

          <button
            onClick={() => navigate('/')}
            className=" flex flex-col items-center justify-center"
          >
            <img src={GamesImg} alt="Characters" className=" w-[180px] h-[180px]  object-contain" />

          </button>
        </div>
      </div>


      {/* Skip Button */}
      <button
  onClick={() => navigate('/')}
  className="absolute bottom-12 right-1/4 mr-16 text-xs tracking-widest text-black-100 hover:underline font-bold"
>
  SKIP
</button>

    </div>
  );
};

export default SignupStep5;
