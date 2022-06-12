<template>
  <div>
    <div class="c-date-inputs__container">
      <label>Start date</label>
      <input type="date" v-model="startDate" />
      <label>End date</label>
      <input type="date" v-model="endDate" />
      <button type="button" class="c-button" v-on:click="filterChartDate">Filter</button>
    </div>
    <div class="c-chart__container">
      <v-chart ref="chart" :option="chartOptions" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import PerformanceService from "../../services/performance.service";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
]);

export default {
  name: "PerformanceChartComponent",

  components: {
    VChart,
  },

  data() {
    return {
      chartData: [],
      originalChartData: [],
      startDate: "",
      endDate: "",
    };
  },

  computed: {
    initOptions() {
      return {
        width: "auto",
        height: "300px",
      };
    },

    chartOptions() {
      return {
        title: {
          text: "Team Performance Index",
          left: "center",
        },
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 0,
        },
        grid: {
          left: "30px",
          right: "12px",
          bottom: "2px",
          top: "6px",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          showGrid: false,
          data: this.xAxisData,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true },
        },
        series: [
          {
            name: "Team Performance Index",
            data: this.yAxisData,
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            cursor: "default",
            lineStyle: {
              width: 2,
            },
          },
        ],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "#F4674C"
            },
            {
              gt: 50,
              lte: 80,
              color: "#FBDB10"
            },
            {
              gt: 80,
              lte: 100,
              color: "#01984F"
            },
          ],
        },
        tooltip: {
          trigger: "axis",
          formatter: "<b>{b}</b><br/>{a}: {c}%",
          backgroundColor: "#16253F",
          textStyle: {
            color: "#fff",
          },
          extraCssText: "text-align: center"
        },
      };
    },

    xAxisData() {
      return this.chartData.map((item) => this.formatDate(item.date_ms));
    },

    yAxisData() {
      return this.chartData.map((item) => +item.performance * 100);
    },
  },

  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    },
    filterChartDate() {
      const start = moment(this.startDate);
      const end = moment(this.endDate);
      this.chartData = this.originalChartData.filter(data => moment(data.date_ms).startOf("day").diff(start, "days") >= 0 && moment(data.date_ms).startOf("day").diff(end, "days") <= 0);
    },
  },

  mounted() {
    PerformanceService.getPerformance().then((data) => this.originalChartData = this.chartData = data);
  }
};
</script>
