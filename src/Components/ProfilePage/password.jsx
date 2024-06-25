import { useCallback, useEffect, useState } from 'react';
import bgImage from '../../Assets/bg.png';
import photo from '../../Assets/photo.png';
import { useAuth } from '../../state/AuthProvider';
import { updatePassword } from '../../api/user';
import PopUp from '../PopUp';
import { getImageByUserId } from '../../api/image';

function Password() {
  const { user } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPupUp, setShowPopUp] = useState(false);
  console.log("ini user", user);
  const [photo, setPhoto] = useState(null);
  const userId = user.id;


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
  
  const handleChangePassword = (e) => {
    e.preventDefault();
    const payload = {
      oldPassword,
      newPassword
    }
    updatePassword(payload).then((res) => {
      if (res.status === 200) {
        console.log('Password updated successfully');
        setShowPopUp(true);
      }
    }).catch((error) => {
      console.log(error);
    });
    console.log("payload", payload);
  }

  return (
    <div>
      <div className="w-full h-full ">
        <div className="flex flex-col h-screen justify-center">
          <nav className="top-0 w-full bg-white border border-b-4 border-gray-200 h-20">
            <div className="flex items-center justify-between h-20 ps-4 pe-16">
              <div className="flex flex-row items-center justify-start">
                <span className="self-center text-xl font-semibold text-black">Ubah Kata Sandi</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  <div className="flex flex-row items-center" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  {
                    photo === null ?
                      <div className="w-8 h-8 rounded-full bg-gray-50" src={null} />
                      : <img className="w-8 h-8 rounded-full" src={photo} alt="user photo" />
                  }                    <span className="text-black ms-2">{user.username}</span>
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
            }              <h1 className="text-black font-bold text-xl ms-6">{user.username}</h1>
            </div>

            <form className="max-w-md mt-8">
              <div className="mb-5">
                <label htmlFor="old" className="block mb-2 text-normal font-medium text-gray-500">
                  Kata Sandi Lama
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <input className="hidden js-password-toggle" id="toggleOld" type="checkbox" />
                    <label className="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" htmlFor="toggleOld">
                      <i className="fa-solid fa-eye"></i>
                    </label>
                  </div>
                  <input
                    className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 js-password"
                    type="password"
                    placeholder="Masukan Kata Sandi"
                    id="old"
                    autocomplete="off"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                {/* <p className="text-red-500 text-xs mt-1">
										Your password must be at least 8 characters
									</p> */}
              </div>
              <div className="mb-5">
                <label htmlFor="new" className="block mb-2 text-normal font-medium text-gray-500">
                  Kata Sandi Baru
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <input className="hidden js-password-toggle" id="toggleNew" type="checkbox" />
                    <label className="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" htmlFor="toggleNew">
                      <i className="fa-solid fa-eye"></i>
                    </label>
                  </div>
                  <input
                    className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 js-password"
                    type="password"
                    placeholder="Masukan Kata Sandi baru"
                    id="new"
                    autocomplete="off"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="confirm" className="block mb-2 text-normal font-medium text-gray-500">
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <input className="hidden js-password-toggle" id="toggleConfirm" type="checkbox" />
                    <label className="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" htmlFor="toggleConfirm">
                      <i className="fa-solid fa-eye"></i>
                    </label>
                  </div>
                  <input
                    className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 js-password"
                    type="password"
                    placeholder="Masukan Kata Sandi konfirmasi"
                    id="confirm"
                    autocomplete="off"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mx-auto w-fit">
                <button disabled={!oldPassword && !newPassword} onClick={oldPassword && newPassword != null ? handleChangePassword : null} className={`text-white ${oldPassword && newPassword != null ? 'bg-blue-900 hover:bg-blue-800' : 'bg-gray-500 '} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}>
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
    <script>
      document
        .querySelectorAll(".js-password-toggle")
        .forEach(function (passwordToggle) {
          passwordToggle.addEventListener("change", function (event) {
            const passwordField =
              this.parentNode.parentNode.querySelector(".js-password");
            const passwordLabel =
              this.parentNode.parentNode.querySelector(".js-password-label");

            if (passwordField.type === "password") {
              passwordField.type = "text";
              passwordLabel.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
            } else {
              passwordField.type = "password";
              passwordLabel.innerHTML = '<i class="fa-solid fa-eye"></i>';
            }

            passwordField.focus();
          });
        });
    </script> */}
      {showPupUp && <PopUp message="Password has been changed" title="Success" action={() => setShowPopUp(false)} />}

    </div>
  );
}

export default Password;
