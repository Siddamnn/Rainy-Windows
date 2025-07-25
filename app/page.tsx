import CalendarWidget from "@/components/calendar-widget";
import QuoteOfTheDay from "@/components/quote-of-the-day";
import RainEffect from "@/components/rain-effect";
import RainSoundToggle from "@/components/rain-sound-toggle";
import ThemeToggle from "@/components/theme-toggle";
import TodoList from "@/components/todo-list";
import LampEffect from "@/components/lamp-effect";

export default function Home() {
  return (
    <>
      <RainEffect />
      <LampEffect />
      <div className="relative min-h-screen w-full overflow-hidden">
        <header className="fixed top-0 right-0 z-50 p-4 flex items-center gap-2">
          <RainSoundToggle />
          <ThemeToggle />
        </header>

        <main className="p-4 sm:p-6 md:p-8 relative z-10">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 xl:col-span-9 h-[calc(100vh-4rem)]">
              <TodoList />
            </div>
            <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-8">
              <QuoteOfTheDay />
              <CalendarWidget />
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
