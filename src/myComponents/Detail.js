import Avatar from '@mui/material/Avatar';
import { loadStripe } from "@stripe/stripe-js/pure";
import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "../mainComponents/Store";
import LowerFooter from "./LowerFooter";
import Navbar from "./Navbar";
import UpperFooter from "./UpperFooter";
export default function Detail() {
    const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const [serviceName, setHostelName] = useState(" ");
    const [bookingDate, setBookingDate] = useState("");
    const [serviceStay, setHostelStay] = useState("");
    const [calculatedHostelRent, setCalculatedHostelRent] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    const { user } = useContext(Store);
    // eslint-disable-next-line no-unused-vars
    const [cookies] = useCookies(["userToken"]);
    const checking = () => {
        toast.error("Please Login for Booking");
        navigate("/login");
    };
    const calculateFare = async () => {
        const price = location.state.serviceRecord.servicePrice;
        setCalculatedHostelRent(price);
    };
    const checkOutBtn = async () => {
        const serviceName = location.state.serviceRecord.serviceName
        const servicePrice = location.state.serviceRecord.servicePrice
        const ownerName = location.state.serviceRecord.ownerName
        const timestamp = new Date();
        const stripe = await loadStripe(
            "pk_test_51NnIorCqPnESIcUCUezx9Ae1Tfcxrnhqaxi0KYluXByG3dEuMUMlLY8FcJG3eUzajEWLL8oyS7OJuzUgMKcOpGlH00QwR1IcOn"
        );

        const body = {
            serviceName, servicePrice, ownerName,
            timestamp: timestamp.toISOString()
        };
        const headers = {
            "Content-Type": "application/json",
        };
        const response = await fetch(
            `http://localhost:8000/api/create-checkout-session?email=${user.userEmail}`,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            }
        );

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.log(result.error);
        }
    };
    return (
        <div>
            <Navbar />
            <div className='container-fluid'>
                <div className='row featurette  mx-auto my-5 '>
                    <h2 className='col-md-12 d-flex  justify-content-start align-items-center mb-3 text-dark fw-normal'>
                        {location.state.serviceRecord.serviceName}
                    </h2>
                    <div className='col-xl-7 '>
                        <div
                            className=' d-flex  flex-row justify-content-start align-items-center mb-3'
                        >
                            <Avatar alt='Remy Sharp' src={location.state.serviceRecord.ownerImage}></Avatar>&nbsp;&nbsp;&nbsp;
                            <span className='fw-bold fs-4'>    {location.state.serviceRecord.ownerName}

                            </span>

                        </div>
                        <figure className='position-relative' style={{ width: "100%", height: "50%" }} >
                            <div id='carouselExample' className='carousel slide'>
                                <div className='carousel-inner'>
                                    <div className='carousel-item active'>
                                        <img
                                            src={location.state.serviceRecord.image}
                                            className='d-block w-100 bd-placeholder-img bd-placeholder-img-sm featurette-image mx-auto rounded Picture d-flex'
                                            alt='...'
                                        />
                                    </div>
                                    <div className='carousel-item'>
                                        <img
                                            src={location.state.serviceRecord.image}
                                            className='d-block w-100 bd-placeholder-img bd-placeholder-img-sm featurette-image mx-auto rounded Picture d-flex'
                                            alt='...'
                                        />
                                    </div>
                                    <div className='carousel-item'>
                                        <img
                                            src={location.state.serviceRecord.image}
                                            className='d-block w-100 bd-placeholder-img bd-placeholder-img-sm featurette-image mx-auto rounded Picture d-flex'
                                            alt='...'
                                        />
                                    </div>
                                </div>
                                <button
                                    className='carousel-control-prev'
                                    type='button'
                                    data-bs-target='#carouselExample'
                                    data-bs-slide='prev'
                                >
                                    <span
                                        className='carousel-control-prev-icon'
                                        aria-hidden='true'
                                    ></span>
                                    <span className='visually-hidden'>Previous</span>
                                </button>
                                <button
                                    className='carousel-control-next'
                                    type='button'
                                    data-bs-target='#carouselExample'
                                    data-bs-slide='next'
                                >
                                    <span
                                        className='carousel-control-next-icon'
                                        aria-hidden='true'
                                    ></span>
                                    <span className='visually-hidden'>Next</span>
                                </button>
                            </div>
                        </figure>
                    </div>
                    {/* <div className="col-xl-1"></div> */}
                    <div className='col-xl-4 d-flex justify-content-center align-content-center flex-column'>
                        <div className='card d-flex justify-content-center align-content-center lh-lg' style={{ width: "100%" }}>
                            <div className='card-body'>
                                <h5 className='card-title fw-bold fs-3'>   {location.state.serviceRecord.serviceType == "1"
                                    ? "Web Development"
                                    : location.state.serviceRecord.serviceType == "2"
                                        ? "Content Writing"
                                        : location.state.serviceRecord.serviceType == "3"
                                            ? "Logo Design"
                                            : location.state.serviceRecord.serviceType == "4"
                                                ? "Guest Post"
                                                : "Nothing"}</h5>
                                <h6 className='card-subtitle mb-2 fs-5'>PKR {location.state.serviceRecord.servicePrice}</h6>
                                <p className='card-text'><span className='fs-4 fw-bold'>Description:
                                </span><br /> {location.state.serviceRecord.serviceDescription}</p>
                                <div className="d-grid gap-2">
                                    {user && user.userEmail && user.userName ? (
                                        <button className="btn btn-dark card-link d-flex justify-content-center align-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#BookingModal">Continue</button>
                                    ) : (
                                        <button className="btn btn-dark card-link d-flex justify-content-center align-content-center align-items-center" onClick={checking}>Book Now</button>
                                    )}
                                    {/* <button className="btn btn-dark card-link d-flex justify-content-center align-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#BookingModal">
                                        Continue
                                    </button> */}
                                </div>
                            </div>
                        </div>
                        <div className="d-grid gap-2 my-4 p-3 bg-light rounded" style={{ width: "100%" }}>
                            <button className="btn btn-secondary card-link d-flex justify-content-center align-content-center align-items-center">
                                Contact Me
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ----------------------------------------------------------------------------Booking Modal------------------------------------------------------------------------------- */}
            <div
                className='modal fade'
                id='BookingModal'
                data-bs-backdrop='static'
                data-bs-keyboard='false'
                tabindex='-1'
                aria-labelledby='staticBackdropLabel'
                aria-hidden='true'
            >
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1
                                className='modal-title fs-5 d-flex  justify-content-center align-items-center m-auto'
                                id='staticBackdropLabel'
                            >
                                Book Hostel
                            </h1>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className='modal-body'>
                            <div>
                                <div className='mb-3'>
                                    <div
                                        htmlFor='exampleInputHostelName1'
                                        className='d-flex fw-bold fs-5'
                                    >
                                        Service Name:&nbsp;
                                        <span className='justify-content-center text-primary m-auto fw-bold'>
                                            {location.state.serviceRecord.serviceName}
                                        </span>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='exampleInputuserName1'
                                        className='form-label fw-bold'
                                    >
                                        UserName
                                    </label>
                                    <p className='modalInformation'>
                                        {" "}
                                        {user && user.userEmail && user.userName
                                            ? user.userName
                                            : "invalid"}
                                    </p>
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='exampleInputEmail1'
                                        className='form-label fw-bold'
                                    >
                                        Email address
                                    </label>
                                    <p className='modalInformation'>
                                        {" "}
                                        {user && user.userEmail && user.userName
                                            ? user.userEmail
                                            : "invalid"}
                                    </p>
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='exampleInputCalendar1'
                                        className='form-label fw-bold'
                                    >
                                        Total Amount
                                    </label>
                                    <br />
                                    <p className='d-flex justify-content-center  text-info m-auto fw-semibold fs-5'>
                                        {location.state.serviceRecord.servicePrice}PKR
                                    </p>
                                </div>
                                <div className='d-grid gap-2 col-8 mx-auto'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary'
                                        onClick={checkOutBtn}
                                    // data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                                    >
                                        CheckOut
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button
                                type='button'
                                className='btn btn-secondary'
                                data-bs-dismiss='modal'
                            >
                                Close
                            </button>
                            {/* <button type="button" className="btn btn-primary">Understood</button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* ----------------------------------------------------------------------------CheckOut Modal------------------------------------------------------------------------------- */}
            <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">CheckOut</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Hide this modal and show the first with the button below.
                        </div>
                        <div class="modal-footer">
                            <button
                                type='button'
                                className='btn btn-secondary'
                                data-bs-dismiss='modal'
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <UpperFooter />
            <LowerFooter />
        </div >
    );
}
