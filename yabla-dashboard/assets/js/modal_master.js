var Modal_Master = {
	init: function() {
		var me = this;
		if(!$('#modal_master').length) {
			$('body').append( '<div id="modal_master"><div id="modal_mask"></div><div id="modal_content"></div>');
			$('#modal_master').css({
				position: 'fixed',
				top:0,
				left:0,
				width:'100%',
				'overflow-y': 'auto',
				'overflow-x': 'hidden',
				'-webkit-overflow-scrolling': 'touch',
				'overflow-scrolling': 'touch',
				height: screen.height,
				display: 'none',
				zIndex: 20000
			});
			
			$('#modal_mask').css({
				position:'absolute',
				width:'100%',
				height:'100%',
				backgroundColor: '#000',
				opacity:0
			}).on('click touchend',function(e){
				e.stopPropagation();
				me.dismiss();
			});
			$('#modal_content').css({
				position: 'absolute',
			});
		}
	},

	show: function(el,fade_content) {	
		this.init();
		var $el = $(el);
		var me = this;
		
		$('#modal_content').css({ left:0,top:0 });

		$('#modal_content > :first-child').detach();

		$('#modal_master').css('visibility','hidden');
		$('#modal_content').html( $el );
		$el.show();
		
		// helper to setup close buttons
		$('#modal_content').find('.modal_master_close').on('click.mm touchend.mm', function() { 
			me.dismiss() 
		});

		$(window).on('resize.mm',function(){ me.position(); });
		$(document).on('keyup.mm',function(e) {
     		if (e.keyCode == 27) { 
     			if($(document.activeElement).is('select, input, textarea')) {
     				// do nothing
     			} else {
     				me.dismiss();
     			}
     		}
		});
		me.position();

		$('#modal_master').css('visibility','visible').addClass('active');
		$('#modal_mask').animate({ opacity: .6},300);
		
	},
	position: function() {

		$('#modal_master').css({
			'height':screen.height//$(window).height()
		}).show();
		$('#modal_content').css({ left:0,top:0 });
		
		var $el = $('#modal_content > :first-child');

		var existing_max_width = parseInt($el.css('max-width')) && !$el.data('no_max_width');

		var max_width = $(window).width() - 20;
		if(!existing_max_width) {
			$el.css('max-width', max_width).data('no_max_width',true)
		}
		$el.show();
		
		var wh = screen.height;//$(window).height();
		var ww = $(window).width();
		var w = $el.outerWidth();
		var h = $el.outerHeight();

		// 'My Scores' Modal from Games is using transform rules
		// it's messing up if you open trasncript modal after 'My Scores' modal
		// so set transform none to fix it!
		$('#modal_content').css({
			left: (ww - w) / 2,
			top: Math.max(  (wh - h) / 3.5, 20),
			transform: 'none'
		});
		$('#modal_mask').css('height',Math.max(h + 80, wh));

		$(document).off('mousewheel.mm');
		$(document).on('mousewheel.mm',function(e){
			var up = e.originalEvent.wheelDelta > 0;
			var st = $('#modal_master').scrollTop();
			var bottom = $('#modal_mask').outerHeight() - $('#modal_master').outerHeight();
		
			if(up && st < .1 || (!up && st > bottom - .1) ) {
				e.preventDefault();
				e.stopPropagation();
			}
		});
	},
	dismiss: function(afterDismiss) {
		var me = this;
		// cleanup event bindings
		$(window).off('resize.mm');
		$(document).off('mousewheel.mm');
		$(document).off('keyup.mm');
		$('#modal_content').find('.modal_master_close').off('.mm');

		$('#modal_master').fadeOut(300,function(){ 
			afterDismiss && afterDismiss() 
			$('#modal_mask').css('opacity',0);
			me.onDismiss && me.onDismiss();
			me.onDismiss = null;
		}).removeClass('active');
	}	

}
