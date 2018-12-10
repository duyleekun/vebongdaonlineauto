var url;

$(function() {
	url = $("#url").val();

	$(".submitChooseSeat").on("click", function(event) {
		var checkFlag = checkValidBookTicket();
		if (checkFlag == true) {
			submitChooseSeat(event);
		} else if (checkFlag == false){
			//alert("Vé theo mệnh giá được chọn đang ở trong trạng thái chờ Khách hàng khác thanh toán. Xin Quý khách vui lòng quay lại sau!");
			alert("Xin Quý khách thông cảm, hiện nay số lượng vé bán đợt hiện tại đã hết. Mời Quý khách quay trở lại mua vé đợt tiếp theo được bắt đầu mở bán vào các khung giờ sau: 10:00, 16:00, 22:00 trong ngày. Cảm ơn Quý khách đã sử dụng dịch vụ.");
		} else {
			alert(checkFlag);
		}

	});

	$('.chair_match').html('0 vé');
	$('#selectPrice option:eq(0)').attr('selected', true);
	document.getElementById("btnSubmit").style.visibility = 'hidden';

});

var addEmptyOption = false;
function changeSeat(value) {

	var seatValue = $('#seatSelect').val();
	$('#seatValue').val(seatValue);
	$('.chair_match').html($('#seatSelect').val() + " vé");
}

function checkValidBookTicket() {
	var seat = $('#seatSelect').val();
	var matchId = $('#matchId').val();
	var priceValue = $('#priceValue').val();
	var data = {};
	data["matchId"] = matchId;
	data["price"] = priceValue;
	data["seat"] = seat;
	var checkResult = false;
	$.ajax({
		url : url + "/checkValidBookTicket",
		data : JSON.stringify(data),
		type : "POST",
		async: false,
		contentType : "application/json; charset=utf-8",
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(data) {
		// Check if status OK
		if (data.localeCompare('OK') == 0) {
			checkResult = true;
		} else if (data.localeCompare('NG') == 0) {
			// checkResult = 'Vé theo mệnh giá được chọn đang ở trong trạng thái chờ Khách hàng khác thanh toán. Xin Quý khách vui lòng quay lại sau!';
			checkResult = 'Xin Quý khách thông cảm, hiện nay số lượng vé bán đợt hiện tại đã hết. Mời Quý khách quay trở lại mua vé đợt tiếp theo được bắt đầu mở bán vào các khung giờ sau: 10:00, 16:00, 22:00 trong ngày. Cảm ơn Quý khách đã sử dụng dịch vụ.';
		} else {
			// checkResult = 'Vé theo mệnh giá được chọn đang ở trong trạng thái chờ Khách hàng khác thanh toán. Xin Quý khách vui lòng quay lại sau!';
			checkResult = 'Xin Quý khách thông cảm, hiện nay số lượng vé bán đợt hiện tại đã hết. Mời Quý khách quay trở lại mua vé đợt tiếp theo được bắt đầu mở bán vào các khung giờ sau: 10:00, 16:00, 22:00 trong ngày. Cảm ơn Quý khách đã sử dụng dịch vụ.';
		}
    }).fail(function () {

    });

	return checkResult;
}
