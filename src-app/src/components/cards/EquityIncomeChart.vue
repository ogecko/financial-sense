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
            <cell label="Date" v-for="is in equity.incomeStmts" :key="is.date" :value="is.date" />
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import Cell from 'components/elements/Cell'

export default {
  name: 'equityIncomeChart',
  props: {
    ticker: { type: String },
    period: { type: String, default: 'QUARTER' }
  },
  components: { Cell },
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
  data () {
    return {
      equity: { incomeStmts: [] }
    }
  }
}
</script>
