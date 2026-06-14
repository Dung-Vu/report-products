import { Route } from "./types";

export function parseRoute(): Route {
    const match = window.location.hash.match(/^#\/projects\/([^/?#]+)/);
    if (match) {
        return {
            name: "project",
            groupId: decodeURIComponent(match[1]),
        };
    }
    if (window.location.hash === "#/breakdown") {
        return { name: "home", scrollToScene: 1 };
    }
    return { name: "home" };
}
