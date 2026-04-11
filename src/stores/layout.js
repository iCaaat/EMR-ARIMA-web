import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
    state: () => ({
        activeModule: 'registration',
        menuList: [],
        menuLoaded: false
    }),

    getters: {

        modules: (state) => {

            const map = new Map()

            state.menuList.forEach(item => {
                if (!map.has(item.module)) {
                    map.set(item.module, {
                        module: item.module,
                        moduleName: item.moduleName
                    })
                }
            })

            return Array.from(map.values())
        },

        sideMenus: (state) => {
            return state.menuList.filter(
                item => item.module === state.activeModule
            )
        }

    },

    actions: {

        setMenus(menus) {
            this.menuList = menus
            this.menuLoaded = true
        }

    }
})