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