module.exports = async function handler(req, res) {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    console.log('API handler called:', req.method, req.url);
    
    // 处理OPTIONS请求
    if (req.method === 'OPTIONS') {
        console.log('Handling OPTIONS request');
        return res.status(200).end();
    }
    
    // 只允许POST请求，其他方法返回405
    if (req.method !== 'POST') {
        console.log('Method not allowed:', req.method);
        return res.status(405).json({ error: 'Method not allowed. Only POST requests are supported.' });
    }

    try {
        console.log('API request received:', req.method, req.url);
        console.log('Request body:', JSON.stringify(req.body, null, 2));
        
        const { topic, contentRequirements, rhythmRequirements, otherRequirements, referenceLyrics } = req.body;

        // 验证必需参数
        if (!topic || !contentRequirements) {
            console.log('Missing required fields:', { topic, contentRequirements });
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // 从环境变量获取API密钥
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            console.error('API key not configured in environment variables');
            return res.status(500).json({ error: 'API key not configured' });
        }
        
        console.log('API key found, proceeding with request');

        const apiUrl = 'https://api.siliconflow.cn/v1/chat/completions';

        // 构建提示词
        const basePrompt = `# Character Profile
You are a highly talented and globally renowned rapper, skilled in various styles. Your lyrics are known for their sharp rhymes, clever puns, and profound storytelling. 

# Task Description
Generate rap lyrics based on the provided theme, style and keywords by the user. 

# Specific Requirements and Constraints`;

        // 韵律要求默认值
        const defaultRhythmRequirements = `- Use a rhyming structure of AABB or ABAB.
- Try to use internal rhymes and polysyllabic rhymes as much as possible.
- Each line should roughly consist of 8 to 12 syllables to maintain a sense of rhythm.`;

        // 其他要求默认值
        const defaultOtherRequirements = `- The lyrics must contain a brief storyline.
- There must be a powerful "punchline" in the last four lines to serve as the conclusion.
- Incorporate the following slang naturally: [List some slangs, such as: on the grind, making moves, no cap, etc.]
- Avoid using clichés and strive for originality and impact.`;

        const requirements = [
            `1. **Topic:** ${topic}`,
            `2. **Content Requirements:** ${contentRequirements}`,
            rhythmRequirements ? `3. **Rhythm Requirements:** ${rhythmRequirements}` : `3. **Rhythm Requirements:** 
${defaultRhythmRequirements}`,
            otherRequirements ? `4. **Other Requirements:** ${otherRequirements}` : `4. **Other Requirements:** 
${defaultOtherRequirements}`,
            referenceLyrics ? `5. **Reference Lyrics:** ${referenceLyrics}` : ''
        ].filter(req => req).join('\n\n');

        const fullPrompt = `${basePrompt}\n\n${requirements}`;

        const requestBody = {
            model: "deepseek-ai/DeepSeek-R1-0528-Qwen3-8B",
            messages: [
                {
                    role: "user",
                    content: fullPrompt
                }
            ],
            max_tokens: 1000,
            temperature: 0.7
        };

        console.log('Making request to SiliconFlow API...');
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        console.log('API response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API request failed:', response.status, response.statusText, errorText);
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API response received successfully');
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            console.log('Returning successful response');
            return res.status(200).json({ 
                success: true, 
                lyrics: data.choices[0].message.content 
            });
        } else {
            console.error('Invalid API response format:', JSON.stringify(data, null, 2));
            throw new Error('Invalid API response format');
        }

    } catch (error) {
        console.error('Error generating rap lyrics:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).json({ 
            success: false, 
            error: error.message || 'Internal server error',
            timestamp: new Date().toISOString()
        });
    }
}
