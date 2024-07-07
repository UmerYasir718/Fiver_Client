import Avatar from '@mui/material/Avatar';
import React, { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Store from "../mainComponents/Store";
export default function Navbar() {
  const [removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const { user, setUser } = useContext(Store);
  const handleSignOut = () => {
    // Remove the 'token' cookie upon signout
    removeCookie("token");
    setTimeout(() => {
      navigate('/login');
      setUser()
      console.log('Navigating to login');
    }, 1000);

  };
  const check = () => {
    console.log(user);
  }
  useEffect(() => {
    check()
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [])
  return (
    <>

      <div className='container-fluid mt-3 '>
        <nav className='navbar navbar-expand-lg'>
          <div className='container-fluid'>
            <Link className='navbar-brand' to='/'>
              <img src={Logo} alt='Bootstrap' className='logo' />
            </Link>
            <button
              className='navbar-toggler d-flex d-md-none flex-row justify-content-center align-items-center ml-auto'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className=''>  <i className='bi bi-list me-2 fs-4'></i>

              </span>
              {user && user.userEmail && user.userName ? (
                <Avatar style={{ background: "#ff5a5f" }}>{user.userName[0].toUpperCase()}</Avatar>
              ) : (
                <Avatar>{ }</Avatar>
              )}

            </button>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
              {/* ------------------------------------------------------------------For Mobile Screen --------------------------------------------------------- */}
              <ul className='navbar-nav me-auto mb-2 mb-lg-0 d-flex d-md-none fw-bold'>
                <li className='nav-item'>
                  {user && user.userEmail && user.userName ? (
                    <Link className='nav-link ' to=''>
                      Profile
                    </Link>
                  ) : (
                    <Link className='nav-link active' to='/login'>
                      Login
                    </Link>)}

                </li>
                <li className='nav-item'>
                  {user && user.userEmail && user.userName ? (
                    <Link className='nav-link' onClick={handleSignOut}>
                      SignOut
                    </Link>
                  ) : (
                    <Link className='nav-link' to='/signup'>
                      Register
                    </Link>
                  )}

                </li>
              </ul>
              {/* ------------------------------------------------------------------For Large Screen --------------------------------------------------------- */}
              <div className='d-md-flex ms-auto d-none' role='search'>
                <div className='btn-group dropstart'>
                  <button
                    type='button'
                    className='py-1 px-3 rounded-5 border border-dark bg-light d-md-flex d-none  flex-row justify-content-center align-content-center'
                    data-bs-toggle='dropdown'
                    data-bs-display='static'
                    aria-expanded='false'
                  >
                    <i className='bi bi-list me-2 fs-4'></i>
                    {user && user.userEmail && user.userName ? (
                      <Avatar style={{ background: "#ff5a5f" }}>{user.userName[0].toUpperCase()}</Avatar>
                    ) : (
                      <Avatar>{ }</Avatar>
                    )}
                  </button>
                  <ul className='dropdown-menu   '>
                    <li>
                      {user && user.userEmail && user.userName ? (
                        <Link className='dropdown-item ' to=''>
                          Profile
                        </Link>
                      ) : (
                        <Link className='dropdown-item' to='/login'>
                          Login
                        </Link>)}

                    </li>
                    <li><hr className="dropdown-divider fw-bold" /></li>
                    <li className='nav-item'>
                      {user && user.userEmail && user.userName ? (
                        <Link className='dropdown-item' onClick={handleSignOut}>
                          SignOut
                        </Link>
                      ) : (
                        <Link className='dropdown-item' to='/signup'>
                          Register
                        </Link>
                      )}
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
