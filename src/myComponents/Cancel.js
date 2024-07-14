import React from "react";
import { Link } from "react-router-dom";
import CancelImg from "../assets/Cancel.JPG";
export default function Cancel() {
  return (
    <div>
      <div>
        <div className='card CardMessage my-4' style={{ maxWidth: "50rem" }}>
          <img src={CancelImg} className='card-img-top CardImg' alt='...' />
          <div className='card-body'>
            <h5 className='card-title CardText'>Cancel Request</h5>
            <p className='card-text CardLines'>
              Cancel Request due to Some reason try again
            </p>
            <Link to='/' classNameName='backToHome'>
              Back to Home and try again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
