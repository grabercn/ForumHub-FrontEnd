import { getAllForums } from "../ApiCalls/forumApiCalls";


// Get all forums as forumsData

try{
    var forumsData = await getAllForums();
}catch(error){
    console.error("Failed to fetch forum data"+error);
    forumsData = ["Failed to fetch forum data"];
}

export {forumsData};