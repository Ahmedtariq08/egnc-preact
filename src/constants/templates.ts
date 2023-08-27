export const tableTemplates = {
    ADMIN_PANEL: {
        USERS: {
            NAME: "name",
            USERNAME: "username",
            EMAIL: "email",
            PHONE: "phone",
            COMPANY: "company",
            BUSINESS_TITLE: "businessTitle",
            ROLES: "roles",
            ACTIVE: "active"
        },
        ATTRIBUTE_MAPPING: {
            ATTRIBUTE: "attributeName",
            NAME: "name",
            TYPE: "type",
            READONLY: "readonly",
            REQUIRED: "required",
            POSSIBLE_VALUES: "possibleValues"
        }
    },
    SMELTER_BLOCK: {
        bundleId: "bundleId",
        mpartNumber: "manufacturer_part_number",
        manufacturerNumber: "manufacturer_number",
        status: "status",
        manufacturerName: "manufacturer_name",
        lookup: "lookup"
    },
    ATTACHMENTS: {
        fileName: "fileName",
        fileExtension: "fileExtension",
        fileType: "fileType"
    },
    REPORTS: {
        fileName: "fileName",
        createdDate: "createdDate",
        id: "id",
        status: "status"
    },
    DECLARATION_BLOCK: {
        STATEHISTORY: {
            comments: "comments",
            modifyBy: "modifyBy",
            modifyDate: "modifyDate",
            workflowStateName: "workflowStateName"
        },
        AFFECTED_OBJECTS: {
            manufacturerPartNumber: "manufacturerPartNumber",
            manufacturerName: "manufacturerName",
            manufacturerNumber: "manufacturerNumber",
            itemNumber: "itemNumber",
            partGroup: "partGroup",
            specification: "specification",
            calculatedCompliance: "calculatedCompliance",
            declaredCompliance: "declaredCompliance",
            status: "status",
            filled: "filled"
        },
        COPY_COMPOSITION: {
            status: "status",
            bundleId: "bundleId",
            itemNumber: "itemNumber",
            releasedDate: "releasedDate",
            partGroupName: "partGroupName",
            specificationName: "specificationName",
            manufacturerNumber: "manufacturerNumber",
            manufacturerPartNumber: "manufacturerPartNumber"
        }
    },
    CMRT_BLOCK: {
        DECLARATION_QUESTIONS: {
            answer: "answer",
            comments: "comments",
            question: "question"
        },
        SMELTER_LIST: {
            substance: "metal",
            smelterId: "smelterId",
            smelterName: "smelterName",
            lookup: "lookups",
            country: "country",
            source: "source"
        }
    },
    DOSSIERS: {
        name: "name",
        status: "status",
        Date: "Date",
        uuid: "uuid",
        submission_number: "Submission_No"
    },
    AML_REPORT: {
        specificationName: "specificationName",
        manufacturerName: "manufacturerName",
        manufacturerPartNumber: "manufacturerPartNumber",
        complianceStatus: "complianceStatus"
    },
    FMD_REPORT: {
        itemNumber: "itemNumber",
        itemClass: "itemClass",
        manufacturerNumber: "manufacturerNumber",
        manufacturerPartNumber: "manufacturerPartNumber",
        exemptions: "exemptions",
        fmdMass: "fmdMass",
        Subpart: "Subpart",
        Material: "Material",
        SubstanceGroup: "SubstanceGroup",
        Substance: "Substance",
        casNumber: "casNumber",
        declaredMass: "declaredMass",
        calculatedMass: "calculatedMass",
        resultMass: "resultMass",
        declaredPPM: "declaredPPM",
        calculatedPpm: "calculatedPpm",
        overThreshold: "overThreshold",
        thresholdPpm: "thresholdPpm",
        finalCompliance: "finalCompliance",
        declaredCompliance: "declaredCompliance",
        calculatedCompliance: "calculatedCompliance"
    }
}