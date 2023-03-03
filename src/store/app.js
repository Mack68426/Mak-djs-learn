import {defineStore} from 'pinia'

// option store

export const useAppStore = defineStore('app', {
    state: () => ({
        commandsActionMap: null,
        client: null,
    }),
    getters: {},
    actions: {},
})