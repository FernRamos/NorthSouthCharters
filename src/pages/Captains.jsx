import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Fish,
  Award,
  Heart,
  Anchor,
  ChevronRight,
  ChevronLeft,
  Waves,
  Shell,
  Compass,
} from "lucide-react";

export default function Captains() {
  const [activeImages, setActiveImages] = useState({});

  const toggleImage = (captainIndex) => {
    setActiveImages((prev) => ({
      ...prev,
      [captainIndex]: prev[captainIndex] === 1 ? 0 : 1,
    }));
  };

  const captains = [
    {
      name: "Captain Fernando Ramos Sr.",
      title: "Co-Founder & Lead Captain",
      yearsExperience: "15+",

      // ✅ local images (public/images/...)
      image1: "/images/snook10.webp",
      image2: "/images/redfish19.webp",

      bio: "Captain Fernando has been fishing the Nature Coast waters for over two decades. He knows these waters like the back of his hand. His passion for fishing started as a young boy, and he's been sharing that passion with anglers ever since. Captain Fernando is especially great with families and loves creating memorable experiences for first-time anglers.",
      expertise: [
        "Inshore Fishing",
        "Flats Fishing",
        "Mangrove Techniques",
        "Redfish Specialist",
        "Snook Specialist",
        "Light Tackle",
        "Family Trips",
      ],
      specialties:
        "Known for his patience with beginners and his uncanny ability to find fish in any conditions.",
      philosophy:
        "Every trip is a chance to create lasting memories and respect for our beautiful waters.",
      tripTypes: ["Inshore Fishing", "Scalloping", "Island Hopping"],
      favoriteCatch: "Redfish",
    },
    {
      name: "Captain Fernando Ramos Jr.",
      title: "Co-Founder & Captain",
      yearsExperience: "10+",

      // ✅ local images (public/images/...)
      image1: "/images/redfish14.webp",
      image2: "/images/grouper16.webp",

      bio: "Growing up on the water with his father, Captain Fernando Jr. developed his skills from an early age. He specializes in nearshore fishing and loves the challenge of bigger, harder-fighting fish. USCG licensed and CPR/First Aid certified, he combines safety with excitement to deliver unforgettable trips. His enthusiasm is contagious, and he's great at teaching technique to anglers of all levels.",
      expertise: [
        "Nearshore Fishing",
        "Grouper Specialist",
        "Redfish Specialist",
        "Heavy Tackle",
        "Sight Fishing",
        "Artificial Lures",
      ],
      specialties:
        "A true jack of all trades who excels in both inshore and nearshore fishing. Known for his dedication and willingness to put in the work to ensure you get your fish.",
      philosophy:
        "Great fishing starts with respect for the ocean and the fish we pursue.",
      tripTypes: ["Inshore Fishing", "Nearshore Fishing", "Island Hopping"],
      favoriteCatch: "Gag Grouper",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Our Purpose",
      description:
        "We want every trip to be a great day on the water — and to keep the Nature Coast area fishing healthy for the next generation.",
    },
    {
      icon: Award,
      title: "Service Discounts",
      description:
        "We proudly offer discounts for active military, veterans, law enforcement, and first responders. Just mention it when booking.",
    },
    {
      icon: Fish,
      title: "Catch & Release Discount",
      description:
        "Choose catch & release for your trip and receive a special discount! We're committed to sustainable fishing and preserving our fisheries. We'll help you handle fish properly so they swim off strong.",
    },
    {
      icon: Anchor,
      title: "Sustainable & Legal",
      description:
        "We follow all Florida regulations and encourage responsible harvest — taking only what you need and respecting protected species. Our captains stay current on FWC rules, ensuring every trip remains compliant with size limits, bag limits, and seasonal closures.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Meet Your Captains</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Local experts with decades of combined experience in the Nature Coast waters
          </p>
        </div>
      </div>

      {/* Captains */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {captains.map((captain, index) => (
            <Card
              key={index}
              className="overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-2"
              style={{
                borderColor:
                  index === 0 ? "var(--brand-gold)" : "var(--brand-sky)",
              }}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image Slider */}
                <div
                  className={`p-4 bg-slate-100 ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={activeImages[index] === 1 ? captain.image2 : captain.image1}
                        alt={captain.name}
                        className="w-full h-full object-cover transition duration-300"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleImage(index)}
                      className="absolute top-1/2 right-2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition"
                      style={{ backgroundColor: "var(--brand-gold)" }}
                    >
                      {activeImages[index] === 1 ? (
                        <ChevronLeft size={24} className="text-slate-900" />
                      ) : (
                        <ChevronRight size={24} className="text-slate-900" />
                      )}
                    </button>
                  </div>

                  {/* Trip Types & Locations */}
                  <div className="mt-4 space-y-3">
                    <div className="bg-white rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                        Trip Types
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {captain.tripTypes.map((trip, idx) => {
                          const icons = {
                            "Inshore Fishing": Fish,
                            "Nearshore Fishing": Waves,
                            Scalloping: Shell,
                            "Island Hopping": Compass,
                          };
                          const Icon = icons[trip] ?? Fish;

                          return (
                            <div
                              key={idx}
                              className="flex items-center gap-1 text-xs px-2 py-1 rounded"
                              style={{
                                backgroundColor: "#E8F2FC",
                                color: "var(--brand-navy)",
                              }}
                            >
                              <Icon size={14} />
                              <span>{trip}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3">
  <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
    Favorite Fish to Catch
  </h4>

  <div className="flex items-center gap-2">
    <div
      className="flex items-center gap-1 text-xs px-2 py-1 rounded"
      style={{
        backgroundColor: "#E8F2FC",
        color: "var(--brand-navy)",
      }}
    >
      <Fish size={14} />
      <span>{captain.favoriteCatch}</span>
    </div>
  </div>
</div>
                  </div>
                </div>

                {/* Info */}
                <CardContent
                  className={`p-8 flex flex-col justify-center ${
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                  style={{
                    background: "linear-gradient(to bottom, #ffffff, #f8fafc)",
                  }}
                >
                  <div
                    className="mb-6 pb-6 border-b-2"
                    style={{
                      borderColor:
                        index === 0 ? "var(--brand-gold)" : "var(--brand-sky)",
                    }}
                  >
                    <h2
                      className="text-4xl font-bold mb-2"
                      style={{ color: "var(--brand-navy)" }}
                    >
                      {captain.name}
                    </h2>
                    <p
                      className="text-xl font-semibold mb-2"
                      style={{ color: "var(--brand-sky)" }}
                    >
                      {captain.title}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <Badge
                        className="text-white text-sm px-3 py-1.5"
                        style={{ backgroundColor: "var(--brand-navy)" }}
                      >
                        {captain.yearsExperience} Experience
                      </Badge>
                      <Badge
                        className="text-slate-900 text-sm px-3 py-1.5"
                        style={{ backgroundColor: "var(--brand-gold)" }}
                      >
                        🎣 {captain.favoriteCatch}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-base text-slate-700 mb-6 leading-relaxed">
                    {captain.bio}
                  </p>

                  <div
                    className="mb-6 p-5 rounded-xl shadow-md"
                    style={{
                      background:
                        "linear-gradient(135deg, #E8F2FC 0%, #FEF3E2 100%)",
                      borderLeft: "4px solid var(--brand-sky)",
                    }}
                  >
                    <p
                      className="text-base font-medium"
                      style={{ color: "var(--brand-navy)" }}
                    >
                      "{captain.philosophy}"
                    </p>
                  </div>

                  <div className="mb-6 p-4 rounded-lg bg-white shadow-sm border border-slate-200">
                    <h3
                      className="font-bold mb-3 text-base flex items-center gap-2"
                      style={{ color: "var(--brand-navy)" }}
                    >
                      What Makes Him Special
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {captain.specialties}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg" style={{ backgroundColor: "#E8F2FC" }}>
                    <h3
                      className="font-bold mb-3 text-base"
                      style={{ color: "var(--brand-navy)" }}
                    >
                      Areas of Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {captain.expertise.map((skill, idx) => (
                        <Badge
                          key={idx}
                          className="text-sm px-3 py-1.5 shadow-sm"
                          style={{
                            backgroundColor: "white",
                            color: "var(--brand-navy)",
                            border: "1px solid var(--brand-sky)",
                          }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20" style={{ background: "linear-gradient(to bottom, #ffffff, #f8fafc)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ color: "var(--brand-navy)" }}>
              Our Values & Commitment
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: "var(--brand-gold)" }} />
            <p className="text-xl text-slate-600 mt-4">
              What drives us to be the best charter service on the Gulf Coast
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const bgColors = ["#E8F2FC", "#FEF3E2", "#E8F2FC", "#FEF3E2"];
              const iconBgColors = ["var(--brand-sky)", "var(--brand-gold)", "#14B8A6", "var(--brand-navy)"];
              return (
                <Card
                  key={index}
                  className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{
                    borderColor: iconBgColors[index],
                    backgroundColor: bgColors[index],
                  }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0">
                        <div
                          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg"
                          style={{ backgroundColor: iconBgColors[index] }}
                        >
                          <value.icon size={32} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--brand-navy)" }}>
                          {value.title}
                        </h3>
                        <p className="text-slate-700 leading-relaxed text-base">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div
            className="mt-12 p-8 rounded-2xl text-center shadow-xl"
            style={{ background: "linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-sky) 100%)" }}
          >
            <p className="text-white text-xl leading-relaxed">
              <span className="font-bold text-2xl block mb-2" style={{ color: "var(--brand-gold)" }}>
                Questions about fishing regulations?
              </span>
              Ask us about current limits, seasons, and best practices - we'll walk you through everything!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}