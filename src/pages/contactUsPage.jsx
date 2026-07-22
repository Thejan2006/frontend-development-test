import { useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiMessageSquare } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you! Your message has been sent to ISURI COMPUTERS.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setSubmitting(false);
    }, 1000);
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <span className="text-purple-600 font-bold uppercase tracking-widest text-xs bg-purple-100 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-4">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">ISURI COMPUTERS</span>
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base">
          Have questions about our laptops, PC parts, or warranties? Our expert technical team is here to assist you islandwide!
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-purple-300 transition-all flex items-start gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl text-2xl">
              <FiPhone />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Sales & Support Hotline</h3>
              <p className="text-slate-500 text-sm mt-1">+94 77 123 4567 / +94 11 987 6543</p>
              <p className="text-xs text-purple-600 font-semibold mt-2">Available Mon - Sat (9:00 AM - 7:00 PM)</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-all flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl text-2xl">
              <FiMail />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Email Us</h3>
              <p className="text-slate-500 text-sm mt-1">sales@isuricomputers.lk</p>
              <p className="text-slate-500 text-sm">support@isuricomputers.lk</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-cyan-300 transition-all flex items-start gap-4">
            <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl text-2xl">
              <FiMapPin />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Main Showroom & Tech Hub</h3>
              <p className="text-slate-500 text-sm mt-1">No. 145, Galle Road, Colombo 03, Sri Lanka</p>
              <p className="text-slate-500 text-sm mt-1">Branch: Main Street, Kandy</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-start gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-2xl">
              <FiMessageSquare />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">WhatsApp Instant Chat</h3>
              <p className="text-slate-500 text-sm mt-1">Need quick stock verification?</p>
              <a 
                href="https://wa.me/94771234567" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block mt-3 px-4 py-2 bg-emerald-600 text-white font-semibold text-xs rounded-lg hover:bg-emerald-700 transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
          <p className="text-slate-500 text-sm mb-8">Fill out the form below and we will get back to you within 2 business hours.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 font-semibold text-sm mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ruwan Perera"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-600 focus:outline-none text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold text-sm mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-600 focus:outline-none text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 font-semibold text-sm mb-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="077 123 4567"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-600 focus:outline-none text-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold text-sm mb-2">Subject</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-600 focus:outline-none text-sm bg-white"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="">Select Inquiry Type</option>
                  <option value="Product Availability">Product Availability & Pricing</option>
                  <option value="Order Status">Order Status & Delivery</option>
                  <option value="Warranty Claim">Warranty & Technical Support</option>
                  <option value="Custom Build">Custom PC Quotation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold text-sm mb-2">Your Message *</label>
              <textarea
                rows={5}
                required
                placeholder="Tell us what product or service you are interested in..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-600 focus:outline-none text-sm"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FiSend /> {submitting ? "Sending..." : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
