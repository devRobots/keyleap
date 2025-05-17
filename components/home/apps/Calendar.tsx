export default function Calendar() {
    return (
        <table className="w-full h-full">
            <thead className="sticky top-0 bg-background-primary/50 select-none">
                <tr>
                    <th className="p-2">LUN</th>
                    <th className="p-2">MAR</th>
                    <th className="p-2">MIE</th>
                    <th className="p-2">JUE</th>
                    <th className="p-2">VIE</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 4 }).map((_, i) => (
                    <tr key={`calendar-row-${i}`} className="border-b border-background-primary/50">
                        {Array.from({ length: 5 }).map((_, j) => (
                            <td
                                key={`calendar-cell-${i}-${j}`}
                                className="hover:bg-accent-interactive-hover/10 cursor-pointer text-center">
                                {(i * 5) + (1 + j)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}