import { defineStore } from 'pinia'
/* eslint-disable camelcase */
import jwt_decode from 'jwt-decode'
import appConfig from '~~/app.config'

// We cannot use app config yet as it is not yet hydrated
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: '',
            user: {
                name: '',
                email: '',
            }, // User profile - name, pics, ..
        }
    },
    actions: {
        async setToken(token: string) {
            this.token = token
            if (!this.token) return
            // We can call getUser from server
            await this.getUserFromServer()
            return this.user
        },
        async getUserFromServer() {
            const user: any = await $fetch(appConfig.userPrefsGetURL, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
            this.user = user
        },
        deleteToken() {
            this.token = ''
            this.user = {}
        },
        isLoggedIn() {
            return Boolean(ref(this.token))
        },
        getTokenData() {
            const token = this.token
            if (!token) throw new Error(`User not logged in`)
            return jwt_decode(token)
        },
    },
    persist: {
        storage: persistedState.localStorage,
    },
})
