import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
    try {
        const { name, email, message, recaptcha, subject } = await req.json();

        const recaptchaResponse = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
            { method : "POST"}
        );

        const recaptchaResult = await recaptchaResponse.json();

        if (!recaptchaResult.success) {
            return NextResponse.json(
                { message: "reCAPTCHA verification failed."},
                {status: 400}
            );
        }

        await addDoc(collection(db, "contactMessages"), {
            name: name,
            email: email,
            subject: subject || "Genel Destek",
            message: message,
            status: "unread",
            createdAt: serverTimestamp(),
        });

        const emailResponse = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "nextrade.support@gmail.com",
            subject: `Mail`,
            html:`
                <h2>Mail</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong>${email}</p>
                <p><strong>Message:</strong>${message}</p>
                `,
        });

        console.log("Email send:", emailResponse);
        return NextResponse.json({message: "Message Success!"}, { status: 200 });

    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({message: "Something went wrong."}, { status: 500 });
    }
}