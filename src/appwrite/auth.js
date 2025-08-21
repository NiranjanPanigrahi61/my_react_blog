import conf from "../config/conf";

import {Client,Account,ID} from "appwrite"

class AuthService{

    client = new Client()
    account;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);;
    }

    async createAccount({email, password, name}){
        try{
            const userAccount =await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                return this.login({email,password});
            }else{
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();

        } catch (error) {
            console.log("Appwrite Error :: getCurrentUser :: Error ::",error);  
        }

        return null;
    }

    async login({eamil,password}){
        try {
            return await this.account.createEmailPasswordSession(eamil,password);
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Error :: getCurrentUser :: Error ::",error);
        }
    }
}

const authService=new AuthService();

export default authService