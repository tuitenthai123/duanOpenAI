import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from "openai"

const configuration = new Configuration ({
    apiKey: process.env.API_OPEN_AI,
});

const openai = new OpenAIApi(configuration);

const instrustionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "You are a code generator. you must answer only in markdown code snippets. Use code comments for explanations"
}

export async function POST(
    req: Request){
        try{
            const {userId} = auth();
            const body = await req.json();
            const {prompt,amount=1,resolution="521x521"} = body;

            if(!userId){
                return new NextResponse("Unauthorized",{status:401})
            }
            if(!configuration.apiKey){
                return new NextResponse("OpenAi API Key False",{status:500})
            }
            if(!prompt){
                return new NextResponse("Prompt is required",{status:400})
            }
            if(!resolution){
                return new NextResponse("resolution is required",{status:400})
            }
            if(!amount){
                return new NextResponse("amount is required",{status:400})
            }
            const response = await openai.createImage({
                prompt,
                n: parseInt(amount,10),
                size: resolution,
            });
            return NextResponse.json(response.data.data)
        }catch(error){
            console.log("[IMAGE_ERROR]",error)
            return new NextResponse("Internal error",{status:500});
        };
    }
