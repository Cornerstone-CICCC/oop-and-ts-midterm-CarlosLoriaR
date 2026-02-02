import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.container = null;
    this.itemsContainer = null;

    this.props.cartContext.subscribe(() => this.renderCartItems());
  }

  render() {
    this.container = document.createElement("div");
    this.container.className = "cart-list";

    const closeButton = document.createElement("button");
    closeButton.textContent = "x";
    closeButton.className = "close-cart";
    closeButton.addEventListener("click", () => {
      this.container.classList.remove("open");
    });

    const title = document.createElement("h2");
    title.textContent = "Your Cart";

    this.itemsContainer = document.createElement("div");

    this.container.append(closeButton, title, this.itemsContainer);
    this.renderCartItems();

    return this.container;
  }

  renderCartItems() {
    const { cartContext } = this.props;

    this.itemsContainer.innerHTML = "";

    if (cartContext.cart.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "Cart is empty";
      this.itemsContainer.appendChild(empty);
      return;
    }

    cartContext.cart.forEach(item => {
      const cartItem = new CartItem({
        item,
        cartContext
      });
      cartItem.mount(this.itemsContainer);
    });

    const total = document.createElement("p");
    total.textContent = `Total: $${cartContext.getTotalPrice().toFixed(2)}`;
    this.itemsContainer.appendChild(total);
  }
}
