"use server"

import prisma from "@/libs/prismadb";
import bcrypt from 'bcrypt';
import {redirect} from "next/navigation";


export async function updatePassword({password, token}: {password:string, token: string}) {
   

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.findUnique({
        where: {
            verifytoken: token
        }
    });

    if (!user) {
        throw new Error('Invalid token');
    }

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            hashedPassword: hashedPassword,
            verifytoken: ""
        }
    });
    redirect("/login");
}