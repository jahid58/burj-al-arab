import firebase from "firebase/app";
import "firebase/auth";




export const handleGoggle=()=>{
    const ggProvider = new firebase.auth.GoogleAuthProvider();
  return  firebase.auth().signInWithPopup(ggProvider)
    .then(res=>{
        const {displayName,email} = res.user;
        let newUser;
         newUser = {
            name:displayName,
            email:email,
            signUp:true,
           
        }  
        return newUser
    })
}
export const handleFb=()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider()
   return firebase.auth().signInWithPopup(fbProvider)
    .then(res=>{
        const {displayName,email} = res.user;
        let newUser;
         newUser = {
            name:displayName,
            email:email,
            signUp:true,
            }
        return newUser
        })
}
export const signUpEvent =(user)=>{
    const newUser = {...user}
   
       return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
     .then((userCredential) => {
      var res = userCredential.user;
      return res
  })  
}

export const handleSignIn=(user)=>{
    const newUser = {...user}
    
      return  firebase.auth().signInWithEmailAndPassword(newUser.email, newUser.password)
     .then((userCredential) => {
      var res = userCredential.user;
     return res
  })
  
}
export const handleSignOut=()=>{
    const newUser ={
        name:'',
        email:'',
        password:'',
        signUp:true,
        isValid:true
        }
        return newUser
}