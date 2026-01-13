import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Fish, Users, Award, MapPin, Calendar, Star, Shield, ThumbsUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function Home() {
    const [counters, setCounters] = useState({ trips: 0, years: 0, rating: 0 });

    useEffect(() => {
        const animateCounters = () => {
            const duration = 2000;
            const steps = 60;
            const interval = duration / steps;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                const progress = step / steps;
                setCounters({
                    trips: Math.floor(progress * 250),
                    years: Math.floor(progress * 25),
                    rating: (progress * 5).toFixed(1)
                });

                if (step >= steps) clearInterval(timer);
            }, interval);
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });

        const statsElement = document.getElementById('stats-section');
        if (statsElement) observer.observe(statsElement);

        return () => observer.disconnect();
    }, []);



    const features = [
        {
            icon: Fish,
            title: 'Expert Captains',
            description: 'Decades of experience on Crystal River and Tampa Bay waters'
        },
        {
            icon: Users,
            title: 'Family Friendly',
            description: 'Perfect for beginners and experienced anglers alike'
        },
        {
            icon: Award,
            title: 'Sustainable Fishing',
            description: 'Following Florida regulations and responsible practices'
        },
        {
            icon: MapPin,
            title: 'Multiple Locations',
            description: 'Crystal River, Tampa Bay, and Tarpon Springs'
        }
    ];

    const trips = [
        {
            title: 'Inshore Fishing',
            description: 'Target redfish, snook, and trout in calm flats and mangroves',
            image: 'https://www.nscharters.com/images/redfish19.jpeg',
            duration: '4-6 hours'
        },
        {
            title: 'Nearshore Fishing',
            description: 'Bigger fights just off the coast with grouper and more',
            image: 'https://www.nscharters.com/images/grouper16.jpeg',
            duration: '4-8 hours'
        },
        {
            title: 'Scalloping',
            description: 'Seasonal family fun snorkeling for fresh scallops',
            image: 'https://www.nscharters.com/images/scallop1.jpeg',
            duration: '4 hours'
        },
        {
            title: 'Island Hopping',
            description: 'Explore local islands, sandbars, and swim spots',
            image: 'https://www.nscharters.com/images/manatee1.jpeg',
            duration: '4-6 hours'
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div 
                className="relative h-[600px] bg-cover bg-center flex items-center"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://www.nscharters.com/images/redfish14.jpeg)',
                    backgroundPosition: 'center'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696666cb8b0ce9b9ee0be45f/d058509bd_logo-icon.png" 
                        alt="North South Charters" 
                        className="mx-auto mb-8 w-32 h-32"
                    />
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-bold mb-6"
                    >
                        Nature Coast & Tampa Bay Charters
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl mb-8 text-slate-200"
                    >
                        Island Hopping • Inshore • Nearshore • Scalloping • Family-Friendly Trips
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex items-center justify-center gap-6 mb-8 flex-wrap"
                    >
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Star className="text-yellow-400" size={20} />
                            <span className="font-semibold">5.0 Rating</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Shield className="text-green-400" size={20} />
                            <span className="font-semibold">Licensed & Insured</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <ThumbsUp className="text-blue-400" size={20} />
                            <span className="font-semibold">Family Friendly</span>
                        </div>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to={createPageUrl('Contact')}>
                            <Button size="lg" className="text-slate-900 font-semibold text-lg px-8 py-6 hover:scale-105 transition-transform" style={{ backgroundColor: 'var(--brand-gold)' }}>
                                <Calendar className="mr-2" size={20} />
                                Book Your Trip
                            </Button>
                        </Link>
                        <Link to={createPageUrl('Trips')}>
                            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white text-lg px-8 py-6 hover:scale-105 transition-transform">
                                View All Trips
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Stats Section */}
            <div id="stats-section" className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-6xl font-bold mb-2" style={{ color: 'var(--brand-gold)' }}>{counters.trips}+</div>
                            <div className="text-slate-300 text-xl">Successful Trips</div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-center"
                        >
                            <div className="text-6xl font-bold mb-2" style={{ color: 'var(--brand-gold)' }}>{counters.years}+</div>
                            <div className="text-slate-300 text-xl">Years Experience</div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="text-6xl font-bold mb-2 flex items-center justify-center gap-2">
                                <span style={{ color: 'var(--brand-gold)' }}>{counters.rating}</span>
                                <Star className="text-yellow-400 fill-yellow-400" size={36} />
                            </div>
                            <div className="text-slate-300 text-xl">Average Rating</div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
                        Why Choose North South Charters
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="border-slate-200 hover:shadow-xl transition-all hover:-translate-y-2 h-full">
                                    <CardContent className="p-6 text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#E8F2FC' }}>
                                            <feature.icon size={32} style={{ color: 'var(--brand-sky)' }} />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-slate-900">{feature.title}</h3>
                                        <p className="text-slate-600">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trips Section */}
            <div className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-slate-900 mb-4">Our Charter Experiences</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">From peaceful inshore fishing to thrilling nearshore adventures, we offer unforgettable experiences for every skill level</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {trips.map((trip, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                            >
                                <Card className="overflow-hidden hover:shadow-2xl transition-all group cursor-pointer h-full border-2 hover:border-sky-400">
                                    <div className="grid md:grid-cols-2 gap-0">
                                        <div className="relative h-80 overflow-hidden">
                                            <img 
                                                src={trip.image} 
                                                alt={trip.title}
                                                className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 text-slate-900 px-4 py-2 rounded-full text-base font-bold flex items-center gap-2" style={{ backgroundColor: 'var(--brand-gold)' }}>
                                                <Clock size={18} />
                                                {trip.duration}
                                            </div>
                                        </div>
                                        <CardContent className="p-8 flex flex-col justify-center" style={{ background: 'linear-gradient(to bottom right, #ffffff, #f8fafc)' }}>
                                            <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--brand-navy)' }}>{trip.title}</h3>
                                            <p className="text-slate-700 text-lg leading-relaxed mb-6">{trip.description}</p>
                                            <Link to={createPageUrl('Trips')}>
                                                <Button className="text-white group-hover:scale-105 transition-transform" style={{ backgroundColor: 'var(--brand-sky)' }}>
                                                    Learn More & Book
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a5a 0%, #205090 30%, #3a6ba5 50%, #5898E8 70%, #D8A860 100%)' }}>
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696666cb8b0ce9b9ee0be45f/afcc4dc6a_logo-icon-no-words.png" 
                            alt="North South Charters" 
                            className="w-24 h-24 mb-8 mx-auto"
                        />

                        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                            Ready for Your Adventure?
                        </h2>

                        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: '#B8D5F5' }}>
                            Book your charter today and experience unforgettable fishing and water activities on Florida's stunning Nature Coast and Tampa Bay
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-12">
                            <Link to={createPageUrl('Contact')}>
                                <Button size="lg" className="text-slate-900 font-bold text-lg px-10 py-7 shadow-2xl hover:scale-105 transition-transform" style={{ backgroundColor: 'var(--brand-gold)' }}>
                                    <Calendar className="mr-2" size={22} />
                                    Book Your Trip Now
                                </Button>
                            </Link>
                            <Link to={createPageUrl('Captains')}>
                                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold text-lg px-10 py-7 transition-all">
                                    Meet the Captains
                                </Button>
                            </Link>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                            >
                                <Shield className="mx-auto mb-3 text-green-400" size={32} />
                                <h3 className="font-bold text-white mb-2">Licensed & Insured</h3>
                                <p className="text-sm" style={{ color: '#B8D5F5' }}>USCG certified captains</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                            >
                                <Users className="mx-auto mb-3 text-blue-400" size={32} />
                                <h3 className="font-bold text-white mb-2">All Skill Levels</h3>
                                <p className="text-sm" style={{ color: '#B8D5F5' }}>Perfect for beginners and experienced anglers alike</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                            >
                                <Award className="mx-auto mb-3" style={{ color: 'var(--brand-gold)' }} size={32} />
                                <h3 className="font-bold text-white mb-2">Top-Rated Service</h3>
                                <p className="text-sm" style={{ color: '#B8D5F5' }}>5-star reviews from hundreds of happy customers</p>
                            </motion.div>
                        </div>

                        <div className="pt-8 border-t border-white/20">
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ backgroundColor: 'rgba(216, 168, 96, 0.2)', border: '2px solid var(--brand-gold)' }}>
                                <span className="font-bold text-lg" style={{ color: 'var(--brand-gold)' }}>
                                    Special Discounts Available
                                </span>
                            </div>
                            <p className="text-lg mt-4" style={{ color: '#B8D5F5' }}>
                                Military • Veterans • Law Enforcement • First Responders • Catch & Release
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}