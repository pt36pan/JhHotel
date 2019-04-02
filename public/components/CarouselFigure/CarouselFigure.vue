<template>

    <div style="overflow-x: hidden">
        <div class="window">
            <ul id="carouseFigure" class="container" :style="containerStyle">
                <!--最前面的辅助图 内容是最后一张图 用于无线滚动-->
                <li>
                    <img :src="sliders[sliders.length-1].img" alt="">
                </li>
                <li v-for="(item,index) in sliders" :key="index">
                    <img :src="item.img" alt="">
                </li>
                <!--最后面的辅助图 内容是第一张图 用于无线滚动-->
                <li>
                    <img :src="sliders[0].img" alt="">
                </li>
            </ul>
            <!--两侧的箭头-->
            <ul class="direction">
                <li class="directionItem left" @click="move(0,1)">
                    <svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill="#ffffff"
                              d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z"/>
                    </svg>
                </li>
                <li class="directionItem right" @click="move(0,-1)">
                    <svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill="#ffffff"
                              d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"/>
                    </svg>
                </li>
            </ul>
            <!--导航原点-->
            <ul class="dots">
                <li v-for="(dot,index) in sliders" :key="index"
                    :class='index === (currentIndex-1)?"dotted":""'
                    @click="move(index+1,0)">
                </li>
            </ul>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default{
        name: 'carouselFigure',
        components: {},
        props: {},
        computed: {
            containerStyle: function () {
                return {
                    transform: `translate3d(${this.distance}px,0,0)`,
                    width: `${Math.abs((this.sliders.length + 2) * this.windowWidth)}px`,
                }
            },
            currentIndex: function () {
                return Math.abs(this.distance / this.windowWidth)
            }
        },
        data(){
            return {
                sliders: [
                    {
                        id: 1,
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546947149338&di=2bc469e04872dafc02e5617213e1b9f9&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171222%2F27efbd25076f469da33e553dd0522272.jpeg'
                    },
                    {
                        id: 2,
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546947149334&di=c9ceb17a7d866e9a8518b27c67cdd11f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01bf715713ccdb32f8758c9bcbf2e1.jpg'
                    },
                    {
                        id: 3,
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546947149326&di=85c0c6ecb273c2ea5c8ddf5ff7362705&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F2e0413092d89335fefe159fddd2e629884dde6545449f-NFWuAC_fw658'
                    },
                    {
                        id: 4,
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546947219056&di=d092a8a2f3c1a8dcbe65eeaa4b1cbd27&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201605%2F08%2F20160508214203_WZJe4.jpeg'
                    },
                    {
                        id: 5,
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546947219055&di=a4271464faac0371201500d8b3fb3588&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fce8f4a0c7cfe78d9ee97f1f3ef8eedcfabe2c6b13c6e5-iFmjTf_fw658'
                    }
                ],
                distance: -400,
                windowWidth: 400,
                autoPlay: true,
                speed: 2000,
                playTimer: 0,
            }
        },
        created: function () {
            //  实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，还不可用。需要初始化处理一些数据时会比较有用。

        },
        mounted(){
            //  el挂载到实例上后会调用，第一个业务逻辑一般从这里开始。
            let _this = this;
            if (_this.autoPlay) {
                _this.play(_this);
                let root = document.getElementById('carouseFigure');
                root.addEventListener('mouseover', function () {
                    console.log('mouseover');
                    _this.stop(_this);
                });
                root.addEventListener('mouseleave', function () {
                    _this.play(_this);
                });
                /*防止页面失去焦点后再回来一次性把setInterval走完造成轮播狂转*/
                window.onblur = function () {
                    _this.stop(_this);
                };
                window.onfocus = function () {
                    _this.play(_this);
                }
            }
        },
        beforeDestroy: function () {
            //  实例销毁之前调用。主要是解绑一些使用addEventListener监听的事件等。
        },
        methods: {
            move: function (offset, direction) {
                let _this = this;
//                console.log('before:' + _this.distance);
                _this.stop(_this);
                if (offset === 0) {
                    //左右两侧按钮切换 自动播放
                    _this.distance += _this.windowWidth * direction;
//                console.log('after:' + _this.distance);
                    let _distance = _this.distance;
                    let maxOffset = _this.windowWidth * (_this.sliders.length + 1);
                    let minOffset = _this.windowWidth;
//                console.log('max:' + maxOffset);
//                console.log('min:' + minOffset);
                    //偏移量已经超过最后一张图片
                    if (_distance <= -maxOffset) {
                        _this.distance = -minOffset;
                    }
                    //偏移量已经小于第一张图片
                    if (_distance >= 0) {
                        _this.distance = -(maxOffset - minOffset);
                    }
//                console.log('last:' + _this.distance);
                } else if (direction === 0) {
                    //小圆点导航切换
                    let _index = offset;
                    _this.distance = -(_this.windowWidth * _index);
                }
                _this.play(_this);
            },
            play: function (context) {
                let _this = context;
                if (_this.playTimer) {
                    _this.stop(_this);
                }
                _this.playTimer = setInterval(function () {
                    _this.move(0, -1);
                }, _this.speed)
            },
            stop: function (context) {
                let _this = context;
                window.clearInterval(_this.playTimer);
                _this.playTimer = null;
            }
        }

    }
</script>
<style scoped>
    .window {
        width: 400px;
        position: relative;
    }

    .container {
        overflow: hidden;
        transition: all .2s;
    }

    .container li {
        border: 1px solid white;
        width: 398px;
        height: 262px;
        float: left;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .direction {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }

    .directionItem {
        cursor: pointer;
    }

    .directionItem :hover {
        background: white;
    }

    .left {
        float: left;
    }

    .right {
        float: right;
    }

    .dots {
        position: absolute;
        left: 50%;
        top: 85%;
        transform: translate(-50%, -50%);
        overflow: hidden;
    }

    .dots li {
        width: 14px;
        height: 14px;
        margin: 2px;
        background-color: dimgrey;
        border: solid 1px white;
        border-radius: 50%;
        float: left;
        list-style: none;
        opacity: .55;
        transition: all .2s;
        cursor: pointer;
    }

    .dots li:hover {
        opacity: .75;
    }

    .dotted {
        background-color: orange !important;
    }
</style>