$((function(){
     var swiper = new Swiper(".mySwiper", {
		  slidesPerView: 1,
		  spaceBetween: 30,
      loop: true,
		  pagination: {
			el: ".swiper-pagination",
			clickable: true,
		  },
		  navigation: {
			  nextEl: ".swiper-button-next",
			  prevEl: ".swiper-button-prev"
		  }
     });

     var fotoSlider = new Swiper(".fotoSwiper", {
		  slidesPerView: 'auto',
		  spaceBetween: 30,
      loop: true,
      centeredSlides: true,
		  navigation: {
			  nextEl: ".swiper-button-next",
			  prevEl: ".swiper-button-prev"
		  },
       breakpoints: {
          1169: {
            slidesPerView: 'auto',
            spaceBetween: 30
          }
        }
     });

      var ww = document.body.clientWidth;

      $(".menu__list li a").each(function() {
        if ($(this).next().length > 0) {
          $(this).addClass("parent");
        };
      })
      
      $(".hamburger").click(function(e) {
        e.preventDefault();
        $(this).toggleClass("active");
        $(".menu__list").toggle();
      });
      adjustMenu();

      $(window).bind('resize orientationchange', function() {
        ww = document.body.clientWidth;
        adjustMenu();
      });

      function adjustMenu() {
        if (ww < 1020) {
          $(".hamburger").css("display", "block");
          if (!$(".hamburger").hasClass("active")) {
            $(".menu__list").hide();
          } else {
            $(".menu__list").show();
          }
          $(".menu__list li").unbind('mouseenter mouseleave');
          $(".menu__list li a.parent").unbind('click').bind('click', function(e) {
            // must be attached to anchor element to prevent bubbling
            e.preventDefault();
            $(this).parent("li").toggleClass("hover");
          });
        } 
        else if (ww >= 1020) {
          $(".hamburger").css("display", "none");
          $(".menu__list").show();
          $(".menu__list li").removeClass("hover");
          $(".menu__list li a").unbind('click');
          $(".menu__list li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
            // must be attached to li so that mouseleave is not triggered when hover over submenu
            $(this).toggleClass('hover');
          });
        }
      }

      $(".btn").click(function() {
        $(".container").addClass("blur");
      });

      $(".modal-close").click(function() {
        $(".container").removeClass("blur");
      });

 
      $('.btn-submit').click(function(){
        var datastring=$("#contacts__form").serialize();
        $.ajax({
            type:"POST",
            url:"https://httpbin.org/post",
            data:datastring,
            dataType:"json",
            success:function(data){
              var obj=JSON.stringify(data);
              console.log(obj);
              $(".container").removeClass("blur");
            },
            error:function(){
              console.log('Error');
              $(".container").removeClass("blur");
            }
        });
        });

}));