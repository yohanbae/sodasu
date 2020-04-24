// import Rebase from 're-base';
import firebase from "firebase";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: "914604649889",
    appId: process.env.REACT_APP_ID,
    measurementId: "G-H09VWD76TE"
}


firebase.initializeApp(config);
// const base = Rebase.createClass(app.database());
export default firebase;
// export {base};