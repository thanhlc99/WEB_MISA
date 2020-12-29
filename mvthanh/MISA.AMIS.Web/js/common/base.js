
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
        var me = this;

        //Sự kiện khi ấn nút thêm
        $('#btnAdd').click(function () {
            //hiển thị dialog thêm thông tin
            $('#dialog').show();
        })
        //sự kiện khi ấn nút load
        $('#btnRefresh').click(function () {
            
            $('table tbody tr').remove();
            me.loadData();
        })

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

            //thu thập thông tin dữ liệu được nhập ->built thành obj
            var objCustomer = {
                "CustomerCode": $('#txtCustomerCode').val(),
                "FullName": $('#txtFullName').val(),
                "Address": $('#txtAddress').val(),
                "DateOfBirth": $('#txtBirthDay').val(),
                "Email": $('#txtEmail').val(),
                "PhoneNumber": $('#txtPhoneNumber').val(),
                "CustomerGroupId": "00000000-0000-0000-0000-000000000000",
                "CompanyName": $('#txtCompany').val(),
                "CompanyTaxCode": $('#txtTaxCode').val(),
                "CustomerGroupName": "Nhóm khách hàng MISA",
            }
            //gọi service thực hiện lưu
            $.ajax({
                url: "http://api.manhnv.net/api/customers",
                method: "POST",
                data: JSON.stringify(objCustomer),
                contentType: "application/json"
            }).done(function (res) {
                alert("them thành công");
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