import React from "react";

const ProductRAMForm = ({ handleSubmit, value, setValue, photo, setPhoto }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter product RAM"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default ProductRAMForm;
