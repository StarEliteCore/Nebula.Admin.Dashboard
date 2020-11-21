import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "HomePage"
})
export default class HomePage extends Vue {
  private created() {

    this.barData = {
      title: {
        text: '每月访问量',
        subtext: '纯属虚构'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['蒸发量']
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '访问量',
          type: 'bar',
          data: [999, 1999, 7999, 5999, 3999, 8999, 2999, 6999, 3999, 4999, 5999, 9199],
          markPoint: {
            data: [
              { name: '年最高', value: 9199, xAxis: 11, yAxis: 9199 },
              { name: '年最低', value: 999, xAxis: 0, yAxis: 999 }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        }
      ]
    };



    this.pieData = {
      title: {
        text: '站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    this.$nextTick(() => { this.isChart = true; });
  };



  private barData: any = {};
  private pieData: any = {};
  private isChart: boolean = false;
}
