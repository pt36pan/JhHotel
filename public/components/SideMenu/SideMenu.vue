<template>

    <div class="content">
        <ul>
            <li v-for="item in items" :key="key">
                <router-link :to="'/'+item.route">{{item.title}}</router-link>
            </li>
        </ul>
    </div>

</template>

<script type="text/ecmascript-6">
    export default{
        components: {},
        props: {
            items: {
                type: Array,
                default: [
                    {title: '营收数据', route: 'dash'},
                    {title: '每日房态', route: 'rooms'},
                ]
            }
        },
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
    .content {
        position: fixed;
        z-index: 10;
        width: 100px;
        height: 100%;
        background: darkgrey;
    }

    li {
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid lightgray;
        cursor: pointer;
    }

    li:hover {
        background: white;
    }

    li:hover a {
        color: darkgrey;
    }

    a:link {
        color: white;
        text-decoration: none;
    }

    a:visited {
        color: white;
        text-decoration: none;
    }
</style>