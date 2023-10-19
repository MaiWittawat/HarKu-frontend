import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth',{
    state: ()=>{
        return {
            token: "",
            user: {name:"", email:"",id: null}
        }
    },
    getters: {
        isLogin: (state) => state.token !== ""
    },
    actions: {
        setNewToken(token: string){
            this.token = token
        },
        setUser(name:string, email:string, id:any){
            this.user.name = name
            this.user.email = email
            this.user.id = id
        },
        clear(){
            this.token = ''
            this.user.email = ''
            this.user.name = ''
            this.user.id = null
        }
    },
    persist: true
})
