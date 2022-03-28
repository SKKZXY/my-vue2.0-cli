<template>
  <div class="family-trend">
    <div class="trend-title">
        <div class="title-left">
          <div class="dot"></div>
          <span>保费走势</span>
        </div>
    </div>
    <div>
        <div id="chartLineBox" style="width: 100%;height: 300px;"> </div>
    </div>
  </div>
</template>

<script>
// import echarts from 'echarts'
// echarts相关
let echarts = require('echarts/lib/echarts')
// require('echarts/lib/chart/bar')
require('echarts/lib/component/title')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')
require('echarts/lib/component/legend')
require('echarts/lib/chart/line')
export default {
  data () {
    return {
      chartLine: '',
      option: {
        color: ['red', 'blue'],
        legend: {
          data: ['喜羊羊', '灰太狼'],
          bottom: 0,
          left: 'center',
          icon: 'roundRect',
          itemHeight: 5,
          textStyle: {
            height: 8,
            rich: {
              a: {
                verticalAlign: 'bottom'
              }
            }
          }
        },
        xAxis: {
          type: 'category', // 还有其他的type，可以去官网喵两眼哦
          data: ['22/01', '22/02', '22/03', '22/04', '22/05', '22/06', '22/07', '22/08', '22/09', '22/10', '22/11', '22/12'], // x轴数据
          // name: '日期',   // x轴名称
          // x轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          },
          axisLabel: {
            interval: 1
          },
          axisTick: { // 刻度线
            inside: true, // 朝里
            interval: 0,
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              type: 'dashed',
              color: '#999',
              opacity: '0.3'
            }
          },
          boundaryGap: true
        },
        yAxis: {
          type: 'value',
          //   name: '纵轴名称',   // y轴名称
          // y轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          triggerOn: 'mousemove'
        },
        series: [
          {
            name: '喜羊羊',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          },
          {
            name: '灰太狼',
            data: [620, 711, 823, 934, 1445, 1456, 1178],
            type: 'line'
          }
        ]
      }
    }
  },
  mounted () {
    console.log('chartlinebox', document.getElementById('chartLineBox'))
    this.chartLine = echarts.init(document.getElementById('chartLineBox'))
    // 使用刚指定的配置项和数据显示图表。
    this.chartLine.setOption(this.option)
    setTimeout(() => {
      this.chartLine.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: 1
      })
    }, 500)
  }
}
</script>

<style lang="scss">
.family-trend {
  padding: 15px 20px;
  border-radius: 15px;
  background-color: #fff;
  margin-bottom: 10px;
  .trend-title {
    position: relative;
  }
  .title-left {
    display: flex;
    align-items: center;
    .dot {
        width: 4px;
        height: 14px;
        border-radius: 100px;
        background: #14C3B4;
        margin-right: 7px;
    }
    span {
        color: #333333;
        font-size: 17px;
        font-weight: bold;
    }
  }
}
</style>
