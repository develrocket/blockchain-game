jQuery(window).load(function() {
	prettyPhoto();
	initIsotopeGrid();
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
	preload();
});	
var rtime;
var timeout = false;
var delta = 200;
jQuery(window).resize(function() {
	rtime = new Date();
	if (timeout === false) {
		timeout = true;
		setTimeout(resizeend, delta);
	}
});
jQuery(document).ready(function($) {
	mMenu();
	sticky();
	navMenu();
	fullscreen();
	toggleDropdown();
	numberCounter();
	countDown();
	bgImage();
	colEqheight();
	parallaxBg();
	dataAnimations();
	bootstrapForm();
	subscribeForm();
	careerForm();
	backgroundVideo();
	progressBar();
	allCharts();
	toggleIcon();
	headerHeight();
	owlSlider();
	stickyAft();
	loadMore();
	infiniteLoad();
});
function resizeend() {
	if (new Date() - rtime < delta) {
		setTimeout(resizeend, delta);
	} else {
		timeout = false;
		mMenu();
		initIsotopeGrid();
		colEqheight();
	} 
}

/* -------------------------------	
		PRE LOADER
/* ----------------------------- */
if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}

/* -------------------------------	
		PRE LOADER
/* ----------------------------- */
function preload(){
	$(".loader-inner").delay(200).fadeOut();
	$("#pageloader").delay(200).fadeOut("slow")
}
/* -------------------------------	
		MMENU
/* ----------------------------- */
function mMenu() {
	if ($('#nav-menu').length) {	
		$("#nav-menu").mmenu({
			searchfield : true,
			counters : true
			/* RTL */
			/*  "offCanvas": {
				"position": "right"
			 }  */
		}, 
		{
		   // configuration
		   clone: true
		});	
	}	
}
/* -------------------------------	
		STICKY
/* ----------------------------- */
function sticky() {
	if ($('#sticker-default').length) {
		$("#sticker-default").sticky({
			topSpacing:0
		});
	 }
}
/* -------------------------------	
		STICKY AFTER SECTION - WAYPOINT
/* ----------------------------- */
function stickyAft() {
	/* WAYPOINT */
	if ($('.sticky-navigation').length) {	
		var menu = $('#sticker');
		$(window).scroll(function () {
			var y = $(this).scrollTop();
			var z = $('.content-wrapper').offset().top + 80;
			if (y >= z) {
				menu.removeClass('not-visible-nav').addClass('visible-nav');
				$('#sticker').addClass('is-sticky');
			}
			else{
				menu.removeClass('visible-nav').addClass('not-visible-nav');
				 $('#sticker').removeClass('is-sticky');
			}
		});
	}
}

/* -------------------------------	
		TOGGLE DROPDOWN
/* ----------------------------- */
function toggleDropdown() {
	$('.hover-dropdown .dropdown-toggle').on('click', function(event) {
		window.location.href = link.attr("href");
	});
	$('.dropdown-toggle').on('click', function(event) {
		event.preventDefault(); 
		event.stopPropagation(); 
		$(this).parent().siblings().removeClass('open');
		$(this).parent().toggleClass('open');
	});
}
/* --------------------------------------------
		SCROLL NAVIGATION
-------------------------------------------- */	
function navMenu(){	 
	if ($('#sticker').length) {
		jQuery('.scroll a').bind('click', function(event) {
			var $anchor = jQuery(this);
			var headerH = jQuery('#sticker').innerHeight();
				jQuery('html, body').stop().animate({					
					scrollTop : jQuery($anchor.attr('href')).offset().top  - headerH + "px"
				}, 1200, 'easeInOutExpo');
			event.preventDefault();
		});
		/* Active When Scroll */
		jQuery('body').scrollspy({ 
			target: '#nav-menu',
			offset: 95
		})
		/* Responsive Auto Close */
		$('.one-page .nav li a').click(function () {
			 $('.navbar-collapse').removeClass('in');
		});
		
	}
	if ($('.page-scroll').length) {
	/* Smooth Scroll Links */
		jQuery('.page-scroll a').bind('click', function(event) {
			var $anchor = jQuery(this);
			var headerH = jQuery('#sticker').innerHeight();
				jQuery('html, body').stop().animate({					
					scrollTop : jQuery($anchor.attr('href')).offset().top  - 80 + "px"
				}, 1200, 'easeInOutExpo');
			event.preventDefault();
		});
	}
}
/* -------------------------------	
		LOAD MORE ITEM 
/* ----------------------------- */
function loadMore() {
	$(".load-posts").click(function() {
		var loadtext = $('.load-more');
		if($(this).hasClass('disable')) return false;
		
			$(this).html('<i class="fa fa-spin fa-spinner"></i> Loading');
			
			var $hidden = loadtext.filter(':hidden:first').delay(600);  
   
		   	if (!$hidden.next('.load-more').length) {
			   $hidden.fadeIn(500);
				$(this).addClass('disable');
				$(this).fadeTo("slow", 0.23)/*.delay(600)*/
				.queue(function(n) {
				 $(this).html('All Posts Loaded');
				 n();
				}).fadeTo("slow", 1);
			
		   	} else {
				$hidden.fadeIn(500);
				$(this).fadeTo("slow", 0.23)/*.delay(600)*/
				.queue(function(g) {
				 $(this).html('Load More Post <i class="flaticon-arrow209">');
				 g();
				}).fadeTo("slow", 1);			
		   	}
	});
}
/* -------------------------------	
		INFINITE LOOP
/* ----------------------------- */	
function infiniteLoad() {
	if ($('.infinite-post').length) {
		 $(window).scroll(function() {
			var loadtext = $('.load-more');
			if($(this).hasClass('disable')) return false;
			
				$(this).html('<i class="fa fa-spin fa-spinner"></i> Loading');
				
				var $hidden = loadtext.filter(':hidden:first').delay(1200);  
	   
				if (!$hidden.next('.load-more').length) {
				   $hidden.fadeIn(500);
					$(this).addClass('disable');
					$(this).fadeTo("slow", 0.23).delay(600)
					.queue(function(n) {
					 $(this).html('All Posts Loaded');
					 n();
					}).fadeTo("slow", 1);
				
				} else {
					$hidden.fadeIn(500);
					$(this).fadeTo("slow", 0.23).delay(600)
					.queue(function(g) {
					 $(this).html('Load More Post <i class="flaticon-arrow209">');
					 g();
					}).fadeTo("slow", 1);			
				}
		});
	}
}
/* -------------------------------	
		FULL SCREEN
/* ----------------------------- */
function fullscreen() {
	"use strict";
	if ($(window).width() > 1025) {
		$('.full-screen').css({ 'height': $(window).height() });
			$(window).on('resize', function() {
			$('.full-screen').css({ 'height': $(window).height() });
		});
	}
	
}
/* -------------------------------	
		BACKGROUND IMAGE
/* ----------------------------- */
function bgImage(){		
	var pageSection = $('[data-background]');
	pageSection.each(function(indx){
		if ($(this).attr("data-background")){
			$(this).css("background-image", "url(" + $(this).data("background") + ")");
		}
	});
	$('[data-bgcolor]').css('background', function () {
		return $(this).data('bgcolor')
	});
}
/* ---------------------	
	     PARALLAX BACKGROUND
/* --------------------- */
function parallaxBg(){		
	if($('.parallax-bg').length != 0 && !navigator.userAgent.match(/iPad|iPhone|Android/i)){	
			$.stellar({
				horizontalScrolling: false,
				verticalScrolling: true,
				verticalOffset: 0,
				horizontalOffset: 0,
				responsive: true,
				scrollProperty: 'scroll',
				parallaxElements: false,
		  });
		}
}
function toggleIcon() {
	$(document).on( 'click', '#header-top-bar .search-icon', function( e ) {	
		e.preventDefault();																  	
		$("#header-top-bar .toggle-search").toggleClass("show-form");
		$("#header-top-bar .search-icon span").toggleClass("fa-times");
		$("#search-form").focus();
	});
	$(document).on( 'click', '.header-main .search-icon', function( e ) {	
		e.preventDefault();													   
		$(".header-main .toggle-search").toggleClass("show-form");
		$(".header-main .search-icon span").toggleClass("fa-times");
	});
	$(document).on( 'click', '.navbar-toggle', function( e ) {
		e.preventDefault();													
		$(this).toggleClass('toggle-close');
	});
	$(document).on( 'click', '#menu-toggle,.close-toggle', function( e ) {
		e.preventDefault();												  	
		$("#page-wrapper").toggleClass("toggled");
		$("body").toggleClass("side_container_opened");
	});
	$(document).on( 'click', '.mm-slideout', function( e ) {
	   if( $('html.mm-opened').length && $('.rev_slider_wrapper').length ){
		$('.rev_slider_wrapper').animate({left: "0"}, 300);
	   }
	  });
	/* TOGGLE EXTRA NAV */
	$(document).on( 'click', '.header-toggle-icon', function( e ) {
		e.preventDefault();													
		var id = $(this).attr( "id" );
		var res = id.split("-"); 
		var id1='#extra-'+res[1]+'-'+res[0];
		$(id1).toggleClass("toggled");
		$("#search-form").focus();
		$("body").toggleClass("extra-toggle");
	});
	/*CLOSE*/
	$(document).on( 'click', '#extra-nav .toggle-close', function( e ) {
		e.preventDefault();											   
		var id = $(this).attr( "id" );
		var res = id.replace("close-",''); 
		var id1='#extra-'+res;
		$(id1).toggleClass("toggled");
		 $('body').removeClass('extra-toggle');
	});
}
/* ------------------------------------------	
		HEADER HEIGHT ON DATA-ATTRIBUTES
/* ----------------------------------------- */
function headerHeight() {
	var hdr = $("header").attr('data-height');
	$(".header-main .navbar-brand ,.header-main .navbar-nav > li > a,.header-main .navbar-nav > li .extra-menu-item,.header-toggle-content,.header-main .navbar-toggle ").css({'line-height': hdr, 'height': hdr});
}
/* -------------------------------	
		TOGGLE MENU ICONS
/* ----------------------------- */
var iScrollPos = 0;
 $(window).scroll(function () {
     var iCurScrollPos = $(this).scrollTop();
     if (iCurScrollPos > iScrollPos) {
         if($("#sticker-sticky-wrapper").hasClass("is-sticky")){
			var shdr = $("header").attr('data-sheight');
			$(".is-sticky .navbar-brand ,.is-sticky .navbar-nav > li > a,.is-sticky .navbar-nav > li .extra-menu-item,.is-sticky .header-toggle-content,.is-sticky .header-main .navbar-toggle").css({'line-height': shdr, 'height': shdr});
		}
     } else {
        var hdr = $("header").attr('data-height');
		$(".header-main .navbar-brand ,.header-main .navbar-nav > li > a,.header-main .navbar-nav > li .extra-menu-item,.header-toggle-content,.header-main .navbar-toggle ").css({'line-height': hdr, 'height': hdr});
     }
     iScrollPos = iCurScrollPos;
 });
 /* ---------------------	
	     PRETTYPHOTO LIGHTBOX
/* --------------------- */
 function prettyPhoto() {
	"use strict";
	if( $("a[rel^='prettyPhoto'], a[data-rel^='prettyPhoto']").length != 0 ) { 
	 $("a[rel^='prettyPhoto'], a[data-rel^='prettyPhoto']").prettyPhoto({hook: 'data-rel', social_tools: false, deeplinking: false});
	}
 }
 /* ---------------------	
	    PROGRESS BAR
/* --------------------- */
function progressBar() {		
	if ($('.progress-bar').length) {
		$('.progress-bar').each(function() {
			$(this).appear(function(){
			 var datavl = $(this).attr('data-percentage');
			 $(this).animate({ "width" : datavl + "%"}, '1200');
			 $(this).find('span').fadeIn(4000);
			 $(this).css('background', $(this).attr('data-bg'));
			})
		});
		$('.progress').each(function() {
			var dathgt = $(this).attr('data-height');
			$(this).css({'line-height': dathgt + "px", 'height': dathgt});
		});
	}
}
/* ---------------------	
		Animation
/* --------------------- */	
function dataAnimations() {
  $('[data-animation]').each(function() {
		var element = $(this);
		element.addClass('animated');
		element.appear(function() {
			var delay = ( element.data('delay') ? element.data('delay') : 1 );
			if( delay > 1 ) element.css('animation-delay', delay + 'ms');				
			element.addClass( element.data('animation') );
			setTimeout(function() {
				element.addClass('visible');
			}, delay);
		});
  });
}
 /* -------------------------------	
		COLUMN MATCH HEIGHT
/* ----------------------------- */
function equalHeight(group) {
	var tallest = 0;
	group.each(function() {
		$(this).css("height", "");
		var thisHeight = $(this).outerHeight();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	group.css("height", tallest);
}
function colEqheight() {
	equalHeight($(".row > .col-eq-height"));
} 
 /* -------------------------------	
		NUMBER COUNTER
/* ----------------------------- */	
function numberCounter(){	
	(function($){
		if ($('.number-counter').length) {
			$(".number-counter").appear(function(){
				$(this).each(function(){
					datacount = $(this).attr('data-count');
					$(this).find('.counter').delay(6000).countTo({
						from: 10,
						to: datacount,
						speed: 3000,
						refreshInterval: 50,
					});
				});
			});
		}	
	})(jQuery);
}
 /* -------------------------------	
		NUMBER COUNTER
/* ----------------------------- */	
function countDown(){	
$('.daycounter').each(function(){
	   var counter_id = $(this).attr('id');
	   var counter_type = $(this).data('counter');
	   var year = $(this).data('year');
	   var month = $(this).data('month');
	   var date = $(this).data('date');
	   var countDay = new Date();
	   countDay = new Date(year, month - 1, date);
	   if( counter_type == "down" ) {
		$("#"+counter_id).countdown({
		 labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Mins', 'Secs'],
		 labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Min', 'Sec'],
		 until: countDay
		});
	   } else if( counter_type == "up" ) {
		$("#"+counter_id).countdown({
		 labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Mins', 'Secs'],
		 labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Min', 'Sec'],
		 since: countDay
		});
	   }
	  });
}
 /* -------------------------------	
		OWL SLIDER
/* ----------------------------- */
 function owlSlider() {
	(function($) {
		"use strict";
		if ($('.owl-carousel').length) {		    
			  $(".owl-carousel").each(function (index) {
				var autoplay = $(this).data('autoplay');
				var timeout = $(this).data('delay');
				var slidemargin = $(this).data('margin');
				var slidepadding = $(this).data('stagepadding');
				var items = $(this).data('items');
				var animationin = $(this).data('animatein');
				var animationout = $(this).data('animateout');
				var itemheight = $(this).data('autoheight');
				var itemwidth = $(this).data('autowidth');
				var itemmerge = $(this).data('merge');
				var navigation = $(this).data('nav');
				var pagination = $(this).data('dots');
				var infinateloop = $(this).data('loop');
				var itemsdesktop = $(this).data('desktop');
				var itemsdesktopsmall = $(this).data('desktopsmall');
				var itemstablet = $(this).data('tablet');
				var itemsmobile = $(this).data('mobile');
				$(this).on('initialized.owl.carousel changed.owl.carousel',function(property){
					var current = property.item.index;
					$(property.target).find(".owl-item").eq(current).find(".animated").each(function(){
						var elem = $(this);
						var animation = elem.data('animate');
						if ( elem.hasClass('visible') ) {
							elem.removeClass( animation + ' visible');
						}
						if ( !elem.hasClass('visible') ) {
							var animationDelay = elem.data('animation-delay');
							if ( animationDelay ) {			
								setTimeout(function(){
								 elem.addClass( animation + " visible" );
								}, animationDelay);				
							} else {
								elem.addClass( animation + " visible" );
							}
						}
					});					
				}).owlCarousel({ 
					/* rtl:true,-- FOR RTL */ 
					autoplay: autoplay,
					autoplayTimeout:timeout,
					items : items,
					margin:slidemargin,
					autoHeight:itemheight,
					animateIn: animationin,
					animateOut: animationout,
					autoWidth:itemwidth,
					stagePadding:slidepadding,
					merge:itemmerge,
					nav:navigation,
					dots:pagination,
					loop:infinateloop,
					responsive:{
						479:{
							items:itemsmobile,
						},
						768:{
							items:itemstablet,
						},
						980:{
							items:itemsdesktopsmall,
						},
						1199:{
							items:itemsdesktop,
						}
					}
				});
			});
		}  
	})(jQuery);
}
/* ---------------------	
		Background Video 
/* --------------------- */
function backgroundVideo(){
	if (typeof $.fn.mb_YTPlayer != 'undefined' && $.isFunction($.fn
		.mb_YTPlayer)) {
		var m = false;
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
			navigator.userAgent)) {
			m = true
		}
		var v = $('.player');
		if (m == false) {
			v.mb_YTPlayer();
			$('#video-controls a')
				.each(function() {
					var t = $(this);
					t.on('click', (function(e) {
						e.preventDefault();
						if (t.hasClass(
							'fa-volume-off')) {
							t.removeClass(
									'fa-volume-off'
								)
								.addClass(
									'fa-volume-down'
								);
							v.unmuteYTPVolume();
							return false
						}
						if (t.hasClass(
							'fa-volume-down')) {
							t.removeClass(
									'fa-volume-down'
								)
								.addClass(
									'fa-volume-off'
								);
							v.muteYTPVolume();
							return false
						}
						if (t.hasClass('fa-pause')) {
							t.removeClass(
									'fa-pause')
								.addClass('fa-play');
							v.pauseYTP();
							return false
						}
						if (t.hasClass('fa-play')) {
							t.removeClass('fa-play')
								.addClass(
									'fa-pause');
							v.playYTP();
							return false
						}
					}));
				});
			$('#video-controls')
				.show();
		}
	}
}
 /* -------------------------------	
		ISOTOPE GRID
/* ----------------------------- */
function initIsotopeGrid() {
  $('.isotope-grid').each(function(){  
	   var $port_container = $(this);  
		$containerProxy = $port_container;
		var filter_selector = $port_container.parent().find('.isotope-filters a.active').data('filter');  
		var gutterSize = $port_container.data('gutter');  
		var columns = $port_container.data('columns');
		 
		if ($(window).width() >= 1024) {
			$port_container.imagesLoaded(function(){
				if( columns == 2 ) {
					var masonryGutter = gutterSize / columns;					
				} else if( columns == 3 ) {
					var colValue = gutterSize / 2;
					var masonryGutter = colValue + ( colValue / 3 );					
				} else if( columns == 4 ) {
					var colValue = gutterSize / 2;
					var masonryGutter = colValue + ( colValue / 2 );					
				}
				else if( columns == 5 ) {
					var colValue = gutterSize / 2;
					var masonryGutter = colValue + ( colValue / 2 );					
				}
				else if( columns == 6 ) {
					var colValue = gutterSize / 2;
					var masonryGutter = colValue + ( colValue / 2 );					
				}
				
				// calculate columnWidth
				var colWidth = Math.floor( $containerProxy.width() / columns );
				var masonryWidth = Math.floor( colWidth - masonryGutter );
				
				$port_container.find('.item').css('width', masonryWidth);
				$port_container.find('.item').css('margin-bottom', gutterSize);
		
				$port_container.isotope({
					resizable: false,
					filter: filter_selector,
					animationEngine: "css",
					masonry: {
						columnWidth: masonryWidth,
						gutter: gutterSize
					},
				});
				
				jQuery( window ).bind( 'load resize', function() {
					var colWidth = Math.floor( $containerProxy.width() / columns );
					var masonryWidth = Math.floor( colWidth - masonryGutter );
					$port_container.find('.item').css('width', masonryWidth);
					
					$port_container.isotope({
						masonry: {
							columnWidth: masonryWidth,
							gutter: gutterSize
						},
					});
				});
			});					
		}
		if ($(window).width() >= 992 && $(window).width() < 1024) {
			$port_container.imagesLoaded(function(){
				if( columns == 4 ) {
					columns = 3;
				}
				
				if( columns == 2 ) {
					var masonryGutter = gutterSize / columns;					
				} else if( columns == 3 || columns == 4 ) {
					var colValue = gutterSize / 2;
					var masonryGutter = colValue + ( colValue / 3 );					
				}
				
				// calculate columnWidth
				var colWidth = Math.floor( $containerProxy.width() / columns );
				var masonryWidth = Math.floor( colWidth - masonryGutter );
				
				$port_container.find('.item').css('width', masonryWidth);
				$port_container.find('.item').css('margin-bottom', gutterSize);
		
				$port_container.isotope({
					resizable: false,
					filter: filter_selector,
					animationEngine: "css",
					masonry: {
						columnWidth: masonryWidth,
						gutter: gutterSize
					},
				});
				
				jQuery( window ).bind( 'load resize', function() {
					var colWidth = Math.floor( $containerProxy.width() / columns );
					var masonryWidth = Math.floor( colWidth - masonryGutter );
					$port_container.find('.item').css('width', masonryWidth);
					
					$port_container.isotope({
						masonry: {
							columnWidth: masonryWidth,
							gutter: gutterSize
						},
					});
				});
			});	
		}
		if ($(window).width() >= 600 && $(window).width() < 991) {
			$port_container.imagesLoaded(function(){
				if( columns == 3 || columns == 4 ) {
					columns = 2;
				}
				
				if( columns == 2 ) {
					var masonryGutter = gutterSize / columns;					
				}
				
				// calculate columnWidth
				var colWidth = Math.floor( $containerProxy.width() / columns );
				var masonryWidth = Math.floor( colWidth - masonryGutter );
				
				$port_container.find('.item').css('width', masonryWidth);
				$port_container.find('.item').css('margin-bottom', gutterSize);
		
				$port_container.isotope({
					resizable: false,
					filter: filter_selector,
					animationEngine: "css",
					masonry: {
						columnWidth: masonryWidth,
						gutter: gutterSize
					},
				});
				
				jQuery( window ).bind( 'load resize', function() {
					var colWidth = Math.floor( $containerProxy.width() / columns );
					var masonryWidth = Math.floor( colWidth - masonryGutter );
					$port_container.find('.item').css('width', masonryWidth);
					
					$port_container.isotope({
						masonry: {
							columnWidth: masonryWidth,
							gutter: gutterSize
						},
					});
				});
			});
		}
		if ($(window).width() < 600) {
			$port_container.imagesLoaded(function(){
				var gutterSize = Math.floor( $port_container.closest('.isotope-grid').attr('data-gutter') );
				$port_container.find('.item').css('width', '100%');
				$port_container.find('.item').css('margin-bottom', gutterSize);
				
				var selector = $port_container.parent().find('.isotope-filters a.active').data('filter');
				
				$port_container.isotope({
					resizable: false,
					filter: filter_selector,
				 	animationEngine: "css",
					masonry: {
						columnWidth: '.item',
						gutter: 0
					},
				});
				
				jQuery( window ).bind( 'load resize', function() {
					$port_container.isotope( "layout" );
				});
			});
		}
  
		// ISOTOPE FILTER
		$('.isotope-filters a').click(function(){
		
			$(this).parent().parent().find('a.active').removeClass('active');    
			$(this).addClass('active');
			var selector = $(this).parent().parent().find('a.active').attr('data-filter');  
			$(this).parents().find('.isotope-grid').isotope({ filter: selector, animationEngine : "css" });
		
			return false; 
		});
		
	}); 
}
/* ---------------------	
	     ALL CHARTS
/* --------------------- */
function allCharts() {
		
	jQuery(window).load( function(){
		var lineChartData = {
			labels : ["January","February","March","April","May","June","July"],
			datasets : [
				{
					fillColor : "rgba(220,220,220,.5)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "#1ABC9C",
					pointStrokeColor : "#fff",
					data : [10,20,40,70,100,90,40]
				},
				{
					fillColor : "rgba(52, 73, 94,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : [70,30,60,40,50,30,60]
				},
				{
					fillColor : "rgba(26, 188, 156,0.5)",
					strokeColor : "#1ABC9C",
					pointColor : "#fff",
					pointStrokeColor : "#333",
					data : [10,40,100,70,30,80,50]
				}
			]
		};
		
		var barChartData = {
			labels : ["January","February","March","April","May","June","July"],
			datasets : [
				{
					fillColor : "rgba(26, 188, 156,0.5)",
					strokeColor : "#1ABC9C",
					data : [50,70,90,60,70,40,50]
				},
				{
					fillColor : "rgba(52, 73, 94,0.5)",
					strokeColor : "#1ABC9C",
					data : [10,40,100,70,30,80,50]
				}
			]
		};
		var radarChartData = {
			labels : ["Html5","Css3","Jquery","Wordpress","Joomla","Drupal","Design"],
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					data : [65,59,90,81,56,55,40]
				},
				{
					fillColor : "rgba(26, 188, 156,0.5)",
					strokeColor : "#1ABC9C",
					pointColor : "#1ABC9C",
					pointStrokeColor : "#fff",
					data : [28,48,40,19,96,27,100]
				}
			]
		};
		var pieChartData = [
			{
				value: 90,
				color:"#1ABC9C"
			},
			{
				value : 30,
				color : "#333"
			},
			{
				value : 60,
				color : "#E74C3C"
			},
			{
				value : 100,
				color : "#E67E22"
			},
			{
				value : 20,
				color : "#16B6EA"
			}
		];
		var polarAreaChartData = [
			{
				value : 60,
				color: "#1ABC9C"
			},
			{
				value : 70,
				color: "#f5f5f5"
			},
			{
				value : 60,
				color: "#E74C3C"
			},
			{
				value : 30,
				color: "#E67E22"
			},
			{
				value : 50,
				color: "#16B6EA"
			},
			{
				value : 20,
				color: "#333"
			}
		];
		var doughnutChartData = [
			{
				value: 30,
				color:"#1ABC9C"
			},
			{
				value : 50,
				color : "#f5f5f5"
			},
			{
				value : 100,
				color : "#E74C3C"
			},
			{
				value : 40,
				color : "#E67E22"
			},
			{
				value : 120,
				color : "#16B6EA"
			}
		];
		function showLineChart(){
			var ctx = document.getElementById("lineChartmist").getContext("2d");
			 new Chart(ctx).Line(lineChartData, {	responsive: true	});
		}
		function showBarChart(){
			var ctx = document.getElementById("barChartmist").getContext("2d");
			new Chart(ctx).Bar(barChartData, {	responsive: true	});
		}
		function showRadarChart(){
			var ctx = document.getElementById("radarChartmist").getContext("2d");
			new Chart(ctx).Radar(radarChartData, {	responsive: true	});
		}
		function showPolarAreaChart(){
			var ctx = document.getElementById("polarAreaChartmist").getContext("2d");
			new Chart(ctx).PolarArea(polarAreaChartData, {	responsive: true	});
		}
		function showPieChart(){
			var ctx = document.getElementById("pieChartmist").getContext("2d");
			new Chart(ctx).Pie(pieChartData,{	responsive: true	});
		}
		function showDoughnutChart(){
			var ctx = document.getElementById("doughnutChartmist").getContext("2d");
			new Chart(ctx).Doughnut(doughnutChartData,{	responsive: true	});
		}
		$('#lineChart').appear( function(){ $(this).css({ opacity: 1 }); setTimeout(showLineChart,300); },{accX: 0, accY: -155},'easeInCubic');
		$('#barChart').appear( function(){ $(this).css({ opacity: 1 }); setTimeout(showBarChart,300); },{accX: 0, accY: -155},'easeInCubic');
		$('#radarChart').appear( function(){ $(this).css({ opacity: 1 }); setTimeout(showRadarChart,300); },{accX: 0, accY: -155},'easeInCubic');
		$('#polarAreaChart').appear( function(){ $(this).css({ opacity: 1 }); setTimeout(showPolarAreaChart,300); },{accX: 0, accY: -155},'easeInCubic');
		$('#pieChart').appear( function(){ $(this).css({ opacity: 1 }); setTimeout(showPieChart,300); },{accX: 0, accY: -155},'easeInCubic');
		$('#doughnutChart').appear( function(){ $(this).css({ opacity: 1 }); setTimeout(showDoughnutChart,300); },{accX: 0, accY: -155},'easeInCubic');
	});
}
/* --------------------------------------------
				FORMS
-------------------------------------------- */	
function bootstrapForm(){	
	if ( $( "#bootstrap-form" ).length !== 0 ) {
		$('#bootstrap-form').bootstrapValidator({
			container: 'tooltip',
			feedbackIcons: {
				valid: 'fa fa-check',
				warning: 'fa fa-user',
				invalid: 'fa fa-times',
				validating: 'fa fa-refresh'
			},
			fields: { 
				contact_name: {
					validators: {
						notEmpty: {
							message: ''
						}
					}
				},
				contact_email: {
					validators: {
						notEmpty: {
							message: ''
						},
						emailAddress: {
							message: ''
						}
					}
				},
				contact_phone: {
					validators: {
						notEmpty: {
							message: ''
						}
					}
				},
				contact_message: {
					validators: {
						notEmpty: {
							message: ''
						}
					}
				},
			}
		})	
		.on('success.form.bv', function(e) {
			e.preventDefault();
			var $form        = $(e.target),
			validator    = $form.data('bootstrapValidator'),
			submitButton = validator.getSubmitButton();
			var form_data = $('#bootstrap-form').serialize();
			$.ajax({
					type: "POST",
					dataType: 'json',
					url: "php/contact-form.php",					
					data: form_data,
					success: function(msg){						
						$('.form-message').html(msg.data);
						$('.form-message').show();
						submitButton.removeAttr("disabled");
						resetForm($('#bootstrap-form'));						
					},
					error: function(msg){}
			 });
			return false;
		});
	}
	function resetForm($form) {
		$form.find(
				'input:text, input:password, input, input:file, select, textarea'
			)
			.val('');
		$form.find('input:radio, input:checkbox')
			.removeAttr('checked')
			.removeAttr('selected');
		$form.find('button[type=submit]')
			.attr("disabled", "disabled");	
	}
}
function subscribeForm(){	 
	if ( $( "#subscribe-form" ).length !== 0 ) {
		$('#subscribe-form').bootstrapValidator({
			container: 'tooltip',
			feedbackIcons: {
				valid: 'fa fa-check',
				warning: 'fa fa-user',
				invalid: 'fa fa-times',
				validating: 'fa fa-refresh'
			},
			fields: { 
				subscribe_email: {
					validators: {
						notEmpty: {
							message: 'Email is required. Please enter email.'
						},
						emailAddress: {
							message: 'Please enter a correct email address.'
						}
					}
				},	
			}
		})	
		.on('success.form.bv', function(e) {
			e.preventDefault();
			var $form        = $(e.target),
			validator    = $form.data('bootstrapValidator'),
			submitButton = validator.getSubmitButton();
			var form_data = $('#subscribe-form').serialize();
			$.ajax({
					type: "POST",
					dataType: 'json',
					url: "/requestdemo",					
					data: form_data,
					success: function(msg){						
						$('.form-message1').html(msg.data);
						$('.form-message1').show();
						submitButton.removeAttr("disabled");
						resetForm($('#subscribe-form'));					
					},
					error: function(msg){}
			 });
			return false;
		});
	}
	function resetForm($form) {
		$form.find(
				'input:text, input:password, input, input:file, select, textarea'
			)
			.val('');
		$form.find('input:radio, input:checkbox')
			.removeAttr('checked')
			.removeAttr('selected');
		$form.find('button[type=submit]')
			.attr("disabled", "disabled");
	}
}
/* --------------------------------------------
	Career Form
	-------------------------------------------- */	
	function careerForm(){	
		if ( $( "#careerform" ).length !== 0 ) {
		$('#careerform').bootstrapValidator({
				container: 'tooltip',
				feedbackIcons: {
					valid: 'fa fa-check',
					warning: 'fa fa-user',
					invalid: 'fa fa-times',
					validating: 'fa fa-refresh'
				},
				fields: {
                    career_name: {
                        validators: {
                            notEmpty: {
                                message: ''
                            }
                        }
                    },
                    femail: {
                        validators: {
                            notEmpty: {
                                message: ''
                            },
                            emailAddress: {
                                message: ''
                            },
							regexp: {
									regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
									message: 'The value is not a valid email address'
							}
                        }
                    },
					career_phone: {
                        validators: {
                            notEmpty: {
                                message: ''
                            }
                        }
                    },
                    careerfile: {
						validators: {
							notEmpty: {
                                message: 'Please Upload pdf or doc or docx file'
                            },
							file: {
								extension: 'pdf,doc,docx',
								type: 'application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword',
								message: 'The selected file is not valid!'
							}
						}
					},
                }
			})	
			.on('success.form.bv', function(e) {
				e.preventDefault();
				
				var $form       = $(e.target);
				validator    	= $form.data('bootstrapValidator'),
				submitButton 	= validator.getSubmitButton();
				
				var formData = new FormData(),
				params   = $form.serializeArray(),
				files    = $form.find('[name="careerfile"]')[0].files;
				
				$.each(files, function(i, file) {
					// Prefix the name of uploaded files with "uploadedFiles-"
					// Of course, you can change it to any string
					formData.append('careerfile-' + i, file);
				});
	
				$.each(params, function(i, val) {
					formData.append(val.name, val.value);
				});
				
				$.ajax({
						type: "POST",
						dataType: 'json',
						url: "php/career.php",					
						data: formData,
						cache: false,
						contentType: false,
						processData: false,
						success: function(msg){						
							$('.form-message2').html(msg.data);
							$('.form-message2').show();
							submitButton.removeAttr("disabled");
							resetForm($('#careerform'));						
						},
						error: function(msg){}
				 });
				return false;
			});
		}
		function resetForm($form) {
            $form.find('input:text, input:password, input, input:file, select, textarea').val('');
            $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
			$form.find('input:text, input:password, input, input:file, select, textarea, input:radio, input:checkbox').parent().find('.form-control-feedback').hide();
			
        }
	}	
	
	/* --------------------------------------------
	
Placeholder for Image
-------------------------------------------- */	
$(window).load(function(){
		
	$('img:not(".site_logo")').each(function() {
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
			var ieversion=new Number(RegExp.$1)
			if (ieversion>=9)
			if (typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
			  this.src = "http://placehold.it/" + ($(this).attr('width') || this.width || $(this).naturalWidth()) + "x" + (this.naturalHeight || $(this).attr('height') || $(this).height());
			}
		} else {
			if (!this.complete || typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
				this.src = "http://placehold.it/" + ($(this).attr('width') || this.width) + "x" + ($(this).attr('height') || $(this).height());
			}
		}
	});
	
	$('.bg-image').each(function() {
		var imageSrc = $(this).data('background');
		if( imageSrc !== undefined ) {
			var newSrc = imageSrc.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
		}

		/*  I just broke it up on newlines for readability        */ 
		var image = new Image();
		image.src = newSrc;

		var width = image.width,
			height = image.height;
		
		if( width === 0 || height === 0 ) {
			$(this).attr('data-background', "http://placehold.it/" + ('1900') + "x" + ('700') + "/2e2e2e/666.jpg" );
			
			$(this).removeAttr('style');
			$(this).css("background-image", "url(" + "http://placehold.it/1900x700/2e2e2e/666.jpg" + ")");
		}
	});
});