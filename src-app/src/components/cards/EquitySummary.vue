<template>
    <div>
        <q-bar>
          <q-icon name="laptop_chromebook" />
          <div>Summary</div>
          <q-space />
          <q-btn dense flat icon="minimize" />
          <q-btn dense flat icon="crop_square" />
          <q-btn dense flat icon="close" />
        </q-bar>
        <div class="row">
          <div class="col-4 q-py-sm">
            <q-img :src="equityProfile.image" :ratio="1" contain class="bg-white"/>
          </div>
          <div class="col-8 q-pl-sm text-grey-4 text-caption">
            <cell :value="equityProfile.description" />
          </div>
        </div>
        <q-separator color="grey-8"/>
        <cell label="Exchange" :value="equityProfile.exchange" />
        <cell label="Sector" :value="equityProfile.sector" />
        <cell label="Industry" :value="equityProfile.industry" />
        <cell label="CEO" :value="equityProfile.ceo" />
        <q-separator color="grey-8"/>
        <cell label="Market Cap" :value="equityProfile.marketCap | fmt_ncs" />
        <cell label="Average Volume" :value="equityProfile.volumeAvg | fmt_ncs" />
        <cell label="Price" :value="equityProfile.price | fmt_n2d" />
        <cell label="Last Dividend" :value="equityProfile.lastDividend | fmt_n2d" />
        <cell label="Beta" :value="equityProfile.beta | fmt_n2d" />
    </div>
</template>

<script>
import gql from 'graphql-tag'
import Cell from 'components/elements/Cell'

export default {
  name: 'equitySummary',
  components: { Cell },
  props: {
    ticker: { type: String }
  },
  apollo: {
    equityProfile: {
      query: gql`
        query EquityProfile($ticker: String!) {
          equityProfile(ticker: $ticker) {
            name
            description
            exchange
            industry
            sector
            image
            ceo
            website
            marketCap
            price
            beta
            volumeAvg
            lastDividend
          }
        }
      `,
      variables () {
        return {
          ticker: this.ticker
        }
      }
    }
  },
  data () {
    return {
      equityProfile: null
    }
  },
  filters: {
    fmt_usd: v => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD' }).format(v),
    fmt_ncs: v => new Intl.NumberFormat('en-GB', { notation: 'compact', compactDisplay: 'short' }).format(v),
    fmt_n2d: v => new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(v)
  }
}
</script>
