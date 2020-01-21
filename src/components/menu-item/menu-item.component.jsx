import React from "react";
import "./menu-item.styles.scss";

export default ({ title, imageUrl, size }) => {
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className={`menu-item ${size}`}
    >
      <div className='content'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  );
};
