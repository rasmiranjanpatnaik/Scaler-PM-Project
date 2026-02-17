import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: NextRequest) {
  let prompt = 'Project tasks'
  let existingTasks: string[] = []

  // Parse request body once
  try {
    const body = await request.json()
    prompt = body.prompt || prompt
    existingTasks = body.existingTasks || []
  } catch {
    // If parsing fails, use defaults
  }

  // Helper function to generate fallback tasks
  const generateFallbackTasks = (userPrompt: string) => [
    `${userPrompt} - Research phase`,
    `${userPrompt} - Planning phase`,
    `${userPrompt} - Execution phase`,
    `${userPrompt} - Review phase`,
  ]

  // If no API key, return fallback
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ tasks: generateFallbackTasks(prompt) })
  }

  try {
    const systemPrompt = `You are a helpful project management assistant. Generate a concise list of actionable tasks based on the user's request. 
Return ONLY a JSON array of task titles (strings), nothing else. Each task should be specific and actionable.
${existingTasks.length > 0 ? `Avoid duplicating these existing tasks: ${existingTasks.join(', ')}` : ''}
Generate 4-6 tasks.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 300,
    })

    const content = completion.choices[0]?.message?.content || ''
    
    // Try to parse JSON from the response
    let tasks: string[] = []
    try {
      // Remove markdown code blocks if present
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      tasks = JSON.parse(cleanedContent)
    } catch {
      // Fallback: Split by lines or commas
      tasks = content
        .split('\n')
        .map(line => line.replace(/^[-*•]\s*/, '').replace(/^\d+\.\s*/, '').trim())
        .filter(line => line.length > 0)
        .slice(0, 6)
    }

    if (!Array.isArray(tasks) || tasks.length === 0) {
      // Ultimate fallback
      tasks = generateFallbackTasks(prompt)
    }

    return NextResponse.json({ tasks: tasks.slice(0, 6) })
  } catch (error) {
    console.error('OpenAI API error:', error)
    // Return fallback tasks on any error
    return NextResponse.json({ tasks: generateFallbackTasks(prompt) })
  }
}

