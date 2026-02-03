import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

const TARPON_SPRINGS_STATION = "8726917";;

function formatTick(ts) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "numeric",
    hour12: true,
  });
}

export default function TideChart() {
  const stationId = TARPON_SPRINGS_STATION;

  const [loading, setLoading] = useState(true);
  const [tideData, setTideData] = useState([]);
  const [error, setError] = useState("");

  const { beginDate, endDate } = useMemo(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const fmt = (d) => d.toISOString().slice(0, 10).replace(/-/g, "");
    return { beginDate: fmt(today), endDate: fmt(tomorrow) };
  }, []);

  useEffect(() => {
    const fetchTides = async () => {
      setLoading(true);
      setError("");

      try {
        const url =
          `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter` +
          `?product=predictions` +
          `&application=nscharters` +
          `&begin_date=${beginDate}` +
          `&end_date=${endDate}` +
          `&datum=MLLW` +
          `&station=${stationId}` +
          `&time_zone=lst_ldt` +
          `&units=english` +
          `&interval=h` +
          `&format=json`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`NOAA failed (${res.status})`);

        const json = await res.json();
        const preds = json?.predictions ?? [];

        const todayStr = new Date().toISOString().slice(0, 10);

        const chart = preds
          .filter((p) => p.t.startsWith(todayStr))
          .map((p) => ({
            time: new Date(p.t.replace(" ", "T")).getTime(), // 🔑 timestamp
            height: Number(p.v),
          }));

        setTideData(chart);
      } catch (e) {
        console.error("Tide fetch error:", e);
        setError(String(e?.message ?? e));
        setTideData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTides();
  }, [stationId, beginDate, endDate]);

  const nowTs = Date.now();

  return (
    <Card className="shadow-lg">
      <CardHeader
        className="text-white"
        style={{ background: "linear-gradient(to right, #14B8A6, #0D9488)" }}
      >
        <CardTitle className="flex items-center gap-2">
          <Waves size={28} />
          NOAA Tide Chart — Tarpon Springs
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {loading ? (
          <div className="text-slate-600">Loading tides…</div>
        ) : error ? (
          <div className="text-slate-600">
            Tides unavailable: <span className="text-red-600">{error}</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tideData}>
              <CartesianGrid strokeDasharray="3 3" />

              {/* EXACT NOW INDICATOR */}
              <ReferenceLine
                x={nowTs}
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{
                  value: "Now",
                  position: "top",
                  fill: "#ef4444",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />

              <XAxis
                dataKey="time"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickFormatter={formatTick}
                tick={{ fontSize: 12 }}
                minTickGap={24}
              />

              <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />

              <Tooltip
                labelFormatter={(v) => formatTick(v)}
                formatter={(v) => [`${Number(v).toFixed(2)} ft`, "Tide Height"]}
              />

              <Line
                type="monotone"
                dataKey="height"
                stroke="#2563eb"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        <p className="text-xs text-slate-500 mt-4 text-center">
          Data from NOAA Tides & Currents • Tarpon Springs (Station 8726917)
        </p>
      </CardContent>
    </Card>
  );
}