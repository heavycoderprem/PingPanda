    import { router } from "../__internals/router";
    import { privateProcedure } from "../procedures";
    import Razorpay from "razorpay"
    import { z } from "zod";

    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
        key_secret: process.env.RAZORPAY_SECRET_ID ?? ""
    });


    export const paymentRouter = router({
        createCheckoutSession: privateProcedure
        .input(z.object({
            amount: z.number().min(1, "Amount must be positive")
        }))
        .mutation(async ({ c, input, ctx }) => {
            try {
            const order = await razorpay.orders.create({
                amount: input.amount * 100, // Convert to smallest currency unit
                currency: "INR",
                notes: {
                userId: ctx.user.id
                }
            });
    
            // Explicitly match the type expected by c.json()
            return c.json({ 
                success: true, 
                order 
            }, 200);
            } catch (error) {
            console.error("Razorpay order creation failed:", error);
            
            // Include explicit status code
            return c.json({ 
                success: false, 
                message: "Failed to create order" 
            }, 500);
            }
        }),
    });