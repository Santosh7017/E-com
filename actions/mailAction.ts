"use server";
import prisma from "@/libs/prismadb";
import { transporter } from "@/utils/nodemailer";
import { error } from "console";
import { nanoid } from "nanoid";

export async function mailAction({ email }: { email: string }) {
  console.log(email);
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    throw new Error("User not found");
  }
  const token = nanoid(32);


  await prisma.user.update({
    where: { email: email },
    data: { verifytoken: token },
  });


  
  const htmlBody = `Click here to <a href="http://localhost:3000/reset-password/${token}">Reset</a> Password`;
  try {
    const info = await transporter.sendMail({
      from: "smorya994@gmail.com", 
      to: email, 
      subject: "Password Reset", 
      text: "Hello world?", 
      html: htmlBody,
    });
    if (info) {
        //save token in the db
         
      return true;

    } else {
      return null;
    }
  } catch (error: any) {
    throw error;
  }
}
