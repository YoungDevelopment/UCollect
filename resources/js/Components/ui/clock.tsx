import { useCallback, useEffect, useMemo, useState } from "react";

export function Clock() {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, []);

    const tick = useCallback(() => {
        setDate(new Date());
    }, []);

    const options: any = { hour: "2-digit", minute: "2-digit", hour12: true };
    const timeString = useMemo(
        () => date.toLocaleTimeString("en-GB", options),
        [date]
    );

    return <span>{timeString}</span>;
}
