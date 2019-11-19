<template>
  <div>
    <h1>Home</h1>
    <EquityPicker
      @input="equityChange"
    />
  </div>
</template>

<script>
import EquityPicker from 'components/pickers/EquityPicker'

export default {
  name: 'home',
  components: { EquityPicker },
  methods: {
    equityChange (ticker) {
      this.$router.push(`/equity/${ticker}`)
    }
  },
  data () {
    return {
    }
  }
}
</script>
