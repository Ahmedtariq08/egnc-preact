import { observer } from "mobx-react-lite";
import { useEffect } from 'react';
import { useStore } from "../../modules/store";
import ConveyorBelt from "./components/ConveyorBelt";
import { CountCards } from "./components/CountCards";
import { Greetings } from "./components/Greetings";

const DashboardView = () => {
    const { dashboardStore: { loadAllCards } } = useStore();

    useEffect(() => {
        loadAllCards();
    }, [loadAllCards]);

    return (
        <div className="dashboard-background">
            <div className='greetings-conveyor-container'>
                <Greetings />
                <ConveyorBelt />
                <CountCards />
            </div>
        </div>
    )
}

export default observer(DashboardView);