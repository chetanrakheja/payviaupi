import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth"
// import { prismaClient } from "@/app/lib/db";
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET ?? "secret",
    callbacks: {
        async signIn(params) {
            if (!params.user.email) {
                return false;
            }

            try {
                
                await dbConnect();
                const user = await UserModel.findOne({ email: params.user.email });
                
                if (!user) {
                    console.log("Creating user")
                    let username_temp = params.user.email.split('@')[0];
                    let linkvar = new UserModel({
                        id: params.user.id,
                        email: params.user.email,
                        username: username_temp,
                        name: params.user.name,
                        image: params.user.image,
                        provider: "Google"
                    });
              
                    let response =   await linkvar.save();
                    console.log(response)
                }
             } catch(e) {
                console.log("Error in creating user");
                console.log(e);
             }
            return true;
        }
    }
})

export { handler as GET, handler as POST }