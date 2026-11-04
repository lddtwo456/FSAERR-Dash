import { useTelemetry } from "../utilities/TelemetryProvider";

type Props = {
    title: string;
    id: string;
}

/** Displays a boolean value provided and updated by the parent component. */
export default function BoolTile({ title, id }: Props) {
    const values = useTelemetry();
    const value = values[id];

    return (
        <div 
            className={value === undefined ? "tile" : value ? "tile true" : "tile false"}
            aria-live="polite"
        >
            <h3>{title}</h3>
        </div>
    );
}