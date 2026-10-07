import { formatMillions, type DemoRegion } from "@/data/demoData";

export function DataTable({ rows }: { rows: DemoRegion[] }) {
  return (
    <div className="overflow-x-auto rounded-[14px] border border-line">
      <table className="min-w-[520px] w-full text-left text-[12px]">
        <caption className="sr-only">Example regional performance</caption>
        <thead className="bg-canvas text-muted">
          <tr>
            <th className="px-3 py-2 font-medium">Region</th>
            <th className="px-3 py-2 text-right font-medium">Revenue</th>
            <th className="px-3 py-2 text-right font-medium">Growth</th>
            <th className="px-3 py-2 text-right font-medium">Transactions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-line">
              <td className="px-3 py-2 font-medium text-ink">{row.name}</td>
              <td className="px-3 py-2 text-right tabular-nums">{formatMillions(row.revenue)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-accent">+{row.growth}%</td>
              <td className="px-3 py-2 text-right tabular-nums">
                {row.transactions.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
