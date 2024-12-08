<script setup>
import { ref, computed, onActivated, onDeactivated } from 'vue'
import { HUNDRED_PERCENT } from '../constants'
import { secondsSinceMidnightInPercentage, startTimer, stopTimer } from '../time'

const indicatorRef = ref()

const topOffset = computed(
  () => (secondsSinceMidnightInPercentage.value * timelineHeight()) / HUNDRED_PERCENT
)

function timelineHeight() {
  if (indicatorRef.value)
    return indicatorRef.value ? indicatorRef.value.parentNode.getBoundingClientRect().height : 0
}
onActivated(startTimer)
onDeactivated(stopTimer)
</script>

<template>
  <hr
    ref="indicatorRef"
    class="pointer-events-none absolute z-20 w-full border-b-2 border-red-600 opacity-50"
    :style="{ top: `${topOffset}px` }"
  />
</template>
