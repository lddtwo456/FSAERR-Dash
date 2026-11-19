import { useTelemetry } from '../utilities/TelemetryProvider';
import { useRef, useEffect } from 'react';

type Props = {
    id: string;
    green: number;
    yellow: number;
    red: number;
    limit: number;
    width: number | string;
    height: number | string;
}

export function RPMTile({ id, green, yellow, red, limit, width, height }: Props) {
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
        const w = canvas.width;
        const h = canvas.height;

        const segments = Math.round(w / (h * 0.333));
        const segmentWidth = w / segments;
        const segmentPadding = segmentWidth * 0.05;
        const segmentValue = (limit - green) / segments;
        
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < segments; i++) {
            ctx.fillStyle = i * segmentValue + green < yellow ? 'green' : i * segmentValue + green< red ? 'yellow' : 'red';
            ctx.fillRect(i * segmentWidth + segmentPadding, segmentPadding, segmentWidth - segmentPadding * 2, h - segmentPadding * 2);
        }
        
        ctx.stroke();
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