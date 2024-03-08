import { reactive } from "vue"
const language = reactive({
    active: 'th'
})
export const set = (lang) => {
    language.active = lang.toLowerCase()
    localStorage.setItem('language', language.active)
}

export const get = (languageObjects) => {
    if(localStorage.getItem('language')) {
        language.active = localStorage.getItem('language')
    } 
    return languageObjects[language.active]
}

export const active = () => {
    if(localStorage.getItem('language')) {
        language.active = localStorage.getItem('language')
    } 
    return language.active
}