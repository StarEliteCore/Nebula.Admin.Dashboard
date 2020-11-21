import Vue from 'vue'
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack
import theme from './macarons' // theme

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';

import 'echarts/lib/component/grid';
import 'echarts/lib/component/polar';
import 'echarts/lib/component/singleAxis';

import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markArea';
import 'echarts/lib/component/timeline';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/brush';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/toolbox';

// If you want to use ECharts extensions, just import the extension package, and it will work
// Taking ECharts-GL as an example:
// You only need to install the package with `npm install --save echarts-gl` and import it as follows
// import 'echarts-gl'
//ECharts
// register component to use

ECharts.registerTheme('macarons', theme);

Vue.component('v-chart', ECharts);