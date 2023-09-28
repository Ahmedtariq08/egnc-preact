/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from "mobx-react-lite";
import "ojs/ojactioncard";
import "ojs/ojavatar";
import "ojs/ojconveyorbelt";
import { useStore } from "../../../modules/store";
import { type Pages, navigateToPath } from "../../../routes/redirection";

const ConveyorBelt = () => {
    const {
        dashboardStore: { conveyorBeltCards },
    } = useStore();

    const redirection = (event: any, link: Pages) => {
        event.preventDefault();
        void navigateToPath(link as any);
    };

    return (
        <div id="conveyorbelt-action-cards-example" className="oj-flex">
            <oj-conveyor-belt id="conveyorBelt" class="oj-lg-9 oj-md-9 oj-sm-12 oj-flex-item">
                {conveyorBeltCards.map((card) => {
                    return (
                        <oj-action-card
                            key={card.label}
                            id="conveyorActionCard"
                            class="demo-card oj-sm-margin-12x-vertical oj-sm-margin-2x-horizontal"
                            onClick={(event) => {
                                redirection(event, card.link);
                            }}
                        >
                            <div className="action-card-container">
                                <oj-avatar
                                    id="actionCardAvatar"
                                    iconClass={card.icon}
                                    class={`oj-sm-margin-1x-bottom`}
                                    size="xl"
                                    role="img"
                                    title={card.label}
                                ></oj-avatar>
                                <span className="card-label">{card.label}</span>
                            </div>
                        </oj-action-card>
                    );
                })}
            </oj-conveyor-belt>
        </div>
    );
};
export default observer(ConveyorBelt);
