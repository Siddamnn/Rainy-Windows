import { curateQuoteOfTheDay } from "@/ai/flows/curate-quote-of-the-day";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenSquare } from "lucide-react";

export default async function QuoteOfTheDay() {
  const { quote } = await curateQuoteOfTheDay();

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-headline">
          <PenSquare className="w-5 h-5" />
          Quote of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-2 border-accent pl-4 italic text-muted-foreground">
          {quote}
        </blockquote>
      </CardContent>
    </Card>
  );
}
