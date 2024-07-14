import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Banner from "./Banner";
import LowerFooter from "./LowerFooter";
import Navbar from "./Navbar";
import UpperFooter from "./UpperFooter";
export default function Cards() {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [serviceRecord, setServiceRecord] = useState("");
  const fetchHostelData = async () => {
    try {
      const response = await fetch("http://localhost:8000/getService");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   alert(error);
    }
  };
  const handleServiceRecord = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/find/${id}`);
      const json = await response.json();
      setServiceRecord(json);
      console.log("Before navigate");
      navigate("/detail", {
        state: {
          serviceRecord: json,
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
      {/* <SearchBar /> */}
      <div className='container-fluid my-5 '>
        <div className='container-fluid hostelHeading my-4'>
          Web Development
        </div>
        <div className='row d-flex justify-content-center align-content-center'>
          {Array.isArray(data) && data.length > 0 ? (
            data
              .filter((data) => data.serviceType === "1")
              .map((data, index) => (
                <div
                  className='col-4 col-12 col-md-6 col-sm-12 col-lg-3 col-xl-3 mb-3 TDCardSetting'
                  key={data._id}
                >
                  <div className='float-start' style={{ width: "22rem" }}>
                    <Link
                      className='text-decoration-none'
                      onClick={() => handleServiceRecord(data._id)}
                    >
                      <figure className='position-relative'>
                        <img
                          src={data.image}
                          alt=''
                          style={{
                            borderRadius: "3px",
                            height: "200px",
                          }}
                          className='card-img-top card-img rounded-2'
                        />
                      </figure>
                      <div className=''>
                        <div className='card-detail'>
                          <div className='card-detail-1'>
                            <span className='HostelName'>
                              {data.serviceName}
                            </span>
                            <div className='HostelPrice'>
                              {" "}
                              PKR {data.servicePrice}
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
                <td colSpan='5'>No Data Found</td>
              </tr>
            </tbody>
          )}
        </div>
        <div className=' container-fluid hostelHeading my-4'>
          Content Writing
        </div>
        <div className='row d-flex justify-content-center align-content-center'>
          {Array.isArray(data) && data.length > 0 ? (
            data
              .filter((data) => data.serviceType === "2")
              .map((data, index) => (
                <div
                  className='col-4 col-12 col-md-6 col-sm-12 col-lg-3 col-xl-3 mb-3 TDCardSetting'
                  key={data._id}
                >
                  <div className='float-start' style={{ width: "22rem" }}>
                    <Link
                      className='text-decoration-none'
                      onClick={() => handleServiceRecord(data._id)}
                    >
                      <figure className='position-relative'>
                        <img
                          src={data.image}
                          alt=''
                          style={{ borderRadius: "3px", height: "250px" }}
                          className='card-img-top card-img rounded-2'
                        />
                      </figure>
                      <div className=''>
                        <div className='card-detail'>
                          <div className='card-detail-1'>
                            <span className='HostelName'>
                              {data.serviceName}
                            </span>
                            <div className='HostelPrice'>
                              {" "}
                              PKR {data.servicePrice}
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
                <td colSpan='5'>No Data Found</td>
              </tr>
            </tbody>
          )}
        </div>
        <div className=' container-fluid hostelHeading my-4'>Logo Design</div>
        <div className='row d-flex justify-content-center align-content-center'>
          {Array.isArray(data) && data.length > 0 ? (
            data
              .filter((data) => data.serviceType === "3")
              .map((data, index) => (
                <div
                  className='col-4 col-12 col-md-6 col-sm-12 col-lg-3 col-xl-3 mb-3 TDCardSetting'
                  key={data._id}
                >
                  <div className='float-start' style={{ width: "22rem" }}>
                    <Link
                      className='text-decoration-none'
                      onClick={() => handleServiceRecord(data._id)}
                    >
                      <figure className='position-relative'>
                        <img
                          src={data.image}
                          alt=''
                          style={{
                            borderRadius: "3px",
                            height: "200px",
                          }}
                          className='card-img-top card-img rounded-2'
                        />
                      </figure>
                      <div className=''>
                        <div className='card-detail'>
                          <div className='card-detail-1'>
                            <span className='HostelName'>
                              {data.serviceName}
                            </span>
                            <div className='HostelPrice'>
                              {" "}
                              PKR {data.servicePrice}
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
                <td colSpan='5'>No Data Found</td>
              </tr>
            </tbody>
          )}
        </div>
        <div className=' container-fluid hostelHeading my-4'>Guest Post</div>
        <div className='row d-flex justify-content-center align-content-center'>
          {Array.isArray(data) && data.length > 0 ? (
            data
              .filter((data) => data.serviceType === "4")
              .map((data, index) => (
                <div
                  className='col-4 col-12 col-md-6 col-sm-12 col-lg-3 col-xl-3 mb-3 TDCardSetting'
                  key={data._id}
                >
                  <div className='float-start' style={{ width: "22rem" }}>
                    <Link
                      className='text-decoration-none'
                      onClick={() => handleServiceRecord(data._id)}
                    >
                      <figure className='position-relative'>
                        <img
                          src={data.image}
                          alt=''
                          style={{ borderRadius: "3px", height: "250px" }}
                          className='card-img-top card-img rounded-2'
                        />
                      </figure>
                      <div className=''>
                        <div className='card-detail'>
                          <div className='card-detail-1'>
                            <span className='HostelName'>
                              {data.serviceName}
                            </span>
                            <div className='HostelPrice'>
                              {" "}
                              PKR {data.servicePrice}
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
                <td colSpan='5'>No Data Found</td>
              </tr>
            </tbody>
          )}
        </div>
      </div>
      <Banner />
      {/* <VideoReference /> */}
      <UpperFooter />
      <LowerFooter />
    </>
  );
}
