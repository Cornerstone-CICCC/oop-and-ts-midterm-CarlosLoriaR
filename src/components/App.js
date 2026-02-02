import { Component } from "../common/Component.js";
import { CartContext } from "../contexts/CartContext.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";
import { Header } from "./Header.js";

export class App extends Component {
  constructor() {
    super();

    this.cartContext = new CartContext();
  }

  render() {
    const container = document.createElement('div');
    const cartList = new CartList({ cartContext: this.cartContext });
    cartList.mount(container);


    const header = new Header({
      cartContext: this.cartContext,
      cartList: cartList.container
    });

    header.mount(container);

    const productList = new ProductList({
      cartContext: this.cartContext,
      header: header
    });
    productList.mount(container);

    return container;
  }
}
