import React from "react";
import Card from "./Card";

function ListDetail({ details }) {
  return (
    <>
      {details.map((detail, index) => (
        <Card key={index} detail={detail} />
      ))}
    </>
  );
}

export default ListDetail;
