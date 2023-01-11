import $ from "jquery";
import Danmaku from 'danmaku';
import { template } from "./template";
import BkmPlayerStyle from "bundle-text:./scss/bkmplayer.scss";

export class BKMPlayer {
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
        this.stylemode = 'light';
        this.nextpartmode = false;
        this.playIndex = 0;
        this.playlist = [];

        this.getPlayUrlApi = '/anime/getVideoUrl/';

        this.danmaku = {
            api: false,
            vid: false,
            bilivid: false,
            token: false
        };

        this.subtitle = false;

        /* nextpart模式下的切换剧集方法 */
        this.nextpartFunc = (epid) => {
            epid = parseInt(epid);
            // console.log(this.playlist.indexOf(epid),epid);
            if (epid != 0) this.playIndex = this.playlist.indexOf(epid) != -1 ? this.playlist.indexOf(epid) : this.playIndex;
            let ep = this.playlist[this.playIndex].toString();
            /* nextpartFunc的Hook函数 */
            if (this.nextpartHook) this.nextpartHook(this, ep);
            if (this.playIndex == this.playlist.length - 1) {
                this.bkmplayer.find('.btn-next').hide();
            } else {
                this.bkmplayer.find('.btn-next').show();
            }
            if (ep.indexOf('http://') != -1 || ep.indexOf('https://') != -1) {
                this.video.url = ep;
            } else {
                $.ajax({
                    type: "POST",
                    url: this.getPlayUrlApi + ep,
                    dataType: 'json',
                    success: (data) => {
                        this.nextpartGetUrlSuccessHook(this, ep);
                        Player.setPlayerUrl(data.data.play_data, data.data.play_name ? data.data.play_name : '第' + data.data.play_index + '话')
                    },
                    error: () => {
                        this.tips('获取视频地址出错');
                    }
                });
            }
        };

        Object.assign(this, config);

        this.Init();
        this.LoadSubtitle(); 
    }

    IsMobile() {
        let userAgent = navigator.userAgent,
            Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        return Agents.some((i) => {
            return userAgent.includes(i)
        })
    }

    LoadDanmaku() {
        $.ajax({
            type: "GET",
            url: this.danmaku.api +'/'+ this.danmaku.vid,
            dataType: 'json',
            success: (data) => {
                let comments = [];
                data.data.forEach(e => {
                    e.style = {
                        fontSize:"22px",
                        color: e.color,
                        textShadow:"-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                        font:"22px sans-serif",
                        strokeStyle:"#000",
                        lineWidth:2
                    }
                    comments.push(e);
                });
                
                this.Danmaku = new Danmaku({
                    container: this.component.danmaku[0],
                    media: this.Video,
                    comments: comments
                });
                this.component.danmakuSend.find('.danmaku-info-dm').text('已装填 ' + comments.length + ' 条弹幕');
                const danmakuObserver = new ResizeObserver(entries => {
                    this.Danmaku.resize();
                })
                danmakuObserver.observe(this.component.danmaku[0])
                this.component.loadingWarp.find('.info').append('<span>弹幕装填成功...</sapn>');
                this.LoadedEvent();
            },
            error: _=>{
                this.component.loadingWarp.find('.info').append('<span>弹幕装填失败...</sapn>');
                this.LoadedEvent();
            }
        });
    }

    LoadSubtitle() {
        if (this.subtitle) {
            this.Video.innerHTML = this.Video.innerHTML + '<track src="' + this.subtitle + '" kind="subtitles" label="chinese" srclang="zh" default="true">'
        }
    }
	
    Init() {
        console.log("%cBkmPlayer%c Version " + this.version + " Powered by FlxSNX (一个乱糟糟&功能不完善的视频播放器)", 'font-family:"微软雅黑";color:#5959bb;font-size:48px;text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);', 'font-size:12px;color:#666;font-family: "微软雅黑";');

        if($('style#bkmplayer-style').length <= 0){
            $('head').append(`<style id="bkmplayer-style">${BkmPlayerStyle}</style>`);
        }
        // this.container.innerHTML = template;
        this.bkmplayer = $('<div class="bkm-video-player"></div>').appendTo(this.container);
        this.bkmplayer.html(template);
        if(this.stylemode == 'dark')this.bkmplayer.addClass('dark');
        this.isIos = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
        this.tipsTimer = null;
        this.focus = true;
        this.BkmVideo = this.bkmplayer.find('.bkm-video-player-warp>video');
        this.Video = this.BkmVideo[0];
        this.component = {
            control: this.bkmplayer.find('.bkm-video-player-control'),
            playicon: this.bkmplayer.find('.bkm-video-player-playicon'),
            logo: this.bkmplayer.find('.bkm-video-player-logo'),
            loading: this.bkmplayer.find('.bkm-video-player-loading'),
            loadingWarp: this.bkmplayer.find('.bkm-video-player-loading-warp'),
            danmaku: this.bkmplayer.find('.bkm-video-player-danmaku'),
            header: this.bkmplayer.find('.bkm-video-player-header'),
            tips: this.bkmplayer.find('.bkm-video-player-tips'),
            timetips: this.bkmplayer.find('.bkm-video-player-timetips'),
            right: this.bkmplayer.find('.bkm-video-player-right'),
            playerWarp: this.bkmplayer.find('.bkm-video-player-warp'),
            danmakuSend: this.bkmplayer.find('.bkm-video-player-danmaku-send')
        }
        this.ActionFunction();

        this.component.logo.find('img').attr('src', this.logo);
        this.component.loadingWarp.find('.info').append('<span>BKMPlayer V' + this.version + '</sapn>'); //开启多集模式时从playlist获取地址

        if (this.nextpartmode == true) {
            this.nextpartFunc(this.playId != 0 ? this.playId : 0);
        } else {
            this.component.control.find('.btn-next').hide();
        }

        if (this.video.title) {
            this.component.header.find('.title').text(this.video.title);
        } else {
            this.component.header.find('.title').hide();
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
              this.component.loadingWarp.find('.info').append('<span>视频连接中...</sapn>');
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
                    */
                    ;
                    this.component.loadingWarp.find('.info').append('<span>视频连接失败!</sapn>');
                }
            });
        } else {
            this.Video.onerror = () => {
                /* 取消延时
                	setTimeout(() => {
                		this.bkmplayer.find('.loading>.info').append('<span>视频连接失败!</sapn>');
                	}, 1500); 
                */
                    this.component.loadingWarp.find('.info').append('<span>视频连接失败!</sapn>');
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
						this.bkmplayer.attr('style', 'cursor: none!important');
						$('#bkmplayer .control').attr('style', 'opacity: 0');
					  }, 3000);
					}, 1000);
				  }, 1500); 
				*/
                if (Player.Video.videoHeight > Player.Video.videoWidth) {
                    this.container.style.height = Player.Video.videoWidth + 'px';
                }
                this.component.loadingWarp.find('.info').append('<span>视频连接成功!</sapn>');
                if(this.danmaku.api && this.danmaku.vid){
                    this.component.loadingWarp.find('.info').append('<span>弹幕装填中...</sapn>');
                    this.LoadDanmaku();
                }else{
                    this.LoadedEvent();
                }
                
            }
        };
        /* 开始加载视频数据事件 */


        this.Video.onloadeddata = () => {
            this.component.control.find('.time span:nth-child(2)').text(this.formatTime(this.Video.duration));
            this.component.control.attr('style', 'opacity: 1');
            this.showHeader(true);
        };
        /* 视频时间改变事件 */


        this.Video.ontimeupdate = () => {
            this.component.control.find('.time span:nth-child(1)').text(this.formatTime(this.Video.currentTime));
            if (this.isMove == false) this.component.control.find('.current').css('width', this.Video.currentTime / this.Video.duration * 100 + '%');
			if(this.Video.buffered.length > 0)this.component.control.find('.loaded').css('width', this.Video.buffered.end(this.Video.buffered.length-1)/ this.Video.duration * 100 + '%');
        };
        /* 视频播放事件 */


        this.Video.onplay = () => {
            this.component.control.find('.btn-play').addClass('pause');
            this.component.playicon.addClass('hide');
        };
        /* 视频暂停事件 */


        this.Video.onpause = () => {
            this.component.control.find('.btn-play').removeClass('pause');
            this.component.playicon.removeClass('hide');
            this.bkmplayer.attr('style', 'cursor: auto');
            this.component.control.attr('style', '');
            this.showHeader(true)
        };

        this.Video.onwaiting = () => {
            this.component.loading.show();
        };

        this.Video.onplaying = () => {
            this.component.loading.hide();
        };
        /* Video右键菜单 */


        this.Video.oncontextmenu = e => {
			console.log(e);
            e.preventDefault();
            this.component.right.css({
                'left': e.offsetX + 'px',
                'top': e.offsetY + 'px',
				'bottom': 'initial'
            });
            this.component.right.show();
        };

        this.component.header[0].oncontextmenu = e => {
			console.log(e);
            e.preventDefault();
            this.component.right.css({
                'left': e.offsetX + 'px',
                'top': e.offsetY + 'px',
				'bottom': 'initial'
            });
            this.component.right.show();
        };

		this.component.control[0].oncontextmenu = e => {
			e.preventDefault();
			e.stopPropagation();
			this.component.right.css({
                'left': e.offsetX + 'px',
				'top': 'initial',
                'bottom': 0
            });
            this.component.right.show();
        };

        $(window).click(_=> {
            this.component.right.hide();
        });

        this.component.right.find('ul>li').eq(1).on('click', _ => {
            this.Video.requestPictureInPicture();
        });

        this.Video.onended = () => {
            if (this.nextpartmode) {
                if (this.playIndex != this.playlist.length - 1) {
                    this.tips('3秒后自动播放下一话');
                    this.nextTimer = setTimeout(_ => {
                        this.NextPart();
                    }, 3000);
                }
            }
        };
    }

    LoadedEvent(){
        setTimeout(() => {
            this.component.loadingWarp.hide();

            if (this.autoplay == true) {
                this.Video.play().catch(() => {
                    console.log('浏览器不支持自动播放');
                    this.tips('视频已准备就绪');
                });
            }

            this.FirstPlaySuccess = true;
            //清空加载信息

            this.component.loadingWarp.find('.info').html('');
            setTimeout(() => {
                this.bkmplayer.attr('style', 'cursor: none!important');
                this.component.control.attr('style', 'opacity: 0');
                this.showHeader(false);
            }, 3000);
        }, 1000);
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
    setEp(epid) {
        clearTimeout(this.nextTimer);
        clearTimeout(this.tipsTimer);
        this.component.tips.css('opacity', 0);
        this.nextpartFunc(epid);
    }

    /* 处理播放下一集 */
    NextPart() {
        this.playIndex++;

        if (this.playIndex < this.playlist.length) {
            clearTimeout(this.nextTimer);
            clearTimeout(this.tipsTimer);
            this.component.tips.css('opacity', 0);
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
    setPlayerUrl(url, title) {

        if (this.hls) this.hls.detachMedia();
        this.video.url = url;

        this.video.title = title;
        if (this.video.title) {
            this.component.header.find('.title').text(this.video.title);
        } else {
            this.component.header.hide();
        }

        this.component.loadingWarp.find('.info').html('');

        this.LoadVideoUrl();
        this.FirstPlaySuccess = false;
        this.component.loadingWarp.show();
    }

    /* 
    	播放器交互函数
    */

    ActionFunction() {
        /* 播放暂停按钮功能 */
        this.bkmplayer.find('.bkm-video-player-control .btn-play,.bkm-video-player-playicon').click(() => {
            if (this.component.right.css('display') == 'none') {
                if (this.Video.paused) {
                    this.Video.play();
                } else {
                    this.Video.pause();
                }
            }
        });

        this.BkmVideo.dblclick(() => {
            if (this.IsMobile()) {
                if (this.Video.paused) {
                    this.Video.play();
                } else {
                    this.Video.pause();
                }
            }
        });

        this.BkmVideo.click(() => {
            if (this.component.right.css('display') == 'none') {
                if (this.IsMobile() && this.Video.paused == false) {
                    if (this.component.control.css('opacity') == '1') {
                        this.component.control.attr('style', 'opacity: 0');
                        this.showHeader(false)
                    } else {
                        this.component.control.attr('style', '');
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

        this.component.control.find('.btn-next').click(() => {
            if (this.nextpartmode) this.NextPart();
        });

        /* 鼠标在3秒内无任何操作自动隐藏播放器控件 */

        let hidecontrol;
        this.bkmplayer.find('.bkm-video-player-warp>video,.bkm-video-player-loading-warp').mousemove(() => {
            if (this.Video.paused == false) {
                if (hidecontrol) clearTimeout(hidecontrol);
                this.bkmplayer.attr('style', 'cursor: auto');
                this.component.control.attr('style', '');
                this.showHeader(true)
                hidecontrol = setTimeout(() => {
                    this.bkmplayer.attr('style', 'cursor: none!important');
                    this.component.control.attr('style', 'opacity: 0');
                    this.showHeader(false)
                }, 5000);
            } else {
                if (hidecontrol) clearTimeout(hidecontrol);
            }
        });
        /* 鼠标停在控件上时一直显示控件 移出后3秒隐藏 */

        this.component.control.hover(() => {
            if (hidecontrol) clearTimeout(hidecontrol);
            this.bkmplayer.attr('style', 'cursor: auto');
            this.component.control.attr('style', '');
            this.showHeader(true)
        }, () => {
            if (this.Video.paused == false) {
                hidecontrol = setTimeout(() => {
                    this.bkmplayer.attr('style', 'cursor: none!important');
                    this.component.control.attr('style', 'opacity: 0');
                    this.showHeader(false)
                }, 5000);
            } else {
                if (hidecontrol) clearTimeout(hidecontrol);
            }
        });
        /* 鼠标停在播放器时显示控件 移出隐藏控件 */

        this.bkmplayer.hover(() => {
            this.bkmplayer.attr('style', 'cursor: auto');
            this.component.control.attr('style', '');
            this.showHeader(true)
        });

        if (this.isIos == true) {
            this.component.control.find('.fullscreen').click(() => {
                return this.Video.webkitEnterFullscreen();
            });
        } else {
            /* 全屏按钮事件 */
            this.component.control.find('.fullscreen').click(()=> {
                if (this.component.control.find('.fullscreen').attr('full') == 'true') {
                    document.exitFullscreen();
                    this.component.control.find('.fullscreen').attr('full', 'false');
					this.component.control.removeClass('full');
					this.component.timetips.removeClass('full');
                    this.component.control.find('.fullscreen').removeClass('full');
                } else {
                    this.bkmplayer[0].requestFullscreen();
                    this.component.control.find('.fullscreen').attr('full', 'true');
					this.component.control.addClass('full');
					this.component.timetips.addClass('full');
                    this.component.control.find('.fullscreen').addClass('full');
                }
            });
        }

        /* 用于Esc退出全屏时切换全屏按钮 */
        this.bkmplayer.on('fullscreenchange', _ => {
            if (!document.fullscreenElement) {
                this.component.control.find('.fullscreen').attr('full', 'false');
                this.component.control.find('.fullscreen').removeClass('full');
				this.component.control.removeClass('full');
				this.component.timetips.removeClass('full');
            }else{
                if(this.IsMobile() && window.screen.orientation){
                    let orientation = window.screen.orientation.angle;
                    if(orientation != 90 || orientation != -90){
                        window.screen.orientation.lock('landscape');
                    }
                }
            }
        });

        /* 鼠标在进度条的时候时间tips */
        this.component.control.find('.progress').mousemove(e => {
            this.component.timetips.show();
            /* 时间字符串 */

            let x = e.clientX - this.bkmplayer.offset().left - 10;

            if (x <= 0) {
                x = 0;
            } else if (x > this.component.control.find('.progress').width()) {
                x = this.component.control.find('.progress').width();
            }

            this.component.timetips.find('span').text(this.formatTime(x / this.component.control.find('.progress').width() * this.Video.duration));

            /* tips x轴位置 */
            x = e.clientX - this.bkmplayer.offset().left - this.component.timetips.width() / 2;

            if (x >= this.component.control.find('.progress').width() - this.component.timetips.width() + 20) {
                this.component.timetips.css('left', this.component.control.find('.progress').width() - this.component.timetips.width() + 20);
            } else if (x <= 0) {
                this.component.timetips.css('left', 0);
            } else {
                this.component.timetips.css('left', x);
            }
        });

        /* 鼠标移出进度条时隐藏时间tips */
        this.component.control.find('.progress').mouseout(e => {
            this.component.timetips.hide();
        });

        if (this.IsMobile()) {
            /* 移动端通过进度条改变视频播放进度 */
            this.component.control.find('.progress').on('touchstart', e => {
                console.log('touchstart');
                let x;
                this.isMove = true;
                x = e.touches[0].clientX - this.bkmplayer.offset().left - 10;
                this.bkmplayer.on('touchmove', e => {
                    console.log('touchmove', e);
                    if (this.isMove == true) {
                        ;
                        x = e.touches[0].clientX - this.bkmplayer.offset().left - 10;

                        if (x >= this.component.control.find('.progress').width()) {
                            this.component.control.find('.current').css("width", '100%');
                        } else if (x <= 0) {
                            this.component.control.find('.current').css("width", 0);
                        } else {
                            this.component.control.find('.current').css("width", x / this.component.control.find('.progress').width() * 100 + '%');
                        }
                    }
                });
                this.component.control.find('.current').css("width", x + 'px');
                $(document).on('touchend', e => {
                    console.log('touchend');
                    if (this.isMove == true) {
                        this.isMove = false;
                        //更改前的进度
                        let stime = Math.trunc(this.Video.currentTime);
                        this.Video.currentTime = Math.trunc(this.component.control.find('.current').width() / this.component.control.find('.progress').width() * this.Video.duration);

                        let settime = stime - Math.trunc(this.Video.currentTime);
                        if (settime > 0) {
                            this.tips('快退' + settime + '秒');
                        } else {
                            this.tips('快进' + Math.abs(settime) + '秒');
                        }
                    }
                });
            });
        } else {
            /* 通过进度条改变视频播放进度 */
            this.component.control.find('.progress').mousedown(e => {
                let x;
                this.isMove = true;
                x = e.clientX - this.bkmplayer.offset().left - 10;
                this.bkmplayer.mousemove(e => {
                    if (this.isMove == true) {
                        x = e.clientX - this.bkmplayer.offset().left - 10;

                        if (x >= this.component.control.find('.progress').width()) {
                            this.component.control.find('.current').css("width", '100%');
                        } else if (x <= 0) {
                            this.component.control.find('.current').css("width", 0);
                        } else {
                            this.component.control.find('.current').css("width", x / this.component.control.find('.progress').width() * 100 + '%');
                        }
                    }
                });
                this.component.control.find('.current').css("width", x + 'px');
                $(document).mouseup(e => {
                    if (this.isMove == true) {
                        this.isMove = false;
                        //更改前的进度
                        let stime = Math.trunc(this.Video.currentTime);
                        this.Video.currentTime = Math.trunc(this.component.control.find('.current').width() / this.component.control.find('.progress').width() * this.Video.duration);

                        let settime = stime - Math.trunc(this.Video.currentTime);
                        if (settime > 0) {
                            this.tips('快退' + settime + '秒');
                        } else {
                            this.tips('快进' + Math.abs(settime) + '秒');
                        }
                    }
                });
            });
        }

        /* 点击播放器后获取焦点 点击其他元素后失去焦点 */
        document.addEventListener('click', () => {
            this.focus = false;
        }, true);
        this.bkmplayer[0].addEventListener('click', () => {
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
                    this.component.control.find('.time span:nth-child(1)').text(this.formatTime(this.Video.currentTime));
                    if (this.isMove == false) this.component.control.find('.current').css('width', this.Video.currentTime / this.Video.duration * 100 + '%');
                    this.tips('快进5秒');
                } else if (e.keyCode == 37) {
                    e.preventDefault();
                    this.Video.currentTime = this.Video.currentTime - 5;
                    this.component.control.find('.time span:nth-child(1)').text(this.formatTime(this.Video.currentTime));
                    if (this.isMove == false) this.component.control.find('.current').css('width', this.Video.currentTime / this.Video.duration * 100 + '%');
                    this.tips('快退5秒');
                }
            }
        });
    }

    /* 显示提示 默认显示3秒 有新提示时直接切换到新提示 */
    tips(text, time = 3000) {
        clearTimeout(this.tipsTimer);
        this.component.tips.css('opacity', 1);
        this.component.tips.find('span').text(text);
        this.tipsTimer = setTimeout(() => {
            this.component.tips.css('opacity', 0);
        }, time);
    }

    showHeader(bool) {
        if (this.video.title) {
            if (bool == true) {
                this.component.header.attr('style', '');
            } else {
                this.component.header.attr('style', 'opacity: 0');
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