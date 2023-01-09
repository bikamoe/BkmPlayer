export let template = `
<div id="bkmplayer" class="bkmplayer-dark">
    <div class="danmaku"></div>
    <div class="header">
        <div class="title"></div>
    </div>
    <div class="loading">
        <div class="info"></div>
    </div>
    <div class="loading_2">
        <svg x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve">
            <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(338.83 25 25)">
                <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
            </path>
        </svg>
    </div>
    <div class="playicon"></div>
    <div class="logo"><img></div>
    <div class="tips"><span></span></div>
    <div class="timetips"><span></span></div>
    <div class="warp">
        <video playsinline x5-playsinline webkit-playsinline preload="metadata"></video>
    </div>
    <div class="control">
        <div class="action">
            <div class="btn-play"><span></span></div>
            <div class="btn-next"><span></span></div>
            <div class="time"><span>00:00</span> / <span>00:00</span></div>
            <div class="right">
                <div class="fullscreen"><span></span></div>
            </div>
        </div>
        <div class="progress">
            <div class="loaded"></div>
            <div class="current">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;transform:translate3d(0,0,0)">
                        <defs>
                            <clipPath id="__lottie_element_25">
                                <rect width="18" height="18" x="0" y="0"></rect>
                            </clipPath>
                        </defs>
                        <g clip-path="url(#__lottie_element_25)">
                            <g transform="matrix(1,0,0,1,8.937000274658203,8.25)" opacity="0.14" style="display:block">
                                <g opacity="1" transform="matrix(1,0,0,1,0.07500000298023224,1.2130000591278076)">
                                    <path fill="rgb(251,114,153)" fill-opacity="1" d=" M9,-3.5 C9,-3.5 9,3.5 9,3.5 C9,5.707600116729736 7.207600116729736,7.5 5,7.5 C5,7.5 -5,7.5 -5,7.5 C-7.207600116729736,7.5 -9,5.707600116729736 -9,3.5 C-9,3.5 -9,-3.5 -9,-3.5 C-9,-5.707600116729736 -7.207600116729736,-7.5 -5,-7.5 C-5,-7.5 5,-7.5 5,-7.5 C7.207600116729736,-7.5 9,-5.707600116729736 9,-3.5z"></path>
                                </g>
                            </g>
                            <g transform="matrix(1,0,0,1,9.140999794006348,8.67199993133545)" opacity="0.28" style="display:block">
                                <g opacity="1" transform="matrix(1,0,0,1,-0.1509999930858612,0.7990000247955322)">
                                    <path fill="rgb(251,114,153)" fill-opacity="1" d=" M8,-3 C8,-3 8,3 8,3 C8,4.931650161743164 6.431650161743164,6.5 4.5,6.5 C4.5,6.5 -4.5,6.5 -4.5,6.5 C-6.431650161743164,6.5 -8,4.931650161743164 -8,3 C-8,3 -8,-3 -8,-3 C-8,-4.931650161743164 -6.431650161743164,-6.5 -4.5,-6.5 C-4.5,-6.5 4.5,-6.5 4.5,-6.5 C6.431650161743164,-6.5 8,-4.931650161743164 8,-3z"></path>
                                </g>
                            </g>
                            <g transform="matrix(0.9883429408073425,-0.7275781631469727,0.6775955557823181,0.920446515083313,7.3224687576293945,-0.7606706619262695)" opacity="1" style="display:block">
                                <g opacity="1" transform="matrix(0.9937776327133179,-0.11138220876455307,0.11138220876455307,0.9937776327133179,-2.5239999294281006,1.3849999904632568)">
                                    <path fill="rgb(0,0,0)" fill-opacity="1" d=" M0.75,-1.25 C0.75,-1.25 0.75,1.25 0.75,1.25 C0.75,1.663925051689148 0.4139249920845032,2 0,2 C0,2 0,2 0,2 C-0.4139249920845032,2 -0.75,1.663925051689148 -0.75,1.25 C-0.75,1.25 -0.75,-1.25 -0.75,-1.25 C-0.75,-1.663925051689148 -0.4139249920845032,-2 0,-2 C0,-2 0,-2 0,-2 C0.4139249920845032,-2 0.75,-1.663925051689148 0.75,-1.25z"></path>
                                </g>
                            </g>
                            <g transform="matrix(1.1436611413955688,0.7535901665687561,-0.6317168474197388,0.9587040543556213,16.0070743560791,2.902894973754883)" opacity="1" style="display:block">
                                <g opacity="1" transform="matrix(0.992861807346344,0.1192704513669014,-0.1192704513669014,0.992861807346344,-2.5239999294281006,1.3849999904632568)">
                                    <path fill="rgb(0,0,0)" fill-opacity="1" d=" M0.75,-1.25 C0.75,-1.25 0.75,1.25 0.75,1.25 C0.75,1.663925051689148 0.4139249920845032,2 0,2 C0,2 0,2 0,2 C-0.4139249920845032,2 -0.75,1.663925051689148 -0.75,1.25 C-0.75,1.25 -0.75,-1.25 -0.75,-1.25 C-0.75,-1.663925051689148 -0.4139249920845032,-2 0,-2 C0,-2 0,-2 0,-2 C0.4139249920845032,-2 0.75,-1.663925051689148 0.75,-1.25z"></path>
                                </g>
                            </g>
                            <g transform="matrix(1,0,0,1,8.890999794006348,8.406000137329102)" opacity="1" style="display:block">
                                <g opacity="1" transform="matrix(1,0,0,1,0.09099999815225601,1.1009999513626099)">
                                    <path fill="rgb(255,255,255)" fill-opacity="1" d=" M7,-3 C7,-3 7,3 7,3 C7,4.379749774932861 5.879749774932861,5.5 4.5,5.5 C4.5,5.5 -4.5,5.5 -4.5,5.5 C-5.879749774932861,5.5 -7,4.379749774932861 -7,3 C-7,3 -7,-3 -7,-3 C-7,-4.379749774932861 -5.879749774932861,-5.5 -4.5,-5.5 C-4.5,-5.5 4.5,-5.5 4.5,-5.5 C5.879749774932861,-5.5 7,-4.379749774932861 7,-3z"></path>
                                    <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="1.5" d=" M7,-3 C7,-3 7,3 7,3 C7,4.379749774932861 5.879749774932861,5.5 4.5,5.5 C4.5,5.5 -4.5,5.5 -4.5,5.5 C-5.879749774932861,5.5 -7,4.379749774932861 -7,3 C-7,3 -7,-3 -7,-3 C-7,-4.379749774932861 -5.879749774932861,-5.5 -4.5,-5.5 C-4.5,-5.5 4.5,-5.5 4.5,-5.5 C5.879749774932861,-5.5 7,-4.379749774932861 7,-3z"></path>
                                </g>
                            </g>
                            <g transform="matrix(1,0,0,1,8.89900016784668,8.083999633789062)" opacity="1" style="display:block">
                                <g opacity="1" transform="matrix(1,0,0,1,-2.5239999294281006,1.3849999904632568)">
                                    <path fill="rgb(0,0,0)" fill-opacity="1" d=" M0.875,-1.125 C0.875,-1.125 0.875,1.125 0.875,1.125 C0.875,1.607912540435791 0.48291251063346863,2 0,2 C0,2 0,2 0,2 C-0.48291251063346863,2 -0.875,1.607912540435791 -0.875,1.125 C-0.875,1.125 -0.875,-1.125 -0.875,-1.125 C-0.875,-1.607912540435791 -0.48291251063346863,-2 0,-2 C0,-2 0,-2 0,-2 C0.48291251063346863,-2 0.875,-1.607912540435791 0.875,-1.125z"></path>
                                </g>
                            </g>
                            <g transform="matrix(1,0,0,1,14.008999824523926,8.083999633789062)" opacity="1" style="display:block">
                                <g opacity="1" transform="matrix(1,0,0,1,-2.5239999294281006,1.3849999904632568)">
                                    <path fill="rgb(0,0,0)" fill-opacity="1" d=" M0.8999999761581421,-1.100000023841858 C0.8999999761581421,-1.100000023841858 0.8999999761581421,1.100000023841858 0.8999999761581421,1.100000023841858 C0.8999999761581421,1.596709966659546 0.4967099726200104,2 0,2 C0,2 0,2 0,2 C-0.4967099726200104,2 -0.8999999761581421,1.596709966659546 -0.8999999761581421,1.100000023841858 C-0.8999999761581421,1.100000023841858 -0.8999999761581421,-1.100000023841858 -0.8999999761581421,-1.100000023841858 C-0.8999999761581421,-1.596709966659546 -0.4967099726200104,-2 0,-2 C0,-2 0,-2 0,-2 C0.4967099726200104,-2 0.8999999761581421,-1.596709966659546 0.8999999761581421,-1.100000023841858z"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
            <div class="duration"></div>
        </div>
    </div>
    <div class="right">
        <ul>
            <!-- <li><a target="_blank" href="https://github.com/bikamoe/BkmPlayer">BKMPlayer V' + this.version + '</a></li> -->
            <li><a target="_blank" href="https://github.com/bikamoe/BkmPlayer">BKMPlayer V1.40</a></li>
            <li><a href="javascript:;">画中画</a></li>
            <li><a href="javascript:;">快捷键</a></li>
        </ul>
    </div>
    <div class="danmaku-send">
        <div class="danmaku-info">
            <div class="danmaku-info-dm">已装填 ∞ 条弹幕</div>
        </div>
        <div class="danmaku-input">
            <div class="danmaku-type"></div>
            <input type="text" placeholder="发个友善的弹幕见证当下">
            <button>发送</button>
        </div>
    </div>
</div>`;