import { Declaration } from "../../models";
import { requests, URLs } from "../../api";
import { Constants } from '../../constants/constants';
import { NavData, Pages, RoleToPathMap } from '../../routes/paths';
import { getRedirectionPath } from '../../routes/redirection';
import { AuthService, UserPermissionsStorage } from "../auth/authService";

//ANCHOR - Interfaces / Constants
export interface DashboardCardRow {
    label: string,
    count: number,
    superscript?: boolean,
    class: string,
    visibility: boolean,
    link: string
}

export interface ConveyorBeltCard {
    order: number,
    icon: string,
    label: string,
    link: Pages
}

const ShowObjectCard = { item: true, mpn: true, partGroup: true }
const ShowPendingCard = { pendingApprovals: true, pendingRequests: true }


//ANCHOR - APIs
const { ITEM, MANUFACTURER, PART_GROUP, DECLARATION } = URLs.MAIN;
const { OPEN_TO_MANAGER, OPEN_TO_SUPPLIER } = Constants.WORKFLOWSTATES;

const DashboardApi = {
    getItems: (body: {}) => requests.post<{ result: any[] }>(`${ITEM}/advanceSearch/`, body),
    getPartGroups: (body: {}) => requests.post<{ result: any[] }>(`${PART_GROUP}/advanceSearch/`, body),
    getMpns: (body: {}) => requests.post<{ result: any[] }>(`${MANUFACTURER}/advanceSearch/`, body),
    getPendingRequests: () => requests.get<Declaration[]>(`${DECLARATION}/`, { params: { state: OPEN_TO_SUPPLIER } }),
    getPendingApprovals: () => requests.get<Declaration[]>(`${DECLARATION}/`, { params: { state: OPEN_TO_MANAGER } }),
}


//ANCHOR - Service
export class DashboardService {

    public static getConveyorBeltCards = (roles: UserPermissionsStorage['roles']): ConveyorBeltCard[] => {
        const userRoles = roles.map(role => role.name);
        let allPages: Pages[] = [];
        userRoles.forEach(role => { //get all possible pages
            const pagesForThisRole = RoleToPathMap.get(role);
            if (Array.isArray(pagesForThisRole)) {
                pagesForThisRole.forEach(page => {
                    allPages.push(page);
                })
            }
        })
        const uniquePages = [...new Set(allPages)]; //generate unique pages
        let cards: ConveyorBeltCard[] = [];
        NavData.forEach((details, page) => {
            if (uniquePages.includes(page)) {
                const { order, icon, displayName } = details;
                cards.push({ order: order!, icon: icon!, label: displayName!, link: page })
            }
        });
        cards.sort((a, b) => a.order - b.order);
        return cards;
    }


    public static getObjectsNeedingDeclarationCards = async (): Promise<DashboardCardRow[] | undefined> => {
        const permissions = AuthService.getPermissionsFromStorage();
        let cards: DashboardCardRow[] | undefined = undefined;
        if (permissions?.isManager) {
            const todaysDate = new Date();
            const sevenDaysAgo = new Date();
            const userId = permissions.id;
            sevenDaysAgo.setDate(todaysDate.getDate() - 6);
            const data = { page: 0, size: 100, userId, affectedObjectId: ["", "null"] };
            const [itemVisible, mpnVisible, partGroupVisible] = Object.values(ShowObjectCard);
            const [startDate, endDate] = [sevenDaysAgo, todaysDate].map(d => d.toISOString().split('T')[0]);
            const dataWithCreationDate = { ...data, creationDate: [[startDate, endDate], "between"] };
            const dataWithInsertionDate = { ...data, insertionDate: [[startDate, endDate], "between"] };
            const dataWithInsertionDateAndCompliance = { ...dataWithInsertionDate, compliance: ["", "null"] };
            let mpnCount = 0;
            let itemCount = 0;
            let partGroupCount = 0;
            try {
                const [items, mpns, partGroups] = await Promise.all([
                    DashboardApi.getItems(dataWithInsertionDateAndCompliance),
                    DashboardApi.getMpns(dataWithInsertionDate),
                    DashboardApi.getPartGroups(dataWithCreationDate)
                ]);
                mpnCount = mpnVisible ? mpns?.result?.length : 0;
                itemCount = itemVisible ? items?.result?.length : 0;
                partGroupCount = partGroupVisible ? partGroups?.result?.length : 0;
            } catch (error) {
                console.log(error);
                cards = undefined;
            }
            cards = [
                {
                    label: "Items",
                    count: itemCount,
                    superscript: itemCount == 100,
                    class: "oj-text-color-danger",
                    visibility: itemVisible,
                    link: getRedirectionPath(Pages.ProductManagementFetch, { category: "item" })
                },
                {
                    label: "Manufacturer Parts",
                    count: mpnCount,
                    superscript: mpnCount == 100,
                    class: "oj-text-color-secondary",
                    visibility: mpnVisible,
                    link: getRedirectionPath(Pages.ProductManagementFetch, { category: "mpn" })
                },
                {
                    label: "Part Groups",
                    count: partGroupCount,
                    superscript: partGroupCount == 100,
                    class: "oj-text-color-warning",
                    visibility: partGroupVisible,
                    link: getRedirectionPath(Pages.ProductManagementFetch, { category: "partGroup" })
                },
            ];
            cards = cards.filter(card => card.visibility);
        }

        return cards;
    }

    public static getPendingDataCards = async (): Promise<DashboardCardRow[] | undefined> => {
        let cards: DashboardCardRow[] | undefined = undefined;
        const permissions = AuthService.getPermissionsFromStorage();
        if (permissions?.isManager || permissions?.isAdmin) {
            const [approvals, requests] = await Promise.all([DashboardService.loadPendingApprovalsCount(), DashboardService.loadPendingRequestsCount()]);
            cards = [...approvals, ...requests];
        } else if (permissions?.isSupplier) {
            cards = await this.loadPendingRequestsCount();
        }
        return cards;
    }

    private static loadPendingRequestsCount = async () => {
        const isCardVisible = ShowPendingCard.pendingRequests;
        if (isCardVisible) {
            const response = await DashboardApi.getPendingRequests();
            return [{
                label: "Pending Requests",
                count: response.length,
                class: "oj-text-color-danger",
                visibility: isCardVisible,
                link: getRedirectionPath(Pages.PendingRequests),
            }]
        }
        return [];
    }

    private static loadPendingApprovalsCount = async () => {
        const isCardVisible = ShowPendingCard.pendingApprovals;
        if (isCardVisible) {
            const response = await DashboardApi.getPendingApprovals();
            return [{
                label: "Pending Approvals",
                count: response.length,
                class: "oj-text-color-success",
                visibility: isCardVisible,
                link: getRedirectionPath(Pages.PendingApprovals),
            }]
        }
        return [];
    }

}