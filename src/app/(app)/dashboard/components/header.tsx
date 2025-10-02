"use client";

import { ArgoExplorerLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import React from "react";

export function Header() {
    const [date, setDate] = React.useState<Date>(new Date("2025-09-11"));
    
    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-4">
            <div className="flex items-center gap-2">
                <ArgoExplorerLogo className="h-6 w-6 text-primary" />
                <h1 className="text-lg font-semibold">OceanInsight</h1>
            </div>
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-[150px] justify-between">
                            Last 7 days <ChevronDown className="size-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                        <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                        <DropdownMenuItem>Custom Range</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "MM/dd/yyyy") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => d && setDate(d)}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
            </div>
      </header>
    );
}
