import { observer } from "mobx-react-lite";
import { useStore } from "../../../modules/store";
import { ButtonComponent } from "../../../common/button/ButtonComponent";
import { Icons } from "../../../constants/iconsData";
import { FavouritesAndRecents } from "./FavouritesRecents";
import { navigateToPath, Paths } from '../../../routes/redirection'

export const HeaderToolbar = observer(() => {
    const { authStore } = useStore();
    const { userPemissions, logoutUser } = authStore;

    const resetPassword = () => {
        console.log("reset password");
    }

    const HomeButton = () => {
        return <ButtonComponent
            buttonTitle="Dashboard"
            icon={Icons.icons.home}
            ojAction={() => navigateToPath(Paths.Dashboard)}
        />
    }

    return (
        <oj-toolbar>
            {userPemissions?.isSupplier &&
                <>
                    <HomeButton />
                    <FavouritesAndRecents />
                </>
            }
            <oj-menu-button id="userMenu" chroming="borderless">
                <span>{userPemissions?.username}</span>
                <oj-menu id="menu1" slot="menu">
                    <oj-option onClick={logoutUser}>Sign Out</oj-option>
                    <oj-option onClick={resetPassword}>ResetPassword</oj-option>
                </oj-menu>
            </oj-menu-button>
        </oj-toolbar>
    )
});