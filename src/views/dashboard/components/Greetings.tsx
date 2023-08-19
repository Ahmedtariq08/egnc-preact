import { useStore } from "../../../modules/store";
import { Constants } from "../../../constants/constants";
const { GREETINGS } = Constants;

export const Greetings = () => {
    const { authStore: { userPemissions } } = useStore();
    const username = userPemissions?.username ?? '';
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let greetingString = (hour >= 4 && hour < 12) ? GREETINGS.GOOD_MORNING :
        (hour >= 12 && hour < 17) ? GREETINGS.GOOD_NOON :
            (hour >= 17 || hour < 4) ? GREETINGS.GOOD_EVENING : GREETINGS.GOOD_DAY;

    return (<div>
        <h1 class="greeting">{`${greetingString}, ${username}!`}</h1>
    </div>)
}