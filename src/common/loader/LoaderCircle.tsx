import "ojs/ojlabelvalue";
import "ojs/ojlabel";
import "ojs/ojprogress-circle";

export interface CustomLoader {
    isLoading: boolean;
    text?: string;
    styleClasses?: string;
}

export const LoaderCircle = (props: CustomLoader) => {
    const { isLoading, text = "Loading ...", styleClasses } = props;
    const classesToApply = styleClasses
        ? `loader-center ${styleClasses}`
        : "loader-center";
    const Circle = () => {
        return (
            <div>
                <br></br>
                <div id="loader" className={classesToApply}>
                    <oj-progress-circle
                        id="progressCircle"
                        value={-1}
                        size="sm"
                    ></oj-progress-circle>
                    <div className="oj-sm-margin-4x-vertical"></div>&nbsp;&nbsp;
                    <oj-label-value>
                        <oj-label slot="label" label-id="status">
                            {text}
                        </oj-label>
                        <div
                            slot="value"
                            id="loadingRegion"
                            aria-labelledby="status"
                            aria-busy="true"
                            aria-describedby="progressCircle"
                        ></div>
                    </oj-label-value>
                </div>
            </div>
        );
    };
    return isLoading ? <Circle /> : <></>;
};
