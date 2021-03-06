require([
    '../js/player'
], function(player) {
    'use strict';

    (function() {
        let $audio = document.getElementById('music-audio'),
            $play = $('#btnPlay'),
            $curProgress = $('.current-progress'),
            $progress = $('.progress'),
            $mode = $('#btnMode'),
            $next = $('.prevNext'),
            $musicList = $('#musicList'),
            $listMask = $('.list-mask'),
            $ctlList = $('.ctl-list');

        let play = new player.MusicPlayer($audio, $play, $curProgress, $musicList);
        play.init();

        // 监听到音乐播放完毕后播放下一首音乐
        $audio.addEventListener("ended", function() {
            play.playNewMusic('next', $mode.data('value'));
        })

        // 设置音乐播放模式
        $mode.click(function() {
            play.changeMode($(this), $(this).data('value'));
        })

        // 播放上一首/下一首音乐
        $next.click(function() {
            play.playNewMusic($(this).data('value'), $mode.data('value'), true);
        })

        // 播放/暂停
        $play.click(function() {
            let value = $(this).data('value');
            play.playMusic(value);
        })

        // 调整音乐播放进度
        $progress.click(function(e) {
            let newPosition = e.pageX - parseInt($('.music').css('marginLeft')); // 当前鼠标点击位置 - 播放器左边的外间距
            play.changeMusicProgress($(this), newPosition);
        })

        // 查看音乐列表
        $ctlList.click(function() {
            let liCount = $musicList.find('li').length || 0;
            let height = 0;
            if (liCount * 40 > 320) {
                height = 320;
            } else {
                height = liCount * 40
            }
            $musicList.css('height', height + 'px')
                .css('border', '1px solid #42474c');
            $listMask.css('display', 'block');
        })

        // 点击隐藏音乐列表
        $listMask.click(function() {
            $musicList.css('height', '0px')
                .css('border', 'none');
            $(this).css('display', 'none');
        })

        // 点击音乐列表中音乐时播放该音乐
        $musicList.find('li').click(function() {
            let index = $(this).data('index') || 0;
            play.playMusicByIndex(index);
        })
    })();
});
