import { create } from 'zustand'
import { getAiFeedback } from '../services/ai-feedback-service'
import { roles } from '../services/interview-engine'
import type { FeedbackResult, InterviewRole, InterviewSession } from '../types/interview'

interface InterviewState {
	selectedRoleId: string
	question: string
	currentAnswer: string
	isEvaluating: boolean
	evaluationError: string
	lastFeedback: FeedbackResult | null
	history: InterviewSession[]
	setRole: (roleId: string) => void
	setQuestion: (question: string) => void
	setCurrentAnswer: (answer: string) => void
	evaluateCurrentAnswer: () => Promise<void>
}

function resolveRole(roleId: string): InterviewRole {
	const foundRole = roles.find((role) => role.id === roleId)
	return foundRole ?? roles[0]
}

export const useInterviewStore = create<InterviewState>((set, get) => ({
	selectedRoleId: roles[0].id,
	question: roles[0].sampleQuestion,
	currentAnswer: '',
	isEvaluating: false,
	evaluationError: '',
	lastFeedback: null,
	history: [],
	setRole: (roleId) => {
		const role = resolveRole(roleId)
		set({
			selectedRoleId: role.id,
			question: role.sampleQuestion,
			lastFeedback: null,
			evaluationError: ''
		})
	},
	setQuestion: (question) => set({ question }),
	setCurrentAnswer: (answer) => set({ currentAnswer: answer }),
	evaluateCurrentAnswer: async () => {
		const state = get()
		const role = resolveRole(state.selectedRoleId)
		set({
			isEvaluating: true,
			evaluationError: ''
		})

		try {
			const feedback = await getAiFeedback({
				role,
				question: state.question,
				answer: state.currentAnswer
			})

			const latestState = get()
			const session: InterviewSession = {
				roleId: role.id,
				roleLabel: role.label,
				question: latestState.question,
				answer: latestState.currentAnswer,
				feedback,
				createdAt: new Date().toISOString()
			}

			set({
				lastFeedback: feedback,
				history: [session, ...latestState.history].slice(0, 5),
				isEvaluating: false
			})
		} catch {
			set({
				isEvaluating: false,
				evaluationError: 'Evaluation failed. Please try again.'
			})
		}
	}
}))
