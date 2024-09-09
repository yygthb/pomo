import { reactive } from "vue";
import modalStore from "./modalStore";
import timerStore from "./timerStore";

export const store = reactive({
  modal: modalStore,
  timer: timerStore,
})
