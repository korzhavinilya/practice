import { FeedbackCard, InterviewPanel, RoleForm, useInterviewStore } from './features/interview'

function App() {
	const roleId = useInterviewStore((state) => state.selectedRoleId)
	const question = useInterviewStore((state) => state.question)
	const lastFeedback = useInterviewStore((state) => state.lastFeedback)
	const history = useInterviewStore((state) => state.history)
	const setRole = useInterviewStore((state) => state.setRole)
	const setQuestion = useInterviewStore((state) => state.setQuestion)

	return (
		<div className='min-h-screen bg-slate-950 text-slate-100'>
			<div className='mx-auto max-w-6xl px-4 py-8 md:py-12 space-y-6'>
				<header className='rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6'>
					<p className='text-xs uppercase tracking-[0.2em] text-blue-300'>Innowise</p>
					<h1 className='mt-2 text-2xl font-bold md:text-3xl'>Interview Coach</h1>
					<p className='mt-3 max-w-3xl text-slate-300'>
						Practice technical interview answers with voice input. The assistant evaluates your response as a Senior Technical Interviewer and gives role-specific feedback.
					</p>
				</header>

				<div className='grid gap-6 lg:grid-cols-[1fr_1.2fr]'>
					<div className='space-y-6'>
						<RoleForm roleId={roleId} question={question} onRoleChange={setRole} onQuestionChange={setQuestion} />
						{history.length > 0 ? (
							<section className='rounded-xl border border-slate-800 bg-panel p-5 space-y-3'>
								<h2 className='text-lg font-semibold'>Recent practice</h2>
								<ul className='space-y-2'>
									{history.map((session) => (
										<li key={session.createdAt} className='rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm'>
											<div className='flex items-center justify-between gap-2'>
												<span className='text-slate-300'>{session.roleLabel}</span>
												<span className='font-semibold text-blue-300'>{session.feedback.score}/100</span>
											</div>
											<p className='mt-1 text-slate-400'>{session.question}</p>
										</li>
									))}
								</ul>
							</section>
						) : null}
					</div>

					<div className='space-y-6'>
						<InterviewPanel />
						{lastFeedback ? <FeedbackCard feedback={lastFeedback} /> : null}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
