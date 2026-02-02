export class CartContext {
    constructor() {
        this.cart = [];
        this.listeners = [];
    }

    subscribe(fn) {
        this.listeners.push(fn);
    }

    notify() {
        this.listeners.forEach(fn => fn());
    }

    addProduct(product) {
        const existing = this.cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.notify();
    }

    updateQuantity(id, quantity) {
        const item = this.cart.find(p => p.id === id);
        if (!item) return;

        item.quantity = quantity;
        if (item.quantity <= 0) this.removeProduct(id);

        this.notify();
    }

    removeProduct(id) {
        this.cart = this.cart.filter(p => p.id !== id);
        this.notify();
    }

    getTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    getTotalPrice() {
        return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
}
