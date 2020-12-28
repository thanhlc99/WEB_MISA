/**
 * Hàm cha của employee và customer
 * created by mvthanh(26/12/2020)
 * */
class BaseJs {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.initEvents();
    }

    setDataUrl() {

    }

    initEvents() {
        //Sự kiện khi ấn nút thêm
        $('#btnAdd').click(function () {
            //hiển thị dialog thêm thông tin
            $('#dialog').show();
        })
        //sự kiện khi ấn nút load
        $('#btnRefresh').click(function () {
            this.loadData();
        }.bind(this))

        //Hiển thị thông tin chi tiết khi nhấn đúp chuột vô 1 bản ghi
        $('table tbody').on('dblclick', 'tr', function () {
            $('#dialog').show();
        })


        //sự kiện ấn nút x hoặc hủy
        $('#btnCancel').click(function () {
            $('#dialog').hide();
        })
        $('#btnClose').click(function () {
            $('#dialog').hide();
        })
        
        //sự kiến ấn nút lưu
        $('#btnSave').click(function () {
            //validate dữ liệu

            //thu thập thông tin dữ liệu được nhập ->built thành obj

            //gọi service thực hiện lưu

            //lưu ->đưa ra thông báo -> ẩn form -> load lại dl
        })
    }


    /**======================================
     * Hàm chức năng load dữ liệu
     * Created by mvthanh (26/12/2020)
     * */
    loadData() {
       
        var columns = $('table thead th');//lấy số lượng cột th
        var getDataUrl = this.getDataUrl;

        $.ajax({
            url: getDataUrl,
            method: "GET"
        }).done(function (res) {
            $.each(res, function (index, obj) {
                var tr = $(`<tr><tr>`);
                
                $.each(columns, function (index, th) {
                    var td = $('<td><div><span></span></div></td>');
                    var fielNames = $(th).attr('fieldName');//lấy cái để map dữ liệu vào
                    var value = obj[fielNames];//lấy thông tin dữ liệu map tương ứng
                    var formatType = $(th).attr('formatType');//lấy dữ liệu để map format date
                    switch (formatType) {
                        case "d/m/y":
                            value = formatDate(value);
                            break;
                        case "Money":
                            value = formatMoney(value);
                            break;
                        default:
                            break;
                    }
                    td.append(value);
                    tr.append(td);
                })

                $('table tbody').append(tr);
            })
        }).fail(function (res) {

        })
    }
}