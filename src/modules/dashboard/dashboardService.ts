
export interface DashboardCardRow {
    label: string,
    count: number,
    superscript?: boolean,
    class: string,
    visibility: boolean,
    link: string
}

export interface ConveyorBeltCard {
    order: number,
    icon: string,
    label: string,
    link: string
}