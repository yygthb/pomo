export class Ring extends Audio {
  constructor(src, volumeLevel = 0.1) {
    super(src);
    super.volume = volumeLevel;
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
