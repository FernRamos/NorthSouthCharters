import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { base44 } from '@/api/base44Client';

export default function TideChart({ location = 'Crystal River' }) {
    const [tideData, setTideData] = useState(null);
    const [loading, setLoading] = useState(true);

    // NOAA station IDs for the locations
    const noaaStations = {
        'Crystal River': '8727333',
        'Tampa Bay': '8726607',
        'Tarpon Springs': '8726942'
    };

    useEffect(() => {
        fetchTideData();
    }, [location]);

    const fetchTideData = async () => {
        setLoading(true);
        try {
            const stationId = noaaStations[location];
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const beginDate = today.toISOString().split('T')[0].replace(/-/g, '');
            const endDate = tomorrow.toISOString().split('T')[0].replace(/-/g, '');

            const prompt = `Fetch TODAY'S tide predictions from NOAA for station ${stationId} for ${beginDate}. 
            Use the NOAA Tides & Currents API at: https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=${beginDate}&end_date=${endDate}&datum=MLLW&station=${stationId}&time_zone=lst_ldt&units=english&interval=h&format=json
            
            Return hourly tide height data for today in this JSON format:
            {
                "hourly": [
                    {
                        "time": "12 AM",
                        "height": 1.2
                    },
                    {
                        "time": "1 AM",
                        "height": 1.5
                    }
                ]
            }
            
            Parse the NOAA response and format it with hourly intervals for the full 24-hour day. Use simple time format like "12 AM", "1 AM", "2 PM", etc.`;

            const result = await base44.integrations.Core.InvokeLLM({
                prompt: prompt,
                add_context_from_internet: true,
                response_json_schema: {
                    type: "object",
                    properties: {
                        hourly: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    time: { type: "string" },
                                    height: { type: "number" }
                                }
                            }
                        }
                    }
                }
            });

            setTideData(result.hourly || []);
        } catch (error) {
            console.error('Error fetching tide data:', error);
            setTideData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-lg">
            <CardHeader className="text-white" style={{ background: 'linear-gradient(to right, #14B8A6, #0D9488)' }}>
                <CardTitle className="flex items-center gap-2">
                    <Waves size={28} />
                    NOAA Tide Chart - {location}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="animate-spin" style={{ color: 'var(--brand-sky)' }} size={48} />
                    </div>
                ) : (
                    <>
                        <div className="mb-4">
                            <h4 className="font-semibold text-slate-900 mb-1">Today's Tide Levels</h4>
                            <p className="text-sm text-slate-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={tideData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis 
                                    dataKey="time" 
                                    stroke="#64748b"
                                    style={{ fontSize: '12px' }}
                                />
                                <YAxis 
                                    stroke="#64748b"
                                    style={{ fontSize: '12px' }}
                                    label={{ value: 'Height (ft MLLW)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
                                />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: 'white' }}
                                    labelStyle={{ color: '#cbd5e1' }}
                                    formatter={(value) => [`${value.toFixed(2)} ft`, 'Tide Height']}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="height" 
                                    stroke="#14B8A6" 
                                    strokeWidth={3}
                                    dot={{ fill: '#14B8A6', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </>
                )}
                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#E8F2FC', border: '1px solid var(--brand-sky-soft)' }}>
                    <h4 className="font-semibold mb-2 text-sm" style={{ color: 'var(--brand-navy)' }}>Fishing Tips</h4>
                    <p className="text-sm" style={{ color: 'var(--brand-navy)' }}>
                        Best fishing is typically around tide changes. Moving water activates baitfish and predators. Call us to plan your trip around optimal tide times!
                    </p>
                </div>
                <p className="text-xs text-slate-500 mt-4 text-center">
                    Data from NOAA Tides & Currents • Station {noaaStations[location]}
                </p>
            </CardContent>
        </Card>
    );
}