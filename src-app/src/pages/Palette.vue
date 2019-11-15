<template>
  <div class="q-pa-xs bg-blue-grey-10 text-white">
    <div class="row q-col-gutter-xs">
      <div v-for="color in palette1" :key="color" class="col-1">
        <div class="q-pa-sm" :style="{ background: color, height: '60px' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'palette',
  data () {
    return {
      palette1: this.$color.blindnessPalette,
      palette2: this.$color.defaultPalette
    }
  }
}
</script>
