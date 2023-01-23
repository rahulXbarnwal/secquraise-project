import "./Details.css";

import React from "react";

const Details = ({ id, location, gender, name, date, time, image }) => {
  return (
    <div className="container text-center">
      <h3>{gender}</h3>
      <div className="row details-div">
        <div className="col">
          <h3>
            {id}
            <br />
            Person Detected
          </h3>
          <br />
          <table cellSpacing={2} cellPadding={2}>
            <tbody>
              <tr>
                <td>Name : </td>
                <td>{name}</td>
              </tr>
              <tr>
                <td>Location : </td>
                <td>{location}</td>
              </tr>
              <tr>
                <td>Date :</td>
                <td>{date}</td>
              </tr>
              <tr>
                <td>Time :</td>
                <td>{time}</td>
              </tr>
              <br />
              <tr>
                <td>Description :</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  {name} detected at <br />
                  {location} on {date}.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col mx-10">
          <img src={image} alt={name} />
        </div>
      </div>
    </div>
  );
};

export default Details;
