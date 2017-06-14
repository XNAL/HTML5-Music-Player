define([
    '../lib/musicList'
], function(list) {
    'use strict';

    class MusicPlayer {
        constructor($audio, $play, $curProgress, $musicList) {
            this.timer = null;
            this.playIndex = 0;
            this.musicList = list.musicList;
            this.audio = $audio;
            this.play = $play;
            this.$musicList = $musicList;
            this.$curProgress = $curProgress;
        }

        // 页面打开时初始化第一首音乐
        init() {
            let newMusic = this.musicList[this.playIndex];
            $('.music-name span').text(newMusic.songname);
            $('.music-author span').text(newMusic.singername);
            $('.img-author').attr('src', newMusic.albumpic);
            $('.bacImg').css('backgroundImage', 'url(' + newMusic.albumpic + ')');
            this.audio.src = newMusic.url;
            this.audio.load();
            this.initMusicList();
            this.setMusicListActive(this.playIndex);
            // 为audio动态的更改音频路径，播放不同的音频时
            // 点击的时候，音频没有加载（虽然已经开始播放），获取不到时长，audio.duration为nan
            // 添加事件监听，当准备好音频时再获取时长
            this.audio.addEventListener("canplay", () =>
                this.setMusicTime($('.all-time'), this.musicAllTime())
            );
        }

        // 初始化音乐列表
        initMusicList() {
            let $ul = this.$musicList.find('ul');
            $ul.html('');
            this.musicList.forEach((music, index) => {
                $ul.append('' +
                    '<li class="list-item" data-index="' + index + '">' +
                    ' <p class="singer">' +
                    '     <span>' + music.songname + '</span><span class="singer-name"> - ' + music.singername + '</span>' +
                    ' </p>' +
                    '</li>');
            });
        }

        // 播放/暂停音乐
        playMusic(playAction) {
            let value = 'play',
                title = '播放';
            if (playAction === 'play') {
                this.play.addClass('ctl-pause');
                $('.img-author').css('animation-play-state', 'running');
                this.audio.play();
                this.setMusicProgress('play');
                value = 'pause';
                title = '暂停';
            } else {
                this.play.removeClass('ctl-pause');
                $('.img-author').css('animation-play-state', 'paused');
                this.audio.pause();
                this.setMusicProgress('pause');
            }
            this.play.data('value', value);
            this.play.attr('title', title);

            // 为audio动态的更改音频路径，播放不同的音频时
            // 点击的时候，音频没有加载（虽然已经开始播放），获取不到时长，audio.duration为nan
            // 添加事件监听，当准备好音频时再获取时长
            this.audio.addEventListener("canplay", () =>
                this.setMusicTime($('.all-time'), this.musicAllTime())
            );
        }

        // 播放新的音乐
        playNewMusic(prevNext, playMode, isSwitch) {
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
                    let randIndex = Math.round(Math.random() * (this.musicList.length - 1));
                    // 随机生成的索引等于当前索引时则索引为0（如果当前索引正好也为0，则索引为length - 1）
                    randIndex = this.playIndex === randIndex ? (this.playIndex === 0 ? this.musicList.length - 1 : 0) : randIndex;
                    this.playIndex = randIndex;
                    break;
            }
            this.playMusicByIndex(this.playIndex);
        }

        // 根据索引播放音乐（从音乐列表点击时调用该方法）
        playMusicByIndex(index) {
            this.playIndex = index;
            this.setMusicTime($('.current-time'), 0);
            let newMusic = this.musicList[this.playIndex];
            $('.music-name span').text(newMusic.songname);
            $('.music-author span').text(newMusic.singername);
            $('.img-author').attr('src', newMusic.albumpic);
            $('.bacImg').css('backgroundImage', 'url(' + newMusic.albumpic + ')');
            this.setMusicListActive(this.playIndex);
            this.audio.src = newMusic.url;
            this.audio.load();
            this.playMusic('play');
            this.audio.loop = false;
        }

        // 设置音乐播放进度
        setMusicProgress(playStatus) {
            let allTime,
                currentTime,
                allProgressWidth;

            if (playStatus === 'play') {
                // 设定定时器，根据播放时间调整播放进度
                this.timer = setInterval(() => {
                    allTime = this.musicAllTime();
                    currentTime = this.musicCurrentTime();
                    allProgressWidth = $('.progress').width();
                    this.setMusicTime($('.current-time'), currentTime);
                    this.$curProgress.width(currentTime / allTime * allProgressWidth);
                }, 1000);
            }

            if (playStatus === 'pause') {
                // 暂停时清除定时器
                clearInterval(this.timer);
            }
        }

        // 手动改变音乐播放进度
        changeMusicProgress($musicProgress, newPosition) {
            let beginProgress = $musicProgress.position().left; // 播放进度起始位置
            let allProgress = $musicProgress.width();
            let allTime = this.musicAllTime();
            let currentTime;
            if (newPosition <= beginProgress) {
                currentTime = 0;
            } else if (newPosition >= (beginProgress + allProgress)) {
                currentTime = allTime;
            } else {
                currentTime = allTime * (newPosition - beginProgress) / allProgress;
            }
            this.audio.currentTime = currentTime;
            this.setMusicTime($('.current-time'), currentTime);
            this.$curProgress.width(currentTime / allTime * allProgress);
        }

        // 获取音乐总时间
        musicAllTime() {
            return this.audio.duration || 0;
        }

        // 获取音乐当前播放时间
        musicCurrentTime() {
            return (this.audio.currentTime + 1) || 0;
        }

        // 设置音乐跳转给定时间
        setMusicTime(element, time) {
            let minutes = parseInt(time / 60);
            let seconds = parseInt(time % 60);
            element.text((minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds));
        }

        // 设置音乐播放模式
        changeMode($mode, value) {
            $mode.removeClass('ctl-mode-random ctl-mode-single');
            let nextClass = '',
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

        // 设置列表中当前播放音乐的样式
        setMusicListActive(index) {
            let $lis = $('#musicList li');
            $lis.removeClass('play-on');
            $lis.eq(index).addClass('play-on');
        }
    }


    return {
        MusicPlayer: MusicPlayer
    };
})
