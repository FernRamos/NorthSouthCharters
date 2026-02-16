import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Fish, Waves, Shell, Compass, Clock, DollarSign, Users, CheckCircle2 } from 'lucide-react';

export default function Trips() {
    const [selectedTrip, setSelectedTrip] = useState('inshore');
    const [showCombos, setShowCombos] = useState(false);

    const trips = [
        {
            id: 'inshore',
            title: 'Inshore Fishing',
            icon: Fish,
            tagline: 'Calm waters, consistent action',
            description: 'Fish calm flats and mangroves for redfish, trout, snook, and more. Smooth waters and light tackle make this perfect for all skill levels.',
            image: 'https://www.nscharters.com/images/snook10.webp',
            pricing: {
                halfDay: { duration: '4 hours', price: 500 },
                fullDay: { duration: '6 hours', price: 600 }
            },
            maxGuests: 4,
            includes: [
                'All fishing gear and tackle',
                'Bait and lures',
                'Fishing licenses',
                'Ice and cooler',
                'Fish cleaning'
            ],
            targetSpecies: ['Redfish', 'Snook', 'Speckled Trout', 'Mangrove Snapper'],
            bestSeasons: 'Year-round'
        },
        {
            id: 'nearshore',
            title: 'Nearshore Fishing',
            icon: Waves,
            tagline: 'Bigger fights, more variety',
            description: 'Head just off the coast for stronger fights and more variety. Perfect for anglers looking for more action without going offshore.',
            image: 'https://www.nscharters.com/images/grouper1.webp',
            pricing: {
                halfDay: { duration: '4 hours', price: 550 },
                fullDay: { duration: '6 hours', price: 750 }
            },
            maxGuests: 4,
            includes: [
                'All fishing gear and tackle',
                'Bait and lures',
                'Fishing licenses',
                'Ice and cooler',
                'Fish cleaning'
            ],
            targetSpecies: ['Gag Grouper', 'Hogfish', 'Mangrove Snapper', 'Cobia'],
            bestSeasons: 'Late summer to Spring'
        },
        {
            id: 'scalloping',
            title: 'Scalloping',
            icon: Shell,
            tagline: 'Family-friendly fun',
            description: 'Seasonal adventure in the Nature Coast\'s shallow waters. Snorkel, swim, and harvest fresh scallops - easy and fun for the whole family.',
            image: 'https://www.nscharters.com/images/scallop1.webp',
            pricing: {
                halfDay: { duration: '4 hours', price: 500 }
            },
            maxGuests: 5,
            includes: [
                'Snorkeling gear',
                'Mesh bags',
                'Licenses',
                'Ice and cooler',
                'Instructions for beginners'
            ],
            targetSpecies: ['Bay Scallops'],
            bestSeasons: 'July - September (seasonal)'
        },
        {
            id: 'island',
            title: 'Island Hopping',
            icon: Compass,
            tagline: 'Relax and explore',
            description: 'Explore local islands and sandbars. Perfect for swimming, snorkeling, shelling, and enjoying a laid-back day on the water.',
            image: 'https://www.nscharters.com/images/shark1.webp',
            pricing: {
                halfDay: { duration: '4 hours', price: 500 },
                fullDay: { duration: '6 hours', price: 600 }
            },
            maxGuests: 5,
            includes: [
                'Snorkeling gear',
                'Cooler with ice',
                'Safety equipment',
                'Local knowledge and guidance'
            ],
            targetSpecies: [],
            bestSeasons: 'Year-round (best in warmer months)'
        },
         // ✅ Combo Trips (Premium)
        {
            id: 'combo_inshore_island',
            title: 'Inshore + Island Combo',
            icon: Compass,
            tagline: 'Fish early, relax later',
            description: 'Start with inshore fishing, then cool down with island hopping and swimming.',
            image: 'https://www.nscharters.com/images/redfish12.webp',
            pricing: {
                fullDay: { duration: '6 hours', price: 750 }
            },
            maxGuests: 5,
            includes: [
                'All fishing gear and tackle',
                'Bait and lures',
                'Fishing licenses',
                'Ice and cooler',
                'Fish cleaning',
                'Island / sandbar stop'
            ],
            targetSpecies: ['Redfish', 'Snook', 'Speckled Trout'],
            bestSeasons: 'Year-round'
        },
        {
            id: 'combo_nearshore_island',
            title: 'Nearshore + Island Combo',
            icon: Compass,
            tagline: 'Big fish + beach vibes',
            description: 'Chase nearshore species, then unwind with a relaxing island stop.',
            image: 'https://www.nscharters.com/images/grouper4.webp',
            pricing: {
                fullDay: { duration: '8 hours', price: 900 }
            },
            maxGuests: 5,
            includes: [
                'All fishing gear and tackle',
                'Bait and lures',
                'Fishing licenses',
                'Ice and cooler',
                'Fish cleaning',
                'Island / sandbar stop'
            ],
            targetSpecies: ['Gag Grouper', 'Mangrove Snapper', 'Cobia'],
            bestSeasons: 'Late summer to Spring'
        },
        {
            id: 'combo_scallop_island',
            title: 'Scalloping + Island Combo',
            icon: Compass,
            tagline: 'Limit out, then lounge',
            description: 'Scallop in the morning, then relax at a sandbar/island stop to cool down and enjoy the water.',
            image: 'https://www.nscharters.com/images/scallop1.webp',
            pricing: {
            fullDay: { duration: '6 hours', price: 750 }
            },
            maxGuests: 5,
            includes: [
                'Snorkeling gear',
                'Mesh bags',
                'Licenses',
                'Ice and cooler',
                'Beginner-friendly instructions',
                'Island / sandbar stop'
            ],
            targetSpecies: ['Bay Scallops'],
            bestSeasons: 'July - September (seasonal)'
        },
        {
            id: 'combo_custom',
            title: 'Build-Your-Own Combo (Custom)',
            icon: Compass,
            tagline: 'You pick the vibe',
            description: 'Want to taget specific fish + island time, or scalloping + a sandbar stop? Tell us what you’re thinking and we’ll tailor the full-day plan around your group and conditions.',
            image: 'https://www.nscharters.com/images/redfish12.webp', // swap to your preferred “premium” photo
            pricing: {
                fullDay: { duration: '8 hours', price: 950 }
            },
            maxGuests: 4,
            includes: [
                'Choose experiences (Fishing / Scalloping / Island)',
                'All required gear for the selected activities',
                'Ice and cooler',
                'Safety equipment',
                'Local guidance + trip planning'
            ],
            targetSpecies: ['Varies by combo'],
            bestSeasons: 'Year-round (scalloping seasonal)'
        },
    ];

    const selectedTripData = trips.find(t => t.id === selectedTrip);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-6">Our Charter Trips</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Choose from inshore fishing, nearshore adventures, seasonal scalloping, or relaxing island hopping trips in Florida's beautiful Nature Coast.
                    </p>
                </div>
            </div>

            {/* Trip Selection */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {trips.filter(t => !t.id.startsWith('combo_')).map((trip) => (
                        <Card
                            key={trip.id}
                            className="cursor-pointer transition hover:shadow-lg"
                            style={selectedTrip === trip.id ? { 
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                outline: '2px solid var(--brand-sky)'
                            } : {}}
                            onClick={() => setSelectedTrip(trip.id)}
                        >
                            <CardContent className="p-6 text-center">
                                <div 
                                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                                    style={{ 
                                        backgroundColor: selectedTrip === trip.id ? 'var(--brand-sky)' : '#E8F2FC',
                                        color: selectedTrip === trip.id ? 'white' : 'var(--brand-sky)'
                                    }}
                                >
                                    <trip.icon size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">{trip.title}</h3>
                                <p className="text-sm text-slate-600">{trip.tagline}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

{/* Premium Combo Trips Box */}
<div className="mb-12 text-center">

  {!showCombos && (
    <Button
      size="lg"
      onClick={() => setShowCombos(true)}
      className="px-8 py-6 text-lg font-semibold shadow-lg"
      style={{
        background: "linear-gradient(135deg, var(--brand-gold) 0%, var(--brand-sky) 100%)",
        color: "white"
      }}
    >
      Explore Premium Combo Trips
    </Button>
  )}

  {showCombos && (
    <div
      className="mt-8 rounded-2xl p-6 shadow-xl border transition-all duration-500"
      style={{
        background:
          "linear-gradient(135deg, rgba(216,168,96,0.20) 0%, rgba(88,152,232,0.18) 100%)",
        borderColor: "rgba(216,168,96,0.55)",
      }}
    >

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold" style={{ color: "var(--brand-navy)" }}>
          Premium Combo Adventures
        </h3>

        <button
          onClick={() => setShowCombos(false)}
          className="text-sm font-semibold hover:underline"
          style={{ color: "var(--brand-sky)" }}
        >
          Hide Combos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {trips
          .filter((t) => t.id.startsWith("combo_"))
          .map((combo) => (
            <button
              key={combo.id}
              type="button"
              onClick={() => setSelectedTrip(combo.id)}
              className="text-left w-full rounded-xl overflow-hidden transition hover:shadow-2xl border bg-white"
            >
              <div className="relative">
                <img
                  src={combo.image}
                  alt={combo.title}
                  className="w-full h-40 object-cover"
                />
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: "rgba(32,80,144,0.85)", color: "white" }}
                >
                  Premium
                </div>
              </div>

              <div className="p-4">
                <div className="text-lg font-bold text-slate-900">
                  {combo.title}
                </div>
                <div className="text-sm text-slate-600">
                  {combo.pricing.fullDay?.duration} — ${combo.pricing.fullDay?.price}
                </div>
              </div>
            </button>
          ))}
      </div>
    </div>
  )}
</div>

                {/* Selected Trip Details */}
                {selectedTripData && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Image & Description */}
                        <div>
                            <div className="rounded-xl overflow-hidden shadow-lg mb-6">
                                <img
                                    src={selectedTripData.image}
                                    alt={selectedTripData.title}
                                    className="w-full h-80 object-cover"
                                />
                            </div>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <selectedTripData.icon size={28} style={{ color: 'var(--brand-sky)' }} />
                                        {selectedTripData.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-700 text-lg mb-6">{selectedTripData.description}</p>
                                    
                                    {selectedTripData.targetSpecies.length > 0 && (
                                        <div className="mb-6">
                                            <h4 className="font-semibold text-slate-900 mb-3">Target Species:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedTripData.targetSpecies.map((species, idx) => (
                                                    <Badge key={idx} variant="outline" className="text-sm">
                                                        {species}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Users size={18} />
                                            <span>Up to {selectedTripData.maxGuests} guests</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#E8F2FC' }}>
                                        <p className="text-sm" style={{ color: 'var(--brand-navy)' }}>
                                            <span className="font-semibold">Best Time:</span> {selectedTripData.bestSeasons}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Pricing & Includes */}
                        <div>
                            {/* Pricing */}
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <DollarSign size={28} style={{ color: '#10B981' }} />
                                        Pricing
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {selectedTripData.pricing.halfDay && (
                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                                <div>
                                                    <div className="font-semibold text-slate-900">Half Day</div>
                                                    <div className="text-sm text-slate-600 flex items-center gap-1">
                                                        <Clock size={14} />
                                                        {selectedTripData.pricing.halfDay.duration}
                                                    </div>
                                                </div>
                                                <div className="text-2xl font-bold text-green-600">
                                                    {selectedTripData.id === 'nearshore' ? 'From ' : ''}${selectedTripData.pricing.halfDay.price}
                                                </div>
                                            </div>
                                        )}
                                        {selectedTripData.pricing.fullDay && (
                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                                <div>
                                                    <div className="font-semibold text-slate-900">Full Day</div>
                                                    <div className="text-sm text-slate-600 flex items-center gap-1">
                                                        <Clock size={14} />
                                                        {selectedTripData.pricing.fullDay.duration}
                                                    </div>
                                                </div>
                                                <div className="text-2xl font-bold text-green-600">
                                                    {selectedTripData.id === 'nearshore' ? 'From ' : ''}${selectedTripData.pricing.fullDay.price}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4 space-y-3">
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#FEF3E2', border: '1px solid var(--brand-gold)' }}>
                                            <p className="text-sm" style={{ color: '#92400E' }}>
                                                <span className="font-semibold">Service Discount:</span> Military, veterans, law enforcement & first responders
                                            </p>
                                        </div>
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#DCFCE7', border: '1px solid #16A34A' }}>
                                            <p className="text-sm text-green-900">
                                                <span className="font-semibold">Catch & Release Discount:</span> Choose sustainable catch & release fishing and save!
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* What's Included */}
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>What's Included</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {selectedTripData.includes.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                                                <span className="text-slate-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* CTA */}
                            <Link to={createPageUrl('Contact')}>
                                <Button size="lg" className="w-full text-slate-900 font-semibold text-lg py-6" style={{ backgroundColor: 'var(--brand-gold)' }}>
                                    Book This Trip
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom CTA */}
            <div className="bg-slate-900 text-white py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Not Sure Which Trip to Choose?</h2>
                    <p className="text-lg text-slate-300 mb-6">
                        Give us a call and we'll help you pick the perfect adventure based on your group, experience level, and what you want to catch.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="tel:+18139093901">
                            <Button size="lg" className="text-slate-900 font-semibold" style={{ backgroundColor: 'var(--brand-gold)' }}>
                                Call Us: (813) 909-3901
                            </Button>
                        </a>
                        <Link to={createPageUrl('Contact')}>
                            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                                Send a Message
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}