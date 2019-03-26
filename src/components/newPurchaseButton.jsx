import React, { Component } from "react";
import "../css/button.css";

class PurchaseButton extends Component {
  render() {
    return (
      <button
        onClick={this.props.onClickNewPurchase}
        className="btn btn-dark purchase-button"
      >
        <i className="fa fa-plus" aria-hidden="true" />
      </button>
    );
  }
}

export default PurchaseButton;
