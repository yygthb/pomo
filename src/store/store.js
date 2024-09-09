import { reactive } from "vue";
import modalStore from "./modalStore";
import timerStore from "./timerStore";
import soundStore from "./soundStore";
import colorStore from "./colorStore";

export const store = reactive({
  modal: modalStore,
  timer: timerStore,
  sound: soundStore,
  color: colorStore,
})
