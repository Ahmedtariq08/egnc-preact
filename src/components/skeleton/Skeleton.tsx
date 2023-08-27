import Skeleton from "react-loading-skeleton";

const DEFAULTS = {
    TABLE_ROWS: 10
}

interface TableSkeletonProps {
    count?: number
}

export const TableRowSkeleton = (props: TableSkeletonProps) => {
    const { count = DEFAULTS.TABLE_ROWS } = props;
    return (
        <Skeleton count={count} height={35} style={{ margin: '4px 0' }} />
    )
}