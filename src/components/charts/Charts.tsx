import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

function useDrawIn<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setOn(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref: ref as RefObject<T | null>, on };
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { ref, on } = useDrawIn<HTMLSpanElement>();
  const [shown, setShown] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!on) return;
    if (reduce) {
      setShown(value);
      return;
    }
    const start = performance.now();
    const duration = 800;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setShown(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, reduce, on]);

  const text =
    decimals > 0 ? shown.toFixed(decimals) : Math.round(shown).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

export function KpiCard({
  label,
  display,
  accent,
  countValue,
  prefix,
  suffix,
  decimals,
}: {
  label: string;
  display: string;
  accent?: boolean;
  countValue?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  return (
    <div className="rounded-[14px] border border-line bg-card px-3.5 py-3">
      <p className="text-[11px] font-medium text-muted">{label}</p>
      <p className={cn("mt-1 text-xl font-semibold tracking-tight tabular-nums", accent && "text-accent")}>
        {countValue != null ? (
          <CountUp
            value={countValue}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals ?? 0}
          />
        ) : (
          display
        )}
      </p>
    </div>
  );
}

export function LineChart({
  points,
  labels,
  className,
}: {
  points: number[];
  labels?: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const gid = useId().replace(/:/g, "");
  const { ref, on } = useDrawIn<SVGSVGElement>();
  const w = 320;
  const h = 128;
  const pad = 18;
  const max = Math.max(...points);
  const min = Math.min(...points) * 0.85;
  const coords = points.map((p, i) => {
    const x = pad + (i * (w - pad * 2)) / (points.length - 1);
    const y = h - pad - ((p - min) / (max - min)) * (h - pad * 2);
    return { x, y };
  });
  const line = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const area = `${pad},${h - pad} ${line} ${w - pad},${h - pad}`;
  const length = coords.reduce((acc, c, i) => {
    if (i === 0) return 0;
    const prev = coords[i - 1];
    return acc + Math.hypot(c.x - prev.x, c.y - prev.y);
  }, 0);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-28 w-full", className)}
      aria-hidden="true"
    >
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#E4DFD4" strokeWidth="1" />
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="#E4DFD4" strokeWidth="1" />
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B6E6A" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0B6E6A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${gid})`} opacity={on || reduce ? 1 : 0} />
      <polyline
        points={line}
        fill="none"
        stroke="#0B6E6A"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={reduce || on ? 0 : length}
        style={{ transition: reduce ? undefined : "stroke-dashoffset 0.9s ease" }}
      />
      {on && !reduce && (
        <circle cx={coords.at(-1)?.x} cy={coords.at(-1)?.y} r="3.5" fill="#0B6E6A" />
      )}
      {labels?.map((label, i) => (
        <text
          key={label}
          x={coords[i].x}
          y={h - 4}
          textAnchor="middle"
          fontSize="8"
          fill="#5C6570"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

export function BarChart({
  items,
  className,
}: {
  items: { name: string; value: number }[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { ref, on } = useDrawIn<HTMLDivElement>();
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div ref={ref} className={cn("space-y-2.5", className)}>
      {items.map((item, i) => (
        <div key={item.name}>
          <div className="mb-1 flex items-center justify-between text-[12px]">
            <span className="text-ink-2">{item.name}</span>
            <span className={cn("tabular-nums text-muted transition-opacity", on || reduce ? "opacity-100" : "opacity-0")}>
              {item.value}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-canvas-2">
            <div
              className="h-full rounded-full bg-accent"
              style={{
                width: `${on || reduce ? (item.value / max) * 100 : 0}%`,
                transition: reduce ? undefined : `width 0.7s ease ${i * 80}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ColumnChart({
  items,
  className,
}: {
  items: { name: string; value: number }[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { ref, on } = useDrawIn<HTMLDivElement>();
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div ref={ref} className={cn("flex h-32 items-end gap-2", className)}>
      {items.map((item, i) => (
        <div key={item.name} className="flex flex-1 flex-col items-center gap-1.5">
          <div
            className="w-full rounded-t-md bg-accent/85 origin-bottom"
            style={{
              height: `${(item.value / max) * 100}%`,
              transform: on || reduce ? "scaleY(1)" : "scaleY(0)",
              transition: reduce ? undefined : `transform 0.65s ease ${i * 70}ms`,
            }}
          />
          <span className="text-[10px] text-muted">{item.name}</span>
        </div>
      ))}
    </div>
  );
}
