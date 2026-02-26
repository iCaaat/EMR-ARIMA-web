import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
    state: () => ({
        activeModule: 'registration' // 默认模块
    })
})