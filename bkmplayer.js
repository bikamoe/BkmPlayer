class BKMPlayer {
	constructor(config) {
		this.version = '1.40';
		this.isMove = false;
		this.container = document.querySelector('.bkmplayer'), //放置播放器的容器
		this.autoplay = false, //自动播放,默认未false,因为部分播放器不支持自动播放视频.
		this.video = {
			url: '', //视频地址
			title: '' //视频标题
		}, 
		// this.logo = 'https://ae01.alicdn.com/kf/U08a490c77627402bad9d204db5d663afA.jpg',
		/* 多集模式 可播放完自动播放下一集 */
		this.nextpartmode = false;
		this.playIndex = 0;
		this.playlist = [];

		this.getPlayUrlApi = '/anime/getVideoUrl/';

		/* nextpart模式下的切换剧集方法 */
		this.nextpartFunc = (epid) => {
			epid = parseInt(epid);
			// console.log(this.playlist.indexOf(epid),epid);
			if(epid != 0)this.playIndex = this.playlist.indexOf(epid) != -1 ? this.playlist.indexOf(epid) : this.playIndex;
			let ep = this.playlist[this.playIndex].toString();
			/* nextpartFunc的Hook函数 */
			if(this.nextpartHook)this.nextpartHook(this,ep);
			if (this.playIndex == this.playlist.length - 1){
				$('#bkmplayer .btn-next').hide();
			}else{
				$('#bkmplayer .btn-next').show();
			}
			if(ep.indexOf('http://') != -1 || ep.indexOf('https://') != -1){
				this.video.url = ep;
			}else{
				$.ajax({
                    type:"POST",
                    url: this.getPlayUrlApi+ep,
                    dataType:'json',
                    success:(data) => {
						this.nextpartGetUrlSuccessHook(this,ep);
						Player.setPlayerUrl(data.data.play_data,data.data.play_name ? data.data.play_name : '第'+data.data.play_index+'话')
                    },
                    error:() => {
                        this.tips('获取视频地址出错');
                    }
                });
			}
		};
		this.danIndex = 0;
		this.dan = [];
		this.danTunnel = {
			right: {},
			top: {},
			bottom: {},
		};


		Object.assign(this, config);
		$(() => {
			this.Init();
            this.LoadDanmaku();
		});
	}
	/* 
		初始化播放器
	*/

	IsMobile() {
		let userAgent = navigator.userAgent, Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
		return Agents.some((i) => {
			return userAgent.includes(i)
		})
	}

    LoadDanmaku() {
        this.danmaku = new Danmaku({
            container: document.querySelector('#bkmplayer .danmaku'),
            media: document.querySelector('#bkmplayer video'),
            comments: [
                {
                  "time": 0,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "日本人终于是疯了"
                },
                {
                  "time": 0,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "省流：波奇塔"
                },
                {
                  "time": 0,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "省流：三体（科幻片）"
                },
                {
                  "time": 0,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "日本人疯了"
                },
                {
                  "time": 0,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 0.22,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好耶！！"
                },
                {
                  "time": 0.338,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 0.47,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fe0302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fe0302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "敗戦国の末路"
                },
                {
                  "time": 0.599,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好耶好耶好耶好耶"
                },
                {
                  "time": 0.794,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fe0302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fe0302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 1.363,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天番"
                },
                {
                  "time": 1.4,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 1.509,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "？？！"
                },
                {
                  "time": 1.679,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "日本人彻底疯了.jpg"
                },
                {
                  "time": 2.116,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "英雄降临"
                },
                {
                  "time": 3.759,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "求求你们别乱教人过来。环境差没好处"
                },
                {
                  "time": 4,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好短"
                },
                {
                  "time": 4.086,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 4.439,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "日本人当代精神状况纪录片"
                },
                {
                  "time": 4.899,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这么短吗"
                },
                {
                  "time": 4.946,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "呜呜呜，我就喜欢！"
                },
                {
                  "time": 5.245,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我不做人了"
                },
                {
                  "time": 5.51,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好耶"
                },
                {
                  "time": 5.558,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 5.673,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我来上班了"
                },
                {
                  "time": 6.039,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 6.131,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 6.315,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "梨斗：这我熟"
                },
                {
                  "time": 6.44,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 6.905,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 7.698,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不逆天不看"
                },
                {
                  "time": 8.284,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "今夕是何年"
                },
                {
                  "time": 8.3,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "来看逆天了"
                },
                {
                  "time": 8.539,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "省流：波奇塔"
                },
                {
                  "time": 8.962,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 9.149,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 9.279,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好短"
                },
                {
                  "time": 10,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪！"
                },
                {
                  "time": 10.726,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好耶"
                },
                {
                  "time": 10.749,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不知道说什么，总之发个逆天"
                },
                {
                  "time": 11.047,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 11.687,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 13.15,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪！！"
                },
                {
                  "time": 13.41,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 15.439,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "。。。。。"
                },
                {
                  "time": 15.609,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪！"
                },
                {
                  "time": 20.392,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么电次模拟器"
                },
                {
                  "time": 20.806,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这个腿太涩了"
                },
                {
                  "time": 21.054,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "腿功了得"
                },
                {
                  "time": 21.083,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好视角"
                },
                {
                  "time": 21.17,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "开幕雷击"
                },
                {
                  "time": 21.232,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 21.58,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "角度不錯!"
                },
                {
                  "time": 22.443,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这番有点懂啊"
                },
                {
                  "time": 23.138,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪room"
                },
                {
                  "time": 24.153,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪！！"
                },
                {
                  "time": 24.487,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 25.547,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 25.923,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e2027f",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e2027f",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "马洼路马洼路"
                },
                {
                  "time": 26.071,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "老人地鐵手機"
                },
                {
                  "time": 27.539,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪room草"
                },
                {
                  "time": 27.546,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么玛奇玛"
                },
                {
                  "time": 27.639,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "哟！梗女士"
                },
                {
                  "time": 27.796,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "窝巢 丹"
                },
                {
                  "time": 27.882,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪！！"
                },
                {
                  "time": 28.306,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这腿"
                },
                {
                  "time": 28.999,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "日 本 完 了"
                },
                {
                  "time": 29.181,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪！！！！！"
                },
                {
                  "time": 29.707,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪！"
                },
                {
                  "time": 29.805,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "日本人终究还是疯了！"
                },
                {
                  "time": 29.837,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "梗！"
                },
                {
                  "time": 30.045,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "马哇路马哇路"
                },
                {
                  "time": 30.583,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 32.031,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "梗！"
                },
                {
                  "time": 32.359,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不知道说什么，总之发个逆天"
                },
                {
                  "time": 33.297,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "主观视角！"
                },
                {
                  "time": 33.451,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 33.474,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好好好"
                },
                {
                  "time": 33.719,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪！"
                },
                {
                  "time": 33.823,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪！"
                },
                {
                  "time": 33.837,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 34.045,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "藤本树梦想成真"
                },
                {
                  "time": 34.159,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪"
                },
                {
                  "time": 34.215,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "怎么这么短"
                },
                {
                  "time": 34.397,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "沉浸式出发"
                },
                {
                  "time": 34.836,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "哦，是阿尔丹"
                },
                {
                  "time": 35.581,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好短"
                },
                {
                  "time": 37.076,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天，但好看"
                },
                {
                  "time": 37.797,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "极其豪华的OP演唱阵容"
                },
                {
                  "time": 38.444,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 38.502,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好短"
                },
                {
                  "time": 38.724,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好的好的"
                },
                {
                  "time": 38.839,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太长了，很难改"
                },
                {
                  "time": 38.879,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这么短？"
                },
                {
                  "time": 39.373,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "查询日本人精神状态"
                },
                {
                  "time": 39.479,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪！"
                },
                {
                  "time": 39.639,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "gal全明星阵容"
                },
                {
                  "time": 40.912,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "老规矩，只看一遍"
                },
                {
                  "time": 41.219,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 41.551,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 45.487,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "老师快回海里"
                },
                {
                  "time": 54.055,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "等等…"
                },
                {
                  "time": 57.964,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "未花！"
                },
                {
                  "time": 60.123,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "itsutsuse老师啊"
                },
                {
                  "time": 61.15,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "gal全明星"
                },
                {
                  "time": 61.559,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "全 明 星"
                },
                {
                  "time": 62.352,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 62.511,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "约尔福杰"
                },
                {
                  "time": 62.597,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "学姐？"
                },
                {
                  "time": 62.644,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "全明星op"
                },
                {
                  "time": 62.944,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这啥OP请的啥"
                },
                {
                  "time": 62.957,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么galop曲全明星"
                },
                {
                  "time": 64.439,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "比电锯人ed还豪华的op歌手阵容"
                },
                {
                  "time": 68.889,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "草，怎么给饭这么一个特写，整得像真女主一样"
                },
                {
                  "time": 83.451,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "把鼻子换成另一个东西也没有任何违和感（）"
                },
                {
                  "time": 83.594,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这制作组真的专业（副业）"
                },
                {
                  "time": 83.771,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这才叫专业"
                },
                {
                  "time": 85.229,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你的说法我认可"
                },
                {
                  "time": 85.286,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 87.181,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天，把鼻子換成舒服的地方就XD"
                },
                {
                  "time": 87.507,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "点！"
                },
                {
                  "time": 88.251,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 88.841,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "只看一遍"
                },
                {
                  "time": 90.726,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪！"
                },
                {
                  "time": 91.313,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 91.701,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪！"
                },
                {
                  "time": 95.105,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 95.772,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这不赶紧绝育（）"
                },
                {
                  "time": 97.653,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "专业！"
                },
                {
                  "time": 105.832,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "走近科学"
                },
                {
                  "time": 107.65,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "出现了，鲸鱼胸型（）"
                },
                {
                  "time": 108.883,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "赶紧送去绝育啊"
                },
                {
                  "time": 109.649,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "傘撐了個寂寞"
                },
                {
                  "time": 109.745,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "糟糕,是心动呀"
                },
                {
                  "time": 110.639,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "打着伞还会湿"
                },
                {
                  "time": 110.824,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "上来就"
                },
                {
                  "time": 111.012,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这形状好怪啊"
                },
                {
                  "time": 112.23,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "撑伞淋湿好评"
                },
                {
                  "time": 112.464,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "竹笋型"
                },
                {
                  "time": 112.577,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "悬疑BGM"
                },
                {
                  "time": 114.823,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "奇怪的bgm"
                },
                {
                  "time": 118.039,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "怎么有点像玛奇玛"
                },
                {
                  "time": 118.18,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffaa02",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffaa02",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "您这伞漏雨是吧"
                },
                {
                  "time": 120.573,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这水印"
                },
                {
                  "time": 122.365,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "！！！"
                },
                {
                  "time": 123.185,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这位女同学力大无穷，伞、手机、书包、旺财"
                },
                {
                  "time": 126.312,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "悬疑の小曲"
                },
                {
                  "time": 131.89,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "制作组好样的"
                },
                {
                  "time": 132.147,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "若隐若现捏"
                },
                {
                  "time": 134.488,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这个视角，我是浮在空中飞着的吗"
                },
                {
                  "time": 135.611,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好便宜的动画"
                },
                {
                  "time": 136.106,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厚礼蟹"
                },
                {
                  "time": 136.472,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这制作组的副业就是这部番吧"
                },
                {
                  "time": 137.222,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffff00",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffff00",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "集中！！眼睛集中精神是可以透視的！！！"
                },
                {
                  "time": 137.473,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "人如其名啊"
                },
                {
                  "time": 139.973,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#f0ab2a",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#f0ab2a",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这视角不错"
                },
                {
                  "time": 140.012,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "哇哦"
                },
                {
                  "time": 146.63,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "透明"
                },
                {
                  "time": 148.639,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 150.505,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这个不会是安全版吧"
                },
                {
                  "time": 153.958,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "窝巢 梗"
                },
                {
                  "time": 154.45,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "馬上就乾了"
                },
                {
                  "time": 154.61,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "肯定不会上危险版啊"
                },
                {
                  "time": 155.247,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这就是安全版 。。。。"
                },
                {
                  "time": 155.321,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好刺激"
                },
                {
                  "time": 156.863,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "衣服速干是吧"
                },
                {
                  "time": 158.45,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "先看安全 后看危险"
                },
                {
                  "time": 160.337,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "恩 危险版!?"
                },
                {
                  "time": 161.942,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "安全版要看，危险宝也要看，这样才称得上健全"
                },
                {
                  "time": 169.039,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "袜子不要脱"
                },
                {
                  "time": 171.252,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这衣服"
                },
                {
                  "time": 173.409,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "和危险版有什么区别？"
                },
                {
                  "time": 175.217,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "該洗澡啦!!!"
                },
                {
                  "time": 178.904,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "该割蛋蛋了！"
                },
                {
                  "time": 179.862,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "危险版能吃樱桃，大概"
                },
                {
                  "time": 188.479,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "只有安全版"
                },
                {
                  "time": 189.103,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "兄台没发现自己变矮了吗"
                },
                {
                  "time": 191.049,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "男主就没想过为什么视角这么矮吗"
                },
                {
                  "time": 198.375,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这是僧侣番？"
                },
                {
                  "time": 198.792,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "真不錯"
                },
                {
                  "time": 203.388,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "木更上身"
                },
                {
                  "time": 204.411,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "瞬间病娇脸"
                },
                {
                  "time": 204.545,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "?!"
                },
                {
                  "time": 205.668,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "木更绷不住了"
                },
                {
                  "time": 207.92,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "1096！"
                },
                {
                  "time": 208.397,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "丞相，我悟了"
                },
                {
                  "time": 208.399,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e2027f",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e2027f",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "一眼木更！"
                },
                {
                  "time": 210.049,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "实玖瑠"
                },
                {
                  "time": 211.604,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "后藤桑"
                },
                {
                  "time": 215.425,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "wow"
                },
                {
                  "time": 215.463,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffff00",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffff00",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "誒嘿嘿，母女是吧~~~"
                },
                {
                  "time": 216.385,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "反差卡哇"
                },
                {
                  "time": 216.538,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "1096啊"
                },
                {
                  "time": 217.725,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "1096？"
                },
                {
                  "time": 217.797,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "建安风骨，魏武遗风"
                },
                {
                  "time": 218.657,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不會是..媽媽"
                },
                {
                  "time": 220.632,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "危险的发型。。。出现了"
                },
                {
                  "time": 221.099,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "后藤邑子"
                },
                {
                  "time": 221.187,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "1096的声音"
                },
                {
                  "time": 221.747,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "后藤邑子"
                },
                {
                  "time": 224.106,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "邑子"
                },
                {
                  "time": 224.27,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "夫人你的发型很危险啊"
                },
                {
                  "time": 224.719,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "老1096了"
                },
                {
                  "time": 226.431,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 229.312,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "代餐是吧"
                },
                {
                  "time": 232.634,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "夫人你的发型很危险啊"
                },
                {
                  "time": 234.053,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天，有没有可能捡到的就是你"
                },
                {
                  "time": 241.173,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "暴力"
                },
                {
                  "time": 246.126,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "经典的哈是吧"
                },
                {
                  "time": 248.166,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "令人羡慕的竟是我自己"
                },
                {
                  "time": 251.322,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "快闻闻！"
                },
                {
                  "time": 252.199,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 254.687,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "令人羡慕的竟是我自己"
                },
                {
                  "time": 257.653,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#f0ab2a",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#f0ab2a",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "wow"
                },
                {
                  "time": 257.698,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厚礼蟹"
                },
                {
                  "time": 258.428,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 258.804,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "嘶溜"
                },
                {
                  "time": 258.898,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 258.992,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 259.757,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这将是一场试炼"
                },
                {
                  "time": 259.839,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "真不把我们当外人啊"
                },
                {
                  "time": 261.351,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这是一场试炼"
                },
                {
                  "time": 261.371,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "wc，逆天"
                },
                {
                  "time": 262.994,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么托比欧"
                },
                {
                  "time": 263.989,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "喔喔喔"
                },
                {
                  "time": 264.173,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这是安全版?"
                },
                {
                  "time": 264.705,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好！"
                },
                {
                  "time": 264.746,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 266.849,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "多来点多来点"
                },
                {
                  "time": 267.653,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我默默带上耳机"
                },
                {
                  "time": 269.383,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这是一场试炼"
                },
                {
                  "time": 269.62,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "猴子pg？"
                },
                {
                  "time": 269.839,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天好活"
                },
                {
                  "time": 270.201,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 270.354,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好！"
                },
                {
                  "time": 270.421,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "吼厉谢！"
                },
                {
                  "time": 270.482,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "阿b你这不是能支棱起来嘛"
                },
                {
                  "time": 270.946,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 271.103,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "哇哦"
                },
                {
                  "time": 271.299,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "wc"
                },
                {
                  "time": 271.314,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好！"
                },
                {
                  "time": 271.773,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这还是健全版是吧"
                },
                {
                  "time": 271.981,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好好好好好"
                },
                {
                  "time": 272.075,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "为啥你的皮鼓会反光啊（不是）"
                },
                {
                  "time": 272.235,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太棒了"
                },
                {
                  "time": 272.274,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆大天"
                },
                {
                  "time": 273.544,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "都这样了不健全得多逆天"
                },
                {
                  "time": 274.298,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "英雄参上！"
                },
                {
                  "time": 274.317,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厚礼蟹"
                },
                {
                  "time": 274.714,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "请不要帮我当成外人"
                },
                {
                  "time": 275.39,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厚礼蟹"
                },
                {
                  "time": 275.828,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "妙啊"
                },
                {
                  "time": 276.309,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这个真的能播吗"
                },
                {
                  "time": 276.433,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "动画里的jio总是这样"
                },
                {
                  "time": 276.709,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆大天"
                },
                {
                  "time": 276.737,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厚礼谢"
                },
                {
                  "time": 276.994,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 277.455,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "嗶哩嗶哩，我的超人！"
                },
                {
                  "time": 278.151,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "真18+"
                },
                {
                  "time": 278.234,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "開始逆天"
                },
                {
                  "time": 280.232,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "嗶哩嗶哩，干杯！"
                },
                {
                  "time": 280.269,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厚礼蟹"
                },
                {
                  "time": 281.951,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "真的逆天"
                },
                {
                  "time": 282.034,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "开始逆天了"
                },
                {
                  "time": 282.478,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 282.706,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "哇塞？！"
                },
                {
                  "time": 282.865,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "喔哦"
                },
                {
                  "time": 283.179,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "滑了"
                },
                {
                  "time": 283.866,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fe0302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fe0302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我们就是 AuA"
                },
                {
                  "time": 284.478,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "今摄凡桌"
                },
                {
                  "time": 284.84,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你这不看得聚精会神的（"
                },
                {
                  "time": 284.907,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不要逃避！不要逃避！不要逃避！"
                },
                {
                  "time": 285.079,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我劝你懂事，你不看我们也要看呢"
                },
                {
                  "time": 285.111,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不能逃避，不能逃避！"
                },
                {
                  "time": 285.138,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 285.622,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你不看我们要看啊"
                },
                {
                  "time": 286.094,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你不看我看"
                },
                {
                  "time": 286.178,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么x无能男主"
                },
                {
                  "time": 286.343,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这不看简直禽兽不如啊"
                },
                {
                  "time": 286.979,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你干嘛闭眼啊"
                },
                {
                  "time": 288.423,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我劝你快点看"
                },
                {
                  "time": 289.278,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我看我看"
                },
                {
                  "time": 291.429,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我要看我要看"
                },
                {
                  "time": 291.503,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我劝你快点看"
                },
                {
                  "time": 291.727,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "女生真的会直接拖到地上嘛？"
                },
                {
                  "time": 291.814,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我还没长大"
                },
                {
                  "time": 292.059,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "鸡汤来咯"
                },
                {
                  "time": 292.462,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "........."
                },
                {
                  "time": 293.078,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我可不老实哦"
                },
                {
                  "time": 294.202,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "扔地上？"
                },
                {
                  "time": 294.989,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你不看，我看啊（愤怒）"
                },
                {
                  "time": 295.207,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不会，一般会找个地方放"
                },
                {
                  "time": 295.713,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我看你别劝"
                },
                {
                  "time": 297.279,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e2027f",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e2027f",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "坐等bd"
                },
                {
                  "time": 297.951,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "君子都防？"
                },
                {
                  "time": 298.216,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "可恶居然不信任我"
                },
                {
                  "time": 298.376,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "？？"
                },
                {
                  "time": 298.486,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "AT-X預定"
                },
                {
                  "time": 299.367,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "果然是安全版"
                },
                {
                  "time": 300.277,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不把我们当兄弟是吧"
                },
                {
                  "time": 306.474,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 310.218,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "求此时男主视角"
                },
                {
                  "time": 315.387,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "经典小凳子"
                },
                {
                  "time": 316.168,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我天生神力啊"
                },
                {
                  "time": 316.566,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "镜子预定"
                },
                {
                  "time": 326.001,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了"
                },
                {
                  "time": 327.27,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厚礼谢"
                },
                {
                  "time": 327.362,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 327.89,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 327.939,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "让我来！！！"
                },
                {
                  "time": 329.134,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆！"
                },
                {
                  "time": 329.514,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天啊"
                },
                {
                  "time": 329.669,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "爺，真可愛"
                },
                {
                  "time": 330.244,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厚礼谢"
                },
                {
                  "time": 330.277,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 330.679,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "嗶哩嗶哩永远的神"
                },
                {
                  "time": 331.051,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "哈哈哈哈"
                },
                {
                  "time": 331.195,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 331.399,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 331.585,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "让我来"
                },
                {
                  "time": 331.623,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#a0ea",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#a0ea",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "F扭头"
                },
                {
                  "time": 333.594,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "呃呃 逆天"
                },
                {
                  "time": 334.199,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 334.397,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 335.141,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "还行"
                },
                {
                  "time": 337.573,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 338.496,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 339.43,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "就离谱。。。。。"
                },
                {
                  "time": 339.795,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "别把咱当外人啊"
                },
                {
                  "time": 339.917,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我测"
                },
                {
                  "time": 340.099,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "换成创口贴不更好"
                },
                {
                  "time": 340.498,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "硬核馬賽克"
                },
                {
                  "time": 341.092,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "像！很像啊"
                },
                {
                  "time": 341.235,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 341.477,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厚礼蟹"
                },
                {
                  "time": 342.577,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffff00",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffff00",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我这个盲人都防？"
                },
                {
                  "time": 342.658,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这角度"
                },
                {
                  "time": 343.074,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "嗶哩嗶哩永远的神"
                },
                {
                  "time": 343.173,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "看来是安全版了"
                },
                {
                  "time": 343.516,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "呃呃"
                },
                {
                  "time": 343.984,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我好羡慕"
                },
                {
                  "time": 344.504,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好棒的肉感！"
                },
                {
                  "time": 345.329,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这当然舒服啊！"
                },
                {
                  "time": 346.09,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "真厚礼蟹"
                },
                {
                  "time": 346.196,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "离谱"
                },
                {
                  "time": 346.806,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 348.727,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你最好说的是尾巴（"
                },
                {
                  "time": 349.509,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 349.864,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这肉感"
                },
                {
                  "time": 350.157,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "简直离谱"
                },
                {
                  "time": 350.879,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好耶"
                },
                {
                  "time": 351.425,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 351.869,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 352.439,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "呃呃"
                },
                {
                  "time": 352.525,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厚礼谢"
                },
                {
                  "time": 352.764,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 352.859,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这番能活到放完吗"
                },
                {
                  "time": 352.943,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 353.121,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 353.33,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 353.401,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 353.725,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 353.941,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 354.199,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 354.393,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "没挡住"
                },
                {
                  "time": 354.599,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "在此停顿"
                },
                {
                  "time": 354.619,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你填"
                },
                {
                  "time": 354.62,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 354.89,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这里没挡住啊）"
                },
                {
                  "time": 354.961,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "还会抖，厚礼蟹"
                },
                {
                  "time": 355.131,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 355.153,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 355.321,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 355.447,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么动静"
                },
                {
                  "time": 356.584,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 356.719,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 357.769,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "请问这里是哔哩哔哩吗？"
                },
                {
                  "time": 357.852,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 357.877,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这番能活到放完吗"
                },
                {
                  "time": 358.916,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我当时就带起了耳机"
                },
                {
                  "time": 360.514,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "谁洗澡用这么热的水啊喂"
                },
                {
                  "time": 360.951,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "过于逆天"
                },
                {
                  "time": 361.633,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你为什么这么熟练啊"
                },
                {
                  "time": 362.11,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这手势太懂了"
                },
                {
                  "time": 362.153,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这是嗶哩嗶哩吧？"
                },
                {
                  "time": 362.439,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "谁组队圣骑了赶紧踢了"
                },
                {
                  "time": 362.632,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你最好是尾巴在动"
                },
                {
                  "time": 363.387,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 363.835,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 364.16,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "阿尔丹别这样"
                },
                {
                  "time": 364.842,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "离大谱"
                },
                {
                  "time": 365.133,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "哔哩哔哩"
                },
                {
                  "time": 365.217,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "君子夜访？"
                },
                {
                  "time": 365.493,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 365.696,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "這還能活到第2集"
                },
                {
                  "time": 366.151,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffff00",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffff00",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "嗶哩嗶哩"
                },
                {
                  "time": 366.615,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "谁组的圣骑 踢了"
                },
                {
                  "time": 368.855,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这是否"
                },
                {
                  "time": 371.728,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "原来是柯基"
                },
                {
                  "time": 373.085,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fe0302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fe0302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "明天给你断尾"
                },
                {
                  "time": 373.799,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "嗶哩嗶哩，而你，你才是真正的英雄！！！！！！！！！"
                },
                {
                  "time": 374.286,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "柯基？"
                },
                {
                  "time": 374.439,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "居然是柯基，而且还没断尾！"
                },
                {
                  "time": 375.425,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "柯基"
                },
                {
                  "time": 378.671,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "长尾柯基"
                },
                {
                  "time": 380.403,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 381.551,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fe0302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fe0302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你这明明是光明正大地看着"
                },
                {
                  "time": 382.381,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "“见艳心动，记大过一次”"
                },
                {
                  "time": 382.681,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 382.753,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "谁组的圣骑,t了"
                },
                {
                  "time": 383.061,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "胡适之啊胡适之！你怎能如此堕落！"
                },
                {
                  "time": 385.592,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "就看就看"
                },
                {
                  "time": 385.638,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "就决定是你了，大比鸟，使用清雾"
                },
                {
                  "time": 386.055,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "柯基可爱捏"
                },
                {
                  "time": 386.255,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "就看就看"
                },
                {
                  "time": 386.446,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你不是正大光明的看?"
                },
                {
                  "time": 387.851,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你这是偷看吗！你这是偷看吗！！！"
                },
                {
                  "time": 388.564,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "只能完结等BD了"
                },
                {
                  "time": 390.449,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你不看让我来"
                },
                {
                  "time": 390.743,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "一起看一起看"
                },
                {
                  "time": 391.011,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "螺旋丸"
                },
                {
                  "time": 393.13,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "蒸血"
                },
                {
                  "time": 393.701,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "混账这么多雾给谁看啊"
                },
                {
                  "time": 393.911,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "谁组的圣骑！"
                },
                {
                  "time": 395.836,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "誰這麼愛組聖騎的踢了好嗎"
                },
                {
                  "time": 396.332,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "就看就看"
                },
                {
                  "time": 398.425,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "就喜欢看"
                },
                {
                  "time": 398.812,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "AT-X，启动！[]doge]"
                },
                {
                  "time": 399.587,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "赶紧踢了"
                },
                {
                  "time": 400.188,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "说着不偷看"
                },
                {
                  "time": 400.621,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "nice角度"
                },
                {
                  "time": 400.658,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "反對霧化"
                },
                {
                  "time": 402.367,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这没画吧这是"
                },
                {
                  "time": 402.635,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我屏幕怎么坏了"
                },
                {
                  "time": 403.1,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 404.173,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这从头看到尾啊"
                },
                {
                  "time": 405.695,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "bgm？"
                },
                {
                  "time": 408.857,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 409.079,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "全是霧和泡 看啥啊"
                },
                {
                  "time": 409.118,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么bgm"
                },
                {
                  "time": 409.178,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "也画太多分镜了吧（doge)"
                },
                {
                  "time": 409.32,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好燃的音乐阿"
                },
                {
                  "time": 409.983,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "洗澡整个bgm可还行"
                },
                {
                  "time": 410.043,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么鬼bgm"
                },
                {
                  "time": 410.103,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "还挺流畅"
                },
                {
                  "time": 410.837,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "是啊"
                },
                {
                  "time": 411.177,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "无限立直"
                },
                {
                  "time": 411.26,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "光明正大地看"
                },
                {
                  "time": 411.568,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "激斗bgm"
                },
                {
                  "time": 412.155,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "bgm这么燃搞毛啊"
                },
                {
                  "time": 412.272,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fe0302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fe0302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "真要认真放这么长时间吗（害羞）"
                },
                {
                  "time": 412.38,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "多机位是吧"
                },
                {
                  "time": 413.064,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好燃的洗澡"
                },
                {
                  "time": 413.311,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 413.319,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "搁这拍泻真呢"
                },
                {
                  "time": 413.679,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "洗澡为什么这么热血啊？"
                },
                {
                  "time": 415.416,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "燃起了了"
                },
                {
                  "time": 416.335,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "天冷了，好好洗澡"
                },
                {
                  "time": 417.111,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 417.917,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太热血了"
                },
                {
                  "time": 419.015,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 420.024,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我不好说"
                },
                {
                  "time": 420.057,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太热血了"
                },
                {
                  "time": 420.837,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "制作组指定有什么副业"
                },
                {
                  "time": 423.808,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厚礼蟹"
                },
                {
                  "time": 423.975,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#cc0273",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#cc0273",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你小子分明就是目不转睛阿"
                },
                {
                  "time": 424.297,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "有没有可能这就是副业"
                },
                {
                  "time": 424.73,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "靠持续这么长时间"
                },
                {
                  "time": 425.092,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太热血了"
                },
                {
                  "time": 425.538,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "有主業跑來接私活 "
                },
                {
                  "time": 426.258,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "大家AT- X见吧"
                },
                {
                  "time": 426.261,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "制作组指定有什么副业"
                },
                {
                  "time": 427.453,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "既然不给大伙看就洗快点"
                },
                {
                  "time": 428.409,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太然了"
                },
                {
                  "time": 429.181,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这不是什么都没看到吗（怒"
                },
                {
                  "time": 429.658,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "前面的，作者上岸的作品。还真就是副业。"
                },
                {
                  "time": 430.197,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "有必要这么长的镜头吗"
                },
                {
                  "time": 431.771,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "扯，从头看到尾了"
                },
                {
                  "time": 431.906,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你目不转睛的样子真的很狼狈doge"
                },
                {
                  "time": 433.263,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "老妈开下抽风机"
                },
                {
                  "time": 433.293,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#f0ab2a",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#f0ab2a",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "让我康康"
                },
                {
                  "time": 434.395,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么偷看，我这是光明正大的看"
                },
                {
                  "time": 434.768,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "光明正大的看是吧"
                },
                {
                  "time": 435.498,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "比鋸燃"
                },
                {
                  "time": 435.583,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "想要身体好，要洗冷水澡"
                },
                {
                  "time": 437.121,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "<欢快的BGM>"
                },
                {
                  "time": 441.488,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不愧是逆天番"
                },
                {
                  "time": 442.901,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "光明正大的看是吧"
                },
                {
                  "time": 444.112,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "坐等下一集跟媽媽洗澡"
                },
                {
                  "time": 446.379,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么啊，原来这是制作组的副业啊？"
                },
                {
                  "time": 447.442,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "可憐，那只能看"
                },
                {
                  "time": 448.538,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e2027f",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e2027f",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "身在辐中不知福"
                },
                {
                  "time": 448.559,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "制作组指定有副业"
                },
                {
                  "time": 449.966,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "云遮雾罩"
                },
                {
                  "time": 450.406,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "作者主业在大海里"
                },
                {
                  "time": 451.201,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这特写。"
                },
                {
                  "time": 451.67,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "错误的 谁说只能看呢"
                },
                {
                  "time": 452.286,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "错误的，能上的"
                },
                {
                  "time": 452.946,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这么久的洗澡镜头的番真少有啊，台词还少，全靠画面"
                },
                {
                  "time": 454.889,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "谁组的圣骑，我绝对不会对你怎么样（磨刀"
                },
                {
                  "time": 459.538,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你不看我看（doge）"
                },
                {
                  "time": 461.699,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "高质量洗澡了属于是"
                },
                {
                  "time": 462.719,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厚礼蟹"
                },
                {
                  "time": 463.03,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 465.068,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "洗澡水喝个够"
                },
                {
                  "time": 466.199,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#9843",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#9843",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "懂了，男主是摄像头"
                },
                {
                  "time": 467.983,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "真的这么弹嘛"
                },
                {
                  "time": 471.267,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "等BD"
                },
                {
                  "time": 475.369,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "画晕了"
                },
                {
                  "time": 475.69,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这视角"
                },
                {
                  "time": 476.506,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我也盯着那里移不开"
                },
                {
                  "time": 481.154,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "POV"
                },
                {
                  "time": 485.777,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fe0302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fe0302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "上摩打了"
                },
                {
                  "time": 487.419,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好……好鬼畜"
                },
                {
                  "time": 487.698,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好……好鬼畜"
                },
                {
                  "time": 489.958,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好鬼畜啊"
                },
                {
                  "time": 490.309,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fe0302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fe0302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "发动机是吧"
                },
                {
                  "time": 490.49,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 490.511,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#cd00",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#cd00",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "突然鬼畜"
                },
                {
                  "time": 491.381,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 491.477,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "？？"
                },
                {
                  "time": 491.543,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么鬼畜动作"
                },
                {
                  "time": 491.919,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好鬼畜"
                },
                {
                  "time": 492.186,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 492.351,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这动作…"
                },
                {
                  "time": 492.424,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "阿尔丹别这样"
                },
                {
                  "time": 492.57,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太鬼畜啦23333"
                },
                {
                  "time": 493.354,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "便宜制作"
                },
                {
                  "time": 494.054,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 497.534,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪！"
                },
                {
                  "time": 497.689,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "日本人终于。。。"
                },
                {
                  "time": 497.901,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不愧是木更代餐（"
                },
                {
                  "time": 498.375,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "经费在洗澡用完了是吧"
                },
                {
                  "time": 498.599,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪酱"
                },
                {
                  "time": 498.685,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什麼石磯娘娘？"
                },
                {
                  "time": 498.947,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 499.157,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我开加速了？"
                },
                {
                  "time": 499.565,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "呃呃"
                },
                {
                  "time": 500.959,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪！"
                },
                {
                  "time": 501.263,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "石矶娘娘"
                },
                {
                  "time": 501.37,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "犬饲同学坏掉了！！"
                },
                {
                  "time": 501.501,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 502.054,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffff00",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffff00",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 502.408,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪！"
                },
                {
                  "time": 502.45,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "坏掉了"
                },
                {
                  "time": 502.486,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "怎麼還沒變回人形"
                },
                {
                  "time": 502.609,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "靠北噢"
                },
                {
                  "time": 503.203,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 503.212,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "突然发电"
                },
                {
                  "time": 503.398,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "wc，哔哩哔哩你是我的超人"
                },
                {
                  "time": 504.254,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "阿尔丹？"
                },
                {
                  "time": 505.069,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪！"
                },
                {
                  "time": 506.598,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "旺旺旺"
                },
                {
                  "time": 507.005,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 507.755,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 508.015,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 508.25,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "鼻子很敏感的啊"
                },
                {
                  "time": 508.583,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "过于逆天，两眼一黑"
                },
                {
                  "time": 508.71,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "牙白这女主牙白"
                },
                {
                  "time": 508.766,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 508.815,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆大天"
                },
                {
                  "time": 508.925,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 509.005,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "??"
                },
                {
                  "time": 509.01,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffff00",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffff00",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "可惡！！！可惡！！！"
                },
                {
                  "time": 509.074,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆大天"
                },
                {
                  "time": 509.075,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "女主喜欢兽是吧"
                },
                {
                  "time": 509.178,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "？？"
                },
                {
                  "time": 509.414,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天邪神"
                },
                {
                  "time": 509.437,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "石叽娘娘是吧"
                },
                {
                  "time": 509.625,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 509.768,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 509.802,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆大天"
                },
                {
                  "time": 509.941,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "生来就是要被麻麻吃掉的"
                },
                {
                  "time": 509.954,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "真的会这样吗"
                },
                {
                  "time": 509.998,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这样的女主太棒了"
                },
                {
                  "time": 510.182,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 510.222,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你這行為我只能說究極逆天"
                },
                {
                  "time": 510.415,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厚礼蟹"
                },
                {
                  "time": 510.437,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 510.472,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天，这属实逆天"
                },
                {
                  "time": 510.536,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆大天"
                },
                {
                  "time": 510.691,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我需要一个比逆天更逆天的词"
                },
                {
                  "time": 510.781,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么石叽娘娘"
                },
                {
                  "time": 511.288,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了，而且好穷"
                },
                {
                  "time": 511.309,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我测！"
                },
                {
                  "time": 511.561,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 511.677,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "啊？"
                },
                {
                  "time": 511.739,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "！！！"
                },
                {
                  "time": 511.741,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了"
                },
                {
                  "time": 511.994,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 512.031,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我滴天!"
                },
                {
                  "time": 512.039,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 512.253,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我不能说"
                },
                {
                  "time": 512.296,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 512.363,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 512.386,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 512.435,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了"
                },
                {
                  "time": 512.465,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 512.581,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我头发"
                },
                {
                  "time": 512.606,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "犬饲贵丈"
                },
                {
                  "time": 512.613,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 512.621,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 512.78,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆大天！"
                },
                {
                  "time": 512.821,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我的天啊，这里是那个bilibili吗"
                },
                {
                  "time": 512.946,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "wtf"
                },
                {
                  "time": 512.959,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e2027f",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e2027f",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我宣布这部番的逆天程度已经超越恋爱flops了"
                },
                {
                  "time": 512.977,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 513.022,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天 （指女主"
                },
                {
                  "time": 513.118,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这妹纸指定有啥大饼"
                },
                {
                  "time": 513.272,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 513.361,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 513.386,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这舌头太涩了吧"
                },
                {
                  "time": 513.437,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 513.623,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天呀"
                },
                {
                  "time": 513.655,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 513.731,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "想知道作者精神状态"
                },
                {
                  "time": 513.918,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "？！？！？！？！"
                },
                {
                  "time": 513.975,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "玩挺花"
                },
                {
                  "time": 514.037,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天！"
                },
                {
                  "time": 514.116,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 514.208,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "大家不要学 有传染疾病风险"
                },
                {
                  "time": 514.282,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这究竟是什么啊？!"
                },
                {
                  "time": 514.396,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffff00",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffff00",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 514.471,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了"
                },
                {
                  "time": 514.619,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "靠北哦"
                },
                {
                  "time": 514.639,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "呃呃"
                },
                {
                  "time": 514.747,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天逆天"
                },
                {
                  "time": 514.789,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 514.906,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这是否"
                },
                {
                  "time": 514.987,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 515.286,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 515.401,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 515.508,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 515.55,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 515.627,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 515.641,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 515.779,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "呃呃呃"
                },
                {
                  "time": 515.807,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 515.964,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffaa02",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffaa02",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我已经习惯了"
                },
                {
                  "time": 516.001,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 516.033,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "制作组制定有什么副业"
                },
                {
                  "time": 516.04,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "按1查询作者精神状态"
                },
                {
                  "time": 516.068,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 516.11,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 516.156,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了"
                },
                {
                  "time": 516.257,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 516.288,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 516.581,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 516.613,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "wtf"
                },
                {
                  "time": 516.684,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 516.835,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "她都叫犬饲了，倒也正常"
                },
                {
                  "time": 516.923,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 517.013,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 517.069,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 517.201,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "发生甚么事了"
                },
                {
                  "time": 517.467,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "想看制作组的副业"
                },
                {
                  "time": 517.479,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "恋爱flops救一下啊！"
                },
                {
                  "time": 517.482,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 517.569,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 517.6,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 517.652,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天，太逆天了"
                },
                {
                  "time": 517.674,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 517.923,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 518.018,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 518.019,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 518.079,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这是哔哩哔哩？"
                },
                {
                  "time": 518.093,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 518.134,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 518.39,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天中的逆天"
                },
                {
                  "time": 518.426,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 518.554,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "wtf"
                },
                {
                  "time": 518.57,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "憋在这里发电"
                },
                {
                  "time": 518.908,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我也想問這是怎樣"
                },
                {
                  "time": 519.11,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 519.144,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 519.207,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 519.487,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 519.995,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 520.184,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 520.425,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 520.793,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 520.865,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太牛了"
                },
                {
                  "time": 521.225,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "爱城华恋"
                },
                {
                  "time": 521.24,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 521.327,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 521.358,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffff00",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffff00",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "说实话我不是很明白这部番在表世界有什么意义…"
                },
                {
                  "time": 521.913,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "wtf"
                },
                {
                  "time": 522.011,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 522.375,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "华恋幻听（）"
                },
                {
                  "time": 522.961,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 522.974,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 523.933,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 524.515,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么逆天视角"
                },
                {
                  "time": 524.645,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 526.301,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "说实话真的会有人做这种动作吗，离谱"
                },
                {
                  "time": 527.156,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "就不怕传染病？？"
                },
                {
                  "time": 529.128,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "离谱"
                },
                {
                  "time": 530.227,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么人寿"
                },
                {
                  "time": 532.365,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 535.599,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 535.933,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "Wc "
                },
                {
                  "time": 537.198,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我擦"
                },
                {
                  "time": 538.451,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这是什么副业番"
                },
                {
                  "time": 538.621,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "亲猫的视频很多"
                },
                {
                  "time": 539.501,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "如果男主掉毛了"
                },
                {
                  "time": 547.669,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "小白：？"
                },
                {
                  "time": 549.982,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "吾竟有枭雄之志"
                },
                {
                  "time": 550.399,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太太发型很危险捏"
                },
                {
                  "time": 551.488,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这是姐姐吧"
                },
                {
                  "time": 553.081,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "還沒取ID"
                },
                {
                  "time": 556.827,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "丞相我悟了"
                },
                {
                  "time": 561.207,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#66ccff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#66ccff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "会不会做绝育啊…"
                },
                {
                  "time": 562.173,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好鬼畜的动作……."
                },
                {
                  "time": 562.325,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "莱拉，你座啊！"
                },
                {
                  "time": 563.857,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "看得出来动作很生硬，一定是因为还不适应新的身体吧（"
                },
                {
                  "time": 567.792,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "抖水都不会，女主没觉得很奇怪么"
                },
                {
                  "time": 568.429,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "可爱捏"
                },
                {
                  "time": 569.146,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "估计要做绝育"
                },
                {
                  "time": 571.509,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "前面的哈哈"
                },
                {
                  "time": 573.118,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "莱纳，你坐啊（雾"
                },
                {
                  "time": 573.677,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "犬夜叉"
                },
                {
                  "time": 574.479,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "犬夜叉是吧？"
                },
                {
                  "time": 574.81,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "犬 夜 叉"
                },
                {
                  "time": 578.622,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这几个小表情好木更啊"
                },
                {
                  "time": 581.536,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你坐啊"
                },
                {
                  "time": 588.936,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "那不是更好吗"
                },
                {
                  "time": 591.377,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "一旦接受了这种设定"
                },
                {
                  "time": 591.7,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "已經是了 兄弟"
                },
                {
                  "time": 594.307,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "那不是正好"
                },
                {
                  "time": 594.499,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不也挺好吗"
                },
                {
                  "time": 598.919,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 599.413,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#f0ab2a",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#f0ab2a",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "别抵抗了，投了吧！"
                },
                {
                  "time": 599.738,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffff00",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffff00",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "身體還是很誠實的嘛。"
                },
                {
                  "time": 601.341,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "一旦接受了这种设定"
                },
                {
                  "time": 602.3,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "大丈夫能屈能伸"
                },
                {
                  "time": 602.768,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你坐啊"
                },
                {
                  "time": 602.78,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不争气啊"
                },
                {
                  "time": 602.823,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#cc0273",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#cc0273",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "哦卡哇一阔头"
                },
                {
                  "time": 603.346,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fe0302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fe0302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "女王 (bushi"
                },
                {
                  "time": 603.757,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "口嫌體正直，身體還是很誠實的嘛"
                },
                {
                  "time": 604.469,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fe0302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fe0302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "啊，这眼神，汪汪汪"
                },
                {
                  "time": 605.039,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "延迟有点高啊"
                },
                {
                  "time": 606.548,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 609.086,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "坐下 握手 金金"
                },
                {
                  "time": 609.57,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#cc0273",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#cc0273",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "堕落了"
                },
                {
                  "time": 610.565,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "完了，坏女人"
                },
                {
                  "time": 615.561,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪"
                },
                {
                  "time": 615.748,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "支配恶魔"
                },
                {
                  "time": 617.862,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "犬堕了"
                },
                {
                  "time": 622.203,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "犬堕（"
                },
                {
                  "time": 622.421,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 625.015,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了这个番"
                },
                {
                  "time": 626.462,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 627.894,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "mkm"
                },
                {
                  "time": 628.416,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这不也挺好的嘛"
                },
                {
                  "time": 628.487,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffff00",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffff00",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "伸出去了，男人的底線就沒了！！！"
                },
                {
                  "time": 628.519,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 628.58,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "怎么感觉很悲壮？"
                },
                {
                  "time": 628.705,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我还以为要弹他蛋蛋了"
                },
                {
                  "time": 628.733,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "犬堕也太逆天了"
                },
                {
                  "time": 628.863,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了"
                },
                {
                  "time": 629.393,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天 终于疯了日本人"
                },
                {
                  "time": 629.959,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 629.997,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我的天哪"
                },
                {
                  "time": 630.219,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 630.306,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 631.037,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "犬墮"
                },
                {
                  "time": 631.29,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太沉重了"
                },
                {
                  "time": 631.611,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了，1月最逆天的番出现了"
                },
                {
                  "time": 632.326,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "出息了你"
                },
                {
                  "time": 633.281,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了"
                },
                {
                  "time": 633.662,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 633.981,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这不也挺好的嘛"
                },
                {
                  "time": 634.842,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "乐死"
                },
                {
                  "time": 634.855,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了"
                },
                {
                  "time": 635.495,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这番的配乐，我认可了（"
                },
                {
                  "time": 636.077,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这个配乐太出戏了"
                },
                {
                  "time": 636.289,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 637.224,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 637.471,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "钩爪"
                },
                {
                  "time": 637.707,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "汪汪汪汪"
                },
                {
                  "time": 638.135,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 638.261,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fe0302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fe0302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "握住了未来"
                },
                {
                  "time": 640.119,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "為什麼說得這麼悲慘啊www"
                },
                {
                  "time": 640.381,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你就是做这个的料"
                },
                {
                  "time": 641.115,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "人类是有极限的"
                },
                {
                  "time": 641.115,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "哒卡啦 我不做人了！犬饲同学！"
                },
                {
                  "time": 641.614,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了"
                },
                {
                  "time": 642.696,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "与其说是涩涩 不如说是逆天"
                },
                {
                  "time": 644.616,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffff00",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffff00",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "這男人不做也罷了"
                },
                {
                  "time": 645.343,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天啊"
                },
                {
                  "time": 645.741,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好悲慘的故事"
                },
                {
                  "time": 645.882,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "意味不明的感动"
                },
                {
                  "time": 645.939,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我不做人了"
                },
                {
                  "time": 647.178,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了！日本人终于疯了"
                },
                {
                  "time": 649.039,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆大天"
                },
                {
                  "time": 650.36,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e2027f",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e2027f",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "回不去了 疯了疯了"
                },
                {
                  "time": 652.713,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "疯了……不做人了是吧？"
                },
                {
                  "time": 652.815,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不也...挺好的吗（doge）"
                },
                {
                  "time": 653.309,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "泪目（？）"
                },
                {
                  "time": 653.376,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我不做人啦！"
                },
                {
                  "time": 654.329,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "日本人真的疯了"
                },
                {
                  "time": 654.427,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "疯了疯了"
                },
                {
                  "time": 654.707,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "下集绝育"
                },
                {
                  "time": 655.453,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "啵奇塔：世另我"
                },
                {
                  "time": 655.478,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 655.762,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "这下电次真的成汪了（doge"
                },
                {
                  "time": 656.092,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "电次的梦想，就由我波奇太来实现"
                },
                {
                  "time": 656.211,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fe0302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fe0302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "但它没有链锯欸"
                },
                {
                  "time": 656.807,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "日本人真的疯了"
                },
                {
                  "time": 656.944,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "电锯恶魔"
                },
                {
                  "time": 657.525,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "波奇塔？"
                },
                {
                  "time": 657.634,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "桀桀，波奇太多力"
                },
                {
                  "time": 657.732,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "又一个波奇（"
                },
                {
                  "time": 657.805,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "电次：6"
                },
                {
                  "time": 657.991,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "骉：马上到你家门口"
                },
                {
                  "time": 658.001,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "波奇塔:6"
                },
                {
                  "time": 658.079,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "电次：？"
                },
                {
                  "time": 658.387,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "电次：6"
                },
                {
                  "time": 658.511,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "哈哈哈 又是波奇"
                },
                {
                  "time": 658.835,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "桀桀，波奇太多了"
                },
                {
                  "time": 659.046,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "什么电锯恶魔"
                },
                {
                  "time": 659.061,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "又一个波奇塔（"
                },
                {
                  "time": 659.089,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "哈哈哈哈哈电次"
                },
                {
                  "time": 659.125,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "又是一个波奇 "
                },
                {
                  "time": 659.278,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "？草"
                },
                {
                  "time": 659.442,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你也叫啵奇塔？"
                },
                {
                  "time": 659.545,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你也是波奇塔？"
                },
                {
                  "time": 659.712,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "电次：？"
                },
                {
                  "time": 659.845,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你也想当电锯恶魔？"
                },
                {
                  "time": 659.9,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "波奇塔“6"
                },
                {
                  "time": 659.956,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "回不去了"
                },
                {
                  "time": 659.992,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "波奇"
                },
                {
                  "time": 660.351,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "波奇塔：？"
                },
                {
                  "time": 660.392,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "电次：你最好有事"
                },
                {
                  "time": 660.607,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#f0ab2a",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#f0ab2a",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "病友局"
                },
                {
                  "time": 660.819,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "啊，我波奇了 杀手皇后"
                },
                {
                  "time": 660.961,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好喝好喝好喝好喝"
                },
                {
                  "time": 661.501,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e2027f",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e2027f",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "马洼路马洼路"
                },
                {
                  "time": 661.558,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "不是小太吗"
                },
                {
                  "time": 661.876,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffff00",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffff00",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "捏麻麻的，一集就洗了个澡是吧？"
                },
                {
                  "time": 661.895,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "电次：6"
                },
                {
                  "time": 662.987,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好涩好涩好涩好涩好涩wow~~"
                },
                {
                  "time": 663.3,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "house！house！house！house！"
                },
                {
                  "time": 663.364,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "啵奇塔是吧"
                },
                {
                  "time": 663.393,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e70012",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e70012",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好饰好饰好饰好饰"
                },
                {
                  "time": 663.393,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e2027f",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e2027f",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好饰好饰好饰好饰"
                },
                {
                  "time": 663.393,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好饰好饰好饰好饰"
                },
                {
                  "time": 663.393,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#a0ea",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#a0ea",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好饰好饰好饰好饰"
                },
                {
                  "time": 663.687,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "你也是波奇塔？"
                },
                {
                  "time": 663.891,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太逆天了"
                },
                {
                  "time": 664.039,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#9843",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#9843",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "但是我没有电锯"
                },
                {
                  "time": 664.261,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "日本人终于疯了"
                },
                {
                  "time": 664.509,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#f0ab2a",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#f0ab2a",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "我去！后宫露营！"
                },
                {
                  "time": 664.897,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "妈瓦鲁，妈瓦鲁"
                },
                {
                  "time": 665.298,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "電次: ?"
                },
                {
                  "time": 665.894,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "日本人终于疯了"
                },
                {
                  "time": 666.192,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 666.77,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#e2027f",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#e2027f",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "马洼路马洼路"
                },
                {
                  "time": 667.271,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "电次：6"
                },
                {
                  "time": 667.867,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "house"
                },
                {
                  "time": 667.938,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好se好se好se"
                },
                {
                  "time": 668.09,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "后藤邑子？垃姬兔？"
                },
                {
                  "time": 668.551,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "妈妈果然是后藤邑子"
                },
                {
                  "time": 668.925,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "果然是1096"
                },
                {
                  "time": 668.966,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "？？波奇？？"
                },
                {
                  "time": 669.493,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "霓虹人终于还是疯了"
                },
                {
                  "time": 669.778,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好se好se好se"
                },
                {
                  "time": 669.866,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天"
                },
                {
                  "time": 669.975,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太可悲了"
                },
                {
                  "time": 670.28,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "耗死"
                },
                {
                  "time": 673.823,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好瑟"
                },
                {
                  "time": 673.918,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "为什么这么短"
                },
                {
                  "time": 674.639,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好短啊~"
                },
                {
                  "time": 676.667,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "逆天番追了"
                },
                {
                  "time": 677.203,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "好短"
                },
                {
                  "time": 680.653,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "喜欢"
                },
                {
                  "time": 684.466,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "金发败犬出场"
                },
                {
                  "time": 685.127,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#fef102",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#fef102",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "ksks"
                },
                {
                  "time": 685.424,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "国漫是吧这么短"
                },
                {
                  "time": 690.422,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "ksksじぁない，ksmです!"
                },
                {
                  "time": 691.086,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffd302",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffd302",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "太短了不够看"
                },
                {
                  "time": 702.272,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "厂长你在干什么啊厂长"
                },
                {
                  "time": 703.207,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "ksks"
                },
                {
                  "time": 704.107,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "ksks？？"
                },
                {
                  "time": 705.144,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "ksks"
                },
                {
                  "time": 705.445,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "ksks"
                },
                {
                  "time": 715.264,
                  "mode": "top",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "了解你的捍卫者"
                },
                {
                  "time": 718.103,
                  "mode": "rtl",
                  "style": {
                    "fontSize": "22px",
                    "color": "#ffffff",
                    "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                    "font": "22px sans-serif",
                    "fillStyle": "#ffffff",
                    "strokeStyle": "#000",
                    "lineWidth": 2
                  },
                  "text": "最左邊那位是我的呦！"
                }
            ]
        });
    }

	Init() {
		console.log("%cBkmPlayer%c Version " + this.version + " Powered by FlxSNX (一个乱糟糟&功能不完善的视频播放器)", 'font-family:"微软雅黑";color:#5959bb;font-size:48px;text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);', 'font-size:12px;color:#666;font-family: "微软雅黑";');
		/* this.container.innerHTML = '<div id="bkmplayer"><div class="danmaku"></div><div class="loading"><div class="info"></div></div><div class="loading_2"><svg x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve"><path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(338.83 25 25)"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform></path></svg></div><div class="playicon"></div><div class="logo"><img></div><div class="tips"><span></span></div><div class="timetips"><span></span></div><div class="warp"><video playsinline x5-playsinline webkit-playsinline preload="metadata"></video></div><div class="control"><div class="action"><div class="btn-play"><span></span></div><div class="btn-next"><span></span></div><div class="time"><span>00:00</span> / <span>00:00</span></div><div class="fullscreen"><span></span></div></div><div class="progress"><div class="current"><div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);"><defs><clipPath id="__lottie_element_25"><rect width="18" height="18" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_25)"><g transform="matrix(1,0,0,1,8.937000274658203,8.25)" opacity="0.14" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0.07500000298023224,1.2130000591278076)"><path fill="rgb(251,114,153)" fill-opacity="1" d=" M9,-3.5 C9,-3.5 9,3.5 9,3.5 C9,5.707600116729736 7.207600116729736,7.5 5,7.5 C5,7.5 -5,7.5 -5,7.5 C-7.207600116729736,7.5 -9,5.707600116729736 -9,3.5 C-9,3.5 -9,-3.5 -9,-3.5 C-9,-5.707600116729736 -7.207600116729736,-7.5 -5,-7.5 C-5,-7.5 5,-7.5 5,-7.5 C7.207600116729736,-7.5 9,-5.707600116729736 9,-3.5z"></path></g></g><g transform="matrix(1,0,0,1,9.140999794006348,8.67199993133545)" opacity="0.28" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,-0.1509999930858612,0.7990000247955322)"><path fill="rgb(251,114,153)" fill-opacity="1" d=" M8,-3 C8,-3 8,3 8,3 C8,4.931650161743164 6.431650161743164,6.5 4.5,6.5 C4.5,6.5 -4.5,6.5 -4.5,6.5 C-6.431650161743164,6.5 -8,4.931650161743164 -8,3 C-8,3 -8,-3 -8,-3 C-8,-4.931650161743164 -6.431650161743164,-6.5 -4.5,-6.5 C-4.5,-6.5 4.5,-6.5 4.5,-6.5 C6.431650161743164,-6.5 8,-4.931650161743164 8,-3z"></path></g></g><g transform="matrix(0.9883429408073425,-0.7275781631469727,0.6775955557823181,0.920446515083313,7.3224687576293945,-0.7606706619262695)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(0.9937776327133179,-0.11138220876455307,0.11138220876455307,0.9937776327133179,-2.5239999294281006,1.3849999904632568)"><path fill="rgb(0,0,0)" fill-opacity="1" d=" M0.75,-1.25 C0.75,-1.25 0.75,1.25 0.75,1.25 C0.75,1.663925051689148 0.4139249920845032,2 0,2 C0,2 0,2 0,2 C-0.4139249920845032,2 -0.75,1.663925051689148 -0.75,1.25 C-0.75,1.25 -0.75,-1.25 -0.75,-1.25 C-0.75,-1.663925051689148 -0.4139249920845032,-2 0,-2 C0,-2 0,-2 0,-2 C0.4139249920845032,-2 0.75,-1.663925051689148 0.75,-1.25z"></path></g></g><g transform="matrix(1.1436611413955688,0.7535901665687561,-0.6317168474197388,0.9587040543556213,16.0070743560791,2.902894973754883)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(0.992861807346344,0.1192704513669014,-0.1192704513669014,0.992861807346344,-2.5239999294281006,1.3849999904632568)"><path fill="rgb(0,0,0)" fill-opacity="1" d=" M0.75,-1.25 C0.75,-1.25 0.75,1.25 0.75,1.25 C0.75,1.663925051689148 0.4139249920845032,2 0,2 C0,2 0,2 0,2 C-0.4139249920845032,2 -0.75,1.663925051689148 -0.75,1.25 C-0.75,1.25 -0.75,-1.25 -0.75,-1.25 C-0.75,-1.663925051689148 -0.4139249920845032,-2 0,-2 C0,-2 0,-2 0,-2 C0.4139249920845032,-2 0.75,-1.663925051689148 0.75,-1.25z"></path></g></g><g transform="matrix(1,0,0,1,8.890999794006348,8.406000137329102)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0.09099999815225601,1.1009999513626099)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M7,-3 C7,-3 7,3 7,3 C7,4.379749774932861 5.879749774932861,5.5 4.5,5.5 C4.5,5.5 -4.5,5.5 -4.5,5.5 C-5.879749774932861,5.5 -7,4.379749774932861 -7,3 C-7,3 -7,-3 -7,-3 C-7,-4.379749774932861 -5.879749774932861,-5.5 -4.5,-5.5 C-4.5,-5.5 4.5,-5.5 4.5,-5.5 C5.879749774932861,-5.5 7,-4.379749774932861 7,-3z"></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="1.5" d=" M7,-3 C7,-3 7,3 7,3 C7,4.379749774932861 5.879749774932861,5.5 4.5,5.5 C4.5,5.5 -4.5,5.5 -4.5,5.5 C-5.879749774932861,5.5 -7,4.379749774932861 -7,3 C-7,3 -7,-3 -7,-3 C-7,-4.379749774932861 -5.879749774932861,-5.5 -4.5,-5.5 C-4.5,-5.5 4.5,-5.5 4.5,-5.5 C5.879749774932861,-5.5 7,-4.379749774932861 7,-3z"></path></g></g><g transform="matrix(1,0,0,1,8.89900016784668,8.083999633789062)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,-2.5239999294281006,1.3849999904632568)"><path fill="rgb(0,0,0)" fill-opacity="1" d=" M0.875,-1.125 C0.875,-1.125 0.875,1.125 0.875,1.125 C0.875,1.607912540435791 0.48291251063346863,2 0,2 C0,2 0,2 0,2 C-0.48291251063346863,2 -0.875,1.607912540435791 -0.875,1.125 C-0.875,1.125 -0.875,-1.125 -0.875,-1.125 C-0.875,-1.607912540435791 -0.48291251063346863,-2 0,-2 C0,-2 0,-2 0,-2 C0.48291251063346863,-2 0.875,-1.607912540435791 0.875,-1.125z"></path></g></g><g transform="matrix(1,0,0,1,14.008999824523926,8.083999633789062)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,-2.5239999294281006,1.3849999904632568)"><path fill="rgb(0,0,0)" fill-opacity="1" d=" M0.8999999761581421,-1.100000023841858 C0.8999999761581421,-1.100000023841858 0.8999999761581421,1.100000023841858 0.8999999761581421,1.100000023841858 C0.8999999761581421,1.596709966659546 0.4967099726200104,2 0,2 C0,2 0,2 0,2 C-0.4967099726200104,2 -0.8999999761581421,1.596709966659546 -0.8999999761581421,1.100000023841858 C-0.8999999761581421,1.100000023841858 -0.8999999761581421,-1.100000023841858 -0.8999999761581421,-1.100000023841858 C-0.8999999761581421,-1.596709966659546 -0.4967099726200104,-2 0,-2 C0,-2 0,-2 0,-2 C0.4967099726200104,-2 0.8999999761581421,-1.596709966659546 0.8999999761581421,-1.100000023841858z"></path></g></g></g></svg></div></div><div class="duration"></div></div></div><div class="right"><ul><li><a target="_blank" href="https://github.com/FlxSNX">BKMPlayer V' + this.version + '</a></li><li><a target="_blank" href="https://github.com/FlxSNX">Author</a></li></ul></div></div>'; */

		// this.container.innerHTML = '';
		this.isIos = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
		this.bkmplayer = $('#bkmplayer'); //获取Video对象
		this.tipsTimer = null;
		this.focus = true;
		this.BkmVideo = $('#bkmplayer>.warp>video');
		this.Video = this.BkmVideo[0];
		this.ActionFunction();

        

		$('#bkmplayer .logo>img').attr('src', this.logo);
		this.bkmplayer.find('.loading>.info').append('<span>BKMPlayer V' + this.version + '</sapn>'); //开启多集模式时从playlist获取地址

		if (this.nextpartmode == true){
			this.nextpartFunc(this.playId != 0 ? this.playId : 0);
		}else{
			$('#bkmplayer .btn-next').hide();
		}

		if(this.video.title){
			$('#bkmplayer>.header>.title').text(this.video.title);
		}else{
			$('#bkmplayer>.header').hide();
		}

	
		this.LoadVideoUrl();
		this.Video.load();
		/* 开始加载视频数据事件 */

		this.Video.onloadstart = () => {

			/* 
			  取消延时
			  setTimeout(() => {
				this.bkmplayer.find('.loading>.info').append('<span>视频连接中...</sapn>');
			  }, 500); 
			*/
			this.bkmplayer.find('.loading>.info').append('<span>视频连接中...</sapn>');
		};
		/* 当获取视频失败时 */

		if (this.videotype == 'hls') {
			this.hls.on(Hls.Events.ERROR, (event, data) => {
				if (data.type != "otherError") {
					console.log(data);
					/* 取消延时
						setTimeout(() => {
							this.bkmplayer.find('.loading>.info').append('<span>视频连接失败!</sapn>');
						}, 1500) 
					*/;
					this.bkmplayer.find('.loading>.info').append('<span>视频连接失败!</sapn>');
				}
			});
		} else {
			this.Video.onerror = () => {
				/* 取消延时
					setTimeout(() => {
						this.bkmplayer.find('.loading>.info').append('<span>视频连接失败!</sapn>');
					}, 1500); 
				*/
				this.bkmplayer.find('.loading>.info').append('<span>视频连接失败!</sapn>');
			};
		}
		/* 视频可以播放时事件 */

		this.Video.oncanplay = () => {
			if (!this.FirstPlaySuccess) {
				/* 
				  取消延时
				  setTimeout(() => {
					this.bkmplayer.find('.loading>.info').append('<span>视频连接成功!</sapn>');
					setTimeout(() => {
					  $('#bkmplayer .loading').hide();
		
					  if (this.autoplay == true){
						this.Video.play().catch(() => {
						  console.log('浏览器不支持自动播放');
						  this.tips('视频已准备就绪');
						});
					  }
		
					  this.FirstPlaySuccess = true;
					  //清空加载信息
		
					  this.bkmplayer.find('.loading>.info').html('');
					  setTimeout(function () {
						$('#bkmplayer').attr('style', 'cursor: none!important');
						$('#bkmplayer .control').attr('style', 'opacity: 0');
					  }, 3000);
					}, 1000);
				  }, 1500); 
				*/
				if(Player.Video.videoHeight > Player.Video.videoWidth){
					this.container.style.height = Player.Video.videoWidth+'px';
				}
				this.bkmplayer.find('.loading>.info').append('<span>视频连接成功!</sapn>');
				setTimeout(() => {
					$('#bkmplayer .loading').hide();

					if (this.autoplay == true) {
						this.Video.play().catch(() => {
							console.log('浏览器不支持自动播放');
							this.tips('视频已准备就绪');
						});
					}

					this.FirstPlaySuccess = true;
					//清空加载信息

					this.bkmplayer.find('.loading>.info').html('');
					setTimeout(() => {
						$('#bkmplayer').attr('style', 'cursor: none!important');
						$('#bkmplayer .control').attr('style', 'opacity: 0');
						this.showHeader(false);
					}, 3000);
				}, 1000);
			}
		};
		/* 开始加载视频数据事件 */


		this.Video.onloadeddata = () => {
			$('.control .time span:nth-child(2)').text(this.formatTime(this.Video.duration));
			$('#bkmplayer .control').attr('style', 'opacity: 1');
			this.showHeader(true);
		};
		/* 视频时间改变事件 */


		this.Video.ontimeupdate = () => {
			$('.control .time span:nth-child(1)').text(this.formatTime(this.Video.currentTime));
			if (this.isMove == false) $('#bkmplayer .current').css('width', this.Video.currentTime / this.Video.duration * 100 + '%');
		};
		/* 视频播放事件 */


		this.Video.onplay = () => {
			$('.control .btn-play').addClass('pause');
			$('#bkmplayer .playicon').addClass('hide');
		};
		/* 视频暂停事件 */


		this.Video.onpause = () => {
			$('.control .btn-play').removeClass('pause');
			$('#bkmplayer .playicon').removeClass('hide');
			$('#bkmplayer').attr('style', 'cursor: auto');
			$('#bkmplayer .control').attr('style', '');
			this.showHeader(true)
		};

		this.Video.onwaiting = () => {
			$('#bkmplayer .loading_2').show();
		};

		this.Video.onplaying = () => {
			$('#bkmplayer .loading_2').hide();
		};
		/* Video右键菜单 */


		this.Video.oncontextmenu = e => {
			e.preventDefault();
			$('#bkmplayer>.right').css({
				'left': e.offsetX + 'px',
				'top': e.offsetY + 'px'
			});
			$('#bkmplayer>.right').show();
		};

		$('#bkmplayer')[0].oncontextmenu = e => {
			e.preventDefault();
			$('#bkmplayer>.right').css({
				'left': e.offsetX + 'px',
				'top': e.offsetY + 'px'
			});
			$('#bkmplayer>.right').show();
		};

		$(window).click(function () {
			$('#bkmplayer>.right').hide();
		});

        $('#bkmplayer>.right>ul>li').eq(1).on('click',_=>{
            this.Video.requestPictureInPicture();
        });

		this.Video.onended = () => {
			if(this.nextpartmode){
				if(this.playIndex != this.playlist.length - 1){
					this.tips('3秒后自动播放下一话');
					this.nextTimer = setTimeout(_=>{
						this.NextPart();
					},3000);
				}
			}
		};
	}

	LoadVideoUrl() {
		if (this.video.url != '') {
			this.Video.src = this.video.url; //判断是否为hls

			if (this.Video.src.indexOf('.m3u8') != -1 && this.isIos == false) {
				this.videotype = 'hls';

				if (Hls.isSupported()) {
					let hls = new Hls();
					hls.loadSource(this.Video.src);
					hls.attachMedia(this.Video);
					this.hls = hls;
					/* HlsjsMediaInfoModule.observeMediaInfo(hls);
					console.log(hls);
					setInterval(() => {
					  console.log(this.hls.downloadSpeed);
					}, 1000); */
				}
			}
		}
	}

	/* 切换剧集 */
	setEp(epid){
		clearTimeout(this.nextTimer);
		clearTimeout(this.tipsTimer);
		$('#bkmplayer .tips').css('opacity', 0);
		this.nextpartFunc(epid);
	}

	/* 处理播放下一集 */
	NextPart() {
		this.playIndex++;

		if (this.playIndex < this.playlist.length) {
			clearTimeout(this.nextTimer);
			clearTimeout(this.tipsTimer);
			$('#bkmplayer .tips').css('opacity', 0);
			this.nextpartFunc(0);
			/* this.LoadVideoUrl();
			this.FirstPlaySuccess = false;
			$('#bkmplayer .loading').show();
			this.bkmplayer.find('.loading>.info').append('<span>正在加载下一集...</sapn>'); */
		} else {
			/* 这里放播放完毕提示 */
		}
	}

	/* 修改播放地址与标题 */
	setPlayerUrl(url,title) {

		if(this.hls)this.hls.detachMedia();
		this.video.url = url;

		this.video.title = title;
		if(this.video.title){
			$('#bkmplayer>.header>.title').text(this.video.title);
		}else{
			$('#bkmplayer>.header').hide();
		}

		this.bkmplayer.find('.loading>.info').html('');

		this.LoadVideoUrl();
		this.FirstPlaySuccess = false;
		$('#bkmplayer .loading').show();
	}

	/* 
		播放器交互函数
	*/

	ActionFunction() {
		/* 播放暂停按钮功能 */
		$('#bkmplayer .control .btn-play,#bkmplayer .playicon').click(() => {
			if ($('#bkmplayer>.right').css('display') == 'none') {
				if (this.Video.paused) {
					this.Video.play();
				} else {
					this.Video.pause();
				}
			}
		});

		$('#bkmplayer video').dblclick(() => {
		  if(this.IsMobile()){
			if(this.Video.paused) {
			  this.Video.play();
			}else{
			  this.Video.pause();
			}
		  }
		});

		$('#bkmplayer video').click(() => {
			if ($('#bkmplayer>.right').css('display') == 'none') {
				if (this.IsMobile() && this.Video.paused == false) {
					if ($('#bkmplayer .control').css('opacity') == '1') {
						$('#bkmplayer .control').attr('style', 'opacity: 0');
						this.showHeader(false)
					} else {
						$('#bkmplayer .control').attr('style', '');
						this.showHeader(true)
					}
				} else {
					if (this.Video.paused) {
						this.Video.play();
					} else {
						this.Video.pause();
					}
				}
			}
		});

		$('#bkmplayer .control .btn-next').click(() => {
			if (this.nextpartmode) this.NextPart();
		});
		/* 鼠标在3秒内无任何操作自动隐藏播放器控件 */

		let hidecontrol;
		$('#bkmplayer video,#bkmplayer .loading').mousemove(() => {
			if (this.Video.paused == false) {
				if (hidecontrol) clearTimeout(hidecontrol);
				$('#bkmplayer').attr('style', 'cursor: auto');
				$('#bkmplayer .control').attr('style', '');
				this.showHeader(true)
				hidecontrol = setTimeout(() => {
					$('#bkmplayer').attr('style', 'cursor: none!important');
					$('#bkmplayer .control').attr('style', 'opacity: 0');
					this.showHeader(false)
				}, 3000);
			} else {
				if (hidecontrol) clearTimeout(hidecontrol);
			}
		});
		/* 鼠标停在控件上时一直显示控件 移出后3秒隐藏 */

		$('#bkmplayer .control').hover(() => {
			if (hidecontrol) clearTimeout(hidecontrol);
			$('#bkmplayer').attr('style', 'cursor: auto');
			$('#bkmplayer .control').attr('style', '');
			this.showHeader(true)
		}, () => {
			if (this.Video.paused == false) {
				hidecontrol = setTimeout(() => {
					$('#bkmplayer').attr('style', 'cursor: none!important');
					$('#bkmplayer .control').attr('style', 'opacity: 0');
					this.showHeader(false)
				}, 3000);
			} else {
				if (hidecontrol) clearTimeout(hidecontrol);
			}
		});
		/* 鼠标停在播放器时显示控件 移出隐藏控件 */

		$('#bkmplayer').hover(() => {
			$('#bkmplayer').attr('style', 'cursor: auto');
			$('#bkmplayer .control').attr('style', '');
			this.showHeader(true)
		}, () => {
			if (this.Video.paused == false) {
				$('#bkmplayer .control').attr('style', 'opacity: 0');
				this.showHeader(false)
			}
		});

		if (this.isIos == true) {
			$('.control .fullscreen').click(() => {
				return this.Video.webkitEnterFullscreen();
			});
		} else {
			/* 全屏按钮事件 */
			$('.control .fullscreen').click(function () {
				if ($(this).attr('full') == 'true') {
					document.exitFullscreen();
					$(this).attr('full', 'false');
					$(this).removeClass('full');
				} else {
					$('#bkmplayer')[0].requestFullscreen();
					$(this).attr('full', 'true');
					$(this).addClass('full');
				}
			});
		}
        
		/* 用于Esc退出全屏时切换全屏按钮 */
		$('#bkmplayer').on('fullscreenchange', _=>{
			if (!document.fullscreenElement) {
				$('.control .fullscreen').attr('full', 'false');
				$('.control .fullscreen').removeClass('full');
			}
            this.danmaku.resize();
		});

		/* 鼠标在进度条的时候时间tips */

		$('#bkmplayer .progress').mousemove(e => {
			$('#bkmplayer .timetips').show();
			/* 时间字符串 */

			let x = e.clientX - $('#bkmplayer').offset().left - 10;

			if (x <= 0) {
				x = 0;
			} else if (x > $('#bkmplayer .progress').width()) {
				x = $('#bkmplayer .progress').width();
			}

			$('#bkmplayer .timetips>span').text(this.formatTime(x / $('#bkmplayer .progress').width() * this.Video.duration));
			/* tips x轴位置 */

			x = e.clientX - $('#bkmplayer').offset().left - $('#bkmplayer .timetips').width() / 2;

			if (x >= $('#bkmplayer .progress').width() - $('#bkmplayer .timetips').width() + 20) {
				$('#bkmplayer .timetips').css('left', $('#bkmplayer .progress').width() - $('#bkmplayer .timetips').width() + 20);
			} else if (x <= 0) {
				$('#bkmplayer .timetips').css('left', 0);
			} else {
				$('#bkmplayer .timetips').css('left', x);
			}
		});
		/* 鼠标移出进度条时隐藏时间tips */

		$('#bkmplayer .progress').mouseout(e => {
			$('#bkmplayer .timetips').hide();
		});

		if(this.IsMobile()){
			/* 移动端通过进度条改变视频播放进度 */
			$('#bkmplayer .progress').on('touchstart',e => {
				console.log('touchstart');
				let x;
				this.isMove = true;
				x = e.touches[0].clientX - $('#bkmplayer').offset().left - 10;
				$('#bkmplayer').on('touchmove',e => {
					console.log('touchmove',e);
					if (this.isMove == true) {;
						x = e.touches[0].clientX - $('#bkmplayer').offset().left - 10;

						if (x >= $('#bkmplayer .progress').width()) {
							$('#bkmplayer .current').css("width", '100%');
						} else if (x <= 0) {
							$('#bkmplayer .current').css("width", 0);
						} else {
							$('#bkmplayer .current').css("width", x / $('#bkmplayer .progress').width() * 100 + '%');
						}
					}
				});
				$('#bkmplayer .current').css("width", x + 'px');
				$(document).on('touchend',e => {
					console.log('touchend');
					if (this.isMove == true) {
						this.isMove = false;
						//更改前的进度
						let stime = Math.trunc(this.Video.currentTime);
						this.Video.currentTime = Math.trunc($('#bkmplayer .current').width() / $('#bkmplayer .progress').width() * this.Video.duration);

						let settime = stime - Math.trunc(this.Video.currentTime);
						if(settime > 0){
							this.tips('快退'+settime+'秒');
						}else{
							this.tips('快进'+Math.abs(settime)+'秒');
						}
					}
				});
			});
		}else{
			/* 通过进度条改变视频播放进度 */
			$('#bkmplayer .progress').mousedown(e => {
				let x;
				this.isMove = true;
				x = e.clientX - $('#bkmplayer').offset().left - 10;
				$('#bkmplayer').mousemove(e => {
					if (this.isMove == true) {
						x = e.clientX - $('#bkmplayer').offset().left - 10;

						if (x >= $('#bkmplayer .progress').width()) {
							$('#bkmplayer .current').css("width", '100%');
						} else if (x <= 0) {
							$('#bkmplayer .current').css("width", 0);
						} else {
							$('#bkmplayer .current').css("width", x / $('#bkmplayer .progress').width() * 100 + '%');
						}
					}
				});
				$('#bkmplayer .current').css("width", x + 'px');
				$(document).mouseup(e => {
					if (this.isMove == true) {
						this.isMove = false;
						//更改前的进度
						let stime = Math.trunc(this.Video.currentTime);
						this.Video.currentTime = Math.trunc($('#bkmplayer .current').width() / $('#bkmplayer .progress').width() * this.Video.duration);

						let settime = stime - Math.trunc(this.Video.currentTime);
						if(settime > 0){
							this.tips('快退'+settime+'秒');
						}else{
							this.tips('快进'+Math.abs(settime)+'秒');
						}
					}
				});
			});
		}

		/* 点击播放器后获取焦点 点击其他元素后失去焦点 */
		document.addEventListener('click', () => {
			this.focus = false;
		}, true);
		$('#bkmplayer')[0].addEventListener('click', () => {
			this.focus = true;
		}, true);


		/* 按键事件 */
		$(document).keydown(e => {
			if (this.focus == true) {
				/* 按下空格切换播放状态 */
				if (e.keyCode == 32) {
					e.preventDefault();
					if (this.Video.paused) {
						this.Video.play();
						this.tips('播放');
					} else {
						this.Video.pause();
						this.tips('暂停');
					}
				} else if (e.keyCode == 39) {
					e.preventDefault();
					this.Video.currentTime = this.Video.currentTime + 5;
					$('.control .time span:nth-child(1)').text(this.formatTime(this.Video.currentTime));
					if (this.isMove == false) $('#bkmplayer .current').css('width', this.Video.currentTime / this.Video.duration * 100 + '%');
					this.tips('快进5秒');
				} else if (e.keyCode == 37) {
					e.preventDefault();
					this.Video.currentTime = this.Video.currentTime - 5;
					$('.control .time span:nth-child(1)').text(this.formatTime(this.Video.currentTime));
					if (this.isMove == false) $('#bkmplayer .current').css('width', this.Video.currentTime / this.Video.duration * 100 + '%');
					this.tips('快退5秒');
				}
			}
		});
	}

	/* 显示提示 默认显示3秒 有新提示时直接切换到新提示 */
	tips(text, time = 3000) {
		clearTimeout(this.tipsTimer);
		$('#bkmplayer .tips').css('opacity', 1);
		$('#bkmplayer .tips>span').text(text);
		this.tipsTimer = setTimeout(() => {
			$('#bkmplayer .tips').css('opacity', 0);
		}, time);
	}

	showHeader(bool){
		if(this.video.title){
			if(bool == true){
				$('#bkmplayer>.header').attr('style', '');
			}else{
				$('#bkmplayer>.header').attr('style', 'opacity: 0');
			}
		}
	}

	/* 
		格式化时间
	*/
	formatTime(time) {
		time = Math.round(time);
		var ss = time % 60,
			m = (time - ss) / 60,
			s = time - m * 60;
		if (m < 10) m = '0' + m;
		if (s < 10) s = '0' + s;
		return m + ':' + s;
	}
}