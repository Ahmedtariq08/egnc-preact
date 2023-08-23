import { router } from "./Router";
import { Paths } from "./paths";

type Redirect =
    | { page: Paths.Root }
    | { page: Paths.Login }
    | { page: Paths.Dashboard }
    | { page: Paths.ProductManagement }
    | { page: Paths.ProductManagementFetch; params: { category: "item" | "mpn" | "partGroup" } }
    | { page: Paths.PendingRequests }
    | { page: Paths.PendingApprovals }
    | { page: Paths.AdminPanel }
    | { page: Paths.Reports }
    | { page: Paths.Dossiers }

const NoEgncPrefix = [Paths.Root, Paths.Login];

/**
 * @params Takes dynamic arguements on the basis of page configuration
 * @returns A router path that the react router can navigate to
 * @usage In link components, or router.navigate
 */
export const getRedirectionPath = <Page extends Redirect['page']>(
    ...args: Extract<Redirect, { page: Page }> extends { params: infer TParams }
        ? [page: Page, params: TParams]
        : [page: Page]): string => {
    const page = args[0];
    let outputPath = page as string;
    try {
        if (!NoEgncPrefix.includes(page)) {
            const params = args[1] as {};
            for (const key in params) {
                const value = params[key as keyof typeof params];
                outputPath = outputPath.replace(`:${key}`, value as string);
            }
            outputPath = `${Paths.EGNC}/${outputPath}`;
        }
    } catch (error) {
        console.log('Error in generating path');
        console.log(error);
    }
    return outputPath;
};

/**
 * @params Takes dynamic arguements on the basis of page configuration
 * @function Redirects to the path given on the basis on params
 * @usage used standalone redirection, modifies document title if present
 */
export const navigateToPath = <Page extends Redirect['page']>(
    ...args: Extract<Redirect, { page: Page }> extends { params: infer TParams }
        ? [page: Page, params: TParams]
        : [page: Page]) => {
    const page = args[0];
    let outputPath = page as string;
    try {
        if (!NoEgncPrefix.includes(page)) {
            const params = args[1] as {};
            for (const key in params) {
                const value = params[key as keyof typeof params];
                outputPath = outputPath.replace(`:${key}`, value as string);
            }
            outputPath = `${Paths.EGNC}/${outputPath}`;
        }
    } catch (error) {
        console.log('Error in redirection');
        console.log(error);
    }
    router.navigate(outputPath);
};

/**
 * @description Still in testing phase, used when link is already embedded in UI elements
 * @param link 
 */
export const navigateToLink = (link: string) => {
    if (link) {
        router.navigate(link);
    }
}

export { Paths };
