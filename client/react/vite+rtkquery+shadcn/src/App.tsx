import { ModeToggle } from '@/components/mode-toggle';
import { SonnerDemo } from '@/components/sonner-demo';
import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Toaster } from 'sonner';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col items-center justify-center">
        <ModeToggle />
        <Button>Click me</Button>
        <SonnerDemo />
      </div>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
