<template>
    <q-card-section>
        <div class="row q-col-gutter-xs">
          <div class="col-1">
            <p class="text-caption" :style="{ color: basecolor.textColors[5] }">{{label}}</p>
          </div>
          <div v-for="c in colors" :key="c.hex" @click="$emit('change',c.hex)" class="col-1 ">
              <div
              class="q-pa-xs shadow-1 text-weight-light"
              style="font-size: 0.65rem; height: 2.4rem; overflow: hidden; line-height: 1.2"
              :class="{ 'inset-shadow': (c.hex===basecolor.hex) }"
              :style="{ background: c.hex, color: c.textColors[0] }">
              {{c.name}}
              </div>
          </div>
        </div>
    </q-card-section>
</template>

<script>

export default {
  name: 'ColorPaletteSection',
  props: {
    label: { type: String },
    basecolor: { type: Object },
    colors: { type: Array }
  }
}
</script>
