import React from 'react';
import "./TwoImage.css"
const TwoImage = () => {
  return (
    <div className='container my-3'>
      <div className='row'>
        {/* First Image */}
        <div className="col-md-6 col-12 p-2 position-relative">
          <img src="/2 (2).jpg" alt="First" className="img-fluid w-100 rounded shadow" />
          
          {/* Discount Badge in Top-Right Corner */}
          <div className="position-absolute top-0 end-0 m-4 bg-dark text-light p-2 rounded  " style={{fontStyle:"italic"}}>
            70% OFF
          </div>

          {/* Overlay Text on Right Side */}
          <div className="img-1  translate-middle-y  text-success p-3">
            <h4 className="fw-bold">SNACKS & SPICES</h4>
            <h5 className='text-secondary'>The flavour of something special</h5>
            <button className='btn btn-dark text-light mt-3  '>Shop Now</button>
          </div>
        </div>

        {/* Second Image */}
        <div className="col-md-6 col-12 p-2 position-relative">
          <img src="/3 (2).jpg" alt="Second" className="img-fluid w-100 rounded shadow" />

          {/* Discount Badge in Top-Right Corner */}
          <div className="position-absolute top-0 end-0 m-4 bg-dark text-light p-2 rounded "style={{fontStyle:"italic"}}>
            50% OFF
          </div>

          {/* Overlay Text on Right Side */}
          <div className="img-2 translate-middle-y  text-success p-3">
            <h4 className="fw-bold">FRUITS & VEGGIES</h4>
            <h5 className='text-secondary'>A health meal for everyone</h5>
            <button className='btn btn-dark text-light mt-3 '>Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoImage;
