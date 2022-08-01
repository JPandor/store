// const app = Vue.createApp({
//     data(){
//         return {
//             products: [],
//             similarProducts: [],
//             singleProduct: [],
//             url: ""
//         }
//     },
//     methods:{
//         singleProductFilter(){
//             //getting query params
//             queryParams = window.location.search.substring(1);
//             queryParams = queryParams.replaceAll('%20', ' ');
//             console.log(queryParams)
//             //filtering through the array and adding correct category
//             for (key of this.products){
//                 for (item of key){
//                     if (item.title == queryParams){
//                         this.singleProduct.push(item)
//                     }
//                 }
//             }
//         },
//         similarProductsFilter(){
//             let category = this.singleProduct[0].category;
//             let name = this.singleProduct[0].title;
//             for (key of this.products){
//                 for (item of key){
//                     if (item.category == category){
//                         if (item.title !== name){
//                             this.similarProducts.push(item)
//                         }
//                     }
//                 }
//             }
//         },
//         addProducts(data) {
//             this.products.push(data)
//             this.singleProductFilter()
//             this.similarProductsFilter()
//         },
//         getUrl(query){
//             let starturl = "product-detail.html?";
//             this.url = starturl + query;
//             console.log(this.url)
//         }
//     },
//     beforeCreate (){
//         fetch('http://localhost/store/api/products')
//             .then(response => response.json())//return object as a json text
//             .then(data => this.addProducts(data));//using arrow function inside chained .then()
//     }
// }).mount("#app")

const app = Vue.createApp ({
    data (){
        return {
            products: "",
            productDetail: ''
        }
    },
    methods:{
        addProducts(data) {
            this.products = data
            console.log(this.products)
            this.getProductName()
        },
        getProductName (){
            queryParams = window.location.search.substring(1);
            queryParams = queryParams.replaceAll('%20', ' ');
            this.productDetail = queryParams
        }
    },
    beforeCreate (){
                fetch('http://localhost/store/api/products')
                    .then(response => response.json())//return object as a json text
                    .then(data => this.addProducts(data));//using arrow function inside chained .then()
    },
    mounted: {
        filterProductsByName: function() {
            return this.products.filter(product => !product.title.indexOf(this.productDetail))
        }
    }  
}).mount("#app")