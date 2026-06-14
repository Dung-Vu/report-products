import { AppStore } from "./store";

// Re-export all render functions from sub-modules
export { buildEvidenceScale, buildMonthlyChart } from "./renderers/evidence";
export {
    buildHookScene,
    buildSystemScene,
    buildCounterScene,
    buildCloseScene,
    buildDotNav,
    buildTechBar,
    buildNodeMap,
    buildRoadmap,
} from "./renderers/scenes";
export { buildProjectRoute, renderPanelContent } from "./renderers/projects";

// Keep loadData compatibility in renderer.ts
export async function loadData(): Promise<typeof AppStore> {
    await AppStore.loadData();
    return AppStore;
}
