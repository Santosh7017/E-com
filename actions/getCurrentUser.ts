import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth"
import prisma from "@/libs/prismadb"

export async function getSession() {
    return await getServerSession(authOptions); 
}

export async function getCurrentUser() {
    try {
        const session = await getSession();
        if(!session?.user?.email){
            return null
        }
         
        const currentuser = await prisma.user.findUnique ({
            where: {
                email: session?.user?.email
            },
            include : {
                orders: true
            }
        })

        if(!currentuser){
            return null;
        }

        return {
            ...currentuser,
            createdAt: currentuser.createdAt.toISOString(),
            updatedAt: currentuser.updatedAt.toISOString(),
            emailVerified: currentuser.emailVerified?.toString() || null
        }
    } catch (error: any) {
        return null
    }
}