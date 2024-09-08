<script setup>
import { computed, onMounted, ref } from "vue";
import { lessThanTenMod } from "@/helpers/lessThanTenMod";
import AppButton from "./ui/AppButton.vue";

const props = defineProps({
  mainTimer: Number,
  breakTimer: Number,
  isRunning: {
    type: Boolean,
    default: false,
  },
  activeTab: {
    type: String,
  },
  tabClickHandler: {
    type: Function,
  },
  startClickHandler: {
    type: Function,
  },
  skipClickHandler: {
    type: Function,
  },
});

const mappedMainTimer = computed(() => {
  const min = Math.floor(props.mainTimer / 60);
  const sec = props.mainTimer - min * 60;
  return lessThanTenMod(min) + ":" + lessThanTenMod(sec);
});

const mappedBreakTimer = computed(() => {
  const min = Math.floor(props.breakTimer / 60);
  const sec = props.breakTimer - min * 60;
  return lessThanTenMod(min) + ":" + lessThanTenMod(sec);
});
</script>

<template>
  <div class="main-page">
    <div :class="['tabs', isRunning && 'disabled']">
      <div
        :class="['tab-item', activeTab === 'main' && 'active']"
        @click="tabClickHandler('main')"
      >
        Pomodoro
      </div>
      <div
        :class="['tab-item', activeTab === 'break' && 'active']"
        @click="tabClickHandler('break')"
      >
        Break
      </div>
    </div>

    <div v-if="activeTab === 'main'" class="timer">{{ mappedMainTimer }}</div>
    <div v-if="activeTab === 'break'" class="timer">{{ mappedBreakTimer }}</div>

    <div class="timer-btns">
      <AppButton @click="startClickHandler" class="start-btn">{{
        isRunning ? "Pause" : "Start"
      }}</AppButton>
      <AppButton @click="skipClickHandler" class="skip-btn">Skip</AppButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: fit-content;
  gap: 20px;

  &.disabled {
    pointer-events: none;
  }

  .tab-item {
    width: 120px;
    padding: 2px 5px;
    border-radius: 5px;
    text-align: center;
    background-color: #eee;
    cursor: pointer;

    &:hover {
      background-color: #ddd;
    }

    &:active {
      background-color: #ccc;
    }

    &.active {
      color: #fff;
      background-color: lightcoral;

      &:hover,
      &:active {
        background-color: lightcoral;
      }
    }
  }
}

.timer {
  font-size: 120px;
  line-height: 1.1;
  @include fontConcertOne;
  text-align: center;
}

.timer-btns {
  width: max-content;
  margin: 30px auto 0;
  display: grid;
  grid-template-columns: repeat(2, 100px);
  gap: 10px;
}
</style>
