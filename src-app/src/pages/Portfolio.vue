<template>
  <div class="q-pa-sm bg-indigo-1 text-white">
    <div class="row">
      <div v-for="ticker in tickers" :key="ticker" class="col-3 bg-blue-grey-8 q-pa-sm">
        <equitySummary :ticker="ticker" />
      </div>
    </div>
  </div>
</template>

<script>
import EquitySummary from 'components/cards/EquitySummary'

export default {
  name: 'portfolio',
  components: { EquitySummary },
  data () {
    return {
      tickers: ['ADNT', 'AFL', 'ALB', 'BIDU', 'BMRN', 'CBS', 'DLPH', 'EPD', 'EXPE', 'HBI', 'LB', 'LTHM', 'MAC', 'MAT', 'MPLX', 'OI', 'TEN', 'TTM', 'UBER']
    }
  }
}
</script>
