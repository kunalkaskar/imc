$.fn.simpleSlide =  function(options) {

	var settings = $.extend({
		slideTimer : 5000
	}, options);
	
	var slides = this.children();
	var firstSlide = 0;
	var currentSlide = 0;

	var init = function() {		
		slides.hide().eq(firstSlide).show();
		slides.find('.animated').removeClass('animated');
		startTimer();
	}
	
	var changeSlide = function() {
		console.log('slide changed');

		//out animations
		slides.eq(currentSlide).find('.first').removeClass('animated slideInDown').addClass('animated slideOutUp');
		slides.eq(currentSlide).find('.second').removeClass('animated flipInX').addClass('animated flipOutX');

		// in animations
		setTimeout(function() {
			currentSlide++;
			slides.find('.first').removeClass('animated slideOutUp');
			slides.find('.second').removeClass('animated flipOutX');
			if(slides.length == currentSlide) {
				slides.hide().eq(firstSlide).show().find('.first').addClass('animated slideInDown');
				slides.hide().eq(firstSlide).show().find('.second').addClass('animated flipInX');
				currentSlide = firstSlide;
			}else {
				slides.hide().eq(currentSlide).show().find('.first').addClass('animated slideInDown');
				slides.hide().eq(currentSlide).show().find('.second').addClass('animated flipInX');
				
			}
			startTimer();
		}, 1000);
	}

	var startTimer = function() {
		setTimeout(changeSlide, (settings.slideTimer - 1000));
	};

	

	init();

	return this;
};

$.fn.simpleTabs = function(options) {
	var settings = $.extend({
		timer : 5000
	}, options);
	var tabs = this.children();

	var init = function() {
		tabs.eq(0).show();
		console.log('init');
	}

	init();

	return this;
};

(function($) {
	$(function(){
		$('.main-slider').simpleSlide();

		$('.imc-tabs').simpleTabs();

		$('.wrapper').mCustomScrollbar();

	})
})(jQuery);