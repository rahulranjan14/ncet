import axios from 'axios'
import {API} from '../backend'

export const signupFunction = user => {
    // console.log("signup backend triggereed")
    return fetch(`${API}/signup`, {
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const signinFunction = user => {
    // console.log("signin backend triggereed")
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const authenticate = (data, next) => {
    // console.log("authenticate backend triggereed")
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
}

export const signout = next => {
    // console.log("signout backend triggereed")
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next();

        return fetch(`${API}/signout`, {
            method: "GET"
        })
        .then(response => console.log("signout successfull"))
        .catch(err => console.log(err))
    }
}


export const isAuthenticated = () => {
    // console.log("isauthenticate backend triggereed")
    
    if (typeof window == "undefined") {
      return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else{
        return false;
    }
}