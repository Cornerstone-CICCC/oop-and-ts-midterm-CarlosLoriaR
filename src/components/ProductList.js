import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.products = [];
    this.container = null;

    this.loadProducts();
  }

  async loadProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      this.products = await response.json();

      if (this.container) {
        this.container.innerHTML = "";
        this.renderProducts();
      }
    } catch (error) {
      console.error("Error loading products", error);
    }
  }

  renderProducts() {
    const { cartContext, header } = this.props;

    this.products.forEach(product => {
      const productItem = new ProductItem({
        product,
        cartContext,
        header
      });

      productItem.mount(this.container);
    });
  }

  render() {
    this.container = document.createElement("div");
    this.container.className = "container product-list";

    if (this.products.length === 0) {
      this.container.textContent = "Loading products...";
    } else {
      this.renderProducts();
    }

    return this.container;
  }
}
