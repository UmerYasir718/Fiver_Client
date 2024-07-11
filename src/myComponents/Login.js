import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "../mainComponents/Store";
import Navbar from "./Navbar";
export default function Login() {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { setUser } = useContext(Store);
  const [cookies, setCookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };
  const handleLogin = async () => {
    console.log(userEmail, userPassword);
    setLoading(true);
    try {
      const response = await fetch(
        "https://ait-bnb-apis.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail, userPassword }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Login successful, you can handle the success scenario here
        console.log("Login successful:", data);
        setCookies("token", data.token);
        console.log("before n")
        setUser(data.userData)
        console.log("after n")
        navigate("/");
        toast.success(data.message);
        setUser(data.userData);
        console.log(data.userData);
      } else {
        // Login failed, handle the error scenario
        console.error("Login failed:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
          </div>

          <div className='form'>
            <div className='form_input'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                value={userEmail}
                onChange={handleEmailChange}
                name='email'
                id='email'
                placeholder='Enter Your Email Address'
              />
            </div>
            <div className='form_input'>
              <label htmlFor='password'>Password</label>
              <div className='two'>
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={handlePasswordChange}
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

            <button className='btn' onClick={loading ? "" : handleLogin}>
              {loading ? " Loading..." : "Login"}
            </button>
            <div className="d-flex flex-row  gap-2 my-3">
              <Link className='text-primary' to='/signup'>
                Don't have an Account?
              </Link>{" "}

              <Link className='text-primary ms-auto' to='/forgetPassword'>
                Forget Password?{" "}
              </Link>{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
