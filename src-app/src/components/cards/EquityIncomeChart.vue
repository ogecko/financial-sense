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
            <plotly :chart="chart" />
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
    chart: vm => ({
      uuid: '123',
      traces: [
        {
          y: vm.equity.incomeStmts.map(is => is.revenue),
          line: {
            color: '#5e9e7e',
            width: 4,
            shape: 'line'
          }
        }
      ],
      layout: {
        autosize: true,
        margin: { t: 30, b: 30 }
      }
    })
  },
  data () {
    return {
      equity: { incomeStmts: [] }
    }
  }
}
</script>
