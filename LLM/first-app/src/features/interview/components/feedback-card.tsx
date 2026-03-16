import type { FeedbackResult } from '../types/interview'

interface FeedbackCardProps {
	feedback: FeedbackResult
}

function scoreTone(score: number) {
	if (score >= 85) {
		return 'text-emerald-400'
	}
	if (score >= 70) {
		return 'text-blue-400'
	}
	if (score >= 50) {
		return 'text-amber-400'
	}
	return 'text-rose-400'
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
	return (
		<section className='rounded-xl border border-slate-800 bg-panel p-5 space-y-5'>
			<div className='flex items-end justify-between gap-3'>
				<h2 className='text-lg font-semibold text-slate-100'>Senior Interviewer Feedback</h2>
				<p className={`text-2xl font-bold ${scoreTone(feedback.score)}`}>{feedback.score}/100</p>
			</div>

			<p className='rounded-lg bg-soft p-3 text-slate-200'>{feedback.verdict}</p>

			<div className='grid gap-4 sm:grid-cols-2'>
				<div>
					<h3 className='text-sm uppercase tracking-wide text-slate-400 mb-2'>Strengths</h3>
					<ul className='space-y-2'>
						{feedback.strengths.map((item) => (
							<li key={item} className='rounded-lg border border-emerald-900/50 bg-emerald-950/30 p-2 text-sm text-emerald-200'>
								{item}
							</li>
						))}
					</ul>
				</div>

				<div>
					<h3 className='text-sm uppercase tracking-wide text-slate-400 mb-2'>Improvements</h3>
					<ul className='space-y-2'>
						{feedback.improvements.map((item) => (
							<li key={item} className='rounded-lg border border-amber-900/50 bg-amber-950/30 p-2 text-sm text-amber-200'>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className='rounded-lg border border-blue-900/40 bg-blue-950/30 p-3 text-sm text-blue-100'>
				{feedback.followUpQuestion}
			</div>
		</section>
	)
}
