var ModalPlayer = {

	ytPlayer: null,
	isYouTube: false,
	startWidth: 100,
	endWidth: 500,
	init: function() {
		// setup the modal
		var me = this;
		var $modal = $('#modal_player');
		this.ytApiIsReady = false;
		if(!$modal.length) {
			$('body').append('<div id="modal_player">'
								+'<div class="mask"></div>'
								+'<div class="content">'
									+'<div class="modal_player_video_container">'
										+'<video playsinline></video>'
										+'<div id="modal_yt_player"></div>'
									+'</div>'
									+'<div class="overlay"></div>'
									+'<span class="replay"><i class="fa fa-repeat" aria-hidden="true"></i></span>'
									+'<i class="close fa fa-times-circle-o"></i>'
								+'</div>'
							+'</div>');
			var $modal = $('#modal_player');

			$modal.css({
				position: 'fixed',
				top:0,
				left:0,
				width:'100%',
				height: '100%',
				display: 'none',
				zIndex: 30000
			});
			$modal.find('.mask').css({
				position:'absolute',
				width:'100%',
				height:'100%',
				backgroundColor: '#fff',
				opacity:0,
				visibility: 'hidden',
			}).on('click touchend',function(){
				me.hide();
			});
			$modal.find('.content').css({
				position: 'absolute',
			});
			$modal.find('video, #modal_yt_player').css({
				position: 'absolute',
				left: 0,
				top: 0,
				width: '100%',
			});
			$modal.find('.overlay').css({
				background: 'rgba(255,255,255, 0.6)',
				color: 'black',
				'line-height': '1.7em',
				position: 'absolute',
				'text-align': 'center',
				width: '100%',
			});
			$modal.find('.replay').css({
				display: 'none',
				position:'absolute',
				top: '50%',
				left: '50%',
				fontSize: '500%',
				'-webkit-transform': 'translate(-50%, -50%)',
						'-ms-transform': 'translate(-50%, -50%)',
							'transform': 'translate(-50%, -50%)',
				textShadow: '2px 2px 4px #000',
				color: '#eee'
			}).hover(function() {
				$(this).css('cursor', 'pointer');
			}).on('click touchend',function(){
				me.playVideo();
			});

			$modal.find('.close').css({
				color: '#999',
				background: 'white',
				'border-radius': '12px',
				cursor: 'pointer',
				display: 'none',
				'font-size': '26px',
				'line-height': '0.8em',
				position: 'absolute',
				right: '-10px',
				top: '-10px',
			});

		}

		var $mask = $modal.find('.mask');
		var $content = $modal.find('.content');
		var $closeButton = $content.find('.close');
		var $video = $content.find('video');
		var $caption = $('#vid_caption');
		var me = this;

		this.$e = $modal;
		this.$content = $content;

		if (navigator.userAgent.indexOf('iPad') != -1) {
			$video.css({ 'object-fit': 'none' });
		}

		// click to replay
		$video.off('click').on('click', function() {
			if ($modal.hasClass('done')) {
				$modal.removeClass('done');
				this.currentTime = me.vidInfo.time_in;
			}
			if (this.paused) {
				this.play();
			} else {
				this.pause();
			}
		});

		// unload & hide video on close button click
		$closeButton.off('click').on('click', function(){ me.hide() });
		$mask.off('click').on('click', function(e) {
			if (e.target == this) me.hide();
		});
	},
	show: function(vidInfo, $sourceElt, $targetElt, overlayContent, callbacks) {
		
		if (!$sourceElt || !$sourceElt.length) {
			throw new Error("Modal Player requires a source element!");
			return;
		}

		console.log("showing modal player with video info: ", vidInfo);

		this.init();

		var $modal = $('#modal_player');
		var $mask = $modal.find('.mask');
		var $content = $modal.find('.content');
		var $closeButton = $content.find('.close');
		var $overlay = $content.find('.overlay');

		var me = this;

		this.$source = $sourceElt;
		this.$target = $targetElt;
		this.vidInfo = vidInfo;
		this.vidInfo.time_in = this.vidInfo.time_in * 1;
		this.vidInfo.time_out = this.vidInfo.time_out * 1;
		callbacks = callbacks || {};
		this.beforeHide = callbacks.beforeHide && callbacks.beforeHide.bind(this);
		this.afterHide = callbacks.afterHide && callbacks.afterHide.bind(this);
		this.onVideoEnd = callbacks.onVideoEnd && callbacks.onVideoEnd.bind(this);

		this.isYouTube = (vidInfo.source == 'youtube');

		function showBody() {
			me.startSize = { width: me.startWidth, height: me._videoHeight() * (me.startWidth / me._videoWidth()) }
			me.endSize = { width: me.endWidth, height: me._videoHeight() * (me.endWidth / me._videoWidth()) }

			$modal.css({display: 'block'});
			$content.css(me._contentPositionForEltWithSize($sourceElt, me.startSize));

			$mask.css({ visibility: 'visible' }).animate({ opacity: .6},300);
			$content.animate(me._contentPositionForEltWithSize($targetElt, me.endSize), 300, function() {
				$closeButton.css({display: 'block'});
				me.shown = true;
				me._position();
				overlayContent && overlayContent.length && $overlay.append($(overlayContent));
				callbacks.afterShow && callbacks.afterShow(me);
			});
		}

		$(window).off('resize.mp').on('resize.mp',function(){ me._position(); });
		$(window).off('scroll.mp').on('scroll.mp',function(){ me._position(); });
		$(document).off('keyup.mp').on('keyup.mp',function(e) { (e.keyCode == 27) && me.hide(); });

		$modal.addClass('loading');
		$modal.find('.replay').hide();
		
   	if (vidInfo.show_full_video) {
			$content.append('<a class="full_video_link" style="position: absolute; top: 14px; right: 16px; padding: 8px 6px; background-color: #fc8f40; color: #fff; border-radius: 4px;" href="/videos.php?media_id=' + vidInfo.id + '">Watch Full Video</a>');	
		}

		if (this.isYouTube) {
			$overlay.css({
				'top': '85%',
				'left': '-6px',
				'width': 'calc(100% + 12px)'
			});
			$modal.find('video').css({display: 'none'});
			$modal.find('iframe').css({display: 'block'});
			this._loadYouTubeAPI(function(firstLoad) { me._loadYouTubeVideo(vidInfo.source_id, function() {
				me.seekToTime(vidInfo.time_in);
				clearInterval(me.ytPollTimer);
				me.ytPollTimer = setInterval(me._poll.bind(me));
				showBody();
			});
		 });
		} else {
			$overlay.css('top', '');
			$overlay.css('bottom', 0);
			$modal.find('iframe').css({display: 'none'});
			$modal.find('video').css({display: 'block'});
			var $vid = $content.find('video');
			this.video = $vid[0];

			// setup video and start polling
			$vid.off('timeupdate').on('timeupdate', this._poll.bind(this));
			$vid.off('play').on('play', function() { $modal.removeClass('done'); });
			$vid.off('loadedmetadata').on('loadedmetadata', showBody);
			$vid.off('canplaythrough').on('canplaythrough', function() {
				if (!$modal.hasClass('done')) {
					$modal.removeClass('loading');
					me.playVideo();
				}
			});

			var vidPath = CDN_HOST + '/media/' + vidInfo.id;
			$vid.attr('poster', vidPath + '/medium.jpg');

			this.video.src = vidPath +'/h264_q30.mp4' + '#t=' + vidInfo.time_in + ',' + vidInfo.time_out;
		}
	},

	hide: function() {
		$(window).off('resize.mp');
		$(document).off('keyup.mp');

		var $modal = $('#modal_player');
		var $mask = $modal.find('.mask');
		var $content = $modal.find('.content');
		var $closeButton = $content.find('.close');
		var $vid = $content.find('video');
		var $overlay = $content.find('.overlay');
		var me = this;

		$vid.off('timeupdate');
		$vid.off('loadedmetadata');

		this.pauseVideo();

		$overlay.empty();

		this.beforeHide && this.beforeHide(this);

		$closeButton.css({display: 'none'});
		$mask.animate({ opacity: 0 }, 300);
		$content.animate(this._contentPositionForEltWithSize(this.$source, this.startSize), 300, function() {
			var vid = $vid[0];
			vid.src = "";
			vid.load();
			$vid.off('timeupdate');

			clearInterval(me.ytPollTimer);

			me.shown = false;

			$modal.css({ display: 'none' }).removeClass('done');
			me.afterHide && me.afterHide(me);
		});
	},

	showReplayBtn: function() {
		var $modal = $('#modal_player');
		$modal.find('.replay').show();
	},

	swagUpForFreeDictionary: function() {
		this.init();
		this.playingDictionaryClips = true;
		var $modal = $('#modal_player');
		$modal.find('.content').css({
			'border': '6px solid #555',
			'border-bottom': '5px',
		});
		$modal.find('.close').css({
			'color': '#555',
			'font-size': '36px',
			'top': '-16px',
			'right': '-16px'
		});
		$modal.find('.overlay').css({
			'background': '#555',
			'color': '#fff',
			'padding': '5px',
		});

		//console.log($('#modal_player .content .overlay .translation'));
		$modal.find('.content .overlay .translation').css({
			opacity: 0.6
		})
	},

	_poll: function() {
		var $modal = $('#modal_player');
		var ct = this.currentVideoTime();
		if (ct < this.vidInfo.time_in - 0.001) {
			this.seekToTime(this.vidInfo.time_in);
		} else if (ct >= this.vidInfo.time_out) {
			this.seekToTime(this.vidInfo.time_in);
			this.pauseVideo();
			$modal.addClass('done');
			this.onVideoEnd && this.onVideoEnd(this);
		}
	},

	_videoWidth: function() {
		if (this.isYouTube) return 640;
		if (this.video) return this.video.videoWidth;
	},
	_videoHeight: function() {
		if (this.isYouTube) return 390;
		if (this.video) return this.video.videoHeight;
	},

	currentVideoTime: function() {
		if (this.isYouTube) return this.ytPlayer ? this.ytPlayer.getCurrentTime() : 0;
		if (this.video) return this.video.currentTime;
		return NaN;
	},
	seekToTime: function(t) {
		if (this.isYouTube) {
			this.ytPlayer && this.ytPlayer.seekTo(t);
		} else if (this.video) {
			this.video.currentTime = t;
		}
	},
	pauseVideo: function() {
		if (this.isYouTube) {
			this.ytPlayer && this.ytPlayer.pauseVideo();
		} else {
			this.video && this.video.pause();
		}
	},
	playVideo: function() {
		var $modal = $('#modal_player');
		$modal.find('.replay').hide();
		if (this.isYouTube) {
			this.ytPlayer && this.ytPlayer.playVideo();
		} else {
			if (this.playingDictionaryClips) {
				this.video.playbackRate = 0.75;
			}
			this.video && this.video.play();
		}
	},
	_position: function() {
		if (this.shown) {
			var targetSize = this.endSize;
			if (this.isYouTube) {
				targetSize.height = this._videoHeight();
			}
			$('#modal_player .content').css(this._contentPositionForEltWithSize(this.$target, this.endSize));
		}
	},
	_contentPositionForEltWithSize: function($elt, size) {
		var res = $.extend({}, size);
		if ($elt) {
			res.left = $elt.offset().left - this.$e.offset().left + $elt.outerWidth()/2 - size.width/2;
			res.top = $elt.offset().top - this.$e.offset().top + $elt.outerHeight()/2 - size.height/2;
		} else {
			res.left = this.$e.outerWidth()/2 - size.width/2;
			res.top = this.$e.outerHeight()/2 - size.height/2;
		}
		return res;
	},
	_loadYouTubeAPI: function(onLoadCompleted) {
		var apiSource = "https://www.youtube.com/iframe_api";
		var scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));
		if (scripts.filter(function(s){return s.src == apiSource;}).length > 0) {
			onLoadCompleted(false);
			return;
		}

		console.log("injecting YouTube Embed API");
		var tag = document.createElement('script');
		tag.src = apiSource;
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		window.onYouTubeIframeAPIReady = function() { onLoadCompleted(true); }
	},
	_loadYouTubeVideo: function(videoId, onReady) {
		onReady = onReady || function() {};
		if (!this.ytPlayer) {
			console.log("creating YouTube player for video "+videoId);
			this.ytPlayer = new YT.Player('modal_yt_player', {
				videoId: videoId,
				host: 'https://www.youtube-nocookie.com',
				playerVars: {
					autoplay: 1,
					cc_load_policy: 3,
					controls: 0,
					disablekb: 1,
					html5: 1,
					iv_load_policy: 3,
					modestbranding: 1,
					rel: 0,
					showinfo: 0,
					playsinline: 1,
				},
				events: { onReady: onReady }
			});
		} else {
			console.log("YouTube player already exists, loading video "+videoId);
			this.ytPlayer.loadVideoById(videoId);
			onReady();
		}
	},

}
