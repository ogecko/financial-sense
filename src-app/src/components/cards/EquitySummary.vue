<template>
    <div>
        <q-bar>
          <q-icon name="laptop_chromebook" />
          <div>{{ticker}} Summary</div>
          <q-space />
          <q-btn dense flat icon="minimize" />
          <q-btn dense flat :to="`/equity/${ticker}`" icon="open_in_new" />
          <q-btn dense flat icon="close" />
        </q-bar>
        <div class="row">
          <div class="col-4 q-py-sm">
            <q-img :src="equity.profile.image" :ratio="1" contain class="bg-white"/>
          </div>
          <div class="col-8 q-pl-sm text-grey-4 text-caption">
            <cell :value="equity.profile.description" />
          </div>
        </div>
        <q-separator color="grey-8"/>
        <cell label="Exchange" :value="equity.profile.exchange" />
        <cell label="Sector" :value="equity.profile.sector" />
        <cell label="Industry" :value="equity.profile.industry" />
        <cell label="CEO" :value="equity.profile.ceo" />
        <q-separator color="grey-8"/>
        <cell label="Market Cap" :value="equity.profile.marketCap | fmt_ncs" />
        <cell label="Average Volume" :value="equity.profile.volumeAvg | fmt_ncs" />
        <cell label="Price" :value="equity.profile.price | fmt_n2d" />
        <cell label="Last Dividend" :value="equity.profile.lastDividend | fmt_n2d" />
        <cell label="Beta" :value="equity.profile.beta | fmt_n2d" />
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
    equity: {
      query: gql`
        query EquityProfile($ticker: String!) {
          equity(ticker: $ticker) { 
            profile {
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
      equity: { profile: {} }
    }
  },
  filters: {
    fmt_usd: v => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD' }).format(v),
    fmt_ncs: v => new Intl.NumberFormat('en-GB', { notation: 'compact', compactDisplay: 'short' }).format(v),
    fmt_n2d: v => new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(v)
  }
}
</script>
