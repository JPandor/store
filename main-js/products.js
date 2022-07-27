const app = Vue.createApp({
    data(){
        return {
            products: [],
            men: false,
            women: false,
            electronics: false,
            jewelery: false,
            price: '',
            rating: ''
        }
    },
    methods:{
        addProducts(data) {
            this.products.push(data)
            console.log(this.products)
        }
    },
    beforeCreate (){
        fetch('http://localhost/store/api/products')
            .then(response => response.json())//return object as a json text
            .then(data => this.addProducts(data));//using arrow function inside chained .then()
    },
    computed: {

    }
}).mount("#app")