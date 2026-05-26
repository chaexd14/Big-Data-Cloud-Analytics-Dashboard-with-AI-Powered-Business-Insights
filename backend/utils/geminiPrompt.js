export const buildPrompt = (data) => {
    return `
You are a business analytics expert.

Analyze the following food delivery data and generate:

1. Key trends
2. Top performing category
3. Customer behavior insights
4. Business recommendations

Dataset:
${JSON.stringify(data.slice(0, 20))}

Generate concise insights.
`;
};