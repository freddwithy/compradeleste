import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";

const schema = {
    type: SchemaType.OBJECT,
    properties: {
      results: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            store: {
              type: SchemaType.STRING
            },
            title: {
              type: SchemaType.STRING
            },
            img: {
              type: SchemaType.STRING
            },
            price: {
              type: SchemaType.STRING
            },
            link: {
              type: SchemaType.STRING
            }
          },
          required: [
            "store",
            "title",
            "img",
            "price"
          ]
        }
      }
    },
    required: [
      "results"
    ]
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, search } = body;
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: schema
    }; 
    // @ts-expect-error: GoogleGenerativeAI class is not properly typed, or process.env.GEMINI_API_KEY is not properly defined
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });

    

    const prompt = `Read these response: ${JSON.stringify(data)}} and find the best results for the search query: ${search}, give me a json response and only return the JSON response. Do not add any extra text. Make the price format better like this for example: Gs. 1.000.000, the stores are Nissei, Mobile Zone, Cell Shop. Don't forget to add the stores. Be consistant with the JSON, don't add any extra text.`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const output = response.text()

    const JsonFormat = JSON.parse(output);
    const { results } = JsonFormat;

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error, message: "Something went wrong" });
  }
}
