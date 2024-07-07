import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Store from "../mainComponents/Store";
export default function SearchBar() {
    const [rentFrom, setRentFrom] = useState("");
    const [rentTo, setRentTo] = useState("");
    const { queryData, setQueryData } = useContext(Store);
    const navigate = useNavigate()

    const handleFromChange = (value) => {
        setRentFrom(value);
    };

    const handleToChange = (value) => {
        setRentTo(value);
    };

    const handleSearch = async () => {
        console.log("From:", rentFrom, "To:", rentTo);

        try {
            const response = await fetch("https://ait-bnb-apis.vercel.app/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rentFrom, rentTo }),
            });

            const data = await response.json();

            if (data.success) {
                console.log("Search successful:", data);
                setQueryData(data.hostels)
                navigate("/query", {
                    state: {
                        hostelRecord: data.hostels,
                    },
                });


                // Handle success scenario
            }
            // else {
            //     console.error("Search failed:", data.message);
            //     // Handle error scenario
            // }
        } catch (error) {
            console.error("Error occurred during search:", error);
        }
        finally {
            console.log(queryData)
        }
    };

    return (
        <div className="container">
            {/* For Large Screen */}
            <div className="row searchBarColor d-md-flex d-none">
                <div className="col-md-5 col-4 searchBarParts m-auto">
                    <div className="d-flex justify-content-center flex-column">
                        <div className="fw-bold">Where</div>
                        <div className="fw-normal">UMT</div>
                    </div>
                </div>
                <div className="col-3 searchBarParts">
                    <div className="dropdown">
                        <div
                            className="dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <div className="d-flex justify-content-center flex-column">
                                <div className="fw-bold">Rent From </div>
                                <div className="fw-bold text-primary">PKR</div>
                            </div>
                        </div>
                        <ul className="dropdown-menu">
                            <li>
                                <Link
                                    className="dropdown-item"
                                    onClick={() => handleFromChange("3000")}
                                >
                                    3000
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    onClick={() => handleFromChange("4000")}
                                >
                                    4000
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    onClick={() => handleFromChange("5000")}
                                >
                                    5000
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-3 searchBarParts">
                    <div className="dropdown">
                        <div
                            className="dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <div className="d-flex justify-content-center flex-column">
                                <div className="fw-bold">Rent To</div>
                                <div className="fw-bold text-primary">PKR</div>
                            </div>
                        </div>
                        <ul className="dropdown-menu">
                            <li>
                                <Link
                                    className="dropdown-item"
                                    onClick={() => handleToChange("6000")}
                                >
                                    6000
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    onClick={() => handleToChange("8000")}
                                >
                                    8000
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    onClick={() => handleToChange("10000")}
                                >
                                    10000
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-1 col-2 d-flex justify-content-center ms-auto">
                    <i className="bi bi-search fs-2 searchButton rounded-circle" onClick={handleSearch}></i>
                </div>
            </div>

            {/* For Mobile Screen */}
            <div className="row searchBarColor d-grid d-md-none">
                <div className="col-4 searchBarParts">
                    <div className="d-flex justify-content-center flex-column">
                        <div className="fw-bold">Where</div>
                        <div className="fw-normal text-primary">UMT</div>
                    </div>
                </div>
                <div className="col-3 searchBarParts">
                    <div className="dropdown">
                        <div
                            className="dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <div className="d-flex justify-content-center flex-column">
                                <div className="fw-bold">From </div>
                                <div className="fw-bold text-primary">PKR</div>
                            </div>
                        </div>
                        <ul className="dropdown-menu">
                            <li>
                                <Link
                                    className="dropdown-item"
                                    onClick={() => handleFromChange("3000")}
                                >
                                    3000
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    onClick={() => handleFromChange("4000")}
                                >
                                    4000
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    onClick={() => handleFromChange("5000")}
                                >
                                    5000
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-3 searchBarParts">
                    <div className="dropdown">
                        <div
                            className="dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <div className="d-flex justify-content-center flex-column">
                                <div className="fw-bold">To</div>
                                <div className="fw-bold text-primary">PKR</div>
                            </div>
                        </div>
                        <ul className="dropdown-menu">
                            <li>
                                <Link
                                    className="dropdown-item"
                                    onClick={() => handleToChange("6000")}
                                >
                                    6000
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    onClick={() => handleToChange("8000")}
                                >
                                    8000
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    onClick={() => handleToChange("10000")}
                                >
                                    10000
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-2 d-flex justify-content-center ms-auto">
                    <i className="bi bi-search fs-2 searchButton rounded-circle" onClick={handleSearch}></i>
                </div>
            </div>
        </div>
    );
}
