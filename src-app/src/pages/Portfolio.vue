<template>
  <div class="q-pa-xs bg-blue-grey-10 text-white">
    <div class="row q-col-gutter-xs">
      <div v-for="ticker in tickers" :key="ticker" class="col-3">
        <div class="bg-blue-grey-9 q-pa-sm full-height">
          <equitySummary :ticker="ticker" />
        </div>
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
      tickers: ['AFL', 'MAC', 'BMRN', 'CBS', 'BIDU', 'EXPE', 'HBI', 'LB', 'MAT', 'OI', 'EPD', 'MPLX', 'TTM', 'ADNT', 'TEN', 'DLPH', 'ALB', 'SQM', 'BUD', 'UBER', 'LTHM']
    }
  }
}
</script>
