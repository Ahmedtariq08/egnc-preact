import { observer } from "mobx-react-lite";
import "ojs/ojgauge";
import "ojs/ojoption";
import "ojs/ojselectcombobox";
import { ButtonComponent } from "src/common/button/ButtonComponent";
import { Icons } from "../../../constants";
import { allReports } from "../../../modules/reports/reportModels";
import { useStore } from "../../../modules/store";
import { removeInputFocus } from "../../../utils";

export const GenerateReport = observer(() => {
    const { reportStore } = useStore();
    const { selectedReport, progress, filename, disableGenerate } = reportStore;
    const { reportSelectionHandler, filenameHandler, generateClick } = reportStore;

    const ReportSelector = () => {
        const menuClass = Icons.classes.menuItem;
        return (
            <oj-combobox-one
                placeholder="Select a Report"
                value={selectedReport}
                onvalueChanged={reportSelectionHandler}
            >
                {allReports.map((report) => {
                    return (
                        <oj-option class={Icons.classes.menuItem} value={report} key={report.title}>
                            <a style={"padding-left: 55px"}>
                                <span
                                    className={report.icon.concat(" ", menuClass, "-icon")}
                                    slot="startIcon"
                                />
                                {report.title}
                            </a>
                        </oj-option>
                    );
                })}
            </oj-combobox-one>
        );
    };

    const GenerateReportFooter = () => {
        return (
            <div className="generate-report-button-container">
                <div className="gauge-container">
                    {progress != null && progress >= 0 ? (
                        <oj-status-meter-gauge
                            id="gauge3"
                            min={0}
                            max={100}
                            value={Math.round(progress)}
                            orientation="circular"
                            readonly={true}
                            metricLabel={{ rendered: "on", textType: "percent" }}
                            class="circular-status-meter-common circular-status-meter-large"
                        ></oj-status-meter-gauge>
                    ) : (
                        <oj-input-text
                            id="FileNameField"
                            placeholder="Enter file name"
                            value={filename}
                            spellcheck={false}
                            onMouseLeave={() => {
                                removeInputFocus("FileNameField");
                            }}
                            onvalueChanged={filenameHandler}
                            required={true}
                        ></oj-input-text>
                    )}
                </div>
                <div className="gauge-button-container oj-sm-margin-8x-bottom">
                    <ButtonComponent
                        buttonTitle="Generate"
                        chroming="callToAction"
                        disabled={disableGenerate}
                        ojAction={generateClick}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="generate-report-container custom-box-shadow">
            <h6>Generate Report</h6>
            <div className="generate-report-input">
                <div style={{ marginTop: "1rem" }}>
                    <ReportSelector />
                </div>
                {/* {reportFields.map((field) => {
                    {
                        return (
                            // <FieldDropdown
                            //     key={field.}
                            //     field={field}
                            //     allFields={reportFields}
                            //     setAllFields={setReportFields}
                            // />
                        );
                    }
                })} */}
            </div>
            <GenerateReportFooter />
        </div>
    );
});
