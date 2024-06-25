import { useCallback, useEffect, useState } from 'react';
import bgImage from '../../Assets/bg.png';
import photo from '../../Assets/photo.png';
import { useAuth } from '../../state/AuthProvider';
import { updateEmail } from '../../api/user';
import PopUp from '../PopUp';
import { getImageByUserId } from '../../api/image';

function Email() {
  const [newEmail, setNewEmail] = useState('');
  const { user } = useAuth();
  const [oldEmail, setOldEmail] = useState(user.email);
  const [showPupUp, setShowPopUp] = useState(false);
  const userId = user.id;
  const [photo, setPhoto] = useState(null);


  const getProfile = useCallback(() => {
    getImageByUserId(userId).then((res) => {
      const imageUrl = res[0].url;
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

  const handleChangeEmail = (e) => {
    e.preventDefault();
    const payload = {
      oldEmail,
      newEmail
    }

    updateEmail(payload).then((res) => {
      if (res.status === 200) {
        console.log('Email updated successfully');
        setShowPopUp(true);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  const disableButton = !oldEmail && !newEmail;
  return (
    <div>
      <div className="flex h-screen bg-white">
        <div className="w-full">
          <div className="flex flex-col h-screen">
            <nav className="top-0 w-full bg-white border border-b-4 border-gray-200 h-20">
              <div className="flex items-center justify-between h-20 ps-4 pe-16">
                <div className="flex flex-row items-center justify-start">
                  <span className="self-center text-xl font-semibold text-black">Ubah Alamat Email</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center ms-3">
                    <div className="flex flex-row items-center" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                      <img className="w-8 h-8 rounded-full" src={photo} alt="user photo" />
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
                            Keluar
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
                {
                  photo === null ?
                    <div className='relative'>
                      <div className="w-32 h-32 rounded-full bg-gray-50"></div>
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0" placeholder='' />
                    </div>
                    :
                    <div className='relative'>
                      <img className="w-32 h-32 rounded-full" src={photo} alt="user" />
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0" placeholder='' />
                    </div>
                }                <h1 className="text-black font-bold text-xl ms-6">{user.username}</h1>
              </div>

              <form className="max-w-md mt-8">
                <div className="mb-5">
                  <label htmlFor="old" className="block mb-2 text-normal font-medium text-gray-500">
                    Email Lama
                  </label>
                  <input type="text" id="old" className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan email lama" required value={oldEmail} onChange={(e) => setOldEmail(e.target.value)} />
                </div>
                <div className="mb-5">
                  <label htmlFor="new" className="block mb-2 text-normal font-medium text-gray-500">
                    Email Baru
                  </label>
                  <input type="text" id="new" className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan email baru" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                </div>
                <div className="mx-auto w-fit">
                  <button disabled={disableButton} onClick={oldEmail && newEmail != null ? handleChangeEmail : null} className={`text-white ${oldEmail && newEmail != null ? 'bg-blue-900 hover:bg-blue-800' : 'bg-gray-500 '} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}>
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {showPupUp && <PopUp message="Email has been changed" title="Success" action={() => setShowPopUp(false)} />}
      </div>
      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script> */}
    </div>
  );
}

export default Email;
