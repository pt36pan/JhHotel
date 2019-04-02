<template>

    <div>
        仪表盘
        <scroll-water></scroll-water>
    </div>

</template>

<script type="text/ecmascript-6">
    import ScrollWater from '../../components/ScrollWater/ScrollWater.vue';

    export default{
        components: {
            ScrollWater
        },
        props: {},
        computed: {},
        data(){
            return {}
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

</style>