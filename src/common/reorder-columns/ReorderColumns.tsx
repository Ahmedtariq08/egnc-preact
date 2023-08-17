import "ojs/ojlistitemlayout";
import "ojs/ojlistview";
import { ojListView } from 'ojs/ojlistview';
import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Column } from "../[constants]/types";
import { Popup } from "../popup/Popup";
import { DIALOG } from "./metadata";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

/* The following component will not be needed with latest version of action bar */

// export type ReorderProps = {
//   mode: "option" | "button",
//   disabled?: boolean;
//   openPopup: () => void;
// }

// export const ReorderColumns = (props: ReorderProps) => {
//   const { mode, disabled, openPopup} = props;
//   let disableComponent: boolean = (typeof disabled == "boolean") ? disabled : (disabled) ? true : false;
//   const clickFunction = (disableComponent) ? () => {} : openPopup;

//   switch (mode) {
//       case Constants.COMPONENT_MODE.BUTTON:
//       return (<ButtonComponent ojAction={clickFunction} icon={CONSTANTS.ICON} buttonTitle={CONSTANTS.TITLE} 
//           chroming="borderless"></ButtonComponent>)
//       case Constants.COMPONENT_MODE.OPTION: 
//       return (<OptionComponent optTitle={CONSTANTS.TITLE} icon={CONSTANTS.ICON} ojAction={clickFunction}></OptionComponent>)
//   }
// }

export type ReorderColumnProps = {
    showPopup: boolean,
    openPopup?: () => void,
    closePopup: () => void,
    columns: Column[],
    reorderAction: (reorderedColumns: Column[]) => void
}

export const ReorderColumnsPopup = (props: ReorderColumnProps) => {
    let { showPopup, closePopup, columns, reorderAction } = props;
    const [columnsDP, setColumnsDP] = useState<MutableArrayDataProvider<any, any>>(new MutableArrayDataProvider([], { keyAttributes: DIALOG.KEY }))

    useEffect(() => {
        columnsDP.data = columns;
    }, [columns]);

    const okAction = () => {
        closePopup();
        reorderAction(columnsDP.data);
    }

    const cancelAction = () => {
        closePopup();
        // closeDialog(id);
        setColumnsDP(new MutableArrayDataProvider(columns, { keyAttributes: DIALOG.KEY }));
    }

    const findItem = (columns: any[], id: any) => {
        const column = columns.find(c => c.Id === id);
        return column ? { index: columns.indexOf(column), arr: columns, leaf: !column.children } : null;
    };

    const handleReorder = (event: any) => {
        const items = event.detail.items;
        if (items.length > 0) {
            try {
                let columnsArray = [...columnsDP.data];
                const position = event.detail.position;
                const listview = document.getElementById(DIALOG.LIST_ID) as ojListView<any, any>;
                const source: any = listview.getContextByNode(items[0]);
                const dest: any = listview.getContextByNode(event.detail.reference);
                const sourceInfo = findItem(columnsArray, source.key);

                if (sourceInfo) {
                    let sourceData = sourceInfo.arr.splice(sourceInfo.index, 1)[0];
                    const destInfo = findItem(columnsArray, dest.key);
                    if (destInfo) {
                        if (position === DIALOG.POSITION_AFTER && destInfo.index === destInfo.arr.length - 1) {
                            destInfo.arr.push(sourceData);
                        }
                        else {
                            destInfo.arr.splice(position === DIALOG.POSITION_AFTER ? destInfo.index + 1 : destInfo.index, 0, sourceData);
                        }
                        setColumnsDP(new MutableArrayDataProvider([...destInfo.arr], { keyAttributes: DIALOG.KEY }));
                    }
                }
            } catch (error) {
                //Do Nothing
            }
        }
    };

    const handleDrop = (event: any) => { event.preventDefault(); };
    const dnd = {
        reorder: { items: "enabled" as "enabled" },
        drop: { items: { dragOver: handleDrop } }
    }


    const popupBody = () => {
        return (
            <div id="container">
                <oj-label class="oj-label oj-text-color-success">{DIALOG.DND}</oj-label>
                <h6>{DIALOG.TEXT}</h6>
                <div id="listviewContainer" class="reorderListview" >
                    <oj-list-view id={DIALOG.LIST_ID}
                        aria-label="Reorder List"
                        class="oj-sm-padding-1x oj-listview-item-padding-off disable-scroll"
                        onojReorder={handleReorder} group-header-position="static"
                        data={columnsDP} drill-mode="none" selection-mode="single" dnd={dnd}>
                        <template slot="itemTemplate" render={(row) => {
                            return (
                                <li>
                                    <oj-list-item-layout>
                                        <span role="button" class="oj-typography-body-md">
                                            <label>{row.data.headerText}</label>
                                        </span>
                                    </oj-list-item-layout>
                                </li>
                            )
                        }} />
                    </oj-list-view>
                </div>
            </div>
        )
    }

    const popupFooter = () => {
        return (
            <Fragment>
                <oj-button onClick={okAction}>{DIALOG.OK}</oj-button>
                <oj-button onClick={cancelAction}>{DIALOG.CANCEL}</oj-button>
            </Fragment>
        )
    }
    return <Popup show={showPopup} popupTitle={DIALOG.TITLE} body={popupBody} footer={popupFooter}></Popup>
}