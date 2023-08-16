const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();


interface User{
  name:String;
  type:Number;
}

const user : User = {name:"mukesh",type: 12}
console.log(user)

// db.collection("test").add({
//   name:"this is test addition"
// })
// .then(res =>{
//   console.log(res._path.segments[1])
// })
// https://firebase.google.com/docs/storage/web/start