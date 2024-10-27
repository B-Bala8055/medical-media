import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";
import YandexProvider from "next-auth/providers/yandex";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    respone_type: "code"
                }
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID,
            clientSecret: process.env.YANDEX_CLIENT_SECRET
        })
    ]
})