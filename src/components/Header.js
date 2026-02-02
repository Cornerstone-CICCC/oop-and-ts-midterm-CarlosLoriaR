import { Component } from "../common/Component.js";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.cartBadge = null;

    if (this.props.cartContext.subscribe) {
      this.props.cartContext.subscribe(() => this.update());
    }
  }

  render() {
    const container = document.createElement("div");

    container.innerHTML = `
<nav class="navbar navbar-expand-lg navbar-light shadow">
  <div class="container d-flex align-items-center">

    <!-- LEFT: Logo -->
    <a class="navbar-brand text-success logo h1 mb-0" href="#">
      FakeShop
    </a>

    <!-- CENTER: Menu -->
    <div class="collapse navbar-collapse order-lg-2">
      <ul class="navbar-nav mx-lg-auto text-center">
        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">About</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Shop</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
      </ul>
    </div>

    <!-- RIGHT: Actions -->
    <div class="d-flex align-items-center gap-3 ms-auto order-lg-3">

      <!-- Cart -->
      <a href="#" class="nav-icon position-relative text-decoration-none cart-btn">
        <i class="fa fa-fw fa-cart-arrow-down text-dark"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
          0
        </span>
      </a>

      <!-- Burger -->
      <button class="navbar-toggler border-0 d-lg-none" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>

  </div>
</nav>
`;


    this.cartBadge = container.querySelector(".badge");
    this.update();

    const toggler = container.querySelector(".navbar-toggler");
    const collapseEl = container.querySelector(".collapse");
    if (toggler && collapseEl) {
      toggler.addEventListener("click", () => {
        collapseEl.classList.toggle("show");
      });
    }

    this.cartButton = container.querySelector(".fa-cart-arrow-down").parentElement;
    this.cartList = this.props.cartList;

    if (this.cartButton && this.cartList) {
      this.cartButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.cartList.classList.add("open");
      });
    }

    return container;
  }

  update() {
    if (this.cartBadge) {
      this.cartBadge.textContent = this.props.cartContext.getTotalItems();
    }
  }
}
