import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Thank from "../assets/ThankYou.jpg";
export default function Success() {
  return (
    <div>
      <div class='card CardMessage my-4' style={{ maxWidth: "50rem" }}>
        <img src={Thank} class='card-img-top CardImg' alt='...' />
        <div class='card-body'>
          <h5 class='card-title CardText'>Credit Add Successfully</h5>
          <p class='card-text CardLines'>Thank You For Buy Service</p>
          <Link to='/' className='backToHome'>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
