# 50行代码模拟一个vue 路由
### 栈式处理，前进刷新，后退不刷新

>[demo地址](https://github.com/Jackjianglin/vue-pop-router)

## 1.骨架
>首先路由组件是一个函数对象，能接受路由配置，拥有一个存储旧页面的栈，拥有push, back方法，前进后退，拥有一个渲染视图的组件，并且挂载在vue 原型链上，方便调用
```JavaScript
// routers 路由配置
function VuePopRouter({ routers }) {

    // 存储旧页面的栈
    const stackInfo = []

    // router 的根组件
    const view = {
        render(h) {
            return h('div', {}, stackInfo)
        },
    }
    // 加入新页面
    this.push = (name, params) => {
        const findRouter = routers.find(res => res.name === name);
        if (!findRouter) return;

        const router = { ...findRouter }
        router.params = params

        stackInfo.push(router);
    }
    // 页码回退
    this.back = () => {
        if (stackInfo.pages.length <= 0) return;
        stackInfo.pages.splice(-1, 1);
    }

    // 挂载Vue 原型链上，方便调用
    Vue.prototype.$router = this;
    // 生成全局组件，在App.vue 页面内调用，注册路由入口
    Vue.component('RouterView', view)
}
```

## 完善

```JavaScript
function VuePopRouter({ routers }) {
    // 存放路由数据，响应式对象驱动视图渲染
    const stackInfo = Vue.observable({
        pages: [],
    });

    // router 的根组件
    const view = {
        render(h) {
            // 将页面栈中的配置，渲染成对应视图，在页面的视图上添加一层，加入相应css，让其看起来像一个页面，再加入一点点动画
            const pages = stackInfo.pages.map((res, index) => {
                // 路由中所有的页面都是fixed 定位，后加入的页面层级高
                const instanceComponent = h('div', {
                    class: 'pop-in router-page',
                    style: {
                        zIndex: index
                    }
                    // res.instance 通过import 得到的页面配置，params 页面参数
                }, [h(res.instance, { props: { ...res.params } })]);
                // instanceComponent 生成的组件实例
                res.instanceComponent = instanceComponent;
                return instanceComponent
            })
            // 渲染所有页面
            return h('div', {}, pages)
        },
    }
    // 进入新页面
    this.push = (name, params) => {
        // 找到对应路由配置
        const findRouter = routers.find(res => res.name === name);
        if (!findRouter) return;
        const router = { ...findRouter }


        // 因为路由配置中，是通过 import('./components/home.vue') 形式去引入组件的，所有需要then 一下
        router.page.then(res => {
            router.instance = res.default;
            router.params = params

            // 页面栈中加入新页面
            stackInfo.pages.push(router);
        })

    }
    // 页面回退
    this.back = () => {
        if (stackInfo.pages.length <= 0) return;

        // 拿到将要删除页面的dom 实例，添加退出动画
        const lastEl = stackInfo.pages[stackInfo.pages.length - 1].instanceComponent.elm;
        lastEl.classList.remove('pop-in');
        lastEl.classList.add('pop-out')

        // 等待页面退出动画结束后，页面栈删除最后一页数据
        const onWebkitAnimationEnd = () => {
            lastEl.removeEventListener('webkitAnimationEnd', onWebkitAnimationEnd)
            stackInfo.pages.splice(-1, 1);
        }
        lastEl.addEventListener("webkitAnimationEnd", onWebkitAnimationEnd);
    }
    Vue.prototype.$router = this;
    // 生成全局组件，在App.vue 页面内调用，注册路由入口
    Vue.component('RouterView', view)
}
```
> 去除掉注释和简单样式的的VuePopRouter 代码，大约不到50行

## 预览