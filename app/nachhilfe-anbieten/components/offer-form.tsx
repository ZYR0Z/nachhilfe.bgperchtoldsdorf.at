"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
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

// NOTE: can we infer this from the db schema?
const formSchema = z.object({
  subject: z.string().min(1, { message: "Bitte wähle ein Fach aus." }),
  grades: z
    .array(z.number())
    .min(1, { message: "Bitte wähle mindestens eine Klasse aus." }),
  description: z
    .string()
    .max(255, { message: "Die Beschreibung ist zu lang." })
    .optional(),
  teaching_place: z.string().optional(),
});

// TODO: infer from the db schema
// type Offer = (typeof import("@/lib/mock-data").mockTutoringOffers)[number];

const subjects = [
  { value: "mathematik", label: "Mathematik" },
  { value: "deutsch", label: "Deutsch" },
  { value: "englisch", label: "Englisch" },
  { value: "physik", label: "Physik" },
  { value: "chemie", label: "Chemie" },
  { value: "biologie", label: "Biologie" },
  { value: "geschichte", label: "Geschichte" },
  { value: "geographie", label: "Geographie" },
  { value: "informatik", label: "Informatik" },
  { value: "kunst", label: "Kunst" },
  { value: "musik", label: "Musik" },
  { value: "sport", label: "Sport" },
  { value: "politik", label: "Politik" },
  { value: "wirtschaft", label: "Wirtschaft" },
  { value: "religion", label: "Religion" },
  { value: "philosophie", label: "Philosophie" },
  { value: "spanisch", label: "Spanisch" },
  { value: "französisch", label: "Französisch" },
  { value: "latein", label: "Latein" },
];

export default function OfferForm() {
  const [values, setValues] = useState<z.infer<typeof formSchema> | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // do we really need this?
      subject: "",
      grades: [],
      description: "",
      teaching_place: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setValues(values);
  }

  // Available grades for selection
  const availableGrades = [
    { id: 5, label: "5. Klasse" },
    { id: 6, label: "6. Klasse" },
    { id: 7, label: "7. Klasse" },
    { id: 8, label: "8. Klasse" },
    { id: 9, label: "9. Klasse" },
    { id: 10, label: "10. Klasse" },
    { id: 11, label: "11. Klasse" },
    { id: 12, label: "12. Klasse" },
    { id: 13, label: "13. Klasse" },
  ];

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="subject"
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
                          ? subjects.find(
                              (subject) => subject.value === field.value,
                            )?.label
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
                              key={subject.value}
                              value={subject.value}
                              onSelect={() => {
                                form.setValue("subject", subject.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  subject.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {subject.label}
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
                {availableGrades.map((grade) => (
                  <FormField
                    key={grade.id}
                    control={form.control}
                    name="grades"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={grade.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(grade.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, grade.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== grade.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {grade.label}
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
                    placeholder="Beschreibe dein Angebot (optional)"
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div>
        {values && (
          <div className="mt-8 p-4 border rounded-md">
            <h2 className="text-lg font-medium mb-2">Submitted Values:</h2>
            <pre className="bg-background p-4 rounded-md overflow-auto">
              {JSON.stringify(values, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
