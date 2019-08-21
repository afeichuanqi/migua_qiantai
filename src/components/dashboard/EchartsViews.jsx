/**
 * Created by hao.cheng on 2017/5/5.
 */
import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';


export default class EchartsViews extends PureComponent {
    option = {
        title: {
            text: '最近7天用户播放量',
            left: '50%',
            show: false,
            textAlign: 'center',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#ddd',
                },
            },
            backgroundColor: 'rgba(255,255,255,1)',
            padding: [5, 10],
            textStyle: {
                color: '#7588E4',
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
        },
        legend: {
            right: 20,
            orient: 'vertical',
        },
        xAxis: {
            type: 'category',
            data: ['2019-08-16', '2019-08-17', '2019-08-18', '2019-08-19', '2019-08-20', '2019-08-21', '2019-08-22'],
            boundaryGap: false,
            splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                    color: ['#D4DFF5'],
                },
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#609ee9',
                },
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 10,
                },
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: ['#D4DFF5'],
                },
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#609ee9',
                },
            },
            axisLabel: {
                margin: 0,
                textStyle: {
                    fontSize: 8,
                },
            },
        },
        series: [{
            name: '昨日',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: ['420', '149', '51', '2', '0', '2', '1'],
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(216, 244, 247,1)',
                    }, {
                        offset: 1,
                        color: 'rgba(216, 244, 247,1)',
                    }], false),
                },
            },
            itemStyle: {
                normal: {
                    color: '#58c8da',
                },
            },
            lineStyle: {
                normal: {
                    width: 3,
                },
            },
        }],
    };

    render() {
        const { day7xAxisData, day7seriesData } = this.props;
        if (day7xAxisData.length == 0 || day7seriesData.length == 0) {
            return null;
        }
        this.option.xAxis.data = day7xAxisData;
        this.option.series.data = day7seriesData;
        console.log(this.option.xAxis.data, 'this.option.xAxis.data1');
        console.log(day7xAxisData, 'this.option.xAxis.data2');
        return <ReactEcharts
            option={this.option}
            style={{ height: '350px', width: '100%' }}
            className={'react_for_echarts'}
        />;
    }

}

