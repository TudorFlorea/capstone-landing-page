$(function() {

  //Cache elements
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
  var isGDPROverlayShown = true;
  var hideGDPROverlayCounter = 8;
  var gdprCountdown = setInterval(decrementGDPRCounter, 1000);



  //All event listeners
  function registerEventListeners() {

    //Toggle submenu on menu item click
    $(".nav--link").on("click", function(e) {
      if(isMobileNav()) {
        e.preventDefault();
        $(this).siblings(".nav--sub-nav").toggleClass('display-none');
      }
    });
  
    //Hide the mobile menu on body click
    $('body').on('click', function() {
      if(isMobileNav()) {
        hideMobileMenu();
        hideContactMenu();
      }

      hideGdprModal();
      
    });


  
    //Stop event bubbling to body click so that the menu will not hide if the click is on the menu or the header
    $('#nav, header').on('click', function(e) {
      e.stopPropagation();
    });
    
    //Display the searchbar in search icon click
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
  
    //Toggle the mobile menu on burger click
    burgerIcon.on('click', function(e) {
      e.preventDefault();
      if(isMobileMenuOpen) {
        hideMobileMenu();
      } else {
        showMobileMenu();
        hideSubMenues();
      }
    });
  
    //Toggle the mobile contact on dots click
    dotsIcon.on('click', function() {
      if(isMobileContactOpen) {
        hideContactMenu();
      } else {
        showContactMenu();
      }
    });

    //close the gdpr modal
    $('#gdpr-close, #gdpr-ok').on('click', function() {
      hideGdprModal();
    });

    $('#gdpr-modal').on('click', function(e) {
      e.stopPropagation();
    });
  
    //Scroll to the top of the page on scroll
    scrollTop.click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
  
    //Hide the mobile menu and calculate the position of the desktopmenu on window resize
    $(window).resize(function() {

      hideMobileMenu();
      if(!isMobileNav()) {
        removeDisplayNoneSubMenues();
      }

      positionNavOnResize();

      positionDesktopNav();

    });
  
    //Position the desktop navigation and the scrollToTop button on scroll
    $(window).scroll(function (event) {
  
      if(isGDPROverlayShown) {
        window.scrollTo(0, 0);
      }
      positionDesktopNav();
  
      toggleScrollTopButton();
  
    });
  }

  //get the current scroll offset
  function getScrollTop() {
    return $(window).scrollTop();
  }

  //calculate the desktop nav position if the window has been resized
  function positionNavOnResize() {
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
  }


  //position the desktop navbar according to the scroll position
  function positionDesktopNav() {

    var scroll = getScrollTop();

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
    } else {
      navList.css({
        'boxShadow': 'none',
      });
      navWrapper.css({
        'backgroundColor': 'transparent',
        'boxShadow': 'none'
      });
      navContainer.css({
        'position': 'fixed',
        'bottom': 0
      });
    }
  }


  //show or hide the scroll button according to the scroll position
  function toggleScrollTopButton() {
    if(getScrollTop() >= 400) {
      scrollTop.css({
        'display': 'block'
      });
    } else {
      scrollTop.css({
        'display': 'none'
      });
    }
  }

  //hides submenues
  function hideSubMenues() {
    $(".nav--link").siblings(".nav--sub-nav").addClass('display-none');
  }

  //hides the gdpr modal
  function hideGdprModal() {
    $("#gdpr-modal-overlay").css({
      'display': 'none'
    });
    isGDPROverlayShown = false;
  }

  //hides the contact menu
  function hideContactMenu() {
    isMobileContactOpen = false;
    $(dotsIcon).removeClass('active');
    $(contactWrapper).css({
      'display': 'none'
    });
  }

  //shows the contact menu
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

  //hides the mobile menu by changing the left position
  function hideMobileMenu() {
    isMobileMenuOpen = false;
      $(burgerIcon).removeClass('active');
      navContainer.css({left: -270});
  }

  //shows the mobile menu by changing the left position
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

  //checks to see if the mobile navigation should be shown
  function isMobileNav() {
    return window.innerWidth < 1200;
  }

  function decrementGDPRCounter() {
    hideGDPROverlayCounter--;
    console.log(hideGDPROverlayCounter);
    $('#gdpr-timer-value').text(hideGDPROverlayCounter);
    if(hideGDPROverlayCounter == 0) {
      clearInterval(gdprCountdown);
      hideGdprModal();
    }
  }

  registerEventListeners();
  removeDisplayNoneSubMenues();
});