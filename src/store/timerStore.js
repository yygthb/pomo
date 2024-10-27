import { formatSecToTime } from "@/helpers/formatSecToTime";
import { getFromLS, setToLS } from "@/helpers/ls";
import { getBoolFromString } from "@/helpers/getBoolFromString";

const MAIN_TIMER_LS_KEY = 'pomo-timer-ls-mt';
const BREAK_TIMER_LS_KEY = 'pomo-timer-ls-bt';
const AUTOSTART_LS_KEY = 'pomo-timer-ls-autostart';

const initialMainTimer = +getFromLS(MAIN_TIMER_LS_KEY) || 25;
const initialBreakTimer = +getFromLS(BREAK_TIMER_LS_KEY) || 5;
const initialAutoStart = getBoolFromString(getFromLS(AUTOSTART_LS_KEY));

var timerInterval;
const TIMER_INTERVAL_VALUE = 50;

export default {
  mainTimerStartVal: initialMainTimer,
  setMainTimerStartVal(min) {
    console.log('set main timer start val', min);
    if (min < 0) {
      this.setMainTimer(1);
      return;
    }

    if (min > 60) {
      this.setMainTimer(60);
      return;
    }

    this.setMainTimer(min);
  },
  mainTimer: initialMainTimer * 60,
  setMainTimer(val) {
    this.mainTimerStartVal = val;
    setToLS(MAIN_TIMER_LS_KEY, val);
    this.mainTimer = val * 60;
  },

  breakTimerStartVal: initialBreakTimer,
  setBreakTimerStartVal(min) {
    if (min <= 0) {
      this.setBreakTimer(1);
      return;
    }

    if (min > 60) {
      this.setBreakTimer(60);
      return;
    }

    this.setBreakTimer(min);
  },
  breakTimer: initialBreakTimer * 60,
  setBreakTimer(val) {
    this.breakTimerStartVal = val;
    setToLS(BREAK_TIMER_LS_KEY, val);
    this.breakTimer = val * 60;
  },

  cb: null,
  initCb(cb) {
    this.cb = cb;
  },
  runCb() {
    if (this.cb) {
      this.cb();
    }
  },

  isRunning: false,
  start() {
    if (this.activeTimerValue <= 0) {
      return;
    }

    this.isRunning = true;
    timerInterval = setInterval(() => {
      if (this.activeTimerValue > 0) {
        this.reductionTimer();
      } else {
        this.runCb();
        this.stop();
        return;
      }
    }, TIMER_INTERVAL_VALUE);
  },
  pause() {
    this.isRunning = false;
    clearInterval(timerInterval);
  },
  stop() {
    this.isRunning = false;
    clearInterval(timerInterval);
    document.title = 'Pomo Timer';

    if (this.activeTimerName === "main") {
      this.activeTimerName = "break";
      this.mainTimer = this.mainTimerStartVal * 60;
    } else if (this.activeTimerName === "break") {
      this.activeTimerName = "main";
      this.breakTimer = this.breakTimerStartVal * 60;
    }
    this.updateActiveTimer();

    if (this.autoStart) {
      this.start();
    }
  },

  activeTimerName: 'main',                        // ['main', 'break']
  setActiveTimerName(val) {
    this.activeTimerName = val;
  },
  activeTimerValue: 0,

  autoStart: initialAutoStart,
  setAutoStart(val) {
    setToLS(AUTOSTART_LS_KEY, val);
    this.autoStart = val;
  },
  setActiveTimer(title) {
    this.activeTimerName = title;
  },
  reductionTimer() {
    if (this.activeTimerName === 'main') {
      this.mainTimer -= 1;
      document.title = formatSecToTime(this.mainTimer);
    }
    if (this.activeTimerName === 'break') {
      this.breakTimer -= 1;
      document.title = formatSecToTime(this.breakTimer);
    }
    this.updateActiveTimer();
  },
  updateActiveTimer() {
    if (this.activeTimerName === 'main') {
      this.activeTimerValue = this.mainTimer;
    }
    if (this.activeTimerName === 'break') {
      this.activeTimerValue = this.breakTimer;
    }
  },
}
