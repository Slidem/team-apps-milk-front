import React, { Component } from "react";
import PurchaseButton from "./newPurchaseButton";
import NewPurchaseSelect from "./newPurchaseSelect";
import UndoPurchaseButton from "./undoPurchaseButton";
import "../css/newPurchase.css";

class NewPurchase extends Component {
  state = {
    newPurchaseHidden: true
  };

  purchaseButtonClicked() {
    this.setState({ newPurchaseHidden: false });
  }

  undoPurchaseButtonClicked() {
    this.props.onPurchaseUndo();
  }

  cancelPurchaseClicked() {
    this.setState({ newPurchaseHidden: true });
  }

  confirmPurchaseClicked(quantity) {
    this.setState({ newPurchaseHidden: true });
    this.props.onPurchase(quantity);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.newPurchaseHidden
          ? this.renderNewPurchaseButtons()
          : this.renderPurchaseSelect()}
      </React.Fragment>
    );
  }

  renderNewPurchaseButtons() {
    const elements = [];
    const canUndo = this.props.canUndo;
    const divClass = canUndo ? "col-6" : "col";
    elements.push(
      <div className={divClass} key="purchase">
        <PurchaseButton
          onClickNewPurchase={() => this.purchaseButtonClicked()}
        />
      </div>
    );
    if (canUndo) {
      elements.unshift(
        <div className={divClass} key="undo">
          <UndoPurchaseButton
            onPurchaseUndo={() => this.undoPurchaseButtonClicked()}
          />
        </div>
      );
    }
    return (
      <div className="container new-purchase-container text-center">
        <div className="row pr-2">{elements}</div>
      </div>
    );
  }

  renderPurchaseSelect() {
    return (
      <NewPurchaseSelect
        onPurchaseCanceled={() => this.cancelPurchaseClicked()}
        onPurchaseConfirmed={quantity => this.confirmPurchaseClicked(quantity)}
      />
    );
  }
}

export default NewPurchase;
