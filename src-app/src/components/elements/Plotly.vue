<template>
  <div :ref="chart.uuid" style="width:100%; height:100%;" />
</template>

<script>
const Plotly = require('plotly.js-dist')

export default {
  name: 'plotly',
  props: ['chart'],
  mounted () {
    Plotly.plot(this.$refs[this.chart.uuid], this.chart.traces, this.chart.layout)
  },
  watch: {
    chart: {
      handler: function () {
        Plotly.react(
          this.$refs[this.chart.uuid],
          this.chart.traces,
          this.chart.layout
        )
      },
      deep: true
    }
  }
}

</script>
