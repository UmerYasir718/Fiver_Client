import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
export default function Register() {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [userCNIC, setUserCNIC] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleUserName = async (e) => {
    setUserName(e.target.value);
  };
  const handleEmail = async (e) => {
    setUserEmail(e.target.value);
  };
  const handleCNIC = async (e) => {
    setUserCNIC(e.target.value);
  };
  const handlePassword = async (e) => {
    setUserPassword(e.target.value);
  };
  const handleConfirmPassword = async (e) => {
    setUserConfirmPassword(e.target.value);
  };
  const handleSignUp = async (e) => {
    console.log(userEmail, userEmail, userPassword, userConfirmPassword);
    setLoading(true);
    e.preventDefault();
    if (userCNIC.length !== 13) {
      toast.error("Enter valid CNIC Number");
      setLoading(false);
      return;
    }

    if (userPassword !== userConfirmPassword) {
      toast.error("Both passwords must be the same");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("https://ait-bnb-apis.vercel.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          userCNIC,
          userEmail,
          userPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/login");
        toast.success(data.message);
      } else {
        // Handle login failure
        console.error(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      toast.error("Error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div>
        <section>
          <div className='form_data'>
            <div className='form_heading'>
              <h1>Welcome to AirBnb, SignUp</h1>
              <p>Hi, we are you glad you are back. Please SignUp.</p>
            </div>

            <div className='form'>
              <div className='form_input'>
                <label htmlFor='userName'>UserName</label>
                <input
                  type='text'
                  value={userName}
                  onChange={handleUserName}
                  name='userName'
                  id='UserName'
                  placeholder='Enter Your UserName'
                />
              </div>
              <div className='form_input'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  value={userEmail}
                  onChange={handleEmail}
                  name='email'
                  id='email'
                  placeholder='Enter Your Email Address'
                />
              </div>
              <div className='form_input'>
                <label htmlFor='cnic'>CNIC Number</label>
                <input
                  type='text'
                  value={userCNIC}
                  onChange={handleCNIC}
                  name='cnic'
                  id='cnic'
                  placeholder='Enter Your CNIC Number'
                />
              </div>
              <div className='form_input'>
                <label htmlFor='password'>Password</label>
                <div className='two'>
                  <input
                    type={!passShow ? "password" : "text"}
                    onChange={handlePassword}
                    value={userPassword}
                    name='password'
                    id='password'
                    placeholder='Enter Your password'
                  />
                  <div
                    className='showpass'
                    onClick={() => setPassShow(!passShow)}
                  >
                    {!passShow ? "Show" : "Hide"}
                  </div>
                </div>
              </div>
              <div className='form_input'>
                <label htmlFor='Confirm password'>Confirm Password</label>
                <div className='two'>
                  <input
                    type={!passShow ? "password" : "text"}
                    onChange={handleConfirmPassword}
                    value={userConfirmPassword}
                    name='confirmPassword'
                    id='confirmPassword'
                    placeholder='Enter Your Confirm Password'
                  />
                  {/* <div
                    className='showpass'
                    onClick={() => setPassShow(!passShow)}
                  >
                    {!passShow ? "Show" : "Hide"}
                  </div> */}
                </div>
              </div>

              <button className='btn' onClick={loading ? "" : handleSignUp}>
                {loading ? " Loading..." : "SignUp"}
              </button>
              <p>
                Already Have a Account{" "}
                <Link className='text-primary' to='/login'>
                  Login
                </Link>{" "}
              </p>
            </div>
            {/* <ToastContainer /> */}
          </div>
        </section>
      </div>
    </div>
  );
}
