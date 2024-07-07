import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function ResetPassword() {
  const [passShow, setPassShow] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const { id, token } = useParams();
  const navigate = useNavigate();
  const handlePassword = async (e) => {
    setUserPassword(e.target.value);
  };
  const handleConfirmPassword = async (e) => {
    setUserConfirmPassword(e.target.value);
  };
  const handleResetPassword = async () => {
    console.log(userPassword, userConfirmPassword);
    if (userPassword === userConfirmPassword) {
      try {
        const response = await fetch(
          `https://ait-bnb-apis.vercel.app/${id}/${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userPassword }),
          }
        );

        const data = await response.json();

        if (data.success) {
          // Login successful, you can handle the success scenario here
          toast.success("Password is reset Back to Login");
          navigate("/login");
          // setCookies("token", data.token);
          // setUser(data.userData);
          // toast.success(data.message);
          // setUser(data.user);
          console.log(data.userData);
        } else {
          // Login failed, handle the error scenario
          console.error("Login failed:", data.message);
          // toast.error(data.message);
        }
      } catch (error) {
        console.error("Error occurred during login:", error);
      }
    } else {
      toast.error("Both Must bo Same");
    }
  };
  return (
    <div>
      {/* <Navbar /> */}
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Welcome Back, Forget Password</h1>
            <p>Don't Worry We fix it.</p>
          </div>

          <div className='form'>
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
              <label htmlFor='confrimpassword'>Confirm Password</label>
              <div className='two'>
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={handleConfirmPassword}
                  value={userConfirmPassword}
                  name='confirmPassword'
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

            <button className='btn' onClick={handleResetPassword}>
              Submit
            </button>
            <p>
              Back to Login{" "}
              <Link className='text-primary' to='/login'>
                Login
              </Link>{" "}
            </p>
          </div>
          {/* <ToastContainer /> */}
        </div>
      </section>
    </div>
  );
}
