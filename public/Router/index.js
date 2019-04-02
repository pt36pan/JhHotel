/**
 * Created by peterpan on 2018/12/4.
 */

import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Routers = [
    {
        path: '/dash',
        component: (resolve) => require(['../views/Dash/Dash.vue'], resolve)
    },
    {
        path: '/rooms',
        component: (resolve) => require(['../views/Rooms/Rooms.vue'], resolve)
    },
    {
        // 当访问的路径不存在时，重定向到index
        path:'*',
        redirect:'/dash'
    }
];

const RouterConfig = {
    // 使用h5的history路由模式,如果不配置就会使用'#'来设置路由。
    // 开启history路由，生产环境时服务器必须进行配置，将所有路由都指向同一个html，或者设置404页面为该html，否则刷新时页面会出现404
    mode: 'history',
    routes: Routers
};

const router = new VueRouter(RouterConfig);

// vue-router的导航钩子 beforeEach 和 afterEach ，表示在路由即将改变前和改变后触发
/**
 * to 即将要进入的目标的路有对象
 * from 当前导航即将要离开的路有对象
 * next 调用该方法后，才能进入下一个钩子
 */
// router.beforeEach((to, from, next)=>{
//     // 实际业务1：修改每个页面的title，便于后期维护
//     // window.document.title = to.meta.title;
//     // next();
//
//     // 实际业务2：页面登录校验
//     // if('判断登录状态成功'){
//     //     next();
//     // }else{
//     //     next('/login');
//     // }
// });

// router.afterEach((to, from, next)=>{
//     // 实际业务1：比如一个页面较长，当滚动到某个位置，再跳转到另一个页面，滚动条默认是在上个页面停留的位置，这样做可以提升用户体验
//     // window.scrollTo(0,0);
//
//     // 实际业务2：从一个页面过渡到另一个页面，出现全局Loading动画，新页面加载完成后再结束动画
// });

export default router;
