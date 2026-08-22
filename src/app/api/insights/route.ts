import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { keyword, url } = body ?? {};

    if (!keyword || typeof keyword !== "string" || keyword.trim().length === 0) {
      return NextResponse.json({ error: "A keyword is required." }, { status: 400 });
    }

    const response = await ai.models.generateContent({
     model: "gemini-3.6-flash",
      contents: `You are an SEO analyst. Respond ONLY with valid JSON, no prose, matching exactly this shape: {"titleSuggestions": string[3], "contentGaps": string[2], "priority": "low"|"medium"|"high"}.

Keyword: ${keyword}
URL: ${url ?? "not provided"}
Give SEO improvement suggestions.`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text response from model");
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Model did not return valid JSON");
    }

    return NextResponse.json({ insights: parsed });
  } catch (err) {
    console.error("Insights API error:", err);
    return NextResponse.json(
      { error: "Couldn't generate insights right now. Please try again." },
      { status: 500 }
    );
  }
}