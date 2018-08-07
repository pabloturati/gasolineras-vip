import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';


const config = {
  apiKey: "AIzaSyC8TOLEcsuwnpDC4kRtwtI4ISYN4Pf5n3Q",
  authDomain: "modulo3project.firebaseapp.com",
  databaseURL: "https://modulo3project.firebaseio.com",
  projectId: "modulo3project",
  storageBucket: "modulo3project.appspot.com",
  messagingSenderId: "870474498839"
};
firebase.initializeApp(config);

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  url = 'http://localhost:3000/'
  constructor() { }
  provider = new firebase.auth.FacebookAuthProvider()
  googleProvider = new firebase.auth.GoogleAuthProvider()

  loginWithFacebook(){
    return firebase.auth().signInWithPopup(this.provider)
    .then(snap=>{
      //console.log(snap)
      //localStorage.setItem('facebookToken', JSON.stringify(snap.credential.accessToken) )
      localStorage.setItem('user', JSON.stringify(snap.user))      
      this._sendTokenToBackend(snap)        
      return snap
      //return snap
    })
  }

  loginWithGoogle(){
    firebase.auth().signInWithPopup(this.googleProvider)
    .then(snap=>{
      console.log(snap.user)
    })
  }

  _sendTokenToBackend(snap){
    const token = snap.credential.accessToken
    fetch(this.url + 'facebook/login', {
      method:'post',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }) 
    .then(r=>{
      if(!r.ok) throw new Error()
      return r.json()
     
    })
    .then(res=>{
      return res
    }) 
  }
}
