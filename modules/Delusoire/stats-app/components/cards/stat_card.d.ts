/// <reference types="react" />
interface StatCardProps {
    label: string;
    value: number | string;
}
declare function StatCard(props: StatCardProps): React.ReactElement<HTMLDivElement>;
export default StatCard;
