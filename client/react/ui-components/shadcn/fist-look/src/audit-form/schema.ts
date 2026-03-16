import * as z from 'zod'

export const auditFormSchema = z.object({
  username: z.string().min(2, 'Имя слишком короткое'),
  email: z.email('Некорректный email'),
  auditDate: z.date({
    error: 'Пожалуйста, выберите дату аудита',
  }),
})

export type AuditFormValues = z.infer<typeof auditFormSchema>
