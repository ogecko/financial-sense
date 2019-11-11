<template>
  <div>
    <h1>Home</h1>
    <picker
      @input="equityChange"
    />
  </div>
</template>

<script>
import picker from 'components/Picker'

export default {
  name: 'home',
  components: { picker },
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
