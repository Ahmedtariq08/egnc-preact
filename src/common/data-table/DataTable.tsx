import { h, ComponentProps, Fragment } from "preact";
import "ojs/ojtable"
import "ojs/ojlabel"
import "ojs/ojrowexpander"

export type DataTableProps = {
    tableDataProvider: any,
    tableColumns: any,
    templates: h.JSX.Element[],
    label?: any,
    tableId?: string,
    setSelectedRow?:any,
    selectionMode?: TableProps["selectionMode"],
    height?: number     //in px
    rowChangedHandler?: (event:any) => void
    multipleSelectedHandler?: (event:any) => void
}

type TableProps = ComponentProps<"oj-table">;

const setColumnsDefault: TableProps["columnsDefault"] = {
    sortable: "disabled"
};
const defaultSelectionMode: TableProps["selectionMode"] = {
    row: "single",
    column: "single"
};

const setScrollPolicy: TableProps["scrollPolicyOptions"] = {
    fetchSize: 100,
    maxCount: 10000
};


export const DataTable = (props: DataTableProps) => {
    const defaultRowChangedHandler = (event:any) => {
        const { data } = event.detail?.value ?? {};
        props.setSelectedRow?.(data);
    };
    
    const { selectionMode = defaultSelectionMode, tableId = "table", templates, height = 600,
        rowChangedHandler =  defaultRowChangedHandler, multipleSelectedHandler } = props;
   
    return (
        <oj-table class="oj-sm-width-full oj-table-horizontal-grid"
            id={tableId}
            selectionMode={selectionMode}
            onfirstSelectedRowChanged={rowChangedHandler}
            onselectionChanged={multipleSelectedHandler}
            aria-label={props.label}
            data={props.tableDataProvider}
            columns={props.tableColumns}
            columnsDefault={setColumnsDefault}
            scrollPolicy={"loadMoreOnScroll"}
            scrollPolicyOptions={setScrollPolicy}
            style={`width: 100%; height: ${height}px;`}>
            {templates.map((component, index) => (
                <Fragment key={index}>{component}</Fragment>
            ))}
        </oj-table>
    )
}