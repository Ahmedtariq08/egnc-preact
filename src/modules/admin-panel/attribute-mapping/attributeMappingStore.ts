import { makeAutoObservable, runInAction } from "mobx";
import { Categories } from "../../../constants";
import { MappedAttribute, attributeMappingApis } from "./attributeMappingService";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { store } from "../../../modules/store";

export default class AttributeMappingStore {
    attributes: MappedAttribute[] = [];
    loadingAttributes = false;
    selectedCategory = Categories.ITEM;
    selectedAttribute: MappedAttribute | undefined = undefined;
    popupHooks = { delete: false, edit: false }

    constructor() {
        makeAutoObservable(this);
    }

    loadAttributes = async () => {
        this.loadingAttributes = true;
        try {
            const response = await attributeMappingApis.getAttributes(this.selectedCategory.value);
            console.log(response);
            this.attributes = response;
        } catch (error) {
            store.commonStore.showNotification("error", `Unable to fetch attributes for ${this.selectedCategory.label}`);
        } finally {
            runInAction(() => {
                this.loadingAttributes = false;
            })
        }
    }

    entitySelectionHandler = (category: any) => {
        this.selectedCategory = category;
        this.loadAttributes();
    }

    openPopup = (hook: keyof typeof this.popupHooks) => {
        this.popupHooks = { ...this.popupHooks, [hook]: true }
    }

    closePopup = (hook: keyof typeof this.popupHooks) => {
        this.popupHooks = { ...this.popupHooks, [hook]: false }
    }

    //only show attribute1 - attribute 5
    get attributesDp() {
        const slicedAttributes = this.attributes.slice(0, 5);
        return new MutableArrayDataProvider(slicedAttributes, { keyAttributes: "attributeName" });
    }

    get disableDelete() {
        return !!this.selectedAttribute?.name
    }

    get disableEdit() {
        return !!this.selectedAttribute;
    }
}