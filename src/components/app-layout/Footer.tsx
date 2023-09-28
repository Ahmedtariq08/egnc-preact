export const Footer = () => {
    return (
        <footer
            className="oj-web-applayout-footer oj-applayout-fixed-bottom oj-bg-neutral-170 oj-color-invert"
            role="contentinfo"
        >
            <div className="oj-flex oj-sm-flex-direction-row oj-sm-align-items-center">
                <div className="oj-md-4"></div>
                <div className="oj-md-4">
                    <div
                        className="oj-flex oj-flex-item oj-sm-justify-content-center oj-text-color-secondary 
                    oj-typography-body-sm"
                    >
                        @2023 GoSaaS, Inc. Version: R23B
                    </div>
                </div>
                <div className="oj-md-4 oj-flex oj-sm-justify-content-flex-end">
                    <span className="gosaas-icon"></span>
                </div>
            </div>
        </footer>
    );
};
