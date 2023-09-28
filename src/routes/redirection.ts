import { router } from "./Router";
import { NavData, Pages, Paths } from "./paths";

type Redirect =
    | { page: Pages.Root }
    | { page: Pages.Login }
    | { page: Pages.Dashboard }
    | { page: Pages.ProductManagement }
    | { page: Pages.ProductManagementFetch; params: { category: "item" | "mpn" | "partGroup" } }
    | { page: Pages.PendingRequests }
    | { page: Pages.PendingApprovals }
    | { page: Pages.AdminPanel }
    | { page: Pages.Reports }
    | { page: Pages.Dossiers }
    | { page: Pages.Declaration; params: { id: number | string } };

const NoEgncPrefix = [Pages.Root, Pages.Login];

/**
 * @params Takes dynamic arguements on the basis of page configuration
 * @returns A router path that the react router can navigate to
 * @usage In link components, or router.navigate
 */
export const getRedirectionPath = <Page extends Redirect["page"]>(
    ...args: Extract<Redirect, { page: Page }> extends { params: infer TParams }
        ? [page: Page, params: TParams]
        : [page: Page]
): string => {
    const page = args[0];
    let outputPath = NavData.get(page)?.path as string;
    try {
        if (!NoEgncPrefix.includes(page)) {
            const params = args[1] as Record<string, unknown>;
            for (const key in params) {
                const value = params[key];
                outputPath = outputPath.replace(`:${key}`, value as string);
            }
        }
    } catch (error) {
        console.log("Error in generating path");
        console.log(error);
    }
    return outputPath;
};

/**
 * @params Takes dynamic arguements on the basis of page configuration
 * @function Redirects to the path given on the basis on params
 * @usage used standalone redirection, modifies document title if present
 */
export const navigateToPath = async <Page extends Redirect["page"]>(
    ...args: Extract<Redirect, { page: Page }> extends { params: infer TParams }
        ? [page: Page, params: TParams]
        : [page: Page]
) => {
    const page = args[0];
    let outputPath = NavData.get(page)?.path as string;
    try {
        if (!NoEgncPrefix.includes(page)) {
            const params = args[1] as Record<string, unknown>;
            for (const key in params) {
                const value = params[key];
                outputPath = outputPath.replace(`:${key}`, value as string);
            }
        }
    } catch (error) {
        console.log("Error in redirection");
        console.log(error);
    }
    await router.navigate(outputPath);
};

/**
 * @description Still in testing phase, used when link is already embedded in UI elements
 * @param link
 */
export const navigateToLink = async (link: string) => {
    if (link) {
        await router.navigate(link);
    }
};

// ANCHOR - Updating document title

const defaultDocumentTitle = "EG&C";
/**
 * @usage Updates the document title from respective displayName in NavData
 * @param location
 */
export const updateDocumentTitle = (location: string) => {
    const page = getPageFromLocation(location);
    if (page) {
        const displayName = NavData.get(page)?.displayName;
        document.title = displayName ?? defaultDocumentTitle;
    }
    // const getDocumentTitle = (location: string) => {
    //     const locationData = NavData.get(location as Pages)
    //     if (locationData) {
    //         return locationData.displayName;
    //     }
    //     const arr = location.split('/');
    //     for (const path of arr) {
    //         const currentPath = path as Pages;
    //         const navData = NavData.get(currentPath);
    //         if (navData) {
    //             return navData.displayName || defaultDocumentTitle;
    //         } else {
    //             //TODO - Implement title mapping for paths with params
    //         }
    //     }
    //     return defaultDocumentTitle;
    // }
    // const documentTitle = getDocumentTitle(location);
    // document.title = documentTitle;
};

export const getPageFromLocation = (location: string): Pages | undefined => {
    const locationPaths = location.split("/").filter((value) => value);
    const allPages = Object.values(Pages);
    for (const path of locationPaths) {
        const page = allPages.find((p) => p === path);
        if (page) {
            return page;
        }
    }
    return undefined;
};

export { Paths, Pages };
