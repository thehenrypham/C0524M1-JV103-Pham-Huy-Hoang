// Hiển thị sản phẩm
function displayProduct() {
    let str = "";
    for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].show > 0) {
            str += `<tr>
                <td>${listProduct[i].id}</td>
                <td><img src="${listProduct[i].photo}" alt="${listProduct[i]}" style="width:auto; height:50px"></td>
                <td>${listProduct[i].name}</td>
                <td>${listProduct[i].category}</td>
                <td>${listProduct[i].quantity}</td>
                <td>${listProduct[i].color}</td>
                <td>${listProduct[i].price}</td>
                <td>${listProduct[i].status}</td>
                <td><button style="background-color: #103ffb;color: white" type="button" onClick="editProduct(${i})"><i class="fa fa-pencil"></i> Edit</button>
                <button style="background-color: crimson;color: white" type="button" onClick="removeProduct(${i})"><i class="fa fa-trash"></i> Remove</button></td>
                </tr>`;
        }
    }
    document.getElementById("body").innerHTML = str;
}
displayProduct(listProduct);

// Đếm số sản phẩm hiển thị
function countProduct() {
    let count = 0;
    for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].show === 1) {
            count++;
        }
    }
    document.getElementById("total").innerText = count + " products";
}
countProduct();

function addProduct() {
    // Kiểm tra sản phẩm trùng tên
    let j = 0;
    for (let i = 0; i < listProduct.length; i++) {
        if (document.getElementById("name").value === listProduct[i].name && listProduct[i].show === 1) {
            alert("This product is already in the list. Please set another name.")
            break;
        } else j++;
    }
    if (j > 0) {
        addProduct2();
    }
}

// Kiểm tra các trường thông tin trống
let e = 0;

function checkInfo() {
    if (document.getElementById("name").value === "") {
        alert("Please enter a product name");
    } else if (document.getElementById("quantity").value === "") {
        alert("Please enter a quantity");
    } else if (document.getElementById("price").value === "") {
        alert("Please enter a price");
    } else if (+document.getElementById("quantity").value < 0 || +document.getElementById("quantity").value % 1 !== 0) {
        alert("The product quantity must be a positive integer");
    } else if (+document.getElementById("price").value < 0) {
        alert("The product price must be greater than or equal 0");
    } else e = 1;
}

function addProduct2() {
    checkInfo();
    if (e === 1) {
        // Khi đã đảm bảo các điều kiện thì mới tạo sản phẩm mới
        let product = new Product();
        product.setID(listProduct.length + 1);
        product.setPhoto(document.getElementById("photo").value);
        product.setName(document.getElementById("name").value);
        product.setCategory(document.getElementById("category").value);
        product.setQuantity(+document.getElementById("quantity").value);
        let colors = document.getElementsByName("color");
        let arrColors = [];
        for (let i = 0; i < colors.length; i++) {
            if (colors[i].checked === true) {
                arrColors.push(colors[i].value);
            }
        }
        product.setColor(arrColors);
        product.setPrice(+document.getElementById("price").value);
        product.setStatus(document.getElementById("status").value);
        product.setShow(1);
        product.setSearch(0);
        listProduct.push(product);
        displayProduct();
        countProduct();
        alert("Product added successfully.");
        clearInfor();
        e = 0;
    }
}

function clearInfor() {
    document.getElementById("photo").value = "";
    document.getElementById("name").value = "";
    document.getElementById("category").value = "Unknown";
    document.getElementById("quantity").value = "";
    let colors = document.getElementsByName("color");
    for (let i = 0; i < colors.length; i++) {
        colors[i].checked = false;
    }
    document.getElementById("price").value = "";
    document.getElementById("status").value = "Available";
}

function removeProduct(i) {
    let c = confirm("Are you want to remove this product?");
    if (c === true) {
        listProduct[i].setShow(0);
        displayProduct();
        countProduct();
        alert("Product removed successfully.");
    }
}

let productID = 0;

function editProduct(i) {
    clearInfor();
    document.getElementById("photo").value = listProduct[i].photo;
    document.getElementById("name").value = listProduct[i].name;
    document.getElementById("category").value = listProduct[i].category;
    document.getElementById("quantity").value = listProduct[i].quantity;
    document.getElementById("price").value = listProduct[i].price;
    document.getElementById("status").value = listProduct[i].status;
    document.getElementById("submit").hidden = true;
    document.getElementById("save").hidden = false;
    document.getElementById("clear").hidden = true;
    document.getElementById("addProduct").hidden = true;
    document.getElementById("editProduct").hidden = false;
    document.getElementById("cancel").hidden = false;
    document.getElementById("editProduct").innerText = "EDIT PRODUCT " + listProduct[i].name;
    let colors1 = document.getElementsByName("color");
    let colors2 = listProduct[i].color;
    for (let j = 0; j < colors1.length; j++) {
        if (colors2.indexOf(colors1[j].value) !== -1) {
            colors1[j].checked = true;
        }
    }
    productID = i;
    e = 0;
    // Scroll To Top Page
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function saveProduct() {
    checkInfo();
    if (e === 1) {
        listProduct[productID].setPhoto = document.getElementById("photo").value;
        listProduct[productID].setName(document.getElementById("name").value);
        listProduct[productID].setCategory(document.getElementById("category").value);
        listProduct[productID].setQuantity(document.getElementById("quantity").value);
        let colors = document.getElementsByName("color");
        let arrColors = [];
        for (let i = 0; i < colors.length; i++) {
            if (colors[i].checked === true) {
                arrColors.push(colors[i].value);
            }
        }
        listProduct[productID].setColor(arrColors);
        listProduct[productID].setPrice(document.getElementById("price").value);
        listProduct[productID].setStatus(document.getElementById("status").value);
        displayProduct();
        alert("Product edited successfully.");
        document.getElementById("submit").hidden = false;
        document.getElementById("save").hidden = true;
        document.getElementById("clear").hidden = false;
        document.getElementById("cancel").hidden = true;

        clearInfor();
        e = 0;
    }
}

function cancelEdit() {
    clearInfor();
    document.getElementById("submit").hidden = false;
    document.getElementById("save").hidden = true;
    document.getElementById("clear").hidden = false;
    document.getElementById("cancel").hidden = true;
    document.getElementById("addProduct").hidden = false;
    document.getElementById("editProduct").hidden = true;
}

function searchProduct() {
    let str1 = document.getElementById("search").value.toLowerCase();
    for (let i = 0; i < listProduct.length; i++) {
        let str2 = listProduct[i].name.toLowerCase();
        if (str2.includes(str1) === true) {
            listProduct[i].setSearch(1);
        } else listProduct[i].setSearch(0);
    }
    let str = "";
    for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].search > 0) {
            str += `<tr>
                <td>${listProduct[i].id}</td>
                <td><img src="${listProduct[i].photo}" alt="${listProduct[i]}" style="width:auto; height:50px"></td>
                <td>${listProduct[i].name}</td>
                <td>${listProduct[i].category}</td>
                <td>${listProduct[i].quantity}</td>
                <td>${listProduct[i].color}</td>
                <td>${listProduct[i].price}</td>
                <td>${listProduct[i].status}</td>
                <td><button style="background-color: #103ffb;color: white" type="button" onClick="editProduct(${i})"><i class="fa fa-pencil"></i> Edit</button>
                <button style="background-color: crimson;color: white" type="button" onClick="removeProduct(${i})"><i class="fa fa-trash"></i> Remove</button></td>
                </tr>`;
        }
    }
    document.getElementById("body").innerHTML = str;
    countProduct();
}

function clearSearch() {
    displayProduct();
    document.getElementById("search").value = "";
}

