// Dummy data for demonstration (in-memory data store)
let products = [];

function addProduct() {
    const productName = document.getElementById("product-name").value;
    const sellingPrice = parseFloat(document.getElementById("selling-price").value);
    const category = document.getElementById("category").value;

    if (productName && !isNaN(sellingPrice)) {
        const product = { productName, sellingPrice, category };
        products.push(product);
        renderProductList();
        clearFormFields();
    } else {
        alert("Please enter valid product details.");
    }
}

function renderProductList() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${product.productName}</strong> - ${product.sellingPrice} - ${product.category}
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productList.appendChild(listItem);
    });
}

function clearFormFields() {
    document.getElementById("product-name").value = "";
    document.getElementById("selling-price").value = "";
    document.getElementById("category").selectedIndex = 0;
}

function editProduct(index) {
    const product = products[index];
    document.getElementById("product-name").value = product.productName;
    document.getElementById("selling-price").value = product.sellingPrice;
    document.getElementById("category").value = product.category;

    // Remove the product from the list when editing
    products.splice(index, 1);
    renderProductList();
}

function deleteProduct(index) {
    products.splice(index, 1);
    renderProductList();
}

// Initial rendering of the product list
renderProductList();
