import React, { Component } from "react";
import PurchaseView from "./purchaseView";
import "../css/table.css";
import NewPurchase from "./newPurchase";
import * as milkService from "../services/milkService";

class MilkTable extends Component {
  state = {
    purchases: []
  };

  async componentDidMount() {
    const purchases = await milkService.getPurchases();
    this.setState({ purchases });
  }

  async handlePurchase(bottles) {
    const purchases = this.state.purchases;
    const connectedUserId = this.props.connectedUser.id;
    const purchase = await milkService.buy(bottles);

    const connectedUserPurchases = purchases.find(
      p => p.user.id === connectedUserId
    );

    connectedUserPurchases.purchases.push(purchase);
    const newPurchases = purchases.map(p =>
      p.user.id === connectedUserId ? connectedUserPurchases : p
    );

    this.setState({ purchases: newPurchases });
  }

  async handleUndoPurchase() {
    const connectedUserId = this.props.connectedUser.id;
    const connectedUserPurchases = this.state.purchases.find(
      p => p.user.id === connectedUserId
    );
    const lastPurchase = connectedUserPurchases.purchases.pop();
    await milkService.deletePurchase(lastPurchase);

    const newPurchases = this.state.purchases.map(up =>
      up.user.id === connectedUserId ? connectedUserPurchases : up
    );

    this.setState({ purchases: newPurchases });
  }

  containsPurchasesOnCurrentDay(purchase) {
    const currentDate = new Date().toLocaleDateString("en-GB");
    return currentDate === purchase.purchaseDate;
  }

  render() {
    return (
      <React.Fragment>
        <div className="row pt-5">
          <table className="table table-hover table-responsive table-striped table-light text-center align-middle m-auto">
            <tbody>{this.renderRows()}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }

  renderRows() {
    const userPurchases = this.state.purchases;

    // get max purchases in order to render empty cells for a uniform table
    const maxPurchasesPerRow = userPurchases
      .map(up => up.purchases.length)
      .reduce((l1, l2) => Math.max(l1, l2), -1);

    return userPurchases.map(up => this.renderRow(up, maxPurchasesPerRow));
  }

  renderRow(userPurchase, maxPurchasesPerRow) {
    const { user, purchases } = userPurchase;

    const cells = [];

    let canUndo = false;
    cells.push(this.renderUserCell(user));
    for (let purchase of purchases) {
      canUndo = canUndo || this.containsPurchasesOnCurrentDay(purchase);
      cells.push(this.renderPurchaseCell(purchase));
    }

    const connectedUser = this.props.connectedUser;

    //render new purchase button for connected user
    if (user.id === connectedUser.id) {
      cells.push(this.renderNewPurchaseCell(canUndo));
    }

    //render empty cells for table uniformity
    for (let i = cells.length; i <= maxPurchasesPerRow + 1; i++) {
      cells.push(<td key={"empty_cell_" + i} />);
    }

    return (
      <tr className="table-info" key={user.id}>
        {cells}
      </tr>
    );
  }

  renderUserCell(user) {
    return (
      <th className="align-middle" scope="row" key={user.id}>
        {user.displayName}
      </th>
    );
  }

  renderPurchaseCell(purchase) {
    return (
      <td key={purchase.id}>
        <PurchaseView
          key={purchase.id}
          purchaseDate={purchase.purchaseDate}
          bottles={purchase.bottles}
        />
      </td>
    );
  }

  renderNewPurchaseCell(canUndo) {
    return (
      <td className="purchase-button-cell align-middle" key="newPurchase">
        <NewPurchase
          canUndo={canUndo}
          onPurchase={bottles => this.handlePurchase(bottles)}
          onPurchaseUndo={() => this.handleUndoPurchase()}
        />
      </td>
    );
  }
}

export default MilkTable;
