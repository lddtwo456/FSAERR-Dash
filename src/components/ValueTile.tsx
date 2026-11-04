import { useTelemetry } from "../utilities/TelemetryProvider";

type Props = {
    title: string;
	id: string;
    unit: string;
};

/** Displays a value provided and updated by the parent component. */
export default function ValueTile({ title, id, unit }: Props) {
    const values = useTelemetry();
    const value = values[id];

	return (
		<div className="value-tile" aria-live="polite">
			<h3>{title}</h3>
			<p>{value === undefined ? '---' : value}{unit}</p>
		</div>
	);
}
