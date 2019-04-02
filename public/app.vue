<template>

    <div>
        <side-menu :items="menuArray"></side-menu>
        <div class="info-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import SideMenu from './components/SideMenu/SideMenu.vue';

    export default{
        components: {
            SideMenu,
        },
        props: {},
        computed: {},
        data(){
            return {
                menuArray:[
                    {title:'营收数据',route:'dash'},
                    {title:'每日房态',route:'rooms'},
                    {title:'商品销售',route:'dash'},
                    {title:'房型管理',route:'rooms'},
                    {title:'商品管理',route:'dash'},
                    {title:'信息维护',route:'rooms'},
                ]
            }
        },
        created: function () {
            //  实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，还不可用。需要初始化处理一些数据时会比较有用。

        },
        mounted(){
            //  el挂载到实例上后会调用，第一个业务逻辑一般从这里开始。
        },
        beforeDestroy: function () {
            //  实例销毁之前调用。主要是解绑一些使用addEventListener监听的事件等。
        },
        methods: {}

    }
</script>
<style scoped>
    .info-content{
        position: absolute;
        width: 100%;
        padding-left: 100px;
        height: 100%;
        background: lightgoldenrodyellow;
    }
</style>