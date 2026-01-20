import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const TO_EMAIL = "info@northsouthcharters.com";

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

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
    formData.tripType === "Scalloping" || formData.tripType === "Island Hopping" ? 5 : 4;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildMessage = () => {
    return `
New Booking Inquiry from ${formData.name}

Contact Information:
- Email: ${formData.email}
- Phone: ${formData.phone}

Trip Details:
- Trip Type: ${formData.tripType || "Not specified"}
- Preferred Date: ${formData.date || "Not specified"}
- Number of Guests: ${formData.guests || "Not specified"}

Message:
${formData.message}
    `.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(TO_EMAIL)}`;

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        tripType: formData.tripType,
        date: formData.date,
        guests: formData.guests,
        message: buildMessage(),
        _subject: `New Booking Request from ${formData.name}`,
        _template: "table",
        _captcha: "false",
        _replyto: formData.email,
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(`Form submit failed (${res.status})`);
      }

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

      window.setTimeout(() => setSuccess(false), 5000);

      // optional: helpful debug
      // console.log("FormSubmit response:", data);
    } catch (err) {
      console.error("Error sending message:", err);
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
          <p className="text-xl text-blue-100">Get in touch to reserve your charter or ask questions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <Card className="shadow-lg">
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
                    <p className="text-slate-600 text-sm mb-2">Leave a voicemail and we'll get back to you. Fastest way to book.</p>

                    {/* REPLACE THESE WITH YOUR REAL NUMBER */}
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
                    <p className="text-slate-600 text-sm mb-2">We'll respond within 24 hours</p>
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
                    <h3 className="font-bold text-slate-900 mb-1">Launch Locations</h3>
                    <ul className="text-slate-600 text-sm space-y-1">
                      <li>• Crystal River</li>
                      <li>• Tampa Bay</li>
                      <li>• Tarpon Springs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: "#E8F2FC", borderColor: "var(--brand-sky-soft)" }}>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3" style={{ color: "var(--brand-navy)" }}>
                  What to Bring
                </h3>
                <ul className="text-sm space-y-2" style={{ color: "var(--brand-navy)" }}>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Sunscreen & sunglasses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Hat and comfortable clothes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Snacks and drinks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Camera for photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Cooler if keeping fish</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
           
            <Card className="border border-red-300 bg-red-50">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3 text-red-800">
                  What NOT to Bring
                </h3>
                <ul className="text-sm space-y-2 text-red-700">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>GPS devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                   <span>•</span>
                    <span>Hard coolers (we have a large cooler on board)</span>
                  </li>
                  <li className="flex items-start gap-2">
                   <span>•</span>
                   <span>Illegal drugs or substances</span>
                  </li>
                  <li className="flex items-start gap-2">
                   <span>•</span>
                   <span>Weapons or firearms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Black-soled shoes (they mark boat decks)</span>
                  </li>
                  </ul>
                </CardContent>
              </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <div
                className="p-6 text-slate-900"
                style={{ background: "linear-gradient(to right, var(--brand-gold), var(--brand-gold-deep))" }}
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
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(555) 123-4567"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Trip Type</label>
                      <select
                        name="tripType"
                        value={formData.tripType}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select a trip type</option>
                        <option value="Inshore Fishing">Inshore Fishing</option>
                        <option value="Nearshore Fishing">Nearshore Fishing</option>
                        <option value="Scalloping">Scalloping</option>
                        <option value="Island Hopping">Island Hopping</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Requested Date</label>
                      <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full"
                        min={today}
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Final date will be confirmed based on captain availability
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Guests</label>
                      <Input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        min="1"
                        max={String(maxGuests)}
                        placeholder="2"
                        className="w-full"
                      />
                      {formData.tripType && (
                        <p className="text-xs text-slate-500 mt-1">
                          Max {maxGuests} guests for {formData.tripType}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us about your group, experience level, and any special requests..."
                      className="w-full"
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

                  <p className="text-sm text-slate-600 text-center">
                    We'll review your request and get back to you within 24 hours to confirm availability
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
