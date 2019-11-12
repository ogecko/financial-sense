<template>
  <div>
    <h1>Home</h1>
    <picker
      @input="equityChange"
    />
  </div>
</template>

<script>
import Picker from 'components/Picker'

export default {
  name: 'home',
  components: { Picker },
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
