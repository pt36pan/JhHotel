<template>

    <div class="content" :style="{width:screenWidth + 'px'}">
        <div class="item" v-for="(item,index) in nodeList" :key="item.id" :style="{width:waterfallWidth +'px' , height:item.itemHeight + 'px',
            left:item.left + 'px', top:item.top + 'px'}" ref="col" @click="">
            <div>{{item.id}}</div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    let HeightArray = [];
    export default{
        components: {},
        props: {},
        computed: {
            //  子元素宽度
            waterfallWidth: function () {
                return (this.screenWidth - (this.colNum + 1) * 10) / this.colNum
            }
        },
        data(){
            return {
                nodeList: [],
                //  子元素间隙
                gap: 10,
                //  子元素开始时的left值
                initLeft: 10,
                //  默认为两列排列
                colNum: 4,
                //  屏幕宽度
                screenWidth: document.body.clientWidth,
            }
        },
        created: function () {
            //  实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，还不可用。需要初始化处理一些数据时会比较有用。
            let _this = this;
//            _this.waterfallWidth = (_this.screenWidth - (_this.colNum + 1) * 10) / _this.colNum;
        },
        mounted(){
            //  el挂载到实例上后会调用，第一个业务逻辑一般从这里开始。
            let _this = this;
            let list = _this.$refs.col;
            for (let i = 0; i < _this.colNum; i++) {
                HeightArray[i] = _this.gap;
            }
            for (let i = 0; i < 13; i++) {
                _this.nodeList.push({
                    id: i + 1,
                    img: '',
                    title: '',
                    desc: '',
                    left: '',
                    top: '',
                    col: 0,
                    itemHeight: parseInt(Math.random() * 10 * 50) + ''
                })
            }
            _this.doSort(_this.nodeList);

            window.onresize = function () {
                for (let i = 0; i < _this.colNum; i++) {
                    HeightArray[i] = _this.gap;
                }
                _this.screenWidth = document.body.clientWidth;
                _this.doSort(_this.nodeList);
            }
        },
        beforeDestroy: function () {
            //  实例销毁之前调用。主要是解绑一些使用addEventListener监听的事件等。
        },
        methods: {
            doSort: function (list) {
                let _this = this;
                let gap = _this.gap;
                let colNum = _this.colNum;
                let Nodes = _this.nodeList;
                for (let i = 0; i < list.length; i++) {
                    let left;

                    //当前元素处于的列
                    let col = (i + 1) % colNum;
                    if (col === 0) {
                        col = colNum;
                    }
//                    console.log('第' + (col + 1) + '列');
                    //当前元素的高度
                    let itemH = parseInt(Nodes[i].itemHeight);
//                    console.log('当前元素高度' + itemH);
                    //当前元素处于的行
                    let row = parseInt(i / colNum) + 1;
//                    console.log('当前是第' + row + '行');
                    //从第二行开始设置元素的top值
                    if (i >= colNum) {
                        let colMin = _this.getMinFromArr(HeightArray);
                        left = _this.waterfallWidth * colMin + gap * (colMin + 1);
                        Nodes[i].top = HeightArray[colMin];
                        HeightArray[colMin] += itemH + gap;
                        Nodes[i].col = colMin + 1;
                    } else {
                        Nodes[i].top = gap;
                        HeightArray[col - 1] += itemH + gap;
                        left = _this.waterfallWidth * (col - 1) + gap * col;
                        Nodes[i].col = col;
                    }
                    //设置元素的left值
                    Nodes[i].left = left;
                }
            },
            //获取数组最小值的下标
            getMinFromArr: function (arr) {
                return arr.indexOf(Math.min.apply(this, arr))
            },
        }

    }
</script>
<style scoped>
    .content {
        position: relative;
    }

    .item {
        position: absolute;
        background: red;
        transition: all .2s;
    }
</style>