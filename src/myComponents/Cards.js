import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LowerFooter from './LowerFooter';
import Navbar from "./Navbar";
import SearchBar from './SearchBar';
import UpperFooter from './UpperFooter';
import VideoReference from './VideoReference';
export default function Cards() {
    const [data, setData] = useState("");
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [hostelRecord, setHostelRecord] = useState("");
    const fetchHostelData = async () => {
        try {
            const response = await fetch("https://ait-bnb-apis.vercel.app/getHostel");
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error("Error fetching data:", error);
            //   alert(error);
        }
    };
    const handleHostelRecord = async (id) => {
        try {
            const response = await fetch(
                `https://ait-bnb-apis.vercel.app/find/${id}`
            );
            const json = await response.json();
            setHostelRecord(json);
            console.log("Before navigate");
            navigate("/detail", {
                state: {
                    hostelRecord: json,
                },
            });
            console.log("After navigate");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchHostelData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Navbar />
            <SearchBar />
            <div className='container my-5 '>
                <div className=" container hostelHeading my-4">Boys Hostel</div>
                <div className="row d-flex justify-content-center align-content-center">
                    {Array.isArray(data) && data.length > 0 ? (
                        data
                            .filter(data => data.hostelType === "1")
                            .map((data, index) => (
                                <div className="col-4 col-12 col-md-6 col-sm-12 col-lg-3 col-xl-3 mb-3 TDCardSetting" key={data._id}>
                                    <div className="float-start" style={{ width: "25rem" }}>
                                        <Link className='text-decoration-none' onClick={() => handleHostelRecord(data._id)}>
                                            <figure className="position-relative">
                                                <img
                                                    src={data.image}
                                                    alt=""
                                                    style={{ borderRadius: "3px", height: "250px" }}
                                                    className="card-img-top card-img rounded-2"
                                                />
                                            </figure>
                                            <div className="">
                                                <div className="card-detail">
                                                    <div className="card-detail-1">
                                                        <span className="HostelName">{data.hostelName}</span>
                                                        <div className="HostelPrice"> PKR {data.hostelPrice}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan='5'>No Data Found</td>
                            </tr>
                        </tbody>
                    )}
                </div>
                <div className=" container-fluid hostelHeading my-4">Girls Hostel</div>
                <div className="row d-flex justify-content-center align-content-center">

                    {Array.isArray(data) && data.length > 0 ? (
                        data
                            .filter(data => data.hostelType === "2")
                            .map((data, index) => (
                                <div className="col-4 col-12 col-md-6 col-sm-12 col-lg-3 col-xl-3 mb-3 TDCardSetting" key={data._id}>
                                    <div className="float-start" style={{ width: "25rem" }}>
                                        <Link className='text-decoration-none' onClick={() => handleHostelRecord(data._id)}>
                                            <figure className="position-relative">
                                                <img
                                                    src={data.image}
                                                    alt=""
                                                    style={{ borderRadius: "3px", height: "250px" }}
                                                    className="card-img-top card-img rounded-2"
                                                />
                                            </figure>
                                            <div className="">
                                                <div className="card-detail">
                                                    <div className="card-detail-1">
                                                        <span className="HostelName">{data.hostelName}</span>
                                                        <div className="HostelPrice"> PKR {data.hostelPrice}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan='5'>No Data Found</td>
                            </tr>
                        </tbody>
                    )}
                </div>
            </div>
            <VideoReference />
            <UpperFooter />
            <LowerFooter />
        </>
    );
}
