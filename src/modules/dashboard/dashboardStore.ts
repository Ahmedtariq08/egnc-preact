import { makeAutoObservable } from "mobx";
import { ConveyorBeltCard, DashboardService } from "./dashboardService";
import { store } from "../../modules/store";
import { AuthService, UserPermissionsStorage } from "../../modules/auth/authService";

export default class DashboardStore {
    conveyorBeltCards: ConveyorBeltCard[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadAllCards = () => {
        this.loadConveyorCards();
    }

    /*This is also needed in layout store to populate drawer on refresh */
    loadConveyorCards = () => {
        const permissions = AuthService.getPermissionsFromStorage();
        if (permissions && permissions.roles) {
            const conveyorCards = DashboardService.getConveyorBeltCards(permissions.roles);
            this.conveyorBeltCards = conveyorCards;
        }
    }
}