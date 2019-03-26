import React, { Component } from "react";
import "../css/newPurchaseSelect.css";

const MAX_QUANTITY = 4;

const MIN_QUANTITY = 1;

class NewPurchaseSelect extends Component {
  state = {
    quantity: 1
  };

  increaseQuantity() {
    const quantity = this.state.quantity + 1;
    if (quantity <= MAX_QUANTITY) {
      this.setState({ quantity });
    }
  }

  decreaseQuantity() {
    const quantity = this.state.quantity - 1;
    if (quantity >= MIN_QUANTITY) {
      this.setState({ quantity });
    }
  }

  render() {
    return (
      <div className="container purchase-select-container mt-2 text-center align-center">
        <div className="row milk-quantity-row p-1">
          <div className="col-4 quantity-select-col">
            <button
              onClick={() => this.decreaseQuantity()}
              className="btn btn-sm btn-link"
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </button>
          </div>
          <div className="col-4 quantity-select-col">
            <span id="milk-quantity"> {this.state.quantity} </span>
          </div>
          <div className="col-4 quantity-select-col">
            <button
              onClick={() => this.increaseQuantity()}
              className="btn btn-sm btn-link"
            >
              <i className="fa fa-plus" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="row milk-quantity-confirm-row">
          <div className="col-6 confirm-col">
            <button
              id="btn-cancel-purchase"
              className="btn btn-dark btn-sm btn-block"
              onClick={this.props.onPurchaseCanceled}
            >
              <i id="cancel-icon" className="fa fa-times" aria-hidden="true" />
            </button>
          </div>
          <div className="col-6 confirm-col">
            <button
              id="btn-confirm-purchase"
              className="btn btn-dark btn-sm btn-block"
              onClick={() =>
                this.props.onPurchaseConfirmed(this.state.quantity)
              }
            >
              <i id="confirm-icon" className="fa fa-check" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPurchaseSelect;
