import { z } from "zod";
import { REPORT_STATUSES, SPECIES, SEX_OPTIONS, YES_NO_OPTIONS } from "./constants";

export const CreateReportSchema = z.object({
  status: z.enum(REPORT_STATUSES),
  isChipped: z.enum(YES_NO_OPTIONS),
  species: z.enum(SPECIES),
  sex: z.enum(SEX_OPTIONS),
  isSterilized: z.enum(YES_NO_OPTIONS),
  dateMissing: z.string().optional(),
  description: z.string().optional(),
  petName: z.string().optional(),
  breed: z.string().optional(),
  colors: z.string().optional(), 
  features: z.string().optional(),
  imageUrl: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});