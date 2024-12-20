import { ref, computed } from 'vue'
import { MILLISECONDS_IN_SECOND, SECONDS_IN_DAY, HUNDRED_PERCENT } from './constants'

export const now = ref(new Date())

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND)

let timer = null

export function startTimer() {
  now.value = new Date()
  timer = setInterval(() => {
    now.value = new Date(now.value.getTime() + 5 * 60 * MILLISECONDS_IN_SECOND)
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimer() {
  clearInterval(timer)
}
