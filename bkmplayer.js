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
                $('#bkmplayer .btn-next').hide();
            } else {
                $('#bkmplayer .btn-next').show();
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

        $(() => {
            this.Init();
            this.LoadDanmaku();
            this.LoadSubtitle();
        });
    }

    IsMobile() {
        let userAgent = navigator.userAgent,
            Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        return Agents.some((i) => {
            return userAgent.includes(i)
        })
    }

    LoadDanmaku() {
        let comments = [{
            "time": 0,
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
            "text": "up好厉害"
        }, {
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
            "text": "音乐一起直接哭瞎"
        }, {
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
            "text": "】、；】、"
        }, {
            "time": 0.092,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#d32d26",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#d32d26",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022-04-01，还在泪目"
        }, {
            "time": 0.092,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#d32d26",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#d32d26",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022年8月5日"
        }, {
            "time": 0.359,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "火钳刘明"
        }, {
            "time": 0.539,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "过去藏于花名，从此未曾听闻。"
        }, {
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
            "text": "面码！！！"
        }, {
            "time": 0.859,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。再见花时，泪已千行。"
        }, {
            "time": 0.939,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "kl哭死我了"
        }, {
            "time": 0.955,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022 1 9"
        }, {
            "time": 0.959,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "来也"
        }, {
            "time": 1.041,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我非常喜欢仁太，我对仁太的喜欢，是想要嫁给你、当你新娘的那种喜欢"
        }, {
            "time": 1.207,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 1.235,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "芜湖"
        }, {
            "time": 1.723,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码11周年快乐"
        }, {
            "time": 1.779,
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
            "text": "2023年1月5日，哭了哭了"
        }, {
            "time": 2.218,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 2.779,
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
            "text": "抱歉 我09年的 我恨不得早点出生知道这个神作"
        }, {
            "time": 2.979,
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
            "text": "已经十一年了…面码，你在哪"
        }, {
            "time": 3.271,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了，面码为什么没回来"
        }, {
            "time": 3.329,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。再见花时，泪已千行。"
        }, {
            "time": 3.779,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再遇花时，泪已千行。"
        }, {
            "time": 3.979,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "mad眼睛进陨石了"
        }, {
            "time": 4.059,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "10年里喜欢面码的第4年"
        }, {
            "time": 4.06,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码 找到你了"
        }, {
            "time": 4.139,
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
            "text": "2022-11-15"
        }, {
            "time": 4.219,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码找到你了！！"
        }, {
            "time": 4.299,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "董爷"
        }, {
            "time": 4.363,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "。。。。。。刀了 刀了"
        }, {
            "time": 4.579,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "。"
        }, {
            "time": 4.599,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "太好哭了"
        }, {
            "time": 4.961,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "没有下一次了"
        }, {
            "time": 5.085,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在是2022年，我依然忘不了你"
        }, {
            "time": 5.139,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "、"
        }, {
            "time": 5.671,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022 11\/17"
        }, {
            "time": 5.783,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "发个弹幕，我已经准备好哭了"
        }, {
            "time": 5.934,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2023-1-4"
        }, {
            "time": 6.151,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022–11–25"
        }, {
            "time": 6.246,
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
            "text": "真的 我哭死"
        }, {
            "time": 6.311,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死了"
        }, {
            "time": 6.379,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行， 人犹在时，未闻花名，已知花名，人去花谢， 已知花意，未闻其花，以见其花，未闻花名。"
        }, {
            "time": 6.459,
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
            "text": "泪崩"
        }, {
            "time": 6.894,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 7.019,
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
            "text": "面码找到你了"
        }, {
            "time": 7.164,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。再见花时，泪已千行。"
        }, {
            "time": 7.259,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟."
        }, {
            "time": 7.379,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 7.418,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "来了"
        }, {
            "time": 7.699,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 7.739,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 7.939,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面麻我也超喜欢你的"
        }, {
            "time": 8.019,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 8.084,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了"
        }, {
            "time": 8.131,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2023 1.1"
        }, {
            "time": 8.139,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我眼睛进EA了"
        }, {
            "time": 8.299,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "投币未遂，因为我得币没了，面对这个视频我想投10多个币啊"
        }, {
            "time": 8.314,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 8.343,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "开始哭了"
        }, {
            "time": 8.397,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "啊啊啊我的青春"
        }, {
            "time": 8.428,
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
            "text": "面码，找到你了！"
        }, {
            "time": 8.538,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "兄弟们，直接哭出一个游泳他好吧（doge）"
        }, {
            "time": 8.559,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的，我哭死"
        }, {
            "time": 8.619,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "11年了……"
        }, {
            "time": 8.681,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我哭了"
        }, {
            "time": 8.739,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年啦！"
        }, {
            "time": 8.739,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的完全控制不住自己的泪腺"
        }, {
            "time": 8.807,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "火钳刘明"
        }, {
            "time": 8.85,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "22\/5\/8"
        }, {
            "time": 9.107,
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
            "text": "啊，我刚看完啊，我哭死"
        }, {
            "time": 9.299,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#a0ea",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#a0ea",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。再见花时，泪已千行。"
        }, {
            "time": 9.539,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码我也喜欢你呀，你怎么走了呀"
        }, {
            "time": 9.646,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "青春！！"
        }, {
            "time": 9.819,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭崩了"
        }, {
            "time": 9.889,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "“已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 9.899,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 10.142,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码找到你了"
        }, {
            "time": 10.175,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 10.371,
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
            "text": "已知花意，未闻花名。再见花时，泪已千行。"
        }, {
            "time": 10.472,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 10.552,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年"
        }, {
            "time": 10.587,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已经泪目了"
        }, {
            "time": 10.65,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 10.716,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "爷青回"
        }, {
            "time": 10.839,
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
            "text": "未闻花名，已知花意，未见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 10.985,
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
            "text": "细之过人 漫之巅峰"
        }, {
            "time": 11.057,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我们学校大课间的音乐！！！！！！！"
        }, {
            "time": 11.219,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "本间芽衣子！！！！我爱她！！！"
        }, {
            "time": 11.306,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "啊啊啊"
        }, {
            "time": 11.37,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了"
        }, {
            "time": 11.539,
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
            "text": "哭不活了哇"
        }, {
            "time": 11.619,
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
            "text": "面麻"
        }, {
            "time": 11.619,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪点太多哭死"
        }, {
            "time": 11.664,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜"
        }, {
            "time": 11.779,
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
            "text": "找到你了，面码"
        }, {
            "time": 11.899,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 11.927,
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
            "text": "太痛苦了太痛苦了"
        }, {
            "time": 11.957,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 12.007,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码找到你了！"
        }, {
            "time": 12.139,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我會唱欸"
        }, {
            "time": 12.235,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再遇花时，泪已千行。"
        }, {
            "time": 12.264,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 12.28,
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
            "text": "bgm犯规"
        }, {
            "time": 12.319,
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
            "text": "2022年12月31日"
        }, {
            "time": 12.336,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 12.73,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "会泪崩"
        }, {
            "time": 12.841,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "“未闻花名，但知花香，再遇花时，泪已成型”"
        }, {
            "time": 12.859,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "来了"
        }, {
            "time": 13.059,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 13.067,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "卧槽BGM一出就泪目了"
        }, {
            "time": 13.075,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 13.095,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "留下脚印"
        }, {
            "time": 13.099,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "每日挑战"
        }, {
            "time": 13.099,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "每日挑战"
        }, {
            "time": 13.159,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "爷青回"
        }, {
            "time": 13.186,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "初见其花，未闻花名。再见其画，泪落签溟"
        }, {
            "time": 13.23,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "开始了"
        }, {
            "time": 13.289,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "hudgai8cfgvAI(F"
        }, {
            "time": 13.372,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死"
        }, {
            "time": 13.799,
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
            "text": "找到你了"
        }, {
            "time": 14.077,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#2e72",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#2e72",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2023-1-2"
        }, {
            "time": 14.1,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "正因为童年没有这种记忆，所以听到这个就跟着哭了"
        }, {
            "time": 14.12,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名"
        }, {
            "time": 14.155,
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
            "text": "当曙光穿过你的身体，我愿说出这世上最长情的告白"
        }, {
            "time": 14.309,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "超和平Buster！"
        }, {
            "time": 14.499,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "芽间，找到你了"
        }, {
            "time": 14.531,
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
            "text": "真不刀"
        }, {
            "time": 14.572,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 14.704,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "你刀我"
        }, {
            "time": 14.859,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "与你在这最后的夏天，抹不去的思念，斜阳里的微笑，渐行渐远，六月的微风吹散你的泪光，深深地铭记心间，难以忘却"
        }, {
            "time": 15.097,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 15.106,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "Dna动了"
        }, {
            "time": 15.535,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2023-1-6"
        }, {
            "time": 15.677,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "一辈子的好朋友"
        }, {
            "time": 15.741,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，已知花名，花已不在，未闻花名，但识花香，在遇花时，泪已千行，人犹在时。未闻花名，已知花名，人去花谢，已知花意，未闻其花，以见其花，未闻花名，再见其花，泪落千冥。"
        }, {
            "time": 15.765,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再遇花时，泪已千行。"
        }, {
            "time": 15.979,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再见花时，泪已千行"
        }, {
            "time": 16.016,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 16.057,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十一年了，面码我还会等你"
        }, {
            "time": 16.079,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 16.091,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 16.12,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年后的八月马上就要到了呢"
        }, {
            "time": 16.123,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了"
        }, {
            "time": 16.379,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 16.476,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 16.559,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 16.698,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022年12月26日"
        }, {
            "time": 16.958,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我的青春一去不返了"
        }, {
            "time": 17.419,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "唯独少一个人啊"
        }, {
            "time": 17.449,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "用心了"
        }, {
            "time": 17.479,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 17.523,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了"
        }, {
            "time": 17.592,
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
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 17.639,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 17.836,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我又哭了"
        }, {
            "time": 17.91,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年后的八月，我等着你，面码"
        }, {
            "time": 18.058,
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
            "text": "都给我哭"
        }, {
            "time": 18.079,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我不敢往下看了"
        }, {
            "time": 18.096,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名 但见花开 在见花时 泪已千行"
        }, {
            "time": 18.234,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 18.499,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "“未闻花名 但识花香 再遇花时 泪已成行”"
        }, {
            "time": 18.534,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 18.588,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，​未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 18.708,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 18.739,
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
            "text": "当曙光穿过你的胸膛，我愿说出最长情的告白"
        }, {
            "time": 18.758,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "痛，太痛了"
        }, {
            "time": 18.759,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "每次听到这首歌都会感觉内心很触动"
        }, {
            "time": 18.792,
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
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 18.792,
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
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 18.792,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#90c320",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#90c320",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 18.819,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2023-1-3"
        }, {
            "time": 18.92,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "可是21年的八月我还是没见到她"
        }, {
            "time": 19.016,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十周年！"
        }, {
            "time": 19.239,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码！！找到你了！"
        }, {
            "time": 19.274,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我会想你的"
        }, {
            "time": 19.379,
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
            "text": "火钳刘明"
        }, {
            "time": 19.759,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "来赴十年后的八月之约了"
        }, {
            "time": 19.939,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 19.985,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#9843",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#9843",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已哭瞎"
        }, {
            "time": 20.059,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已知花名，花已不在，再遇花时，泪已千行。"
        }, {
            "time": 20.091,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "循环播放了一上午"
        }, {
            "time": 20.2,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 20.244,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "曾经我也是一群小伙伴 直到长大了 都慢慢走散了"
        }, {
            "time": 20.635,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了"
        }, {
            "time": 20.65,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我就是来找哭的！"
        }, {
            "time": 20.818,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "爷青回"
        }, {
            "time": 20.819,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "爷青回"
        }, {
            "time": 20.843,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年后的八月马上就要到了呢"
        }, {
            "time": 20.939,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已经开始哭了"
        }, {
            "time": 21.379,
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
            "text": "面码我也喜欢你呀，你怎么走了呀"
        }, {
            "time": 21.424,
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
            "text": "投币这个东西tm的还有上限"
        }, {
            "time": 21.516,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花名，不知其意。已知其意，未闻花名"
        }, {
            "time": 21.619,
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
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 21.648,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "君とらつの終わり"
        }, {
            "time": 21.699,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已经开始哭了"
        }, {
            "time": 21.737,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "磨损"
        }, {
            "time": 21.818,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d8e9",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d8e9",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "今天刚补完番，看到人就开始泪目了"
        }, {
            "time": 21.887,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 21.905,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "童年啊"
        }, {
            "time": 21.928,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 22.03,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "55555"
        }, {
            "time": 22.059,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了"
        }, {
            "time": 22.202,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十周年快乐"
        }, {
            "time": 22.22,
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
            "text": "现在是2021年6月20日，期待着"
        }, {
            "time": 22.325,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年"
        }, {
            "time": 22.375,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "还有22天，我们再相聚!!"
        }, {
            "time": 22.38,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼泪在眼眶打转了"
        }, {
            "time": 22.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 22.513,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "看哭了"
        }, {
            "time": 22.539,
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
            "text": "十年了"
        }, {
            "time": 22.555,
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
            "text": "未闻花名，但识花香；再遇花时，泪已千行"
        }, {
            "time": 22.734,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 22.851,
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
            "text": "最喜欢面码了"
        }, {
            "time": 22.931,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 22.982,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "bgm一响就不行了"
        }, {
            "time": 23.015,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2次元无辜的"
        }, {
            "time": 23.06,
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
            "text": "此曲一出，泪已千行"
        }, {
            "time": 23.143,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "每天亿遍"
        }, {
            "time": 23.195,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。"
        }, {
            "time": 23.196,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "非常喜欢的一首歌"
        }, {
            "time": 23.217,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 23.227,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "看完这部我真的要哭死了"
        }, {
            "time": 23.359,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码 八月再见"
        }, {
            "time": 23.516,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "下次一定"
        }, {
            "time": 23.563,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了"
        }, {
            "time": 23.614,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "hao"
        }, {
            "time": 23.765,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼睛进火车了"
        }, {
            "time": 23.782,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当曙光穿过你的胸膛，我愿说出最长情的告白"
        }, {
            "time": 24.037,
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
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 24.339,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香已知花名，花已不在未闻花名，但识花香再遇花时，泪已千行人犹在时，未闻花名已知花名，人去花谢已知花意，未闻其花以见其花，未闻花名再见其花"
        }, {
            "time": 24.417,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 24.544,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "11周年.22.4.14前来观摩"
        }, {
            "time": 24.666,
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
            "text": "未闻花名，但识花香，花再开时，泪已千行 "
        }, {
            "time": 24.699,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 24.724,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了"
        }, {
            "time": 24.78,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 25.01,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但知花香，再遇花时，泪以成行"
        }, {
            "time": 25.011,
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
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 25.108,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 25.151,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "细之过人 漫之巅峰"
        }, {
            "time": 25.218,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "都给老子哭！！！"
        }, {
            "time": 25.371,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年后的八月"
        }, {
            "time": 25.379,
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
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 25.479,
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
            "text": "已经到了呢"
        }, {
            "time": 25.524,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "7月29日，马上了"
        }, {
            "time": 25.539,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "tmd，但凡老师流一滴眼泪，我就把硬币全投了"
        }, {
            "time": 25.627,
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
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 25.677,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我。人犹在时，未闻花名，以知花名，人去花谢，已知花意，未见其花，"
        }, {
            "time": 25.762,
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
            "text": "面码，找到你了"
        }, {
            "time": 25.95,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2023,1,7"
        }, {
            "time": 26.021,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "鸡皮疙瘩都起来了"
        }, {
            "time": 26.069,
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
            "text": "面码，找到你了"
        }, {
            "time": 26.219,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在是2022，6月"
        }, {
            "time": 26.345,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2021年8月1日，记念"
        }, {
            "time": 26.46,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "最喜欢面码了"
        }, {
            "time": 26.613,
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
            "text": "2023-1-6"
        }, {
            "time": 26.736,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "枯了枯了"
        }, {
            "time": 27.139,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "八月了！"
        }, {
            "time": 27.23,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022\/12\/31，最后一天啦！新年快乐"
        }, {
            "time": 27.458,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "想你了"
        }, {
            "time": 27.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码还是面麻"
        }, {
            "time": 27.729,
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
            "text": "↑你真的让人破大防"
        }, {
            "time": 27.773,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪落千溟"
        }, {
            "time": 27.907,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "11年了"
        }, {
            "time": 28.091,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "约定好了的"
        }, {
            "time": 28.192,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在是2021年7月4号，又想你了"
        }, {
            "time": 28.389,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "BGM犯规"
        }, {
            "time": 28.463,
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
            "text": "她才是最美的啊！"
        }, {
            "time": 28.48,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "8\/28"
        }, {
            "time": 28.521,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "毕业了"
        }, {
            "time": 28.671,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "八月了"
        }, {
            "time": 28.759,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "感动，音乐一起我就想起了以前。。"
        }, {
            "time": 28.775,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "从小学到现在，以前的朋友也都生疏了"
        }, {
            "time": 28.919,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022.12"
        }, {
            "time": 29.038,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 29.112,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 29.139,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "大家123找到你了面码"
        }, {
            "time": 29.289,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "是每看一次都必须三连的程度"
        }, {
            "time": 29.311,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "救命，听这个音乐就好想哭"
        }, {
            "time": 29.379,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再遇花时，泪已千行"
        }, {
            "time": 29.419,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在是2022.8月"
        }, {
            "time": 29.557,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 29.599,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "先哭为敬"
        }, {
            "time": 29.758,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "25号啦 还有三天"
        }, {
            "time": 29.919,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "青春呐"
        }, {
            "time": 30.065,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 30.099,
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
            "text": "21年的8月，我永远忘不了"
        }, {
            "time": 30.099,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面麻！"
        }, {
            "time": 30.219,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "都给我哭！"
        }, {
            "time": 30.241,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "約定好了"
        }, {
            "time": 30.342,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "爷青回"
        }, {
            "time": 30.51,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 30.665,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在已经是十年后的八月了"
        }, {
            "time": 30.667,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再见花时，泪已千行！"
        }, {
            "time": 30.799,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#2e72",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#2e72",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 30.82,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022 8 1"
        }, {
            "time": 30.859,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我。"
        }, {
            "time": 30.939,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "把音乐关掉看能缓解一下"
        }, {
            "time": 30.971,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "刚开曲我就泪目了"
        }, {
            "time": 31.005,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香；再遇花时，泪已千行"
        }, {
            "time": 31.104,
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
            "text": "2022年10.31在此发誓学习为了山东第一医科大学"
        }, {
            "time": 31.182,
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
            "text": "鼻子酸了已经"
        }, {
            "time": 31.319,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在是2021年的8月22日"
        }, {
            "time": 31.339,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "めんま"
        }, {
            "time": 31.373,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼睛進核彈了"
        }, {
            "time": 31.38,
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
            "text": "2021年正好十周年来补番，这是最好的之一。"
        }, {
            "time": 31.425,
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
            "text": "还有二十多天就到了！"
        }, {
            "time": 31.443,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "八月了"
        }, {
            "time": 31.783,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年后的8月已至"
        }, {
            "time": 31.819,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "大家都有未来，唯独面码被定格在那一天"
        }, {
            "time": 31.859,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在是2021年7月20"
        }, {
            "time": 31.875,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 31.891,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这个八月有我们"
        }, {
            "time": 31.899,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "22年九月"
        }, {
            "time": 32.276,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在是2022年1月6日"
        }, {
            "time": 32.403,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "20221"
        }, {
            "time": 32.468,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "00:30"
        }, {
            "time": 32.619,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022年的七月 好久不见面码"
        }, {
            "time": 32.659,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了"
        }, {
            "time": 32.745,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 32.779,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼睛里进砖头了"
        }, {
            "time": 32.787,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2021\/9\/23"
        }, {
            "time": 32.807,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已经开始泪目"
        }, {
            "time": 32.83,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟"
        }, {
            "time": 32.919,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#ffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。春之祭，叹风情，昔日两人行。夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之命，刻碑铭，风雪吹角铃。"
        }, {
            "time": 32.919,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022 7 16"
        }, {
            "time": 32.935,
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
            "text": "面码"
        }, {
            "time": 32.939,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 33.027,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "音乐带刀"
        }, {
            "time": 33.056,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ff0000",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ff0000",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "bgm刚开始就泪目了"
        }, {
            "time": 33.099,
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
            "text": "八月了10年了"
        }, {
            "time": 33.13,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2021 11 2 你毁约了。"
        }, {
            "time": 33.155,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "先哭"
        }, {
            "time": 33.257,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在22年7月"
        }, {
            "time": 33.557,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 33.629,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2021年11月12日再次来见一见那个夏天给我感动的你"
        }, {
            "time": 33.652,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "八月一日了"
        }, {
            "time": 33.699,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#683a7b",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#683a7b",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在是2022年，8月"
        }, {
            "time": 33.889,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但知花香"
        }, {
            "time": 33.938,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年后的八月了呢"
        }, {
            "time": 34.219,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "爷青回"
        }, {
            "time": 34.367,
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
            "text": "唉"
        }, {
            "time": 34.558,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "君と夏の終わり　"
        }, {
            "time": 34.643,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "回忆"
        }, {
            "time": 34.779,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在是2020年9月20日"
        }, {
            "time": 34.956,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "来赴约了！！！"
        }, {
            "time": 35.091,
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
            "text": "未闻花名，但见花开，面码8年了！你和仁太他们再相遇了没"
        }, {
            "time": 35.131,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在是2021年8月27日"
        }, {
            "time": 35.15,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022年 快23了 面码面码面码"
        }, {
            "time": 35.228,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "爷青回"
        }, {
            "time": 35.259,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我找到你了"
        }, {
            "time": 35.522,
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
            "text": "直接泪目"
        }, {
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
            "text": "2022年4月1号了"
        }, {
            "time": 35.617,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我已经哭了"
        }, {
            "time": 35.659,
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
            "text": "已经是22年的8月了呢"
        }, {
            "time": 35.696,
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
            "text": "面码找到你了"
        }, {
            "time": 35.718,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 35.725,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在2022年7月"
        }, {
            "time": 35.879,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 35.939,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 36.059,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2021 10 4"
        }, {
            "time": 36.099,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。春之祭，叹风情，昔日两人行。夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之命，刻碑铭，风雪吹角铃。"
        }, {
            "time": 36.195,
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
            "text": "面码，找到你了"
        }, {
            "time": 36.579,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十一年后……"
        }, {
            "time": 36.779,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "绝了绝了"
        }, {
            "time": 36.819,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022年11月28日 晴"
        }, {
            "time": 36.819,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，再见花时，泪已千行！"
        }, {
            "time": 36.836,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。春之祭，叹风情，昔日两人行。夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之命，刻碑铭，风雪吹角铃。"
        }, {
            "time": 36.904,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2012～2022"
        }, {
            "time": 36.973,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 36.981,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "22年的八月还是忘不了"
        }, {
            "time": 37.245,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在是2022年9月5号"
        }, {
            "time": 37.299,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2021年 8月1号 想你了面码"
        }, {
            "time": 37.322,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我泪点很高的，当初这里真的哭了"
        }, {
            "time": 37.351,
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
            "text": "面码！找到你了！"
        }, {
            "time": 37.351,
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
            "text": "面码！找到你了！"
        }, {
            "time": 37.351,
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
            "text": "面码！找到你了！"
        }, {
            "time": 37.351,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年后的八月已经过了"
        }, {
            "time": 37.673,
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
            "text": "面码，找到你了"
        }, {
            "time": 37.779,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！"
        }, {
            "time": 37.799,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "めんま見つけた"
        }, {
            "time": 37.955,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "好怀念"
        }, {
            "time": 37.993,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "开头暴击"
        }, {
            "time": 38.065,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名但识花香，在遇花时，泪已成行"
        }, {
            "time": 38.27,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 38.273,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码找到你了"
        }, {
            "time": 38.455,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码！找到你了！"
        }, {
            "time": 38.457,
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
            "text": "面码找到你了"
        }, {
            "time": 38.464,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目了…"
        }, {
            "time": 38.499,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "22年12月23日"
        }, {
            "time": 38.521,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "8月4日了呢"
        }, {
            "time": 38.548,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#9843",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#9843",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "细之过人 漫之巅峰"
        }, {
            "time": 38.571,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！"
        }, {
            "time": 38.611,
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
            "text": "现在是2021年8月5号十年之约如期归来"
        }, {
            "time": 38.708,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在是2021八月一号"
        }, {
            "time": 38.739,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年之约"
        }, {
            "time": 38.781,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2021年九月二日第一次哭这么长时间"
        }, {
            "time": 38.859,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面碼，找到你了"
        }, {
            "time": 38.859,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了"
        }, {
            "time": 39.059,
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
            "text": "8月28了 寂寞寂寞"
        }, {
            "time": 39.138,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，我找到你了"
        }, {
            "time": 39.139,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "想看面码转世后的后续"
        }, {
            "time": 39.207,
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
            "text": "面码，找到你了！"
        }, {
            "time": 39.28,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "今天是2021年八月二十八号，真正的十年八月"
        }, {
            "time": 39.314,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022 6 23"
        }, {
            "time": 39.315,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022\/8\/9"
        }, {
            "time": 39.37,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 39.401,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "芽间，找到你啦！！！芽间，找到你啦！！！芽间，找到你啦！！！"
        }, {
            "time": 39.47,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2021 年8 月28日"
        }, {
            "time": 39.478,
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
            "text": "面码 找到你了"
        }, {
            "time": 39.501,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "她不是叫芽间吗"
        }, {
            "time": 39.539,
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
            "text": "找到你了，面码！！！！"
        }, {
            "time": 39.556,
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
            "text": "面码，找到你了！"
        }, {
            "time": 39.571,
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
            "text": "面码，找到你了！"
        }, {
            "time": 39.571,
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
            "text": "面码，找到你了！"
        }, {
            "time": 39.571,
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
            "text": "面码，找到你了！"
        }, {
            "time": 39.634,
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
            "text": "八月要结束了"
        }, {
            "time": 39.683,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "3年后见"
        }, {
            "time": 39.691,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！"
        }, {
            "time": 39.783,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "22.9"
        }, {
            "time": 39.827,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022 8 31"
        }, {
            "time": 39.879,
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
            "text": "面码，找到你了！"
        }, {
            "time": 39.939,
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
            "text": "面码 找到你了"
        }, {
            "time": 40.002,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我当初自认我很冷血,认为不可能有动画给我感动,在这一段我发现我错的很彻底."
        }, {
            "time": 40.139,
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
            "text": "面码，找到你了！"
        }, {
            "time": 40.169,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码 找到你了"
        }, {
            "time": 40.293,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "现在是2022年9月22日。"
        }, {
            "time": 40.363,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 40.366,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#4266be",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#4266be",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 40.475,
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
            "text": "芽衣"
        }, {
            "time": 40.489,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码 找到你了"
        }, {
            "time": 40.519,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 40.55,
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
            "text": "面码！找到你了！"
        }, {
            "time": 40.699,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码找到你了"
        }, {
            "time": 40.761,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 40.766,
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
            "text": "面码 找到你了！"
        }, {
            "time": 40.943,
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
            "text": "芽芽，找到你了！"
        }, {
            "time": 40.96,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "开始流泪了"
        }, {
            "time": 40.979,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。再见花时，泪已千行。"
        }, {
            "time": 41.08,
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
            "text": "2023年一月"
        }, {
            "time": 41.099,
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
            "text": "面码，找到你了！"
        }, {
            "time": 41.105,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "暴击"
        }, {
            "time": 41.181,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我眼睛好奇怪"
        }, {
            "time": 41.234,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "重温一下"
        }, {
            "time": 41.235,
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
            "text": "面码，找到你了"
        }, {
            "time": 41.241,
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
            "text": "面码，找到你了！！"
        }, {
            "time": 41.359,
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
            "text": "刻在DNA里的记忆"
        }, {
            "time": 41.415,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，最喜欢你了。"
        }, {
            "time": 41.513,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 41.538,
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
            "text": "面码，找到你了！"
        }, {
            "time": 41.567,
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
            "text": "面码，找到你了！"
        }, {
            "time": 41.651,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "还有四个月"
        }, {
            "time": 41.759,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022年我2月2日看完！！！"
        }, {
            "time": 41.783,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这也太好哭了吧"
        }, {
            "time": 41.829,
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
            "text": "面码，找到你了！"
        }, {
            "time": 41.833,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "22920"
        }, {
            "time": 41.915,
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
            "text": "面码，找到你了"
        }, {
            "time": 41.987,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "八月了毕业了散了"
        }, {
            "time": 42.019,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "三连了"
        }, {
            "time": 42.046,
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
            "text": "已知花意，未见其花，已见其花，​未闻花​名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。"
        }, {
            "time": 42.139,
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
            "text": "面码，找到你了！"
        }, {
            "time": 42.168,
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
            "text": "已知花意，未闻花名，再见花时，泪落千溟。已知花意，未闻其花，已见其花，未闻花名。"
        }, {
            "time": 42.39,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 42.478,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！！"
        }, {
            "time": 42.503,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "看到的的满满的感动"
        }, {
            "time": 42.582,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼泪止不住了"
        }, {
            "time": 42.625,
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
            "text": "面码 找到你了"
        }, {
            "time": 42.645,
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
            "text": "2021-8-1"
        }, {
            "time": 42.651,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "卧槽泪目啊"
        }, {
            "time": 42.657,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！！！"
        }, {
            "time": 42.699,
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
            "text": "面码！找到你了！"
        }, {
            "time": 43.103,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码！找到你了1"
        }, {
            "time": 43.111,
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
            "text": "2021年6月24日"
        }, {
            "time": 43.154,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 43.203,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 43.419,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码找到你了"
        }, {
            "time": 43.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 43.667,
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
            "text": "找到你了，面码！！！！！！"
        }, {
            "time": 43.683,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d8e9",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d8e9",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "鸡皮疙瘩起来了"
        }, {
            "time": 43.781,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了呀"
        }, {
            "time": 43.839,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 44.03,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 44.119,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已经哭了"
        }, {
            "time": 44.138,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022\/11\/27"
        }, {
            "time": 44.166,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "www"
        }, {
            "time": 44.419,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已经2022年11月了"
        }, {
            "time": 44.463,
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
            "text": "面码找到你了！！"
        }, {
            "time": 44.563,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "8月15日 "
        }, {
            "time": 44.606,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名但是花香再见花时泪已千行"
        }, {
            "time": 44.683,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "你赢了，快出来吧！！！！！！！！"
        }, {
            "time": 44.865,
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
            "text": "犯规了这个BGM！"
        }, {
            "time": 44.899,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码！找到你了！！？"
        }, {
            "time": 44.903,
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
            "text": "面码 找到你了"
        }, {
            "time": 44.914,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 45.016,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "不见其花"
        }, {
            "time": 45.025,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了"
        }, {
            "time": 45.165,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我的DNA动了"
        }, {
            "time": 45.477,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "情深似海，痛则一生。未闻花名，已知花味。"
        }, {
            "time": 45.489,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 45.619,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "永远忘不了面码"
        }, {
            "time": 45.643,
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
            "text": "妈妈问我为什么哭红了眼眶"
        }, {
            "time": 45.7,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了"
        }, {
            "time": 45.75,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 45.778,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "你好"
        }, {
            "time": 45.78,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我一个男的，一部未闻花名给我整哭了好几次，还正常吗？"
        }, {
            "time": 45.788,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#2e72",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#2e72",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！"
        }, {
            "time": 45.867,
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
            "text": "面玛！找到你了！"
        }, {
            "time": 45.87,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 45.919,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "きみとなつのわり"
        }, {
            "time": 45.971,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！"
        }, {
            "time": 46.059,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "不要再刀了"
        }, {
            "time": 46.27,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "最喜欢面码了"
        }, {
            "time": 46.499,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死了www"
        }, {
            "time": 46.564,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "为入宅作发个弹幕"
        }, {
            "time": 46.674,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码一直在"
        }, {
            "time": 46.899,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这bgm犯规了"
        }, {
            "time": 47.339,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 47.394,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2021年9月19日"
        }, {
            "time": 47.765,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！"
        }, {
            "time": 48.002,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我这辈子哪怕是泪点再高都会在最后捉迷藏那里忍不住"
        }, {
            "time": 48.083,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意味は知られている。花は見られない。花はすでに見られている。花の名前は知られていない。花にさよならする。涙千溟、花の名前は知られていないが、花の香りを知っている。花の名前は知られている。花はもうい"
        }, {
            "time": 48.106,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜"
        }, {
            "time": 48.159,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "孙会超"
        }, {
            "time": 48.262,
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
            "text": "三连了"
        }, {
            "time": 48.302,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "破防了"
        }, {
            "time": 48.459,
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
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 48.766,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "[流泪"
        }, {
            "time": 48.887,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "突然就又想哭了T﹏T"
        }, {
            "time": 49.234,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我循环了一天"
        }, {
            "time": 49.507,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "BGM崩不住了"
        }, {
            "time": 49.56,
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
            "text": "2021年8月"
        }, {
            "time": 49.639,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "啊啊啊啊我要去再看一遍"
        }, {
            "time": 49.726,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "超和平 Bustears"
        }, {
            "time": 49.739,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "那朵不知道名字的花，将永远在某个角落盛开"
        }, {
            "time": 50.159,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这么快嘛我的妈呀"
        }, {
            "time": 50.278,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022年12月31号 "
        }, {
            "time": 50.627,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "看到开头我就忍不住泪流满面..一个大男人"
        }, {
            "time": 51.012,
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
            "text": "面码，找到你了"
        }, {
            "time": 51.019,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 51.091,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "你一定会找到你的面码的.wang in"
        }, {
            "time": 51.47,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "给我哭"
        }, {
            "time": 51.49,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当曙光穿过你的胸膛，我愿说出最长情的告白"
        }, {
            "time": 51.804,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "每天必循环几遍的视频"
        }, {
            "time": 51.819,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪崩"
        }, {
            "time": 52.115,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022 1 29"
        }, {
            "time": 52.128,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "看完这番的时候要哭了"
        }, {
            "time": 52.22,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目了佳人们"
        }, {
            "time": 52.307,
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
            "text": "2002年8月25日，眼睛很痛，不想走出这个暑假"
        }, {
            "time": 52.425,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码"
        }, {
            "time": 52.498,
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
            "text": "面码，找到你了"
        }, {
            "time": 52.511,
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
            "text": "28号就是明天了"
        }, {
            "time": 52.583,
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
            "text": "2021，6月26日"
        }, {
            "time": 52.659,
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
            "text": "当清晨的曙光穿过你的胸膛，我将说出那句最深情的告白"
        }, {
            "time": 52.789,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这BGM真怀念啊"
        }, {
            "time": 53.269,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "爷的青春就这么消失了"
        }, {
            "time": 53.275,
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
            "text": "时间好快"
        }, {
            "time": 53.367,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这个是真的看哭了"
        }, {
            "time": 53.415,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我的那些好伙计们 现在也变成各种各样的人了 "
        }, {
            "time": 53.443,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "借用一下你的想法，我想了一句话：未闻花名，曾见花开，今忆花香，已解花情。[微笑]​"
        }, {
            "time": 53.567,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "10年了！"
        }, {
            "time": 53.87,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "唯一一部 也是第一部 流泪"
        }, {
            "time": 54.635,
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
            "text": "呜呜呜"
        }, {
            "time": 54.779,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "音乐声起就泪目了"
        }, {
            "time": 55.259,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 55.678,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 55.725,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "xanzhanhokanyichengxziguan"
        }, {
            "time": 55.859,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我一定会找到你的面码"
        }, {
            "time": 56.111,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022\/7.28"
        }, {
            "time": 56.33,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 56.721,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼泪又下来了"
        }, {
            "time": 56.879,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "22年9月5日"
        }, {
            "time": 57.019,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "メンマ!見せた!!!!!!!!!!"
        }, {
            "time": 57.078,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "不知道为什么我没有看过这部动画，只看画面就很想哭"
        }, {
            "time": 57.151,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 57.409,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e2027f",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e2027f",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "gxk，我一定会找回你的"
        }, {
            "time": 57.413,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 57.609,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#cc0273",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#cc0273",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我当时尴尬 还拿书包遮住了脸"
        }, {
            "time": 57.79,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "爷的青春结束了"
        }, {
            "time": 57.815,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我已经在哭了"
        }, {
            "time": 58.068,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "年少轻狂"
        }, {
            "time": 58.119,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码会以成佛后的姿态与主角相遇吗？"
        }, {
            "time": 58.119,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "金蛋"
        }, {
            "time": 58.299,
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
            "text": "面码，找到你了"
        }, {
            "time": 58.347,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "请问、"
        }, {
            "time": 58.515,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022年十月二十号"
        }, {
            "time": 58.519,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "唯一一部骗出我眼泪的"
        }, {
            "time": 59.259,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭瞎"
        }, {
            "time": 59.495,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "めんま、見つけた！"
        }, {
            "time": 59.739,
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
            "text": "蚌埠住了啊"
        }, {
            "time": 59.789,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未知其花 落泪千溟"
        }, {
            "time": 59.806,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十周年快乐"
        }, {
            "time": 59.963,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2021，11月21日。"
        }, {
            "time": 60.298,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "治抑翻呜呜呜"
        }, {
            "time": 60.355,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目，呜呜呜"
        }, {
            "time": 60.491,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 60.659,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 61.203,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2021年10月6号"
        }, {
            "time": 61.336,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哈哈哈"
        }, {
            "time": 61.521,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#2e72",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#2e72",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "可能只有真正经历过的人才懂吧，比如我"
        }, {
            "time": 61.543,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "才几个月这么多弹幕了"
        }, {
            "time": 61.601,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022 3 20"
        }, {
            "time": 61.816,
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
            "text": "未闻花名十周年快乐！"
        }, {
            "time": 61.899,
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
            "text": "今天是28号了"
        }, {
            "time": 61.971,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我还找不到那属于我的面麻"
        }, {
            "time": 62.162,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "胰脏把我骗出眼泪，花名让我泪目"
        }, {
            "time": 62.181,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 62.379,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当清晨的曙光穿过你的胸膛，我将说出那句最深情的告白"
        }, {
            "time": 62.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2021年10月17日"
        }, {
            "time": 62.613,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022-3-19"
        }, {
            "time": 62.719,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022\/7\/8"
        }, {
            "time": 62.807,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 62.825,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "还能出下一部吗？"
        }, {
            "time": 62.899,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#a0ea",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#a0ea",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再遇花时，泪已千行"
        }, {
            "time": 62.929,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "崩溃了，555"
        }, {
            "time": 63.122,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "你为什么要问出这种问题！！！！！！！"
        }, {
            "time": 63.143,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面麻"
        }, {
            "time": 63.246,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "流泪"
        }, {
            "time": 63.596,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "一样"
        }, {
            "time": 64.062,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "歌爱币来"
        }, {
            "time": 64.167,
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
            "text": "每天看一遍，每天哭一次"
        }, {
            "time": 64.691,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2023\/1\/8"
        }, {
            "time": 64.707,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022十月"
        }, {
            "time": 64.819,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "k，再见"
        }, {
            "time": 64.915,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 65.618,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "没想到一开头就哭了"
        }, {
            "time": 65.642,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "wuwuwuwu"
        }, {
            "time": 65.993,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 66.258,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 66.299,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名十周年快乐!"
        }, {
            "time": 66.579,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 66.588,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜"
        }, {
            "time": 66.611,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#a0ea",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#a0ea",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 66.74,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "那个世界还有面码吗"
        }, {
            "time": 66.904,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "11月10号"
        }, {
            "time": 66.925,
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
            "text": "已经泪目了"
        }, {
            "time": 67.345,
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
            "text": "真的很想在十年后的八月与你相见"
        }, {
            "time": 67.361,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 67.868,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "白嫖失败"
        }, {
            "time": 68.092,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "是与面码相逢的八月"
        }, {
            "time": 68.113,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。春之祭，叹风情，昔日两人行。夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之命，刻碑铭，风雪吹角铃。"
        }, {
            "time": 68.135,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年后的八月，我来了"
        }, {
            "time": 68.42,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#683a7b",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#683a7b",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到面码了"
        }, {
            "time": 68.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码泪"
        }, {
            "time": 68.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我。"
        }, {
            "time": 68.459,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我。"
        }, {
            "time": 68.883,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "过分了，这歌"
        }, {
            "time": 69.027,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了"
        }, {
            "time": 69.11,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "同上"
        }, {
            "time": 69.331,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 69.619,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#a0ea",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#a0ea",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 69.95,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 70.359,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 70.648,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 70.78,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我。"
        }, {
            "time": 71.11,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "最后一集哭崩"
        }, {
            "time": 71.129,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "看哭宿舍几个大老爷们的剧如今不敢一个人看了"
        }, {
            "time": 71.345,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "好哭的明明是我们"
        }, {
            "time": 71.425,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我​"
        }, {
            "time": 71.58,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "大哥未闻花名不是命"
        }, {
            "time": 72.787,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 73.093,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 73.853,
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
            "text": "十年后的八月，我来了！"
        }, {
            "time": 74.202,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我​"
        }, {
            "time": 74.515,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。"
        }, {
            "time": 74.552,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "币没了"
        }, {
            "time": 74.822,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#9843",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#9843",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名 但见花开 在见花时 泪已千行"
        }, {
            "time": 74.953,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "音乐起就想哭了"
        }, {
            "time": 75.049,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了，原来我也已经长大了啊"
        }, {
            "time": 75.775,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再遇花时，泪已千行"
        }, {
            "time": 76.475,
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
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 76.863,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭的稀里哗啦的"
        }, {
            "time": 76.947,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年后里的八月，我入坑了"
        }, {
            "time": 76.952,
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
            "text": "泪目"
        }, {
            "time": 76.975,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十周年快乐"
        }, {
            "time": 77.385,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "看过一次，还没哭，"
        }, {
            "time": 77.707,
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
            "text": "未闻花名，光听着名字，我就哭了十年"
        }, {
            "time": 77.728,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜"
        }, {
            "time": 77.928,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年后的八月，前来赴约。面码，找到你了！"
        }, {
            "time": 78.127,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年之约前来赴约"
        }, {
            "time": 78.334,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 78.526,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 78.638,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我是一个经常笑的人，可我不是经常开心的人。"
        }, {
            "time": 78.819,
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
            "text": "未闻花名"
        }, {
            "time": 79.09,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 79.774,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 79.848,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "10周年快乐"
        }, {
            "time": 79.905,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022 10yue"
        }, {
            "time": 80.179,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了"
        }, {
            "time": 80.279,
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
            "text": "2022年4月9日，我来晚了"
        }, {
            "time": 80.301,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "白嫖失败"
        }, {
            "time": 80.387,
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
            "text": "本来已经忘记了很久的刀子。。。."
        }, {
            "time": 80.399,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "人被刀就会死"
        }, {
            "time": 80.579,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 80.979,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了"
        }, {
            "time": 81.022,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "七年啦 面码 好久不见"
        }, {
            "time": 81.109,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 81.533,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我去，真不敢看了，只敢看一遍"
        }, {
            "time": 81.599,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这首歌《纪念旧人》"
        }, {
            "time": 81.712,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "一生的遗憾"
        }, {
            "time": 81.91,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "给我哭"
        }, {
            "time": 82.416,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已经十年了吗"
        }, {
            "time": 82.439,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "破防啦"
        }, {
            "time": 82.644,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。我真佩服了网友的文学了"
        }, {
            "time": 82.665,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 83.023,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "看到这一段心里一颤"
        }, {
            "time": 83.392,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 83.453,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "擦"
        }, {
            "time": 83.788,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "第十集值得哭吧"
        }, {
            "time": 83.799,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "少年，你后悔了"
        }, {
            "time": 84.141,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "容我抽支烟"
        }, {
            "time": 84.379,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "前奏一响爷就哭了"
        }, {
            "time": 84.458,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我​"
        }, {
            "time": 84.545,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022 3.20"
        }, {
            "time": 84.979,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我不喜欢"
        }, {
            "time": 85.077,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "你币没了"
        }, {
            "time": 85.119,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。我真佩服了网友的文学了"
        }, {
            "time": 85.566,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 85.62,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 85.759,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十周年快乐"
        }, {
            "time": 85.777,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "赶紧刀了我"
        }, {
            "time": 85.975,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年啦"
        }, {
            "time": 86.531,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "BGM犯规"
        }, {
            "time": 86.539,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "唉"
        }, {
            "time": 86.782,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "在那看？"
        }, {
            "time": 86.84,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目了"
        }, {
            "time": 86.87,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了(ಥ_ಥ)"
        }, {
            "time": 86.973,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这个视频我实在无法白嫖。"
        }, {
            "time": 87.038,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的太爱了我要崩了"
        }, {
            "time": 87.088,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十周年快乐"
        }, {
            "time": 87.486,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的只敢看一遍"
        }, {
            "time": 87.581,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "听的心里难受"
        }, {
            "time": 87.783,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哎"
        }, {
            "time": 87.847,
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
            "text": "喜欢一个人就要大胆说出来啊！！！"
        }, {
            "time": 88.02,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这个笑容是此生最大的遗憾"
        }, {
            "time": 88.126,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名 但见花开 在见花时 泪已千行"
        }, {
            "time": 88.143,
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
            "text": "猛男的我哭了"
        }, {
            "time": 88.398,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "前面的，我陪一根"
        }, {
            "time": 88.523,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "悲剧的开始啊"
        }, {
            "time": 88.678,
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
            "text": "这个笑容由我来守护"
        }, {
            "time": 88.718,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这音乐真的好催泪啊呜呜呜！"
        }, {
            "time": 89.527,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 89.595,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "卧槽头皮炸了"
        }, {
            "time": 89.72,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了，泪水依旧挤在眼眶之中"
        }, {
            "time": 89.979,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "傲娇毁一生"
        }, {
            "time": 90.039,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码面码面码，找到你了"
        }, {
            "time": 90.11,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟。"
        }, {
            "time": 90.276,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "歌词中的十年后的八个月，现在又是十年"
        }, {
            "time": 90.356,
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
            "text": "此曲一出，泪已千行"
        }, {
            "time": 90.818,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "把鬼片拍的这么富有情感，也只有日本人能做到了"
        }, {
            "time": 90.962,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "憋不住了"
        }, {
            "time": 91.694,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "少年爱面子，喜欢嘴硬"
        }, {
            "time": 92.35,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2023年1月4日，面码我回来了"
        }, {
            "time": 92.483,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。"
        }, {
            "time": 92.485,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 93.005,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "别刀了，别刀了，面码~"
        }, {
            "time": 93.041,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "好久不见"
        }, {
            "time": 93.319,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "嫖之呼吸，贰之型，没有币投"
        }, {
            "time": 93.627,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的看泪目，最后几集都绷不住了。"
        }, {
            "time": 93.845,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "好多年了我还在哭"
        }, {
            "time": 94.419,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 94.503,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我币没了 ！ "
        }, {
            "time": 94.559,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "没但木？"
        }, {
            "time": 95.272,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "每天不知道自己应该干些什么。"
        }, {
            "time": 95.439,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "不知不觉已经十一年了"
        }, {
            "time": 95.456,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2021年11月21"
        }, {
            "time": 96.058,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "要做仁太的新娘子呀面码"
        }, {
            "time": 96.092,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十周年快乐"
        }, {
            "time": 96.093,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 96.11,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "你喜欢面码吗"
        }, {
            "time": 96.542,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "刚看完这番我歌单一听到这音乐就想哭"
        }, {
            "time": 96.559,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "绷不住了，好难受啊"
        }, {
            "time": 97.159,
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
            "text": "忍不住了，三连给你了(哭)"
        }, {
            "time": 97.278,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "马上哭"
        }, {
            "time": 97.635,
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
            "text": "瞬间泪目了啊555"
        }, {
            "time": 98.94,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "听着这首歌，就仿佛回到那个夏天"
        }, {
            "time": 99.348,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#9843",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#9843",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭瞎了 你币有了"
        }, {
            "time": 99.357,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。"
        }, {
            "time": 99.538,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "看到这里，鼻子瞬间酸了"
        }, {
            "time": 99.6,
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
            "text": "只看过片段，但是听到歌我就会眼红，所以不敢看全部。"
        }, {
            "time": 100.886,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "怎么能把up主的这个音乐单另放出来"
        }, {
            "time": 101.219,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我也想剪辑这部电影，可是有那么多人剪辑过了，真的很怕别人说抄袭，毕竟，有感染力的画面真的就那么多"
        }, {
            "time": 101.378,
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
            "text": "我币没了"
        }, {
            "time": 102.182,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目，原来的心瞬间破防"
        }, {
            "time": 102.375,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我以为他会哭"
        }, {
            "time": 102.831,
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
            "text": "投币了，必须投币了"
        }, {
            "time": 103.719,
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
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 103.771,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这是动漫"
        }, {
            "time": 103.942,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "芽芽衣间子"
        }, {
            "time": 103.984,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "还是那么好哭"
        }, {
            "time": 104.501,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这"
        }, {
            "time": 104.585,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。"
        }, {
            "time": 104.739,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目啊！"
        }, {
            "time": 104.906,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年的八月已过去，我却搞忘了啧啧，相信在下一个十年的八月我不会忘记曾经的誓言"
        }, {
            "time": 105.099,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "杀我别用面码刀"
        }, {
            "time": 106.307,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "笑死，我们初中中午吃饭的时候，就放这首歌"
        }, {
            "time": 107.181,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这个镜头在哪里？"
        }, {
            "time": 107.641,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#19899",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#19899",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "瞬间破防"
        }, {
            "time": 107.747,
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
            "text": "看到面码，要这币有何用"
        }, {
            "time": 108.329,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "让你哭哦"
        }, {
            "time": 109.019,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "瞬间哭死"
        }, {
            "time": 109.129,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码一定要幸福！！！"
        }, {
            "time": 109.199,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "抱歉，不敢看完了，会泪崩"
        }, {
            "time": 109.361,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 109.607,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 109.787,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "心里好闷"
        }, {
            "time": 109.819,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。"
        }, {
            "time": 109.977,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "11年啦"
        }, {
            "time": 109.992,
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
            "text": "十年后的八月到了。。。"
        }, {
            "time": 110.133,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "邦不住了啊"
        }, {
            "time": 110.378,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 110.462,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 110.735,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "第一遍没哭第二遍哭了"
        }, {
            "time": 111.502,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目了泪目了"
        }, {
            "time": 111.616,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这什么番a"
        }, {
            "time": 111.755,
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
            "text": "未闻花名，但识花香；再遇花时，泪已千行"
        }, {
            "time": 112.134,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022年10月14"
        }, {
            "time": 112.232,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 112.259,
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
            "text": "对不起白嫖失败了！"
        }, {
            "time": 112.699,
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
            "text": "看一遍哭一遍"
        }, {
            "time": 112.953,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "一转眼，十年了呢"
        }, {
            "time": 113.027,
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
            "text": "“找到你了”"
        }, {
            "time": 113.211,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 113.362,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 113.466,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "转眼10年也过去了也到了八月面码找到了吗"
        }, {
            "time": 113.579,
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
            "text": "最后20天了！"
        }, {
            "time": 113.579,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "你币有了"
        }, {
            "time": 113.659,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我们仍未知道那天所见过的花的名字。"
        }, {
            "time": 113.819,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "头皮发麻"
        }, {
            "time": 113.852,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 114.475,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 114.839,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 114.94,
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
            "text": "其实是。灭马帮助仁太的妈妈实现仁太可以尽情哭的愿望。"
        }, {
            "time": 115.425,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码 找到你了"
        }, {
            "time": 115.633,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 115.764,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "向往而又恐惧的救赎"
        }, {
            "time": 115.836,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "原来已经十年了"
        }, {
            "time": 116.078,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 116.139,
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
            "text": "未闻花名，愿闻花香"
        }, {
            "time": 116.299,
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
            "text": "未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我。人犹在时，未闻花名，以知花名，人去花谢，已知花意，未见其花，"
        }, {
            "time": 116.377,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "逝去的青春呀"
        }, {
            "time": 116.47,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名已知花意。"
        }, {
            "time": 116.553,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜呜呜呜呜呜呜呜呜呜呜"
        }, {
            "time": 116.779,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香；再遇花时，泪已千行"
        }, {
            "time": 116.965,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 117.139,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 117.216,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我实在无法白嫖"
        }, {
            "time": 117.443,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了"
        }, {
            "time": 117.575,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 117.6,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "为什么最多投两个币，两百个都不够多"
        }, {
            "time": 117.624,
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
            "text": "哭傻了"
        }, {
            "time": 117.678,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我。"
        }, {
            "time": 118.079,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 118.179,
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
            "text": "白嫖失败"
        }, {
            "time": 118.287,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 118.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "p"
        }, {
            "time": 118.539,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 118.539,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 118.539,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#683a7b",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#683a7b",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 118.539,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 118.539,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#9843",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#9843",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 118.587,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 118.695,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 118.749,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "看了好多遍"
        }, {
            "time": 118.752,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "猛 男 落 淚"
        }, {
            "time": 119.05,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年八个月"
        }, {
            "time": 119.106,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 119.324,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 119.463,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你"
        }, {
            "time": 119.677,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年之约我不会缺席"
        }, {
            "time": 120.059,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 120.302,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "又开始吃刀子了"
        }, {
            "time": 120.585,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年后的八月到了"
        }, {
            "time": 120.615,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "好きです"
        }, {
            "time": 121.037,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜呜"
        }, {
            "time": 121.039,
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
            "text": "挚爱"
        }, {
            "time": 121.446,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪崩了"
        }, {
            "time": 121.63,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香；再遇花时，泪已千行"
        }, {
            "time": 121.88,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "一天看了好几遍 哭了好几遍"
        }, {
            "time": 121.938,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 122.084,
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
            "text": "十年后的秋天，我来赴约了QAQ"
        }, {
            "time": 122.093,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "你币有了"
        }, {
            "time": 122.264,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 122.473,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 122.866,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "说句实在的，第十集原片真的不会哭，只是压抑"
        }, {
            "time": 123.366,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "めんま"
        }, {
            "time": 123.42,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#683a7b",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#683a7b",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到面码了"
        }, {
            "time": 123.947,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "学校上课铃声是这首歌……"
        }, {
            "time": 123.996,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 124.145,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 124.592,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 124.753,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 125.441,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#683a7b",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#683a7b",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 125.63,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 125.636,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "看得我直接去追番"
        }, {
            "time": 125.739,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 125.756,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的不错"
        }, {
            "time": 125.859,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "白嫖失败"
        }, {
            "time": 126.619,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 126.764,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 127.015,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 127.057,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "在宿舍看，不敢流泪，怕被笑"
        }, {
            "time": 127.099,
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
            "text": "崩不住了"
        }, {
            "time": 127.225,
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
            "text": "这幕太爱面码了"
        }, {
            "time": 127.806,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名"
        }, {
            "time": 127.875,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我怎么找不到up主的这个歌词的歌"
        }, {
            "time": 127.934,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 128.387,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "TOT"
        }, {
            "time": 128.464,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 129.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，你自己更可爱啊"
        }, {
            "time": 129.601,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的好可爱"
        }, {
            "time": 129.809,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#2e72",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#2e72",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "无视这个贴纸的一律死打"
        }, {
            "time": 130.783,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "仁太じんた"
        }, {
            "time": 132.029,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我。人犹在时，未闻花名，以知花名，人去花谢，已知花意，未见其花，"
        }, {
            "time": 133.643,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 133.722,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 133.753,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "上课铃声"
        }, {
            "time": 134.279,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼睛进陨石了都"
        }, {
            "time": 134.339,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "ASDJKL'"
        }, {
            "time": 134.499,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "大家都变了 .. "
        }, {
            "time": 134.574,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我明明没看过为什么哭了"
        }, {
            "time": 135.818,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "俄罗斯混血"
        }, {
            "time": 136.278,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2023"
        }, {
            "time": 137.022,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 137.106,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 137.244,
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
            "text": "每月来找一次虐"
        }, {
            "time": 137.639,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "cv至少用心配过角色，爱过…2次元无辜的，无论cv作者怎么样，动画至少角色无辜的"
        }, {
            "time": 138.678,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "加油"
        }, {
            "time": 138.819,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "简直哭死人"
        }, {
            "time": 139.355,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "刀了我吧"
        }, {
            "time": 139.379,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "woyok"
        }, {
            "time": 139.379,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我要哭了"
        }, {
            "time": 139.627,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "本间芽衣子"
        }, {
            "time": 139.751,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "谢谢这部动漫让我喜欢上了日语，如今已经N3了"
        }, {
            "time": 140.682,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 141.985,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "可，不实现她的愿望，真的做得到吗"
        }, {
            "time": 142.039,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 142.818,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这是大家才能完成的愿望"
        }, {
            "time": 142.983,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "草破防了"
        }, {
            "time": 143.259,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "应该是大家都变了，但是又没变"
        }, {
            "time": 143.791,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "本间芽衣子"
        }, {
            "time": 144.939,
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
            "text": "赶紧的，刀了我，我快绷不住了"
        }, {
            "time": 145.189,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#4266be",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#4266be",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，再见花时，泪已成行。"
        }, {
            "time": 146.651,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "10年の花の名はまだ花の意味を知っていて,その花が見えない"
        }, {
            "time": 146.859,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我们在慢慢长大，一个个流转的季节，让路边开放的花朵也随之而变化。那个季节开放的花…名字叫什么来着？轻盈地摇曳着，每次触碰都有点刺痛，把鼻子凑过去，有股淡淡的青涩的阳光的香气，渐渐地，这香气变模糊了，我"
        }, {
            "time": 147.199,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 150.069,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。"
        }, {
            "time": 151.531,
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
            "text": "后面真的每集最后都会哭"
        }, {
            "time": 151.635,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 151.816,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟。"
        }, {
            "time": 152.638,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已经在哭了"
        }, {
            "time": 153.099,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 153.417,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "为什么这个画面我没看过啊"
        }, {
            "time": 153.745,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 153.83,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码让大家重新聚在一起了，这就是她的愿望……"
        }, {
            "time": 154.063,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 154.209,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "猛男落泪"
        }, {
            "time": 155.185,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 156.125,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死个人"
        }, {
            "time": 156.862,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 157.503,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死了"
        }, {
            "time": 158.371,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 159.168,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟。"
        }, {
            "time": 159.228,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名"
        }, {
            "time": 160.367,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭没了"
        }, {
            "time": 161.064,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "一听到这首歌我心里就很难受了"
        }, {
            "time": 161.419,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已知花名，花已不在，再遇花时，泪已千行。"
        }, {
            "time": 161.763,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名我没看完，我怕最后结局刀我，所以我就一直卡到一半就没看了[www]"
        }, {
            "time": 162.673,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我的知道的哦"
        }, {
            "time": 163.98,
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
            "text": "等……！"
        }, {
            "time": 164.18,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "猛男落泪"
        }, {
            "time": 164.52,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟。"
        }, {
            "time": 165.691,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "めんコード"
        }, {
            "time": 166.479,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我看的第一部日漫"
        }, {
            "time": 166.616,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我出去哭会"
        }, {
            "time": 166.676,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "天使"
        }, {
            "time": 167.771,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 168.417,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 168.528,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "猛男落泪"
        }, {
            "time": 168.68,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "流泪了"
        }, {
            "time": 170.039,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 170.078,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "唱这首歌我会哽住，因为歌词太动人"
        }, {
            "time": 170.239,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟。"
        }, {
            "time": 170.302,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "没想到这么多年过去了再看到这个眼泪还是会掉下来"
        }, {
            "time": 170.473,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知其意，未闻其花；已知其花，未闻花名；再见其花，落泪千溟"
        }, {
            "time": 170.941,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "猛男落泪"
        }, {
            "time": 171.07,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我也是 第一部日漫"
        }, {
            "time": 171.179,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死了"
        }, {
            "time": 171.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当清晨的曙光穿过你的胸膛，我将说出那句最深情的告白"
        }, {
            "time": 171.672,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 171.979,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，最喜欢你了"
        }, {
            "time": 172.371,
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
            "text": "面码"
        }, {
            "time": 172.433,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "一看到面码笑我心就难受"
        }, {
            "time": 172.707,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "前面第一部日漫那个勇士啊"
        }, {
            "time": 172.973,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。再见花时，泪已千行"
        }, {
            "time": 172.975,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 173.179,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 173.221,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 173.545,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 173.631,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "第一部！"
        }, {
            "time": 174.339,
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
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 174.458,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我们仍未知道那天所看见的花的名字"
        }, {
            "time": 175.038,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的哭"
        }, {
            "time": 175.69,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 175.719,
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
            "text": "めんコード"
        }, {
            "time": 176.122,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 176.329,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "兄弟们走了，太难受了"
        }, {
            "time": 176.447,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 176.627,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我看的是删减版的吗"
        }, {
            "time": 176.67,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "不知道为什么眼泪就下来了"
        }, {
            "time": 177.422,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 177.547,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "正在看的朋友们哭了吗"
        }, {
            "time": 177.598,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "一个地方跌倒四次"
        }, {
            "time": 177.697,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "超喜欢未闻花名"
        }, {
            "time": 177.976,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "等不到天黑，烟火不会太完美"
        }, {
            "time": 178.211,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 178.343,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 178.408,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我tm四谎没哭，胰脏没哭，我只认为所有番我都看不哭，直到我遇到未闻花名"
        }, {
            "time": 178.421,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "淦，我哭了"
        }, {
            "time": 179.205,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "那朵花叫勿忘我"
        }, {
            "time": 179.379,
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
            "text": "泪目"
        }, {
            "time": 179.601,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#683a7b",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#683a7b",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 179.623,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "求求你把我刀了吧"
        }, {
            "time": 179.967,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 180.069,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 180.152,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "赵xx"
        }, {
            "time": 180.209,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我​"
        }, {
            "time": 180.266,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭到停不下来"
        }, {
            "time": 180.379,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "痛，太痛了"
        }, {
            "time": 180.457,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "想说话但是泣不成声"
        }, {
            "time": 180.758,
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
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 181.15,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 181.15,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 181.15,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 181.15,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 181.275,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 181.593,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 181.703,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 181.744,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 181.99,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但知花香，再与花时，泪已成型"
        }, {
            "time": 182.822,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 183.019,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "感动"
        }, {
            "time": 183.135,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 183.344,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 183.438,
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
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 183.942,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 184.034,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 184.352,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "走了兄弟们，太难了泪腺崩了"
        }, {
            "time": 184.398,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "虽然我哭不出来，但心里酸酸的"
        }, {
            "time": 184.535,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但知花香，再与花时，泪已成行"
        }, {
            "time": 184.607,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 184.792,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我​"
        }, {
            "time": 185.038,
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
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 185.056,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟。"
        }, {
            "time": 185.219,
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
            "text": "最爱的番"
        }, {
            "time": 185.289,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "第十集"
        }, {
            "time": 185.498,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 185.649,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "起鸡皮疙瘩了"
        }, {
            "time": 185.899,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 185.971,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 185.971,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 186.008,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 186.089,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 186.107,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 186.107,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 186.245,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 186.262,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "每次看到这个画面，还是会忍不住哭。。"
        }, {
            "time": 186.322,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 186.505,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜"
        }, {
            "time": 186.679,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 187.112,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 187.314,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 187.49,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 187.538,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "万箭穿心的感觉"
        }, {
            "time": 187.541,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 187.604,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 187.674,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 187.849,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我​"
        }, {
            "time": 187.917,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "在这个时候除了仁太，所有人都想面码就此消失"
        }, {
            "time": 188.034,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟。"
        }, {
            "time": 188.094,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 188.305,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但知花香，再遇花时，泪已千行"
        }, {
            "time": 188.307,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 188.505,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 188.626,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼泪不争气的流了下来"
        }, {
            "time": 188.718,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 188.858,
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
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 188.907,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 188.94,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 188.953,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 189.118,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 189.421,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 189.465,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 189.481,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 189.588,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 190.082,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 190.119,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但知花香，再与花时，泪已成行"
        }, {
            "time": 190.181,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 190.291,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 190.299,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 190.333,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 190.377,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "DNA动了"
        }, {
            "time": 190.695,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "好疼"
        }, {
            "time": 191.059,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 191.19,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "“大家”的意思，不是像团子一样的一团，而是像米饭那样，一粒一粒稀稀拉拉的，却总是凑在一起。"
        }, {
            "time": 191.25,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 191.502,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 191.782,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 192.137,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "心越近 距离就越远"
        }, {
            "time": 192.261,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "强忍着泪水"
        }, {
            "time": 192.347,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 192.519,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 192.562,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 192.994,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 193.102,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 193.359,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 193.424,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "年级大了，看不了这种"
        }, {
            "time": 193.439,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 193.608,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 193.612,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 193.662,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "m呀把我刀了吧"
        }, {
            "time": 193.89,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的哭了"
        }, {
            "time": 193.979,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "因为它不知关乎爱情，还包含着很多，比如童年的回忆，青春的遗憾吧……"
        }, {
            "time": 194.182,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 194.215,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 194.31,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 194.375,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 194.385,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 194.698,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 194.793,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 195.349,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 195.69,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 196.004,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 196.209,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 196.209,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 196.209,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 196.209,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 196.319,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "到底是什么神仙能写出这样的歌曲."
        }, {
            "time": 196.364,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 196.49,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 196.592,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 196.742,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 196.993,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 197.041,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的着不住"
        }, {
            "time": 197.076,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 197.095,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 197.335,
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
            "text": "这句话破大防"
        }, {
            "time": 197.582,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#2e72",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#2e72",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 197.657,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但知花香，再与花时，泪已成行"
        }, {
            "time": 197.844,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 198.214,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "草，这段让我开始生气，想起了面码弟弟……"
        }, {
            "time": 198.417,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 198.514,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 198.614,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "给爷哭"
        }, {
            "time": 198.862,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 199.63,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在，再识花时，泪已千行，我知花意，花不知我，爱其芬芳，闻其花名，回头忆我，我心故我。"
        }, {
            "time": 199.653,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 199.8,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我真的……"
        }, {
            "time": 199.811,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "快把我刀了吧"
        }, {
            "time": 199.945,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟。"
        }, {
            "time": 200.038,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 200.433,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 200.627,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "不过是一群自私的人，为了原谅自己，让本已死去的面码再次出现，他们释怀后，面码也就没有了存在的意义。他们的生活回归正轨，面码却再也不会出现。"
        }, {
            "time": 201.059,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "天哪"
        }, {
            "time": 201.712,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 201.89,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 202.12,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 202.369,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真是虾仁猪心"
        }, {
            "time": 202.419,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "她知道啊。。。"
        }, {
            "time": 202.462,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我已"
        }, {
            "time": 202.587,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 202.594,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回我心故我"
        }, {
            "time": 202.963,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "把我杀了给大家助助兴！！！"
        }, {
            "time": 203.747,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 203.764,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 204.054,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 204.064,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这首歌超棒的"
        }, {
            "time": 204.298,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我。"
        }, {
            "time": 204.33,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 204.347,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意"
        }, {
            "time": 205.097,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 205.349,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 205.363,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 205.634,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我特么当时看这个，差点儿没过去"
        }, {
            "time": 206.014,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 206.079,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜呜"
        }, {
            "time": 206.259,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "如果可以我希望没有悲伤"
        }, {
            "time": 206.423,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "第一部看哭的治愈番"
        }, {
            "time": 206.631,
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
            "text": "彩蛋：三位原唱分别是面码小菊花鹤子的配音演员哦"
        }, {
            "time": 206.659,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "她也转学了 你好久 都没再来 "
        }, {
            "time": 206.722,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟"
        }, {
            "time": 206.934,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 207.109,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 207.516,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 207.721,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 208.52,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "但不是朋友间的喜欢"
        }, {
            "time": 208.571,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 208.786,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 208.819,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我已"
        }, {
            "time": 209.019,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 209.03,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在，再识花时，泪已千行，我知花意，花不知我，爱其芬芳，闻其花名，回头忆我，我心故我。"
        }, {
            "time": 209.249,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 209.928,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟。"
        }, {
            "time": 210.133,
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
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 210.509,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 211.648,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码是来解救大家的"
        }, {
            "time": 212.263,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 212.415,
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
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 213.001,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我。"
        }, {
            "time": 213.89,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "为什么我看了那么多治愈番之后渐渐变得抑郁的呢？就感觉心口很疼"
        }, {
            "time": 214.107,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "记得上一次看完还是1年前"
        }, {
            "time": 214.12,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 214.759,
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
            "text": "啊啊啊啊啊啊受不了了我币没了你还让我哭"
        }, {
            "time": 214.779,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "好想哭T﹏T"
        }, {
            "time": 214.835,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 214.861,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 215.27,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 215.441,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "はな花のいみ意味をしっ知っていて、そのはな花をみ見ていないで、すでにそのはな花をみ見て、はな花のなまえ名前をきい聞いていないで、そのはな花"
        }, {
            "time": 215.447,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我们总是在注意错过太多，却不注意自己拥有多少。"
        }, {
            "time": 215.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我希望她们能一起长大"
        }, {
            "time": 215.704,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 215.925,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "啊啊啊啊啊啊啊啊啊啊"
        }, {
            "time": 216.07,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在，再识花时，泪已千行，我知花意，花不知我，爱其芬芳，闻其花名，回头忆我，我心故我。"
        }, {
            "time": 216.516,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "好难受"
        }, {
            "time": 217.028,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 217.085,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "王冠，十年了，我还是没有找到你"
        }, {
            "time": 217.354,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 217.671,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我已"
        }, {
            "time": 217.716,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 217.781,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "开始无感，最后一集绷不住了"
        }, {
            "time": 217.881,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 218.577,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟。"
        }, {
            "time": 218.856,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "怎么开始表白了。。。？"
        }, {
            "time": 219.054,
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
            "text": "未闻花名 但见花开 在见花时 泪已千行"
        }, {
            "time": 219.311,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 219.596,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目了"
        }, {
            "time": 220.689,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#a0ea",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#a0ea",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名 但见花开 在见花时 泪已千行"
        }, {
            "time": 220.763,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 221.075,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "虾仁猪心啊"
        }, {
            "time": 221.179,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 221.212,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 221.499,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "忘不了那个卖花的瓜"
        }, {
            "time": 222.46,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "破防T﹏T"
        }, {
            "time": 222.619,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 222.636,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我们总是在注意错过太多，却不注意自己拥有多少。"
        }, {
            "time": 222.95,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但知花香，再遇花时，泪已成行。"
        }, {
            "time": 223.29,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "蕾姆了真的蕾姆啊，绷不住了"
        }, {
            "time": 223.379,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！"
        }, {
            "time": 224.72,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 225.007,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "让我死吧"
        }, {
            "time": 225.019,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "虾仁猪心呐 !"
        }, {
            "time": 225.26,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我们仍未知道那天所看见的花的名字。"
        }, {
            "time": 225.902,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "从第一集op就开始哭"
        }, {
            "time": 226.705,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了"
        }, {
            "time": 226.844,
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
            "text": "はな花のいみ意味をしっ知っていて、そのはな花をみ見ていないで、すでにそのはな花をみ見て、はな花のなまえ名前をきい聞いていないで、そのはな花"
        }, {
            "time": 227.041,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "刀"
        }, {
            "time": 227.75,
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
            "text": "未闻花名 但见花开 在见花时 泪已千行"
        }, {
            "time": 228.385,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 228.663,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码！！！！！啊啊啊！！！！"
        }, {
            "time": 228.859,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我没有哭，我只是眼睛里进了银河系而已！！！"
        }, {
            "time": 229.115,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 229.23,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在，再识花时，泪已千行，我知花意，花不知我，爱其芬芳，闻其花名，回头忆我，我心故我。"
        }, {
            "time": 229.75,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "唱着唱着就哭了"
        }, {
            "time": 230.931,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "第一集就崩了咋办"
        }, {
            "time": 231.027,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "太可恨了呜呜呜呜呜"
        }, {
            "time": 232.46,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "虾仁猪心啊"
        }, {
            "time": 232.56,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "别刀了"
        }, {
            "time": 232.782,
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
            "text": "呜呜呜"
        }, {
            "time": 234.491,
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
            "text": "已知花意，未闻花名。再见花时，泪已千行。"
        }, {
            "time": 235.047,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "はな花のいみ意味をしっ知っていて、そのはな花をみ見ていないで、すでにそのはな花をみ見て、はな花のなまえ名前をきい聞いていないで、そのはな花"
        }, {
            "time": 235.379,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#a0ea",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#a0ea",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名 但见花开 在见花时 泪已千行"
        }, {
            "time": 235.391,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我已"
        }, {
            "time": 235.779,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "最后一集真的哭的受不了"
        }, {
            "time": 237.601,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "啊啊啊"
        }, {
            "time": 237.715,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "又受不住了"
        }, {
            "time": 237.942,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 237.959,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "都很致郁啊"
        }, {
            "time": 238.214,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死了"
        }, {
            "time": 238.255,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "别刀了！"
        }, {
            "time": 238.507,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "每集都是刀"
        }, {
            "time": 238.899,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香；再遇花时，泪已千行"
        }, {
            "time": 239.713,
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
            "text": "别刀孩子了，都刀傻了"
        }, {
            "time": 239.739,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭就完事了"
        }, {
            "time": 239.858,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "小波波好可爱"
        }, {
            "time": 239.997,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 239.997,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 240.231,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "祝转世的面码能够记得他们"
        }, {
            "time": 240.3,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "每次看都哭"
        }, {
            "time": 240.404,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "明明不想哭的。。。。"
        }, {
            "time": 240.575,
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
            "text": "未闻花名 但见花开 在见花时 泪已千行"
        }, {
            "time": 240.702,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "啊啊啊，回不去了，我好想他"
        }, {
            "time": 240.767,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 240.767,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 240.767,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 240.767,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 240.767,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 240.767,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 240.767,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 241,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#683a7b",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#683a7b",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼睛尿尿了"
        }, {
            "time": 241.426,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋"
        }, {
            "time": 241.739,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香；再遇花时，泪已千行"
        }, {
            "time": 241.979,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "刀死了"
        }, {
            "time": 242.024,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这里鸡皮疙瘩救命"
        }, {
            "time": 242.133,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "该死的作者"
        }, {
            "time": 242.33,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码 找到你了"
        }, {
            "time": 242.635,
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
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 243.39,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 243.418,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我。"
        }, {
            "time": 243.529,
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
            "text": "はな花のいみ意味をしっ知っていて、そのはな花をみ見ていないで、すでにそのはな花をみ見て、はな花のなまえ名前をきい聞いていないで、そのはな花"
        }, {
            "time": 243.999,
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
            "text": "我觉得十一集宿海背着面码光着脚在路上跑了几公里那一段比较感人"
        }, {
            "time": 244.074,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "‘’"
        }, {
            "time": 244.08,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "从头哭到尾"
        }, {
            "time": 244.569,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我不看了。。。。在看我"
        }, {
            "time": 244.711,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "求求你，刀了我吧"
        }, {
            "time": 244.744,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了"
        }, {
            "time": 245.099,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死"
        }, {
            "time": 245.262,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 245.319,
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
            "text": "不~現場有人哭嗎？"
        }, {
            "time": 245.441,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 245.796,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码成佛了吗"
        }, {
            "time": 245.825,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码！"
        }, {
            "time": 246.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 246.702,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 246.889,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未闻花名。 春之祭，叹风情，昔时两人行。 夏之意，泣凋零，彼日花未名。秋之谛，问落英，檐下燕声停。冬之秘，刻碑铭，风雪吹角铃。"
        }, {
            "time": 247.415,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪水怎么擦不干净啊灬呜呜呜呜"
        }, {
            "time": 247.572,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "在这里面码已经实现愿望马上要消失了，可所有人又开始不舍"
        }, {
            "time": 247.711,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 248.019,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "喂，喂，作者犯规了啊，不带这么玩的"
        }, {
            "time": 248.238,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 248.294,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，泪落千溟，未闻花名，但识花香，已见花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。​"
        }, {
            "time": 248.889,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "考哥"
        }, {
            "time": 249.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "寄刀片寄刀片"
        }, {
            "time": 249.515,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "破防了"
        }, {
            "time": 249.806,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜哇干什么呜呜"
        }, {
            "time": 249.831,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#2e72",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#2e72",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我要好好的跟大家告别"
        }, {
            "time": 249.959,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "给孩子刀傻了"
        }, {
            "time": 250.022,
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
            "text": "泪目"
        }, {
            "time": 250.299,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "成了"
        }, {
            "time": 250.431,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#cd00",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#cd00",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 251.199,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "莫伊哟 莫伊哟"
        }, {
            "time": 251.346,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "为什么面码会死！！！！！！！！！"
        }, {
            "time": 251.425,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死了"
        }, {
            "time": 251.475,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 251.793,
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
            "text": "孩子刀哭了"
        }, {
            "time": 251.795,
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
            "text": "流了一次又一次，呜呜呜呜，不行了，我去找纸巾了( ๑ŏ ﹏ ŏ๑ )"
        }, {
            "time": 251.913,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜呜呜呜呜"
        }, {
            "time": 252.12,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "放不下的只有他"
        }, {
            "time": 252.679,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 252.718,
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
            "text": "面码 找到你了"
        }, {
            "time": 252.841,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花。已见其花，未闻花名。再见花时，落泪千溟。"
        }, {
            "time": 253.213,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死我了"
        }, {
            "time": 253.257,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "爱的战士"
        }, {
            "time": 253.383,
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
            "text": "好刀啊！！"
        }, {
            "time": 253.858,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "不止放不下他哦，面码最喜欢大家了"
        }, {
            "time": 254.038,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "可恶可恶可恶的眼泪"
        }, {
            "time": 255.374,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码写给大家的信"
        }, {
            "time": 255.679,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 256.297,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死了"
        }, {
            "time": 256.369,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码找到你了"
        }, {
            "time": 256.472,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我giao哭了哭了"
        }, {
            "time": 256.529,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "实在忍不住哭了"
        }, {
            "time": 256.791,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "还好我没看过"
        }, {
            "time": 256.859,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 256.996,
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
            "text": "未闻花名 但见花开 在见花时 泪已千行"
        }, {
            "time": 257.499,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "刀，太刀了，up主不带这样玩的"
        }, {
            "time": 257.499,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！"
        }, {
            "time": 257.701,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "别刀了"
        }, {
            "time": 258.245,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了"
        }, {
            "time": 258.373,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#ff5888",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ff5888",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "虽然我并没看过此番，但是我已下定决心要去！"
        }, {
            "time": 258.539,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年后的八月"
        }, {
            "time": 258.727,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#2e72",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#2e72",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "谢谢大家给我带来了幸福"
        }, {
            "time": 258.882,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死了"
        }, {
            "time": 259.414,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "求求你把我刀了吧"
        }, {
            "time": 259.699,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 259.819,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码投胎成了花盛开在仁太身旁"
        }, {
            "time": 260.388,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的，别刀我了"
        }, {
            "time": 260.939,
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
            "text": "三连！拿来吧你！"
        }, {
            "time": 261.419,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "绷不住了啊！！"
        }, {
            "time": 261.616,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": ".................."
        }, {
            "time": 261.687,
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
            "text": "我居然忍住了"
        }, {
            "time": 261.77,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码为了别人的事情才会哭"
        }, {
            "time": 261.862,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 262.233,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "10年了"
        }, {
            "time": 262.653,
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
            "text": "别刀了"
        }, {
            "time": 262.805,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#2e72",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#2e72",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "又哭了"
        }, {
            "time": 262.944,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"
        }, {
            "time": 262.987,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真刀傻了"
        }, {
            "time": 263.337,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "卧槽不看了太狠了"
        }, {
            "time": 263.489,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年后的八月，就是21年8月"
        }, {
            "time": 263.631,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪崩了"
        }, {
            "time": 263.747,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 264.048,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "作者混蛋"
        }, {
            "time": 264.619,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码是小天使"
        }, {
            "time": 264.885,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 265.979,
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
            "text": "已知花意，未见其花。已见其花，未闻花名。再见花时，落泪千溟。"
        }, {
            "time": 265.994,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 266.434,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "别刀了"
        }, {
            "time": 266.55,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目(ಥ_ಥ)"
        }, {
            "time": 266.713,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的看几遍都忍不住哭啊"
        }, {
            "time": 266.949,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 266.972,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭哭"
        }, {
            "time": 266.983,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "准备！！"
        }, {
            "time": 267.034,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "有什么好说的，自己泪目"
        }, {
            "time": 267.357,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "绷不住啊"
        }, {
            "time": 267.721,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "最喜欢你了，面码"
        }, {
            "time": 267.939,
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
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 267.989,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "停！！！别刀了"
        }, {
            "time": 268.038,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "你币有了"
        }, {
            "time": 268.258,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜呜呜"
        }, {
            "time": 268.602,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 268.647,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我眼睛刚做完手术，就看到这个。我还哭了"
        }, {
            "time": 269,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "绷不住了"
        }, {
            "time": 269.119,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "别刀了，别刀了"
        }, {
            "time": 269.139,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "老夫刀呢"
        }, {
            "time": 269.671,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十一年后了哦"
        }, {
            "time": 270.15,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭炸了xdm，不说了"
        }, {
            "time": 270.333,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呆斯ki"
        }, {
            "time": 270.406,
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
            "text": "这样震撼人心的番剧还会再来吗？"
        }, {
            "time": 270.473,
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
            "text": "当曙光穿过你的身体，我愿说出这世上最深情的告白"
        }, {
            "time": 270.751,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 270.979,
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
            "text": "已经哭了"
        }, {
            "time": 271.079,
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
            "text": "卧槽了泪目"
        }, {
            "time": 271.268,
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
            "text": "别刀了，孩子都刀……傻了QAQ"
        }, {
            "time": 271.302,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目啊啊啊啊啊"
        }, {
            "time": 271.544,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 271.84,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 272.145,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "大好きな"
        }, {
            "time": 272.186,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "三连"
        }, {
            "time": 272.381,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我也最喜欢你了"
        }, {
            "time": 272.578,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目泪目"
        }, {
            "time": 272.723,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我看了之后，抑郁了3天3夜！！！"
        }, {
            "time": 272.979,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 273.581,
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
            "text": "别刀了别刀了，孩子都刀傻了"
        }, {
            "time": 273.667,
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
            "text": "我也是，最喜欢面码了"
        }, {
            "time": 273.718,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 273.854,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "你要哭死我吗作者"
        }, {
            "time": 273.897,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我一个没看过的都哭了，你们为什么不哭，给我哭！！！！"
        }, {
            "time": 274.273,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码！！！"
        }, {
            "time": 274.419,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "老夫遭不住了，溜"
        }, {
            "time": 274.567,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "跃过时空寻找到你"
        }, {
            "time": 274.689,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了"
        }, {
            "time": 274.805,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "给爷哭"
        }, {
            "time": 275.959,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目了呜呜呜"
        }, {
            "time": 276.559,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 277.123,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "杀了我吧"
        }, {
            "time": 277.245,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "daisuki"
        }, {
            "time": 277.339,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 277.58,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "让我哭的最惨的，cl都没有这样"
        }, {
            "time": 277.586,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "不要刀我了"
        }, {
            "time": 277.725,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "八月了"
        }, {
            "time": 277.795,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我都被刀傻了"
        }, {
            "time": 278.18,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这么多年了，看一遍哭一遍"
        }, {
            "time": 278.719,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我也最喜欢你了"
        }, {
            "time": 279.139,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "最喜欢你了！"
        }, {
            "time": 279.175,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 279.203,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "作者刀我们对你有什么好处，不就是想要三连吗，拿去"
        }, {
            "time": 279.311,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "啊啊啊啊我要哭死了"
        }, {
            "time": 279.487,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "你杀了我吧"
        }, {
            "time": 279.562,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 279.765,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "虾仁猪心"
        }, {
            "time": 279.865,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "最喜欢面码了"
        }, {
            "time": 279.939,
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
            "text": "我对面码的喜欢也是想将面码娶做新娘子的喜欢哦"
        }, {
            "time": 280.361,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "最喜欢你了，面码"
        }, {
            "time": 280.754,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "每次听都想哭，哎，不行了"
        }, {
            "time": 281.738,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "希望面码复活、"
        }, {
            "time": 282.105,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "孩子都刀傻了"
        }, {
            "time": 282.41,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "别刀了别刀了"
        }, {
            "time": 282.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "如果能一起长大就好了"
        }, {
            "time": 282.73,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 282.756,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "挺有感触的"
        }, {
            "time": 283.08,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "忽然还是挺羡慕他们一伙的，我小时候都没有这样的朋友团体过……"
        }, {
            "time": 283.101,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 283.417,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "与你在这最后的夏天，抹不去的思念，斜阳里的微笑，渐行渐远，六月的微风吹散你的泪光，深深地铭记心间难以忘却。 ——《未闻花名》"
        }, {
            "time": 283.491,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "八月了呢"
        }, {
            "time": 283.517,
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
            "text": "z "
        }, {
            "time": 283.559,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "类目"
        }, {
            "time": 283.896,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "结局到底"
        }, {
            "time": 284.083,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "扣一面码复活"
        }, {
            "time": 284.268,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "犯规了"
        }, {
            "time": 285.339,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "刀了我吧"
        }, {
            "time": 285.539,
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
            "text": "一生的遗憾"
        }, {
            "time": 285.659,
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
            "text": "人被刀，就会死"
        }, {
            "time": 285.724,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "结局到底是什么"
        }, {
            "time": 285.753,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我看完以后难受了3年多，到现在了睡觉还能梦见面码"
        }, {
            "time": 285.793,
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
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 286.147,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我们只注重结局，却忘了过程"
        }, {
            "time": 286.322,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 286.458,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "都刀死"
        }, {
            "time": 286.704,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "啊啊啊去死啊"
        }, {
            "time": 287.63,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 288.142,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我也最喜欢你了"
        }, {
            "time": 288.441,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "别刀了救命"
        }, {
            "time": 288.639,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的会抑郁一个月"
        }, {
            "time": 288.647,
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
            "text": "也没什么，也就眼里进刀子了"
        }, {
            "time": 288.807,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了"
        }, {
            "time": 289.283,
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
            "text": "直接给孩子刀傻了(ノへ￣、)"
        }, {
            "time": 289.29,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "边跟唱边哭"
        }, {
            "time": 289.352,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "人被刀傻了"
        }, {
            "time": 289.428,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "喜欢仁太 还有大家"
        }, {
            "time": 290.045,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼里进砖头了家人们"
        }, {
            "time": 290.118,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "仁太情人母亲都……唉"
        }, {
            "time": 290.267,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "还我眼泪"
        }, {
            "time": 290.539,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪崩了"
        }, {
            "time": 290.844,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "还我眼泪"
        }, {
            "time": 291.215,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#683a7b",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#683a7b",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 292.073,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花喜，但见己悲"
        }, {
            "time": 293.31,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "啊！"
        }, {
            "time": 293.573,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，再见花时，泪已千行"
        }, {
            "time": 293.581,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "会被刀死"
        }, {
            "time": 293.933,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "蚌埠住了"
        }, {
            "time": 294.145,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "太好哭了"
        }, {
            "time": 294.695,
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
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 295.153,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "既然能看到灵魂 也就是说还是可以返魂的……努力吧少年家"
        }, {
            "time": 296.299,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "结局是什么"
        }, {
            "time": 296.467,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "没有音乐，其实不想哭的，音乐一响眼泪就不争气的流了"
        }, {
            "time": 296.739,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已经10年了阿，十年之后的9月我又打开了未闻花名，可是我已经24岁了。"
        }, {
            "time": 296.798,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "唉"
        }, {
            "time": 296.863,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜"
        }, {
            "time": 297.801,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "兄弟们我破防了"
        }, {
            "time": 298.352,
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
            "text": "忍不住了，交三连"
        }, {
            "time": 298.396,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "茅野爱衣配音封神"
        }, {
            "time": 298.43,
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
            "text": "三连留下了，我溜了溜了，受不了！！"
        }, {
            "time": 298.748,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "结局是什么"
        }, {
            "time": 298.767,
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
            "text": "任务完成，每日一刀"
        }, {
            "time": 298.833,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼睛里进我爱罗了"
        }, {
            "time": 299.211,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我哭了"
        }, {
            "time": 299.464,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名 但见花开 在见花时 泪已千行"
        }, {
            "time": 299.539,
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
            "text": "眼睛里进刀片了"
        }, {
            "time": 299.903,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "好家伙，没看过，哭了。"
        }, {
            "time": 299.965,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜呜呜呜呜呜"
        }, {
            "time": 300.305,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了啊啊啊啊啊啊啊"
        }, {
            "time": 300.884,
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
            "text": "眼里进沙子了"
        }, {
            "time": 301.139,
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
            "text": "c，他把刀往我眼里扔"
        }, {
            "time": 301.319,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "10年了"
        }, {
            "time": 301.387,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 302.479,
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
            "text": "蚌埠住了"
        }, {
            "time": 302.887,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼睛进原子弹了"
        }, {
            "time": 303.23,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "1"
        }, {
            "time": 303.763,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "他喵的我没看过都泪崩了"
        }, {
            "time": 304.118,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "没有结局！我以后要学这种专业。我要让他补上。"
        }, {
            "time": 305.416,
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
            "text": "确实进个刀子而已何足挂齿"
        }, {
            "time": 305.88,
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
            "text": "泪目"
        }, {
            "time": 305.959,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死得了……"
        }, {
            "time": 306.111,
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
            "text": "“未闻花名,但识花香,再遇花时,泪已千行”"
        }, {
            "time": 307.119,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜呜呜呜呜呜"
        }, {
            "time": 307.12,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "破功啊"
        }, {
            "time": 307.122,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 307.13,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "刀"
        }, {
            "time": 307.238,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "真的希望能出二啊"
        }, {
            "time": 307.299,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我哭了呜呜呜呜呜呜"
        }, {
            "time": 307.299,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码下次和大家好好聊天吧"
        }, {
            "time": 308.182,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 308.213,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "半夜哭死了"
        }, {
            "time": 308.719,
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
            "text": "每次看最后一集我都会哭"
        }, {
            "time": 308.851,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "把孩子刀傻了"
        }, {
            "time": 309.602,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 310.096,
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
            "text": "茅野爱衣2011年几岁啊"
        }, {
            "time": 310.504,
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
            "text": "眼睛里进拖拉机了"
        }, {
            "time": 311.102,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "配音强啊"
        }, {
            "time": 311.333,
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
            "text": "不希望出二，难不成你还想让面码复活？"
        }, {
            "time": 311.712,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "最后这段真是不敢碰啊太好哭了"
        }, {
            "time": 312.105,
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
            "text": "刀死我了"
        }, {
            "time": 312.529,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 312.529,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 312.529,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 312.529,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 312.529,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 312.529,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 312.529,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 312.665,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "最后别出二，剧情已经到最好的地方了，已经完美了"
        }, {
            "time": 312.951,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 313.297,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "杀了我吧嘤嘤嘤"
        }, {
            "time": 313.351,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 313.428,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了呜呜呜呜"
        }, {
            "time": 314.279,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "刚刷完哭死我了，再过来看这个真的哭炸了"
        }, {
            "time": 314.545,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香。再见花时，泪已千行。"
        }, {
            "time": 315.547,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 315.662,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "第一部都哭成这样了，第二部……"
        }, {
            "time": 316.288,
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
            "text": "你要相信有人会为你的死而哭泣，所以别说这种话了"
        }, {
            "time": 316.391,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这样已经是结局了 "
        }, {
            "time": 316.408,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "最好不要出二，剧情已经很完美了"
        }, {
            "time": 316.591,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼睛里进火车了"
        }, {
            "time": 316.882,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "人被刀，就会死"
        }, {
            "time": 316.886,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "不行了"
        }, {
            "time": 316.982,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "死去的记忆疯狂杀了"
        }, {
            "time": 317.16,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "刀了我吧呜呜呜"
        }, {
            "time": 317.706,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 317.951,
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
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 318.687,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "はな花のいみ意味をしっ知っていて、そのはな花をみ見ていないで、すでにそのはな花をみ見て、はな花のなまえ名前をきい聞いていないで、そのはな花"
        }, {
            "time": 318.897,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 319.016,
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
            "text": "未闻花名 但见花开 在见花时 泪已千行"
        }, {
            "time": 319.299,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 319.677,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 320.175,
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
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 320.289,
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
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 320.314,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 321.125,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "十年了 即使长大了 但真的一点都没改变"
        }, {
            "time": 321.191,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "至少不能否定其它人努力，"
        }, {
            "time": 321.259,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 321.546,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 321.977,
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
            "text": "茅野爱衣2011年几岁啊"
        }, {
            "time": 322.094,
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
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 322.987,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 323.659,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2022年的八月再次开始"
        }, {
            "time": 323.85,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "555555"
        }, {
            "time": 323.859,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "可恶的作者"
        }, {
            "time": 323.859,
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
            "text": "未闻花名"
        }, {
            "time": 324.018,
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
            "text": "没事，麻烦来个人把我眼里的钢筋吹出来"
        }, {
            "time": 324.119,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我努力不让眼泪留下来，可它就是不争气"
        }, {
            "time": 324.477,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 324.638,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "123 面码找到你了"
        }, {
            "time": 325.485,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 327.219,
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
            "text": "面码，找到你了！"
        }, {
            "time": 327.653,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了面玛"
        }, {
            "time": 328.033,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码 找到你了"
        }, {
            "time": 328.082,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码 找到你了"
        }, {
            "time": 328.189,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当曙光穿过你的身体，我愿说出这世间最长情的告白。​"
        }, {
            "time": 328.29,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "最美好的时光"
        }, {
            "time": 328.447,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码的愿望从来都是让仁太哭出来"
        }, {
            "time": 328.507,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 328.813,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了面麻"
        }, {
            "time": 328.83,
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
            "text": "仁太 面码 anaru 雪集 鹤子 波波"
        }, {
            "time": 328.844,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼睛进核弹了"
        }, {
            "time": 329.065,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 329.358,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "世界名画"
        }, {
            "time": 330.275,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 330.459,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "只能说这个视频很难绷得住"
        }, {
            "time": 330.556,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "未闻花名，但识花香，再遇花时，泪已千行"
        }, {
            "time": 331.005,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "阿伟死了"
        }, {
            "time": 331.021,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#a0ea",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#a0ea",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 331.13,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 331.219,
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
            "text": "面麻 找到你了"
        }, {
            "time": 331.299,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了哭了"
        }, {
            "time": 331.505,
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
            "text": "面码找你到你了"
        }, {
            "time": 331.511,
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
            "text": "“未闻花名,但识花香,再遇花时,泪已千行”"
        }, {
            "time": 331.842,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 331.95,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "绷不住"
        }, {
            "time": 332.032,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 332.307,
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
            "text": "当曙光穿过你的身体，我愿说出这世间最长情的告白。​"
        }, {
            "time": 332.342,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#683a7b",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#683a7b",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面玛，找到你了"
        }, {
            "time": 332.511,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 332.694,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 332.798,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 332.888,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 333.093,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#9843",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#9843",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 333.139,
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
            "text": "真是一秒都舍不得跳"
        }, {
            "time": 333.22,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#a0ea",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#a0ea",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 333.245,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了"
        }, {
            "time": 333.331,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 333.62,
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
            "text": "十年了，欢迎回来"
        }, {
            "time": 333.713,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 333.726,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 333.744,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 333.896,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 333.939,
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
            "text": "夜明けがあなたの体を通り抜ける時、私はこの世で一番長い告白を言いたい。"
        }, {
            "time": 333.942,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 333.942,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 333.942,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#2e72",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#2e72",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 333.942,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#683a7b",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#683a7b",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 334.077,
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
            "text": "当曙光穿过你的身体，我愿说出这世上最长情的告白"
        }, {
            "time": 334.139,
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
            "text": "当第一缕曙光穿过你的身体，我愿意说出这世间最长情的告白"
        }, {
            "time": 334.193,
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
            "text": "未来已成回忆，之事，将来近在眼前。"
        }, {
            "time": 334.236,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#a0ea",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#a0ea",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
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
            "text": "10年到了别忘了约定"
        }, {
            "time": 334.403,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 334.442,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 334.581,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 334.995,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 335.014,
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
            "text": "找到你了面码！！！呜呜呜呜呜呜呜呜"
        }, {
            "time": 335.201,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#a0ea",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#a0ea",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 335.442,
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
            "text": "大家一起 面码，找到你了"
        }, {
            "time": 335.463,
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
            "text": "面码，找到你了"
        }, {
            "time": 335.481,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当曙光穿过你的身体，我将说出世上最长情的告白"
        }, {
            "time": 335.527,
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
            "text": "被找到了"
        }, {
            "time": 335.55,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 335.84,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！"
        }, {
            "time": 335.849,
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
            "text": "芽芽，找到你了！"
        }, {
            "time": 335.872,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#2e72",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#2e72",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了"
        }, {
            "time": 336.054,
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
            "text": "未闻花命 但见花开 在见花时 泪已千行"
        }, {
            "time": 336.067,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 336.08,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "up太过分了，这谁受得了"
        }, {
            "time": 336.159,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了"
        }, {
            "time": 336.275,
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
            "text": "面码，找到你了"
        }, {
            "time": 336.358,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！"
        }, {
            "time": 336.371,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 336.627,
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
            "text": "花の意を知っていて、その花にまだ会っていないで、すでにその花に会って、前代未聞の花の名、もう1度会ってその花を使って、涙は千海海里に落ちます。​"
        }, {
            "time": 336.627,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 336.659,
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
            "text": "当清晨的曙光穿过你的胸膛，我将说出那句最深情的告白"
        }, {
            "time": 336.699,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 336.71,
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
            "text": "面码，找到你了"
        }, {
            "time": 336.799,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我们仍未知道那天所看见花的名字"
        }, {
            "time": 336.894,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "4月7日前来二刷"
        }, {
            "time": 336.939,
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
            "text": "找到你了，面码"
        }, {
            "time": 336.972,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 337.205,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了! ！！"
        }, {
            "time": 337.339,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 337.379,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 337.388,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 337.47,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭了"
        }, {
            "time": 337.503,
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
            "text": "找到你了"
        }, {
            "time": 337.599,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了代表结束"
        }, {
            "time": 337.71,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜呜呜呜呜"
        }, {
            "time": 337.777,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 337.953,
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
            "text": "面码找到你了！"
        }, {
            "time": 337.999,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出世上最长情的告白"
        }, {
            "time": 338.039,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目了"
        }, {
            "time": 338.145,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "刀傻了"
        }, {
            "time": 338.407,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 338.417,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "死去的回忆开始攻击我"
        }, {
            "time": 338.452,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！"
        }, {
            "time": 338.478,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 338.703,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 338.798,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面麻"
        }, {
            "time": 338.828,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 338.92,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#683a7b",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#683a7b",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 338.92,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 338.92,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#2e72",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#2e72",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 338.971,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 339.124,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了！面码"
        }, {
            "time": 339.213,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了面码"
        }, {
            "time": 339.242,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 339.32,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 339.479,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "每次很想小时候的玩伴的时候就会想起这个电影"
        }, {
            "time": 339.579,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#a0ea",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#a0ea",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 339.607,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了 ，面码"
        }, {
            "time": 339.624,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#e70012",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#e70012",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我一定会找到你的，不管你转世何方"
        }, {
            "time": 339.815,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "但是她没有转世啊……"
        }, {
            "time": 339.908,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了！"
        }, {
            "time": 340.079,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，，，"
        }, {
            "time": 340.195,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "是刀吗？不过相信后面一定是甜的，刀，全他码是刀"
        }, {
            "time": 340.201,
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
            "text": "面码，找到你了"
        }, {
            "time": 340.35,
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
            "text": "(╥╯﹏╰╥)ง"
        }, {
            "time": 340.44,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 340.512,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#ffff00",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffff00",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 340.512,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 340.512,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了 哈"
        }, {
            "time": 340.512,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 340.512,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 340.512,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#89d5ff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#89d5ff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 340.525,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#927939",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#927939",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 340.561,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "泪目"
        }, {
            "time": 340.714,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 340.714,
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
            "text": "被找到了，哈"
        }, {
            "time": 340.714,
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
            "text": "被找到了，哈"
        }, {
            "time": 340.714,
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
            "text": "被找到了，哈"
        }, {
            "time": 340.714,
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
            "text": "被找到了，哈"
        }, {
            "time": 340.714,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#4266be",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#4266be",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 340.714,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#4266be",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#4266be",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 340.714,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#4266be",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#4266be",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 340.714,
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
            "text": "被找到了，哈"
        }, {
            "time": 340.714,
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
            "text": "被找到了，哈"
        }, {
            "time": 340.849,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你啦!!!"
        }, {
            "time": 340.864,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了！面码！"
        }, {
            "time": 340.914,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 340.922,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "不知道为什么，明明没有看过，却也哭的泪流满面"
        }, {
            "time": 341.091,
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
            "text": "我们仍未知道那天所看见花的名字"
        }, {
            "time": 341.143,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 341.143,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 341.143,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#ffff00",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffff00",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 341.143,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#ffff00",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffff00",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 341.143,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#ffff00",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffff00",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 341.199,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 341.27,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜"
        }, {
            "time": 341.332,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了面码"
        }, {
            "time": 341.362,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "猛男落泪"
        }, {
            "time": 341.379,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 341.422,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 341.739,
            "mode": "top",
            "style": {
                "fontSize": "22px",
                "color": "#2e72",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#2e72",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 341.759,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 341.973,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 342.138,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 342.219,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#a0ea",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#a0ea",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 342.296,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 342.388,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 342.428,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了 面码"
        }, {
            "time": 342.439,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呃"
        }, {
            "time": 342.522,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 342.619,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "把我杀了吧"
        }, {
            "time": 342.901,
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
            "text": "面码，找到你了"
        }, {
            "time": 342.908,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 343.237,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 343.521,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 343.526,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 343.554,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "人哭没了呜呜呜呜呜呜呜呜"
        }, {
            "time": 343.558,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 343.587,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "再见，面码，希望大家都能找到你"
        }, {
            "time": 344.117,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，mian'ma"
        }, {
            "time": 344.121,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 344.139,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 344.157,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "眼睛进了沙暴送葬"
        }, {
            "time": 344.201,
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
            "text": "被找到了，哈"
        }, {
            "time": 344.218,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 344.239,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到了"
        }, {
            "time": 344.511,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "被找到了，哈"
        }, {
            "time": 344.518,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 345.04,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "是在小学的一个夏天"
        }, {
            "time": 345.116,
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
            "text": "撒由那拉"
        }, {
            "time": 345.561,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "哭死了"
        }, {
            "time": 345.583,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了 面码"
        }, {
            "time": 345.676,
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
            "text": "找到你了，面码"
        }, {
            "time": 345.679,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我也找到你了"
        }, {
            "time": 345.78,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 346.473,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "直击灵魂"
        }, {
            "time": 346.577,
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
            "text": "面码，找到你了"
        }, {
            "time": 346.725,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "夜明けがあなたの体を通り抜ける時、私はこの世で一番長い告白を言いたい。"
        }, {
            "time": 346.823,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 346.961,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码 找到你了"
        }, {
            "time": 347.068,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "已知花意，未见其花，已见其花，未闻花名，再见其花，落泪千溟，未闻花名，但识花香，已知花名，花已不在。未闻花名，但识花香，再遇花时，泪已千行。我知花意，花不知我。爱其芬芳，闻其花名。回头忆我，我心故我"
        }, {
            "time": 347.069,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我也找到你了，面码"
        }, {
            "time": 347.344,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了面码"
        }, {
            "time": 347.409,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 347.556,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，再也不放手！"
        }, {
            "time": 347.731,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "md每次看都哭"
        }, {
            "time": 347.969,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "呜呜呜呜"
        }, {
            "time": 348.449,
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
            "text": "找到你了 面码"
        }, {
            "time": 349.029,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "约定"
        }, {
            "time": 349.435,
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
            "text": "当第一缕曙光穿过你的身体，我愿说出这世间最长情的告白。"
        }, {
            "time": 349.61,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "我只是听了个曲子，我哭了"
        }, {
            "time": 349.796,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "这便是最奥的结局"
        }, {
            "time": 350.171,
            "mode": "bottom",
            "style": {
                "fontSize": "22px",
                "color": "#fe0302",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#fe0302",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "超和平Bust永远都是好朋友"
        }, {
            "time": 350.242,
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
            "text": "超和平Busters 永远都是好朋友！！！"
        }, {
            "time": 350.28,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "你小子币有了啊"
        }, {
            "time": 350.379,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了，面码"
        }, {
            "time": 350.398,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 350.678,
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
            "text": "超和平Busters永远都是好朋友"
        }, {
            "time": 350.686,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了"
        }, {
            "time": 350.908,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "明天看"
        }, {
            "time": 350.919,
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
            "text": "8月28了 寂寞寂寞"
        }, {
            "time": 351.171,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "面码，找到你了"
        }, {
            "time": 351.75,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "超和平Busters永远都是好朋友"
        }, {
            "time": 353.179,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2011—2021十年纪念"
        }, {
            "time": 354.622,
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
            "text": "8.31报到"
        }, {
            "time": 354.664,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "最好"
        }, {
            "time": 355.381,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "永远都在！"
        }, {
            "time": 355.382,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "找到你了面码"
        }, {
            "time": 355.665,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#84c0cb",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#84c0cb",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "剪的很好下回别剪了"
        }, {
            "time": 355.719,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "每日一边"
        }, {
            "time": 356.499,
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
            "text": "8月28了 寂寞寂寞"
        }, {
            "time": 357.609,
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
            "text": "2021 9.6"
        }, {
            "time": 357.667,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "2023报道"
        }, {
            "time": 358.92,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "忍了很久，但还是在最后一刻泪奔"
        }, {
            "time": 358.997,
            "mode": "rtl",
            "style": {
                "fontSize": "22px",
                "color": "#ffffff",
                "textShadow": "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
                "font": "22px sans-serif",
                "fillStyle": "#ffffff",
                "strokeStyle": "#000",
                "lineWidth": 2
            },
            "text": "“面码最喜欢仁太了，是要做仁太老婆的那种哦”"
        }]
        this.danmaku = new Danmaku({
            container: document.querySelector('#bkmplayer .danmaku'),
            media: document.querySelector('#bkmplayer video'),
            comments: comments
        });
        $('.danmaku-info-dm').text('已装填 ' + comments.length + ' 条弹幕');
    }

    LoadSubtitle() {
        if (this.subtitle) {
            this.Video.innerHTML = this.Video.innerHTML + '<track src="' + this.subtitle + '" kind="subtitles" label="chinese" srclang="zh" default="true">'
        }
    }
	
    Init() {
        console.log("%cBkmPlayer%c Version " + this.version + " Powered by FlxSNX (一个乱糟糟&功能不完善的视频播放器)", 'font-family:"微软雅黑";color:#5959bb;font-size:48px;text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);', 'font-size:12px;color:#666;font-family: "微软雅黑";');

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

        if (this.nextpartmode == true) {
            this.nextpartFunc(this.playId != 0 ? this.playId : 0);
        } else {
            $('#bkmplayer .btn-next').hide();
        }

        if (this.video.title) {
            $('#bkmplayer>.header>.title').text(this.video.title);
        } else {
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
                    */
                    ;
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
                if (Player.Video.videoHeight > Player.Video.videoWidth) {
                    this.container.style.height = Player.Video.videoWidth + 'px';
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
			if(this.Video.buffered.length > 0)$('#bkmplayer .loaded').css('width', this.Video.buffered.end(this.Video.buffered.length-1)/ this.Video.duration * 100 + '%');
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
			console.log(e);
            e.preventDefault();
            $('#bkmplayer>.right').css({
                'left': e.offsetX + 'px',
                'top': e.offsetY + 'px',
				'bottom': 'initial'
            });
            $('#bkmplayer>.right').show();
        };

        $('#bkmplayer .header')[0].oncontextmenu = e => {
			console.log(e);
            e.preventDefault();
            $('#bkmplayer>.right').css({
                'left': e.offsetX + 'px',
                'top': e.offsetY + 'px',
				'bottom': 'initial'
            });
            $('#bkmplayer>.right').show();
        };

		$('#bkmplayer .control')[0].oncontextmenu = e => {
			e.preventDefault();
			e.stopPropagation();
			$('#bkmplayer>.right').css({
                'left': e.offsetX + 'px',
				'top': 'initial',
                'bottom': 0
            });
            $('#bkmplayer>.right').show();
        };

        $(window).click(function() {
            $('#bkmplayer>.right').hide();
        });

        $('#bkmplayer>.right>ul>li').eq(1).on('click', _ => {
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
    setPlayerUrl(url, title) {

        if (this.hls) this.hls.detachMedia();
        this.video.url = url;

        this.video.title = title;
        if (this.video.title) {
            $('#bkmplayer>.header>.title').text(this.video.title);
        } else {
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
            if (this.IsMobile()) {
                if (this.Video.paused) {
                    this.Video.play();
                } else {
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
                }, 5000);
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
                }, 5000);
            } else {
                if (hidecontrol) clearTimeout(hidecontrol);
            }
        });
        /* 鼠标停在播放器时显示控件 移出隐藏控件 */

        $('#bkmplayer').hover(() => {
            $('#bkmplayer').attr('style', 'cursor: auto');
            $('#bkmplayer .control').attr('style', '');
            this.showHeader(true)
        }/* , () => {
            if (this.Video.paused == false) {
                $('#bkmplayer .control').attr('style', 'opacity: 0');
                this.showHeader(false)
            }
        } */);

        if (this.isIos == true) {
            $('.control .fullscreen').click(() => {
                return this.Video.webkitEnterFullscreen();
            });
        } else {
            /* 全屏按钮事件 */
            $('.control .fullscreen').click(function() {
                if ($(this).attr('full') == 'true') {
                    document.exitFullscreen();
                    $(this).attr('full', 'false');
					$('#bkmplayer .control').removeClass('full');
					$('#bkmplayer .timetips').removeClass('full');
                    $(this).removeClass('full');
                } else {
                    $('#bkmplayer')[0].requestFullscreen();
                    $(this).attr('full', 'true');
					$('#bkmplayer .control').addClass('full');
					$('#bkmplayer .timetips').addClass('full');
                    $(this).addClass('full');
                }
            });
        }

        /* 用于Esc退出全屏时切换全屏按钮 */
        $('#bkmplayer').on('fullscreenchange', _ => {
            if (!document.fullscreenElement) {
                $('.control .fullscreen').attr('full', 'false');
                $('.control .fullscreen').removeClass('full');
				$('#bkmplayer .control').removeClass('full');
				$('#bkmplayer .timetips').removeClass('full');
            }
        });

/* 		$('#bkmplayer .danmaku')[0].onresize = _=>{
			console.log('弹幕区域大小发生改变');
			this.danmaku.resize();
		} */

		const danmakuObserver = new ResizeObserver(entries => {
			this.danmaku.resize();
		})
		danmakuObserver.observe($('#bkmplayer .danmaku')[0])

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

        if (this.IsMobile()) {
            /* 移动端通过进度条改变视频播放进度 */
            $('#bkmplayer .progress').on('touchstart', e => {
                console.log('touchstart');
                let x;
                this.isMove = true;
                x = e.touches[0].clientX - $('#bkmplayer').offset().left - 10;
                $('#bkmplayer').on('touchmove', e => {
                    console.log('touchmove', e);
                    if (this.isMove == true) {
                        ;
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
                $(document).on('touchend', e => {
                    console.log('touchend');
                    if (this.isMove == true) {
                        this.isMove = false;
                        //更改前的进度
                        let stime = Math.trunc(this.Video.currentTime);
                        this.Video.currentTime = Math.trunc($('#bkmplayer .current').width() / $('#bkmplayer .progress').width() * this.Video.duration);

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

    showHeader(bool) {
        if (this.video.title) {
            if (bool == true) {
                $('#bkmplayer>.header').attr('style', '');
            } else {
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