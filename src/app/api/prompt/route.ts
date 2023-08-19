import { Message } from "@/types";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const prompt = (await req.json()) as Message

    console.log(prompt)
    if (!prompt) {
        return new Response("No prompt in the request", { status: 400 });
    }

    const message = await prisma.message.create({
        data: {
            receiverId: prompt.receiverId,
            text: prompt.content,
            senderId: prompt.senderId
        }
    });

    if (!message) return null;

    return NextResponse.json(message)
}