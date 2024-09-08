<script setup>
import { ref, watch } from "vue";

import MainPage from "./MainPage.vue";
import Settings from "./Settings.vue";

import BellSound_1 from "../assets/audio/bell1.mp3";
import BellSound_2 from "../assets/audio/bell2.mp3";
import BellSound_3 from "../assets/audio/bell3.mp3";
import BellSound_4 from "../assets/audio/bell4.mp3";
import { Ring } from "./services/Ring";

const TIMER_INTERVAL_VALUE = 10;

const mainTimerConfiguredVal = ref(3);
const mainTimer = ref(mainTimerConfiguredVal.value * 60);
const breakTimerConfiguredVal = ref(1);
const breakTimer = ref(breakTimerConfiguredVal.value * 60);
const isRunning = ref(false);
const activeTimer = ref({
  name: "main", // ['main', 'break'];
  timer: mainTimer, // ['mainTimer', 'breakTimer'];
});
const autoStart = ref(false);

const ringOptions = ref([
  { name: "Bell 1", value: BellSound_1 },
  { name: "Bell 2", value: BellSound_2 },
  { name: "Bell 3", value: BellSound_3 },
  { name: "Bell 4", value: BellSound_4 },
]);
const selectedRingOption = ref(ringOptions.value[1]);
const volumeLevel = ref(50);

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

  if (autoStart.value) {
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

function updateMainTimer(val) {
  mainTimerConfiguredVal.value = val;
}

function updateBreakTimer(val) {
  breakTimerConfiguredVal.value = val;
}

function updateAutoStart(val) {
  autoStart.value = val;
}

function updateRing(val) {
  selectedRingOption.value = val;
  ringSelectedHandler();
}

function updateVolumeLevel(val) {
  volumeLevel.value = val;
  volumeLevelChangeHandler();
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

      <Settings
        :mainTimer="mainTimerConfiguredVal"
        @updateMainTimer="updateMainTimer"
        :breakTimer="breakTimerConfiguredVal"
        @updateBreakTimer="updateBreakTimer"
        :autoStart="autoStart"
        @updateAutoStart="updateAutoStart"
        :ringOptions="ringOptions"
        :selectedRing="selectedRingOption"
        @updateRing="updateRing"
        :volumeLevel="volumeLevel"
        @updateVolumeLevel="updateVolumeLevel"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  padding: 20px 0;
}
</style>
