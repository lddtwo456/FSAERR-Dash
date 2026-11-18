import { useTelemetry } from '../utilities/TelemetryProvider';
import { useRef, useEffect } from 'react';

type Props = {
    id: string;
    yellow: number;
    red: number;
    limit: number;
    width: number | string;
    height: number | string;
}

export function RPMTile({ id, yellow, red, limit, width, height }: Props) {
    const values = useTelemetry();
    const value = values[id];
    const divRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const valueRef = useRef<number>(value);

    const draw = (val: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        // can access value yellow red limit  here to draw the RPM gauge
    }

    useEffect(() => {
        const div = divRef.current;
        const canvas = canvasRef.current;
        if (!div || !canvas) return;

        const resize = () => {
            const { width, height } = div.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);

            const ctx = canvas.getContext('2d');
            ctx?.scale(dpr, dpr);

            draw(valueRef.current);
        };

        const observer = new ResizeObserver(resize);
        observer.observe(div);
        resize();

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        valueRef.current = value;
        draw(valueRef.current);
    }, [value]);

    return (
        <div ref={divRef} className="tile" aria-live="polite" style={{ width: width, height: height }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
    )
}