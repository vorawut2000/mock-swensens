import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = reactive({
    isLoggedIn: null,
    username: ""
  });

  const getUserInfo = computed(() => ({
    isLoggedIn: user.isLoggedIn,
    username: user.username
  }));

  function $reset() {
    user.isLoggedIn = null,
    user.username = ""
  }

  return { user, getUserInfo, $reset };
});
