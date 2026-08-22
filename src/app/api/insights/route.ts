import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { keyword, url } = body ?? {};

    if (!keyword || typeof keyword !== "string" || keyword.trim().length === 0) {
      return NextResponse.json({ error: "A keyword is required." }, { status: 400 });
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system:
        'You are an SEO analyst. Respond ONLY with valid JSON, no prose, matching exactly this shape: ' +
        '{"titleSuggestions": string[3], "contentGaps": string[2], "priority": "low"|"medium"|"high"}',
      messages: [
        {
          role: "user",
          content: `Keyword: ${keyword}\nURL: ${url ?? "not provided"}\nGive SEO improvement suggestions.`,
        },
      ],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from model");
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(textBlock.text);
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