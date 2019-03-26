import httpService from "./httpService";
import * as urls from "../config/apiRegistry";

const DEFAULT_BOTTLE_QUANTITY = 1;

export async function getPurchases() {
  const responsePurchases = await httpService.get(
    urls.milkApiUrl + "milk/users"
  );
  return mapResponseToUserPurchases(responsePurchases.data);
}

export async function buy(nbOfBottles) {
  const milkPurchaseRequest = new MilkPurchaseRequest(nbOfBottles);
  const milkPurchase = await httpService.post(
    urls.milkApiUrl + "milk",
    milkPurchaseRequest
  );
  const { id, bottles, purchaseDate } = milkPurchase.data;
  return new Purchase(
    id,
    bottles,
    new Date(purchaseDate).toLocaleDateString("en-GB")
  );
}

export async function deletePurchase(purchase) {
  await httpService.delete(urls.milkApiUrl + "milk/" + purchase.id);
}

function mapResponseToUserPurchases(userPurchases) {
  return userPurchases.map(up => mapResponseToUserPurchase(up));
}

function mapResponseToUserPurchase(purchaseResponse) {
  const responseUser = purchaseResponse.user;
  const responsePurchases = purchaseResponse.milkPurchases;

  const user = new User(
    responseUser.id,
    `${responseUser.firstName} ${responseUser.lastName}`
  );
  const purchases = responsePurchases.map(
    p =>
      new Purchase(
        p.id,
        p.bottles,
        new Date(p.purchaseDate).toLocaleDateString("en-GB")
      )
  );

  return new UserPurchase(user, purchases);
}

export function UserPurchase(user, purchases) {
  this.user = user;
  this.purchases = purchases;
}

function User(id, displayName) {
  this.id = id;
  this.displayName = displayName;
}

function Purchase(id, bottles, purchaseDate) {
  this.id = id;
  this.bottles = bottles;
  this.purchaseDate = purchaseDate;
}

function MilkPurchaseRequest(bottles) {
  this.bottles = bottles;
  // For now there is only one bottle quantity (of 1L i suppose :) ... can change it in the future...)
  this.bottleQuantity = DEFAULT_BOTTLE_QUANTITY;
}
