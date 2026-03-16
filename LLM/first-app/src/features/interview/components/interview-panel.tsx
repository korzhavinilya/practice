import { useEffect } from 'react'
import { useSpeechRecognition } from '../hooks/use-speech-recognition'
import { useInterviewStore } from '../store/use-interview-store'

export function InterviewPanel() {
	const currentAnswer = useInterviewStore((state) => state.currentAnswer)
	const isEvaluating = useInterviewStore((state) => state.isEvaluating)
	const evaluationError = useInterviewStore((state) => state.evaluationError)
	const setCurrentAnswer = useInterviewStore((state) => state.setCurrentAnswer)
	const evaluateCurrentAnswer = useInterviewStore((state) => state.evaluateCurrentAnswer)
	const lastFeedback = useInterviewStore((state) => state.lastFeedback)

	const {
		transcript,
		isListening,
		errorMessage,
		isSupported,
		startListening,
		stopListening,
		resetTranscript
	} = useSpeechRecognition()

	useEffect(() => {
		if (transcript) {
			setCurrentAnswer(transcript)
		}
	}, [setCurrentAnswer, transcript])

	return (
		<section className='rounded-xl border border-slate-800 bg-panel p-5 space-y-4'>
			<div className='flex flex-wrap items-center gap-3'>
				<button
					type='button'
					onClick={startListening}
					disabled={!isSupported || isListening}
					className='rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60'
				>
					{isListening ? 'Listening...' : 'Start microphone'}
				</button>
				<button
					type='button'
					onClick={stopListening}
					disabled={!isListening}
					className='rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-60'
				>
					Stop
				</button>
				<button
					type='button'
					onClick={resetTranscript}
					className='rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500'
				>
					Clear transcript
				</button>
			</div>

			{!isSupported ? (
				<p className='rounded-lg border border-amber-900/60 bg-amber-950/40 p-3 text-sm text-amber-200'>
					Your browser does not support the Web Speech API. Try Chrome or Edge.
				</p>
			) : null}

			{errorMessage ? (
				<p className='rounded-lg border border-rose-900/60 bg-rose-950/40 p-3 text-sm text-rose-200'>{errorMessage}</p>
			) : null}

			<div className='space-y-2'>
				<label htmlFor='answer' className='text-sm text-slate-300'>
					Your spoken answer
				</label>
				<textarea
					id='answer'
					rows={7}
					value={currentAnswer}
					onChange={(event) => setCurrentAnswer(event.target.value)}
					placeholder='Speak your answer or type it manually...'
					className='w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-brand'
				/>
			</div>

			<div className='flex justify-end'>
				<button
					type='button'
					onClick={() => {
						void evaluateCurrentAnswer()
					}}
					disabled={!currentAnswer.trim() || isEvaluating}
					className='rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60'
				>
					{isEvaluating ? 'Evaluating...' : 'Evaluate answer'}
				</button>
			</div>

			{evaluationError ? (
				<p className='rounded-lg border border-rose-900/60 bg-rose-950/40 p-3 text-sm text-rose-200'>{evaluationError}</p>
			) : null}

			{lastFeedback ? (
				<p className='text-xs text-slate-400'>
					Latest score: {lastFeedback.score}/100. Continue refining your answer for a stronger senior-level pitch.
				</p>
			) : null}
		</section>
	)
}
