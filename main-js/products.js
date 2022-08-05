const app = Vue.createApp({
    data() {
        return {
            products: "",
            url: "",
            select: "relevance",
            copy: "",
            category: [],
            priceLow: "0",
            priceHigh: "15000",
            cart: ""
        }
    },
    methods: {
        //getting data
        addProducts(data) {
            this.products = data
            this.copy = data
            console.log(this.copy)
        },
        getCart(data) {
            this.cart = data
            console.log(this.cart)
        },
        //getting url for single product page with query strings
        getUrl(query) {
            let starturl = "product-detail.html?";
            this.url = starturl + query;
            console.log(this.url)
        },
        filterSorted() {
            if (this.select == "relevance") {
                return this.filters
            } else if (this.select == "high") {
                this.filters.sort(function (a, b) {
                    return a.price - b.price;
                }).reverse();
            } else if (this.select == "low") {
                this.filters.sort(function (a, b) {
                    return a.price - b.price;
                });
            } else if (this.select == "rating") {
                this.filters.sort(function (a, b) {
                    return a.rating - b.rating;
                }).reverse();
            } else {
                return error
            }
        },
        addToCart(product, quantity) {
            if (this.cart.filter(cart => cart.product == product).length > 0) {

            } else {
                users = sessionStorage.getItem("user")
                data = {
                    name: product,
                    quantity: quantity,
                    purchased: 0,
                    user: users
                }
                fetch('http://localhost/store/api/addCart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), //parsing object variable created above
                })
            }


            this.cartFetch()

        },
        cartFetch() {
            fetch('http://localhost/store/api/cart/cart')
                .then(response => response.json())//return object as a json text
                .then(data => this.getCart(data));//using arrow function inside chained .then()
        }
    },
    //fetch api
    beforeCreate() {
        fetch('http://localhost/store/api/products')
            .then(response => response.json())//return object as a json text
            .then(data => this.addProducts(data));//using arrow function inside chained .then()

        fetch('http://localhost/store/api/cart/cart')
            .then(response => response.json())//return object as a json text
            .then(data => this.getCart(data));//using arrow function inside chained .then()
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
            productDetail = window.location.search.substring(1);
            productDetail = productDetail.replaceAll('%20', ' ');
            productDetail = productDetail.replaceAll('%27s', "'s");
            console.log(productDetail)
            return this.products.filter(product => product.title == productDetail)
        },
        filters() {
            var retVal = [];
            if (this.category.length == 0) {
                if (this.priceHigh < 13000 || this.priceLow > 0) {
                    retVal = this.products.filter(product => product.price >= this.priceLow && product.price <= this.priceHigh)
                } else {
                    retVal = this.products
                }
            }
            else if (this.category.length > 0) {
                if (this.priceHigh < 13000 || this.priceLow > 0) {
                    retVal = this.products.filter(product => this.category.includes(product.category))
                    retVal = retVal.filter(product => product.price >= this.priceLow && product.price <= this.priceHigh)
                } else {
                    retVal = this.products.filter(product => this.category.includes(product.category))
                }
            }
            return retVal
        }
    }
}).mount("#app")