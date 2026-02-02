import { Component } from "../common/Component.js";

export class CartItem extends Component {
  render() {
    const { item, cartContext, header, onUpdate } = this.props;

    const container = document.createElement("div");
    container.className = "cart-item";

    const title = document.createElement("p");
    title.textContent = item.title;

    const quantity = document.createElement("span");
    quantity.textContent = `Qty: ${item.quantity}`;

    const price = document.createElement("p");
    price.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";

    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    increaseBtn.addEventListener("click", () => {
      cartContext.updateQuantity(item.id, item.quantity + 1);
      header.update();
      onUpdate();
    });

    decreaseBtn.addEventListener("click", () => {
      cartContext.updateQuantity(item.id, item.quantity - 1);
      header.update();
      onUpdate();
    });

    removeBtn.addEventListener("click", () => {
      cartContext.removeProduct(item.id);
      header.update();
      onUpdate();
    });

    container.append(
      title,
      quantity,
      price,
      increaseBtn,
      decreaseBtn,
      removeBtn
    );

    return container;
  }
}
