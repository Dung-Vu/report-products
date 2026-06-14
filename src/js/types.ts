import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    chapter: z.string(),
    hook: z.string(),
    problem: z.string(),
    built: z.string(),
    verifiedMetrics: z.array(z.string()),
});
export type Project = z.infer<typeof ProjectSchema>;

export const EvidencePeriodSchema = z.object({
    start: z.string(),
    endLabel: z.string(),
    personalStartLabel: z.string(),
    probationLabel: z.string(),
    officialLabel: z.string(),
});
export type EvidencePeriod = z.infer<typeof EvidencePeriodSchema>;

export const CompanyScaleItemSchema = z.object({
    id: z.string(),
    label: z.string(),
    value: z.number(),
    unit: z.string(),
    display: z.string(),
    description: z.string(),
    source: z.string(),
    confidence: z.string(),
});
export type CompanyScaleItem = z.infer<typeof CompanyScaleItemSchema>;

export const OdooRepoItemSchema = z.object({
    id: z.string(),
    label: z.string(),
    value: z.number(),
    unit: z.string(),
    display: z.string(),
    description: z.string(),
    source: z.string(),
    confidence: z.string(),
});
export type OdooRepoItem = z.infer<typeof OdooRepoItemSchema>;

export const MonthlyInvoiceDataSchema = z.object({
    customerInvoices: z.array(z.tuple([z.string(), z.number(), z.number()])),
});
export type MonthlyInvoiceData = z.infer<typeof MonthlyInvoiceDataSchema>;

export const EvidenceSchema = z.object({
    period: EvidencePeriodSchema,
    principles: z.array(z.string()),
    companyScale: z.array(CompanyScaleItemSchema),
    repoRelevantOdoo: z.array(OdooRepoItemSchema),
    monthly: MonthlyInvoiceDataSchema.optional(),
});
export type Evidence = z.infer<typeof EvidenceSchema>;

export const RouteSchema = z.object({
    name: z.union([z.literal("project"), z.literal("home")]),
    groupId: z.string().optional(),
    scrollToScene: z.number().optional(),
});
export type Route = z.infer<typeof RouteSchema>;

export const SystemGroupSchema = z.object({
    id: z.string(),
    label: z.string(),
    eyebrow: z.string(),
    summary: z.string(),
    projectIds: z.array(z.string()),
    accent: z.string(),
    countLabel: z.string().optional(),
});
export type SystemGroup = z.infer<typeof SystemGroupSchema>;

export const ProjectPeopleSchema = z.object({
    intro: z.string(),
    items: z.array(z.string()).optional(),
});
export type ProjectPeople = z.infer<typeof ProjectPeopleSchema>;

export const ProjectDetailProfileSchema = z.object({
    title: z.string().optional(),
    timeline: z.string(),
    people: z.union([z.string(), ProjectPeopleSchema]),
    pnl: z.string(),
    marketCost: z.string().optional(),
    roi: z.string(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    description: z.string(),
});
export type ProjectDetailProfile = z.infer<typeof ProjectDetailProfileSchema>;

export const HookCounterSchema = z.object({
    value: z.number(),
    suffix: z.string(),
    label: z.string(),
    sub: z.string(),
});
export type HookCounter = z.infer<typeof HookCounterSchema>;

export const TechStackItemSchema = z.object({
    cat: z.string(),
    items: z.array(z.string()),
});
export type TechStackItem = z.infer<typeof TechStackItemSchema>;

export const RoadmapItemSchema = z.object({
    num: z.string(),
    phase: z.string(),
    accent: z.string(),
    title: z.string(),
    why: z.string(),
    desc: z.string(),
    items: z.array(z.string()),
    effort: z.string(),
});
export type RoadmapItem = z.infer<typeof RoadmapItemSchema>;

export const StoryArcItemSchema = z.object({
    year: z.string(),
    label: z.string(),
    note: z.string(),
    highlight: z.boolean().optional(),
});
export type StoryArcItem = z.infer<typeof StoryArcItemSchema>;

declare global {
    interface Window {
        SYSTEM_GROUPS?: SystemGroup[];
    }
}
