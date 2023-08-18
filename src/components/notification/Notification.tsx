import { ojMessage } from "@oracle/oraclejet/ojmessage";
import { observer } from "mobx-react-lite";
import "ojs/ojmessages";
import { useEffect, useState } from 'preact/hooks';
import { useStore } from "../../modules/store";
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

const Notifications = () => {
    const { commonStore: { notifications } } = useStore();

    //need this data provider for oj-messages to work globally
    const [appMessages, setAppMessages] = useState<MutableArrayDataProvider<string, ojMessage.Message>>(new MutableArrayDataProvider<string, ojMessage.Message>([], { keyAttributes: 'id' }));

    useEffect(() => {
        if (notifications.length > 0) {
            appMessages.data = notifications;
        }
    }, [notifications]);

    return <oj-messages
        id="appNotifications"
        class="oj-color-invert"
        messages={appMessages}
        position={{ offset: { y: 100 } }}
        display="notification"
        displayOptions={{ category: "none" }}
    ></oj-messages>
}

export default observer(Notifications);