import React from "react";
import Bottle from "./bottle";
import "../css/purchase.css";

const PurchaseView = props => {
  const { purchaseDate, bottles } = props;

  return (
    <div className="container purchase-container p-2 text-center m-auto">
      <div className="row m-1">
        <div className="m-auto">{getBottles(bottles)}</div>
      </div>
      <div className="row m-1">{renderDate(purchaseDate)}</div>
    </div>
  );
};

function getBottles(bottles) {
  const bottlesComponents = [];
  for (let i = 0; i < bottles; i++) {
    bottlesComponents.push(<Bottle key={`bottle_${i}`} />);
  }
  return bottlesComponents;
}

function renderDate(dateString) {
  return (
    <div className="bg-dark text-light p-1 m-auto font-weight-bold">
      {dateString}
    </div>
  );
}

export default PurchaseView;
