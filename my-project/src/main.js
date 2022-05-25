import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant'
import {Locale} from 'vant'
import 'vant/lib/index.css';
import zhTW from 'vant/es/locale/lang/zh-TW';


// createApp(App).use(store).use(router).mount('#app');
// App.use(Vant)

const app = createApp(App)
app.use(router)
app.use(store)
Locale.use('zh-TW', zhTW);
app.use(Vant)
app.mount('#app')
