import React from "react";

const Dress = ({ name, price, size, image }) => {
  return (
    <div>
      <img
        src={image}
        alt={name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h5>{name}</h5>
      <p>Price: {price}</p>
      <p>Available Sizes: {size}</p>
    </div>
  );
};

export default Dress;
