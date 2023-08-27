import { observer } from "mobx-react-lite";
import "ojs/ojmessages";
import { useStore } from "../../modules/store";

const Notifications = () => {
    const { commonStore: { notifications } } = useStore();

    return <oj-messages
        id="appNotifications"
        class="oj-color-invert"
        messages={notifications}
        position={{ offset: { y: 100 } }}
        display="notification"
        displayOptions={{ category: "none" }}
        style={{ paddingBottom: '50px' }}
    ></oj-messages>
}

export default observer(Notifications);