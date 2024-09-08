<script setup>
import { computed, ref } from "vue";
import { i18n } from "../config/i18n";
import IconTimer from "./icons/IconTimer.vue";
import IconRing from "./icons/IconRing.vue";
import IconLang from "./icons/IconLang.vue";
import IconColor from "./icons/IconColor.vue";
import InputNumber from "./ui/InputNumber.vue";
import AppCheckbox from "./ui/AppCheckbox.vue";
import AppSelect from "./ui/AppSelect.vue";
import AppRange from "./ui/AppRange.vue";

const props = defineProps({
  mainTimer: {
    type: Number,
  },
  breakTimer: {
    type: Number,
  },
  autoStart: {
    type: Boolean,
  },
  ringOptions: {
    type: Array,
  },
  selectedRing: {
    type: Object,
  },
  volumeLevel: {
    type: Number,
  },
});
const emit = defineEmits([
  "updateMainTimer",
  "updateBreakTimer",
  "updateAutoStart",
  "updateRing",
  "updateVolumeLevel",
]);

const langOptions = ref([
  { name: "En", value: "en" },
  { name: "Ru", value: "ru" },
]);
const selectedLang = ref(langOptions.value[0]);

const mappedMainTimer = computed(() => props.mainTimer);
function mainTimerChange(val) {
  emit("updateMainTimer", val);
}

const mappedBreakTimer = computed(() => props.breakTimer);
function breakTimerChange(val) {
  emit("updateBreakTimer", val);
}

const mappedAutoStart = computed(() => props.autoStart);
function autoStartChange(val) {
  emit("updateAutoStart", val);
}

const mappedSelectedRing = computed(() => props.selectedRing);
function selectOptionChange(val) {
  emit("updateRing", val);
}

const mappedVolumeLevel = computed(() => props.volumeLevel);
function volumeLevelChange(val) {
  emit("updateVolumeLevel", val);
}

function setI18nLocale(val) {
  console.log("change lang to ", val);
  i18n.global.locale = val.value;
}
</script>

<template>
  <div class="settings-container">
    <p class="settings-title">Settings</p>

    <div class="config-wrapper">
      <div class="config-item">
        <div class="config-item__header">
          <IconTimer class="config-icon" />
          <div class="config-title">Timer</div>
        </div>

        <div class="config-setup">
          <div class="grid-row">
            <div class="config-section">
              <label class="label label-timer"
                >Pomodoro (min): {{ mainTimer }}</label
              >
              <InputNumber
                v-model="mappedMainTimer"
                @onInput="mainTimerChange"
              />
            </div>
            <div class="config-section">
              <label class="label label-timer"
                >Break (min): {{ breakTimer }}</label
              >
              <InputNumber
                v-model="mappedBreakTimer"
                @onInput="breakTimerChange"
              />
            </div>
          </div>
          <div class="flex-row">
            <label class="label">Autostart Next Timer</label>
            <AppCheckbox
              v-model="mappedAutoStart"
              @onChange="autoStartChange"
            />
          </div>
        </div>
      </div>

      <div class="config-item">
        <div class="config-item__header">
          <IconRing class="config-icon" />
          <div class="config-title">Ring</div>
        </div>

        <div class="config-setup">
          <div class="flex-row">
            <label class="label">Select Ringtone</label>
            <AppSelect
              class="select"
              :options="ringOptions"
              v-model="mappedSelectedRing"
              :selectedOptionCb="selectOptionChange"
            />
          </div>
          <div class="flex-row">
            <label class="label">Volume Level</label>
            <AppRange
              v-model="mappedVolumeLevel"
              :changeHandler="volumeLevelChange"
            />
          </div>
        </div>
      </div>

      <div class="config-item">
        <div class="config-item__header">
          <IconLang class="config-icon" />
          <div class="config-title">Language</div>
        </div>

        <div class="config-setup">
          <div class="flex-row">
            <label class="label">App Language</label>
            <AppSelect
              class="select-lang"
              :options="langOptions"
              v-model="selectedLang"
              :selectedOptionCb="setI18nLocale"
            />
          </div>
        </div>
      </div>

      <!-- <div class="config-item">
        <div class="config-item__header">
          <IconColor class="config-icon" />
          <div class="config-title">Color Theme</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings-container {
  max-width: 400px;
  margin: 20px auto 40px;
  padding: 20px;
  background-color: var(--color-bg-white);
  // border: 1px solid var(--color-border);
  // border-radius: 10px;
  // box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

  .settings-title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
}

.config-item {
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }

  & ~ .config-item {
    padding-top: 30px;
    border-top: 1px solid var(--color-border-light);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    opacity: 0.5;
  }

  .config-setup {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .label {
    display: block;
    margin: 0;
    font-size: 18px;
    font-weight: 800;

    &-timer {
      font-size: 14px;
    }
  }
}

.grid-row {
  display: grid;
  grid-template-columns: repeat(2, 47%);
  align-content: center;
  justify-content: space-between;
}

.flex-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select {
  width: 200px;

  &-lang {
    width: 60px;
  }
}
</style>
