"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarWidget() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-headline">Calendar</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="p-0"
        />
      </CardContent>
    </Card>
  );
}
