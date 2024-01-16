import { defineStore } from 'pinia'
export const useFilterStore = defineStore ("filter", {
    state: () => ({
        selectedRd: "",
        selectedType: "",
        selectedIdx: "",
        selectedTube: ""
    }),

    actions: {
        editItem(item, newData){
            switch (item) {
                case 'rd':
                    this.selectedRd = newData;
                    break;
                case 'type':
                    this.selectedType = newData;
                    break;
                case 'idx':
                    this.selectedIdx = newData;
                    break;
                case 'tube':
                    this.selectedTube = newData;
                    break;                      
                default:
                    break;
            }
        },

        saveState () {
            localStorage.setItem('filterState', JSON.stringify(this.$state))
        },

        restoreState() {
            const savedState = localStorage.getItem('filterState')
            if (savedState) {
              this.$patch(JSON.parse(savedState))
            }
        },

        resetFilter() {
            this.editItem('rd', '');
            this.editItem('tube', '');
            this.editItem('type', '');
            this.editItem('idx', '');
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFilterStore, import.meta.hot));
}