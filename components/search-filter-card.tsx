// "use client";
//
// import { useState } from "react";
// import { Grade } from "@/actions/gradeActions";
// import { Subject } from "@/actions/subjectActions";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Form, FormItem, FormField } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useSearchParams } from "next/navigation";
// import { useForm } from "react-hook-form";
//
// interface SearchFilterCardProps {
//   subjects: Subject[];
//   grades: Grade[];
// }
// export default function SearchCardFilter({
//   subjects,
//   grades,
// }: SearchFilterCardProps) {
//   const searchParams = useSearchParams();
//
//   const initialSearch = searchParams.get("search") || undefined;
//   const initialSubject = searchParams.get("subject") || undefined;
//   const initialGrade = searchParams.get("grade") || undefined;
//
//   const [searchState, setSearchState] = useState<{
//     search?: string;
//     subject?: string;
//     grade?: string;
//   }>({ search: initialSearch, subject: initialSubject, grade: initialGrade });
//
//   const form = useForm({
//     defaultValues: {
//       search: searchState.search,
//       subject: searchState.subject,
//       grade: searchState.grade,
//     },
//   });
//
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Suchergebnisse filtern</CardTitle>
//         <CardDescription>Filtere deine Ergebnisse weiter</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <FormField
//             control={form.control}
//             name="search"
//             render={({ field }) => (
//               <FormItem>
//                 <Input
//                   type="text"
//                   placeholder="Suche..."
//                   value={field.value}
//                   onChange={(e) => {
//                     field.onChange(e.target.value);
//                     setSearchState((prev) => ({
//                       ...prev,
//                       search: e.target.value,
//                     }));
//                   }}
//                 />
//               </FormItem>
//             )}
//           ></FormField>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }
