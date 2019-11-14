<template>
    <div>
        <q-bar>
          <q-icon name="laptop_chromebook" />
          <div>{{ticker}} Income Statements</div>
          <q-space />
          <q-btn dense flat icon="minimize" />
          <q-btn dense flat :to="`/equity/${ticker}`" icon="open_in_new" />
          <q-btn dense flat icon="close" />
        </q-bar>
        <div class="row">
            <cell label="Count" :value="equity.incomeStmts.length | fmt_n2d" />
            <plotly id="123" :traces="traces" :layout="layout" style="width: 100%; height: 800px"/>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import Cell from 'components/elements/Cell'
import Plotly from 'components/elements/Plotly'

export default {
  name: 'equityIncomeChart',
  props: {
    ticker: { type: String },
    period: { type: String, default: 'QUARTER' }
  },
  components: { Cell, Plotly },
  apollo: {
    equity: {
      query: gql`
        query EquityIncomeStatements($ticker: String!, $period: Period!) {
          equity(ticker: $ticker) { 
            incomeStmts(period: $period) {
              date
              revenue
            }
          }
        }
      `,
      variables () {
        return {
          ticker: this.ticker,
          period: this.period
        }
      }
    }
  },
  computed: {
    traces: vm => [
      {
        name: 'Revenue',
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.revenue),
        line: {
          color: '#5e9e7e',
          width: 4,
          shape: 'line'
        }
      }
    ],
    layout: vm => ({
      title: `${vm.ticker} - Income Statement`,
      autosize: true,
      margin: { t: 80, b: 80 },
      showlegend: true,
      // legend: { bgcolor: 'hsl(130,10%,20%)' },
      yaxis: { title: { text: 'Quarterly Revenue' }, color: 'hsl(130,10%,80%)' },
      xaxis: { title: { text: 'Reporting Date' }, color: 'hsl(130,10%,80%)' },
      font: { color: 'hsl(130,10%,80%)' },
      plot_bgcolor: 'hsl(130,10%,20%)',
      paper_bgcolor: 'hsl(130,10%,17%)'
    })
  },
  data () {
    return {
      equity: { incomeStmts: [] }
    }
  }
}
</script>
