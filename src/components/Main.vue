<script setup>
import { ref, watch } from "vue";
import { i18n } from "../config/i18n";
import AppButton from "./ui/AppButton.vue";
import AppSelect from "./ui/AppSelect.vue";
import AppCheckbox from "./ui/AppCheckbox.vue";
import AppRange from "./ui/AppRange.vue";

import BellSound_1 from "../assets/audio/bell1.mp3";
import BellSound_2 from "../assets/audio/bell2.mp3";
import BellSound_3 from "../assets/audio/bell3.mp3";
import BellSound_4 from "../assets/audio/bell4.mp3";
import { Ring } from "./services/Ring";
import MainPage from "./MainPage.vue";

const TIMER_INTERVAL_VALUE = 100;

const mainTimerConfiguredVal = ref(3);
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
const selectedRingOption = ref(ringOptions.value[1]);
const volumeLevel = ref(10);

const ring = new Ring(selectedRingOption.value.value);

var timerInterval;

watch(mainTimerConfiguredVal, () => {
  mainTimer.value = mainTimerConfiguredVal.value * 60;
});

watch(breakTimerConfiguredVal, () => {
  breakTimer.value = breakTimerConfiguredVal.value * 60;
});

function startClickHandler() {
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
      ring.play();
      stopTimer();
      return;
    }
  }, TIMER_INTERVAL_VALUE);
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

function volumeLevelChangeHandler() {
  ring.stop();
  ring.setVolume(volumeLevel.value);
  ring.play();
}

function setI18nLocale(locale) {
  i18n.global.locale = locale;
}

function ringSelectedHandler() {
  ring.stop();
  ring.setSound(selectedRingOption.value.value);
  ring.play();
}

function tabClickHandler(tabName) {
  activeTimer.value.name = tabName;
  if (tabName === "main") {
    activeTimer.value.timer = mainTimer;
  } else if (tabName === "break") {
    activeTimer.value.timer = breakTimer;
  }
}

</script>

<template>
  <main class="main">
    <div class="container">
      <MainPage
        class="timer-container"
        :mainTimer="mainTimer"
        :breakTimer="breakTimer"
        :isRunning="isRunning"
        :activeTab="activeTimer.name"
        :tabClickHandler="tabClickHandler"
        :startClickHandler="startClickHandler"
        :skipClickHandler="skipTimer"
      />

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
            <AppRange
              v-model="volumeLevel"
              :step="10"
              :changeHandler="volumeLevelChangeHandler"
            />
            <span>ring volume level: {{ volumeLevel }}</span>
          </div>

          <div class="config-item">
            <AppSelect
              :options="ringOptions"
              v-model="selectedRingOption"
              :selectedOptionCb="ringSelectedHandler"
            />
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

.timer-container {
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
