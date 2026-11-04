import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const TelemetryContext = createContext<Record<string, number>>({});

export function TelemetryProvider({ children }: { children: ReactNode }) {
    const [values, setValues] = useState<Record<string, number>>({});

    useEffect(() => {
        const id = setInterval(async () => {
            setValues(await window.api.getUpdatedValues())
        }, 50)
        return () => clearInterval(id)
    }, [])

    return <TelemetryContext.Provider value={values}>{children}</TelemetryContext.Provider>
}

export const useTelemetry = () => useContext(TelemetryContext);