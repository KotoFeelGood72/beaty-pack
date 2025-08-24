import { defineStore, storeToRefs } from "pinia";

export const useModalStore = defineStore("modal", {
  state: (): { modals: any; bg: boolean } => ({
    modals: {
      fly: false,
      callback: false,
      burger: false,
      order: false,
    },
    bg: false,
  }),
  actions: {
    openModal(modalName: any) {
      this.modals[modalName] = !this.modals[modalName];
    },
    closeModal(modalName: any): void {
      this.modals[modalName] = false;
    },
    closeAllModals() {
      Object.keys(this.modals).forEach((modalName) => {
        this.modals[modalName as keyof any] = false;
      });
    },

    toggleBg(value: boolean) {
      this.bg = value;
    },
  },
});

export const useModalStoreRefs = () => storeToRefs(useModalStore());
