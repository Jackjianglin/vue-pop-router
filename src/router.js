import Vue from 'vue';
import './assets/main.css'
function VuePopRouter({ routers }) {
    const stackInfo = Vue.observable({
        pages: [],
    });
    const view = {
        render(h) {
            const pages = stackInfo.pages.map((res, index) => {
                const instanceComponent = h('div', {
                    class: 'pop-in router-page',
                    style: {
                        zIndex: index
                    }
                }, [h(res.instance, { props: { ...res.params } })]);
                res.instanceComponent = instanceComponent;
                return instanceComponent
            })
            return h('div', {}, pages)
        },
    }
    this.push = (name, params) => {
        const findRouter = routers.find(res => res.name === name);
        if (!findRouter) return;
        const router = { ...findRouter }
        router.page.then(res => {
            router.instance = res.default;
            router.params = params
            stackInfo.pages.push(router);
        })

    }
    this.back = () => {
        if (stackInfo.pages.length <= 0) return;
        const lastEl = stackInfo.pages[stackInfo.pages.length - 1].instanceComponent.elm;
        lastEl.classList.remove('pop-in');
        lastEl.classList.add('pop-out')

        const onWebkitAnimationEnd = () => {
            lastEl.removeEventListener('webkitAnimationEnd', onWebkitAnimationEnd)
            stackInfo.pages.splice(-1, 1);
        }
        lastEl.addEventListener("webkitAnimationEnd", onWebkitAnimationEnd);
    }
    Vue.prototype.$router = this;
    Vue.component('RouterView', view)
}
export default VuePopRouter;
