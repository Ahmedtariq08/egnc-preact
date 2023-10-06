// Get one specification
export interface SpecificationExtended {
    specificationId: number;
    specificationName: string;
    rollupEngine: string;
    validationTypeId: number;
    description: string;
    revisionCode: string;
    effectiveFrom: string;
    effectiveTill: string;
    status: "enabled" | "disabled";
    complyByDate: string;
    favourite: boolean;
    validationType: string;
    children: SpecificationExtended[] | null; // verify
    parent: SpecificationExtended[] | null;
    locked: boolean;
    group: boolean;
}

// Get all Specification / enabled only
export interface Specification {
    specification_id: number;
    specification_name: string;
    parent: number | null;
    validation_type: string;
}
