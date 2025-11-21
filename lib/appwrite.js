import { Client, Account } from "react-native-appwrite";

export const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('691b4198001721031f87')
    .setPlatform('multi-sided-commerce')

export const account = new Account(client);


