export interface InterviewRole {
	id: string
	label: string
	focusAreas: string[]
	sampleQuestion: string
}

export interface FeedbackResult {
	score: number
	verdict: string
	strengths: string[]
	improvements: string[]
	followUpQuestion: string
}

export interface InterviewSession {
	roleId: string
	roleLabel: string
	question: string
	answer: string
	feedback: FeedbackResult
	createdAt: string
}
