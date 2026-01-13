import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cloud, Wind, Droplets, Eye, MapPin, Navigation } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import TideChart from '../components/TideChart';
import MapController from '../components/InteractiveMap';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function Locations() {
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('crystal-river');
    const [activeTab, setActiveTab] = useState('conditions');
    const [mapCenter, setMapCenter] = useState([28.3, -82.5]);
    const [mapZoom, setMapZoom] = useState(9);

    const locations = [
        { 
            id: 'crystal-river', 
            name: 'Crystal River', 
            label: 'Crystal River Launch',
            lat: 28.903462209723877, 
            lon: -82.63467354383404,
            address: "12073 W Fort Island Trl, Crystal River, FL 34429-9215",
            noaaStationId: "8727333"
        },
        { 
            id: 'tampa-bay', 
            name: 'Tampa Bay',
            label: 'Tampa Launch', 
            lat: 27.89240448830268, 
            lon: -82.53328635333908,
            address: "5108 W Gandy Blvd, Tampa, FL 33611",
            noaaStationId: "8726607"
        },
        { 
            id: 'tarpon-springs', 
            name: 'Tarpon Springs',
            label: 'Tarpon Springs Launch', 
            lat: 28.17626333833187, 
            lon: -82.78866363820713,
            address: "1119 Baillies Bluff Rd, Holiday, FL 34691-9749",
            noaaStationId: "8726942"
        }
    ];

    const customIcon = L.icon({
        iconUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696666cb8b0ce9b9ee0be45f/afcc4dc6a_logo-icon-no-words.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    const center = [28.3, -82.5];

    useEffect(() => {
        fetchWeather();
    }, []);

    const fetchWeather = async () => {
        try {
            setLoading(true);
            const promises = locations.map(async (location) => {
                const response = await base44.integrations.Core.InvokeLLM({
                    prompt: `Get current weather data for coordinates ${location.lat}, ${location.lon}. Return in JSON format with: temperature (F), description, wind_speed (mph), humidity (%), feels_like (F), icon_code (like "01d" for clear sky).`,
                    add_context_from_internet: true,
                    response_json_schema: {
                        type: 'object',
                        properties: {
                            temperature: { type: 'number' },
                            description: { type: 'string' },
                            wind_speed: { type: 'number' },
                            humidity: { type: 'number' },
                            feels_like: { type: 'number' },
                            icon_code: { type: 'string' }
                        }
                    }
                });
                return { ...location, weather: response };
            });
            const data = await Promise.all(promises);
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather:', error);
        } finally {
            setLoading(false);
        }
    };

    const selectedLocationData = weatherData.find(loc => loc.id === selectedLocation) || locations.find(loc => loc.id === selectedLocation);

    useEffect(() => {
        if (selectedLocationData) {
            setMapCenter([selectedLocationData.lat, selectedLocationData.lon]);
            setMapZoom(12);
        }
    }, [selectedLocation]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-6">Launch Locations & Conditions</h1>
                    <p className="text-xl text-blue-100">
                        Three convenient locations with real-time weather and tide information
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Map */}
                <Card className="shadow-xl mb-8 overflow-hidden">
                    <div className="h-[500px] w-full">
                        <MapContainer
                            center={[28.3, -82.5]}
                            zoom={9}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <MapController center={mapCenter} zoom={mapZoom} />
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {locations.map((location, index) => (
                                <Marker
                                    key={index}
                                    position={[location.lat, location.lon]}
                                    icon={customIcon}
                                >
                                    <Popup>
                                        <div className="p-2">
                                            <h3 className="font-bold text-lg mb-2">{location.label}</h3>
                                            <p className="text-sm text-slate-600 mb-2">{location.address}</p>
                                            <button
                                                onClick={() => setSelectedLocation(location.id)}
                                                className="text-blue-600 hover:underline text-sm block mb-1"
                                            >
                                                View Details →
                                            </button>
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lon}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline text-sm inline-block"
                                            >
                                                Get Directions →
                                            </a>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </Card>

                {/* Location Selection Tabs */}
                <div className="mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {locations.map((location) => (
                            <button
                                key={location.id}
                                onClick={() => setSelectedLocation(location.id)}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                    selectedLocation === location.id
                                        ? 'border-sky-500 bg-blue-50'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <MapPin size={24} style={{ color: selectedLocation === location.id ? 'var(--brand-sky)' : '#64748b' }} />
                                    <span className={`font-semibold ${selectedLocation === location.id ? 'text-slate-900' : 'text-slate-600'}`}>
                                        {location.name}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tabs for Conditions and Launch Details */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="conditions" className="text-base">
                            <Cloud size={16} className="mr-2" />
                            Current Conditions
                        </TabsTrigger>
                        <TabsTrigger value="launch" className="text-base">
                            <Navigation size={16} className="mr-2" />
                            Launch Details
                        </TabsTrigger>
                    </TabsList>

                    {/* Conditions Tab */}
                    <TabsContent value="conditions">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderBottomColor: 'var(--brand-sky)' }}></div>
                                <p className="mt-4 text-slate-600">Loading conditions...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Weather Card */}
                                {selectedLocationData?.weather && (
                                    <Card className="shadow-lg">
                                        <CardHeader className="text-white" style={{ background: 'linear-gradient(to right, var(--brand-sky), var(--brand-sky-soft))' }}>
                                            <CardTitle className="flex items-center gap-2">
                                                <Cloud size={28} />
                                                Current Weather
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <div className="text-5xl font-bold text-slate-900">
                                                        {Math.round(selectedLocationData.weather.temperature)}°F
                                                    </div>
                                                    <p className="text-lg text-slate-600 capitalize mt-2">
                                                        {selectedLocationData.weather.description}
                                                    </p>
                                                </div>
                                                {selectedLocationData.weather.icon_code && (
                                                    <img
                                                        src={`https://openweathermap.org/img/wn/${selectedLocationData.weather.icon_code}@2x.png`}
                                                        alt="Weather icon"
                                                        className="w-24 h-24"
                                                    />
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                                    <Wind size={24} style={{ color: 'var(--brand-sky)' }} />
                                                    <div>
                                                        <div className="text-sm text-slate-600">Wind</div>
                                                        <div className="font-semibold text-slate-900">
                                                            {Math.round(selectedLocationData.weather.wind_speed)} mph
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                                    <Droplets size={24} style={{ color: 'var(--brand-sky)' }} />
                                                    <div>
                                                        <div className="text-sm text-slate-600">Humidity</div>
                                                        <div className="font-semibold text-slate-900">
                                                            {Math.round(selectedLocationData.weather.humidity)}%
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg col-span-2">
                                                    <Eye size={24} style={{ color: 'var(--brand-sky)' }} />
                                                    <div>
                                                        <div className="text-sm text-slate-600">Feels Like</div>
                                                        <div className="font-semibold text-slate-900">
                                                            {Math.round(selectedLocationData.weather.feels_like)}°F
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#E8F2FC', border: '1px solid var(--brand-sky-soft)' }}>
                                                <p className="text-sm" style={{ color: 'var(--brand-navy)' }}>
                                                    <span className="font-semibold">Fishing Tip:</span> {
                                                        selectedLocationData.weather.wind_speed < 10
                                                            ? 'Great conditions for fishing! Light winds make for a comfortable day.'
                                                            : selectedLocationData.weather.wind_speed < 20
                                                            ? 'Moderate winds - still fishable but waves may be choppy.'
                                                            : 'High winds - we may need to adjust plans or reschedule for safety.'
                                                    }
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* NOAA Tide Chart */}
                                <TideChart location={selectedLocationData?.name} />
                            </div>
                        )}

                        {/* Weather Info Card */}
                        <Card className="mt-8" style={{ backgroundColor: '#FEF3E2', borderColor: 'var(--brand-gold)' }}>
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--brand-gold)' }}>
                                        <Cloud className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg mb-2">Weather-Dependent Trips</h3>
                                        <p className="text-slate-700">
                                            Your safety is our priority. We monitor conditions closely and will contact you if we need to reschedule due to weather. 
                                            For nearshore trips, we need calm seas and good visibility. Inshore trips can run in a wider range of conditions.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Launch Details Tab */}
                    <TabsContent value="launch">
                        <div className="space-y-6">
                            {/* Selected Location Details */}
                            <Card className="shadow-lg">
                                <CardHeader className="text-white" style={{ background: 'linear-gradient(to right, var(--brand-sky), var(--brand-sky-soft))' }}>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin size={28} />
                                        {selectedLocationData?.label}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="text-slate-600 text-lg mb-4">
                                        {selectedLocationData?.address}
                                    </p>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${selectedLocationData?.lat},${selectedLocationData?.lon}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition"
                                        style={{ backgroundColor: 'var(--brand-sky)' }}
                                    >
                                        <Navigation size={18} />
                                        Get Directions
                                    </a>
                                </CardContent>
                            </Card>

                            {/* Meeting Info */}
                            <Card style={{ backgroundColor: '#E8F2FC', borderColor: 'var(--brand-sky-soft)' }}>
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--brand-navy)' }}>
                                        Meeting Your Captain
                                    </h3>
                                    <p className="text-slate-700 mb-4">
                                        When you book your trip, we'll confirm the best launch location based on your preferred fishing area, 
                                        weather conditions, and what you want to catch. We'll provide exact meeting instructions and the captain's 
                                        contact info before your trip.
                                    </p>
                                    <p className="text-slate-700">
                                        <span className="font-semibold">Tip:</span> Arrive 10-15 minutes early to load gear, use facilities, 
                                        and get ready for an amazing day on the water!
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}