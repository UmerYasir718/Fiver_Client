import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "../mainComponents/Store";
import LowerFooter from './LowerFooter';
import Navbar from "./Navbar";
import UpperFooter from './UpperFooter';
export default function Detail() {
    const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const [hostelName, setHostelName] = useState(" ");
    const [bookingDate, setBookingDate] = useState("");
    const [hostelStay, setHostelStay] = useState("");
    const [calculatedHostelRent, setCalculatedHostelRent] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    const { user, } = useContext(Store);
    // eslint-disable-next-line no-unused-vars
    const [cookies] = useCookies(["token"]);
    const handleBookingDate = (event) => {
        setBookingDate(new Date(event.target.value));
    };
    const handleHostelRentMonths = (event) => {
        setHostelStay(event.target.value);
    };
    const checking = () => {
        toast.error("Please Login for Booking");
        navigate('/login')
    }
    const calculateFare = async () => {
        const price = location.state.hostelRecord.hostelPrice
        setCalculatedHostelRent(hostelStay * price)
    }
    const handleBooking = async (e) => {
        console.log(user, calculatedHostelRent, bookingDate);
        console.log(bookingDate.toLocaleDateString())
        e.preventDefault();
        if (bookingDate) {
            if (calculatedHostelRent > 0) {
                try {
                    const response = await fetch("https://ait-bnb-apis.vercel.app/book", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userEmail: user.userEmail,
                            userCnic: user.userCnic,
                            userName: user.userName,
                            hostelName,
                            bookingDate: bookingDate.toLocaleDateString(),
                            calculatedHostelRent,
                            hostelStay
                        }),
                    });

                    const data = await response.json();

                    if (data.success) {
                        // Redirect to the dashboard upon successful login
                        // history.push('/dashboard');
                        // navigate("/login");
                        toast.success(data.message);
                    } else {
                        // Handle login failure
                        console.error(data.message);
                        toast.error(data.message);
                    }
                } catch (error) {
                    console.error("Error occurred during login:", error);
                    toast.error("Error occurred");
                }
            } else {
                toast.error("Calculate Fare by Select by Month");
            }
        } else {
            toast.error("Select date of Joining");
        }
    };
    return (
        <div>
            <Navbar />
            <div className='container-fluid'>
                <div className='row featurette  mx-auto mb-3 '>
                    <h2 className="col-md-12 d-flex  justify-content-center align-items-center mb-5 text-primary fw-bold">
                        {location.state.hostelRecord.hostelName}
                    </h2>
                    <div className='col-xl-7 '>
                        <figure className="position-relative" style={{ width: "100%" }}>
                            <div id="carouselExample" className="carousel slide">

                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={location.state.hostelRecord.image} className="d-block w-100 bd-placeholder-img bd-placeholder-img-sm featurette-image mx-auto rounded Picture d-flex" alt="..."
                                        />
                                        <div class="carousel-caption d-md-block">
                                            <button type="submit" className="btn btn-light fw-bold " data-bs-toggle="modal" data-bs-target="#view" onClick={togglePopup}>View In 3D</button>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={location.state.hostelRecord.image} className="d-block w-100 bd-placeholder-img bd-placeholder-img-sm featurette-image mx-auto rounded Picture d-flex" alt="..."
                                        />
                                        <div class="carousel-caption  d-md-block">
                                            <button type="submit" className="btn btn-light fw-bold " data-bs-toggle="modal" data-bs-target="#view" onClick={togglePopup}>View In 3D</button>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={location.state.hostelRecord.image} className="d-block w-100 bd-placeholder-img bd-placeholder-img-sm featurette-image mx-auto rounded Picture d-flex" alt="..."
                                        />
                                        <div class="carousel-caption d-md-block">
                                            <button type="submit" className="btn btn-light fw-bold CardTitle" data-bs-toggle="modal" data-bs-target="#view" onClick={togglePopup}>View In 3D</button>
                                        </div>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </figure>
                        <br />
                        <div className="d-flex flex-row justify-content-center align-items-center my-2 gap-2">
                            <div className="col-md-2  ">
                                {user && user.userEmail && user.userName ? (
                                    <button type="submit" className="btn btn-success fw-bold" data-bs-toggle="modal" data-bs-target="#BookingModal">Book Now</button>
                                ) : (
                                    <button type="submit" className="btn btn-success fw-bold" onClick={checking}>Book Now</button>
                                )}
                            </div>
                            <div className="col-md-2  ">
                                <button type="submit" className="btn btn-primary  fw-bold" >Contact Owner</button>
                            </div>
                        </div>

                    </div>
                    <div className='col-xl-5'>
                        <h4 className="text-dark fw-semibold">
                            Rent:&nbsp;
                            <span className="text-secondary fw-semibold">
                                {location.state.hostelRecord.hostelPrice}/monthly
                            </span>
                        </h4>
                        <h5 className="text-dark fw-semibold">
                            Location:&nbsp;
                            <span className="text-secondary fw-normal">
                                {location.state.hostelRecord.hostelLocation}
                            </span>
                        </h5>
                        <p className='lead text-dark fw-bold'>
                            Description:&nbsp;
                            <span className="text-secondary fw-normal">
                                {location.state.hostelRecord.hostelDescription}
                            </span>
                        </p>
                        {/* -------------------------------------------------------------------------Map--------------------------------------------------------------------------- */}
                        <div className="mapouter">
                            <div className="gmap_canvas">
                                <iframe
                                    className="gmap_iframe"
                                    width="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    src={`https://maps.google.com/maps?width=700&height=300&hl=en&q=${encodeURIComponent(location.state.hostelRecord.hostelLocation)}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
                                    title="Google Map"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ----------------------------------------------------------------------------What we Offer You--------------------------------------------------------------------- */}
            <div className="container-fluid">
                <div className="row mb-3">
                    <div className="col-md-12 ">
                        <div className="container mx-auto">
                            <div className="row  mx-auto d-flex justify-content-center">
                                <h3 className="col-md-12 fw-bold mx-auto  justify-content-start align-content-center mb-3">
                                    What We Offer You
                                </h3>
                                {/* <table className="table  mx-auto  justify-content-start align-content-start p-2" >
                                    <tbody>
                                        <tr>
                                            <td><i className="bi bi-check-circle-fill "></i>&nbsp;Lock on bedroom door</td>
                                            <td> <i className="bi bi-check-circle-fill "></i>&nbsp;Kitchen</td>
                                            <td><i className="bi bi-check-circle-fill "></i>&nbsp;Lock on bedroom door</td>
                                        </tr>
                                        <tr>
                                            <td><i className="bi bi-x-circle-fill text-danger"></i>&nbsp;Attched Bath</td>
                                            <td><i className="bi bi-check-circle-fill "></i>&nbsp;Lock on bedroom door</td>
                                            <td><i className="bi bi-x-circle-fill text-danger"></i>&nbsp;Dedicated workspace</td>
                                        </tr>
                                        <tr>
                                            <td><i className="bi bi-x-circle-fill text-danger"></i>&nbsp;Attched Bath</td>
                                            <td><i className="bi bi-check-circle-fill "></i>&nbsp;Lock on bedroom door</td>
                                            <td><i className="bi bi-x-circle-fill text-danger"></i>&nbsp;Dedicated workspace</td>
                                        </tr>
                                        <tr>
                                            <td><i className="bi bi-check-circle-fill "></i>&nbsp;Lock on bedroom door</td>
                                            <td> <i className="bi bi-check-circle-fill "></i>&nbsp;Kitchen</td>
                                            <td><i className="bi bi-x-circle-fill text-danger"></i>&nbsp;Attched Bath</td>
                                        </tr>
                                        <tr>
                                            <td><i className="bi bi-check-circle-fill "></i>&nbsp;Lock on bedroom door</td>
                                            <td> <i className="bi bi-check-circle-fill "></i>&nbsp;Kitchen</td>
                                            <td><i className="bi bi-x-circle-fill text-danger"></i>&nbsp;Attched Bath</td>
                                        </tr>
                                    </tbody>
                                </table> */}
                                <div className="col-md-4 mb-3  facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-check-lg ms-auto fs-4 fw-bold text-success"></i>
                                </div>
                                <div className="col-md-4 mb-3  facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-check-lg ms-auto fs-4 fw-bold text-success"></i>
                                </div>
                                <div className="col-md-4 mb-3 facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-x-lg ms-auto fs-4 fw-bold text-danger"></i>
                                </div>
                                <div className="col-md-4 mb-3  facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-check-lg ms-auto fs-4 fw-bold text-success"></i>
                                </div>
                                <div className="col-md-4 mb-3  facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-x-lg ms-auto fs-4 fw-bold text-danger"></i>
                                </div>
                                <div className="col-md-4 mb-3 facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-x-lg ms-auto fs-4 fw-bold text-danger"></i>
                                    {/* <i className="bi bi-check-lg ms-auto fs-4 fw-bold"></i> */}
                                </div>
                                <div className="col-md-4 mb-3  facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-x-lg ms-auto fs-4 fw-bold text-danger"></i>
                                </div>
                                <div className="col-md-4 mb-3  facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-check-lg ms-auto fs-4 fw-bold text-success"></i>
                                </div>
                                <div className="col-md-4 mb-3 facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-x-lg ms-auto fs-4 fw-bold text-danger"></i>
                                </div>
                                <div className="col-md-4 mb-3  facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-x-lg ms-auto fs-4 fw-bold text-danger"></i>
                                </div>
                                <div className="col-md-4 mb-3  facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-check-lg ms-auto fs-4 fw-bold text-success"></i>
                                </div>
                                <div className="col-md-4 mb-3 facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-check-lg ms-auto fs-4 fw-bold text-success"></i>
                                </div>
                                <div className="col-md-4 mb-3  facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-check-lg ms-auto fs-4 fw-bold text-success"></i>
                                </div>
                                <div className="col-md-4 mb-3  facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-check-lg ms-auto fs-4 fw-bold text-success"></i>
                                </div>
                                <div className="col-md-4 mb-3 facilities gap-2">
                                    <span className="   me-auto fs-5">
                                        Lock on bedroom door
                                    </span>
                                    <i className="bi bi-check-lg ms-auto fs-4 fw-bold text-success"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5"></div>
                </div>

            </div>
            {/* ----------------------------------------------------------------------------Booking Modal------------------------------------------------------------------------------- */}
            <div className="modal fade" id="BookingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 d-flex  justify-content-center align-items-center m-auto" id="staticBackdropLabel">Book Hostel</h1>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="mb-3">
                                    <div htmlFor="exampleInputHostelName1" className="d-flex fw-bold fs-5">Hostel Name:&nbsp;
                                        <span className="justify-content-center text-primary m-auto fw-bold">
                                            {location.state.hostelRecord.hostelName}
                                        </span>
                                    </div>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputuserName1" className="form-label fw-bold">UserName</label>
                                    <p className="modalInformation">   {user && user.userEmail && user.userName ? user.userName : "invalid"}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email address</label>
                                    <p className="modalInformation"> {user && user.userEmail && user.userName ? user.userEmail : "invalid"}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputCnic1" className="form-label fw-bold">CNIC Number</label>
                                    <p className="modalInformation"> {user && user.userEmail && user.userName ? user.userCnic : "invalid"}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputCalendar1" className="form-label fw-bold">Starting Date</label><br />
                                    <input type="date" id="calendar" name="calendar" onClick={handleBookingDate} />
                                </div>
                                <label htmlFor="exampleInputDuration1" className="form-label fw-bold">Select Months for Rent </label><br />
                                <div className="input-group mb-3">
                                    <select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon" onClick={handleHostelRentMonths}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    <button className="btn btn-info text-dark fw-semibold" type="button" onClick={calculateFare}>Calculate Rent</button>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputCalendar1" className="form-label fw-bold">Total Amount</label><br />
                                    <p className="d-flex justify-content-center  text-info m-auto fw-semibold fs-5">{calculatedHostelRent}PKR</p>
                                </div>
                                <div className="d-grid gap-2 col-8 mx-auto">
                                    <button type="submit" className="btn btn-primary" onClick={handleBooking}>Submit</button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Understood</button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* ----------------------------------------------------------------------------3D ViewModal------------------------------------------------------------------------------- */}
            <div className="modal fade " id="view" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 d-flex justify-content-center mx-auto" id="exampleModalLabel">3D View</h1>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body" style={{ height: "80vh", }}>
                            {showPopup && (
                                // <div className="popup">
                                //     <div className="popup-inner">
                                // <h1>This is the popup message!</h1>
                                <iframe
                                    title="3d view"
                                    src={location.state.hostelRecord.model}
                                    className="popup-image"
                                />
                                // <button onClick={togglePopup} className="close-button">
                                //     Close
                                // </button>
                                //     </div>
                                // </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={togglePopup} data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>
            <UpperFooter />
            <LowerFooter />
        </div>
    );
}
