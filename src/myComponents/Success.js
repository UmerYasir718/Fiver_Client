import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import Thank from "../assets/ThankYou.jpg";
import Store from "../mainComponents/Store";
export default function Success() {
  const [description, setDescription] = useState("");
  const { user } = useContext(Store);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // setUserName(user.userName)
    const reviewData = {
      userName: user.userName,
      description,
    };
    console.log(reviewData)
    try {
      const response = await fetch("http://localhost:8000/userReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        // Handle successful response
        toast.success(response.message);
      } else {
        // Handle error response
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className='card CardMessage my-4' style={{ maxWidth: "60vw", }}>
        <img src={Thank} className='card-img-top CardImg' alt='...' />
        <div className='card-body'>
          <h5 className='card-title CardText'>Post a Review</h5>
          {/* <p className='card-text CardLines'>Thank You For Buy Service</p> */}
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='handleCountryName' className='form-label text-dark fw-bold fs-4' >
                Description
              </label>
              <textarea
                className='form-control'
                style={{
                  width
                    : "50vw",
                  height: '130px'
                }}
                id='exampleFormControlTextarea1'
                rows='3'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
            <button
              type='submit'
              className='btn btn-primary d-flex justify-content-center align-content-center m-auto mb-3 px-5 ' onClick={handleSubmit}>Submit</button>
            <Link to='/' className='backToHome'>
              Back to Home
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
