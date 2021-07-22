let apartments = 0;
let floor = 0;

$('body').on('click', '.video__cover', (e) => {
    $(e.currentTarget).addClass('active');
    let symbol = $('.video iframe')[0].src.indexOf('?') > -1 ? '&' : '?';
    $('.video iframe')[0].src += symbol + 'autoplay=1';
})

$('body').on('click', '.plans__nav span', (e) => {
    $('.plans__floor').removeClass('active');
    $('.plans__apartments').removeClass('active');
    $('.plans__nav span').removeClass('active');
    $('.plans__house rect').removeClass('active');
    $(`.plans__house rect#${$(e.currentTarget).attr('class')}`).addClass('active');
    $(`.plans__floor.${$(e.currentTarget).attr('class')}`).addClass('active');
    $(e.currentTarget).addClass('active');
})

$('body').on('click', '.plans__house rect', (e) => {
    $('.plans__floor').removeClass('active');
    $('.plans__apartments').removeClass('active');
    $('.plans__house rect').removeClass('active');
    $('.plans__nav span').removeClass('active');
    $(`.plans__nav span.${$(e.currentTarget).attr('id')}`).addClass('active');
    $(`.plans__floor.${$(e.currentTarget).attr('id')}`).addClass('active');
    $(e.currentTarget).addClass('active');
})

$('body').on('click', '.plans__floor.active path, .plans__floor.active rect, .plans__floor.active polyline, .plans__floor.active polygon', (e) => {
    $('.plans__apartments').removeClass('active');
    $('.plans__apartments').addClass('active');

    floor = $(e.currentTarget).attr('id').match(/(s)[0-9]*/gm)[0].match(/[0-9]*/gm)[1];
    apartments = $(e.currentTarget).attr('id').match(/(-)[0-9]*/gm)[0].match(/[0-9]*/gm)[1];

    $('.modal .floor').val(floor);
    $('.modal .apart').val(apartments);

    if ($(window).width() < 767) {
        $('.plans__apartments').slideDown();
    }
})

$('body').on('click', '.plans__apartments', (e) => {
    $('.plans__apartments').removeClass('active');

    if ($(window).width() < 767) {
        $('.plans__apartments').slideUp();
    }
})

// show modal
$('body').on('click', '[data-modal]:not(.modal)', (e) => {
    $('.modal.active').removeClass('active');
    $(`.modal[data-modal="${$(e.currentTarget).attr('data-modal')}"]`).slideToggle();
});

// close modal events
let closeModal = () => {
    $('.modal').slideToggle();
}

$('body').on('click', '.modal__close, .modal .close', closeModal);

$('body').on('click', '.backdrop', (e) => {
    if ($(e.target)[0].className === 'backdrop active') closeModal();
});

// close modal on press ESC
$(document).keyup((e) => {
    if (e.keyCode === 27 && $('.backdrop').hasClass('active')) closeModal();
});

if ($('#phone-mask').length > 0) {
    var phoneMask = IMask(
        document.getElementById('phone-mask'), {
            mask: '+{7}(000)000-00-00'
    });
}

if ($('#phone-mask2').length > 0) {
    var phoneMask2 = IMask(
        document.getElementById('phone-mask2'), {
            mask: '+{7}(000)000-00-00'
    });
}

let initMobileMenu = () => {
    if ($(window).width() <= 767 && $('.hamburger').length === 0) {
        $('.header .container').append('<div class="hamburger"><span></span></div>');
    } else if ($(window).width() > 767  && $('.hamburger').length > 0) {
        $('.hamburger').remove();
    }
}

initMobileMenu();

$(window).on('resize', initMobileMenu);

$('body').on('click', '.hamburger', (e) => {
    $(e.currentTarget).toggleClass('active');
    $('.menu').slideToggle('active');
});

$('body').on('click', '.close-menu', () => {
    $('.hamburger').toggleClass('active');
    $('.menu').removeClass('active');
});