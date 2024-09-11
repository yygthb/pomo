import { formatSecToTime } from "@/helpers/formatSecToTime";
import { getFromLS, setToLS } from "@/helpers/ls";
import { stringToBool } from "@/helpers/stringToBool";

const MAIN_TIMER_LS_KEY = 'pomo-timer-ls-mt';
const BREAK_TIMER_LS_KEY = 'pomo-timer-ls-bt';
const AUTOSTART_LS_KEY = 'pomo-timer-ls-autostart';

const initialMainTimer = +getFromLS(MAIN_TIMER_LS_KEY) || 25;
const initialBreakTimer = +getFromLS(BREAK_TIMER_LS_KEY) || 5;
const initialAutoStart = stringToBool(getFromLS(AUTOSTART_LS_KEY)) || false;

var timerInterval;
const TIMER_INTERVAL_VALUE = 10;

export default {
  mainTimerStartVal: initialMainTimer,
  setMainTimerStartVal(min) {
    this.mainTimerStartVal = min;
    setToLS(MAIN_TIMER_LS_KEY, min);
  },
  mainTimer: initialMainTimer * 60,
  setMainTimer(min) {
    this.mainTimer = min * 60;
  },

  breakTimerStartVal: initialBreakTimer,
  setBreakTimerStartVal(min) {
    this.breakTimerStartVal = min;
    setToLS(BREAK_TIMER_LS_KEY, min);
  },
  breakTimer: initialBreakTimer * 60,
  setBreakTimer(min) {
    this.breakTimer = min * 60;
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
