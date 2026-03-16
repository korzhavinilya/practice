import type { FeedbackResult, InterviewRole } from '../types/interview'

export const roles: InterviewRole[] = [
	{
		id: 'java-dev',
		label: 'Java Developer',
		focusAreas: ['java', 'spring', 'oop', 'jvm', 'testing', 'api'],
		sampleQuestion:
			'How would you design a resilient Spring Boot service for high-throughput order processing?'
	},
	{
		id: 'devops',
		label: 'DevOps Engineer',
		focusAreas: ['ci', 'cd', 'kubernetes', 'terraform', 'monitoring', 'incident'],
		sampleQuestion:
			'Explain your strategy for building a reliable CI/CD pipeline for multiple microservices.'
	},
	{
		id: 'frontend',
		label: 'Frontend Engineer',
		focusAreas: ['react', 'performance', 'accessibility', 'state', 'testing', 'ux'],
		sampleQuestion:
			'How do you keep a complex React application scalable while maintaining strong UX and performance?'
	},
	{
		id: 'qa',
		label: 'QA Automation Engineer',
		focusAreas: ['automation', 'test strategy', 'regression', 'api testing', 'coverage', 'risk'],
		sampleQuestion:
			'How do you balance automation speed, test reliability, and useful regression coverage in CI?'
	}
]

interface EvaluationInput {
	role: InterviewRole
	answer: string
}

function clampScore(score: number) {
	if (score < 0) {
		return 0
	}
	if (score > 100) {
		return 100
	}
	return Math.round(score)
}

function splitWords(input: string) {
	return input
		.toLowerCase()
		.replace(/[^\w\s-]/g, ' ')
		.split(/\s+/)
		.filter(Boolean)
}

function getVerdict(score: number) {
	if (score >= 85) {
		return 'Strong senior-level answer with clear depth and practical reasoning'
	}
	if (score >= 70) {
		return 'Solid answer with good fundamentals; deepen trade-off discussion'
	}
	if (score >= 50) {
		return 'Decent baseline answer; needs more structure and technical specificity'
	}
	return 'Answer is too shallow for a senior interview; expand examples and decisions'
}

export function evaluateAnswer({ role, answer }: EvaluationInput): FeedbackResult {
	const words = splitWords(answer)
	const uniqueWords = new Set(words)
	const keywordHits = role.focusAreas.filter((keyword) => uniqueWords.has(keyword)).length
	const keywordScore = (keywordHits / role.focusAreas.length) * 45

	const lengthScore = Math.min(words.length / 90, 1) * 20
	const hasStructure = /\b(first|second|finally|trade-off|because|therefore)\b/i.test(answer)
	const structureScore = hasStructure ? 15 : 6

	const hasPracticalSignals = /\b(example|production|incident|latency|cost|security|test)\b/i.test(answer)
	const practicalScore = hasPracticalSignals ? 20 : 9

	const score = clampScore(keywordScore + lengthScore + structureScore + practicalScore)
	const strengths: string[] = []
	const improvements: string[] = []

	if (keywordHits >= 3) {
		strengths.push(`You covered key ${role.label} concepts relevant to the role`)
	} else {
		improvements.push(`Include more role-specific terms: ${role.focusAreas.slice(0, 4).join(', ')}`)
	}

	if (hasStructure) {
		strengths.push('Your answer has a clear structure and reasoning flow')
	} else {
		improvements.push('Organize your answer into context, decisions, and measurable outcomes')
	}

	if (hasPracticalSignals) {
		strengths.push('You connected theory to practical engineering constraints')
	} else {
		improvements.push('Add real production examples, metrics, and trade-offs')
	}

	if (words.length < 50) {
		improvements.push('Expand depth with one concrete scenario and a clear result')
	} else {
		strengths.push('Good level of detail for technical discussion')
	}

	return {
		score,
		verdict: getVerdict(score),
		strengths: strengths.slice(0, 3),
		improvements: improvements.slice(0, 3),
		followUpQuestion: `As a Senior Interviewer, I would ask next: How would you validate that your ${role.label} approach works under failure conditions?`
	}
}
