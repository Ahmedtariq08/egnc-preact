import { observer } from "mobx-react-lite"
import { Greetings } from "./components/Greetings";

const DashboardView = () => {
    return (
        <div className="dashboard-background">
            <Greetings />
        </div>
    )
}

export default observer(DashboardView);