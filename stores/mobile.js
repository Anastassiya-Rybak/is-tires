import { defineStore } from 'pinia'
export const useMobileStore = defineStore ("mobile", {
    state: () => ({
        mobile: false
    }),

    actions: {
        editItem(newData){
            this.mobile = newData;
        },

        saveState () {
            localStorage.setItem('mobileState', JSON.stringify(this.$state))
        },

        restoreState() {
            const savedState = localStorage.getItem('mobileState')
            if (savedState) {
              this.$patch(JSON.parse(savedState))
            }
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMobileStore, import.meta.hot));
}