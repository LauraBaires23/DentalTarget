
/* Preloader */
$(window).load(function(){
    $('.preloader').fadeOut(1000);    
});

/* Todas las funciones al cargar el documento */
$(document).ready(function() {

    /* Ocultar menú móvil al hacer clic */
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

   /* Smoothscroll para el menú y botones */
    $('.navbar-default a, a.smoothScroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
    });

    /* Home Slideshow Vegas (Efecto Fade) */
    $('body').vegas({
        slides: [
            { src: 'images/slide-img1.jpg' },
            { src: 'images/slide-img2.jpg' },
            { src: 'images/slide-img3.jpg' }
        ],
        timer: false,
        transition: 'fade' // <-- Transición suave de mezcla
        // La propiedad 'animation' fue eliminada para evitar el movimiento
    });

    /* Team carousel */
    $("#team-carousel").owlCarousel({
        items : 3,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3],
        slideSpeed: 300,
        itemsTablet: [768,1],
        itemsTabletSmall: [985,2],
        itemsMobile : [479,1]
    });
    
    /* Back to Top */
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('.go-top').fadeIn(200);
        } else {
            $('.go-top').fadeOut(200);
        }
    });   
    
    $('.go-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 300);
    });

});