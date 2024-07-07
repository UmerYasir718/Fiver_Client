import React from 'react'
export default function VideoReference() {
    return (
        <div>
            <div className="container  mb-5">
                <h2 className='d-flex justify-content-center align-content-center m-auto mb-3 fw-bold'>Hostels are Located</h2>
                <div className="row videoReference" >
                    <div className=" col-xl-6">
                        <video controls="true" muted autoplay="true" name="media" __idm_id__="253953" className='d-flex  justify-content-center align-items-center m-auto mb-3 video' >
                            <source src="https://res.cloudinary.com/dngm7icac/video/upload/f_auto:video,q_auto/hvwgbfre5lu2wok2gyzw" type="video/webm" /></video>
                        {/* <iframe
                            src='https://res.cloudinary.com/dngm7icac/video/upload/f_auto:video,q_auto/hvwgbfre5lu2wok2gyzw'

                            height={400}
                            title='videoRef'
                            className='d-flex  justify-content-center align-items-center m-auto mb-3' style={{ width: "1000px" }} /> */}
                    </div>
                    <div className="col-12 col-3 col-md-3 col-lg-3">
                        <h3>Johar Town</h3><br />
                        <h3> Township</h3><br />
                        <h3>Wapda Town</h3><br />
                        <h3>Model Town </h3><br />
                        <h3>PIA Society</h3><br />
                        <h3>Airline Housing Society</h3><br />

                    </div>
                    <div className="col-12 col-3 col-md-3 col-lg-3">
                        <h3>Hafeez Kardar Rd</h3><br />
                        <h3>PCSIR Housing Society</h3><br />
                        <h3>Ring Road</h3><br />
                        <h3>Mustafa Society </h3><br />
                        <h3>Islamia Rd</h3><br />
                        <h3>Punjab Society</h3><br />
                    </div>
                </div>
            </div>
        </div>
    )
}
