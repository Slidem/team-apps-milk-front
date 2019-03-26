import React, { Component } from "react";
import "../css/button.css";

class UndoPurchaseButton extends Component {
  render() {
    return (
      <button
        onClick={this.props.onPurchaseUndo}
        className="btn btn-dark purchase-button"
      >
        <i className="fa fa-undo" aria-hidden="true" />
      </button>
    );
  }
}

export default UndoPurchaseButton;
