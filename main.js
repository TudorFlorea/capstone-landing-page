$(function() {
  var navContainer = $("#nav");
  var contactWrapper = $("#contact-wrapper");
  var burgerIcon = $(".burger");
  var dotsIcon = $(".dots");
  var navWrapper = $('#nav-wrapper');
  var navList = $('.nav--list');
  var navSearchIcon = $('#nav-search');
  var navSearchInput = $('#search-input');
  var navSearchLabel = $('#search-input-label');
  var scrollTop = $("#scoll-top");
  var isMobileMenuOpen = false;
  var isMobileContactOpen = false;
  var isDesktopSearchActive = false;

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
  
  navSearchIcon.on('click', function(e) {
    e.preventDefault();
    if(!isDesktopSearchActive) {
      isDesktopSearchActive = true;
      navSearchInput.css({
        'display': 'block'
      });
      navSearchInput.val('');
      navSearchLabel.css({
        'display': 'block'
      });
    } else {
      isDesktopSearchActive = false;
      navSearchInput.css({
        'display': 'none'
      });
      navSearchLabel.css({
        'display': 'none'
      });
    }
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

  scrollTop.click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  $(window).resize(function() {
    
    hideMobileMenu();
    if(!isMobileNav()) {
      removeDisplayNoneSubMenues();
    }
  
    if(window.innerWidth >= 1200) {
      $("#nav").css({
        left: 0,
        top: 140
      });
      $(contactWrapper).css({'display': 'block'});
    } else {
      hideContactMenu();
      $("#nav").css({top: 0});
    }
  });

  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();

    console.log(scroll);
    

    if (!isMobileNav()) {
      if(scroll >= 140) {

        navList.css({
          'boxShadow': 'none'
        });

        navWrapper.css({
          'backgroundColor': '#2A93C9',
          'boxShadow': '0 0 10px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
        });

        navContainer.css({
          'position': 'fixed',
          'top': -20,
        });
      } else {

        navList.css({
          'boxShadow': '0 0 10px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
        });

        navContainer.css({
          'position': 'absolute',
          'top': 140
        });

        navWrapper.css({
          'backgroundColor': 'transparent',
          'boxShadow': 'none'
        });
      }
    }

    if(scroll >= 400) {
      scrollTop.css({
        'display': 'block'
      });
    } else {
      scrollTop.css({
        'display': 'none'
      });
    }
});

  function hideContactMenu() {
    isMobileContactOpen = false;
    $(dotsIcon).removeClass('active');
    $(contactWrapper).css({
      'display': 'none'
    });
  }

  function showContactMenu() {
    if(isMobileMenuOpen) {
      hideMobileMenu();
    }
    isMobileContactOpen = true;
    $(dotsIcon).addClass('active');
    $(contactWrapper).css({
      'display': 'block',
    });;
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