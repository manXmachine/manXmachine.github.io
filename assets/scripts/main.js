(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': { 
      init: function() {
        // <!--- PUT STUFF IN THIS FUNCTION !!! JavaScript to be fired on all pages
  

        /* ----------------------------------------------------
          Notifications banner placement */
        function notifications_banner() {
          if($("#notifications-banner").length > 0) {
            if($("#notifications-banner").hasClass('fixed-bottom')) {
              $('body').css('padding-bottom', $("#notifications-banner").outerHeight());
            }
            else {
              $('body').css('padding-top', $("#notifications-banner").outerHeight());
            }
          }
        }
        $(window).resize(function() { notifications_banner(); }); // onresize
        $(window).load(function(){ notifications_banner(); }); // onload     
        /* End notifications banner 
           ----------------------------------------------------*/
        
        $(window).on("load", function (e) {
          $('a[href^="#"]:not([role="tab"]').on('click',function (e) {
              e.preventDefault();

              var target = this.hash;
              var $target = $(target);

              if($target.length>0) {

                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top - 120
                }, 900, 'swing', function () {
                    window.location.hash = target;
                });
              }
          });

        }); 

        // Menu
        var $navbar_toggler = $('#navbar-toggler'); 

        $('.offcanvas-collapse').css('top', $('#header').height());

        if($('body').hasClass('logged-in')) {
          $('.offcanvas-collapse').css('top', $('#header').height() + $('#wpadminbar').height());
        }


        $('[data-toggle="offcanvas"]').on('click tap press', function (e) {
          $('.offcanvas-collapse').toggleClass('open');
          //$('#header').toggleClass('position-fixed');
          $navbar_toggler.toggleClass('collapsed');
        });


        $('.matchHeight').matchHeight();

        // ScrollReveal
        // window.sr = new ScrollReveal();
        // sr.reveal('.reveal');
        // // Reveal in a ripple efffect
        // sr.reveal('.my-class', { duration: 800 }, 70);



      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
        
        // Stick the footer to the bottom of the screen if the content isn't tall enough
        function stickyFooter() {
          var $footer = $('#footer');
          if($footer.length<=0) {
            return;
          }

          $footer.removeClass('fixed-bottom');

          if(window.innerHeight > ($footer.height() + $footer.offset().top)) {
            $footer.addClass('fixed-bottom');
          }
          else {
            $footer.removeClass('fixed-bottom');
          }
        }       

        $( window ).resize(function() {
          stickyFooter();
        });

        // If window height is MORE than (footer height + footer top position) THEN make footer 'sticky' 
        stickyFooter();



        // Ajax Event Filtering
        var $filters = $('.filter [data-filter]'),
            $boxes = $('.insights-all [data-category]');

        $filters.on('click', function(e) {
          e.preventDefault();
          var $this = $(this);
          $filters.removeClass('active');
          $this.addClass('active');

          var $filterColor = $this.attr('data-filter');

          if ($filterColor == 'all') {
            $boxes.removeClass('is-animated')
              .fadeOut().promise().done(function() {
                $boxes.addClass('is-animated').fadeIn();
              });
          } else {
            $boxes.removeClass('is-animated')
              .fadeOut().promise().done(function() {
                $boxes.filter('[data-category = "' + $filterColor + '"]')
                  .addClass('is-animated').fadeIn();
              });
          }
        });

        /*
         * Replace all SVG images with inline SVG
         */
        $('img.svg').each(function(){
            var $img     = jQuery(this);
            var imgID    = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL   = $img.attr('src');

            $.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
                }

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });

      }
    },
    // // Home page
    'home': {
      init: function() {
      }
    }

  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
