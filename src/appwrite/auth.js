import config from "../config/config.js"
import {Client, Account , ID} from "appwrite";

//DOC CODE 
// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');                 // Your project ID

// const account = new Account(client);

// const promise = account.createEmailSession('email@example.com', 'password');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });
// Improving code : FUTURE PROOF CODE 

export class AuthService{
  client = new Client();
  account; 

  constructor(){
    this.client
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({email, password, name}){
    try {
      const userAccount =  await this.account.create(ID.unique(), email, password, name)

      if(userAccount){
        // call another method 
        return this.login({email,password});
      }else {
        return userAccount;
      }
    } catch (error) {
      throw new error;
    }
  }

  async login({email, password}){
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
    return null;
  }

  async logout (){
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }

} 

const authService = new AuthService();


export default authService;


