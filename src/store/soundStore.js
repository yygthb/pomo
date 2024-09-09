import { Ring } from "@/components/services/Ring";
import BellSound_1 from '../assets/audio/bell1.mp3';
import BellSound_2 from '../assets/audio/bell2.mp3';
import BellSound_3 from '../assets/audio/bell3.mp3';
import BellSound_4 from '../assets/audio/bell4.mp3';

const soundOptions = [
  { name: "Bell 1", value: BellSound_1 },
  { name: "Bell 2", value: BellSound_2 },
  { name: "Bell 3", value: BellSound_3 },
  { name: "Bell 4", value: BellSound_4 },
];
const initialselectedSound = soundOptions[0];

export default {
  soundOptions,
  selectedSound: initialselectedSound,
  ring: new Ring(initialselectedSound.value),

  setSelectedSound(val) {
    this.ring.stop();
    this.selectedSound = val;
    this.ring.setSound(this.selectedSound.value);
    this.ring.play();
  },

  volumeLevel: 30,
  setSoundVolumeLevel(val) {
    this.ring.stop();
    this.volumeLevel = val;
    this.ring.setVolume(val);
    this.ring.play();
  }
}
