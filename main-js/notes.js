//trying to get side filters to work.
// the category filter works but not the price
//category filter is on line 27 and 11
filters(){
    var retVal = [];
    if (this.category.length == 0 && this.price.length == 0) {
        return this.products
    }
    else if (this.category.length > 0 || this.price.length > 0) {
        if (this.category.length > 0) {
            retVal = this.products.filter(product => this.category.includes(product.category))
        }
        for (i of this.price) {
            let split
            let a
            let b
            split = i.split("-")
            a = split[0]
            console.log(a)
            b = split[1]
            console.log(b)
            retVal = this.products.filter(product => product.price > 2000 && product.price < 5000)
        }

    }
    else {
        retVal = this.products.filter(product => this.category.includes(product.category))
        for (i of this.price) {
            let split
            let a
            let b
            split = i.split("-")
            a = split[0]
            console.log(a)
            b = split[1]
            console.log(b)
            retVal = this.products.filter(product => product.price > a && product.price < b)
        }
    }
    return retVal

}

//this is the example code that i got the category filter to work
list2: function () {
    var _this = this;
    var retVal = [];
    for (var i = 0; i < _this.products.length; i++) {
        if (_this.category.indexOf(String(i + 1)) != -1 || _this.test.length === 0) {
            retVal.push(_this.list[i]);
        }
    }
    return retVal;
}



// this is another attempt that didn't work
filter(){
    this.products = this.copy
    if (this.category.length > 0) {
        for (key of this.category) {
            return this.products.filter(product => this.category.includes(product.category))
        }
    }
    if (this.category.length == 0 || this.category.includes("all")) {
        return this.products
    } else {
        this.products = this.products.filter(product => this.category.includes(product.category))
    }
}