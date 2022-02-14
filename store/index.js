import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let user = {};

try {
    // 尝试获取本地是否存在user变量，第一次启动APP时是不存在的
    user = uni.getStorageSync('user');
} catch (e) {

}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['login', 'user', 'token', 'location', 'cart', 'checkout'];

// 保存变量到本地存储中
const saveuser = function(key, value) {
    switch(key) {
        case 'cart': 
            uni.setTabBarBadge({
                index: 2,
                text: value.master.num.toString() || ''
            })
        default:
    }
    // 判断变量名是否在需要存储的数组中
    if (saveStateKeys.indexOf(key) != -1) {
        // 获取本地存储的user对象，将变量添加到对象中
        let tmp = uni.getStorageSync('user');
        // 第一次打开APP，不存在user变量，故放一个{}空对象
        tmp = tmp ? tmp : {};
        tmp[key] = value;
        // 执行这一步后，所有需要存储的变量，都挂载在本地的user对象中
        uni.setStorageSync('user', tmp);
    }
}
const store = new Vuex.Store({
    state: {
        token: user.token ? user.token : '',
        login: user.login ? user.login : false,
        user: user.user ? user.user : {},
        cart: user.cart ? user.cart : {},
        checkout: user.checkout ? user.checkout : {},
        location: user.location ? user.location : { cityId: 110 },
    },
    mutations: {
        $uStore(state, payload) {
            // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
            let nameArr = payload.name.split('.');
            let saveKey = '';
            let len = nameArr.length;
            if (len >= 2) {
                let obj = state[nameArr[0]];
                for (let i = 1; i < len - 1; i++) {
                    obj = obj[nameArr[i]];
                }
                obj[nameArr[len - 1]] = payload.value;
                saveKey = nameArr[0];
            } else {
                // 单层级变量，在state就是一个普通变量的情况
                state[payload.name] = payload.value;
                saveKey = payload.name;
            }
            // 保存变量到本地，见顶部函数定义
            saveuser(saveKey, state[saveKey])
        }
    }
})

export default store