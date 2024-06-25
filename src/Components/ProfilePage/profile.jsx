import { useCallback, useEffect, useState } from 'react';
import bgImage from '../../Assets/bg.png';
import photo from '../../Assets/photo.png';
import { useAuth } from '../../state/AuthProvider';
import { updateUsername } from '../../api/user';
import PopUp from '../PopUp';
import axios from 'axios';
import { getImageByUserId, putImage } from '../../api/image';
import ImageUploadPopup from './ImageUpload';

function Profile() {
  const { user, logout } = useAuth();
  const [oldUsername, setUsername] = useState(user.username);
  const [newUsername, setNewUsername] = useState('');
  const [showPupUp, setShowPopUp] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [uploadImage, setUploadImage] = useState(false);
  const userId = user.id;
  console.log(user);


  const getProfile = useCallback(() => {
    getImageByUserId(userId).then((res) => {
      const imageUrl = res[0].url;
      setProfileId(res[0].id);
      setPhoto(`https://api.ahmadjumhadi.my.id/uploads/${imageUrl}`);
      console.log(res);
      console.log(photo);
    }).catch((error) => {
      console.log(error);
    });
  }, [photo, userId]);


  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleChangeUsername = (e) => {
    e.preventDefault();
    const payload = {
      oldUsername,
      newUsername
    }

    updateUsername(payload).then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log('Username updated successfully');
        setShowPopUp(true);
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    // <div className="flex -screhen bg-white">

    <div className="w-full">
      <div className="flex flex-col h-screen">
        <nav className="top-0 w-full bg-white border border-b-4 border-gray-200 h-20">
          <div className="flex items-center justify-between h-20 ps-4 pe-16">
            <div className="flex flex-row items-center justify-start">
              <span className="self-center text-xl font-semibold text-black">Ubah Profil Akun</span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div className="flex flex-row items-center" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  {
                    photo === null ?
                      <div className="w-8 h-8 rounded-full bg-gray-50" src={null} />
                      : <img className="w-8 h-8 rounded-full" src={photo} alt="user photo" />
                  }
                  <span className="text-black ms-2">{user.username}</span>
                </div>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                      {user.username}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                      {user.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex-grow bg-cover bg-center bg-no-repeat w-full pt-8 ps-8 md:ps-60" style={{ backgroundImage: `url(${bgImage})` }}>
          <div className="flex flex-row items-center">
            <div className='relative'>
            </div>
            {/* <img className="w-32 h-32 rounded-full" src={null} alt="user photo" /> */}
            {
              photo === null ?
                <div className='relative'>
                  <div onClick={()=> setUploadImage(true)} className="w-32 h-32 rounded-full bg-gray-50"></div>
                  {/* <button className='absolute' onClick={setUploadImage(true)}>ganti</button> */}
                </div>
                :
                <div className='relative'>
                  <img onClick={()=> setUploadImage(true)} className="w-32 h-32 rounded-full" src={photo} alt="user" />
                  {/* <p className='absolute' onClick={setUploadImage(true)}></p> */}
                </div>
            }
            <h1 className="text-black font-bold text-xl ms-6">{user.username}</h1>
          </div>

          <form className="max-w-md mt-8">
            <div className="mb-5">
              <label htmlFor="old" className="block mb-2 text-normal font-medium text-gray-500">
                Nama Pengguna lama
              </label>
              <input type="text" id="old" className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan username lama" required value={oldUsername} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-5">
              <label htmlFor="new" className="block mb-2 text-normal font-medium text-gray-500">
                Nama Pengguna baru
              </label>
              <input type="text" id="new" className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan username baru" required value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
            </div>
            <div className="mx-auto w-fit">
              <button disabled={!oldUsername && !newUsername} onClick={oldUsername && newUsername != null ? handleChangeUsername : null} className={`text-white ${oldUsername && newUsername != null ? 'bg-blue-900 hover:bg-blue-800' : 'bg-gray-500 '} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}>
                Simpan Perubahan
              </button>
            </div>
          </form>
          <div>

          </div>
        </div>
      </div>
      {
        uploadImage === true ? <ImageUploadPopup onClose={()=>setUploadImage(false)} onUpload={()=>setUploadImage(false)} ada={profileId}/> : null
      }
      {
        showPupUp && <PopUp message="Username updated successfully" title="Success" action={() => setShowPopUp(false)} />
      }
    </div>
    // </div>
  );
}

export default Profile;
