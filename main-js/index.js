// fetch('http://localhost/store/api/products')
//                 .then(response => response.json())//return object as a json text
//                 .then(data => console.log(data));//using arrow function inside chained .then()


const app = Vue.createApp({
    data(){
        return {
            product: [],
            featured: [],
            url: ""
        }
    },
    methods:{
        filterFeatured(){
                for (key of this.product){
                    for (item of key){
                        if (item.sale == 1 || item.featured == 1){
                            this.featured.push(item)
                        }
                    }
                }
        },
        addProducts(data) {
            this.product.push(data)
            this.filterFeatured()
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