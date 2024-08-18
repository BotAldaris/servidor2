export interface ITableFaceted<T> {
	label: string;
	value: T;
	icon?: React.ComponentType<{
		className?: string;
	}>;
}
