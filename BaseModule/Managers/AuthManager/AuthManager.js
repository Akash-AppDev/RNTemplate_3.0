import '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

/**
 * This is a wrapper class over FirebaseAuth Module. 
 * This wrapper is written with the thought that "If we move out of Firebase
 * in the future, the app modules need not make any changes"
 */
export default class AuthManager {

    static auth = firebase.auth();

    /**
     * A boolean indicating whether the user has logged in or not using firebase.
     * During app launch, rely on this boolean to decide the flow
     */
    static isUserLoggedIn = () => this.auth.currentUser != null;

    /**
     * Sign in into firebase using the given email and password. 
     * The client is responsible for validating the email format. 
     * Additionally, firebase checks for email address format
     * @param {*} email 
     * @param {*} password 
     */
    static login = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    /**
     * Creates a user account with the given email address is firebase. 
     * If the email already exists, the promise resolves to an error. 
     * If the sign up is success, the user is logged in by default.
     * @param {*} email 
     * @param {*} password 
     */
    static createAccount = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    /**
     * Triggers a password reset email for the given account identified by email address
     * @param {*} email 
     */
    static resetPassword = (email) => this.auth.sendPasswordResetEmail(email);

    /**
     * Signs out the user from firebase
     */
    static signOut = () => this.auth.signOut();
}