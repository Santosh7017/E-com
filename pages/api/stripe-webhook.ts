import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import prisma from "@/libs/prismadb";


export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buff = await buffer(req);
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return res.status(400).send("Missing the stripe signature");
  }
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buff,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return res.status(400).send("Webhook error" + error);
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge = event.data.object as Stripe.Charge;
        
          
         
          
          
      if (typeof charge.payment_intent === "string") {
        await prisma?.order.update({  
          where: {
            paymentIntentId: charge.payment_intent,
          },
          // data: { status: "completed", address: charge.shipping?.address },
          data: {status: "completed",
           address: {
            city: charge.shipping?.address?.city as string,
            country: charge.shipping?.address?.country as string,
            line1: charge.shipping?.address?.line1 as string,
            line2: charge.shipping?.address?.line2 as string ? charge.shipping?.address?.line2 as string: " " ,
            postal_code : charge.shipping?.address?.postal_code as string,
            state       : charge.shipping?.address?.state as string
            
            
          }
        },
        }).then((data) => {
          console.log("prisma status",data.status);
          
        })
      }
      break;

    default:
      console.log("Unhandled event type:" + event.type);
  }
  res.json({ received: true });
}
