import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Ui/Footer";
import Profile from "../../Assets/Rectangle 1193.png";
import Profile2 from "../../Assets/profil-2.png";
import Profile3 from "../../Assets/profil-3.png";
import Navbar from "../Ui/Navbar";
import background from "../../Assets/community 1.png";
import FormCommunity from "./FormCommunity";
import { getComunity } from "../../api/comunity";
import { useAuth } from "../../state/AuthProvider";
import { getImageByUserId } from "../../api/image";

function Comunity() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [comunity, setComunity] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  const { user } = useAuth();

  const now = new Date();



  const handleAddNoteClick = () => {
    setShowOverlay(true);
  };

  const getCommunity = useCallback(() => {
    getComunity().then((res) => {
      setComunity(res.data);
      console.log('comunityyyyyy', res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    getCommunity();
  }, [getCommunity]);

  const handleOverlayClick = () => {
    setShowOverlay(false);
  };

  const parseTags = (content) => {
    const parts = content.split(/(#\w+)/g);
    return parts.map((part, index) =>
      part.startsWith("#") ? (
        <span key={index} className="text-blue-500 cursor-pointer" onClick={() => setSearchTag(part)}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredPosts = searchTag
    ? comunity.filter((post) => post.content.includes(searchTag))
    : comunity;
  const fetchProfileImage = async (userId) => {
    try {
      const response = await getImageByUserId(userId);
      const imageUrl = response[0].url;
      return `https://api.ahmadjumhadi.my.id/uploads/${imageUrl}`;
    } catch (error) {
      console.error("Error fetching profile image:", error);
      return null;
    }
  };
  return (
    <>
      <Navbar />
      <div className="bg-comunity-page w-full bg-cover pt-24 pb-24 md:pt-36 grid place-items-center gap-y-10">
        <div className="w-[90%] md:w-1/2 h-10 flex items-center bg-transparent border-white border rounded-md px-3">
          <button className="w-auto h-full pr-2 ">
            <ion-icon name="search-outline" color="light"></ion-icon>
          </button>
          <input
            type="search"
            className="w-full h-full bg-transparent outline-white focus:outline-none placeholder:text-white"
            placeholder="Pencarian.."
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
        </div>
        {filteredPosts.length === 0 ? (
          <div className="text-white">Postingan Tidak Ditemukan..</div>
        ) : (
          filteredPosts.map((data, index) => (
            <Post key={data.id} data={data} fetchProfileImage={fetchProfileImage} />
          ))
        )}
        <button
          className="absolute right-20 top-40 w-[130px] h-[60px] bg-[#14116E] rounded text-xl font-semibold text-white"
          onClick={handleAddNoteClick}
        >
          Unggah
        </button>
        <FormCommunity show={showOverlay} onClose={handleOverlayClick} upload={getCommunity} />
      </div>
      <Footer />
    </>
  );
}

const Post = ({ data, fetchProfileImage }) => {
  const [profileImage, setProfileImage] = useState(null);
  console.log(data);
  useEffect(() => {
    const loadProfileImage = async () => {
      const imageUrl = await fetchProfileImage(data.user.id);
      setProfileImage(imageUrl);
    };
    loadProfileImage();
  }, [data.user_id, fetchProfileImage]);
  const parseTags = (content) => {
    const parts = content.split(/(#\w+)/g);
    return parts.map((part, index) =>
      part.startsWith("#") ? (
        <span key={index} className="text-blue-500 cursor-pointer" >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const now = new Date();
  const databaseDate = new Date(data.created_at); // Assuming 'createdAt' is the date property in your data object

  const differenceSeconds = (now.getTime() - databaseDate.getTime()) / 1000;
  const formattedDifference = Math.floor(differenceSeconds);

  let timeString;
  if (formattedDifference < 60) {
    timeString = 'dibuat baru saja';
  } else if (formattedDifference < 3600) {
    const minutes = Math.floor(formattedDifference / 60);
    timeString = `dibuat ${minutes} menit yang lalu`;
  } else if (formattedDifference < 86400) {
    const hours = Math.floor(formattedDifference / 3600);
    timeString = `dibuat ${hours} jam yang lalu`;
  } else if (formattedDifference < 604800) {
    const days = Math.floor(formattedDifference / 86400);
    timeString = `dibuat ${days} hari yang lalu`;
  } else if (formattedDifference < 2592000) {
    const weeks = Math.floor(formattedDifference / 604800);
    timeString = `dibuat ${weeks} minggu yang lalu`;
  } else {
    const months = Math.floor(formattedDifference / 2592000);
    timeString = `dibuat ${months} bulan yang lalu`;
  }
  return (
    <Link
      to={`/community/${data.id}`}
      className="bg-white h-full shadow-sm shadow-gray-500 md:w-1/2 grid place-items-center rounded"
    >
      <div className="w-full p-8 content-between">
        <div className="pb-3">
          <div className="flex gap-x-5">
            {profileImage ? (
              <img className="h-12 w-12 bg-gray-100 rounded-xl" src={profileImage} alt="Profile" />
            ) : (
              <div className="h-12 w-12 bg-gray-100 rounded-xl"></div>
            )}
            <div className="flex flex-col justify-evenly text-left">
              <p className="font-bold text-lg">{data.user.username}</p>
              <p className="text-sm">{timeString}</p>
            </div>
          </div>
          <div className="text-left my-3">{parseTags(data.content)}</div>
        </div>
        <hr />
        <div className="flex items-center content-between justify-start gap-x-5 text-lg pt-2 ">
          <ion-icon name="chevron-down-outline"></ion-icon>
          <ion-icon name="chatbox-outline"></ion-icon> Komentar
        </div>
      </div>
    </Link>
  );
};
export default Comunity;
