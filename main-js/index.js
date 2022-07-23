fetch('http://localhost/store/api/products')
                .then(response => response.json())//return object as a json text
                .then(data => console.log(data));//using arrow function inside chained .then()

// const products = Vue.createApp({
//     data (){
//         return {
//             products: []
//         }
//     }
    // methods: {
    //     getProducts () {
    //         fetch('http://localhost/store/api/products')
    //             .then(response => response.json())//return object as a json text
    //             .then(data => console.log(data));//using arrow function inside chained .then()
    //     }
    // },
    // mounted(){
    //     this.getProducts
    // }
// }).mount("#app")