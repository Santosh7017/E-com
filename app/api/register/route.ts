import bcrypt from "bcrypt";
import prisma from '@/libs/prismadb'
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";



export async function POST(request:Request) {
    const body = await request.json();
    const {name, email, password} = body
    const hashedPassword = await bcrypt.hash(password, 10)
    const token = nanoid(32);

    const user = await prisma.user.create({
        data: {
            name, email, hashedPassword, verifytoken:token
        }
    })
    return NextResponse.json(user)
}