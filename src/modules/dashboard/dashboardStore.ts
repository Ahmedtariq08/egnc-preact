import { makeAutoObservable } from "mobx";
import { ConveyorBeltCard, DashboardService } from "./dashboardService";
import { store } from "../../modules/store";
import { AuthService } from "../../modules/auth/authService";

export default class DashboardStore {
    conveyorBeltCards: ConveyorBeltCard[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadAllCards = () => {
        const permissions = AuthService.getPermissionsFromStorage();
        if (permissions && permissions.roles) {
            const conveyorCards = DashboardService.getConveyorBeltCards(permissions.roles);
            this.conveyorBeltCards = conveyorCards;
        }
    }
}