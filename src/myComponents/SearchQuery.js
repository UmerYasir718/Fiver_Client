import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Store from "../mainComponents/Store";
import LowerFooter from "./LowerFooter";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import UpperFooter from "./UpperFooter";
import VideoReference from "./VideoReference";
export default function SearchQuery() {
  const [setHostelRecord] = useState("");
  const { queryData } = useContext(Store);
  const navigate = useNavigate();
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
  return (
    <div>
      <Navbar />
      <SearchBar />
      <div className='container my-5 '>
        <div className=' container hostelHeading my-4'>Boys Hostel</div>
        <div className='row d-flex justify-content-center align-content-center'>
          {Array.isArray(queryData) && queryData.length > 0 ? (
            queryData
              .filter((queryData) => queryData.hostelType === "1")
              .map((queryData, index) => (
                <div
                  className='col-3 col-12 col-md-6 col-sm-12 col-lg-3 col-xl-2 mb-3 TDCardSetting'
                  key={queryData._id}
                >
                  <div className='float-start' style={{ width: "25rem" }}>
                    <Link
                      className='text-decoration-none'
                      onClick={() => handleHostelRecord(queryData._id)}
                    >
                      <figure className='position-relative'>
                        <img
                          src={queryData.image}
                          alt=''
                          style={{ borderRadius: "3px", height: "250px" }}
                          className='card-img-top card-img rounded-2'
                        />
                      </figure>
                      <div className=''>
                        <div className='card-detail'>
                          <div className='card-detail-1'>
                            <span className='HostelName'>
                              {queryData.hostelName}
                            </span>
                            <div className='HostelPrice'>
                              {" "}
                              PKR {queryData.hostelPrice}
                            </div>
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
                <td colSpan='5' className='text-dark fw-bold'>
                  No Hostel Found
                </td>
              </tr>
            </tbody>
          )}
        </div>
        <div className=' container-fluid hostelHeading my-4'>Girls Hostel</div>
        <div className='row d-flex justify-content-center align-content-center'>
          {Array.isArray(queryData) && queryData.length > 0 ? (
            queryData
              .filter((queryData) => queryData.hostelType === "2")
              .map((queryData, index) => (
                <div
                  className='col-3 col-12 col-md-6 col-sm-12 col-lg-3 col-xl-2 mb-3 TDCardSetting'
                  key={queryData._id}
                >
                  <div className='float-start' style={{ width: "25rem" }}>
                    <Link
                      className='text-decoration-none'
                      onClick={() => handleHostelRecord(queryData._id)}
                    >
                      <figure className='position-relative'>
                        <img
                          src={queryData.image}
                          alt=''
                          style={{ borderRadius: "3px", height: "250px" }}
                          className='card-img-top card-img rounded-2'
                        />
                      </figure>
                      <div className=''>
                        <div className='card-detail'>
                          <div className='card-detail-1'>
                            <span className='HostelName'>
                              {queryData.hostelName}
                            </span>
                            <div className='HostelPrice'>
                              {" "}
                              PKR {queryData.hostelPrice}
                            </div>
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
                <td colSpan='5' className='text-dark fw-bold'>
                  No Hostel Found
                </td>
              </tr>
            </tbody>
          )}
        </div>
      </div>
      <VideoReference />
      <UpperFooter />
      <LowerFooter />
    </div>
  );
}
