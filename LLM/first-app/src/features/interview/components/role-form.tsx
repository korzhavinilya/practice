import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { roles } from '../services/interview-engine'

const roleSchema = z.object({
	roleId: z.string().min(1, 'Please select an interview role'),
	question: z.string().min(12, 'Question should be at least 12 characters')
})

type RoleFormValues = z.infer<typeof roleSchema>

interface RoleFormProps {
	roleId: string
	question: string
	onRoleChange: (roleId: string) => void
	onQuestionChange: (question: string) => void
}

export function RoleForm({
	roleId,
	question,
	onRoleChange,
	onQuestionChange
}: RoleFormProps) {
	const form = useForm<RoleFormValues>({
		resolver: zodResolver(roleSchema),
		defaultValues: {
			roleId,
			question
		},
		mode: 'onChange'
	})

	useEffect(() => {
		form.reset({ roleId, question })
	}, [form, roleId, question])

	useEffect(() => {
		const subscription = form.watch((value) => {
			if (value.roleId) {
				onRoleChange(value.roleId)
			}
			if (value.question) {
				onQuestionChange(value.question)
			}
		})
		return () => subscription.unsubscribe()
	}, [form, onQuestionChange, onRoleChange])

	return (
		<form className='rounded-xl border border-slate-800 bg-panel p-5 space-y-4'>
			<div className='space-y-2'>
				<label htmlFor='roleId' className='text-sm text-slate-300'>
					Target role
				</label>
				<select
					id='roleId'
					className='w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-brand'
					{...form.register('roleId')}
				>
					{roles.map((role) => (
						<option key={role.id} value={role.id}>
							{role.label}
						</option>
					))}
				</select>
				{form.formState.errors.roleId ? (
					<p className='text-sm text-rose-400'>{form.formState.errors.roleId.message}</p>
				) : null}
			</div>

			<div className='space-y-2'>
				<label htmlFor='question' className='text-sm text-slate-300'>
					Interviewer question
				</label>
				<textarea
					id='question'
					rows={4}
					className='w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-brand'
					{...form.register('question')}
				/>
				{form.formState.errors.question ? (
					<p className='text-sm text-rose-400'>{form.formState.errors.question.message}</p>
				) : null}
			</div>
		</form>
	)
}
