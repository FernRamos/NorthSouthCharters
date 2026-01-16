import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const STATIONS = {
  "Crystal River": "8727333",
  "Tampa Bay": "8726607",
  "Tarpon Springs": "8726942",
};

function formatHourLabel(isoLike) {
  // NOAA returns "YYYY-MM-DD HH:MM"
  const d = new Date(isoLike.replace(" ", "T"));
  return d.toLocaleTimeString([], { hour: "numeric", hour12: true });
}

export default function TideChart({ location = "Crystal River" }) {
  const stationId = STATIONS[location] ?? STATIONS["Crystal River"];

  const [loading, setLoading] = useState(true);
  const [tideData, setTideData] = useState([]);
  const [error, setError] = useState("");

  const { beginDate, endDate } = useMemo(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const fmt = (d) => d.toISOString().slice(0, 10).replace(/-/g, "");
    return { beginDate: fmt(today), endDate: fmt(tomorrow) };
  }, [location]);

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

        const chart = preds.map((p) => ({
          time: formatHourLabel(p.t),
          height: Number(p.v),
        }));

        setTideData(chart);
      } catch (e) {
        console.error("Tide fetch error:", e);
        setTideData([]);
        setError(String(e?.message ?? e));
      } finally {
        setLoading(false);
      }
    };

    fetchTides();
  }, [stationId, beginDate, endDate]);

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-white" style={{ background: "linear-gradient(to right, #14B8A6, #0D9488)" }}>
        <CardTitle className="flex items-center gap-2">
          <Waves size={28} />
          NOAA Tide Chart — {location}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {loading ? (
          <div className="text-slate-600">Loading tides…</div>
        ) : error ? (
          <div className="text-slate-600">
            Tides unavailable right now: <span className="text-red-600">{error}</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tideData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} interval={2} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`${Number(v).toFixed(2)} ft`, "Tide Height"]} />
              <Line type="monotone" dataKey="height" strokei strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}

        <p className="text-xs text-slate-500 mt-4 text-center">
          Data from NOAA Tides & Currents • Station {stationId}
        </p>
      </CardContent>
    </Card>
  );
}