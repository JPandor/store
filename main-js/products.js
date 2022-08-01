const app = Vue.createApp ({
    data (){
        return {
            products: "",
            url: "",
            select: "relevance",
            copy: "",
            category: [],
            price: []
        }
    },
    methods:{
        addProducts(data) {
            this.products = data
            this.copy = data
            console.log(this.copy)
        },
        getUrl(query){
            let starturl = "product-detail.html?";
            this.url = starturl + query;
            console.log(this.url)
        },
        filterSorted(){
            if (this.select == "relevance"){
                return this.copy
            }else if (this.select == "high"){
                this.products.sort(function (a, b) {
                    return a.price - b.price;
                  }).reverse ();
            }else if (this.select == "low"){
                this.products.sort(function (a, b) {
                    return a.price - b.price;
                  });
            }else if (this.select == "rating"){
                this.products.sort(function (a, b) {
                    return a.rating - b.rating;
                  }).reverse ();
            }else {
                return error
            }
        },
        filter(){
            // this.products = this.copy
            // if (this.category.length > 0){
            //     for (key of this.category){
            //         return this.products.filter(product => this.category.includes(product.category))
            //     }
            // }
            if (this.category.length == 0 || this.category.includes("all")){
                    return this.products
                }else{
                    this.products = this.products.filter(product => this.category.includes(product.category))
                }
        }
    },
    beforeCreate (){
                fetch('http://localhost/store/api/products')
                    .then(response => response.json())//return object as a json text
                    .then(data => this.addProducts(data));//using arrow function inside chained .then()
    },
    computed: {
        filterFeatured(){
            return this.products.filter(product => product.sale == 1 || product.featured == 1) 
        },
        filterCategory (){
            queryParams = window.location.search.substring(10);
            return this.products.filter(product => product.category == queryParams) 
        },
        filterProductsByName(){
            productDetail = window.location.search.substring(1);
            productDetail = productDetail.replaceAll('%20', ' ');
            productDetail = productDetail.replaceAll('%27s', ' ');
            console.log(productDetail)
            return this.products.filter(product => product.title == productDetail)
        }
        // filters(){
        //     if (this.category.length == 0 || this.category.includes("all")){
        //         return this.products
        //     }else{
        //             return this.products = this.products.filter(product => this.category.includes(product.category))
        //     }
        // }
    }
}).mount("#app")