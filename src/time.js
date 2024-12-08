import { ref, computed, watchEffect} from 'vue'
import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
  SECONDS_IN_DAY,
  MINUTES_IN_HOUR,
  HUNDRED_PERCENT
} from './constants'

function getSecondsSinceMidnight() {
  const now = new Date()

  return (
    SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() +
    SECONDS_IN_MINUTE * now.getMinutes() +
    now.getSeconds()
  )
}

const secondsSinceMidnight = ref(getSecondsSinceMidnight())

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

watchEffect(() => {
  if (secondsSinceMidnightInPercentage.value === HUNDRED_PERCENT) {
    secondsSinceMidnight.value = getSecondsSinceMidnight()
  }
})

let timer = null

export function startTimer() {
  secondsSinceMidnight.value = getSecondsSinceMidnight()
  timer = setInterval(() => (secondsSinceMidnight.value += 5 * 60), MILLISECONDS_IN_SECOND)
}

export function stopTimer() {
  clearInterval(timer)
}