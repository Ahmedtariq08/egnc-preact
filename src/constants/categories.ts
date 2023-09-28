import { Icons } from "./iconsData";

/**
 * @usage Categories used in product management and other dropdowns
 */
export const Categories = {
    ITEM: { value: "item", label: "Item", icon: Icons.icons.itemWithoutBom },
    DECLARATION: {
        value: "declaration",
        label: "Declaration",
        icon: Icons.icons.declaration,
    },
    SUBSTANCE: {
        value: "substance",
        label: "Substance",
        icon: Icons.icons.substance,
    },
    SUBSTANCEGROUP: { value: "substance group", label: "Substance Group" },
    MANUFACTURER: { value: "manufacturer", label: "Manufacturer Part" },
    EXEMPTION: { value: "exemption", label: "Exemption" },
    PARTGROUP: { value: "part group", label: "Part Group" },
    SPECIFICATION: { value: "specification", label: "Specification" },
    SMELTER: { value: "smelter", label: "Smelter" },
    COMPANY: { value: "company", label: "Company" },
    AFFECTED_OBJECT: {
        value: "affectedObject",
        label: "Affected Object",
        icon: Icons.blockIcons.affectedObjects,
    },
};
