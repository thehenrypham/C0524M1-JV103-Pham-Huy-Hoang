// Create Product Class
class Product {
    constructor(id, photo, name, category, quantity, color, price, status, show) {
        this.id = id;
        this.photo = photo;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.color = color;
        this.price = price;
        this.status = status;
        this.show = show;
    }
    setID(id) {
        this.id = id;
    }
    setPhoto(photo) {
        this.photo = photo;
    }
    setName(name) {
        this.name = name;
    }
    setCategory(category) {
        this.category = category;
    }
    setQuantity(quantity) {
        this.quantity = quantity;
    }
    setColor(color) {
        this.color = color;
    }
    setPrice(price) {
        this.price = price;
    }
    setStatus(status) {
        this.status = status;
    }
    setShow(show) {
        this.show = show;
    }
}