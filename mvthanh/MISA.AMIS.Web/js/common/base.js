/**
 * Hàm cha của employee và customer
 * created by mvthanh(26/12/2020)
 * */
class BaseJs {
    constructor() {
        this.hostNV = "http://api.manhnv.net/api";
        this.domainNV = null;
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.initEvents();
    }

    setDomainNV() {

    }

    setDataUrl() {

    }
    /**======================================
    * Hàm chứa các sự kiện trong form
    * Created by mvthanh (26/12/2020)
     **/
    initEvents() {
        var me = this;

        //Sự kiện khi ấn nút thêm
        $('#btnAdd').click(function () {
            //hiển thị dialog thêm thông tin
            $('#m-dialog').dialog('open');
            //load dữ liệu select box

        })
        //sự kiện khi ấn nút load
        $('#btnRefresh').click(function () {

            $('table tbody tr').remove();
            me.loadData();
        })

        //Hiển thị thông tin chi tiết khi nhấn đúp chuột vô 1 bản ghi
        $('table tbody').on('dblclick', 'tr', function () {
            $('#m-dialog').dialog('open');
        })

        $('#btnClose').click(function () {
            $('#dialog').hide();
        })

        //validate du lieu dau vao input
        $('input[required]').blur(function () {
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được để trống!');
                $(this).attr('validate', false);
            }
            else {
                $(this).attr('validate', true);
                $(this).removeClass('border-red');
            }
        })

        //validate du lieu dau vao input email
        $('input[type="email"]').blur(function () {
            var email = $(this).val();
            var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!re.test(email)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Sai định dạng email!');
                $(this).attr('validate', false);
            } else {
                $(this).attr('validate', true);
                $(this).removeClass('border-red');
            }
        })



        //sự kiến ấn nút lưu
        $('#btnSave').click(function () {
            //validate dữ liệu
            var inputValues = $('input[type="email"],input[required]');
            //trigger kích hoạt 1 sự kiện gì của chính thằng đấy(tự động bật)
            $.each(inputValues, function (index, input) {
                $(input).trigger('blur');
            })
            var notValue = $('input[validate="false"]');
            if (notValue && notValue.length > 0) {
                notValue[0].focus();
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại");
                return;
            }

            //thu thập thông tin dữ liệu được nhập ->built thành objJson
            var objCustomers = {};
            var inputs = $('input[valueName],select[valueName]');//select tất cả các thẻ input
            $.each(inputs, function (index, value) {
                var propertieName = $(this).attr('valueName');
                var valueCustomer = $(this).val();
                if ($(this).attr('type')=="radio") {
                    if (this.checked) {
                        objCustomers[propertieName] = valueCustomer;
                    }
                }
                else {
                    objCustomers[propertieName] = valueCustomer;
                }
            })
            console.table(objCustomers);
            return;
            //gọi service thực hiện lưu
            $.ajax({
                url: this.hostNV + this.domainNV,
                method: "POST",
                data: JSON.stringify(objCustomers),
                contentType: "application/json"
            }).done(function (res) {
                alert("Thêm thành công");
            }).fail(function (res) {

            })

            //lưu ->đưa ra thông báo -> ẩn form -> load lại dl
        })
    }


    /**======================================
     * Hàm chức năng load dữ liệu
     * Created by mvthanh (26/12/2020)
     * */
    loadData() {

        var fielNames = [];
        var columns = $('table thead th');//lấy số lượng cột th
        var getDataUrl = this.getDataUrl;

        $.ajax({
            url: getDataUrl,
            method: "GET"
        }).done(function (res) {

            $.each(res, function (index, obj) {

                var tr = $(`<tr></tr>`);

                $.each(columns, function (index, th) {

                    var td = $(`<td><div><span></span></div></td>`);
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