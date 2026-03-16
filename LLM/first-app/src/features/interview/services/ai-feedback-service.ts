import { evaluateAnswer } from './interview-engine'
import type { FeedbackResult, InterviewRole } from '../types/interview'

interface AiFeedbackInput {
	role: InterviewRole
	question: string
	answer: string
}

interface OpenAiChoiceMessage {
	content?: string
}

interface OpenAiChoice {
	message?: OpenAiChoiceMessage
}

interface OpenAiResponse {
	choices?: OpenAiChoice[]
}

function normalizeArray(value: unknown) {
	if (!Array.isArray(value)) {
		return []
	}
	return value.filter((item): item is string => typeof item === 'string').slice(0, 3)
}

function parseFeedback(content: string): FeedbackResult | null {
	try {
		const parsed = JSON.parse(content) as Partial<FeedbackResult>
		if (typeof parsed.score !== 'number' || typeof parsed.verdict !== 'string') {
			return null
		}

		return {
			score: Math.max(0, Math.min(100, Math.round(parsed.score))),
			verdict: parsed.verdict,
			strengths: normalizeArray(parsed.strengths),
			improvements: normalizeArray(parsed.improvements),
			followUpQuestion:
				typeof parsed.followUpQuestion === 'string'
					? parsed.followUpQuestion
					: 'How would you validate this approach in a real production environment?'
		}
	} catch {
		return null
	}
}

export async function getAiFeedback(input: AiFeedbackInput): Promise<FeedbackResult> {
	const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined
	const baseUrl = (import.meta.env.VITE_OPENAI_BASE_URL as string | undefined) ?? 'https://api.openai.com/v1'
	const model = (import.meta.env.VITE_OPENAI_MODEL as string | undefined) ?? 'gpt-4o-mini'

	if (!apiKey) {
		return evaluateAnswer({
			role: input.role,
			answer: input.answer
		})
	}

	const response = await fetch(`${baseUrl}/chat/completions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model,
			temperature: 0.4,
			messages: [
				{
					role: 'system',
					content:
						'You are a Senior Technical Interviewer. Return strict JSON only with fields: score (0-100), verdict, strengths (string[]), improvements (string[]), followUpQuestion.'
				},
				{
					role: 'user',
					content: `Role: ${input.role.label}\nFocus areas: ${input.role.focusAreas.join(', ')}\nQuestion: ${input.question}\nCandidate answer: ${input.answer}`
				}
			]
		})
	})

	if (!response.ok) {
		return evaluateAnswer({
			role: input.role,
			answer: input.answer
		})
	}

	const payload = (await response.json()) as OpenAiResponse
	const content = payload.choices?.[0]?.message?.content ?? ''
	const parsed = parseFeedback(content)

	if (!parsed) {
		return evaluateAnswer({
			role: input.role,
			answer: input.answer
		})
	}

	return parsed
}
