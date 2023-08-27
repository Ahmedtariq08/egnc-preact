import { tableTemplates } from "./templates";
export const cmrtBlockTemplates = tableTemplates.CMRT_BLOCK;
export const userTemplates = tableTemplates.ADMIN_PANEL.USERS;
export const smelterBlockTemplates = tableTemplates.SMELTER_BLOCK;
export const declarationBlockTemplates = tableTemplates.DECLARATION_BLOCK;
export const cmrtQuestionTemplates = cmrtBlockTemplates.DECLARATION_QUESTIONS;
export const cmrtSmelterListTemplates = cmrtBlockTemplates.SMELTER_LIST;
export const stateHistoryBlockTemplates = declarationBlockTemplates.STATEHISTORY;
export const copyCompositionTemplates = declarationBlockTemplates.COPY_COMPOSITION;
export const affectedObjectsBlockTemplates = declarationBlockTemplates.AFFECTED_OBJECTS;
export const amlReportTemplates = tableTemplates.AML_REPORT;
export const FmdReportTemplates = tableTemplates.FMD_REPORT;

const attributeTemplates = tableTemplates.ADMIN_PANEL.ATTRIBUTE_MAPPING;
const dossiersTemplates = tableTemplates.DOSSIERS;

export type Column = {
  Id: string,
  headerText: string,
  field?: string,
  resizable?: string,
  sortable?: string,
  template?: string,
  headerStyle?: string,
  headerClassName?: string,
  className?: string,
  style?: string,
  width?: string
}

type L1Object = { [key: string]: Column[] }
type L2Object = { [key: string]: L1Object | Column[] }
type L3Object = { [key: string]: L1Object | L2Object }
type ColumnMeta = { [key: string]: Column[] | L1Object | L2Object | L3Object };

/**
 * @description Type safe columns data, allows nesting up to three levels with end array to be type of Column.
 * @variation In order add levels of nesting, add union type above
 */
const commonCopyCompositionColumns = [
  { headerText: "Specification Name", resizable: "enabled", Id: "specificationName", template: "specificationName" },
  { headerText: "Status", resizable: "enabled", Id: "status", template: "status" },
  { headerText: "Released Date", resizable: "enabled", Id: "releasedDate", template: "releasedDate" }
];
const copyCompositionDeclarationColumn = { headerText: "Declaration Id", resizable: "enabled", Id: "bundleId", template: "bundleId" };

export const tableColumnsData = {
  SMELTER_REPORT: [
    { headerText: "Smelter Id", Id: "smelterId", field: "smelterId", resizable: "enabled", template: "id" },
    { headerText: "Smelter Name", Id: "smelterName", field: "smelterName", resizable: "enabled" },
    { headerText: "Metal", Id: "metal", resizable: "enabled", field: "metal" },
    { headerText: "Smelter Id Source", Id: "source", resizable: "enabled", field: "source" },
    { headerText: "Street", Id: "street", resizable: "enabled", field: "street" },
    { headerText: "City", Id: "city", resizable: "enabled", field: "city" },
    { headerText: "Smelter Country", Id: "country", resizable: "enabled", field: "country" }
  ],
  SMELTER_BLOCK: {
    LOOKUPS: [
      { headerText: "Lookup", headerClassName: "oj-sm-only-hide", className: "oj-sm-only-hide", resizable: "disabled", template: smelterBlockTemplates.lookup, Id: smelterBlockTemplates.bundleId }
    ],
    WHEREUSED: {
      MANUFACTURER_PART: [
        { headerText: "Declaration ID", resizable: "enabled", Id: smelterBlockTemplates.bundleId, template: smelterBlockTemplates.bundleId },
        { headerText: "Manufacturer Part Number", resizable: "enabled", Id: smelterBlockTemplates.mpartNumber, template: smelterBlockTemplates.mpartNumber },
        { headerText: "Manufacturer Number", resizable: "enabled", Id: smelterBlockTemplates.manufacturerNumber, template: smelterBlockTemplates.manufacturerNumber },
        { headerText: "Status", resizable: "enabled", Id: smelterBlockTemplates.status, template: smelterBlockTemplates.status }
      ],
      COMPANY: [
        { headerText: "Declaration ID", resizable: "enabled", Id: smelterBlockTemplates.bundleId, template: smelterBlockTemplates.bundleId },
        { headerText: "Company", resizable: "enabled", Id: smelterBlockTemplates.manufacturerName, template: smelterBlockTemplates.manufacturerName },
        { headerText: "Status", resizable: "enabled", Id: smelterBlockTemplates.status, template: smelterBlockTemplates.status }
      ]
    }
  },
  ADMIN_PANEL: {
    USERS: [
      { headerText: "Name", Id: userTemplates.NAME, field: userTemplates.NAME, resizable: "enabled", template: userTemplates.NAME, sortable: "disabled" },
      { headerText: "Username", Id: userTemplates.USERNAME, field: userTemplates.USERNAME, resizable: "enabled", template: userTemplates.USERNAME, sortable: "disabled", className: "oj-read-only", },
      { headerText: "Email Address", Id: userTemplates.EMAIL, field: userTemplates.EMAIL, resizable: "enabled", template: userTemplates.EMAIL, sortable: "disabled" },
      { headerText: "Phone #", Id: userTemplates.PHONE, field: userTemplates.PHONE, resizable: "enabled", template: userTemplates.PHONE, sortable: "disabled" },
      { headerText: "Company", Id: userTemplates.COMPANY, field: userTemplates.COMPANY, resizable: "enabled", template: userTemplates.COMPANY, sortable: "disabled" },
      { headerText: "Business Title", Id: userTemplates.BUSINESS_TITLE, field: userTemplates.BUSINESS_TITLE, resizable: "enabled", template: userTemplates.BUSINESS_TITLE, sortable: "disabled" },
      { headerText: "Roles", Id: userTemplates.ROLES, field: userTemplates.ROLES, resizable: "enabled", template: userTemplates.ROLES, sortable: "disabled" },
      { headerText: "Active", Id: userTemplates.ACTIVE, field: userTemplates.ACTIVE, resizable: "enabled", template: userTemplates.ACTIVE, sortable: "disabled", width: "8%" }
    ],
    ATTRIBUTE_MAPPING: [
      { headerText: "Attibute", Id: attributeTemplates.ATTRIBUTE, field: attributeTemplates.ATTRIBUTE, resizable: "enabled", template: attributeTemplates.ATTRIBUTE, sortable: "disabled", className: "oj-read-only" },
      { headerText: "Name", Id: attributeTemplates.NAME, field: attributeTemplates.NAME, resizable: "enabled", template: attributeTemplates.NAME, sortable: "disabled" },
      { headerText: "Read Only", Id: attributeTemplates.READONLY, field: attributeTemplates.READONLY, resizable: "enabled", template: attributeTemplates.READONLY, sortable: "disabled" },
      { headerText: "Required", Id: attributeTemplates.REQUIRED, field: attributeTemplates.REQUIRED, resizable: "enabled", template: attributeTemplates.REQUIRED, sortable: "disabled" },
      { headerText: "Type", Id: attributeTemplates.TYPE, field: attributeTemplates.TYPE, resizable: "enabled", template: attributeTemplates.TYPE, sortable: "disabled" },
      { headerText: "Possible Values", Id: attributeTemplates.POSSIBLE_VALUES, field: attributeTemplates.POSSIBLE_VALUES, resizable: "enabled", template: attributeTemplates.POSSIBLE_VALUES, sortable: "disabled" }
    ]
  },
  DECLARATION_BLOCK: {
    STATEHISTORY: [
      { headerText: "Modified By", Id: stateHistoryBlockTemplates.modifyBy, field: stateHistoryBlockTemplates.modifyBy, headerClassName: "oj-sm-only-hide", className: "oj-sm-only-hide", resizable: "enabled", sortable: "disabled", template: stateHistoryBlockTemplates.modifyBy, width: "11rem" },
      { headerText: "Modification Date", Id: stateHistoryBlockTemplates.modifyDate, field: stateHistoryBlockTemplates.modifyDate, resizable: "enabled", sortable: "disabled", template: stateHistoryBlockTemplates.modifyDate, width: "11rem" },
      { headerText: "Status", Id: stateHistoryBlockTemplates.workflowStateName, field: stateHistoryBlockTemplates.workflowStateName, headerStyle: 'text-align:center;', style: 'text-align:center;', resizable: "enabled", sortable: "disabled", template: stateHistoryBlockTemplates.workflowStateName, width: "10%" },
      { headerText: "Comments", Id: stateHistoryBlockTemplates.comments, field: stateHistoryBlockTemplates.comments, style: "white-space:normal", resizable: "enabled", sortable: "disabled", template: stateHistoryBlockTemplates.comments, width: "65%" }
    ],
    AFFECTED_OBJECTS: {
      HOMOGENOUS: [
        { headerText: "Mfr. Part", field: affectedObjectsBlockTemplates.manufacturerPartNumber, Id: affectedObjectsBlockTemplates.manufacturerPartNumber, resizable: "enabled", template: affectedObjectsBlockTemplates.manufacturerPartNumber, },
        { headerText: "Manufacturer Name", field: affectedObjectsBlockTemplates.manufacturerName, Id: affectedObjectsBlockTemplates.manufacturerName, resizable: "enabled", template: affectedObjectsBlockTemplates.manufacturerName, },
        { headerText: "Manufacturer Number", field: affectedObjectsBlockTemplates.manufacturerNumber, Id: affectedObjectsBlockTemplates.manufacturerNumber, resizable: "enabled", template: affectedObjectsBlockTemplates.manufacturerNumber, },
        { headerText: "Item Number", field: affectedObjectsBlockTemplates.itemNumber, Id: affectedObjectsBlockTemplates.itemNumber, resizable: "enabled", template: affectedObjectsBlockTemplates.itemNumber, },
        { headerText: "Part Family", field: affectedObjectsBlockTemplates.partGroup, Id: affectedObjectsBlockTemplates.partGroup, resizable: "enabled", template: affectedObjectsBlockTemplates.partGroup, },
        { headerText: "Specification", field: affectedObjectsBlockTemplates.specification, Id: affectedObjectsBlockTemplates.specification, resizable: "enabled", template: affectedObjectsBlockTemplates.specification, },
        { headerText: "Calculated Compliance", field: affectedObjectsBlockTemplates.calculatedCompliance, Id: affectedObjectsBlockTemplates.calculatedCompliance, resizable: "enabled", template: affectedObjectsBlockTemplates.calculatedCompliance, },
        { headerText: "Declared Compliance", field: affectedObjectsBlockTemplates.declaredCompliance, Id: affectedObjectsBlockTemplates.declaredCompliance, resizable: "enabled", template: affectedObjectsBlockTemplates.declaredCompliance, },
        { headerText: "Declaration Status", field: affectedObjectsBlockTemplates.status, Id: affectedObjectsBlockTemplates.status, resizable: "enabled", template: affectedObjectsBlockTemplates.status, },
        { headerText: "Filled Status", field: affectedObjectsBlockTemplates.filled, Id: affectedObjectsBlockTemplates.filled, resizable: "enabled", template: affectedObjectsBlockTemplates.filled, },
      ],
      CMRT: {
        PRODUCT: [
          { headerText: "Mfr. Part", field: affectedObjectsBlockTemplates.manufacturerPartNumber, Id: affectedObjectsBlockTemplates.manufacturerPartNumber, resizable: "enabled", template: affectedObjectsBlockTemplates.manufacturerPartNumber, },
          { headerText: "Manufacturer Number", field: affectedObjectsBlockTemplates.manufacturerNumber, Id: affectedObjectsBlockTemplates.manufacturerNumber, resizable: "enabled", template: affectedObjectsBlockTemplates.manufacturerNumber, },
          { headerText: "Manufacturer Name", field: affectedObjectsBlockTemplates.manufacturerName, Id: affectedObjectsBlockTemplates.manufacturerName, resizable: "enabled", template: affectedObjectsBlockTemplates.manufacturerName, },
          { headerText: "Part Family", field: affectedObjectsBlockTemplates.partGroup, Id: affectedObjectsBlockTemplates.partGroup, resizable: "enabled", template: affectedObjectsBlockTemplates.partGroup, },
          { headerText: "Calculated Compliance", field: affectedObjectsBlockTemplates.calculatedCompliance, Id: affectedObjectsBlockTemplates.calculatedCompliance, resizable: "enabled", template: affectedObjectsBlockTemplates.calculatedCompliance, },
          { headerText: "Declared Compliance", field: affectedObjectsBlockTemplates.declaredCompliance, Id: affectedObjectsBlockTemplates.declaredCompliance, resizable: "enabled", template: affectedObjectsBlockTemplates.declaredCompliance, },
        ],
        COMPANY: [
          { headerText: "Manufacturer Name", field: affectedObjectsBlockTemplates.manufacturerName, Id: affectedObjectsBlockTemplates.manufacturerName, resizable: "enabled", template: affectedObjectsBlockTemplates.manufacturerName, },
          { headerText: "Calculated Compliance", field: affectedObjectsBlockTemplates.calculatedCompliance, Id: affectedObjectsBlockTemplates.calculatedCompliance, resizable: "enabled", template: affectedObjectsBlockTemplates.calculatedCompliance, },
          { headerText: "Declared Compliance", field: affectedObjectsBlockTemplates.declaredCompliance, Id: affectedObjectsBlockTemplates.declaredCompliance, resizable: "enabled", template: affectedObjectsBlockTemplates.declaredCompliance, },
        ]
      }
    },
    COPY_COMPOSITION: {
      mpn: [
        copyCompositionDeclarationColumn,
        { headerText: "Manufacturer Number", resizable: "enabled", width: "11rem", Id: "manufacturerNumber", template: "manufacturerNumber" },
        { headerText: "Manufacturer Part Number", resizable: "enabled", width: "11rem", Id: "manufacturerPartNumber", template: "manufacturerPartNumber" },
        ...commonCopyCompositionColumns
      ],
      item: [
        copyCompositionDeclarationColumn,
        { headerText: "Item Number", resizable: "enabled", width: "11rem", Id: "itemNumber", template: "itemNumber" },
        ...commonCopyCompositionColumns
      ],
      part_group: [
        copyCompositionDeclarationColumn,
        { headerText: "Part Group", resizable: "enabled", width: "11rem", Id: "partGroup", template: "partGroup" },
        ...commonCopyCompositionColumns
      ]
    },
  },
  CMRT_BLOCK: {
    DECLARATION_QUESTIONS: [
      { headerText: "Question", field: cmrtQuestionTemplates.question, Id: cmrtQuestionTemplates.question, resizable: "enabled", template: cmrtQuestionTemplates.question, className: "oj-read-only", width: "20rem" },
      { headerText: "Answer", field: cmrtQuestionTemplates.answer, Id: cmrtQuestionTemplates.answer, resizable: "enabled", template: cmrtQuestionTemplates.answer, width: "4rem" },
      { headerText: "Comments", field: cmrtQuestionTemplates.comments, Id: cmrtQuestionTemplates.comments, resizable: "enabled", template: cmrtQuestionTemplates.comments, width: "5rem", className: "comments-column" }
    ],
    SMELTER_LIST: [
      { headerText: "Smelter Id", field: cmrtSmelterListTemplates.smelterId, Id: cmrtSmelterListTemplates.smelterId, resizable: "enabled", template: cmrtSmelterListTemplates.smelterId },
      { headerText: "Substance", field: cmrtSmelterListTemplates.substance, Id: cmrtSmelterListTemplates.substance, resizable: "enabled", template: cmrtSmelterListTemplates.substance },
      { headerText: "Smelter Name", field: cmrtSmelterListTemplates.smelterName, Id: cmrtSmelterListTemplates.smelterName, resizable: "enabled", template: cmrtSmelterListTemplates.smelterName },
      { headerText: "Smelter Lookup", field: cmrtSmelterListTemplates.lookup, Id: cmrtSmelterListTemplates.lookup, resizable: "enabled", template: cmrtSmelterListTemplates.lookup },
      { headerText: "Smelter Country", field: cmrtSmelterListTemplates.country, Id: cmrtSmelterListTemplates.country, resizable: "enabled", template: cmrtSmelterListTemplates.country },
      { headerText: "Smelter Id Source", field: cmrtSmelterListTemplates.source, Id: cmrtSmelterListTemplates.source, resizable: "enabled", template: cmrtSmelterListTemplates.source },
    ]
  },
  ATTACHMENTS: [
    { headerText: "File Name", Id: "fileName", template: "fileName", headerClassName: "oj-sm-only-hide", className: "oj-sm-only-hide", resizable: "enabled" },
    { headerText: "File Extension", Id: "fileExtension", template: "fileExtension", resizable: "enabled" },
    { headerText: "File Type", Id: "fileType", template: "fileType", resizable: "enabled" }
  ],
  REPORTS: [
    { headerText: "Id", Id: tableTemplates.REPORTS.id, field: tableTemplates.REPORTS.id, resizable: "enabled", template: tableTemplates.REPORTS.id, sortable: "disabled", width: "3rem" },
    { headerText: "Filename", Id: tableTemplates.REPORTS.fileName, field: tableTemplates.REPORTS.fileName, resizable: "enabled", template: tableTemplates.REPORTS.fileName, sortable: "disabled", width: "11rem" },
    { headerText: "Created Date", Id: tableTemplates.REPORTS.createdDate, field: tableTemplates.REPORTS.createdDate, resizable: "enabled", template: tableTemplates.REPORTS.createdDate, sortable: "disabled", width: "7rem" },
    { headerText: "Status", Id: tableTemplates.REPORTS.status, field: tableTemplates.REPORTS.status, resizable: "enabled", template: tableTemplates.REPORTS.status, sortable: "disabled", width: "14rem" }
  ],
  DOSSIERS: [
    { headerText: "Name", Id: dossiersTemplates.name, field: dossiersTemplates.name, resizable: "enabled", template: dossiersTemplates.name, sortable: "disabled" },
    { headerText: "Status", Id: dossiersTemplates.status, field: dossiersTemplates.status, resizable: "enabled", template: dossiersTemplates.status, sortable: "disabled" },
    { headerText: "Date", Id: dossiersTemplates.Date, field: dossiersTemplates.Date, resizable: "enabled", template: dossiersTemplates.Date, sortable: "disabled" },
    { headerText: "UUID", Id: dossiersTemplates.uuid, field: dossiersTemplates.uuid, resizable: "enabled", template: dossiersTemplates.uuid, sortable: "disabled" },
    { headerText: "Submission No", Id: dossiersTemplates.submission_number, field: dossiersTemplates.submission_number, resizable: "enabled", template: dossiersTemplates.submission_number, sortable: "disabled" }
  ],
  AML_REPORT: [
    { headerText: "Specification", resizable: "enabled", Id: amlReportTemplates.specificationName, field: amlReportTemplates.specificationName, template: amlReportTemplates.specificationName, maxWidth: 300 },
    { headerText: "Manufacturer", resizable: "enabled", Id: amlReportTemplates.manufacturerName, field: amlReportTemplates.manufacturerName, template: amlReportTemplates.manufacturerName },
    { headerText: "Mfr. Part", resizable: "enabled", Id: amlReportTemplates.manufacturerPartNumber, field: amlReportTemplates.manufacturerPartNumber, template: amlReportTemplates.manufacturerPartNumber },
    { headerText: "Compliance", resizable: "enabled", Id: amlReportTemplates.complianceStatus, field: amlReportTemplates.complianceStatus, template: amlReportTemplates.complianceStatus },
  ],
  FMD_REPORT: [
    { headerText: "Item", field: FmdReportTemplates.itemNumber, Id: FmdReportTemplates.itemNumber, resizable: "enabled", template: FmdReportTemplates.itemNumber, frozenEdge: "start" },
    { headerText: "Item Class", field: FmdReportTemplates.itemClass, Id: FmdReportTemplates.itemClass, resizable: "enabled", template: FmdReportTemplates.itemClass },
    { headerText: "Manufacturer", field: FmdReportTemplates.manufacturerNumber, Id: FmdReportTemplates.manufacturerNumber, resizable: "enabled", template: FmdReportTemplates.manufacturerNumber },
    { headerText: "Mfr. Part", field: FmdReportTemplates.manufacturerPartNumber, Id: FmdReportTemplates.manufacturerPartNumber, resizable: "enabled", template: FmdReportTemplates.manufacturerPartNumber },
    { headerText: "Exemptions", field: FmdReportTemplates.exemptions, Id: FmdReportTemplates.exemptions, resizable: "enabled", template: FmdReportTemplates.exemptions, width: "10%" },
    { headerText: "FMD Mass", field: FmdReportTemplates.fmdMass, Id: FmdReportTemplates.fmdMass, resizable: "enabled", template: FmdReportTemplates.fmdMass },
    { headerText: "Subpart", field: FmdReportTemplates.Subpart, Id: FmdReportTemplates.Subpart, resizable: "enabled", template: FmdReportTemplates.Subpart },
    { headerText: "Material", field: FmdReportTemplates.Material, Id: FmdReportTemplates.Material, resizable: "enabled", template: FmdReportTemplates.Material },
    { headerText: "Substance Group", field: FmdReportTemplates.SubstanceGroup, Id: FmdReportTemplates.SubstanceGroup, resizable: "enabled", template: FmdReportTemplates.SubstanceGroup },
    { headerText: "Substance", field: FmdReportTemplates.Substance, Id: FmdReportTemplates.Substance, resizable: "enabled", template: FmdReportTemplates.Substance },
    { headerText: "CAS Number", field: FmdReportTemplates.casNumber, Id: FmdReportTemplates.casNumber, resizable: "enabled", template: FmdReportTemplates.casNumber },
    { headerText: "Declared Mass", field: FmdReportTemplates.declaredMass, Id: FmdReportTemplates.declaredMass, resizable: "enabled", template: FmdReportTemplates.declaredMass },
    { headerText: "Calculated Mass", field: FmdReportTemplates.calculatedMass, Id: FmdReportTemplates.calculatedMass, resizable: "enabled", template: FmdReportTemplates.calculatedMass },
    { headerText: "Result Mass", field: FmdReportTemplates.resultMass, Id: FmdReportTemplates.resultMass, resizable: "enabled", template: FmdReportTemplates.resultMass },
    { headerText: "Declared PPM", field: FmdReportTemplates.declaredPPM, Id: FmdReportTemplates.declaredPPM, resizable: "enabled", template: FmdReportTemplates.declaredPPM },
    { headerText: "Calculated PPM", field: FmdReportTemplates.calculatedPpm, Id: FmdReportTemplates.calculatedPpm, resizable: "enabled", template: FmdReportTemplates.calculatedPpm },
    { headerText: "Over Threshold", field: FmdReportTemplates.overThreshold, Id: FmdReportTemplates.overThreshold, resizable: "enabled", template: FmdReportTemplates.overThreshold },
    { headerText: "Threshold PPM", field: FmdReportTemplates.thresholdPpm, Id: FmdReportTemplates.thresholdPpm, resizable: "enabled", template: FmdReportTemplates.thresholdPpm },
    { headerText: "Final Compliance", field: FmdReportTemplates.finalCompliance, Id: FmdReportTemplates.finalCompliance, resizable: "enabled", template: FmdReportTemplates.finalCompliance },
    { headerText: "Declared Compliance", field: FmdReportTemplates.declaredCompliance, Id: FmdReportTemplates.declaredCompliance, resizable: "enabled", template: FmdReportTemplates.declaredCompliance },
    { headerText: "Calculated Compliance", field: FmdReportTemplates.calculatedCompliance, Id: FmdReportTemplates.calculatedCompliance, resizable: "enabled", template: FmdReportTemplates.calculatedCompliance },
  ]
}