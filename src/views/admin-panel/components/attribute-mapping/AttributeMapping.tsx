import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useAdminPanelStore } from "../../../../modules/admin-panel/adminPanelStore";
import { CategorySelections } from "../../../../modules/admin-panel/attribute-mapping/attributeMappingService";
import { OptionComponent } from "../../../../common/options/OptionComponent";
import { Action, ActionBar, type ActionBarElement } from "../../../../common/action-bar/ActionBar";
import { Icons, tableColumnsData, tableTemplates } from "../../../../constants";
import { DataTable } from "../../../../common/data-table/DataTable";
import { getReadonlyTemplates } from "../../../../utils/render";

export const AttributeMappingTab = observer(() => {
    const { attributeMappingStore } = useAdminPanelStore();
    const { selectedCategory, attributesDp } = attributeMappingStore;
    const { entitySelectionHandler, openPopup, loadAttributes } = attributeMappingStore;

    useEffect(() => {
        void loadAttributes();
    }, [loadAttributes]);

    const Header = () => {
        return (
            <div className="oj-flex oj-sm-flex-direction-row">
                <div className={"oj-flex-item oj-md-10"}>
                    <h5>Attribute Mapping</h5>
                </div>
                <div
                    className={
                        "oj-flex-item oj-md-2 oj-flex oj-md-align-items-center oj-md-justify-content-flex-end"
                    }
                >
                    <div>
                        <oj-menu-button class="oj-flex-item oj-sm-padding-2x-horizontal">
                            <span slot="startIcon" className={selectedCategory.icon}></span>
                            {selectedCategory.label}
                            <oj-menu slot="menu">
                                {CategorySelections.map((entity) => {
                                    return (
                                        <OptionComponent
                                            key={entity.value}
                                            optTitle={entity.label}
                                            icon={entity.icon}
                                            ojAction={() => {
                                                entitySelectionHandler(entity);
                                            }}
                                        />
                                    );
                                })}
                            </oj-menu>
                        </oj-menu-button>
                    </div>
                </div>
            </div>
        );
    };

    const actions: ActionBarElement[] = [
        {
            type: Action.Delete,
            title: "Delete Attribute Mapping",
            icon: Icons.icons.delete,
            action: () => {
                openPopup("delete");
            },
            inActionMenu: { present: true, optionTitle: "Delete Attribute Mapping", showIcon: true },
        },
        {
            type: Action.Update,
            title: "Edit Attribute Mapping",
            icon: Icons.icons.edit,
            action: () => {
                openPopup("edit");
            },
            inActionMenu: { present: true, optionTitle: "Edit Attribute Mapping", showIcon: true },
        },
    ];

    return (
        <div className="oj-sm-margin-2x">
            <Header />
            <ActionBar actions={actions} key={"attributeMapping"} />
            <div className={"oj-panel"}>
                <DataTable
                    tableDataProvider={attributesDp}
                    tableColumns={tableColumnsData.ADMIN_PANEL.ATTRIBUTE_MAPPING}
                    templates={getReadonlyTemplates(
                        Object.values(tableTemplates.ADMIN_PANEL.ATTRIBUTE_MAPPING),
                    )}
                />
            </div>
        </div>
    );
});
