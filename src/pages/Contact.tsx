import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Contact Us</h1>
        <p className="text-muted-foreground">Have a question? We're here to help.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          {[
            { icon: Mail, title: "Email", info: "support@carehubja.com" },
            { icon: Phone, title: "Phone", info: "+1 (876) 555-0123" },
            { icon: MapPin, title: "Address", info: "12 Hope Road, Kingston 10, Jamaica" },
          ].map((c) => (
            <div key={c.title} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.info}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-card rounded-lg shadow-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
