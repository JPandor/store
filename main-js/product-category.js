const app = Vue.createApp({
    data(){
        return {
            products: [],
            filterCategory: [],
            url: ""
        }
    },
    methods:{
        filter(){
            //getting query params
            queryParams = window.location.search.substring(10);
            //filtering through the array and adding correct category
            for (key of this.products){
                for (item of key){
                    if (item.category == queryParams){
                        this.filterCategory.push(item)
                    }
                }
            }
        },
        addProducts(data) {
            this.products.push(data);
            this.filter();
        },
        getUrl(query){
            let starturl = "product-detail.html?";
            this.url = starturl + query;
            console.log(this.url)
        }
    },
    beforeCreate (){
        fetch('http://localhost/store/api/products')
            .then(response => response.json())//return object as a json text
            .then(data => this.addProducts(data));//using arrow function inside chained .then()
    }
}).mount("#app")