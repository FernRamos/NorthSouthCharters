import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TideChart({ location = "Crystal River" }) {
  const [tideData, setTideData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const noaaStations = useMemo(
    () => ({
      "Crystal River": "8727333",
      "Tampa Bay": "8726607",
      "Tarpon Springs": "8726942",
    }),
    []
  );

  useEffect(() => {
    const stationId = noaaStations[location] || noaaStations["Crystal River"];

    const fetchTides = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const fmt = (d) => d.toISOString().slice(0, 10).replace(/-/g, "");
        const beginDate = fmt(today);
        const endDate = fmt(tomorrow);

        const url =
          "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter" +
          `?product=predictions` +
          `&application=NOS.COOPS.TAC.WL` +
          `&begin_date=${beginDate}` +
          `&end_date=${endDate}` +
          `&datum=MLLW` +
          `&station=${stationId}` +
          `&time_zone=lst_ldt` +
          `&units=english` +
          `&interval=h` +
          `&format=json`;

        const res = await fetch(url, { cache: "no-store" });
        const json = await res.json();

        if (!res.ok || json?.error) {
          throw new Error(json?.error?.message || `NOAA request failed (${res.status})`);
        }

        const hourly = (json.predictions || []).map((p) => {
          // NOAA gives "YYYY-MM-DD HH:MM"
          const dt = new Date(p.t.replace(" ", "T"));
          const label = dt.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          });
          return { time: label, height: Number(p.v) };
        });

        setTideData(hourly);
      } catch (err) {
        console.error("Tide fetch error:", err);
        setTideData([]);
        setErrorMsg(err?.message || "Could not load tides.");
      } finally {
        setLoading(false);
      }
    };

    fetchTides();
  }, [location, noaaStations]);

  const stationId = noaaStations[location] || noaaStations["Crystal River"];

  return (
    <Card className="shadow-lg">
      <CardHeader
        className="text-white"
        style={{ background: "linear-gradient(to right, #14B8A6, #0D9488)" }}
      >
        <CardTitle className="flex items-center gap-2">
          <Waves size={28} />
          NOAA Tide Chart - {location}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin" size={48} style={{ color: "var(--brand-sky)" }} />
          </div>
        ) : tideData.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-slate-700 font-medium">Tides unavailable right now.</p>
            {errorMsg && <p className="text-slate-500 text-sm mt-2">{errorMsg}</p>}
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h4 className="font-semibold text-slate-900 mb-1">Today's Tide Levels</h4>
              <p className="text-sm text-slate-600">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tideData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: 12 }} />
                <YAxis
                  stroke="#64748b"
                  style={{ fontSize: 12 }}
                  label={{
                    value: "Height (ft MLLW)",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: 12 },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: 8,
                    color: "white",
                  }}
                  labelStyle={{ color: "#cbd5e1" }}
                  formatter={(value) => [`${Number(value).toFixed(2)} ft`, "Tide Height"]}
                />
                <Line
                  type="monotone"
                  dataKey="height"
                  stroke="#14B8A6"
                  strokeWidth={3}
                  dot={{ fill: "#14B8A6", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}

        <p className="text-xs text-slate-500 mt-4 text-center">
          Data from NOAA Tides & Currents • Station {stationId}
        </p>
      </CardContent>
    </Card>
  );
}