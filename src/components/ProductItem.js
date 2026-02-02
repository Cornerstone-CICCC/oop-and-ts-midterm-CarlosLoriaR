import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  render() {
    const { product, cartContext } = this.props;

    const container = document.createElement('div');
    container.className = 'product-item';

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;

    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const button = document.createElement('button');
    button.textContent = 'Add to cart';

    button.addEventListener("click", () => {
      cartContext.addProduct(product);
    });

    container.append(
      image,
      title,
      price,  
      button
    );

    return container;
  }
}
