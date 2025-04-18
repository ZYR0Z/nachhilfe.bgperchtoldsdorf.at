import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { BuildQueryResult, DBQueryConfig, ExtractTablesWithRelations } from 'drizzle-orm';
import * as schema from '@/db/schema';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createInitials(name: string) {
  const names = name.split(" ")
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase()
  }
  return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
}


type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
  'one' | 'many',
  boolean,
  TSchema,
  TSchema[TableName]
>['with'];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelation<TableName> | undefined = undefined
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    with: With;
  }
>;
