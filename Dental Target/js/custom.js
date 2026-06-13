
/* =======================================================
       CONTROLADOR DEL PRELOADER (1 SEGUNDO EXACTO)
       ======================================================= */
    $(window).on('load', function() {
        
        // Esperamos exactamente 1 segundo (1000ms)
        setTimeout(function() {
            // Comenzamos el desvanecimiento suave
            $('#preloader-dt').addClass('oculto');
            
            // Limpiamos el HTML medio segundo después para que no estorbe los clics
            setTimeout(function() {
                $('#preloader-dt').remove();
            }, 500); 
            
        }, 500); // <-- Aquí configuras el tiempo (1000 = 1 segundo)
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
            { src: 'images/slide-img1.jpg' }
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

    /* =======================================================
       LÓGICA DEL FORMULARIO Y WHATSAPP
       ======================================================= */
    
    // 1. Abrir y cerrar la caja del formulario
    $('#btn-abrir-form').click(function(e) {
        e.preventDefault();
        $('#modal-formulario').fadeIn(300);
        $('html, body').css('overflow', 'hidden'); // Congela el fondo
    });

    $('#cerrar-form, .modal-overlay-form').click(function(e) {
        if (e.target === this) {
            $('#modal-formulario').fadeOut(300);
            $('html, body').css('overflow', ''); // Libera el fondo
        }
    });

    // 2. Procesar el formulario cuando le dan a "Enviar"
    $('#form-comunidad').submit(function(e) {
        e.preventDefault(); // Evita que la página se recargue

        // Extraer los datos que escribió el usuario
        var nombre = $('#form-nombre').val();
        var correo = $('#form-correo').val();
        var telefono = $('#form-telefono').val();

        // 3. GENERAR FOLIO ÚNICO (Ejemplo: DT-8A4X)
        // Crea una cadena al azar, la corta a 4 letras/números y la hace mayúscula
        var codigoAlAzar = Math.random().toString(36).substr(2, 4).toUpperCase();
        var folio = 'DT-' + codigoAlAzar; 

        // 4. CONFIGURAR WHATSAPP
        // PON TU NÚMERO AQUÍ (Código de país + Número, sin el signo +)
        var tuNumeroWA = "5215555555555"; 

        // Armar el mensaje con saltos de línea (%0A)
        var mensaje = "👋 Hola, quiero unirme a la comunidad.%0A%0A";
        mensaje += "📝 *Mis datos son:*%0A";
        mensaje += "Nombre: " + nombre + "%0A";
        mensaje += "Correo: " + correo + "%0A";
        mensaje += "Teléfono: " + telefono + "%0A%0A";
        mensaje += "💳 *Mi referencia de pago es:* " + folio + "%0A%0A";
        mensaje += "¿Me proporcionas los datos para hacer mi depósito o transferencia?";

        // Abrir WhatsApp en una nueva pestaña
        var linkWhatsApp = "https://wa.me/" + tuNumeroWA + "?text=" + mensaje;
        window.open(linkWhatsApp, '_blank');

        // Cerrar el pop-up y limpiar las cajas de texto para el siguiente usuario
        $('#modal-formulario').fadeOut(300);
        $('html, body').css('overflow', '');
        this.reset();
    });