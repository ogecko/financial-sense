<template>
  <div>
    <q-bar>
      <q-icon name="equalizer" />
      <div>{{name}} Color Chart</div>
      <q-space />
      <q-btn dense flat icon="close" />
    </q-bar>
    <plotly id="123" :traces="traces" :layout="layout" style="height: 65vh;" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Plotly from 'components/elements/Plotly'
import { layoutColors } from './colorCalcs'

export default {
  name: 'colorChart',
  props: {
    name: { type: String }
  },
  components: { Plotly },
  apollo: {
    colors: {
      query: gql`
        query findColor($needle: String!, $limit: Float) {
          findColor(needle: $needle, limit: $limit) {
            name
            hex
            J
            Q
            M
            h
            C
            s
          }
        }
      `,
      variables () {
        return {
          needle: this.name,
          limit: 300
        }
      },
      update: data => layoutColors(data.findColor)
    }
  },
  computed: {
    traces: vm => [
      {
        name: 'Colors',
        type: 'scatter',
        mode: 'markers+text',
        textposition: 'center',
        id: vm.colors.map(c => c.hex),
        marker: {
          size: 70, // vm.colors.map(c => c.M),
          color: vm.colors.map(c => c.hex)
        },
        text: vm.colors.map(c => c.name),
        x: vm.colors.map(c => c.x),
        y: vm.colors.map(c => c.y)
      }
    ],
    layout: vm => ({
      // title: `${vm.ticker} - Income Statement`,
      autosize: true,
      margin: { t: 25, b: 80, r: 25 },
      showlegend: true,
      legend: { traceorder: 'reversed', bgcolor: 'hsl(130,10%,20%)' },
      yaxis: {
        title: { text: 'J Lightless' },
        color: 'hsl(130,10%,80%)'
      },
      xaxis: {
        title: { text: 'M Colorfulness' },
        color: 'hsl(130,10%,80%)'
      },
      font: { color: 'hsl(130,10%,80%)' },
      plot_bgcolor: 'hsl(130,10%,20%)',
      paper_bgcolor: 'hsl(130,10%,17%)',
      colorway: vm.colors
    })
  },
  data () {
    return {
      colors: []
    }
  }
}
</script>
