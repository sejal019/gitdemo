const apiUrl = 'https://crudcrud.com/api/8c26deb8327346d4bea2f1ac621752de/products';

        let products = [];
        let editingId = null;

        function fetchProducts() {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    products = data;
                    renderProductList();
                })
                .catch(error => {
                    console.error('Error fetching product data:', error);
                });
        }

        fetchProducts();

        function renderProductList() {
            const productList = document.getElementById("product-list");
            productList.innerHTML = "";

            const categories = ['Food', 'Electronics', 'Skincare']; 

            categories.forEach(category => {
                const categoryHeader = document.createElement("h3");
                categoryHeader.textContent = category;
                productList.appendChild(categoryHeader);

                const categoryProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());

                if (categoryProducts.length > 0) {
                    const categoryList = document.createElement("ul");

                    categoryProducts.forEach(product => {
                        const listItem = document.createElement("li");
                        listItem.innerHTML = `
                            <strong>${product.productName} - ${product.sellingPrice} - ${product.category}</strong>
                            <button onclick="editProduct('${product._id}')">Edit</button>
                            <button onclick="deleteProduct('${product._id}')">Delete</button>
                        `;
                        categoryList.appendChild(listItem);
                    });

                    productList.appendChild(categoryList);
                }
            });
        }

        function clearFormFields() {
            document.getElementById("product-name").value = "";
            document.getElementById("category").selectedIndex = 0;
            document.getElementById("selling-price").value = "";
            document.getElementById("save-button").textContent = "Add Product";
            editingId = null; 
        }

        function saveProduct() {
            const productName = document.getElementById("product-name").value;
            const category = document.getElementById("category").value;
            const sellingPrice = parseFloat(document.getElementById("selling-price").value);

            if (productName && !isNaN(sellingPrice)) {
                if (!editingId) {
                    // add new product
                    const newProduct = { productName, category, sellingPrice };
                    fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newProduct)
                    })
                    .then(response => response.json())
                    .then(createdProduct => {
                        products.push(createdProduct);
                        renderProductList();
                        clearFormFields();
                    })
                    .catch(error => {
                        console.error('Error creating product:', error);
                    });
                } else {
                    // edit product
                    const updatedProduct = { productName, category, sellingPrice };
                    fetch(`${apiUrl}/${editingId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedProduct)
                    })
                    .then(response => response.json())
                    .then(editedProduct => {
                        const index = products.findIndex(product => product._id === editingId);
                        if (index !== -1) {
                            products[index] = editedProduct;
                        }
                        renderProductList();
                        clearFormFields();
                    })
                    .catch(error => {
                        console.error('Error editing product:', error);
                    });
                }
            } else {
                alert("Please enter valid product details.");
            }
        }

        function editProduct(id) {
            const product = products.find(product => product._id === id);

            if (product) {
                document.getElementById("product-name").value = product.productName;
                document.getElementById("category").value = product.category;
                document.getElementById("selling-price").value = product.sellingPrice;

                editingId = id;
                document.getElementById("save-button").textContent = "Update";
            }
        }

        function deleteProduct(id) {
            fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    const index = products.findIndex(product => product._id === id);
                    if (index !== -1) {
                        products.splice(index, 1);
                    }
                    renderProductList();
                    clearFormFields();
                } else {
                    console.error('Failed to delete product from API');
                }
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
        }