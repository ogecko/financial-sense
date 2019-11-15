<template>
  <div class="q-pa-xs">
    <div class="row q-col-gutter-xs">
      <div class="col-12">
        <div class="bg-blue-grey-9 q-pa-sm">
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
      <div class="col-9">
        <equityIncomeChart :ticker="$route.params.ticker" class="bg-blue-grey-9 q-pa-sm full-height" />
      </div>
      <div class="col-3">
        <equitySummary :ticker="$route.params.ticker" class="bg-blue-grey-9 q-pa-sm full-height" />
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
