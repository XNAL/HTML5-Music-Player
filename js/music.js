require([
	'../js/player'
], function(player) {
	'use strict';
	(function() {
		// var play = new player();
		// play.clList();
		var $audio = document.getElementById('music-audio');
		var $play = $('#btnPlay');
		var $curProgress = $('.current-progress');
		var $mode = $('#btnMode');
		var $next = $('.prevNext');
		var $musicList = $('#musicList');
		var play = new player.MusicPlayer($audio, $play, $curProgress, $musicList);
		play.init();
		
		$audio.addEventListener("ended", function(){
			play.playNewMusic('next', $mode.data('value'));
		});

		$mode.click(function () {
			play.changeMode($(this), $(this).data('value'));
		});

		$next.click(function () {
			play.playNewMusic($(this).data('value'), $mode.data('value'));
		});
		$play.click(function () {
			var value = $(this).data('value');
			play.playMusic(value);
			$(this).data('value', value === 'play' ? 'pause' : 'play');
			$(this).attr('title', value === 'play' ? '暂停' : '播放');
		});

		$('.progress').click(function (e) {
			var newPosition = e.pageX - parseInt( $('.music').css('marginLeft'));      // 当前鼠标点击位置 - 播放器左边的外间距
			play.changeMusicProgress($(this), newPosition);
		})

		$('.ctl-list').click(function() {
			var $musicList = $('.music-list');
			var liCount = $musicList.find('li').length || 0;
			var height = 0;
			if(liCount * 40 > 320) {
				height = 320;
			} else {
				height = liCount * 40
			}
			$musicList.css('height', height + 'px');
			$('.list-mask').css('display', 'block');
		})

		$('.list-mask').click(function() {
			$('.music-list').css('height', '0px');
			$(this).css('display', 'none');
		})
	})();
	// var audio = null;
	// var timer = null;
	// window.onload = function () {
	// 	var play = new player();
	// 	play.clList();
		// audio = document.getElementById('music-audio');
		// audio.addEventListener("canplay", function(){
		// 	player.setMusicTime($('.all-time'), player.musicAllTime());
		// });
		// audio.addEventListener("ended", function(){
		// 	player.lrcIndex = 0;
		// 	console.log('ended');
		// 	$('.music-data').css('transform', 'translate3d(0px, 0px, 0px)');
		// 	if ($('#btnMode').data('value') === '单曲循环') {
		// 		audio.loop = true;
		// 		audio.load();
		// 		player.playMusic('play');
		// 		audio.loop = false;
		// 	} else {
		// 		player.playNewMusic('next', $('#btnMode').data('value'));
		// 	}
		// });

		// $('.prevNext').click(function () {
		// 	player.playNewMusic($(this).data('value'), $('#btnMode').data('value'));
		// });
		// $('#btnPlay').click(function () {
		// 	var value = $(this).data('value');
		// 	player.playMusic(value);
		// 	$(this).data('value', value === 'play' ? 'pause' : 'play');
		// 	$(this).attr('title', value === 'play' ? '暂停' : '播放');
		// });
		// $('#btnMode').click(function () {
		// 	var value = $(this).data('value');
		// 	$(this).removeClass('ctl-mode-random ctl-mode-single');
		// 	var nextClass = '';
		// 	var nextMode = '';
		// 	switch (value) {
		// 		case '列表循环':
		// 			nextMode = '随机播放';
		// 			nextClass = 'ctl-mode-random';
		// 			break;
		// 		case '随机播放':
		// 			nextMode = '单曲循环';
		// 			nextClass = 'ctl-mode-single';
		// 			break;
		// 		case '单曲循环':
		// 			nextMode = '列表循环';
		// 			nextClass = 'ctl-mode-list';
		// 			break;
		// 		default:
		// 			break;
		// 	}
		// 	$(this).addClass(nextClass);
		// 	$(this).data('value', nextMode);
		// 	$(this).attr('title', nextMode);
		// });

		// $('.progress').click(function (e) {
		// 	var newPosition = e.pageX - parseInt( $('.music').css('marginLeft'));      // 当前鼠标点击位置 - 播放器左边的外间距
		// 	var beginProgress = $('.progress').position().left;   // 播放进度起始位置
		// 	var allProgress = $('.progress').width();
		// 	var allTime = player.musicAllTime();
		// 	var currentTime;
		// 	if (newPosition <= beginProgress) {
		// 		currentTime = 0;
		// 	} else if(newPosition >= (beginProgress + allProgress)) {
		// 		currentTime = allTime;
		// 	} else {
		// 		currentTime = allTime * (newPosition - beginProgress) / allProgress;
		// 	}
		// 	console.log('setTime:' + currentTime);
		// 	audio.currentTime = currentTime;
		// })
	// }
});


