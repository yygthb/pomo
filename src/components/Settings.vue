<script setup>
import { computed } from "vue";
import { store } from "@/store/store";
import InputNumber from "./ui/InputNumber.vue";
import AppCheckbox from "./ui/AppCheckbox.vue";
import AppSelect from "./ui/AppSelect.vue";
import AppRange from "./ui/AppRange.vue";
import ColorThemeSelector from "./ColorThemeSelector.vue";
import IconTimer from "./icons/IconTimer.vue";
import IconRing from "./icons/IconRing.vue";
import IconLang from "./icons/IconLang.vue";
import IconColor from "./icons/IconColor.vue";

const { timer, sound, lang } = store;

const mappedMainTimerStartVal = computed(() => timer.mainTimerStartVal);
function mainTimerStartValChange(val) {
  timer.setMainTimerStartVal(val);
  timer.setMainTimer(val);
}

const mappedBreakTimerStartVal = computed(() => timer.breakTimerStartVal);
function breakTimerStartValChange(val) {
  timer.setBreakTimerStartVal(val);
  timer.setBreakTimer(val);
}

const mappedAutoStart = computed(() => timer.autoStart);
function autoStartChangeHandler(val) {
  timer.setAutoStart(val);
}

function selectOptionChange(val) {
  sound.setSelectedSound(val);
}

function volumeLevelChange(val) {
  sound.setSoundVolumeLevel(val);
}

function setLang(val) {
  lang.setLang(val);
}
</script>

<template>
  <div class="settings-container">
    <p class="settings-title">{{ $t("settings.mainTitle") }}</p>

    <div class="config-wrapper">
      <div class="config-item">
        <div class="config-item__header">
          <IconTimer class="config-icon" />
          <div class="config-title">{{ $t("settings.timerTitle") }}</div>
        </div>

        <div class="config-setup config-setup__timer">
          <div class="grid-row">
            <div class="config-section">
              <label class="label label-timer"
                >{{ $t("timerTab.main") }} ({{ $t("min") }})</label
              >
              <InputNumber
                v-model="mappedMainTimerStartVal"
                @onInput="mainTimerStartValChange"
              />
            </div>
            <div class="config-section">
              <label class="label label-timer"
                >{{ $t("timerTab.break") }} ({{ $t("min") }})</label
              >
              <InputNumber
                v-model="mappedBreakTimerStartVal"
                @onInput="breakTimerStartValChange"
              />
            </div>
          </div>
          <div class="flex-row">
            <label class="label">{{ $t("settings.autoStart") }}</label>
            <AppCheckbox
              v-model="mappedAutoStart"
              @onChange="autoStartChangeHandler"
            />
          </div>
        </div>
      </div>

      <div class="config-item">
        <div class="config-item__header">
          <IconRing class="config-icon" />
          <div class="config-title">{{ $t("settings.soundTitle") }}</div>
        </div>

        <div class="config-setup">
          <div class="flex-row">
            <label class="label">{{ $t("settings.soundLabel") }}</label>
            <AppSelect
              class="select"
              :options="sound.soundOptions"
              v-model="sound.selectedSound"
              :selectedOptionCb="selectOptionChange"
            />
          </div>
          <div class="flex-row">
            <label class="label">{{ $t("settings.volumeLabel") }}</label>
            <AppRange
              v-model="sound.volumeLevel"
              :changeHandler="volumeLevelChange"
            />
          </div>
        </div>
      </div>

      <div class="config-item">
        <div class="config-item__header">
          <IconLang class="config-icon" />
          <div class="config-title">{{ $t("settings.langTitle") }}</div>
        </div>

        <div class="config-setup">
          <div class="flex-row">
            <label class="label">{{ $t("settings.langLabel") }}</label>
            <AppSelect
              class="select-lang"
              :options="lang.langOptions"
              v-model="lang.selectedLang"
              :selectedOptionCb="setLang"
            />
          </div>
        </div>
      </div>

      <div class="config-item">
        <div class="config-item__header">
          <IconColor class="config-icon" />
          <div class="config-title">{{ $t("settings.themeTitle") }}</div>
        </div>
        <div class="config-setup">
          <ColorThemeSelector />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings-container {
  max-width: 400px;
  margin: 0 auto;
  background-color: var(--color-bg-white);

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
    // font-weight: 800;

    &-timer {
      font-size: 14px;
    }
  }

  .config-setup__timer .label {
    font-weight: 400;
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
  gap: 20px;
}

.select {
  width: 200px;

  &-lang {
    width: 60px;
  }
}
</style>
