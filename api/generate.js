import { OpenAI } from "openai";

export const config = {
    runtime: 'edge', // Using Edge Runtime for speed, optional but recommended
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: "Server misconfiguration: API Key missing" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { channelName, complexity, language, messageCount, scenarioType, availableEmotes } = await req.json();

        const openai = new OpenAI({
            apiKey: apiKey,
        });

        let prompt = "";

        if (scenarioType) {
            // SCENARIO MODE PROMPTS
            const scenarios = {
                jumpscare: `Generate 40 VERY PANICKED Twitch chat messages reacting to a JUMPSCARE.
                        Use caps lock, "WutFace", "monkaS", "monkaW", "WTF", "SCREAMER". 
                        Messages should be short, screaming, and chaotic.`,
                hype: `Generate 40 EXTREMELY HYPE Twitch chat messages.
                   Use "PogChamp", "LETS GO", "EZ", "Clap", "Winner", "GG". 
                   The streamer just did something amazing. High energy.`,
                toxic: `Generate 40 TOXIC/ROAST Twitch chat messages. 
                    Use "L", "Ratio", "Noob", "So bad", "???", "Cringe". 
                    The streamer failed or missed a shot. Mean but funny.`
            };
            prompt = `You are a Twitch Chat Simulator.
        ${scenarios[scenarioType]}
        Language: Keep it mostly English/Internet Slang but mix if needed.
        Use these emotes: ${availableEmotes}.
        Return ONLY a raw JSON array of objects: { "username": string, "messageText": string, "isVip": boolean, "isSub": boolean }`;
        } else {
            // STANDARD MODE PROMPT
            let complexityPrompt = "";
            if (complexity === "simple") {
                complexityPrompt = `Keep messages VERY short. mostly 1-3 words. Use emotes like ${availableEmotes}.`;
            } else if (complexity === "mixed") {
                complexityPrompt = `Mix short slang (50%) with short sentences. Use emotes frequently: ${availableEmotes}.`;
            } else if (complexity === "complex") {
                complexityPrompt = `Generate longer messages but still use emotes: ${availableEmotes}.`;
            }

            const langPrompt = language === 'es' ? 'Spanish (Argentina/Spain/Latin America mix)' : 'English (Internet/Twitch Slang)';

            prompt = `You are a Twitch Chat Simulator. 
        Generate ${messageCount} realistic twitch chat messages for channel: "${channelName}".
        Vibe: Hype, fast, spammy, reactions.
        Language: ${langPrompt}.
        Complexity Level: ${complexity}. ${complexityPrompt}
        
        IMPORTANT: Use specific emotes from this list freely: ${availableEmotes}.
        
        Return ONLY a raw JSON array of objects:
        - username: string (realistic nicks)
        - messageText: string
        - isVip: boolean (rare, < 5% chance)
        - isSub: boolean (common, ~20% chance)
        `;
        }

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-4o-mini",
        });

        const content = completion.choices[0].message.content;
        const jsonStr = content.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonStr);

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Failed to generate chat", details: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
