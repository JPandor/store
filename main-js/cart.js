const cart = Vue.createApp({
    data(){
        return {
            message: "hello"
        }
    },
    methods: {
        addToCart(product, quantity){

            console.log("hello")
        }
    }
}).mount("app")