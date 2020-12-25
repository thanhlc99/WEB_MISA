$(document).ready(function () {
    loadData();
})

function loadData() {
    //lấy dữ liệu về
    $.ajax({
        url: "http://api.manhnv.net/api/employees",
        method: "GET"
    }).done(function (res) {
        var data = res;
        $.each(data, function (index, item) {
            var dateOfBirth = item['DateOfBirth'];
            dateOfBirth = formatDate(dateOfBirth);
            var salary = item['IdentityNumber'];
            salary = formatMoney(salary);
            var tr = $(`<tr>
                            <td>`+ item['EmployeeCode'] + `</td>
                            <td>`+ item['FullName'] + `</td>
                            <td>`+ item['GenderName'] + `</td>
                            <td >`+ dateOfBirth + `</td>
                            <td >`+ item['PhoneNumber'] + `</td>
                            <td >`+ item['Email'] + `</td>
                            <td>`+ item['PositionName'] + `</td>
                            <td style="max-width:215px;"><span style="width:215px" title="`+ item['QualificationName'] + `">` + item['QualificationName'] + `</span></td>
                            <td >`+ salary + `</td>
                            <td style="max-width:215px;"><span style="width:215px" title="`+ item['Address'] + `">` + item['Address'] + `</span></td>
                            <td>`+ item['WorkStatusName'] + `</td>
                        </tr>
                       `);
            $('table tbody').append(tr);
        })
    }).fail(function (res) {

    })
    //binding dữ liệu lên table
}
