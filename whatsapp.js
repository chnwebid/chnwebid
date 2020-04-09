window.addEventListener("load", function() {
    
	var web_title = jQuery('title').text();

	var audio = document.createElement("audio");
	audio.src = "https://cek.jasa-design.web.id/contactform-wa/widget/file/wa.mp3";
	audio.preload = "auto";
	audio.addEventListener("canplaythrough", function () {
		setTimeout(function(){
			audio.play();
			jQuery('title').text('?? 1 - ' + web_title);
			jQuery('.waFix').addClass('show');
		}, 1000);
	}, false);

	jQuery('.waFix').on('click', function(){
		jQuery(this).removeClass('show');
		jQuery('title').text(web_title);
	});

    jQuery(".formWA input, .formWA textarea").on('keypress', function() {
	    if (event.keyCode === 13) {
	        jQuery(this).parents(".formWA").find('.submit').trigger('click');
	    }
	});

	jQuery('.formWA .wajib').each(function() {
	    title = jQuery(this).attr('placeholder');
	    label = jQuery(this).parents('label');
	    jQuery('<span class="validasi"><b>' + title + '</b> (dibutuhkan)</span>').appendTo(label);
	});
	
	jQuery('.formWA .wajib').keyup(function() {
	    if (jQuery(this).val() != '') {
	        jQuery(this).removeClass('focus');
	        jQuery(this).parents('label').find('.validasi').removeClass('show');
	    }
	});

	jQuery(".formWA select").change(function() {
	    jQuery(this).removeClass('focus');
	    jQuery(this).parents('label').find('.validasi').removeClass('show');
	});

}, false);

jQuery('.formWA .submit').on('click', function(){
    kirimWA(jQuery(this).parents('.poptamv').attr('id'));
    return false;
});

function kirimWA(id) {

    var validasi = true;

    jQuery('#'+id+' .wajib').each(function() {
        if ($.trim(jQuery(this).val()) == '' || $.trim(jQuery(this).val()) == 'default') {
            jQuery(this).addClass('focus');
        }
    });
    jQuery('#'+id+' .wajib').each(function() {

        if ($.trim(jQuery(this).val()) == '') {

            validasi = false;

            jQuery(this).parents('label').find('.validasi').addClass('show');
            jQuery(this).focus();
            return false;
        } else if ($.trim(jQuery(this).val()) == 'default') {

            validasi = false;

            jQuery(this).parents('label').find('.validasi').addClass('show');
            return false;
        }
    });

    if (validasi === true) {

        var parameter = '';
        var url_wa = 'https://web.whatsapp.com/send';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            url_wa = 'whatsapp://send';
        }

        if(id === 'konsultasi') {

    		var kode_area = 62,
    		nomor_whatsapp = 89618885066,
    		nama_admin = 'Kang Rian',
    		pesan_salam = 'Assallamu`alaikum';

            var judul = jQuery('#'+id+' .title-content').text(),
            nama = jQuery('#'+id+' .nama').val(),
            url = jQuery('#'+id+' .url').val(),
            pesan = jQuery('#'+id+' .pesan').val();

            var parameter = url_wa + '?phone=' + kode_area + nomor_whatsapp + '&text=' +
                pesan_salam + ' ' + nama_admin + '.. ' +
                'saya *' + nama + '*, ingin *' + judul + '*.' +
                '%0A%0A?? ' + pesan + '%0A%0A' +
                'Domain: ' + url + '%0A' +
                'via ' + location.href;

        } else if (id === 'orderBisnis') {

            var kode_area = 62,
            nomor_whatsapp = 89618885066,
            nama_admin = 'Kang Rian',
            pesan_salam = 'Assallamu`alaikum';

            var judul = jQuery('#'+id+' .title-content').text(),
            url = jQuery('#'+id+' .url').val(),
            nama = jQuery('#'+id+' .nama').val(),
            email = jQuery('#'+id+' .email').val(),
            metodePembayaran = jQuery('#'+id+' .metodePembayaran').val();

            var parameter = url_wa + '?phone=' + kode_area + nomor_whatsapp + '&text=' +
                pesan_salam + ' ' + nama_admin + '.. ' +
                'saya *' + nama + '* ( ' + email + ' ), ingin Konfirmasi *' + judul + '.*%0A%0A' +
                'Domain: *' + url + '*%0A' +
                'Metode Pembayaran via:%0A*' + metodePembayaran + '*%0A%0A' +
                'via ' + location.href;

        } else if (id === 'kirimReview') {

            var kode_area = 62,
            nomor_whatsapp = 89618885066,
            nama_admin = 'Kang Rian',
            pesan_salam = 'Assallamu`alaikum';

            var judul = jQuery('#'+id+' .title-content').text(),
            nama = jQuery('#'+id+' .nama').val(),
            url = jQuery('#'+id+' .url').val(),
            review = jQuery('#'+id+' .review').val();

            var parameter = url_wa + '?phone=' + kode_area + nomor_whatsapp + '&text=' +
                pesan_salam + ' ' + nama_admin + '.. ' +
                'saya *' + nama + '*, ingin *' + judul + '.*%0A%0A' +
                '"' + review + '"%0A%0A' +
                'Url: *' + url + '*%0A' +
                'via ' + location.href;

        } else {
            alert('id tidak ditemukan');
        }

        // alert(parameter);
        jQuery(this).attr('href', parameter);

        var w = 960,
            h = 540,
            left = Number((screen.width / 2) - (w / 2)),
            tops = Number((screen.height / 2) - (h / 2)),
            popupWindow = window.open(this.href, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
        popupWindow.focus();
        return false;
    }
}