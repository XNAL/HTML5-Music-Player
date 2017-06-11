define([
    '../lib/musicList'
], function(list){
    'use strict';

    function MusicPlayer($audio, $play, $curProgress, $musicList) {
        this.timer = null;      
        this.lrcIndex = 0;
        this.playIndex = 0;
        this.musicList = list.musicList;
        this.audio = $audio;
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
        // 页面打开时初始化第一首音乐
        this.init = function() {
            var newMusic = this.musicList[this.playIndex];
            $('.music-name span').text(newMusic.songname);
            $('.music-author span').text(newMusic.singername);
            $('.img-author').attr('src', newMusic.albumpic);
            $('.bacImg').css('backgroundImage','url(' + newMusic.albumpic + ')'); 
            this.audio.src = newMusic.url;
            this.audio.load();
            this.initMusicList();
            this.setMusicListActive(this.playIndex);
            // 为audio动态的更改音频路径，播放不同的音频时
            // 点击的时候，音频没有加载（虽然已经开始播放），获取不到时长，audio.duration为nan
            // 添加事件监听，当准备好音频时再获取时长
            var that = this;
            this.audio.addEventListener("canplay", function(){  
                that.setMusicTime($('.all-time'), that.musicAllTime());
            });
        }
        
        // 播放/暂停音乐
        this.playMusic = function (playAction) {
            if (playAction === 'play') {
                $play.addClass('ctl-pause');
                $('.img-author').css('animation-play-state', 'running');
                this.audio.play();
                this.setMusicProgress('play');		
            } else {
                $play.removeClass('ctl-pause');
                $('.img-author').css('animation-play-state', 'paused');
                this.audio.pause();
                this.setMusicProgress('pause');	
            }
            var that = this;
            this.audio.addEventListener("canplay", function(){
                that.setMusicTime($('.all-time'), that.musicAllTime());
            });
        },

        // 设置音乐播放进度
        this.setMusicProgress = function (playStatus) {
            var that = this;
            var	allTime,
                currentTime,
                allProgressWidth;

            if (playStatus === 'play') {
                // 设定定时器，根据播放时间调整播放进度
                this.timer = setInterval(function () {
                    allTime = that.musicAllTime();
                    currentTime = that.musicCurrentTime();
                    allProgressWidth = $('.progress').width();
                    that.setMusicTime($('.current-time'), currentTime);
                    $curProgress.width(currentTime / allTime * allProgressWidth);
                    // for(var i = that.lrcIndex; i < $('.music-data p').length; i++) {
                    //     if ($('.music-data p').eq(i).data('time') <= parseInt(currentTime) && $('.music-data p').eq(i + 1).data('time') > parseInt(currentTime) ) {
                    //         $('.music-data').css('transform', 'translate3d(0px, -' + 20 * i + 'px, 0px)');
                    //         that.lrcIndex = i;
                    //         break;
                    //     }
                    // }
                }, 1000);
            }

            if (playStatus === 'pause') {
                // 暂停时清除定时器
                clearInterval(this.timer);
            }
        },

        // 手动改变音乐播放进度
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
			this.audio.currentTime = currentTime;
            this.setMusicTime($('.current-time'), currentTime);
            $curProgress.width(currentTime / allTime * allProgress);
        },

        // 获取音乐总时间
        this.musicAllTime = function () {
            return this.audio.duration || 0;
        },

        // 获取音乐当前播放时间
        this.musicCurrentTime = function () {	
            return (this.audio.currentTime + 1) || 0;
        },

        // 设置音乐跳转给定时间
        this.setMusicTime = function (element, time) {			
            var minutes = parseInt(time / 60);
            var seconds = parseInt(time % 60);
            element.text((minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds));
        },

        // 播放新的音乐
        this.playNewMusic = function (prevNext, playMode, isSwitch) {
            this.setMusicTime($('.current-time'), 0);
            // 手动点击上一曲/下一曲，且当前模式为【单曲循环】时，则按照列表循环的模式来处理
            playMode = isSwitch === true && playMode === '单曲循环' ? '列表循环' : playMode;
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
                    this.audio.loop = true;
                    break;
                case '随机播放':
                    this.playIndex = Math.round(Math.random() * (this.musicList.length - 1));
                    break;
            }
            this.playMusicByIndex(this.playIndex);
        },

        // 设置音乐播放模式
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
        },

        // 设置列表中当前播放音乐的样式
        this.setMusicListActive = function(index) {
            $('#musicList li').removeClass('play-on');
            $('#musicList li').eq(index).addClass('play-on');
        },

        // 根据索引播放音乐（从音乐列表点击时调用该方法）
        this.playMusicByIndex = function(index) {
            this.playIndex = index;
            this.setMusicTime($('.current-time'), 0);
            var newMusic = this.musicList[this.playIndex];
            $('.music-name span').text(newMusic.songname);
            $('.music-author span').text(newMusic.singername);
            $('.img-author').attr('src', newMusic.albumpic);
            $('.bacImg').css('backgroundImage','url(' + newMusic.albumpic + ')'); 
            this.setMusicListActive(this.playIndex);
            this.audio.src = newMusic.url;
            this.audio.load();
            this.playMusic('play');
            this.audio.loop = false;
            // 为audio动态的更改音频路径，播放不同的音频时
            // 点击的时候，音频没有加载（虽然已经开始播放），获取不到时长，audio.duration为nan
            // 添加事件监听，当准备好音频时再获取时长
            var that = this;
            this.audio.addEventListener("canplay", function(){  
                that.setMusicTime($('.all-time'), that.musicAllTime());
            });
        }
    }

    
    return {
        MusicPlayer: MusicPlayer
    };
})