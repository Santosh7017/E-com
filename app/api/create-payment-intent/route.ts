import Stripe from 'stripe'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import { CartProductType } from '@/app/product/[productid]/ProductDetails';
import { getCurrentUser } from '@/actions/getCurrentUser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
});

const calculateOrderAmount  = (items: CartProductType[]) => {
const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity
    return acc + itemTotal
}, 0);
return totalPrice;
}

export async function POST(request: Request) {
    const currentuser = await getCurrentUser();
    if(!currentuser){
        return NextResponse.json({error: 'Unauthorized'}, {
            status: 401 
        })
    }
    const body = await request.json();
    const {items, payment_intent_id} = body;
    const total = calculateOrderAmount(items) * 100
    const orderData = {
        user: {connect: {id: currentuser.id}},
        amount: total,
        currency: 'inr',
        status: 'pending',
        deliveryStatus: "pending",
        paymentIntentId: payment_intent_id,
        products: items
    }

    if(payment_intent_id){
        //update the order

    }else {
        // create the intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'inr',
            automatic_payment_methods: {enabled: true}
        })
        //create the order
    }

}