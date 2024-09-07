<script setup>
import { computed, ref, watch } from "vue";
import { i18n } from "../config/i18n";
import { lessThanTenMod } from "../helpers/lessThanTenMod";
import AppButton from "./ui/AppButton.vue";
import AppSelect from "./ui/AppSelect.vue";
import AppCheckbox from "./ui/AppCheckbox.vue";

import BellSound_1 from "../assets/audio/bell1.mp3";
import BellSound_2 from "../assets/audio/bell2.mp3";
import BellSound_3 from "../assets/audio/bell3.mp3";
import BellSound_4 from "../assets/audio/bell4.mp3";

const mainTimerConfiguredVal = ref(5);
const mainTimer = ref(mainTimerConfiguredVal.value * 60);
const breakTimerConfiguredVal = ref(1);
const breakTimer = ref(breakTimerConfiguredVal.value * 60);
const isRunning = ref(false);
const activeTimer = ref({
  name: "main", // ['main', 'break'];
  timer: mainTimer, // ['mainTimer', 'breakTimer'];
});
const isTimerLooped = ref(false);
const ringOptions = ref([
  { name: "Bell 1", value: BellSound_1 },
  { name: "Bell 2", value: BellSound_2 },
  { name: "Bell 3", value: BellSound_3 },
  { name: "Bell 4", value: BellSound_4 },
]);
const selectedRingOption = ref(ringOptions.value[0]);
var timerInterval;

watch(mainTimerConfiguredVal, () => {
  mainTimer.value = mainTimerConfiguredVal.value * 60;
});

watch(breakTimerConfiguredVal, () => {
  breakTimer.value = breakTimerConfiguredVal.value * 60;
});

function pomodoroBtnHandler() {
  if (isRunning.value === false) {
    startTimer();
  } else {
    pauseTimer();
  }
}

function startTimer() {
  if (activeTimer.value.timer <= 0) {
    return;
  }
  isRunning.value = true;
  timerInterval = setInterval(() => {
    if (activeTimer.value.timer > 0) {
      activeTimer.value.timer--;
    } else {
      ringTheBell(selectedRingOption.value.value);
      stopTimer();
      return;
    }
  }, 10);
}

function pauseTimer() {
  isRunning.value = false;
  clearInterval(timerInterval);
}

function stopTimer() {
  clearInterval(timerInterval);
  isRunning.value = false;

  if (activeTimer.value.name === "main") {
    activeTimer.value.name = "break";
    mainTimer.value = mainTimerConfiguredVal.value * 60;
    activeTimer.value.timer = breakTimer;
  } else if (activeTimer.value.name === "break") {
    activeTimer.value.name = "main";
    breakTimer.value = breakTimerConfiguredVal.value * 60;
    activeTimer.value.timer = mainTimer;
  }

  if (isTimerLooped.value) {
    startTimer();
  }
}

function skipTimer() {
  stopTimer();
}

function ringTheBell(sound) {
  console.log('ring sound', sound);
  let note = new Audio(sound);
  note.addEventListener("canplaythrough", () => {
    note.play();
  });
}

const mainTimerConverted = computed(() => {
  const min = Math.floor(mainTimer.value / 60);
  const sec = mainTimer.value - min * 60;
  return lessThanTenMod(min) + ":" + lessThanTenMod(sec);
});

const breakTimerConverted = computed(() => {
  const min = Math.floor(breakTimer.value / 60);
  const sec = breakTimer.value - min * 60;
  return lessThanTenMod(min) + ":" + lessThanTenMod(sec);
});

function setI18nLocale(locale) {
  i18n.global.locale = locale;
}

function ringSelectedHandler() {
  ringTheBell(selectedRingOption.value.value);
}
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="pomodoro-container">
        <div class="pomodoro-timer">
          <span class="timer">pomodoro: {{ mainTimer }}</span>
          &nbsp;
          <span class="timer"
            >pomodoro converted: {{ mainTimerConverted }}</span
          >
        </div>
        <div class="pomodoro-timer">
          <span class="timer">break: {{ breakTimer }}</span>
          &nbsp;
          <span class="timer">break converted: {{ breakTimerConverted }}</span>
        </div>

        <p>active timer: "{{ activeTimer }}"</p>

        <div class="controls">
          <AppButton @click="pomodoroBtnHandler">{{
            isRunning === false
              ? $t("pomodoroBtn.start")
              : $t("pomodoroBtn.pause")
          }}</AppButton>
          <AppButton @click="skipTimer">Skip</AppButton>
        </div>
      </div>

      <div class="modal">
        <div class="config">
          <div class="config-item">
            <label for="">pomodoro timer (min):</label>
            <input
              v-model="mainTimerConfiguredVal"
              type="number"
              min="1"
              :disabled="isRunning"
            />
            <p>val: {{ mainTimerConfiguredVal }}</p>
            <label for="">break timer (min):</label>
            <input
              v-model="breakTimerConfiguredVal"
              type="number"
              min="1"
              :disabled="isRunning"
            />
            <p>val: {{ breakTimerConfiguredVal }}</p>
          </div>

          <div class="config-item">
            <AppCheckbox v-model="isTimerLooped" />
            <span>loop timer: {{ isTimerLooped }}</span>
          </div>

          <div class="config-item">
            <AppSelect :options="ringOptions" v-model="selectedRingOption" :selectedOptionCb="ringSelectedHandler" />
            <p>selectedRingOption: {{ selectedRingOption }}</p>
          </div>

          <div class="config-item">
            <AppButton :text="'Ru'" @click="setI18nLocale('ru')" />
            <AppButton :text="'En'" @click="setI18nLocale('en')" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  padding: 20px 0;
}

.pomodoro-container {
  margin-bottom: 50px;
}

.config {
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;

  &-item {
    padding: 10px 0;

    & ~ .config-item {
      border-top: 1px solid gray;
    }
  }
}
</style>
