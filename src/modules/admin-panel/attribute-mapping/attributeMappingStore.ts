import { makeAutoObservable, runInAction } from "mobx";
import { Categories } from "../../../constants";
import {
    type MappedAttribute,
    attributeMappingApis,
} from "./attributeMappingService";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { store } from "../../../modules/store";

type Category = typeof Categories.ITEM;
export default class AttributeMappingStore {
    attributes: MappedAttribute[] = [];
    loadingAttributes = false;
    selectedCategory: Category = Categories.ITEM;
    selectedAttribute: MappedAttribute | undefined = undefined;
    popupHooks = { delete: false, edit: false };

    constructor() {
        makeAutoObservable(this);
    }

    loadAttributes = async (): Promise<void> => {
        this.loadingAttributes = true;
        try {
            const response = await attributeMappingApis.getAttributes(
                this.selectedCategory.value,
            );
            console.log(response);
            this.attributes = response;
        } catch (error) {
            store.commonStore.showNotification(
                "error",
                `Unable to fetch attributes for ${this.selectedCategory.label}`,
            );
        } finally {
            runInAction(() => {
                this.loadingAttributes = false;
            });
        }
    };

    entitySelectionHandler = (category: Category): void => {
        this.selectedCategory = category;
        void this.loadAttributes();
    };

    openPopup = (hook: keyof typeof this.popupHooks): void => {
        this.popupHooks = { ...this.popupHooks, [hook]: true };
    };

    closePopup = (hook: keyof typeof this.popupHooks): void => {
        this.popupHooks = { ...this.popupHooks, [hook]: false };
    };

    // only show attribute1 - attribute 5
    get attributesDp(): MutableArrayDataProvider<string, MappedAttribute> {
        const slicedAttributes = this.attributes.slice(0, 5);
        return new MutableArrayDataProvider(slicedAttributes, {
            keyAttributes: "attributeName",
        });
    }

    get disableDelete(): boolean {
        return !(this.selectedAttribute?.name == null);
    }

    get disableEdit(): boolean {
        return !(this.selectedAttribute == null);
    }
}
