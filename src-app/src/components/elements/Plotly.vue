<template>
  <div :id='id'>
      <q-resize-observer @resize="onResize" />
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist'

const eventsName = [
  'AfterExport',
  'AfterPlot',
  'Animated',
  'AnimatingFrame',
  'AnimationInterrupted',
  'AutoSize',
  'BeforeExport',
  'ButtonClicked',
  'Click',
  'ClickAnnotation',
  'Deselect',
  'DoubleClick',
  'Framework',
  'Hover',
  'LegendClick',
  'LegendDoubleClick',
  'Relayout',
  'Restyle',
  'Redraw',
  'Selected',
  'Selecting',
  'SliderChange',
  'SliderEnd',
  'SliderStart',
  'Transitioning',
  'TransitionInterrupted',
  'Unhover'
]

const events = eventsName
  .map(evt => evt.toLowerCase())
  .map(eventName => ({
    completeName: 'plotly_' + eventName,
    handler: context => (...args) => {
      context.$emit(eventName, ...args)
    }
  }))

const plotlyFunctions = [
  'restyle',
  'relayout',
  'update',
  'addTraces',
  'deleteTraces',
  'moveTraces',
  'extendTraces',
  'prependTraces',
  'purge'
]

const methods = plotlyFunctions.reduce((all, functionName) => {
  all[functionName] = function (...args) {
    return Plotly[functionName](this.$el, ...args)
  }
  return all
}, {})

function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

const regex = /-(\w)/g
const camelize = cached(str =>
  str.replace(regex, (_, c) => (c ? c.toUpperCase() : ''))
)

export default {
  name: 'plotly',
  inheritAttrs: false,
  props: {
    traces: {
      type: Array
    },
    layout: {
      type: Object
    },
    id: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      scheduled: null,
      innerLayout: { ...this.layout }
    }
  },
  mounted () {
    Plotly.newPlot(this.$el, this.traces, this.innerLayout, this.options)
    events.forEach(evt => {
      this.$el.on(evt.completeName, evt.handler(this))
    })
  },
  watch: {
    traces: {
      handler () {
        this.schedule({ replot: true })
      },
      deep: true
    },
    options: {
      handler (value, old) {
        if (JSON.stringify(value) === JSON.stringify(old)) {
          return
        }
        this.schedule({ replot: true })
      },
      deep: true
    },
    layout (layout) {
      this.innerLayout = { ...layout }
      this.schedule({ replot: false })
    }
  },
  computed: {
    options () {
      const optionsFromAttrs = Object.keys(this.$attrs).reduce((acc, key) => {
        acc[camelize(key)] = this.$attrs[key]
        return acc
      }, {})

      return Object.assign(optionsFromAttrs, { responsive: false })
    }
  },
  beforeDestroy () {
    events.forEach(event => this.$el.removeAllListeners(event.completeName))
    Plotly.purge(this.$el)
  },
  methods: {
    ...methods,
    onResize () {
      Plotly.Plots.resize(this.$el)
    },
    schedule (context) {
      const { scheduled } = this
      if (scheduled) {
        scheduled.replot = scheduled.replot || context.replot
        return
      }
      this.scheduled = context
      this.$nextTick(() => {
        const {
          scheduled: { replot }
        } = this
        this.scheduled = null
        if (replot) {
          this.react()
          return
        }
        this.relayout(this.innerLayout)
      })
    },
    toImage (options) {
      const allOptions = Object.assign(this.getPrintOptions(), options)
      return Plotly.toImage(this.$el, allOptions)
    },
    downloadImage (options) {
      const filename = `plot--${new Date().toISOString()}`
      const allOptions = Object.assign(
        this.getPrintOptions(),
        { filename },
        options
      )
      return Plotly.downloadImage(this.$el, allOptions)
    },
    getPrintOptions () {
      const { $el } = this
      return {
        format: 'png',
        width: $el.clientWidth,
        height: $el.clientHeight
      }
    },
    react () {
      Plotly.react(this.$el, this.traces, this.innerLayout, this.options)
    }
  }
}

</script>
