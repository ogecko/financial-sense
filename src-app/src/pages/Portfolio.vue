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
      tickers: ['AFL', 'ALB', 'BIDU', 'BMRN', 'CBS', 'COF', 'DLPH', 'EPD', 'EXPE', 'MAT', 'TTM', 'OI']
    }
  }
}
</script>
