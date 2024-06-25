import LandingPage from '../LandingPage/LandingPage';
import Comunity from '../Comunity/Comunity';
import logo from '../../Assets/Group 237665.png';
import Profile from '../../Assets/Rectangle 1193.png';
import Pages from '../../Pages/Pages';
import { useNavigate } from 'react-router-dom';

function NavbarCommunity() {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <nav className="w-full h-[60px] bg-[#7991C1] flex justify-center absolute">
        <div className="w-full md:w-11/12 h-full flex justify-between items-center px-10">
          <img src={logo} className="w-auto h-[40%] md:h-[57px]" />
          <div className="h-full pt-2 grid-cols-3 gap-x-1 w-full px-5 md:px-0 md:w-2/5 grid">
            <button onClick={() => navigate('/landing-page')} className="text-white h-4/5 w-[48px] md:w-[100px] text-xs md:text-xl font-light hover:border-b-2 border-[#14116E] hover:text-[#14116E] transition-all duration-300">
              Home
            </button>
            <button href="/" className="text-white h-4/5 w-[48px] md:w-[100px] text-xs md:text-xl font-light hover:border-b-2 border-[#14116E] hover:text-[#14116E] transition-all duration-300">
              Calculator
            </button>
            <button onClick={() => navigate('/community')} className="text-white h-4/5 w-[48px] md:w-[100px] text-xs md:text-xl font-light hover:border-b-2 border-[#14116E] hover:text-[#14116E] transition-all duration-300">
              Community
            </button>
          </div>
          <img className="w-10 h-10 rounded-full" src="{Profile}" alt=""></img>
        </div>
      </nav>
    </div>
  );
}

export default NavbarCommunity;
