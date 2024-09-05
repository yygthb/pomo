<script setup>
import { computed, ref } from "vue";
import AppButton from "./ui/AppButton.vue";
import BellSound from '../assets/audio/bell.mp3';

const pomodoroTimerValue = 25 * 60;

const timer = ref(pomodoroTimerValue);
var timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(timerInterval);
      ringTheBell(BellSound);
      return;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  timer.value = pomodoroTimerValue;
}

const min = computed(() => {
  return Math.floor(timer.value / 60);
});

const sec = computed(() => {
  return timer.value - min.value * 60;
});

function ringTheBell(sound) {
  let note = new Audio(sound);
  note.addEventListener("canplaythrough", () => { 
    note.play();
  });
}

function setTimerToValue(val) {
  timer.value = val;
}
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="pomodoro-container">
        <div class="timer">
          <div>
            {{ timer }}
          </div>
          <div>{{ min < 10 ? `0${min}` : min }} : {{ sec < 10 ? `0${sec}` : sec }}</div>
        </div>
        <div class="controls">
          <AppButton @click="startTimer">Start</AppButton>
          <AppButton @click="pauseTimer">Pause</AppButton>
          <AppButton @click="resetTimer">Reset</AppButton>
        </div>

        <!-- <AppButton :text="'Set timer to 10sec'" @click="setTimerToValue(10)" /> -->
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  padding: 20px 0;
}
</style>
