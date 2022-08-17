const app = Vue.createApp({
    data() {
        return {
            products: "",
            url: "",
            select: "relevance",
            category: [],
            priceLow: "0",
            priceHigh: "15000",
            cart: "",
            user: sessionStorage.getItem("user"),
            multipleQuantity: ""
        }
    },
    methods: {
        //getting products
        addProducts(data) {
            this.products = data
        },
        //getting cart from api
        getCart(data) {
            this.cart = data
        },
        //saving single product to session storage to use in displaying single item
        singleProduct(query) {
            sessionStorage.setItem("product" , query)
        },
        //sorting filter 
        filterSorted() {
            let fil = []
            if (this.select == "relevance") {
                return this.filters
            } else if (this.select == "high") {
                fil = this.filters.sort(function (a, b) {
                    return a.price - b.price;
                }).reverse();
            } else if (this.select == "low") {
                fil = this.filters.sort(function (a, b) {
                    return a.price - b.price;
                });
            } else if (this.select == "rating") {
                fil = this.filters.sort(function (a, b) {
                    return a.rating - b.rating;
                }).reverse();
            } else {
                return error
            }
        },
        //add single product to cart 
        async addToCart(product) {
            let currentCart = this.displayCart.filter(item => item.product == product)

            //check if product is already in cart and update quantity
            if (currentCart.length > 0) {
                const data = {
                    name: product,
                    quantity: parseInt(currentCart[0].quantity) + 1,
                    users: this.user
                }
                await fetch('http://localhost/store/api/change-quantity/change', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), //parsing object variable created above
                })
                this.cartFetch()
            }else {
            //adding new item to cart 
                const data = {
                    name: product,
                    quantity: 1,
                    purchased: 0,
                    users: this.user
                }
                await fetch('http://localhost/store/api/add-cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), //parsing object variable created above
                })
                this.cartFetch()
            }
            swal({
                title: "Item added to cart!",
                icon: "success"
            })

        },
        //add to cart with specified amount 
        async addMultipleToCart(product) {
            let productQuantity = document.getElementById("quantity").value;
            let currentCart = this.displayCart.filter(item => item.product == product)

            // check if product is already in cart and update quantity
            if (currentCart.length > 0) {
            let newQuantity = parseInt(currentCart[0].quantity) + parseInt(productQuantity)
                const data = {
                    name: product,
                    quantity: newQuantity,
                    users: this.user
                }
                await fetch('http://localhost/store/api/change-quantity/change', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), //parsing object variable created above
                })
                this.cartFetch()
            }else{
                const data = {
                    name: product,
                    quantity: productQuantity,
                    purchased: 0,
                    users: this.user
                }
                await fetch('http://localhost/store/api/add-cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), //parsing object variable created above
                })
                this.cartFetch
            }
            swal({
                title: "Item added to cart!",
                icon: "success"
            })

        },
        //change quantity in cart with api
        async changeQuantity(product, e){
            const data = {
                name: product,
                quantity: e.target.value,
                users: this.user
            }
            await fetch('http://localhost/store/api/change-quantity/change', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), //parsing object variable created above
            })
            this.cartFetch()
        },
        //delete from cart with api
        async deleteFromCart(product){
            const data = {
                name: product,
                users: this.user
            }
            await fetch('http://localhost/store/api/delete-cart/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            this.cartFetch()
        },
        //cart fetch api
        cartFetch() {
            fetch('http://localhost/store/api/cart/cart')
                .then(response => response.json())
                .then(data => this.getCart(data));
        },
        //closing side cart menu
        closeAside(){
            let element = document.getElementsByClassName("side");
            for (let i = 0; i < element.length; i++) {
                element[i].classList.remove("on")
            }
            let side = document.getElementsByClassName("side");
            for (let i = 0; i < side.length; i++) {
                side[i].classList.remove("on-side")
            }
              
        }
    },
    //fetch apis
    beforeCreate() {
        fetch('http://localhost/store/api/products')
            .then(response => response.json())
            .then(data => this.addProducts(data));

        fetch('http://localhost/store/api/cart/cart')
            .then(response => response.json())
            .then(data => this.getCart(data));
    },
    //check if user is logged in
    beforeMount(){
        if (sessionStorage.getItem("user") == null){
            window.location.href="http://localhost/store/login.html"
        }
    },
    computed: {
        //getting featured products
        filterFeatured() {
            return this.products.filter(product => product.sale == 1 || product.featured == 1)
        },
        //getting filtered categories
        filterCategory() {
            catVal = []
            queryParams = window.location.search.substring(10);
            if (this.priceHigh > 13000 && this.priceLow == 0) {
                return this.products.filter(product => product.category == queryParams)
            } else {
                catVal = this.products.filter(product => product.category == queryParams)
                catVal = catVal.filter(product => product.price >= this.priceLow && product.price <= this.priceHigh)
                return catVal
            }
        },
        //filtering single product page
        filterProductsByName() {
            let productDetail = sessionStorage.getItem("product")
            return this.products.filter(product => product.title == productDetail)
        },
        //filtering products on all products
        filters() {
            var retVal = [];
            if (this.category.length == 0) {
                if (this.priceHigh < 15000 || this.priceLow > 0) {
                    retVal = this.products.filter(product => product.price >= this.priceLow && product.price <= this.priceHigh)
                } else {
                    retVal = this.products
                }
            }
            else if (this.category.length > 0) {
                if (this.priceHigh < 15000 || this.priceLow > 0) {
                    retVal = this.products.filter(product => this.category.includes(product.category))
                    retVal = retVal.filter(product => product.price >= this.priceLow && product.price <= this.priceHigh)
                } else {
                    retVal = this.products.filter(product => this.category.includes(product.category))
                }
            }
            return retVal
        },
        //display cart
        displayCart() {
            return this.cart.filter(product => product.email == this.user)
        },
        //getting total price
        total(){
            return this.displayCart.reduce((currentValue, currentObj) =>{
                let test = currentObj.price * currentObj.quantity
                return currentValue + test
            }, 0).toFixed(2)
        }
    }
}).mount("#app")

