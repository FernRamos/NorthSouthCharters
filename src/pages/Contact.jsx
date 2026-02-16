import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useLocation } from "react-router-dom";

export default function Contact() {
  const TO_EMAIL = "captfern@nscharters.com";

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const tripType = params.get("tripType") || "";
    const message = params.get("message") || "";

    // only apply if something was actually passed
    if (tripType || message) {
      setFormData((prev) => ({
        ...prev,
        tripType: tripType || prev.tripType,
        message: message || prev.message,
      }));
    }
  }, [location.search]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tripType: "",
    date: "",
    guests: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const maxGuests =
    formData.tripType === "Scalloping" || formData.tripType === "Island Hopping" || formData.tripType === "Scalloping + Island Combo"
      ? 5
      : 4;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (value) => {
    if (!value) return "Not specified";
    const d = new Date(value);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.send(
        "service_d6oayop",
        "Tmplte1",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          tripType: formData.tripType || "Not specified",
          date: formatDate(formData.date),
          guests: formData.guests || "Not specified",
          message: formData.message,
        },
        "3mwBxtHMnHHlc4S0O"
      );

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        tripType: "",
        date: "",
        guests: "",
        message: "",
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("There was an error sending your message. Please try calling us instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Book Your Trip</h1>
          <p className="text-xl text-blue-100">
            Get in touch to reserve your charter or ask questions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

<Card className="shadow-lg">
  <CardContent className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      
      {/* WHAT TO BRING */}
      <div className="border border-green-200 bg-green-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-green-800 mb-4">
          What to Bring
        </h3>
        <ul className="space-y-2 text-green-900 text-sm">
          <li>• Sunscreen</li>
          <li>• Sunglasses</li>
          <li>• Hat & lightweight clothing</li>
          <li>• Snacks & drinks</li>
          <li>• Motion sickness medication (if needed)</li>
        </ul>
      </div>

      {/* WHAT NOT TO BRING */}
      <div className="border border-red-200 bg-red-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-red-700 mb-4">
          What NOT to Bring
        </h3>
        <ul className="space-y-2 text-red-900 text-sm">
          <li>• Coolers (we’ve got one on the boat)</li>
          <li>• GPS devices</li>
          <li>• Black-soled shoes</li>
          <li>• Illegal substances</li>
          <li>• Excessive valuables</li>
          <li>• Drones (unless discussed beforehand)</li>
        </ul>
      </div>

    </div>

    <p className="text-center text-slate-600 max-w-3xl mx-auto">
      All rods, reels, bait, tackle, and safety equipment are provided.
      Just show up ready to have a great time on the water.
    </p>
  </CardContent>
</Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-8">
            <Card className="shadow-lg mb-16">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#E8F2FC" }}
                  >
                    <Phone size={24} style={{ color: "var(--brand-sky)" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Call or Text</h3>
                    <p className="text-slate-600 text-sm mb-2">
                      Leave a voicemail and we'll get back to you. Fastest way to book.
                    </p>
                    <a
                      href="tel:+18139093901"
                      className="font-semibold"
                      style={{ color: "var(--brand-sky)" }}
                    >
                      (813) 909-3901
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email Us</h3>
                    <p className="text-slate-600 text-sm mb-2">
                      We'll respond within 24 hours
                    </p>
                    <a
                      href={`mailto:${TO_EMAIL}`}
                      className="font-semibold break-all"
                      style={{ color: "#10B981" }}
                    >
                      {TO_EMAIL}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#FEF3E2" }}
                  >
                    <MapPin size={24} style={{ color: "var(--brand-gold)" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Where We Launch</h3>
                    <p className="text-slate-600 text-sm mb-2">
                      All trips launch from Turtle Cove Marina in Tarpon Springs.
                    </p>
                    <p className="text-slate-600 text-sm">
                      Exact meeting instructions will be confirmed after booking based on
                      weather and trip type.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl rounded-2xl overflow-hidden">
              <div
                className="p-6 text-slate-900 rounded-t-2xl"
                style={{
                  background:
                    "linear-gradient(to right, var(--brand-gold), var(--brand-gold-deep))",
                }}
              >
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
              </div>

              <CardContent className="p-8">
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      ✓ Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Your Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Trip Type
                      </label>
                      <select
                        name="tripType"
                        value={formData.tripType}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2"
                      >
                        <option value="">Select a trip type</option>
                        <option value="Inshore Fishing">Inshore Fishing</option>
                        <option value="Nearshore Fishing">Nearshore Fishing</option>
                        <option value="Scalloping">Scalloping</option>
                        <option value="Island Hopping">Island Hopping</option>
                        <option value="Inshore + Nearshore Combo">Inshore + Nearshore Combo</option>
                        <option value="Island + Inshore Combo">Island + Inshore Combo</option>
                        <option value="Scalloping + Inshore Combo">Scalloping + Inshore Combo</option>
                        <option value="Scalloping + Island Combo">Scalloping + Island Combo</option>

                        <option value="Custom Combo (Build Your Own)">Custom Combo (Build Your Own)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Requested Date
                      </label>
                      <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={today}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Number of Guests
                      </label>
                      <Input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        min="1"
                        max={String(maxGuests)}
                        placeholder="2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={sending}
                    size="lg"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold text-lg py-6"
                  >
                    {sending ? "Sending..." : "Send Booking Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}