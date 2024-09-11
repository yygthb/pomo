import { Ring } from "@/components/services/Ring";
import BellSound_1 from '../assets/audio/bell1.mp3';
import BellSound_2 from '../assets/audio/bell2.mp3';
import BellSound_3 from '../assets/audio/bell3.mp3';
import BellSound_4 from '../assets/audio/bell4.mp3';
import { getFromLS, setToLS } from "@/helpers/ls";

const SOUND_LS_KEY = 'pomo-timer-ls-sound';
const VOLUME_LVL_LS_KEY = 'pomo-timer-ls-volume-lvl';

const soundOptions = [
  { name: "Bell 1", value: BellSound_1 },
  { name: "Bell 2", value: BellSound_2 },
  { name: "Bell 3", value: BellSound_3 },
  { name: "Bell 4", value: BellSound_4 },
];

const initialSelectedSound = JSON.parse(getFromLS(SOUND_LS_KEY)) || soundOptions[0];
const initialVolumeLevel = +getFromLS(VOLUME_LVL_LS_KEY) || 80;

export default {
  soundOptions,
  selectedSound: initialSelectedSound,
  ring: new Ring(initialSelectedSound.value),

  setSelectedSound(val) {
    this.ring.stop();
    this.selectedSound = val;
    this.ring.setSound(this.selectedSound.value);
    this.ring.play();
    setToLS(SOUND_LS_KEY, val);
  },

  volumeLevel: initialVolumeLevel,
  setSoundVolumeLevel(val) {
    this.ring.stop();
    this.volumeLevel = val;
    this.ring.setVolume(val);
    this.ring.play();
    setToLS(VOLUME_LVL_LS_KEY, val);
  }
}
