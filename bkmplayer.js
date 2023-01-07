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
                    "text": "回答我吧！",
                    "mode": "bottom",
                    "time": 328.36,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "好喜欢这首的女声和声",
                    "mode": "top",
                    "time": 145.179,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "wc，是原声啊！原声啊！",
                    "mode": "rtl",
                    "time": 363.997,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "请回答我…！！！",
                    "mode": "rtl",
                    "time": 331.075,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愿 歌结束时，你我 都能见到那个（他／她）",
                    "mode": "rtl",
                    "time": 90.449,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "世界が背中を",
                    "mode": "bottom",
                    "time": 95.545,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "支配者も神も　何処が他人顔",
                    "mode": "bottom",
                    "time": 57.417,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有什么是爱做不到的呢",
                    "mode": "bottom",
                    "time": 105.983,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00da12",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00da12",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢翻译贡献者：飞鸟超可爱鸭，转自网易云音乐",
                    "mode": "bottom",
                    "time": 405.531,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有我能够做到的事哦！",
                    "mode": "bottom",
                    "time": 397.273,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有爱能够做到的事哦！",
                    "mode": "bottom",
                    "time": 391.044,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "尽管生在这片爱的荒野的我",
                    "mode": "bottom",
                    "time": 376.71,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱之歌也已唱完",
                    "mode": "bottom",
                    "time": 364.061,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "回答我！",
                    "mode": "bottom",
                    "time": 330.539,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "为何要让我们对有尽头的人生抱有希望？",
                    "mode": "bottom",
                    "time": 304.383,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "为何要让一无所有的我们怀揣梦想？",
                    "mode": "bottom",
                    "time": 297.927,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "是你给予我的勇气",
                    "mode": "bottom",
                    "time": 257.595,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这颗星球今天也承载着这一切存在着",
                    "mode": "bottom",
                    "time": 231.504,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "互相谅解的声音 彼此紧握的双手",
                    "mode": "bottom",
                    "time": 226.461,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还是那久违缺不曾动摇的意志",
                    "mode": "bottom",
                    "time": 206.462,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "是你给予我的勇气",
                    "mode": "bottom",
                    "time": 125.507,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "即便世界违背与你也还要与之对抗",
                    "mode": "bottom",
                    "time": 92.769,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "勇气、希望和羁绊之类的魔法",
                    "mode": "bottom",
                    "time": 65.985,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "统治者和神明 都一副事不关己的表情",
                    "mode": "bottom",
                    "time": 51.823,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "两手空空诞生于世的我",
                    "mode": "bottom",
                    "time": 11.641,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "前方高能预警",
                    "mode": "top",
                    "time": 280.968,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愿我们都有追逐爱的勇气和不甘平庸的信仰",
                    "mode": "top",
                    "time": 429.074,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "第一次听直接哭了",
                    "mode": "rtl",
                    "time": 54.224,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我能做到的还有很多",
                    "mode": "bottom",
                    "time": 397.971,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有很多",
                    "mode": "bottom",
                    "time": 390.595,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "即使如此",
                    "mode": "bottom",
                    "time": 376.698,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "降生在这样荒野中的你和我",
                    "mode": "bottom",
                    "time": 376.698,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "在诸多电影中已经讲述完了",
                    "mode": "bottom",
                    "time": 369.665,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱的颂歌已经唱尽了",
                    "mode": "bottom",
                    "time": 363.37,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还是说十分美丽呢",
                    "mode": "bottom",
                    "time": 324.327,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "都只会在手中一掠而过",
                    "mode": "bottom",
                    "time": 313.783,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "为何要让我们对有限的人生     抱有希望",
                    "mode": "bottom",
                    "time": 304.839,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "怀抱梦想",
                    "mode": "bottom",
                    "time": 300.164,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "为何要让一无所有的我们",
                    "mode": "bottom",
                    "time": 298.159,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "如果不是你一切便没有意义",
                    "mode": "bottom",
                    "time": 277.591,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "是只属于你和我的爱",
                    "mode": "bottom",
                    "time": 270.461,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "所以我想要为你而勇敢",
                    "mode": "bottom",
                    "time": 264.114,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "是你曾给予我勇气",
                    "mode": "bottom",
                    "time": 256.716,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我能做到的还有什么",
                    "mode": "bottom",
                    "time": 244.391,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这颗星球今天依旧拥抱着这一切  坦然生存",
                    "mode": "bottom",
                    "time": 231.449,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "相互谅解的声音  相互紧握的双手",
                    "mode": "bottom",
                    "time": 224.869,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "又或者是遥远却坚定不移的意志",
                    "mode": "bottom",
                    "time": 205.717,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "选择与被选择  脱不掉的铠甲",
                    "mode": "bottom",
                    "time": 198.238,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "又或许是神明的一时兴起",
                    "mode": "bottom",
                    "time": 190.894,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "如果不是你一切便没有意义",
                    "mode": "bottom",
                    "time": 145.857,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "是你曾给予我勇气",
                    "mode": "bottom",
                    "time": 124.969,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我能做到的还有什么",
                    "mode": "bottom",
                    "time": 112.459,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "此刻你也会再此  对抗整个世界",
                    "mode": "bottom",
                    "time": 99.805,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "即使全世界都与你背道而驰",
                    "mode": "bottom",
                    "time": 92.433,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "即便如此  你一天的你至今依旧",
                    "mode": "bottom",
                    "time": 78.991,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "勇气 希望 牵绊这些魔法",
                    "mode": "bottom",
                    "time": 66.009,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "但其实他们心中应该很明白",
                    "mode": "bottom",
                    "time": 58.548,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "在永恒的缝隙间苦苦挣扎",
                    "mode": "bottom",
                    "time": 19.062,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "できる和こと从语法上来讲就是不分开的，字幕有误",
                    "mode": "top",
                    "time": 163.989,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "真的超爱这首歌",
                    "mode": "top",
                    "time": 111.619,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "好家伙，看了才知道E7有多长→（对，就是右边的车）",
                    "mode": "top",
                    "time": 150.369,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "新海诚牛逼！",
                    "mode": "top",
                    "time": 316.812,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "每天亿遍",
                    "mode": "rtl",
                    "time": 114.183,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后的摩斯电码意思是我想见到你",
                    "mode": "bottom",
                    "time": 180.594,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这段卧槽啊",
                    "mode": "rtl",
                    "time": 316.051,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "前方高能预警！！！",
                    "mode": "top",
                    "time": 294.848,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "又回来了你的名字后",
                    "mode": "rtl",
                    "time": 13.185,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我能做到的还有什么",
                    "mode": "top",
                    "time": 114.06,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这段歌词真的是颇有感触啊",
                    "mode": "top",
                    "time": 325.97,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "然后连下三年雨？[doge]",
                    "mode": "rtl",
                    "time": 293.564,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "看完了，但忍不住想听歌",
                    "mode": "top",
                    "time": 274.979,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "现在开始，要放晴了哦",
                    "mode": "top",
                    "time": 425.297,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "太喜欢这个长镜头了",
                    "mode": "top",
                    "time": 232.213,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "橙色字幕组开始施工",
                    "mode": "bottom",
                    "time": 11.042,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7204",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7204",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "橙色字幕组也施工完毕",
                    "mode": "bottom",
                    "time": 406.464,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "数多の映画で",
                    "mode": "bottom",
                    "time": 369.431,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "歌われ尽くした",
                    "mode": "bottom",
                    "time": 366.215,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛の歌も",
                    "mode": "bottom",
                    "time": 363.788,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "拍摄的时候肯定等雨等了好久",
                    "mode": "top",
                    "time": 305.828,
                    "style": {
                        "fontSize": "25px",
                        "color": "#683a7b",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#683a7b",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君の為に、使いたいんだ",
                    "mode": "bottom",
                    "time": 263.337,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "この星は今日も",
                    "mode": "bottom",
                    "time": 231.235,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "叶わぬ再会と",
                    "mode": "bottom",
                    "time": 213.45,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君の為に、使いたいんだ",
                    "mode": "bottom",
                    "time": 132.188,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "今もここにいる",
                    "mode": "bottom",
                    "time": 101.911,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "世界が背中を",
                    "mode": "bottom",
                    "time": 92.254,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "ど真ん中にいる",
                    "mode": "bottom",
                    "time": 88.257,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "絆とかの魔法",
                    "mode": "bottom",
                    "time": 69.843,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时当天你分享给我的时候我只注意到阳台外的光 现在反复看的时候你却不再让我说话了",
                    "mode": "rtl",
                    "time": 293.128,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一镜到底啊！",
                    "mode": "rtl",
                    "time": 248.244,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "再来一遍",
                    "mode": "bottom",
                    "time": 21.571,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "表白炸下方字幕君↓",
                    "mode": "top",
                    "time": 118.415,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "表白一下字幕↓",
                    "mode": "bottom",
                    "time": 279.336,
                    "style": {
                        "fontSize": "18px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "18px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "对导演的控诉可还行",
                    "mode": "rtl",
                    "time": 363.748,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "你若安好，便是晴天",
                    "mode": "rtl",
                    "time": 240.419,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "行星发动机（幻视）",
                    "mode": "rtl",
                    "time": 427.516,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "歌词NB！",
                    "mode": "top",
                    "time": 237.673,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "当初一个人在电影院看得稀里哗啦，不想再来一次了",
                    "mode": "bottom",
                    "time": 275.079,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "湖北现状——下雨",
                    "mode": "rtl",
                    "time": 318.162,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "啊啊啊！洋次郎好棒！",
                    "mode": "top",
                    "time": 124.694,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢下方字幕组↓",
                    "mode": "rtl",
                    "time": 119.992,
                    "style": {
                        "fontSize": "25px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "已追完，前来回味",
                    "mode": "top",
                    "time": 53.314,
                    "style": {
                        "fontSize": "25px",
                        "color": "#019899",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#019899",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "再一次感谢字幕组配音",
                    "mode": "rtl",
                    "time": 322.734,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我或许会迟到，但从不缺席。",
                    "mode": "top",
                    "time": 0.498,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢下方字幕君↓",
                    "mode": "bottom",
                    "time": 115.581,
                    "style": {
                        "fontSize": "18px",
                        "color": "#e2027f",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "18px sans-serif",
                        "fillStyle": "#e2027f",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "《还有一分钟开始》",
                    "mode": "top",
                    "time": 0.353,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffff00",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffff00",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有一分钟",
                    "mode": "top",
                    "time": 249.847,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后一分钟核能预警！！！！！",
                    "mode": "top",
                    "time": 25.514,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时1分钟",
                    "mode": "top",
                    "time": 91.326,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "核能预警！！！！！",
                    "mode": "top",
                    "time": 12.731,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后1分钟！！！",
                    "mode": "top",
                    "time": 296.979,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时两分钟",
                    "mode": "top",
                    "time": 10.066,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3分钟！！！！！倒计时",
                    "mode": "top",
                    "time": 121.04,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "三分钟，我爱死这小破站了。",
                    "mode": "top",
                    "time": 11.539,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时5分钟",
                    "mode": "top",
                    "time": 78.454,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "激动的心，颤抖的手",
                    "mode": "top",
                    "time": 114.001,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "富の境界線",
                    "mode": "rtl",
                    "time": 266.271,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时6分钟",
                    "mode": "top",
                    "time": 53.569,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "小破站加油啊，速度啊",
                    "mode": "top",
                    "time": 62.473,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还剩十秒！！！！",
                    "mode": "rtl",
                    "time": 442.924,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有八分钟",
                    "mode": "top",
                    "time": 264.899,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时十分钟",
                    "mode": "top",
                    "time": 103.25,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "小破站nb",
                    "mode": "top",
                    "time": 49.531,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时十分钟",
                    "mode": "top",
                    "time": 385.272,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有十分钟！！！！",
                    "mode": "top",
                    "time": 83.231,
                    "style": {
                        "fontSize": "25px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时十分钟，小破站牛逼！",
                    "mode": "top",
                    "time": 142.339,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有10分钟了哈哈哈",
                    "mode": "rtl",
                    "time": 100.097,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "其他朋友打出了多重字母",
                    "mode": "top",
                    "time": 79.755,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "数多の映画で",
                    "mode": "bottom",
                    "time": 369.017,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "歌われ尽くした",
                    "mode": "bottom",
                    "time": 364.997,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛の歌も",
                    "mode": "bottom",
                    "time": 362.777,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君の為に　使いたいんだ",
                    "mode": "bottom",
                    "time": 263.39,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "この星は今日も",
                    "mode": "bottom",
                    "time": 231.21,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "ほどけぬ誤解と",
                    "mode": "bottom",
                    "time": 217.416,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "叶わぬ再会と",
                    "mode": "bottom",
                    "time": 214.676,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君の為に　使いたいんだ",
                    "mode": "bottom",
                    "time": 130.829,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "世界が背中を　向けでもまだなお",
                    "mode": "bottom",
                    "time": 93.009,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "没话筒，都是录音室配的",
                    "mode": "rtl",
                    "time": 400.326,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "都只能一闪而过",
                    "mode": "bottom",
                    "time": 314.32,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "歌词充满对命（导）运（演）的控诉",
                    "mode": "bottom",
                    "time": 348.433,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有我能做到的事哟",
                    "mode": "bottom",
                    "time": 398.223,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有爱能做到的事哦",
                    "mode": "bottom",
                    "time": 390.7,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "尽管如此 诞生在爱的荒原的我",
                    "mode": "bottom",
                    "time": 376.635,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱情也被无数的电影诠释",
                    "mode": "bottom",
                    "time": 369.576,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "请回答我",
                    "mode": "bottom",
                    "time": 328.47,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "或是说  很美呢",
                    "mode": "bottom",
                    "time": 323.879,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "即使如此仍奋力抓住的我们",
                    "mode": "bottom",
                    "time": 318.35,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "都只会一闪而过",
                    "mode": "bottom",
                    "time": 314.23,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "为何要让我们对本就有限的人生",
                    "mode": "bottom",
                    "time": 304.922,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "心怀梦想",
                    "mode": "bottom",
                    "time": 300.71,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "是你曾给予我勇气",
                    "mode": "bottom",
                    "time": 257.384,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这颗星球今天仍将这一切承载着",
                    "mode": "bottom",
                    "time": 231.75,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "不能化解的误会",
                    "mode": "bottom",
                    "time": 218.302,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "互相错过的重逢",
                    "mode": "bottom",
                    "time": 214.448,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "因是与你培育的那份爱",
                    "mode": "bottom",
                    "time": 139.138,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "是你曾给予我勇气",
                    "mode": "bottom",
                    "time": 125.638,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "也愿与之对抗",
                    "mode": "bottom",
                    "time": 95.73,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "即使世界违背你",
                    "mode": "bottom",
                    "time": 92.924,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "勇气，希望，还有羁绊之类的魔法",
                    "mode": "bottom",
                    "time": 66.062,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "其实他们应该都知道的啊",
                    "mode": "bottom",
                    "time": 59.076,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "统治者和神明 都是一副漠不关心的神情",
                    "mode": "bottom",
                    "time": 52.428,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "在无尽的裂隙里 苦苦挣扎",
                    "mode": "bottom",
                    "time": 18.587,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "两手空空 诞生于世的我",
                    "mode": "bottom",
                    "time": 11.88,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "听不懂但是就很扎心",
                    "mode": "rtl",
                    "time": 80.5,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "东京又被雪淹了",
                    "mode": "top",
                    "time": 212.319,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "比起晴天，我更需要你",
                    "mode": "rtl",
                    "time": 366.129,
                    "style": {
                        "fontSize": "18px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "18px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "要与你一起分享这份爱，如果不是与你便会黯淡无光",
                    "mode": "rtl",
                    "time": 134.152,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "明年，新的电影相见",
                    "mode": "rtl",
                    "time": 147.306,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "谢谢字幕",
                    "mode": "bottom",
                    "time": 360.76,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "新海诚牛批!",
                    "mode": "rtl",
                    "time": 319.13,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "勇気も希望や　絆とかの魔法",
                    "mode": "bottom",
                    "time": 66.114,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "小破站nb",
                    "mode": "top",
                    "time": 49.379,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "良才上啊",
                    "mode": "top",
                    "time": 153.838,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还是说 很美呢？",
                    "mode": "bottom",
                    "time": 324.782,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有我能够做到的事吗？",
                    "mode": "bottom",
                    "time": 290.058,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有我能够做到的事吗？",
                    "mode": "bottom",
                    "time": 244.045,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "化解不开的误会",
                    "mode": "bottom",
                    "time": 218.466,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "无法达成的愿望",
                    "mode": "bottom",
                    "time": 211.654,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "是被迫的选择",
                    "mode": "bottom",
                    "time": 197.563,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "命运究竟是",
                    "mode": "bottom",
                    "time": 184.233,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有爱能够做到的事吗？",
                    "mode": "bottom",
                    "time": 151.991,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有我能够做到的事吗？",
                    "mode": "bottom",
                    "time": 112.535,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "字幕组，永远的神！",
                    "mode": "rtl",
                    "time": 446.354,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我能做到的还有什么",
                    "mode": "top",
                    "time": 158.414,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "回答我啊",
                    "mode": "bottom",
                    "time": 328.669,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "脱不掉的铠甲  又或者是",
                    "mode": "bottom",
                    "time": 202.176,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "选择与被选择",
                    "mode": "bottom",
                    "time": 198.07,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我能做到的还有什么",
                    "mode": "bottom",
                    "time": 158.194,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "是只属于你和我的爱",
                    "mode": "bottom",
                    "time": 138.346,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "所以我想要为你而勇敢",
                    "mode": "bottom",
                    "time": 132.05,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "注意这条铁路，还没有车，但几分钟后就有了车，这说明有剪辑",
                    "mode": "top",
                    "time": 350.723,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "列车神来之笔",
                    "mode": "rtl",
                    "time": 420.581,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "印象两次都是自己看的，而且都是迟到了一两分钟",
                    "mode": "rtl",
                    "time": 225.264,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "ぽウィデイ",
                    "mode": "rtl",
                    "time": 258.024,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "下面字幕君的翻译好美啊，爱了",
                    "mode": "top",
                    "time": 154.459,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "导演的控诉hhhhhhhh",
                    "mode": "rtl",
                    "time": 353.212,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我爱小破站！！！",
                    "mode": "rtl",
                    "time": 112.021,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我能做到的还有什么",
                    "mode": "top",
                    "time": 158.9,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "許し合う声と",
                    "mode": "bottom",
                    "time": 224.006,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "揺らぐことない意志",
                    "mode": "bottom",
                    "time": 207.229,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "もしくは遥かな",
                    "mode": "bottom",
                    "time": 204.309,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "サイコロのでた目",
                    "mode": "bottom",
                    "time": 187.081,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "諦めたものと",
                    "mode": "bottom",
                    "time": 25.083,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢字幕君",
                    "mode": "rtl",
                    "time": 360.819,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢野生字幕菌！",
                    "mode": "top",
                    "time": 405.056,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "完结撒花",
                    "mode": "rtl",
                    "time": 432.985,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "宁愿与世界为敌，也不愿失去你！",
                    "mode": "rtl",
                    "time": 299.479,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "野田洋次郎！",
                    "mode": "rtl",
                    "time": 267.525,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这一切都是命运石之门的选择",
                    "mode": "rtl",
                    "time": 128.05,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愿雨不停，愿他们的爱永不分离",
                    "mode": "rtl",
                    "time": 301.511,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "真的感谢字幕君，一定很辛苦",
                    "mode": "rtl",
                    "time": 120.582,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "前排卖瓜",
                    "mode": "top",
                    "time": 162.725,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我们这儿雨停了，只不过天气还很阴。",
                    "mode": "rtl",
                    "time": 379.315,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "天，晴了啊！！！",
                    "mode": "rtl",
                    "time": 422.361,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "喂，钢琴怕水呀",
                    "mode": "rtl",
                    "time": 391.705,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "新海诚nb！",
                    "mode": "top",
                    "time": 178.807,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我们这里晴转雨了！",
                    "mode": "rtl",
                    "time": 371.052,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "可以可以爱了",
                    "mode": "rtl",
                    "time": 334.484,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "光影好评",
                    "mode": "top",
                    "time": 420.121,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么！",
                    "mode": "rtl",
                    "time": 242.538,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我这晴天只不过出不去了",
                    "mode": "rtl",
                    "time": 301.7,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我回来了!!!",
                    "mode": "rtl",
                    "time": 108.034,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "再一次感谢弹幕组翻译",
                    "mode": "rtl",
                    "time": 324.654,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时一分钟",
                    "mode": "rtl",
                    "time": 318.7,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15.59                 还有一分钟！！！！！！！！！！！",
                    "mode": "rtl",
                    "time": 174.608,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后一分钟！冲呀！！！！",
                    "mode": "top",
                    "time": 182.124,
                    "style": {
                        "fontSize": "25px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时十分钟",
                    "mode": "rtl",
                    "time": 321.465,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "前方核能！！！2分钟警告！！！！",
                    "mode": "top",
                    "time": 157.704,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后2分钟！！！",
                    "mode": "top",
                    "time": 145.557,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "两分钟！",
                    "mode": "top",
                    "time": 123.641,
                    "style": {
                        "fontSize": "25px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后三分钟！",
                    "mode": "top",
                    "time": 134.719,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "到计时4分钟",
                    "mode": "top",
                    "time": 131.077,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱奇艺上线了，擦",
                    "mode": "top",
                    "time": 38.823,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "七分钟！",
                    "mode": "top",
                    "time": 263.659,
                    "style": {
                        "fontSize": "25px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有8分钟！",
                    "mode": "rtl",
                    "time": 360.673,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后九分钟",
                    "mode": "top",
                    "time": 96.076,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后十分钟，见证奇迹",
                    "mode": "rtl",
                    "time": 213.005,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有10分10分，坚持住。",
                    "mode": "rtl",
                    "time": 126.844,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "10分钟！！！",
                    "mode": "rtl",
                    "time": 362.703,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时十分钟",
                    "mode": "rtl",
                    "time": 320.481,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "是被选中后",
                    "mode": "bottom",
                    "time": 197.762,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "そんな荒野に",
                    "mode": "bottom",
                    "time": 376.577,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "それとも　綺麗かい",
                    "mode": "bottom",
                    "time": 322.997,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "勇気だから",
                    "mode": "bottom",
                    "time": 259.61,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "許し合う声と",
                    "mode": "bottom",
                    "time": 224.51,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "揺らぐことない意志",
                    "mode": "bottom",
                    "time": 207.603,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "若しくは遥かな",
                    "mode": "bottom",
                    "time": 204.163,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "選び選ばれた",
                    "mode": "bottom",
                    "time": 197.114,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "はたまだ神の",
                    "mode": "bottom",
                    "time": 191.013,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "サダメとはつまり",
                    "mode": "bottom",
                    "time": 183.353,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "抱有幻想",
                    "mode": "bottom",
                    "time": 307.264,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "彼此谅解的声音",
                    "mode": "bottom",
                    "time": 224.691,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "不断累计的憎恶",
                    "mode": "bottom",
                    "time": 221.387,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "无法实现的愿望",
                    "mode": "bottom",
                    "time": 211.356,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "命运究竟是",
                    "mode": "bottom",
                    "time": 183.946,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "都处在我心中",
                    "mode": "bottom",
                    "time": 86.051,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "马丽奥吃大蘑菇",
                    "mode": "top",
                    "time": 15.291,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一镜到底真的牛逼",
                    "mode": "rtl",
                    "time": 201.104,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "马里奥吃大蘑菇",
                    "mode": "top",
                    "time": 15.414,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "刚刚闪过阳光眩光",
                    "mode": "rtl",
                    "time": 198.389,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "实现不了的重逢",
                    "mode": "bottom",
                    "time": 214.823,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "其实都应该明白",
                    "mode": "bottom",
                    "time": 59.221,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我能做到的还有什么",
                    "mode": "rtl",
                    "time": 125.662,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "前方高能",
                    "mode": "top",
                    "time": 292.31,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "无法实现的心愿  无法兑现的再会",
                    "mode": "bottom",
                    "time": 211.449,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "所谓命运就是骰子显示的数字",
                    "mode": "bottom",
                    "time": 184.28,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "无论是统治者还是神  都有些事不关己的样子",
                    "mode": "bottom",
                    "time": 52.395,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "放晴了诶！",
                    "mode": "rtl",
                    "time": 403.433,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "小破站太棒啦",
                    "mode": "rtl",
                    "time": 85.261,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "钢琴————————",
                    "mode": "rtl",
                    "time": 135.448,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "高能4：55",
                    "mode": "top",
                    "time": 90.962,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "超喜欢这一段",
                    "mode": "rtl",
                    "time": 377.312,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "请回答我!",
                    "mode": "rtl",
                    "time": 344.04,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "王者他考完",
                    "mode": "rtl",
                    "time": 235.345,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还是喜欢优也唱的",
                    "mode": "rtl",
                    "time": 173.1,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "字幕君辛苦了(≧∇≦)/",
                    "mode": "rtl",
                    "time": 340.739,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这取景太棒了也",
                    "mode": "rtl",
                    "time": 425.66,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "现在要放晴了哦",
                    "mode": "rtl",
                    "time": 432.342,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "7分钟真短，一下就过了",
                    "mode": "rtl",
                    "time": 368.802,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一镜到底！",
                    "mode": "rtl",
                    "time": 370.813,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛の歌も",
                    "mode": "bottom",
                    "time": 354.318,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "選び選ばれた",
                    "mode": "bottom",
                    "time": 197.268,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "定めとはつまり",
                    "mode": "bottom",
                    "time": 183.135,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君が今もまだ",
                    "mode": "bottom",
                    "time": 81.668,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "辛苦了字幕君",
                    "mode": "rtl",
                    "time": 431.154,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "泉城济南正在大雨",
                    "mode": "rtl",
                    "time": 320.68,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "八月的东京在下雪",
                    "mode": "top",
                    "time": 207.533,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "八月的东京在下雪",
                    "mode": "top",
                    "time": 207.533,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "洋子！！！！！！！",
                    "mode": "rtl",
                    "time": 393.096,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "终于能在B站看天气之子了，但是陪我一起的人已经不在了",
                    "mode": "rtl",
                    "time": 44.86,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "等我有钱了，一定会在b站充会员",
                    "mode": "rtl",
                    "time": 205.232,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "开头再见，各位",
                    "mode": "rtl",
                    "time": 446.179,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "辛苦字幕君",
                    "mode": "rtl",
                    "time": 423.779,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "会员专享我枯了",
                    "mode": "rtl",
                    "time": 195.219,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "挺好奇最后那摩斯密码是什么意思",
                    "mode": "rtl",
                    "time": 166.305,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢字幕下",
                    "mode": "bottom",
                    "time": 132.609,
                    "style": {
                        "fontSize": "18px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "18px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "结婚的时候我要用这首歌",
                    "mode": "rtl",
                    "time": 328.988,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "拯救世界是因为这个世界有你，如果要牺牲你，我为什么要拯救世界",
                    "mode": "rtl",
                    "time": 225.036,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "后面光影好评",
                    "mode": "rtl",
                    "time": 396.361,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这个一镜到底是真的NB",
                    "mode": "rtl",
                    "time": 444.7,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "放睛啦",
                    "mode": "top",
                    "time": 365.015,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "比起晴天 我更需要你",
                    "mode": "rtl",
                    "time": 204.343,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e2027f",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e2027f",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "比起晴天，我更需要你！",
                    "mode": "rtl",
                    "time": 199.881,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "怎么拍出来的",
                    "mode": "rtl",
                    "time": 440.186,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我这里也在下雨",
                    "mode": "rtl",
                    "time": 292.341,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "三十分了",
                    "mode": "rtl",
                    "time": 119.8,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我还以为是自带的字幕",
                    "mode": "rtl",
                    "time": 131.333,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有1分钟",
                    "mode": "rtl",
                    "time": 446.313,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后一分！！！！！！，！！！",
                    "mode": "rtl",
                    "time": 57.956,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后一分钟来，我们一起倒数。",
                    "mode": "rtl",
                    "time": 305.57,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一分钟",
                    "mode": "rtl",
                    "time": 404.537,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后一分钟！",
                    "mode": "rtl",
                    "time": 252.885,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一分钟！",
                    "mode": "rtl",
                    "time": 409.555,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一分钟",
                    "mode": "top",
                    "time": 161.406,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "三分钟！！！！！",
                    "mode": "top",
                    "time": 79.946,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时3分钟",
                    "mode": "top",
                    "time": 189.716,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "四分钟",
                    "mode": "rtl",
                    "time": 371.902,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有五分钟！",
                    "mode": "rtl",
                    "time": 263.955,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "六分钟！",
                    "mode": "top",
                    "time": 320.708,
                    "style": {
                        "fontSize": "25px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "放晴了诶",
                    "mode": "rtl",
                    "time": 307.114,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "八分钟倒计时",
                    "mode": "rtl",
                    "time": 253.98,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "已经买好会员了",
                    "mode": "rtl",
                    "time": 229.101,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "看完留下的是感动",
                    "mode": "rtl",
                    "time": 128.799,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "小破站nb！！！",
                    "mode": "rtl",
                    "time": 145.758,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "天气之子",
                    "mode": "rtl",
                    "time": 251.544,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "九分钟",
                    "mode": "rtl",
                    "time": 166.971,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "九分钟",
                    "mode": "rtl",
                    "time": 428.112,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "九分钟！",
                    "mode": "top",
                    "time": 149.606,
                    "style": {
                        "fontSize": "25px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "10分钟",
                    "mode": "rtl",
                    "time": 232.456,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有十分钟",
                    "mode": "rtl",
                    "time": 257.558,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "十分钟，还有十分钟",
                    "mode": "rtl",
                    "time": 111.857,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "会员已经准备好了",
                    "mode": "rtl",
                    "time": 119.484,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "安徽这里都被淹了",
                    "mode": "rtl",
                    "time": 283.659,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时10分钟",
                    "mode": "top",
                    "time": 154.855,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛の歌も",
                    "mode": "bottom",
                    "time": 353.577,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "よらい",
                    "mode": "bottom",
                    "time": 207.603,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "勇気や希望や　絆とかの魔法",
                    "mode": "bottom",
                    "time": 64.899,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "诚哥来了",
                    "mode": "rtl",
                    "time": 416.229,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "骰子掷出来的数字",
                    "mode": "bottom",
                    "time": 187.177,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢字幕君",
                    "mode": "rtl",
                    "time": 417.42,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一身鸡皮疙瘩",
                    "mode": "rtl",
                    "time": 436.155,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "前方高能！！！",
                    "mode": "rtl",
                    "time": 281.708,
                    "style": {
                        "fontSize": "25px",
                        "color": "#002e72",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#002e72",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "啊～",
                    "mode": "rtl",
                    "time": 245.349,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "神啊，求你，求你，求你。",
                    "mode": "rtl",
                    "time": 277.142,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这段长镜头",
                    "mode": "rtl",
                    "time": 96.924,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "字幕组，yyds",
                    "mode": "top",
                    "time": 335.938,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "骰子の出た目",
                    "mode": "top",
                    "time": 185.803,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "手术的加油！",
                    "mode": "rtl",
                    "time": 179.244,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "2.0倍速刚刚好……",
                    "mode": "rtl",
                    "time": 96.314,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还好我提前下载了",
                    "mode": "rtl",
                    "time": 259.045,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "看完电影和小说了，我锤爆，小坡站NB",
                    "mode": "rtl",
                    "time": 93.305,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "i了i了",
                    "mode": "rtl",
                    "time": 166.185,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "黄金体验！",
                    "mode": "rtl",
                    "time": 36.671,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我想见你，真的好像好像",
                    "mode": "rtl",
                    "time": 445.508,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "好感动",
                    "mode": "rtl",
                    "time": 136.182,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "字幕君辛苦了！！",
                    "mode": "rtl",
                    "time": 348.425,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱了爱了",
                    "mode": "rtl",
                    "time": 350.241,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "要放晴了！",
                    "mode": "rtl",
                    "time": 427.718,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "前方高能预警",
                    "mode": "rtl",
                    "time": 296.167,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "要高能了",
                    "mode": "rtl",
                    "time": 273.737,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这是漫画还是现实",
                    "mode": "rtl",
                    "time": 417.012,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "怎么听也听不腻呀",
                    "mode": "rtl",
                    "time": 309.559,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢野生字幕君",
                    "mode": "rtl",
                    "time": 115.695,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "答えてよ",
                    "mode": "bottom",
                    "time": 327.907,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "それとも、綺麗かい",
                    "mode": "bottom",
                    "time": 323.572,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "はたまた神の",
                    "mode": "bottom",
                    "time": 190.431,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "立ち向かう君が",
                    "mode": "bottom",
                    "time": 99.838,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "支配者も神も",
                    "mode": "bottom",
                    "time": 52.141,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "野田洋次郎，永远滴神！",
                    "mode": "rtl",
                    "time": 159.288,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "他的画风不一样",
                    "mode": "rtl",
                    "time": 110.308,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "i了i了",
                    "mode": "rtl",
                    "time": 123.307,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "字幕君辛苦了(≧∇≦)/",
                    "mode": "rtl",
                    "time": 338.013,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "恭喜你发现宝藏",
                    "mode": "rtl",
                    "time": 222.19,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "四点见！！！！！！！！",
                    "mode": "rtl",
                    "time": 107.239,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我这里晴天一个月了",
                    "mode": "rtl",
                    "time": 301.873,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "昨天腾讯已经看了",
                    "mode": "rtl",
                    "time": 174.437,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱奇艺看完了",
                    "mode": "rtl",
                    "time": 437.44,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "为什么不能要，小破站的版权也是拿钱买的",
                    "mode": "rtl",
                    "time": 201.209,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱他的他不需要理由爱他",
                    "mode": "rtl",
                    "time": 186.572,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "江西南昌降雨第一说什么了吗",
                    "mode": "rtl",
                    "time": 320.563,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "以为陈奕迅",
                    "mode": "rtl",
                    "time": 83.203,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "提前十分钟了",
                    "mode": "rtl",
                    "time": 165.909,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "帆高在弹琴",
                    "mode": "rtl",
                    "time": 402.922,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我电影院看了一遍",
                    "mode": "rtl",
                    "time": 77.06,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这来的也太晚了吧",
                    "mode": "rtl",
                    "time": 121.086,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一分钟",
                    "mode": "rtl",
                    "time": 214.891,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "怎么还没来啊",
                    "mode": "rtl",
                    "time": 267.832,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一分钟",
                    "mode": "rtl",
                    "time": 259.167,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "哇哇哇哇！！！！",
                    "mode": "rtl",
                    "time": 85.061,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一分钟",
                    "mode": "rtl",
                    "time": 276.154,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "十秒",
                    "mode": "rtl",
                    "time": 127.794,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一分钟",
                    "mode": "rtl",
                    "time": 255.468,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "1分钟！！！",
                    "mode": "top",
                    "time": 186.162,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有一分钟",
                    "mode": "rtl",
                    "time": 245.914,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有一分钟！！！！！",
                    "mode": "rtl",
                    "time": 62.64,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后一分钟",
                    "mode": "rtl",
                    "time": 376.131,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "gkdgkd",
                    "mode": "rtl",
                    "time": 314.391,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有两分钟",
                    "mode": "rtl",
                    "time": 137.115,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有2分钟！！！！",
                    "mode": "rtl",
                    "time": 132.51,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "2分钟倒计时",
                    "mode": "rtl",
                    "time": 162.232,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "222",
                    "mode": "rtl",
                    "time": 229.431,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "到一阵时间了",
                    "mode": "rtl",
                    "time": 345.605,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "三分钟",
                    "mode": "rtl",
                    "time": 429.209,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时四分钟",
                    "mode": "rtl",
                    "time": 381.068,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "ohhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
                    "mode": "rtl",
                    "time": 355.571,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "要会员才可以看吗？",
                    "mode": "rtl",
                    "time": 263.304,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有五分钟",
                    "mode": "rtl",
                    "time": 420.911,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "五分钟",
                    "mode": "rtl",
                    "time": 390.286,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有五分钟！",
                    "mode": "top",
                    "time": 27.83,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "六分钟",
                    "mode": "rtl",
                    "time": 317.593,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15.54",
                    "mode": "rtl",
                    "time": 323.321,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有七分钟QAQ",
                    "mode": "rtl",
                    "time": 215.23,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时8分钟",
                    "mode": "rtl",
                    "time": 370.463,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "八分钟",
                    "mode": "rtl",
                    "time": 258.136,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "八分钟！",
                    "mode": "top",
                    "time": 207.057,
                    "style": {
                        "fontSize": "25px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有5分钟",
                    "mode": "rtl",
                    "time": 331.933,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "啊啊啊啊10分钟！！",
                    "mode": "rtl",
                    "time": 397.461,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "十分钟",
                    "mode": "rtl",
                    "time": 277.449,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "主要是会员专享啊啊啊",
                    "mode": "rtl",
                    "time": 175.019,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "十分钟",
                    "mode": "top",
                    "time": 216.317,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "十分钟",
                    "mode": "rtl",
                    "time": 137.711,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有十分钟啦！",
                    "mode": "rtl",
                    "time": 343.469,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "10分钟",
                    "mode": "rtl",
                    "time": 270.977,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有10分钟",
                    "mode": "rtl",
                    "time": 412.962,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "10分钟后见",
                    "mode": "rtl",
                    "time": 224.552,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时10分钟！！",
                    "mode": "top",
                    "time": 38.138,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "小破站牛逼",
                    "mode": "rtl",
                    "time": 65.95,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有10分钟",
                    "mode": "rtl",
                    "time": 178.971,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "答えてよ",
                    "mode": "bottom",
                    "time": 328.077,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "サイコロ出た目？",
                    "mode": "bottom",
                    "time": 186.453,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有爱能做到的事！",
                    "mode": "bottom",
                    "time": 389.939,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一分钟",
                    "mode": "bottom",
                    "time": 192.619,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "o，hhhhhhhhhhhhhhh",
                    "mode": "rtl",
                    "time": 400.492,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "小破站牛逼",
                    "mode": "rtl",
                    "time": 58.089,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "周昊 长中",
                    "mode": "rtl",
                    "time": 210.401,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "咯咯咯",
                    "mode": "bottom",
                    "time": 168.462,
                    "style": {
                        "fontSize": "18px",
                        "color": "#683a7b",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "18px sans-serif",
                        "fillStyle": "#683a7b",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "都在啊",
                    "mode": "top",
                    "time": 89.45,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "骰子掷出的数字？",
                    "mode": "bottom",
                    "time": 188.095,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢字幕组！",
                    "mode": "rtl",
                    "time": 144.599,
                    "style": {
                        "fontSize": "25px",
                        "color": "#cc0273",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#cc0273",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "野田洋次郎",
                    "mode": "rtl",
                    "time": 270.03,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "只有我一个觉得像老番茄嘛",
                    "mode": "rtl",
                    "time": 139.652,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "潍坊一星期的雨",
                    "mode": "rtl",
                    "time": 314.04,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "i了i了",
                    "mode": "rtl",
                    "time": 182.167,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "深圳全局暴雨",
                    "mode": "rtl",
                    "time": 396.59,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "果たさぬ願いと",
                    "mode": "bottom",
                    "time": 210.455,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "w这不是特效这不是贴小",
                    "mode": "rtl",
                    "time": 428.056,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "济南下雨了，阳菜还在",
                    "mode": "rtl",
                    "time": 298.073,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "前方高能20秒",
                    "mode": "rtl",
                    "time": 169.637,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我的小名叫帆高，谢谢你们同意阳菜是我的",
                    "mode": "rtl",
                    "time": 384.099,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢下方字幕",
                    "mode": "rtl",
                    "time": 341.099,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "看完了回来",
                    "mode": "rtl",
                    "time": 188.211,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "二次元赛高！",
                    "mode": "rtl",
                    "time": 221.463,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "前方高能",
                    "mode": "rtl",
                    "time": 276.641,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "年费会员在此",
                    "mode": "rtl",
                    "time": 259.71,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3",
                    "mode": "top",
                    "time": 445.781,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "5",
                    "mode": "rtl",
                    "time": 445.439,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "通通！！！！！！！！！！！",
                    "mode": "rtl",
                    "time": 48.776,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "7.22 暴雨下了两天了",
                    "mode": "rtl",
                    "time": 287.103,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "洋次郎啊啊啊啊",
                    "mode": "rtl",
                    "time": 152.035,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "1分钟！！！！！！！！！！！！！！",
                    "mode": "top",
                    "time": 39.761,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "hihi",
                    "mode": "rtl",
                    "time": 195.47,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "要会员怎么",
                    "mode": "rtl",
                    "time": 255.271,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "下雨了",
                    "mode": "rtl",
                    "time": 302.907,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "比起世界，我更爱你",
                    "mode": "rtl",
                    "time": 164.114,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "6点再见~我先去看电影了",
                    "mode": "rtl",
                    "time": 135.852,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有1分钟",
                    "mode": "rtl",
                    "time": 182.604,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一分钟倒计时",
                    "mode": "rtl",
                    "time": 135.472,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "30秒",
                    "mode": "rtl",
                    "time": 267.779,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "1分钟",
                    "mode": "rtl",
                    "time": 274.401,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一分钟",
                    "mode": "rtl",
                    "time": 215.789,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "1分钟",
                    "mode": "rtl",
                    "time": 239.279,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后两分钟",
                    "mode": "rtl",
                    "time": 270.731,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时两分钟",
                    "mode": "rtl",
                    "time": 323.903,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "两分钟倒计时",
                    "mode": "rtl",
                    "time": 217.403,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "2分钟",
                    "mode": "rtl",
                    "time": 309.606,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时两分钟",
                    "mode": "rtl",
                    "time": 182.548,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "两分钟",
                    "mode": "top",
                    "time": 65.915,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3分钟后见！",
                    "mode": "rtl",
                    "time": 152.045,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有4分钟",
                    "mode": "rtl",
                    "time": 221.606,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时5分钟",
                    "mode": "rtl",
                    "time": 328.862,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时5分钟",
                    "mode": "top",
                    "time": 45.575,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后四分钟",
                    "mode": "rtl",
                    "time": 436.659,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "5分钟倒计时！",
                    "mode": "rtl",
                    "time": 440.823,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有五分钟",
                    "mode": "rtl",
                    "time": 214.425,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有5分钟",
                    "mode": "rtl",
                    "time": 252.398,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "五分钟！",
                    "mode": "top",
                    "time": 378.685,
                    "style": {
                        "fontSize": "25px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "6分钟",
                    "mode": "top",
                    "time": 120.63,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有七分钟",
                    "mode": "rtl",
                    "time": 342.219,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15.53",
                    "mode": "rtl",
                    "time": 262.813,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15.53",
                    "mode": "rtl",
                    "time": 231.036,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "7分钟",
                    "mode": "rtl",
                    "time": 203.313,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有8分钟",
                    "mode": "rtl",
                    "time": 216.323,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15.52",
                    "mode": "rtl",
                    "time": 201.12,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "马上！！！",
                    "mode": "rtl",
                    "time": 205.075,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "字幕君辛苦了",
                    "mode": "rtl",
                    "time": 423.275,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "八分钟",
                    "mode": "rtl",
                    "time": 209.539,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有十分钟",
                    "mode": "rtl",
                    "time": 180.779,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "10分钟啦",
                    "mode": "rtl",
                    "time": 266.13,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有10分钟",
                    "mode": "rtl",
                    "time": 133.148,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "10分钟",
                    "mode": "rtl",
                    "time": 210.76,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有十分钟",
                    "mode": "top",
                    "time": 2.794,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "十分钟",
                    "mode": "rtl",
                    "time": 246.983,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后10分钟",
                    "mode": "rtl",
                    "time": 302.711,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "10",
                    "mode": "rtl",
                    "time": 261.469,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "三点五十",
                    "mode": "rtl",
                    "time": 148.099,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有11分钟",
                    "mode": "rtl",
                    "time": 159.537,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "前方高能预警",
                    "mode": "rtl",
                    "time": 293.916,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "[ohhhhhhhhhhhhhhhhhhhhhhhhhh，h]",
                    "mode": "rtl",
                    "time": 392.316,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛した愛した",
                    "mode": "rtl",
                    "time": 388.306,
                    "style": {
                        "fontSize": "18px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "18px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "甜甜好",
                    "mode": "rtl",
                    "time": 140.089,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "酷狗音乐",
                    "mode": "rtl",
                    "time": 57.258,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "七月十九",
                    "mode": "rtl",
                    "time": 199.076,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我的城市在下雨，HHL你还好吗？",
                    "mode": "rtl",
                    "time": 382.168,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "哇呜呜呜呜呜呜呜呜呜呜",
                    "mode": "top",
                    "time": 344.177,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "放晴了呢",
                    "mode": "rtl",
                    "time": 358.417,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有爱能够做到的事吗？",
                    "mode": "bottom",
                    "time": 2.419,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢字幕君！！！！",
                    "mode": "rtl",
                    "time": 125.172,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "涛涛涛涛",
                    "mode": "rtl",
                    "time": 349.271,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "他にどんな愛があるの?",
                    "mode": "rtl",
                    "time": 178.868,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "野甜甜永远滴神",
                    "mode": "rtl",
                    "time": 147.931,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "RADWIMPS永远滴神",
                    "mode": "rtl",
                    "time": 130.131,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "马里奥吃大蘑菇",
                    "mode": "top",
                    "time": 16.82,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后5秒",
                    "mode": "rtl",
                    "time": 221.3,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "洋子好帅！！",
                    "mode": "rtl",
                    "time": 150.614,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "勝者の時代に",
                    "mode": "bottom",
                    "time": 31.435,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "阳赖 帆高",
                    "mode": "rtl",
                    "time": 397.663,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "许愿一本",
                    "mode": "rtl",
                    "time": 367.826,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢字幕君",
                    "mode": "rtl",
                    "time": 136.762,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e2027f",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e2027f",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢字幕君！",
                    "mode": "rtl",
                    "time": 334.939,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "再来一遍",
                    "mode": "rtl",
                    "time": 28.097,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "下雨天拍的mv吗？",
                    "mode": "rtl",
                    "time": 141.892,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "5",
                    "mode": "top",
                    "time": 445.3,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "两分钟",
                    "mode": "rtl",
                    "time": 307.301,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时",
                    "mode": "rtl",
                    "time": 372.234,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有俩分钟还有",
                    "mode": "rtl",
                    "time": 58.387,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一分钟一分钟",
                    "mode": "rtl",
                    "time": 357.315,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后一分钟！！！！",
                    "mode": "top",
                    "time": 4.969,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "58",
                    "mode": "rtl",
                    "time": 224.921,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "两分钟",
                    "mode": "rtl",
                    "time": 176.543,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15.58",
                    "mode": "top",
                    "time": 139.732,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有3分钟！",
                    "mode": "rtl",
                    "time": 163.973,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时三分钟",
                    "mode": "rtl",
                    "time": 213.74,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "57",
                    "mode": "rtl",
                    "time": 297.018,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后5分钟",
                    "mode": "rtl",
                    "time": 154.728,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时五分钟",
                    "mode": "rtl",
                    "time": 84.46,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "五分钟",
                    "mode": "rtl",
                    "time": 162.723,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有六分钟",
                    "mode": "rtl",
                    "time": 365.299,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "7！",
                    "mode": "rtl",
                    "time": 418.095,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "52",
                    "mode": "rtl",
                    "time": 418.439,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "八分钟",
                    "mode": "rtl",
                    "time": 104.23,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "8分钟",
                    "mode": "rtl",
                    "time": 433.043,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "快去买会员",
                    "mode": "rtl",
                    "time": 202.78,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后九分钟。",
                    "mode": "rtl",
                    "time": 163.01,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有9分钟",
                    "mode": "rtl",
                    "time": 170.599,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "10分钟倒计时",
                    "mode": "rtl",
                    "time": 358.259,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "51",
                    "mode": "rtl",
                    "time": 269.932,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "十分钟",
                    "mode": "rtl",
                    "time": 251.944,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时11分钟",
                    "mode": "rtl",
                    "time": 373.906,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "小破站nb",
                    "mode": "rtl",
                    "time": 78.239,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有10分钟",
                    "mode": "rtl",
                    "time": 91.464,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有十分钟",
                    "mode": "rtl",
                    "time": 98.01,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "果たさぬ願いと",
                    "mode": "bottom",
                    "time": 212.232,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "看不到我",
                    "mode": "rtl",
                    "time": 181.776,
                    "style": {
                        "fontSize": "18px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "18px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "天台！！！！！",
                    "mode": "rtl",
                    "time": 295.1,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "呜呜呜，为什么要会员呜呜呜",
                    "mode": "rtl",
                    "time": 18.489,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "[ohhhhhhhhhhhhhhhh h]",
                    "mode": "rtl",
                    "time": 384.763,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "[ohhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh]",
                    "mode": "rtl",
                    "time": 370.142,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "啊啊啊啊啊",
                    "mode": "rtl",
                    "time": 303.775,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "tokyo东京",
                    "mode": "rtl",
                    "time": 419.579,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢野生弹幕君",
                    "mode": "rtl",
                    "time": 172.592,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "答えてよ",
                    "mode": "rtl",
                    "time": 327.142,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢字幕组",
                    "mode": "rtl",
                    "time": 129.891,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢字幕",
                    "mode": "rtl",
                    "time": 422.551,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢字幕君",
                    "mode": "rtl",
                    "time": 343.007,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "十点准时",
                    "mode": "rtl",
                    "time": 352.482,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "谢谢字幕君",
                    "mode": "rtl",
                    "time": 154.902,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "1分钟",
                    "mode": "rtl",
                    "time": 161.431,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "真耐听",
                    "mode": "rtl",
                    "time": 368.123,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "ohhhhhhh",
                    "mode": "top",
                    "time": 355.994,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "回答我啊",
                    "mode": "rtl",
                    "time": 327.543,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "1",
                    "mode": "top",
                    "time": 448.554,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "2",
                    "mode": "top",
                    "time": 448.201,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "10",
                    "mode": "rtl",
                    "time": 109.779,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "1",
                    "mode": "rtl",
                    "time": 199.092,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "1",
                    "mode": "rtl",
                    "time": 197.42,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢弹幕君",
                    "mode": "rtl",
                    "time": 346.432,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "7分钟后见",
                    "mode": "rtl",
                    "time": 98.447,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一分钟",
                    "mode": "rtl",
                    "time": 118.987,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "两分钟！",
                    "mode": "top",
                    "time": 65.051,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "四点半了！",
                    "mode": "top",
                    "time": 46.077,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "小破站NB",
                    "mode": "rtl",
                    "time": 69.5,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有一分钟",
                    "mode": "rtl",
                    "time": 143.075,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有2分钟",
                    "mode": "rtl",
                    "time": 183.737,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "2分钟",
                    "mode": "rtl",
                    "time": 143.586,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有2分钟！",
                    "mode": "rtl",
                    "time": 381.462,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有2分钟",
                    "mode": "rtl",
                    "time": 199.674,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "2分钟",
                    "mode": "rtl",
                    "time": 367.579,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有三分钟",
                    "mode": "rtl",
                    "time": 82.891,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时3分钟",
                    "mode": "rtl",
                    "time": 75.596,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15.56",
                    "mode": "rtl",
                    "time": 436.208,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "五分钟",
                    "mode": "rtl",
                    "time": 339.305,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还五分钟",
                    "mode": "rtl",
                    "time": 97.909,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15.55",
                    "mode": "rtl",
                    "time": 379.843,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "六分钟",
                    "mode": "rtl",
                    "time": 372.218,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "6分钟",
                    "mode": "rtl",
                    "time": 380.321,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "9分钟",
                    "mode": "rtl",
                    "time": 389.856,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "1550",
                    "mode": "rtl",
                    "time": 165.971,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "10分钟",
                    "mode": "rtl",
                    "time": 149.002,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有10分钟!",
                    "mode": "rtl",
                    "time": 129.151,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15-50",
                    "mode": "rtl",
                    "time": 187.664,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有10分钟",
                    "mode": "rtl",
                    "time": 89.889,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "为啥是下午六点见(*ﾟ∀ﾟ*)",
                    "mode": "top",
                    "time": 3.019,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "字幕就位",
                    "mode": "bottom",
                    "time": 7.999,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "小破站nb",
                    "mode": "rtl",
                    "time": 94.655,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "哈～",
                    "mode": "bottom",
                    "time": 44.672,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "刘泽成",
                    "mode": "rtl",
                    "time": 189.981,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "表白字幕君",
                    "mode": "rtl",
                    "time": 326.219,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一时间分不清是现实还是动漫",
                    "mode": "rtl",
                    "time": 42.145,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "永爱野洋田次朗",
                    "mode": "rtl",
                    "time": 83.539,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "1433",
                    "mode": "rtl",
                    "time": 189.674,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我也一个人",
                    "mode": "rtl",
                    "time": 182.559,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "空气之子",
                    "mode": "rtl",
                    "time": 41.231,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "啊！爱啦啦",
                    "mode": "rtl",
                    "time": 355.219,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "字幕君辛苦",
                    "mode": "rtl",
                    "time": 433.924,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "啊啊啊",
                    "mode": "rtl",
                    "time": 329.988,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "在数电影上映时间",
                    "mode": "rtl",
                    "time": 354.748,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "分かってるはず",
                    "mode": "bottom",
                    "time": 61.195,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "好美呀！点赞，点赞！",
                    "mode": "rtl",
                    "time": 38.899,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "阳菜只能是帆高的",
                    "mode": "rtl",
                    "time": 354.289,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "i了i了",
                    "mode": "bottom",
                    "time": 61.461,
                    "style": {
                        "fontSize": "25px",
                        "color": "#683a7b",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#683a7b",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "最后一分钟",
                    "mode": "rtl",
                    "time": 73.28,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "1分钟",
                    "mode": "rtl",
                    "time": 425.56,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "倒计时",
                    "mode": "rtl",
                    "time": 354.65,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "啊啊啊啊啊3点57",
                    "mode": "rtl",
                    "time": 186.81,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "5分钟",
                    "mode": "rtl",
                    "time": 430.632,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "6分钟",
                    "mode": "rtl",
                    "time": 433.84,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "五分钟",
                    "mode": "rtl",
                    "time": 379.185,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "12分钟",
                    "mode": "rtl",
                    "time": 181.042,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "太震撼了",
                    "mode": "rtl",
                    "time": 354.573,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢字幕君！！",
                    "mode": "top",
                    "time": 438.29,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "哈～",
                    "mode": "bottom",
                    "time": 37.457,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "8分钟",
                    "mode": "rtl",
                    "time": 327.508,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "哔哩哔哩 - ( ゜- ゜)つロ 乾杯~",
                    "mode": "rtl",
                    "time": 55.355,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e2027f",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e2027f",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "天台啊啊啊啊啊！！！",
                    "mode": "rtl",
                    "time": 321.015,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "陽菜",
                    "mode": "rtl",
                    "time": 384.02,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "陶怡蓉，我喜欢你",
                    "mode": "rtl",
                    "time": 402.556,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "阳菜，太阳出来了",
                    "mode": "rtl",
                    "time": 365.242,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "泪目",
                    "mode": "rtl",
                    "time": 7.946,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "正片开始",
                    "mode": "rtl",
                    "time": 124.513,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "7.13 12:00",
                    "mode": "rtl",
                    "time": 406.639,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "在学校和女朋友看的",
                    "mode": "rtl",
                    "time": 266.78,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "是你给我的勇气，因此我要为你奋不顾身",
                    "mode": "rtl",
                    "time": 128.54,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君がくれだ　勇気だから",
                    "mode": "rtl",
                    "time": 125.401,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできることはまだあるかい",
                    "mode": "rtl",
                    "time": 113.715,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできることはまだあるかい？",
                    "mode": "rtl",
                    "time": 108.095,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "牛逼",
                    "mode": "rtl",
                    "time": 372.575,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "赵西西啊 我部长了你回来好吗",
                    "mode": "top",
                    "time": 28.437,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么",
                    "mode": "top",
                    "time": 108.4,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "なぜ希望を持たせたか",
                    "mode": "rtl",
                    "time": 318.871,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "有点像一位硬汉",
                    "mode": "rtl",
                    "time": 83.659,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这不跳支舞吗？例如loser那种/狗头",
                    "mode": "rtl",
                    "time": 316.163,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "留下脚丫",
                    "mode": "rtl",
                    "time": 422.867,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできることはまだあるかい",
                    "mode": "bottom",
                    "time": 244.045,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできることはまだあるかい",
                    "mode": "bottom",
                    "time": 241.145,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "立ち向かう君が　いまもここにいる",
                    "mode": "bottom",
                    "time": 99.589,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "向けてもまだなお",
                    "mode": "bottom",
                    "time": 96.875,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕の全正義の　ど真ん中にいる",
                    "mode": "bottom",
                    "time": 86.196,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "それでもあの日の　君が今もまだ",
                    "mode": "bottom",
                    "time": 79.087,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "使い道もなく　大人は目を背ける",
                    "mode": "bottom",
                    "time": 72.495,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "だけど本当は",
                    "mode": "bottom",
                    "time": 59.403,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "勝者の時代に　何処で息を吸",
                    "mode": "bottom",
                    "time": 33.695,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "拿你摸摸打死你",
                    "mode": "top",
                    "time": 12.175,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爷青回",
                    "mode": "rtl",
                    "time": 128.705,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "拿你馍馍打死你",
                    "mode": "top",
                    "time": 10.856,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "Struggle through the years of time",
                    "mode": "top",
                    "time": 18.139,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛ができることは他に何があるの?",
                    "mode": "top",
                    "time": 2.459,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "你……但",
                    "mode": "bottom",
                    "time": 383.539,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这些爱也在许多电影中被述尽",
                    "mode": "bottom",
                    "time": 366.819,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "即便如此还要紧紧抓住的我们  丑陋吗？",
                    "mode": "bottom",
                    "time": 318.135,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "为何赐予我们的一切只在手中一掠而过？",
                    "mode": "bottom",
                    "time": 310.903,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "若不与你培育便会黯然无光",
                    "mode": "bottom",
                    "time": 277.31,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "与你孕育的这份爱",
                    "mode": "bottom",
                    "time": 270.463,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "因此我想为你奋不顾身",
                    "mode": "bottom",
                    "time": 263.927,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "不断堆积的憎恶",
                    "mode": "bottom",
                    "time": 221.793,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "难以脱下的甲胄",
                    "mode": "bottom",
                    "time": 201.25,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "或又是神明反复无常的性情",
                    "mode": "bottom",
                    "time": 191.812,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有我能够做到的事吗?",
                    "mode": "bottom",
                    "time": 157.779,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "若不与你分享便会黯然失色",
                    "mode": "bottom",
                    "time": 145.638,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "要与你分享这份爱",
                    "mode": "bottom",
                    "time": 138.105,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "因此我想为你奋不顾身",
                    "mode": "bottom",
                    "time": 131.1,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有爱能够做到是事吗？",
                    "mode": "bottom",
                    "time": 106.295,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这样的你如今仍然会在这靶心",
                    "mode": "bottom",
                    "time": 99.436,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这样的你如今仍会在这靶心",
                    "mode": "rtl",
                    "time": 100.094,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "都处于我内心中一切正义的靶心",
                    "mode": "bottom",
                    "time": 86.343,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "纵使这样那天的你至始自终",
                    "mode": "bottom",
                    "time": 79.892,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "全部失效时 成年人都会选择逃避",
                    "mode": "bottom",
                    "time": 72.971,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "已放弃的和明智的那些人",
                    "mode": "bottom",
                    "time": 24.887,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "在永恒无尽的夹缝中 痛苦挣扎",
                    "mode": "bottom",
                    "time": 16.368,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "变绿",
                    "mode": "rtl",
                    "time": 410.648,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "变绿",
                    "mode": "rtl",
                    "time": 194.134,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "变绿",
                    "mode": "rtl",
                    "time": 224.498,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "凌晨了 陪我看的那个陌生人 我爱你",
                    "mode": "rtl",
                    "time": 149.677,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "大丈夫",
                    "mode": "rtl",
                    "time": 102.168,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "即使如此依旧用力想要抓住的我们     样子丑陋吗",
                    "mode": "bottom",
                    "time": 319.263,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "为何给予我们的一切",
                    "mode": "bottom",
                    "time": 311.327,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "无法消弭的误解  不断累积的憎恶",
                    "mode": "bottom",
                    "time": 217.825,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么",
                    "mode": "bottom",
                    "time": 152.512,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么",
                    "mode": "bottom",
                    "time": 106.179,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "存在于我所有正義的正中心",
                    "mode": "bottom",
                    "time": 85.987,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "毫无用处  所以大人们都视而不见",
                    "mode": "bottom",
                    "time": 72.021,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "才是胜者的时代里苟延残喘着",
                    "mode": "bottom",
                    "time": 31.735,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我在唯有不报希望的人与足够智慧的人",
                    "mode": "bottom",
                    "time": 26.127,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么",
                    "mode": "bottom",
                    "time": 2.787,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "以后谈恋爱要带女朋友去电影院看诚哥电影",
                    "mode": "rtl",
                    "time": 285.279,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "大好き",
                    "mode": "rtl",
                    "time": 175.019,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱还不能做些什么呢",
                    "mode": "rtl",
                    "time": 204.442,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "。。。",
                    "mode": "rtl",
                    "time": 217.99,
                    "style": {
                        "fontSize": "25px",
                        "color": "#927939",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#927939",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "好",
                    "mode": "bottom",
                    "time": 139.168,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做的还有什么？",
                    "mode": "bottom",
                    "time": 351.225,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么",
                    "mode": "rtl",
                    "time": 119.891,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e2027f",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e2027f",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "只有那天的你 自始至终",
                    "mode": "bottom",
                    "time": 79.123,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "“愛ができることは他に何がありますか?”",
                    "mode": "top",
                    "time": 110.179,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "nb",
                    "mode": "rtl",
                    "time": 347.086,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "和兄dei在一起了没？",
                    "mode": "rtl",
                    "time": 194.939,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "ma da a ru ka i",
                    "mode": "bottom",
                    "time": 4.414,
                    "style": {
                        "fontSize": "25px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "a i ni de ki ru ko to ha",
                    "mode": "bottom",
                    "time": 2.622,
                    "style": {
                        "fontSize": "25px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "和全班一半女生去看的",
                    "mode": "rtl",
                    "time": 91.53,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱还能做到什么",
                    "mode": "top",
                    "time": 126.979,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛ができることは他に何があるの?",
                    "mode": "rtl",
                    "time": 155.943,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "马里奥耻大蘑菇",
                    "mode": "rtl",
                    "time": 381.552,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "10月1号仍然还回来看",
                    "mode": "bottom",
                    "time": 346.508,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "2020国庆节10月1号前来回顾",
                    "mode": "bottom",
                    "time": 7.099,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "传送0:00",
                    "mode": "rtl",
                    "time": 223.348,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢感谢",
                    "mode": "rtl",
                    "time": 334.792,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "此生无悔入b站   来世还做b站人!",
                    "mode": "rtl",
                    "time": 23.519,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "9.27",
                    "mode": "rtl",
                    "time": 318.204,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "哔哩哔哩乾杯 []~（￣▽￣）~*",
                    "mode": "rtl",
                    "time": 80.746,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "泪目",
                    "mode": "rtl",
                    "time": 332.091,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "下面蓝色字幕君！！！！幸苦了^_^",
                    "mode": "rtl",
                    "time": 223.552,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "辛苦了",
                    "mode": "rtl",
                    "time": 415.562,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君と育てだ愛だから",
                    "mode": "bottom",
                    "time": 271.948,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "再来一遍0:00",
                    "mode": "rtl",
                    "time": 407.373,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "冲冲冲",
                    "mode": "rtl",
                    "time": 335.985,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "好好好好",
                    "mode": "rtl",
                    "time": 350.533,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这个乐器加入的场景太棒了",
                    "mode": "top",
                    "time": 130.34,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "来了",
                    "mode": "rtl",
                    "time": 385.515,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "说的老番茄你不是一个人",
                    "mode": "rtl",
                    "time": 148.941,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "炸！",
                    "mode": "rtl",
                    "time": 331.504,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "I need to know is there still anything that l can do",
                    "mode": "bottom",
                    "time": 112.576,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "I need to know is there still anything that love can do",
                    "mode": "bottom",
                    "time": 105.796,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么",
                    "mode": "top",
                    "time": 156.36,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "博古李德？？（空耳",
                    "mode": "rtl",
                    "time": 159.602,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "Yamaha GG(钢琴嚴禁接觸水气)",
                    "mode": "rtl",
                    "time": 378.139,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "你们怎么打出的日文？？。",
                    "mode": "top",
                    "time": 173.459,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一镜到底",
                    "mode": "rtl",
                    "time": 245.999,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我能做的还有什么",
                    "mode": "top",
                    "time": 305.416,
                    "style": {
                        "fontSize": "25px",
                        "color": "#4266be",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#4266be",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "前面那个因为av喜欢上这首歌的站住，你要笑死我",
                    "mode": "rtl",
                    "time": 43.628,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "牛逼",
                    "mode": "rtl",
                    "time": 125.339,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "清唱",
                    "mode": "rtl",
                    "time": 370.949,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "喜欢",
                    "mode": "rtl",
                    "time": 203.859,
                    "style": {
                        "fontSize": "25px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "喜欢你",
                    "mode": "rtl",
                    "time": 197.379,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "拿火机把袜点咯",
                    "mode": "top",
                    "time": 22.92,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "那你摸摸打死你",
                    "mode": "top",
                    "time": 12.875,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "RTX on",
                    "mode": "rtl",
                    "time": 427.771,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "，，",
                    "mode": "bottom",
                    "time": 281.604,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "辛苦了",
                    "mode": "rtl",
                    "time": 428.257,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできることはまだあるよ......",
                    "mode": "bottom",
                    "time": 397.609,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできることはまだあるよ",
                    "mode": "bottom",
                    "time": 390.802,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君、それ、でも",
                    "mode": "bottom",
                    "time": 383.275,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "そんな荒野に、生まれ落ちた僕",
                    "mode": "bottom",
                    "time": 376.372,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "語られ尽くした",
                    "mode": "bottom",
                    "time": 372.622,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕らは醜いかい",
                    "mode": "bottom",
                    "time": 320.115,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "それでもなおしがみつく",
                    "mode": "bottom",
                    "time": 317.645,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "物ばかり与えたか？",
                    "mode": "bottom",
                    "time": 313.816,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "なぜこの手をすり抜ける",
                    "mode": "bottom",
                    "time": 310.843,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "終わりある人生に、なぜ希望を持たせたか？",
                    "mode": "bottom",
                    "time": 304.187,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "何もない僕たちに、なぜ夢をみさせたか？",
                    "mode": "bottom",
                    "time": 297.413,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできる、ことはまだあるかい？",
                    "mode": "bottom",
                    "time": 289.807,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にでき、ことはまだあるかい？",
                    "mode": "bottom",
                    "time": 283.141,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君とじゃなぎゃ、意味がないんだ",
                    "mode": "bottom",
                    "time": 277.559,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君の育てた愛だから",
                    "mode": "bottom",
                    "time": 270.648,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君かくれた、勇気だから",
                    "mode": "bottom",
                    "time": 257.19,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできる、ことはまだあるかい？",
                    "mode": "bottom",
                    "time": 244.758,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできる、ことはまだあるかい？",
                    "mode": "bottom",
                    "time": 237.362,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "抱えて生きてる",
                    "mode": "bottom",
                    "time": 234.114,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "握りしめ合う手を",
                    "mode": "bottom",
                    "time": 227.082,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "降り積もる憎悪と",
                    "mode": "bottom",
                    "time": 220.501,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "脱げられぬ鎧",
                    "mode": "bottom",
                    "time": 200.246,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "いつものきまぐれ",
                    "mode": "bottom",
                    "time": 193.509,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできる、ことはまだあるかい？（又打错了）",
                    "mode": "bottom",
                    "time": 160.214,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできる、ことはまだあるかお？",
                    "mode": "bottom",
                    "time": 157.805,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできる、ことはまだあるかい？",
                    "mode": "bottom",
                    "time": 150.884,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君とじゃなぎゃ、意味がないんだ（下面的字幕打错了，修正一下！）",
                    "mode": "bottom",
                    "time": 147.272,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君とじゃきゃ、意味がないんだ",
                    "mode": "bottom",
                    "time": 144.782,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君と分け合った愛だから",
                    "mode": "bottom",
                    "time": 138.637,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君がくれた、勇気だから",
                    "mode": "bottom",
                    "time": 126.834,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできる、ことはまだあるかい？",
                    "mode": "bottom",
                    "time": 112.211,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできる、ことはまだあるがい？",
                    "mode": "bottom",
                    "time": 106.123,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕の前正義の",
                    "mode": "bottom",
                    "time": 85.737,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "それでもあの日の",
                    "mode": "bottom",
                    "time": 79.388,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "大人は目を背ける",
                    "mode": "bottom",
                    "time": 75.121,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "だけど本当は",
                    "mode": "bottom",
                    "time": 58.302,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "何処で息を吸う",
                    "mode": "bottom",
                    "time": 34.237,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "賢いものだけが",
                    "mode": "bottom",
                    "time": 27.334,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできることはまだあるかい",
                    "mode": "bottom",
                    "time": 3.632,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ff7202",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ff7202",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "冲 冲 冲！",
                    "mode": "top",
                    "time": 62.309,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "高潮高潮",
                    "mode": "rtl",
                    "time": 111.774,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "博古，李德要考的哟",
                    "mode": "top",
                    "time": 400.551,
                    "style": {
                        "fontSize": "18px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "18px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做的还有很多啊",
                    "mode": "rtl",
                    "time": 363.24,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "来了来了",
                    "mode": "top",
                    "time": 47.269,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "11月1号",
                    "mode": "rtl",
                    "time": 394.4,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "来了来了",
                    "mode": "rtl",
                    "time": 128.428,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "希望",
                    "mode": "rtl",
                    "time": 349.701,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "好听",
                    "mode": "rtl",
                    "time": 192.514,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "下江北抓紧时间",
                    "mode": "rtl",
                    "time": 95.57,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "在家呢你抓紧时间",
                    "mode": "rtl",
                    "time": 78.69,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么",
                    "mode": "rtl",
                    "time": 151.01,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "到了！兄弟们",
                    "mode": "rtl",
                    "time": 79.593,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "炸天帮流弊",
                    "mode": "rtl",
                    "time": 169.665,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "nb",
                    "mode": "rtl",
                    "time": 180.917,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "nb",
                    "mode": "top",
                    "time": 201.969,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "樱花上可以白嫖的，而且很早就可以看了",
                    "mode": "rtl",
                    "time": 199.571,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできることはまだあるかい",
                    "mode": "top",
                    "time": 246.875,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできることはまだあるかい",
                    "mode": "top",
                    "time": 240.665,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできることはまだあるかい",
                    "mode": "top",
                    "time": 114.793,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできることはまだあるかい",
                    "mode": "top",
                    "time": 107.992,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできることはまだあるかい",
                    "mode": "top",
                    "time": 105.552,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "你要字幕",
                    "mode": "bottom",
                    "time": 191.715,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "会员买好了，冲",
                    "mode": "top",
                    "time": 256.679,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一镜到底吗？",
                    "mode": "top",
                    "time": 405.914,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "啊",
                    "mode": "rtl",
                    "time": 373.538,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这年轻人，沈阳下雨了",
                    "mode": "rtl",
                    "time": 340.911,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできることは何か",
                    "mode": "rtl",
                    "time": 251.996,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "18:59",
                    "mode": "rtl",
                    "time": 149.127,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3:30",
                    "mode": "rtl",
                    "time": 268.498,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "云 拍 车",
                    "mode": "top",
                    "time": 427.753,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "小破站我爱你",
                    "mode": "rtl",
                    "time": 258.408,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "去充没会员",
                    "mode": "rtl",
                    "time": 265.087,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我来了",
                    "mode": "rtl",
                    "time": 383,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "经费爆炸？调动列车了",
                    "mode": "rtl",
                    "time": 430.529,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "4",
                    "mode": "top",
                    "time": 446.64,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我想白嫖",
                    "mode": "rtl",
                    "time": 193.042,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "不要会员给你白嫖吗",
                    "mode": "rtl",
                    "time": 247.815,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这就是VIP的力量",
                    "mode": "top",
                    "time": 21.805,
                    "style": {
                        "fontSize": "25px",
                        "color": "#cc0273",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#cc0273",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么",
                    "mode": "bottom",
                    "time": 283.143,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "不要会员其他公司也不行啊",
                    "mode": "rtl",
                    "time": 211.261,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "I want to see you",
                    "mode": "bottom",
                    "time": 439.338,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有十秒我先退了，兄弟们",
                    "mode": "rtl",
                    "time": 309.939,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3：00见",
                    "mode": "rtl",
                    "time": 250.781,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3：00",
                    "mode": "rtl",
                    "time": 231.511,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "、",
                    "mode": "rtl",
                    "time": 183.491,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "妙",
                    "mode": "bottom",
                    "time": 235.924,
                    "style": {
                        "fontSize": "18px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "18px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么呢",
                    "mode": "bottom",
                    "time": 152.967,
                    "style": {
                        "fontSize": "18px",
                        "color": "#009843",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "18px sans-serif",
                        "fillStyle": "#009843",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "淦，我都看完了。。。。。。",
                    "mode": "rtl",
                    "time": 278.477,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "Nb",
                    "mode": "rtl",
                    "time": 171,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "来了",
                    "mode": "rtl",
                    "time": 209.895,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "00.36",
                    "mode": "rtl",
                    "time": 287.013,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "23：58",
                    "mode": "rtl",
                    "time": 342.652,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "7.21 23:14",
                    "mode": "rtl",
                    "time": 262.685,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "22:55",
                    "mode": "rtl",
                    "time": 270.245,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "马里奥吃大苞谷",
                    "mode": "bottom",
                    "time": 16.895,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e2027f",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e2027f",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "22：46",
                    "mode": "rtl",
                    "time": 330.047,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我…我来晚了，我22点才来，对不起，破站的兄弟们",
                    "mode": "rtl",
                    "time": 124.468,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感谢",
                    "mode": "rtl",
                    "time": 417.398,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "看玩了",
                    "mode": "rtl",
                    "time": 265.424,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "i",
                    "mode": "rtl",
                    "time": 241.007,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "破B站牛逼",
                    "mode": "rtl",
                    "time": 65.782,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "留下姓名",
                    "mode": "top",
                    "time": 52.297,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "没人吗",
                    "mode": "rtl",
                    "time": 399.802,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到什么呢",
                    "mode": "top",
                    "time": 154.878,
                    "style": {
                        "fontSize": "25px",
                        "color": "#005599",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#005599",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "感动",
                    "mode": "top",
                    "time": 271.71,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3：56，外面突然下大雨，这说明啥，都懂吧",
                    "mode": "top",
                    "time": 102.259,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "好听",
                    "mode": "rtl",
                    "time": 118.819,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "4：00开始跳转",
                    "mode": "top",
                    "time": 77.379,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "今天上了，天气之子7.21纪念",
                    "mode": "top",
                    "time": 11.019,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "淦",
                    "mode": "rtl",
                    "time": 131.857,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "欲寄彩笺兼尺素。山长水阔知何处。",
                    "mode": "rtl",
                    "time": 52.939,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "的颜色",
                    "mode": "rtl",
                    "time": 446.287,
                    "style": {
                        "fontSize": "25px",
                        "color": "#667744",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#667744",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "神奇",
                    "mode": "rtl",
                    "time": 427.707,
                    "style": {
                        "fontSize": "25px",
                        "color": "#667744",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#667744",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "17:29",
                    "mode": "rtl",
                    "time": 298.658,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "好长的一个长镜头啊",
                    "mode": "rtl",
                    "time": 187.186,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "牛逼",
                    "mode": "rtl",
                    "time": 151.979,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么？",
                    "mode": "top",
                    "time": 109.143,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么？",
                    "mode": "top",
                    "time": 106.743,
                    "style": {
                        "fontSize": "25px",
                        "color": "#00a0ea",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#00a0ea",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "兄弟们，我来晚了，现在时间是16:25",
                    "mode": "rtl",
                    "time": 362.262,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一刷100条弹幕真有意思",
                    "mode": "rtl",
                    "time": 155.837,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "四点了",
                    "mode": "rtl",
                    "time": 278.498,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "付费的啊大哥们",
                    "mode": "rtl",
                    "time": 186.904,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "来吧来吧",
                    "mode": "rtl",
                    "time": 226.373,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "四点了啊",
                    "mode": "rtl",
                    "time": 260.838,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "16:00",
                    "mode": "rtl",
                    "time": 316.548,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有追回1分钟了兄弟们",
                    "mode": "rtl",
                    "time": 88.113,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "16:00",
                    "mode": "rtl",
                    "time": 289.779,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:59",
                    "mode": "rtl",
                    "time": 275.778,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:59",
                    "mode": "bottom",
                    "time": 384.142,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fef102",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fef102",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：59",
                    "mode": "rtl",
                    "time": 189.289,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:59啦啦啦",
                    "mode": "rtl",
                    "time": 293.54,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "来了",
                    "mode": "rtl",
                    "time": 431.858,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:59",
                    "mode": "rtl",
                    "time": 289.382,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "！",
                    "mode": "rtl",
                    "time": 259.273,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还有最后一分钟了，兄弟们。",
                    "mode": "rtl",
                    "time": 300.49,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3:59‘",
                    "mode": "rtl",
                    "time": 239.335,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "快了快了",
                    "mode": "rtl",
                    "time": 340.07,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "快了",
                    "mode": "rtl",
                    "time": 131.554,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "激动",
                    "mode": "top",
                    "time": 92.205,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:58",
                    "mode": "rtl",
                    "time": 133.463,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "只有一分半了好兴奋",
                    "mode": "rtl",
                    "time": 53.432,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：58",
                    "mode": "rtl",
                    "time": 339.109,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:58！！",
                    "mode": "top",
                    "time": 104.403,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：58，兴奋哈哈哈哈",
                    "mode": "rtl",
                    "time": 4.099,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：57",
                    "mode": "rtl",
                    "time": 443.782,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还TM的剩四分钟，都给老子准备好抢第一",
                    "mode": "top",
                    "time": 273.937,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:57",
                    "mode": "rtl",
                    "time": 225.159,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "冲冲冲冲冲！！！！！",
                    "mode": "top",
                    "time": 102.722,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "来了来了",
                    "mode": "rtl",
                    "time": 119.545,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3:57",
                    "mode": "rtl",
                    "time": 350.518,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：57",
                    "mode": "rtl",
                    "time": 193.913,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15: 57",
                    "mode": "rtl",
                    "time": 114.941,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:556",
                    "mode": "rtl",
                    "time": 117.469,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "56",
                    "mode": "rtl",
                    "time": 290.508,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "兄弟们，倒计时4分钟",
                    "mode": "top",
                    "time": 57.321,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffaa02",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffaa02",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3:55",
                    "mode": "rtl",
                    "time": 363.929,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "冲冲冲",
                    "mode": "rtl",
                    "time": 437.139,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3:55",
                    "mode": "rtl",
                    "time": 235.339,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:55",
                    "mode": "rtl",
                    "time": 319.982,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:54",
                    "mode": "rtl",
                    "time": 146.994,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:55",
                    "mode": "top",
                    "time": 414.859,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:54",
                    "mode": "rtl",
                    "time": 274.847,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：55",
                    "mode": "rtl",
                    "time": 411.793,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：54",
                    "mode": "rtl",
                    "time": 173.898,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "撒大家哈我会尽快为进口武器进口为契机·1】",
                    "mode": "top",
                    "time": 96.5,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "兄弟たちが一緒に",
                    "mode": "rtl",
                    "time": 226.982,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "来了",
                    "mode": "rtl",
                    "time": 202.708,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:53:20",
                    "mode": "rtl",
                    "time": 365.385,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15∶53",
                    "mode": "top",
                    "time": 177.779,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：52",
                    "mode": "rtl",
                    "time": 250.956,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:52",
                    "mode": "rtl",
                    "time": 274.023,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：52",
                    "mode": "rtl",
                    "time": 131.11,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:52:05",
                    "mode": "rtl",
                    "time": 294.045,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：51",
                    "mode": "rtl",
                    "time": 392.169,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛ができることは何か",
                    "mode": "rtl",
                    "time": 99.51,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3点51",
                    "mode": "rtl",
                    "time": 357.349,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:51",
                    "mode": "rtl",
                    "time": 397.053,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:52",
                    "mode": "rtl",
                    "time": 427.765,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:51",
                    "mode": "rtl",
                    "time": 224.876,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "9",
                    "mode": "rtl",
                    "time": 380.419,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "辛苦了",
                    "mode": "rtl",
                    "time": 416.19,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "9",
                    "mode": "rtl",
                    "time": 254.179,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "07.21.15:52",
                    "mode": "rtl",
                    "time": 288.742,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15.51",
                    "mode": "rtl",
                    "time": 317.395,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：50",
                    "mode": "top",
                    "time": 123.817,
                    "style": {
                        "fontSize": "25px",
                        "color": "#e70012",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#e70012",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:50",
                    "mode": "rtl",
                    "time": 268.617,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：50",
                    "mode": "rtl",
                    "time": 117.21,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "快到了",
                    "mode": "rtl",
                    "time": 190.664,
                    "style": {
                        "fontSize": "25px",
                        "color": "#927939",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#927939",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:50",
                    "mode": "rtl",
                    "time": 331.494,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:50",
                    "mode": "rtl",
                    "time": 395.324,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:50",
                    "mode": "rtl",
                    "time": 146.941,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3:50",
                    "mode": "rtl",
                    "time": 201.477,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：50",
                    "mode": "rtl",
                    "time": 226.251,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3.50",
                    "mode": "rtl",
                    "time": 284.611,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:50",
                    "mode": "rtl",
                    "time": 291.082,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "河南也正在下雨",
                    "mode": "rtl",
                    "time": 294.994,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愿你能在最好年华，为了一个人而去拼命，",
                    "mode": "rtl",
                    "time": 170.099,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:49",
                    "mode": "rtl",
                    "time": 367.173,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:49",
                    "mode": "rtl",
                    "time": 276.485,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "为了看这个，特意充了个钱。",
                    "mode": "rtl",
                    "time": 48.19,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "3:49",
                    "mode": "rtl",
                    "time": 198.312,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：50",
                    "mode": "top",
                    "time": 139.005,
                    "style": {
                        "fontSize": "25px",
                        "color": "#fe0302",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#fe0302",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15：49",
                    "mode": "rtl",
                    "time": 418.412,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15:49",
                    "mode": "rtl",
                    "time": 173.644,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "15.49",
                    "mode": "top",
                    "time": 167.167,
                    "style": {
                        "fontSize": "25px",
                        "color": "#89d5ff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#89d5ff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "手机端可长按呼出弹幕列表，点击弹幕，屏蔽其一",
                    "mode": "top",
                    "time": 80.498,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "野生白字日语字幕施工完毕，帮忙去评论区点个赞吧（笑哭",
                    "mode": "bottom",
                    "time": 414.011,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "野生白字日语字幕施工完毕",
                    "mode": "bottom",
                    "time": 402.859,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできることはまだあるよ",
                    "mode": "bottom",
                    "time": 397.559,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできることはまだあるよ",
                    "mode": "bottom",
                    "time": 390.319,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君　それ　でも",
                    "mode": "bottom",
                    "time": 383.399,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "生まれ落ちた僕",
                    "mode": "bottom",
                    "time": 378.863,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "語られ尽くした",
                    "mode": "bottom",
                    "time": 371.957,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕らは醜いかい",
                    "mode": "bottom",
                    "time": 320.413,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "それでもなおしがみつく",
                    "mode": "bottom",
                    "time": 317.783,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "なぜこの手をすり抜ける　ものばかり与えたか",
                    "mode": "bottom",
                    "time": 311.082,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "終わりある人生に　なぜ希望を持たせたか",
                    "mode": "bottom",
                    "time": 304.47,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "何もない僕たちに　なぜ夢を見させたか",
                    "mode": "bottom",
                    "time": 297.47,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできることはまだあるかい",
                    "mode": "bottom",
                    "time": 290.65,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできることはまだあるかい",
                    "mode": "bottom",
                    "time": 283.37,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君とじゃなきゃ　意味がないんだ",
                    "mode": "bottom",
                    "time": 277.39,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君と育てた愛だから",
                    "mode": "bottom",
                    "time": 270.59,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君がくれた",
                    "mode": "bottom",
                    "time": 256.17,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできることはまだあるかい",
                    "mode": "bottom",
                    "time": 244.09,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできることはまだあるかい",
                    "mode": "bottom",
                    "time": 237.79,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "抱えて生きてる",
                    "mode": "bottom",
                    "time": 234.49,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "握りしぬ合う手を",
                    "mode": "bottom",
                    "time": 227.47,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "降り積もる憎悪と",
                    "mode": "bottom",
                    "time": 221.19,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "脱げられぬ鎧",
                    "mode": "bottom",
                    "time": 199.763,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "いつもの気まぐれ",
                    "mode": "bottom",
                    "time": 193.333,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできることはまだあるかい",
                    "mode": "bottom",
                    "time": 158.233,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできることがまだあるかい",
                    "mode": "bottom",
                    "time": 151.273,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君とじゃなきゃ意味がないんだ",
                    "mode": "bottom",
                    "time": 144.592,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君と分け合った愛だから",
                    "mode": "bottom",
                    "time": 139.609,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "君がくれた　勇気だから",
                    "mode": "bottom",
                    "time": 124.949,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕にできることはまだあるかい",
                    "mode": "bottom",
                    "time": 112.607,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "愛にできることはまだある",
                    "mode": "bottom",
                    "time": 106.241,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "立ち向かう君が　今もここにいる",
                    "mode": "bottom",
                    "time": 99.078,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "僕の全正義の　ど真ん中にいる",
                    "mode": "bottom",
                    "time": 86.149,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "それでもあの日の　君が今もまだ",
                    "mode": "bottom",
                    "time": 78.429,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "だけど本当は　わがってるはず",
                    "mode": "bottom",
                    "time": 61.804,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "だけど本当は　わがってるはず",
                    "mode": "rtl",
                    "time": 60.764,
                    "style": {
                        "fontSize": "25px",
                        "color": "#ffffff",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#ffffff",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "你....但.....",
                    "mode": "bottom",
                    "time": 383.661,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱之歌已被诉尽",
                    "mode": "bottom",
                    "time": 363.32,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "样子丑陋吗",
                    "mode": "bottom",
                    "time": 320.639,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "为何我们手中的一切",
                    "mode": "bottom",
                    "time": 311.662,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "为何要让两手空空的我们",
                    "mode": "bottom",
                    "time": 297.581,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我能做的还有什么",
                    "mode": "bottom",
                    "time": 290.43,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么",
                    "mode": "bottom",
                    "time": 283.722,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "不与你分享便会黯然失色",
                    "mode": "bottom",
                    "time": 277.778,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "因是与你孕育的这份爱",
                    "mode": "bottom",
                    "time": 270.925,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "所以我愿为你而奋不顾身",
                    "mode": "bottom",
                    "time": 264.185,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我能做的还有什么",
                    "mode": "bottom",
                    "time": 244.733,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么",
                    "mode": "bottom",
                    "time": 238.045,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "紧紧握住的双手",
                    "mode": "bottom",
                    "time": 227.942,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "还是某个许久未见的坚定意志",
                    "mode": "bottom",
                    "time": 204.304,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "难以脱下的甲胄",
                    "mode": "bottom",
                    "time": 200.217,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "是无意穿上",
                    "mode": "bottom",
                    "time": 197.576,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "或者是神明捉摸不透的性情",
                    "mode": "bottom",
                    "time": 191.002,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我能做的还有什么",
                    "mode": "bottom",
                    "time": 158.756,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么",
                    "mode": "bottom",
                    "time": 151.83,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "不与你分享便会黯然失色",
                    "mode": "bottom",
                    "time": 145.938,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "所以我愿为你而奋不顾身",
                    "mode": "bottom",
                    "time": 132.471,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我能做的还有什么",
                    "mode": "bottom",
                    "time": 112.913,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么",
                    "mode": "bottom",
                    "time": 106.186,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "我正义的中心",
                    "mode": "bottom",
                    "time": 102.935,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "这样的你处在",
                    "mode": "bottom",
                    "time": 99.664,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "一切正义的中心",
                    "mode": "bottom",
                    "time": 88.764,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "虽然如此 那天的你自始至终",
                    "mode": "bottom",
                    "time": 79.383,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "全部失效时 人们会选择逃避",
                    "mode": "bottom",
                    "time": 72.729,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "在属于胜者的时代里 得以喘息",
                    "mode": "bottom",
                    "time": 32.048,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "只有那些已放弃的人 和那些明智的人",
                    "mode": "bottom",
                    "time": 25.215,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
                },
                {
                    "text": "爱能做到的还有什么",
                    "mode": "bottom",
                    "time": 1.57,
                    "style": {
                        "fontSize": "25px",
                        "color": "#84c0cb",
                        "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        "font": "25px sans-serif",
                        "fillStyle": "#84c0cb",
                        "strokeStyle": "#000",
                        "lineWidth": 2
                    }
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