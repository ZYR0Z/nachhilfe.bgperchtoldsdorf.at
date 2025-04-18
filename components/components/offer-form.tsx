"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { tutoringOffersTable } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { createOffer } from "@/actions/offerActions";
import { Subject } from "@/actions/subjectActions";
import { createTutor, NewTutor } from "@/actions/tutorActions";

const formSchema = createInsertSchema(tutoringOffersTable, {
  grades: (schema) => schema.min(1),
});

export default function OfferForm({
  subjects,
  grades,
  tutor,
}: {
  subjects: Subject[];
  grades: number[];
  tutor: NewTutor;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grades: grades,
      prices: [{ duration: 60, price: 0 }],
      timeslots: [{ day: "Montag", startTime: "14:00", endTime: "15:00" }],
      tutor_id: tutor.id,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createTutor(tutor);
    createOffer(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="subject_id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Unterrichtsfach</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? subjects.find((subject) => subject.id === field.value)
                            ?.name
                        : "Fach auswählen"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                {/* FIXME: we need to make the width dynamic or use a different component */}
                <PopoverContent className="max-w-4xl w-screen ">
                  <Command>
                    <CommandInput placeholder="Fach suchen..." />
                    <CommandList>
                      <CommandEmpty>Kein Fach gefunden.</CommandEmpty>
                      <CommandGroup>
                        {subjects.map((subject) => (
                          <CommandItem
                            key={subject.id}
                            value={subject.id.toString()}
                            onSelect={() => {
                              form.setValue("subject_id", subject.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                subject.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {subject.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grades"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Klassen</FormLabel>
                <FormDescription>
                  Wähle die Klassen aus, die du unterrichten möchtest.
                </FormDescription>
              </div>
              {grades.map((grade) => (
                <FormField
                  key={grade}
                  control={form.control}
                  name="grades"
                  render={({ field }) => {
                    const value = field.value || [];
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={value.includes(grade)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...value, grade])
                                : field.onChange(
                                    value.filter((v) => v !== grade),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {grade}. Klasse
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschreibung</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Beschreibe dein Angebot"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Maximal 255 Zeichen.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teaching_place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unterrichtsort</FormLabel>
              <FormControl>
                <Input
                  placeholder="z.B. Online, Bibliothek, etc. (optional)"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prices"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preise</FormLabel>
              {field.value?.map((item, index) => (
                <div key={index} className="flex space-x-4 items-center">
                  <Input
                    type="number"
                    placeholder="Dauer (Minuten)"
                    value={item.duration}
                    onChange={(e) => {
                      const newPrices = [...field.value];
                      newPrices[index].duration = parseInt(e.target.value);
                      field.onChange(newPrices);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Preis (€)"
                    value={item.price}
                    onChange={(e) => {
                      const newPrices = [...field.value];
                      newPrices[index].price = parseFloat(e.target.value);
                      field.onChange(newPrices);
                    }}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  field.onChange([...field.value, { duration: 60, price: 0 }])
                }
                className="mt-2"
              >
                + Preis hinzufügen
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeslots"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verfügbare Zeiten</FormLabel>
              {field.value?.map((slot, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                  <Input
                    placeholder="Tag"
                    value={slot.day}
                    onChange={(e) => {
                      const updated = [...field.value];
                      updated[index].day = e.target.value;
                      field.onChange(updated);
                    }}
                  />
                  <Input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => {
                      const updated = [...field.value];
                      updated[index].startTime = e.target.value;
                      field.onChange(updated);
                    }}
                  />
                  <Input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => {
                      const updated = [...field.value];
                      updated[index].endTime = e.target.value;
                      field.onChange(updated);
                    }}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  field.onChange([
                    ...field.value,
                    { day: "Montag", startTime: "14:00", endTime: "15:00" },
                  ])
                }
                className="mt-2"
              >
                + Zeiten hinzufügen
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
