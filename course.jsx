import React from "react";

const Course = ({ name, price, image }) => {
  return (
    <div className="card text-center border-info shadow-sm">
      <img
        src={image}
        className="card-img-top"
        alt={name}
        style={{ height: "150px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text fw-bold">{price}</p>
      </div>
    </div>
  );
};

export default Course;
