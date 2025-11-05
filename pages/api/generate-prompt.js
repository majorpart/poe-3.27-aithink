module.exports = async function handler(req, res) {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // 处理OPTIONS请求
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Only POST requests are supported.' });
    }

    try {
        const { topic, contentRequirements, rhythmRequirements, otherRequirements, referenceLyrics } = req.body;
        if (!topic || !contentRequirements) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'API key not configured' });
        }

        const apiUrl = 'https://api.siliconflow.cn/v1/chat/completions';

        const basePrompt = `# Character Profile\nYou are a highly talented and globally renowned rapper, skilled in various styles. Your lyrics are known for their sharp rhymes, clever puns, and profound storytelling. \n\n# Task Description\nGenerate rap lyrics based on the provided theme, style and keywords by the user. \n\n# Specific Requirements and Constraints`;

        const defaultRhythmRequirements = `- Use a rhyming structure of AABB or ABAB.\n- Try to use internal rhymes and polysyllabic rhymes as much as possible.\n- Each line should roughly consist of 8 to 12 syllables to maintain a sense of rhythm.`;
        const defaultOtherRequirements = `- The lyrics must contain a brief storyline.\n- There must be a powerful "punchline" in the last four lines to serve as the conclusion.\n- Incorporate the following slang naturally: [List some slangs, such as: on the grind, making moves, no cap, etc.]\n- Avoid using clichés and strive for originality and impact.`;

        const requirements = [
            `1. **Topic:** ${topic}`,
            `2. **Content Requirements:** ${contentRequirements}`,
            rhythmRequirements ? `3. **Rhythm Requirements:** ${rhythmRequirements}` : `3. **Rhythm Requirements:** \n${defaultRhythmRequirements}`,
            otherRequirements ? `4. **Other Requirements:** ${otherRequirements}` : `4. **Other Requirements:** \n${defaultOtherRequirements}`,
            referenceLyrics ? `5. **Reference Lyrics:** ${referenceLyrics}` : ''
        ].filter(Boolean).join('\n\n');

        const fullPrompt = `${basePrompt}\n\n${requirements}`;

        const requestBody = {
            model: 'deepseek-ai/DeepSeek-R1-0528-Qwen3-8B',
            messages: [{ role: 'user', content: fullPrompt }],
            max_tokens: 1000,
            temperature: 0.7
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed: ${response.status} ${response.statusText} ${errorText}`);
        }

        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return res.status(200).json({ success: true, lyrics: data.choices[0].message.content });
        }

        throw new Error('Invalid API response format');
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message || 'Internal server error' });
    }
}


