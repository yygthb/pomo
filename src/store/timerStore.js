const MAIN_TIMER_START_VAL = 2;
const INITIAL_BREAK_TIMER_VAL = 1;

var timerInterval;
const TIMER_INTERVAL_VALUE = 10;

export default {
  mainTimerStartVal: MAIN_TIMER_START_VAL,
  setMainTimerStartVal(min) {
    this.mainTimerStartVal = min;
  },
  mainTimer: MAIN_TIMER_START_VAL * 60,
  setMainTimer(min) {
    this.mainTimer = min * 60;
  },

  breakTimerStartVal: INITIAL_BREAK_TIMER_VAL,
  setBreakTimerStartVal(min) {
    this.breakTimerStartVal = min;
  },
  breakTimer: INITIAL_BREAK_TIMER_VAL * 60,
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

  activeTimerName: 'main',                                      // ['main', 'break']
  setActiveTimerName(val) {
    this.activeTimerName = val;
  },
  activeTimerValue: 0,
  autoStart: false,
  setAutoStart(val) {
    this.autoStart = val;
  },
  enableAutoStart() {
    this.autoStart = true;
  },
  disableAutoStart() {
    this.autoStart = false;
  },
  setActiveTimer(title) {
    this.activeTimerName = title;
  },
  reductionTimer() {
    if (this.activeTimerName === 'main') {
      this.mainTimer -= 1;
    }
    if (this.activeTimerName === 'break') {
      this.breakTimer -= 1;
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
