export class Ring extends Audio {
  constructor(src) {
    super(src);
  }

  log() {
    console.log('log ring "this": ', this);
  }

  play() {
    this.stop();
    super.play();
  }

  stop() {
    this.pause();
    this.currentTime = 0;
  }

  setVolume(val) {
    this.volume = val / 100;
  }

  async setSound(src) {
    this.src = src;
    this.load();
  }
}
