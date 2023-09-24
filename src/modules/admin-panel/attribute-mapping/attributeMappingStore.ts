import { makeAutoObservable } from "mobx";
import { Categories } from "../../../constants";
import { MappedAttribute } from "./attributeMappingService";

export default class AttributeMappingStore {
    selectedCategory = Categories.ITEM;
    selectedAttribute: MappedAttribute | undefined = undefined;
    popupHooks = { delete: false, edit: false }

    constructor() {
        makeAutoObservable(this);
    }

    entitySelectionHandler = (catrgory: any) => {
        this.selectedCategory = catrgory;
    }

    openPopup = (hook: keyof typeof this.popupHooks) => {
        this.popupHooks = { ...this.popupHooks, [hook]: true }
    }

    closePopup = (hook: keyof typeof this.popupHooks) => {
        this.popupHooks = { ...this.popupHooks, [hook]: false }
    }

    get disableDelete() {
        return !!this.selectedAttribute?.name
    }

    get disableEdit() {
        return !!this.selectedAttribute;
    }
}