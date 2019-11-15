<template>
  <div>
    <q-bar>
      <q-icon name='equalizer' />
      <div>{{ticker}} Income Statements</div>
      <q-space />
      <q-btn dense flat @click="span='QUARTER'" :color="span=='QUARTER'||'grey-7'" icon='calendar_today'>1Q</q-btn>
      <q-btn dense flat @click="span='ANNUAL'" :color="span=='ANNUAL'||'grey-7'" icon='calendar_today'>1Y</q-btn>
      <q-btn dense flat :to='`/equity/${ticker}`' icon='open_in_new' />
      <q-btn dense flat icon='close' />
    </q-bar>
    <plotly id='123' :traces='traces' :layout='layout' style="height: 80vh;"/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
// import Cell from 'components/elements/Cell'
import Plotly from 'components/elements/Plotly'

export default {
  name: 'equityIncomeChart',
  props: {
    ticker: { type: String },
    period: { type: String, default: 'QUARTER' }
  },
  components: { Plotly },
  apollo: {
    equity: {
      query: gql`
        query EquityIncomeStatements($ticker: String!, $period: Period!) {
          equity(ticker: $ticker) {
            incomeStmts(period: $period) {
              date
              revenue
              costOfRevenue
              SGAExpenses
              RDExpenses
              DAExpenses
              otherExpenses
              operatingExpenses
              interestExpense
              incomeTaxExpense
              netIncome
              grossProfit
              EBITDA
              EBIT
            }
          }
        }
      `,
      variables () {
        return {
          ticker: this.ticker,
          period: this.span
        }
      }
    }
  },
  computed: {
    traces: vm => [
      {
        name: 'Net Income',
        type: 'scatter',
        stackgroup: 'a',
        line: { shape: 'hvh' },
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.netIncome)
      },
      {
        name: '  Income Tax Expense',
        type: 'scatter',
        line: { shape: 'hvh' },
        stackgroup: 'a',
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.incomeTaxExpense)
      },
      {
        name: '  Interest Expense',
        type: 'scatter',
        line: { shape: 'hvh' },
        stackgroup: 'a',
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.interestExpense)
      },
      {
        name: 'EBIT',
        type: 'scatter',
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.EBIT),
        line: {
          width: 4,
          shape: 'line'
        }
      },
      {
        name: 'EBITDA',
        type: 'scatter',
        visible: 'legendonly',
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.EBITDA),
        line: {
          width: 4,
          shape: 'line'
        }
      },
      {
        name: '    Other Expenses',
        type: 'scatter',
        visible: 'legendonly',
        // legendgroup: 'opex',
        stackgroup: 'a',
        line: { shape: 'hvh' },
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.otherExpenses)
      },
      {
        name: '    Depreciation & Amortization',
        type: 'scatter',
        visible: 'legendonly',
        legendgroup: 'opex',
        stackgroup: 'a',
        line: { shape: 'hvh' },
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.DAExpenses)
      },
      {
        name: '    R&D Expenses',
        type: 'scatter',
        visible: 'legendonly',
        legendgroup: 'opex',
        stackgroup: 'a',
        line: { shape: 'hvh' },
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.RDExpenses)
      },
      {
        name: '    SG&A Expenses',
        type: 'scatter',
        visible: 'legendonly',
        legendgroup: 'opex',
        stackgroup: 'a',
        line: { shape: 'hvh' },
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.SGAExpenses)
      },
      {
        name: '  Operating Expenses',
        type: 'scatter',
        stackgroup: 'a',
        line: { shape: 'hvh' },
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.operatingExpenses)
      },
      {
        name: 'Gross Profit',
        type: 'scatter',
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.grossProfit),
        line: {
          width: 4,
          shape: 'line'
        }
      },
      {
        name: '  Cost of Revenue',
        type: 'scatter',
        stackgroup: 'a',
        line: { shape: 'hvh' },
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.costOfRevenue)
      },
      {
        name: 'Revenue',
        type: 'scatter',
        mode: 'lines+markers',
        line: { shape: 'line', width: 4 },
        marker: { symbol: 'circle', size: 8 },
        x: vm.equity.incomeStmts.map(is => is.date),
        y: vm.equity.incomeStmts.map(is => is.revenue)
      }
    ],
    layout: vm => ({
      // title: `${vm.ticker} - Income Statement`,
      autosize: true,
      margin: { t: 25, b: 80, r: 25 },
      showlegend: true,
      legend: { traceorder: 'reversed', bgcolor: 'hsl(130,10%,20%)' },
      yaxis: {
        title: { text: 'Quarterly Revenue' },
        color: 'hsl(130,10%,80%)'
      },
      xaxis: { title: { text: 'Reporting Date' }, color: 'hsl(130,10%,80%)' },
      font: { color: 'hsl(130,10%,80%)' },
      plot_bgcolor: 'hsl(130,10%,20%)',
      paper_bgcolor: 'hsl(130,10%,17%)',
      colorway: vm.$color.blindnessPalette
    })
  },
  data () {
    return {
      equity: { incomeStmts: [] },
      span: this.period
    }
  }
}
</script>
