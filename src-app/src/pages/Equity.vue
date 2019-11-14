<template>
  <div class="q-pa-sm bg-indigo-1 text-white">
    <div class="row">
      <div class="col-12 bg-grey-8 q-pa-xs">
        <q-bar>
          <q-icon name="laptop_chromebook" />
          <div>Tenneco Automotive</div>
          <q-space />
          <q-btn dense flat icon="minimize" />
          <q-btn dense flat icon="crop_square" />
          <q-btn dense flat icon="close" />
        </q-bar>
        <p>Tenneco Automotive</p>
      </div>
    </div>
    <div class="row">
      <div class="col-9 bg-teal-10 q-pa-sm">
        <equityIncomeChart :ticker="$route.params.ticker" />
      </div>
      <div class="col-3 bg-blue-grey-8 q-pa-sm">
        <equitySummary :ticker="$route.params.ticker" />
      </div>
    </div>
  </div>
</template>

<script>
import EquitySummary from 'components/cards/EquitySummary'
import EquityIncomeChart from 'components/cards/EquityIncomeChart'

export default {
  name: 'equity',
  components: { EquitySummary, EquityIncomeChart },

  filters: {
    fmt_usd: v => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD' }).format(v),
    fmt_ncs: v => new Intl.NumberFormat('en-GB', { notation: 'compact', compactDisplay: 'short' }).format(v),
    fmt_n2d: v => new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(v)
  }
}
</script>
