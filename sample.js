import { Client, Databases } from "appwrite";

const client = new Client();

const databases = new Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('6617679f5c0eb645569f') // Your project ID
;


const promise = databases.listDocuments('661767c126a43868fb25', '661767e907e6c66b6f32');

promise.then(function (response) {
    console.log(response.documents); // Success
}, function (error) {
    console.log(error); // Failure
});