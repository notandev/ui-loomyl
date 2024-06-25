import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoblackLoomyl from '../../Assets/logo_black_loomyl.png';
import loginReg from '../../Assets/loginreg.png';
import Inputbox from '../Ui/Inputbox';
import '../../styles/Login.css';
import { setLogin } from '../../api/auth';
import { useAuth } from '../../state/AuthProvider';
import PopUp from '../PopUp';
import mataIcon from './mata.svg'; // Add an alternative icon for "hide password
import mataTutupIcon from './mata.svg'; // Add an alternative icon for "show password"

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State untuk visibilitas password
  const [error, setError] = useState('');
  const { login } = useAuth();
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [showPupUp, setShowPopUp] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message

    if (!email || !password) {
      setError('Email and Password are required.');
      return;
    }

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await setLogin(payload);
      console.log(response);
      if (response.status === 200) {
        setMessage('Login Success');
        setTitle('Success');
        setShowPopUp(true);
        localStorage.setItem('token', response.data.data.token);
      } else {
        setMessage('Login Failed');
        setTitle('Failed');
        setShowPopUp(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handlePopup = () => {
    login();
    setShowPopUp(false);
    navigate('/landing-page');
  };

  return (
    <div className="signin-container">
      <div className="wrapper">
        <form onSubmit={onLogin}>
          <div className="wrap-logo-title">
            <img src={logoblackLoomyl} alt="logo" className="logo" />
            <h1 className="title-log text-left text-nowrap">Halo, Momzie!</h1>
          </div>
          <div className="flex justify-start">
            <span className="desc text-left w-full">Masuk untuk melanjutkan dan menjelajahi fase kehamilan Anda.</span>
          </div>
          {error && <div className="error-message">{error}</div>}
          <Inputbox 
            required 
            type="email" 
            placeholder="Email" 
            icon="bx bxs-envelope" 
            value={email} 
            onChange={handleEmailChange} 
          />
          <Inputbox
            required
            type={showPassword ? 'text' : 'password'}
            placeholder="Kata Sandi"
            icon="bx bxs-lock-alt"
            value={password}
            onChange={handlePasswordChange}
            rightIcon={showPassword ? mataIcon : mataTutupIcon} // Use the right icon based on visibility state
            onRightIconClick={togglePasswordVisibility}
          />
          <div className="remember-forgot flex justify-between items-center mt-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Ingat Saya
            </label>
          </div>
          <div className="wrap-btn mt-6">
            <button type="submit" className="btn bg-blue-500 text-white p-2 rounded w-full">
              Masuk
            </button>
          </div>
          <div className="register-link mt-4 text-center">
            <p>
              Belum Memiliki Akun? <Link to="/register" className="text-blue-500">Daftar</Link>
            </p>
          </div>
        </form>
      </div>
      <div className="wrapper-img mt-8">
        <img className="img-log w-full" src={loginReg} alt="Loomyl" />
      </div>
      {showPupUp && <PopUp message={message} title={title} action={handlePopup} />}
    </div>
  );
}

export default Signin;
