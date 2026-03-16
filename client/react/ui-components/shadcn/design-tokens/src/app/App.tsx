import { ModeToggle, ThemeProvider } from '@/shared/theme'
import { Typography } from '@/components/ui/typography'
import { useMediaQuery } from '@/shared/styling'
import { BREAKPOINTS } from '@/shared/styling'

function App() {
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.desktop}px)`)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Простой Layout */}
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Header */}
        <header className="border-b p-4 flex justify-between items-center container mx-auto">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">MyProject</span>

            {/* Пример JS логики: показываем бейдж только на десктопе */}
            {isDesktop && (
              <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                Desktop Mode Active
              </span>
            )}
          </div>
          <ModeToggle />
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-8 max-w-4xl">
          <section className="space-y-6">
            {/* 1. H1 с адаптивным размером шрифта из конфига */}
            <Typography variant="h1" >Typography в Shadcn</Typography>

            {/* 2. Вариант lead (серый текст) */}
            <Typography variant="lead">
              Это пример того, как использовать cva + tailwind config для
              создания типографики уровня Enterprise.
            </Typography>

            {/* 3. Обычный параграф */}
            <Typography variant="p">
              Мы используем переменные{' '}
              <code className="bg-muted px-1 py-0.5 rounded">--primary</code> и
              другие для управления цветами. Переключи тему справа сверху, чтобы
              увидеть магию.
            </Typography>

            <div className="p-6 border rounded-lg bg-muted/50 my-8">
              <Typography variant="h3">Демонстрация Slot (asChild)</Typography>
              <Typography variant="p">
                Ниже ссылка (тег `a`), которая выглядит как заголовок `h3`. Это
                достигается через проп `asChild`.
              </Typography>

              <div className="mt-4">
                {/* asChild означает: "Не рендери свой тег, а передай стили ребенку".
                   В итоге в DOM будет: <a class="...стили h3..." href="#">Я ссылка...</a>
                */}
                <Typography
                  variant="h3"
                  asChild
                  className="text-primary hover:underline cursor-pointer"
                >
                  <a href="#">Я ссылка, которая выглядит как H3</a>
                </Typography>
              </div>
            </div>

            {/* 4. CSS Брейкпоинты (визуальное скрытие) */}
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
              <div className="bg-primary/10 p-4 rounded h-32 flex items-center justify-center">
                Всегда виден
              </div>
              <div className="bg-primary/20 p-4 rounded h-32 hidden tablet:flex items-center justify-center">
                Виден только на tablet+ (CSS)
              </div>
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
