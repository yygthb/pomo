import { reactive } from "vue";
import modalStore from "./modalStore";
import timerStore from "./timerStore";
import soundStore from "./soundStore";

export const store = reactive({
  modal: modalStore,
  timer: timerStore,
  sound: soundStore,
})
