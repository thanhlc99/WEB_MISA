$(document).ready(function () {
    new Customer();
    
})

/**
 * Class quản lý các sự kiện cho trang customer
 * created by mvthanh(26/12/2020)
 * */
class Customer extends BaseJs {
    constructor() {

        super();
    }

    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }

}