export default function Pattern() {
    const cols = 144; // number of columns
    const rows = 80;  // number of rows
    const gap = 14;
    const size = 4;

    const rects = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Randomly decide if this rect is dark
            const isDark = Math.random() < 0.1; // 10% chance
            const fill = isDark ? "#A0A0A0" : "#D9D9D9";

            rects.push(
                <rect
                    key={`${row}-${col}`}
                    x={col * gap}
                    y={row * gap}
                    width={size}
                    height={size}
                    rx={2}
                    fill={fill}
                />
            );
        }
    }

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${cols * gap} ${rows * gap}`}
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
        >
            {rects}
        </svg>
    );
}
