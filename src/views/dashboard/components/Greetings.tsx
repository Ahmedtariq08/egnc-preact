import { useStore } from "../../../modules/store";
import { Constants } from "../../../constants/constants";
import { observer } from "mobx-react-lite";
const { GREETINGS } = Constants;

export const Greetings = observer(() => {
    const {
        authStore: { userPemissions },
    } = useStore();
    const username = userPemissions?.username ?? "";
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const greetingString =
        hour >= 4 && hour < 12
            ? GREETINGS.GOOD_MORNING
            : hour >= 12 && hour < 17
            ? GREETINGS.GOOD_NOON
            : hour >= 17 || hour < 4
            ? GREETINGS.GOOD_EVENING
            : GREETINGS.GOOD_DAY;

    return (
        <div>
            <h1 className="greeting">{`${greetingString}, ${username}!`}</h1>
        </div>
    );
});
