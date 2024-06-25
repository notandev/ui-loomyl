import logo from '../../Assets/Group 237665.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Profile from '../../Assets/Rectangle 1193.png';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../state/AuthProvider';
import { getImageByUserId } from '../../api/image';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState('');
  const [photo, setPhoto] = useState(null);
  const userId = user.id;


  const getProfile = useCallback(() => {
    getImageByUserId(userId).then((res) => {
        const imageUrl = res[0].url;
        setPhoto(`https://api.ahmadjumhadi.my.id/uploads/${imageUrl}`);
    }).catch((error) => {
      console.log(error);
    });
  }, [userId]);

  useEffect(() => {
    setCurrentPage(location.pathname);
    getProfile();
  }, [location, getProfile]);
  return (
    <div className="text-center">
      <nav className={`w-full h-[60px] bg-transparent flex justify-center absolute`}>
        <div className="w-full md:w-11/12 h-full flex justify-between items-center px-10">
          <img src={'/svg/LOGO.svg'} className="w-auto h-[40%] md:h-[57px]" />
          <div className="h-full pt-2 grid-cols-3 gap-x-1 w-full px-5 md:px-0 md:w-2/5 grid">
            <button onClick={() => navigate('/landing-page')} className={`${currentPage === '/landing-page' ? 'text-[#14116E] border-b' : 'text-white'} h-4/5 w-[48px] md:w-[100px] text-xs md:text-xl font-light hover:border-b-2 border-[#14116E] hover:text-[#14116E] transition-all duration-300`}>
              Beranda
            </button>
            <button onClick={() => navigate('/calculator')} className={`${currentPage === '/calculator' ? 'text-[#14116E] border-b' : 'text-white'} h-4/5 w-[48px] md:w-[100px] text-xs md:text-xl font-light hover:border-b-2 border-[#14116E] hover:text-[#14116E] transition-all duration-300`}>
              Kalkulator
            </button>
            <button onClick={() => navigate('/community')} className={`${currentPage === `/community/${id}` || currentPage === `/community` ? 'text-[#14116E] border-b' : 'text-white'} h-4/5 w-[48px] md:w-[100px] text-xs md:text-xl font-light hover:border-b-2 border-[#14116E] hover:text-[#14116E] transition-all duration-300`}>
              Komunitas
            </button>
          </div>
          <div className="flex gap-x-5">
          {
            photo !== null ? 
            <img className="w-10 h-10 rounded-full" src={photo} alt="Foto Profile" /> : <div className="w-10 h-10 rounded-full bg-gray-50"/>
          }
            <div className="flex flex-col justify-evenly text-left">
              <p onClick={() => navigate('/user-profile')} className="text-white font-3xl text-lg hover:text-hovercolor transition-all duration-300">
                {user.username}
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
