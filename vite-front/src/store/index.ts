import { defineStore } from "pinia";
import { getLogin, Data } from "@/api/login";
import { resolve } from "path";
import { resultProps } from "element-plus";
import type { tsModel9 } from "./type";
export const useMainStore = defineStore("main", {
  state: () => {
    return {
      isCollapse: false,
    };
  },

  getters: {},
  actions: {
    setCollapse(paylod: boolean) {
      this.isCollapse = paylod;
    },
    async login(userPass: Data) {
      const { user, password } = userPass;
      return await getLogin({ user, password });
    },
  },
});
