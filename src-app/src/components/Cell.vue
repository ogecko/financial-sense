<template>
  <div class="q-pb-xs">
      <span class="text-grey-6">
        {{label}}
      </span>
      <span class="float-right">
       {{value}}
      </span>
  </div>
</template>

<script>

export default {
  name: 'cell',
  props: {
    label: { type: String },
    value: { type: String }
  },
  data () {
    return {
    }
  }
}
</script>
