define([
    '../lib/musicList'
], function(list){
    'use strict';

    function MusicPlayer($audio, $play, $curProgress, $musicList) {
        // $('.current-progress')  
        this.timer = null;      
        this.lrcIndex = 0;
        this.playIndex = 0;
        this.musicList = list.musicList;
        this.initMusicList = function() {
            var $ul = $musicList.find('ul');
            $ul.html('');
            var lis = '';
            this.musicList.forEach(function(music, index) {
                $ul.append('' 
                    + '<li class="list-item" data-index="' + index + '">'
                    + ' <p class="singer">'
                    + '     <span>' + music.songname + '</span><span class="singer-name"> - ' + music.singername + '</span>'
                    + ' </p>'
                    + '</li>');
            });
        }
        this.init = function() {
            var newMusic = this.musicList[this.playIndex];
            $('.music-name span').text(newMusic.songname);
            $('.music-author span').text(newMusic.singername);
            $('.img-author').attr('src', newMusic.albumpic);
            $('.bacImg').css('backgroundImage','url(' + newMusic.albumpic + ')'); 
            $audio.src = newMusic.url;
            $audio.load();
            this.initMusicList();
            // 为audio动态的更改音频路径，播放不同的音频时
            // 点击的时候，音频没有加载（虽然已经开始播放），获取不到时长，audio.duration为nan
            // 添加事件监听，当准备好音频时再获取时长
            var that = this;
            $audio.addEventListener("canplay", function(){  
                that.setMusicTime($('.all-time'), that.musicAllTime());
            });
        }

        this.playMusic = function (playAction) {
            // var audio = document.getElementById('music-audio');
            if (playAction === 'play') {
                $play.addClass('ctl-pause');
                $('.img-author').css('animation-play-state', 'running');
                $audio.play();
                this.setMusicProgress('play');		
            } else {
                $play.removeClass('ctl-pause');
                $('.img-author').css('animation-play-state', 'paused');
                $audio.pause();
                this.setMusicProgress('pause');	
            }
            var that = this;
            $audio.addEventListener("canplay", function(){
                that.setMusicTime($('.all-time'), that.musicAllTime());
            });
        },

        this.setMusicProgress = function (playStatus) {
            var that = this;
            // var timer,
            var	allTime,
                currentTime,
                allProgressWidth;

            if (playStatus === 'play') {
                this.timer = setInterval(function () {
                    allTime = that.musicAllTime();
                    currentTime = that.musicCurrentTime();
                    console.log('getTime:' + currentTime);
                    allProgressWidth = $('.progress').width();
                    that.setMusicTime($('.current-time'), currentTime);
                    $curProgress.width(currentTime / allTime * allProgressWidth);
                    for(var i = that.lrcIndex; i < $('.music-data p').length; i++) {
                        if ($('.music-data p').eq(i).data('time') <= parseInt(currentTime) && $('.music-data p').eq(i + 1).data('time') > parseInt(currentTime) ) {
                            $('.music-data').css('transform', 'translate3d(0px, -' + 20 * i + 'px, 0px)');
                            that.lrcIndex = i;
                            break;
                        }
                    }
                }, 1000);
            }

            if (playStatus === 'pause') {
                clearInterval(this.timer);
            }
        },

        this.changeMusicProgress = function ($musicProgress, newPosition) {
			var beginProgress = $musicProgress.position().left;   // 播放进度起始位置
			var allProgress = $musicProgress.width();
			var allTime = this.musicAllTime();
			var currentTime;
			if (newPosition <= beginProgress) {
				currentTime = 0;
			} else if(newPosition >= (beginProgress + allProgress)) {
				currentTime = allTime;
			} else {
				currentTime = allTime * (newPosition - beginProgress) / allProgress;
			}
			$audio.currentTime = currentTime;
            this.setMusicTime($('.current-time'), currentTime);
            $curProgress.width(currentTime / allTime * allProgress);
        },

        this.musicAllTime = function () {
            // var audio = document.getElementById('music-audio');
            return $audio.duration || 0;
        },

        this.musicCurrentTime = function () {	
            // var audio = document.getElementById('music-audio');
            return ($audio.currentTime + 1) || 0;
        },

        this.setMusicTime = function (element, time) {			
            var minutes = parseInt(time / 60);
            var seconds = parseInt(time % 60);
            element.text((minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds));
        },

        this.playNewMusic = function (prevNext, playMode) {
            this.setMusicTime($('.current-time'), 0);
            // this.lrcIndex = 0;
            // $('.music-data').css('transform', 'translate3d(0px, 0px, 0px)');
            // var audio = document.getElementById('music-audio');
            switch (playMode) {
                case '列表循环':                
                    if (prevNext === 'next') {
                        this.playIndex = this.playIndex === (this.musicList.length - 1) ? 0 : this.playIndex + 1;
                    }
                    if (prevNext === 'prev') {
                        this.playIndex = this.playIndex === 0 ? (this.musicList.length - 1) : this.playIndex - 1;
                    }
                    break;
                case '单曲循环':                
                    $audio.loop = true;
                    // audio.load();
                    // player.playMusic('play');
                    // audio.loop = false;
                    break;
                case '随机播放':
                    this.playIndex = Math.round(Math.random() * (this.musicList.length - 1));
                    break;
            }
            var newMusic = this.musicList[this.playIndex];
            $('.music-name span').text(newMusic.songname);
            $('.music-author span').text(newMusic.singername);
            $('.img-author').attr('src', newMusic.albumpic);
            $('.bacImg').css('backgroundImage','url(' + newMusic.albumpic + ')'); 
            $audio.src = newMusic.url;
            $audio.load();
            this.playMusic('play');
            // 为audio动态的更改音频路径，播放不同的音频时
            // 点击的时候，音频没有加载（虽然已经开始播放），获取不到时长，audio.duration为nan
            // 添加事件监听，当准备好音频时再获取时长
            var that = this;
            $audio.addEventListener("canplay", function(){  
                that.setMusicTime($('.all-time'), that.musicAllTime());
            });
        },

        this.changeMode = function($mode, value) {
			$mode.removeClass('ctl-mode-random ctl-mode-single');
			var nextClass = '',
			    nextMode = '';
			switch (value) {
				case '列表循环':
					nextMode = '随机播放';
					nextClass = 'ctl-mode-random';
					break;
				case '随机播放':
					nextMode = '单曲循环';
					nextClass = 'ctl-mode-single';
					break;
				case '单曲循环':
					nextMode = '列表循环';
					nextClass = 'ctl-mode-list';
					break;
				default:
					break;
			}
			$mode.addClass(nextClass);
			$mode.data('value', nextMode);
			$mode.attr('title', nextMode);
        }
    }

    
    return {
        MusicPlayer: MusicPlayer
    };
})