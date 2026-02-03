import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, Wind, Droplets, Eye, MapPin, Navigation } from "lucide-react";
import TideChart from "../components/TideChart";
import MapController from "../components/InteractiveMap";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const OWM_API_KEY = "9dc589a002537bec0e0f701720b675a1";

export default function Locations() {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [activeTab, setActiveTab] = useState("conditions");
  const [mapCenter, setMapCenter] = useState([28.153194, -82.762229]);
  const [mapZoom, setMapZoom] = useState(14);

  /** ✅ SINGLE LAUNCH LOCATION **/
  const location = useMemo(
    () => ({
      id: "tarpon-springs",
      name: "Tarpon Springs",
      label: "Turtle Cove Marina",
      lat: 28.153193896065005,
      lon: -82.76222948439958,
      address: "827 Roosevelt Blvd, Tarpon Springs, FL 34689",
      noaaStationId: "8726917",
    }),
    []
  );

  const customIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "/images/logo-icon-no-words.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      }),
    []
  );

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeather = async () => {
    setLoading(true);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${OWM_API_KEY}&units=imperial`;
      const res = await fetch(url);
      const data = await res.json();

      setWeatherData({
        temperature: data?.main?.temp ?? null,
        feels_like: data?.main?.feels_like ?? null,
        humidity: data?.main?.humidity ?? null,
        wind_speed: data?.wind?.speed ?? null,
        description: data?.weather?.[0]?.description ?? "",
        icon_code: data?.weather?.[0]?.icon ?? "",
      });
    } catch (err) {
      console.error("Weather fetch error:", err);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Where We Launch</h1>
          <p className="text-xl text-blue-100">
            Our trips depart from Turtle Cove Marina in Tarpon Springs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Map */}
        <Card className="shadow-xl mb-10 overflow-hidden">
          <div className="h-[450px] w-full">
            <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "100%", width: "100%" }}>
              <MapController center={mapCenter} zoom={mapZoom} />
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[location.lat, location.lon]} icon={customIcon}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-lg">{location.label}</h3>
                    <p className="text-sm text-slate-600 mb-2">{location.address}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Get Directions →
                    </a>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </Card>

        {/* About Turtle Cove */}
        <Card className="mb-10">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-3">About Turtle Cove</h3>
            <p className="text-slate-700 leading-relaxed">
              Turtle Cove Marina is a quiet, well-maintained launch point in Tarpon Springs
              that offers fast access to productive inshore flats, nearshore Gulf waters,
              and nearby islands. Its protected waterways allow for smooth departures while
              maximizing time spent fishing instead of running long distances.
            </p>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="conditions">
              <Cloud size={16} className="mr-2" />
              Conditions
            </TabsTrigger>
            <TabsTrigger value="launch">
              <Navigation size={16} className="mr-2" />
              Launch Details
            </TabsTrigger>
          </TabsList>

          {/* Conditions */}
          <TabsContent value="conditions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Weather */}
              <Card>
                <CardHeader className="text-white" style={{ background: "linear-gradient(to right, var(--brand-sky), var(--brand-sky-soft))" }}>
                  <CardTitle>Current Weather</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {loading ? (
                    <p>Loading weather…</p>
                  ) : weatherData ? (
                    <>
                      <div className="text-5xl font-bold mb-2">
                        {Math.round(weatherData.temperature)}°F
                      </div>
                      <p className="capitalize text-slate-600 mb-6">
                        {weatherData.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <Wind /> {Math.round(weatherData.wind_speed)} mph
                        </div>
                        <div className="flex items-center gap-3">
                          <Droplets /> {weatherData.humidity}%
                        </div>
                        <div className="flex items-center gap-3 col-span-2">
                          <Eye /> Feels like {Math.round(weatherData.feels_like)}°F
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>Weather unavailable</p>
                  )}
                </CardContent>
              </Card>

              {/* Tide Chart – unchanged */}
              <TideChart location={location.name} />
            </div>
          </TabsContent>

          {/* Launch Details */}
          <TabsContent value="launch">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin /> Turtle Cove Marina
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg mb-4">{location.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white"
                  style={{ backgroundColor: "var(--brand-sky)" }}
                >
                  <Navigation size={18} />
                  Get Directions
                </a>
              </CardContent>
            </Card>
              <Card className="shadow-lg">
                <CardHeader
                  className="text-white"
                  style={{
                    background: "linear-gradient(to right, var(--brand-gold), var(--brand-gold-deep))",
                  }}
                >
                  <CardTitle>Parking & Arrival Tips</CardTitle>
                </CardHeader>

                <CardContent className="p-6 space-y-4 text-slate-700">
                 <p>
                   Parking is available near Turtle Cove Marina. Please arrive
                   <span className="font-semibold"> 10–15 minutes early</span> to allow time
                    for parking, loading gear, and meeting your captain.
                 </p>

                  <ul className="list-disc pl-5 space-y-2">
                 <li>Park only in designated marina or public parking areas</li>
                 <li>Bring only what you need — storage space is limited</li>
                 <li>Restrooms may be limited, plan ahead</li>
                </ul>

               <p className="text-sm text-slate-600">
                Final meeting instructions will be confirmed after booking based on
                weather and trip type.
                </p>
                </CardContent>
              </Card>

          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}