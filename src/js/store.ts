import { z } from "zod";
import {
    ProjectSchema,
    EvidenceSchema,
    SystemGroupSchema,
    ProjectDetailProfileSchema,
    HookCounterSchema,
    TechStackItemSchema,
    RoadmapItemSchema,
    StoryArcItemSchema,
    Project,
    Evidence,
    SystemGroup,
    ProjectDetailProfile,
    HookCounter,
    TechStackItem,
    RoadmapItem,
    StoryArcItem,
} from "./types";

export interface AppState {
    projects: Project[];
    evidence: Evidence;
    systemGroups: SystemGroup[];
    projectProfiles: Record<string, ProjectDetailProfile>;
    hookCounters: HookCounter[];
    techStack: TechStackItem[];
    roadmap: RoadmapItem[];
    storyArc: StoryArcItem[];
    isLoaded: boolean;
    error: string | null;
}

export type Listener = (state: AppState) => void;

class AppStoreClass {
    private state: AppState = {
        projects: [],
        evidence: {
            period: {
                start: "",
                endLabel: "",
                personalStartLabel: "",
                probationLabel: "",
                officialLabel: "",
            },
            principles: [],
            companyScale: [],
            repoRelevantOdoo: [],
        },
        systemGroups: [],
        projectProfiles: {},
        hookCounters: [],
        techStack: [],
        roadmap: [],
        storyArc: [],
        isLoaded: false,
        error: null,
    };

    private listeners: Set<Listener> = new Set();

    public getState(): AppState {
        return this.state;
    }

    public subscribe(listener: Listener): () => void {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    private emit(): void {
        for (const listener of this.listeners) {
            try {
                listener(this.state);
            } catch (err) {
                console.error("Error in store listener:", err);
            }
        }
    }

    public async loadData(): Promise<void> {
        try {
            const [
                projectsRes,
                evidenceRes,
                systemGroupsRes,
                projectProfilesRes,
                hookCountersRes,
                techStackRes,
                roadmapRes,
                storyArcRes,
            ] = await Promise.all([
                fetch("./src/data/impact-projects.json").then((r) => {
                    if (!r.ok) throw new Error(`HTTP error ${r.status}`);
                    return r.json();
                }),
                fetch("./src/data/impact-evidence.json").then((r) => {
                    if (!r.ok) throw new Error(`HTTP error ${r.status}`);
                    return r.json();
                }),
                fetch("./src/data/system-groups.json").then((r) => {
                    if (!r.ok) throw new Error(`HTTP error ${r.status}`);
                    return r.json();
                }),
                fetch("./src/data/project-profiles.json").then((r) => {
                    if (!r.ok) throw new Error(`HTTP error ${r.status}`);
                    return r.json();
                }),
                fetch("./src/data/hook-counters.json").then((r) => {
                    if (!r.ok) throw new Error(`HTTP error ${r.status}`);
                    return r.json();
                }),
                fetch("./src/data/tech-stack.json").then((r) => {
                    if (!r.ok) throw new Error(`HTTP error ${r.status}`);
                    return r.json();
                }),
                fetch("./src/data/roadmap.json").then((r) => {
                    if (!r.ok) throw new Error(`HTTP error ${r.status}`);
                    return r.json();
                }),
                fetch("./src/data/story-arc.json").then((r) => {
                    if (!r.ok) throw new Error(`HTTP error ${r.status}`);
                    return r.json();
                }),
            ]);

            // Validate with Zod
            const projectsData = z
                .object({ projects: z.array(ProjectSchema) })
                .parse(projectsRes).projects;
            const evidenceData = EvidenceSchema.parse(evidenceRes);
            const systemGroupsData = z
                .array(SystemGroupSchema)
                .parse(systemGroupsRes);
            const projectProfilesData = z
                .record(z.string(), ProjectDetailProfileSchema)
                .parse(projectProfilesRes);
            const hookCountersData = z
                .array(HookCounterSchema)
                .parse(hookCountersRes);
            const techStackData = z
                .array(TechStackItemSchema)
                .parse(techStackRes);
            const roadmapData = z.array(RoadmapItemSchema).parse(roadmapRes);
            const storyArcData = z.array(StoryArcItemSchema).parse(storyArcRes);

            this.state = {
                projects: projectsData,
                evidence: evidenceData,
                systemGroups: systemGroupsData,
                projectProfiles: projectProfilesData,
                hookCounters: hookCountersData,
                techStack: techStackData,
                roadmap: roadmapData,
                storyArc: storyArcData,
                isLoaded: true,
                error: null,
            };

            this.emit();
        } catch (error) {
            console.error(
                "Failed to load and validate data in AppStore:",
                error,
            );
            this.state.error = error instanceof Error ? error.message : String(error);
            this.emit();
            throw error;
        }
    }
}

export const AppStore = new AppStoreClass();
