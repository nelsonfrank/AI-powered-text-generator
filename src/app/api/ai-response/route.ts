import { Message } from "@/types";
import { prisma } from "@/lib/prisma";

import { OpenAIStream, OpenAIStreamPayload } from "@/utils/openAIStream";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
}


export async function POST(req: Request): Promise<Response> {
    const prompt = (await req.json()) as Message

    if (!prompt) {
        return new Response("No prompt in the request", { status: 400 });
    }

    const message = ` ${prompt.content}`;

    const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 1000,
        stream: true,
        n: 1,
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
}