// // src/lib/auth.js
// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { MongoClient } from "mongodb";

// // ১. MongoClient ইনিশিয়ালাইজ করুন
// const client = new MongoClient(process.env.MONGODB_URI);

// // ২. ডাটাবেস 'tutor' কানেক্ট করুন
// const db = client.db("tutor");

// export const auth = betterAuth({
//     // ৩. ডাটাবেস অ্যাডাপ্টারে db এবং client উভয়ই পাস করুন
//     database: mongodbAdapter(db, {
//         client, 
//     }),
    
//     socialProviders: {
//         google: { 
//             clientId: process.env.GOOGLE_CLIENT_ID, 
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
//         }, 
//     },
// });

// src/lib/auth.js
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("tutor");

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: { enabled: true },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
});