


import { GoogleGenAI, Type } from "@google/genai";
import type { Sector, Role, QuestionnaireAnswers, BriefData, UserProfile, ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    // This will not throw in the target environment, but is good practice
    console.warn("API_KEY environment variable not set. Using mock data is recommended as a fallback.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        keyChanges: {
            type: Type.ARRAY,
            description: "Top 2-3 budget announcements affecting the user's sector.",
            items: { type: Type.STRING }
        },
        risks: {
            type: Type.ARRAY,
            description: "2 key challenges or risks for the user to watch out for.",
            items: { type: Type.STRING }
        },
        opportunities: {
            type: Type.ARRAY,
            description: "2-3 actionable opportunities arising from the budget.",
            items: { type: Type.STRING }
        },
        schemesAndIncentives: {
            type: Type.ARRAY,
            description: "Relevant government schemes and incentive programs.",
            items: { type: Type.STRING }
        },
        nextSteps: {
            type: Type.ARRAY,
            description: "3 immediate, actionable next steps for the user.",
            items: { type: Type.STRING }
        },
        whatGotCheaper: {
            type: Type.ARRAY,
            description: "A list of consumer categories where prices might decrease due to budget announcements, personalized to the user's profile.",
            items: {
                type: Type.OBJECT,
                properties: {
                    categoryName: {
                        type: Type.STRING,
                        description: "The name of the category (e.g., 'Consumer Electronics', 'Automobiles')."
                    },
                    items: {
                        type: Type.ARRAY,
                        description: "A list of specific items within this category.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: {
                                    type: Type.STRING,
                                    description: "The name of the specific item (e.g., 'Smartphones')."
                                },
                                reason: {
                                    type: Type.STRING,
                                    description: "A brief, clear explanation of why this item got cheaper because of the budget."
                                },
                                icon: {
                                    type: Type.STRING,
                                    description: "The name of an icon to represent this item. Choose one from: 'Smartphone', 'Car', 'Tv', 'PiggyBank', 'Coins'."
                                }
                            },
                            required: ["name", "reason", "icon"]
                        }
                    }
                },
                required: ["categoryName", "items"]
            }
        }
    },
    required: ["keyChanges", "risks", "opportunities", "schemesAndIncentives", "nextSteps", "whatGotCheaper"]
};

export const generateBrief = async (
    sector: Sector,
    role: Role,
    answers: QuestionnaireAnswers
): Promise<BriefData> => {
    const { companySize, primaryConcern, geographicFocus, plannedPurchase, investmentArea } = answers;

    const prompt = `
        You are an expert economic analyst for The Economic Times, specializing in the Indian budget.
        A user has identified as a ${role.name} in the ${sector.name} sector.
        
        Their profile details are:
        - Company Size/Stage: ${companySize}
        - Primary Concern: ${primaryConcern}
        - Geographic Focus: ${geographicFocus}
        - Next planned big purchase: ${plannedPurchase}
        - Primary investment area: ${investmentArea}

        Based on a hypothetical new Union Budget, generate a personalized report for this user.
        The report should contain two parts:
        1. A 5-point impact brief for their professional life. The tone should be insightful, authoritative, and provide clear, actionable advice. Focus on the most relevant, impactful points for this specific user profile.
        2. A "What Got Cheaper" section for their personal life. Based on their profile and interests (like planned purchases and investments), identify 2-3 categories of consumer goods or services that may get cheaper due to budget announcements. For each category, provide 1-2 specific example items, a simple reason for the price change, and a relevant icon name.

        Your response MUST be a valid JSON object matching the provided schema. Do not include any introductory text, explanations, or markdown formatting outside of the JSON structure.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.5,
            }
        });

        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        
        // Basic validation to ensure the structure matches
        if (
            !parsedData.keyChanges ||
            !parsedData.risks ||
            !parsedData.opportunities ||
            !parsedData.schemesAndIncentives ||
            !parsedData.nextSteps ||
            !parsedData.whatGotCheaper
        ) {
            throw new Error("Generated JSON is missing required fields.");
        }

        return parsedData as BriefData;

    } catch (error) {
        console.error("Error generating brief with Gemini:", error);
        throw new Error("Failed to generate brief from the AI model.");
    }
};

// FIX: Add generateChatReportStream function for the AI assistant feature.
export const generateChatReportStream = async (
    profile: UserProfile,
    history: ChatMessage[]
) => {
    const { role, incomeBracket, primaryConcern } = profile;
    const latestUserMessage = history[history.length - 1]?.text || "Give me the full report.";

    const prompt = `
        You are an expert economic analyst for The Economic Times, specializing in the Indian budget.
        A user has identified their profile as:
        - Role: ${role}
        - Income Bracket: ${incomeBracket}
        - Primary Concern: ${primaryConcern}

        The user's current request is: "${latestUserMessage}".
        
        Previous conversation history:
        ${history.slice(0, -1).map(m => `${m.sender === 'ai' ? 'Analyst' : 'User'}: ${m.text}`).join('\n')}

        Based on a hypothetical new Union Budget and the user's profile and request, generate a personalized, detailed, and clear report.
        Use markdown for formatting (e.g., **bolding**, ## Headings, * list items).
        Address the user's latest query directly and comprehensively, while keeping their overall profile in mind.
        Do not repeat the user's profile in your response. Be conversational but authoritative.
    `;

    try {
        const response = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.6,
            }
        });
        
        return response;

    } catch (error) {
        console.error("Error generating chat stream with Gemini:", error);
        throw new Error("Failed to generate chat report from the AI model.");
    }
};
