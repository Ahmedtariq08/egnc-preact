import { makeAutoObservable } from "mobx";
import { ConveyorBeltCard, DashboardCardRow, DashboardService } from "./dashboardService";
import { store } from "../../modules/store";
import { AuthService, UserPermissionsStorage } from "../../modules/auth/authService";

export default class DashboardStore {
    cardsAreSet = false;
    conveyorBeltCards: ConveyorBeltCard[] = [];
    cardsLoading = false;
    objectsCards: DashboardCardRow[] | undefined = undefined;
    thingsCards: DashboardCardRow[] | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    loadAllCards = () => {
        if (!this.cardsAreSet) {
            this.loadConveyorCards();
            this.loadObjectsAndThingsCards();
            this.cardsAreSet = true;
        }
    }

    /*This is also needed in layout store to populate drawer on refresh */
    private loadConveyorCards = () => {
        const permissions = AuthService.getPermissionsFromStorage();
        if (permissions && permissions.roles) {
            const conveyorCards = DashboardService.getConveyorBeltCards(permissions.roles);
            this.conveyorBeltCards = conveyorCards;
        }
    }

    private loadObjectsAndThingsCards = async () => {
        this.cardsLoading = true;
        try {
            const [objectsCards, thingsCards] = await Promise.all([
                DashboardService.getObjectsNeedingDeclarationCards(), DashboardService.getPendingDataCards()]);
            this.objectsCards = objectsCards;
            this.thingsCards = thingsCards;
        } catch (error) {
            console.log(error);
        } finally {
            this.cardsLoading = false;
        }
    }
}