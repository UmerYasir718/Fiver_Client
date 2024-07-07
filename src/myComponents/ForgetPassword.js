import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function ForgetPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleEmail = async (e) => {
    setUserEmail(e.target.value);
  };
  const handleForgetPassword = async () => {
    console.log(userEmail);
    try {
      const response = await fetch("https://ait-bnb-apis.vercel.app/userForgetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail }),
      });

      const data = await response.json();

      if (data.success) {
        // Login successful, you can handle the success scenario here
        console.log("Link Send successful:", data);
        setMessage(data.message)
      } else {
        // Login failed, handle the error scenario
        console.error("Forget failed:", data.message);
      }
    } catch (error) {
      console.error("Error occurred during Forget:", error);
    }
  };
  return (
    <div>
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Welcome Back, Forget Password</h1>
            <p>Don't Worry We fix it.</p>
          </div>

          <div className='form'>
            <p className="fw-bold d-flex justify-content-center align-content-center text-success fs-5">{message}</p>
            <div className='form_input'>
              <label htmlFor='email'>Email Address</label>
              <div className='two'>
                <input
                  type='text'
                  onChange={handleEmail}
                  value={userEmail}
                  name='email'
                  id='email'
                  placeholder='Enter Your Email'
                />
              </div>
            </div>

            <button className='btn' onClick={handleForgetPassword}>Reset Password</button>
            <p>
              Back To Login?{" "}
              <Link className='text-primary' to='/login'>
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
