import { makeAutoObservable } from "mobx";
import { getPermissionsFromStorage } from "../../modules/auth/authService";
import {
    getConveyorBeltCards,
    getObjectsNeedingDeclarationCards,
    getPendingDataCards,
    type ConveyorBeltCard,
    type DashboardCardRow,
} from "./dashboardService";

export default class DashboardStore {
    cardsAreSet = false;
    conveyorBeltCards: ConveyorBeltCard[] = [];
    cardsLoading = false;
    objectsCards: DashboardCardRow[] | undefined = undefined;
    thingsCards: DashboardCardRow[] | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    loadAllCards = async () => {
        if (!this.cardsAreSet) {
            this.loadConveyorCards();
            await this.loadObjectsAndThingsCards();
            this.cardsAreSet = true;
        }
    };

    /* This is also needed in layout store to populate drawer on refresh */
    loadConveyorCards = () => {
        const permissions = getPermissionsFromStorage();
        if (permissions?.roles) {
            const conveyorCards = getConveyorBeltCards(permissions.roles);
            this.conveyorBeltCards = conveyorCards;
        }
    };

    private readonly loadObjectsAndThingsCards = async () => {
        this.cardsLoading = true;
        try {
            const [objectsCards, thingsCards] = await Promise.all([
                getObjectsNeedingDeclarationCards(),
                getPendingDataCards(),
            ]);
            this.objectsCards = objectsCards;
            this.thingsCards = thingsCards;
        } catch (error) {
            console.log(error);
        } finally {
            this.cardsLoading = false;
        }
    };
}
