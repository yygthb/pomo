<script setup>
import { computed, onMounted } from "vue";
import { store } from "@/store/store";
import { formatSecToTime } from "@/helpers/formatSecToTime";
import AppButton from "./ui/AppButton.vue";

const { timer, sound } = store;

onMounted(() => {
  timer.initCb(() => sound.ring.play());
  timer.updateActiveTimer();
});

const mappedMainTimer = computed(() => formatSecToTime(timer.mainTimer));

const mappedBreakTimer = computed(() => formatSecToTime(timer.breakTimer));

const mappedIsRunning = computed(() => timer.isRunning);

const activeTab = computed(() => timer.activeTimerName);

function tabClickHandler(val) {
  timer.setActiveTimerName(val);
}

function startClickHandler() {
  if (timer.isRunning === false) {
    startTimer();
  } else {
    pauseTimer();
  }
}

function startTimer() {
  timer.start();
}

function pauseTimer() {
  timer.pause();
}

function skipClickHandler() {
  timer.stop();
}
</script>

<template>
  <div class="timer-container">
    <div :class="['tabs', timer.isRunning && 'disabled']">
      <div
        :class="['tab-item', activeTab === 'main' && 'active']"
        @click="tabClickHandler('main')"
      >
        {{ $t("timerTab.main") }}
      </div>
      <div
        :class="['tab-item', activeTab === 'break' && 'active']"
        @click="tabClickHandler('break')"
      >
        {{ $t("timerTab.break") }}
      </div>
    </div>

    <div v-if="activeTab === 'main'" class="timer">{{ mappedMainTimer }}</div>
    <div v-if="activeTab === 'break'" class="timer">{{ mappedBreakTimer }}</div>

    <div class="timer-btns">
      <AppButton @click="startClickHandler" class="timer-btn start-btn">{{
        mappedIsRunning ? $t("btn.pause") : $t("btn.start")
      }}</AppButton>
      <AppButton @click="skipClickHandler" class="timer-btn skip-btn">{{
        $t("btn.skip")
      }}</AppButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timer-container {
  padding: 40px;
  border-radius: var(--b-radius-xl);
  background-color: var(--color-bg-dark);
}

.tabs {
  display: flex;
  align-items: center;
  margin: 0 auto 20px;
  width: fit-content;
  gap: 20px;

  &.disabled {
    pointer-events: none;
  }

  .tab-item {
    width: 150px;
    padding: 2px 5px;
    border-radius: var(--b-radius-l);
    text-align: center;
    border: 1px solid var(--color-bg-dark-2);
    color: var(--color-text-contrast);
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: var(--color-bg-dark-2);
    }

    &:active {
      background-color: var(--color-bg-dark-3);
    }

    &.active {
      background-color: var(--color-bg-dark-2);
      pointer-events: none;
    }
  }
}

.timer {
  margin-bottom: 20px;
  font-size: 120px;
  line-height: 1.1;
  @include fontConcertOne;
  text-align: center;
  color: var(--color-text-contrast);
}

.timer-btns {
  width: max-content;
  margin: 30px auto 0;
  display: flex;
  gap: 20px;
}

@media screen and (max-width: 480px) {
  .timer-container {
    padding: 20px;
  }

  .tabs .tab-item {
    width: 120px;
  }

  .timer {
    font-size: 100px;
  }
}
</style>
