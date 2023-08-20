import { observer } from "mobx-react-lite"
import { Greetings } from "./components/Greetings";
import { useEffect } from 'react';
import { useStore } from "../../modules/store";
import ConveyorBelt from "./components/ConveyorBelt";

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

            </div>
        </div>
    )
}

export default observer(DashboardView);