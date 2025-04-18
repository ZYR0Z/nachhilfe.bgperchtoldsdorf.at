import { getAllOffers } from "@/actions/offerActions";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
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
import { getAllSubjects } from "@/actions/subjectActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OfferGrid from "@/components/offer-grid";
import { Checkbox } from "@/components/ui/checkbox";

export default async function FindTutoring() {
  const offers = await getAllOffers();
  const subjects = await getAllSubjects();
  const grades = Array.from({ length: 8 }, (_, i) => i + 1).map(
    (grade) => grade,
  );
  // this is a page where we list all the tutoring offers
  // there should be a search bar and the ability to filter by subject, grade or just fuzzy find
  // we also want to paginate this but dont make it hardcoded the value but rather just a variable that can be changed easily
  // also if the user is logged in, we want default to the currents users grade so that they have a better experience
  return (
    <div className="p-8">
      <div className="mb-4">
        <h2 className="text-4xl font-serif font-semibold">Nachhilfeangebote</h2>
        <p className="text-md text-muted-foreground">Finde passende Angebote</p>
      </div>
      <div className="grid grid-cols-4 gap-4 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Ergebnisse filtern</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fuzzy_search">Suchbegriff</Label>
              <Input
                type="input"
                id="fuzzy_search"
                placeholder="Suche nach Stichwörtern..."
              />
            </div>
            <div className="w-full space-y-2">
              <Popover>
                <Label htmlFor="subject">Fach</Label>
                <PopoverTrigger asChild>
                  <Button
                    id="subject"
                    variant="outline"
                    role="combobox"
                    // className={cn(
                    //   "w-full justify-between",
                    //   !field.value && "text-muted-foreground",
                    // )}
                    className="w-full"
                  >
                    Fach auswählen
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
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
                            // TODO: help meee
                            value={subject.id.toString()}
                            onSelect={() => {
                              // TODO: do know what to do here yet
                              return null;
                            }}
                          >
                            <Check />
                            {subject.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="grade">Klasse(n)</Label>
              <div className="flex gap-6 flex-wrap">
                {grades.map((grade) => (
                  <div key={grade} className="flex items-center space-x-2">
                    <Checkbox key={grade} id={grade.toString()} checked>
                      {grade}
                    </Checkbox>
                    <Label htmlFor={grade.toString()}>{grade}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="price">Preis</Label>
              <Slider defaultValue={[33, 77]} max={100} step={1} />
            </div>
          </CardContent>
        </Card>
        <OfferGrid offers={offers} className="col-span-3 xl:grid-cols-2" />
      </div>
    </div>
  );
}
