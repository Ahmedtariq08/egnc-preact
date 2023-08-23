
interface Props {
    isApprovals: boolean
}

export const PendingView = (props: Props) => {
    const { isApprovals } = props;
    return (
        <h1>Pending {isApprovals ? 'Approvals' : 'Requests'}</h1>
    )
}