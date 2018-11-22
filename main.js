$(function() {
  var navContainer = $("#nav");
  var contactWrapper = $("#contact-wrapper");
  var burgerIcon = $(".burger");
  var dotsIcon = $(".dots");
  var isMobileMenuOpen = false;
  var isMobileContactOpen = false;

  $(".nav--link").on("click", function(e) {
    if(isMobileNav()) {
      e.preventDefault();
      $(this).siblings(".nav--sub-nav").toggleClass('display-none');
    }
  });

  $('body').on('click', function() {
    if(isMobileNav()) {
      hideMobileMenu();
      hideContactMenu();
    }
    
  });

  $('#nav, header').on('click', function(e) {
    e.stopPropagation();
  });

  burgerIcon.on('click', function() {
    if(isMobileMenuOpen) {
      hideMobileMenu();
    } else {
      showMobileMenu();
    }
  });

  dotsIcon.on('click', function() {
    if(isMobileContactOpen) {
      hideContactMenu();
    } else {
      showContactMenu();
    }
  });

  $(window).resize(function() {
    
    hideMobileMenu();

    if(!isMobileNav()) {
      removeDisplayNoneSubMenues();
    }
  
    if(window.innerWidth >= 1200) {
      $("#nav").css({left: 0});
    }
  });

  function hideContactMenu() {
    isMobileContactOpen = false;
    $(dotsIcon).removeClass('active');
    $(contactWrapper).hide();
  }

  function showContactMenu() {
    if(isMobileMenuOpen) {
      hideMobileMenu();
    }
    isMobileContactOpen = true;
    $(dotsIcon).addClass('active');
    $(contactWrapper).show();
  }

  function hideMobileMenu() {
    isMobileMenuOpen = false;
      $(burgerIcon).removeClass('active');
      navContainer.css({left: -270});
  }

  function showMobileMenu() {
    if(isMobileContactOpen) {
      hideContactMenu();
    }
    $(burgerIcon).addClass('active');
    isMobileMenuOpen = true;
    navContainer.css({left: 0});
  }

  function removeDisplayNoneSubMenues() {
    $(".display-none").removeClass('display-none');
  }

  function isMobileNav() {
    return window.innerWidth < 1200;
  }

  removeDisplayNoneSubMenues();

});