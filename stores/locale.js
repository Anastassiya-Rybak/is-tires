import { defineStore } from 'pinia'
export const useLocaleStore = defineStore ("locale", {
    state: () => ({
        lang: ''
    }),

    actions: {
        editItem(newData){
            this.lang = newData;
        },

        saveState () {
            localStorage.setItem('iskraServiceLangState', JSON.stringify(this.$state))
        },

        restoreState() {
            const savedState = localStorage.getItem('iskraServiceLangState')
            if (savedState) {
              this.$patch(JSON.parse(savedState))
            }
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLocaleStore, import.meta.hot));
}