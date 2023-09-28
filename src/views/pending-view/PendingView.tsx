/* eslint-disable react/no-unknown-property */
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Action, ActionBar, type ActionBarElement } from "../../common/action-bar/ActionBar";
import { AddRemoveColumnsPopup } from "../../common/add-remove/AddRemoveColumns";
import { DataTable } from "../../common/data-table/DataTable";
import { ReorderColumnsPopup } from "../../common/reorder-columns/ReorderColumns";
import { type Declaration } from "../../models/categories/declaration";
import { PendingTemplates } from "../../modules/pending/pendingService";
import { useStore } from "../../modules/store";
import { Pages, getRedirectionPath, navigateToPath } from "../../routes/redirection";
import { getReadonlyTemplates } from "../../utils/render";
import { ConfirmationPopup } from "../../common/confirmation-popup/ConfirmationPopup";
import { TableRowSkeleton } from "../../components/skeleton/Skeleton";

interface Props {
    isApprovals: boolean;
}

enum Hooks {
    ReorderColumns = "reorderColumnsHook",
    AddRemoveColumns = "addRemoveColumnsHook",
    OpenConfirmation = "openConfirmationHook",
}

export const PendingView = observer((props: Props) => {
    const { isApprovals } = props;
    const { pendingStore } = useStore();
    const {
        loadingData,
        loadPendingData,
        withdrawRequest,
        columns,
        reorderColumns,
        addRemoveColumns,
        dataProvider,
    } = pendingStore;

    const [selectedDeclaration, setSelectedDeclaration] = useState<Declaration>();

    const [popupHooks, setPopupHooks] = useState({
        [Hooks.AddRemoveColumns]: false,
        [Hooks.ReorderColumns]: false,
        [Hooks.OpenConfirmation]: false,
    });

    useEffect(() => {
        void loadPendingData(isApprovals);
    }, [isApprovals, loadPendingData]);

    const openPopup = (hook: Hooks) => {
        setPopupHooks({ ...popupHooks, [hook]: true });
    };
    const closePopup = (hook: Hooks) => {
        setPopupHooks({ ...popupHooks, [hook]: false });
    };

    // TODO - Export
    const exportData = () => {
        console.log("Exporting data");
    };

    const deleteSelected = () => {
        if (selectedDeclaration) {
            void withdrawRequest(selectedDeclaration.id);
        }
    };

    const getActions = (): ActionBarElement[] => {
        const baseActions: ActionBarElement[] = [
            { type: Action.Export, action: exportData },
            {
                type: Action.ReorderColumns,
                action: () => {
                    openPopup(Hooks.ReorderColumns);
                },
                hasStartSeperator: true,
            },
            {
                type: Action.AddColumn,
                action: () => {
                    openPopup(Hooks.AddRemoveColumns);
                },
            },
            {
                type: Action.Refresh,
                action: async () => {
                    await loadPendingData(isApprovals);
                },
                hasStartSeperator: true,
            },
        ];
        return isApprovals
            ? baseActions
            : [
                  ...baseActions,
                  {
                      type: Action.Delete,
                      action: () => {
                          openPopup(Hooks.OpenConfirmation);
                      },
                      disable: selectedDeclaration === undefined,
                  },
              ];
    };

    // ANCHOR - Table
    const getTemplates = () => {
        const { requestId, ...readonlyTemplates } = PendingTemplates;
        const idTemplate = (
            <template
                slot={requestId}
                render={(data) => {
                    const row = data.item.data as Declaration;
                    return (
                        <a
                            onClick={async () => {
                                await navigateToPath(Pages.Declaration, { id: row.id });
                            }}
                            href={getRedirectionPath(Pages.Declaration, { id: row.id })}
                            className="oj-link-standalone"
                            key={row.id}
                        >
                            <label>{row.id}</label>
                        </a>
                    );
                }}
            />
        );
        const readOnlyTemplates = getReadonlyTemplates(Object.values(readonlyTemplates));
        return [idTemplate, ...readOnlyTemplates];
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rowChangeHandler = (event: any) => {
        const { data } = event.detail.value;
        if (data) {
            setSelectedDeclaration(data as Declaration);
        }
    };

    return (
        <div style={{ margin: "1rem 0rem" }}>
            <h4>Pending {isApprovals ? "Approvals" : "Requests"}</h4>
            <div className="oj-panel oj-sm-margin-2x">
                <ActionBar actions={getActions()} />
                {loadingData ? (
                    <TableRowSkeleton count={15} />
                ) : (
                    <div className={"oj-sm-margin-2x-top"}>
                        <DataTable
                            tableColumns={columns.addedColumns}
                            templates={getTemplates()}
                            tableDataProvider={dataProvider}
                            rowChangedHandler={rowChangeHandler}
                        />
                    </div>
                )}
            </div>
            <ReorderColumnsPopup
                showPopup={popupHooks[Hooks.ReorderColumns]}
                closePopup={() => {
                    closePopup(Hooks.ReorderColumns);
                }}
                columns={columns.addedColumns}
                reorderAction={reorderColumns}
            />
            <AddRemoveColumnsPopup
                show={popupHooks[Hooks.AddRemoveColumns]}
                closePopup={() => {
                    closePopup(Hooks.AddRemoveColumns);
                }}
                columnsMetaData={columns}
                okFunction={addRemoveColumns}
            />
            <ConfirmationPopup
                show={popupHooks[Hooks.OpenConfirmation]}
                closePopup={() => {
                    closePopup(Hooks.OpenConfirmation);
                }}
                message={`Are you sure you want to withdraw the request ${selectedDeclaration?.id}?`}
                okAction={deleteSelected}
            />
        </div>
    );
});
