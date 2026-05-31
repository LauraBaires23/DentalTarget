
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
    $('#home').vegas({
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

    /* Botón de Mostrar Más / Menos */
$('#btn-semblanza').click(function(e) {
    e.preventDefault(); 
    
    var $btn = $(this);
    var $extraText = $('.texto-extra');

    $extraText.slideToggle(400, function() {
        if ($extraText.is(':visible')) {
            $btn.html('Mostrar menos <i class="fa fa-angle-up"></i>');
        } else {
            $btn.html('Mostrar más <i class="fa fa-angle-down"></i>');
        }
    });
});

/* =======================================================
       ABRIR LA TARJETA Y EXPANDIRLA
       ======================================================= */
    $('.cs-style-4 figure').click(function(e) {
        e.preventDefault();
        
        var $tarjetaOriginal = $(this); 
        
        // 1. Extraer la imagen y el título
        var imgSrc = $tarjetaOriginal.find('img').attr('src');
        var titulo = $tarjetaOriginal.find('figcaption h1').text();
        
        // 2. TEXTO INTELIGENTE (Web vs Móvil)
        var texto = "";
        if ($(window).width() < 768) {
            // Si es celular, copiamos SOLO el texto móvil
            texto = $tarjetaOriginal.find('.texto-movil').html();
        } else {
            // Si es computadora, copiamos SOLO el texto web
            texto = $tarjetaOriginal.find('.texto-web').html();
        }
        
        // 3. Inyectar los datos en la tarjeta grande
        $('#modal-img-head').attr('src', imgSrc);
        $('#modal-titulo').text(titulo);
        $('#modal-texto').html(texto); // IMPORTANTE: Usamos .html() para respetar las etiquetas
        
        // 4. Obtener medidas exactas para la animación
        var posicionOriginal = this.getBoundingClientRect();
        var $tarjeta = $('.tarjeta-expandida');
        
        // 5. Preparar la tarjeta viajera
        $tarjeta.show().css({
            'top': posicionOriginal.top + 'px',
            'left': posicionOriginal.left + 'px',
            'width': posicionOriginal.width + 'px',
            'height': posicionOriginal.height + 'px',
            'transform': 'none'
        });

        // 6. Bloquear scroll y encender el fondo oscuro
        $('html, body').addClass('no-scroll'); 
        $('#tarjeta-modal').fadeIn(150);

        // 7. Iniciar el viaje de la tarjeta hacia el centro
        setTimeout(function() {
            $tarjeta.addClass('activa');
        }, 50);
        
        // 8. Ocultar la original (Truco anti-flash)
        setTimeout(function() {
            $tarjetaOriginal.addClass('oculta-temporal');
        }, 150);
        
    });

    /* =======================================================
       CERRAR Y ENCOGER DE VUELTA A LA TARJETA ORIGINAL
       ======================================================= */
    $('.cerrar-tarjeta, .modal-tarjeta-overlay').click(function(e) {
        
        // ¡NUEVO!: Frena el salto hacia arriba de la página
        e.preventDefault(); 
        
        // Evita que se cierre por accidente si haces clic en el texto
        if (e.target !== this && !$(this).hasClass('cerrar-tarjeta') && !$(this).parent().hasClass('cerrar-tarjeta')) return; 
        
        var $tarjeta = $('.tarjeta-expandida');
        $tarjeta.removeClass('activa');
        $('html, body').removeClass('no-scroll'); 
        
        setTimeout(function() {
            
            // Hacemos reaparecer la original
            $('.oculta-temporal').removeClass('oculta-temporal'); 
            
            // Desvanecemos el fondo
            $('#tarjeta-modal').fadeOut(200, function() {
                // Escondemos y limpiamos la tarjeta grande
                $tarjeta.hide(); 
                $tarjeta.removeAttr('style'); 
            });
            
        }, 400); 
    });

    $(window).on('resize orientationchange', function() {
        if ($('.tarjeta-expandida').hasClass('activa')) {
            $('.tarjeta-expandida').removeClass('activa');
            $('html, body').removeClass('no-scroll'); 
            
            // Mismo truco: revelamos la original antes de desvanecer
            $('.oculta-temporal').removeClass('oculta-temporal');
            
            $('#tarjeta-modal').fadeOut(200, function() {
                $('.tarjeta-expandida').hide().removeAttr('style');
            });
        }
    });

});

/* ========================================================
       BLOQUEO ABSOLUTO DE SCROLL (Anti-Safari / Anti-iOS)
       ======================================================== */
    window.addEventListener('wheel', function(e) {
        if ($('html').hasClass('no-scroll') || $('body').hasClass('no-scroll')) {
            e.preventDefault(); // Detiene la rueda del ratón
        }
    }, { passive: false }); // passive: false es obligatorio para que funcione el preventDefault

    window.addEventListener('touchmove', function(e) {
        if ($('html').hasClass('no-scroll') || $('body').hasClass('no-scroll')) {
            e.preventDefault(); // Detiene el deslizamiento del dedo en pantallas táctiles
        }
    }, { passive: false });