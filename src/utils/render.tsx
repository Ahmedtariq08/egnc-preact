/* eslint-disable react/no-unknown-property */
import { getYesNoString } from "./generic";

export const getReadonlyTemplates = (arrayOfTemplates: string[]) => {
    return arrayOfTemplates.map((renderTemplate) => {
        return (
            // eslint-disable-next-line react/jsx-key
            <template
                slot={renderTemplate}
                render={(row) => {
                    const value = row.item.data[renderTemplate];
                    return (
                        <span>
                            {Array.isArray(value)
                                ? value.join(", ")
                                : typeof value === "boolean"
                                ? getYesNoString(value)
                                : value}
                        </span>
                    );
                }}
            />
        );
    });
};
