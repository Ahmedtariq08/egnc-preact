import { observer } from "mobx-react-lite";
import "ojs/ojtable";
import { useEffect, useState } from "preact/hooks";
import Skeleton from "react-loading-skeleton";
import { AuthService } from "../../../modules/auth/authService";
import { DashboardCardRow } from "../../../modules/dashboard/dashboardService";
import { useStore } from "../../../modules/store";
import { navigateToLink } from "../../../routes/redirection";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

export const CountCards = observer(() => {
    const userPermissions = AuthService.getPermissionsFromStorage();
    const { dashboardStore: { cardsLoading, objectsCards, thingsCards, loadAllCards } } = useStore();

    if (userPermissions === null) {
        return null;
    }

    const { isManager, isAdmin, isSupplier } = userPermissions;
    const showObjectsNeedingDec = (isManager || isAdmin);
    const showThingsToFinish = (isManager || isSupplier);
    return (
        <div className="oj-flex oj-sm-flex-direction-row oj-sm-padding-2x-horizontal declaration-cards-container">
            {showObjectsNeedingDec && <DashboardCard
                cardTitle="Objects Needing Declaration"
                footerText="* Showing count of last 7 days"
                rowCards={objectsCards}
                isCardLoading={cardsLoading}
            />}
            {showThingsToFinish && <DashboardCard
                cardTitle="Things To Finish"
                rowCards={thingsCards}
                isCardLoading={cardsLoading}
            />}
        </div>
    );
});

//ANCHOR - One single dashboard card
interface CardProps {
    cardTitle: string,
    footerText?: string,
    rowCards: DashboardCardRow[] | undefined,
    isCardLoading: boolean,
}

const DashboardCard = (props: CardProps) => {
    const { cardTitle, footerText, rowCards, isCardLoading } = props;
    const [rowsDp, setRowsDp] = useState(new MutableArrayDataProvider(rowCards, { keyAttributes: "label" }));

    useEffect(() => {
        if (rowCards) {
            rowsDp.data = rowCards;
        }
    }, [rowCards]);

    const redirect = (event: any, link: string) => {
        event.preventDefault();
        navigateToLink(link);
    }

    const renderRow = (inputRow: any) => {
        if (inputRow && inputRow.item && inputRow.item.data) {
            const row: DashboardCardRow = inputRow.item.data;
            let linkClass = `oj-typography-subheading-md oj-link-standalone  ${row.class}`
            return (
                <tr>
                    <td style='text-align: right; padding-right: 10px'>
                        <label class={linkClass}>{row.count}</label>
                        <a class={linkClass}>{row.superscript ? <sup>+</sup> : null}</a>
                    </td>
                    <td>
                        <a onClick={(event) => redirect(event, row.link)}
                            class="oj-typography-subheading-xs oj-link-standalone" href={row.link}>{row.label}</a>
                    </td>
                </tr>)
        }
        return null;
    }

    return (
        <div class="oj-flex-item oj-sm-4 oj-sm-margin-2x" style={{ cursor: "auto" }}>
            <div class="oj-typography-bold oj-typography-heading-xs oj-sm-margin-2x-bottom" style={{ color: 'whitesmoke' }}>
                <span>{cardTitle}</span>
            </div>
            <div>
                {isCardLoading ?
                    <Skeleton count={3} height={35} style={{ margin: '4px 0', opacity: 0.3 }} highlightColor="white" /> :
                    <oj-table
                        data={rowsDp}
                        columns={[{ "width": "100px" }, { "width": "16rem" }]}
                        columnsDefault={{ "sortable": "disabled" }}
                        style={{ borderRadius: '6px' }}
                    >
                        <template slot='rowTemplate' render={renderRow}></template>
                    </oj-table>}
            </div>
            {!isCardLoading && <span>{footerText ? <oj-label class="oj-label oj-text-color-secondary">{footerText}</oj-label> : null}</span>}

        </div>

    )
}