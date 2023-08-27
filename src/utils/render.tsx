import { getYesNoString } from "./generic";

export const getReadonlyTemplates = (arrayOfTemplates: string[]) => {
    return arrayOfTemplates.map(renderTemplate => {
        return <template slot={renderTemplate} render={(row) => {
            let value = row.item.data[renderTemplate];
            return <span>{Array.isArray(value) ? value.join(", ") : typeof value == "boolean" ?
                getYesNoString(value) : value}</span>
        }
        } />
    })
}