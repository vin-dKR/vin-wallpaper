"use client";
import { JSX, useEffect, useState } from "react";

export default function Pattern() {
    const [rects, setRects] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const cols = 144;
        const rows = 80;
        const gap = 14;
        const size = 4;
        const temp: JSX.Element[] = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const isDark = Math.random() < 0.1;
                temp.push(
                    <rect
                        key={`${row}-${col}`}
                        x={col * gap}
                        y={row * gap}
                        width={size}
                        height={size}
                        rx={2}
                        fill={isDark ? "#A0A0A0" : "#D9D9D9"}
                    />
                );
            }
        }

        setRects(temp);
    }, []);

    // Render empty SVG until client has generated rects
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 2016 1120"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
        >
            {rects}
        </svg>
    );
}
