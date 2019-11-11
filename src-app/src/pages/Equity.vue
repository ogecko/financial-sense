<template>
  <div class="q-pa-sm bg-indigo-1 text-white">
    <div class="row">
      <div class="col-12 bg-indigo-4 q-pa-xs">
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
      <div class="col-9 bg-indigo-2 q-pa-xs">
        <q-bar>
          <q-icon name="laptop_chromebook" />
          <div>Historical Price Graph</div>
          <q-space />
          <q-btn dense flat icon="minimize" />
          <q-btn dense flat icon="crop_square" />
          <q-btn dense flat icon="open_in_new" />
        </q-bar>
        <h3>Chart</h3>
      </div>
      <div class="col-3 bg-blue-grey-9 q-pa-sm">
        <q-bar>
          <q-icon name="laptop_chromebook" />
          <div>Summary</div>
          <q-space />
          <q-btn dense flat icon="minimize" />
          <q-btn dense flat icon="crop_square" />
          <q-btn dense flat icon="close" />
        </q-bar>
        <div class="row">
          <div class="col-4">
            <q-img :src="equityProfile.image" />
          </div>
          <div class="col-8 q-pl-sm text-grey-4 text-caption">
            <cell :value="equityProfile.description" />
          </div>
        </div>
        <cell label="Exchange" :value="equityProfile.exchange" />
        <cell label="Sector" :value="equityProfile.sector" />
        <cell label="Industry" :value="equityProfile.industry" />
        <cell label="CEO" :value="equityProfile.ceo" />
        <cell label="Market Cap" :value="equityProfile.marketCap | fmt_ncs" />
        <cell label="Average Volume" :value="equityProfile.volumeAvg | fmt_ncs" />
        <cell label="Price" :value="equityProfile.price" />
        <cell label="Beta" :value="equityProfile.beta" />
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import cell from 'components/Cell'

export default {
  name: 'equity',
  components: { cell },
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
          ticker: this.$route.params.ticker
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
    fmt_ncs: v =>
      new Intl.NumberFormat(
        'en-GB',
        { notation: 'compact', compactDisplay: 'short' }).format(v)
  }
}
</script>
