import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { auditFormSchema, type AuditFormValues } from './schema'

// Данные для графика
const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
  mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig

export default function AuditPage() {
  // 1. Инициализация формы
  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  })

  // 2. Обработчик отправки
  function onSubmit(data: AuditFormValues) {
    console.log('Form Submitted:', data)
    form.reset()
    toast.success(`Заявка создана на ${format(data.auditDate, 'PPP')}`)
  }

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* ЛЕВАЯ КОЛОНКА: ФОРМА */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Запись на аудит</h2>
          <p className="text-muted-foreground">Заполните данные для связи</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Поле Имя */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваше имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Иван Иванов" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Поле Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Поле Дата (Датапикер) */}
            <FormField
              control={form.control}
              name="auditDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Желаемая дата</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Выберите дату</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()} // нельзя выбрать прошлое
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Отправить заявку
            </Button>
          </form>
        </Form>
      </section>

      {/* ПРАВАЯ КОЛОНКА: ГРАФИК */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Статистика аудитов</h2>
          <p className="text-muted-foreground">Загрузка по месяцам</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
          <div className="mt-4 flex items-center gap-2 font-medium leading-none">
            Рост на 5.2% в этом месяце <TrendingUp className="h-4 w-4" />
          </div>
        </div>
      </section>
    </div>
  )
}
