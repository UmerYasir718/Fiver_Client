import React from "react";

export default function UpperFooter() {
  return (
    <>
      <div className='container-fluid  UpperFooter'>
        <div className='container text-center'>
          <div className='row text-white'>
            <div className=' SubscribeText col-lg-6 col-md-12 col-sm-12'>
              <h2>
                Subscribe To get <br /> awesome discounts.
              </h2>
            </div>
            <div className='col-lg-6 col-md-12 col-sm-12'>
              <div className='subscribe'>
                <input
                  type='email'
                  className='subscribeFeild'
                  placeholder=' Enter your email'
                />
                <span>
                  <button type='submit'>
                    <b>Subscribe</b>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
