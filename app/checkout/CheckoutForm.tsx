"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (Value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetpaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedprice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Success");
          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetpaymentIntent(null);
        }
        setIsLoading(false);
      });
  };

  return <form onSubmit={handleSubmit} id="payment-form">
    <div className="mb-6">
      <Heading title="Enter your Details to Complete Checkout" />
    </div>
    <h2 className="font-semibold  mb-2">
        Address Information
    </h2>
    <AddressElement options={{
      mode: 'shipping',
      allowedCountries: ['US', "IN"]
    }} />
    <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
    <PaymentElement id="payment-element" options={{layout: "tabs"}}/>
    <div className="py-4 text-center text-slate-700 text-xl font-bold">
      Total : {formattedprice}
    </div>
     <Button label={isLoading? 'processing': "pay Now"} disabled={isLoading || !stripe || !elements} onclick={() => {}}  />
  </form>;
};

export default CheckoutForm;
