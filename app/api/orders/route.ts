import { getCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb'
import { NextRequest, NextResponse } from "next/server";




export async function PUT(request:NextRequest) {
    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error();

    if(currentUser.role !== 'ADMIN'){
        return NextResponse.error();
    }

    const body = await request.json();
    const {id, deliveryStatus} = body;
    const order = await prisma.order.update({
        where: {id: id},
        data: {deliveryStatus}
    });

    return NextResponse.json(order); 
    
}