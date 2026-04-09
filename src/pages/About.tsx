import { Heart, Shield, Users, Globe } from "lucide-react";

const About = () => (
  <div className="min-h-screen">
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">About CareHub JA</h1>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
          Improving healthcare access across Jamaica through technology, trust, and community.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          CareHub JA was founded with a simple but powerful vision: to make quality healthcare accessible to every Jamaican, no matter where they live. We believe that getting your medications should not require long trips, endless phone calls, or uncertainty about availability.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Our platform connects patients directly with licensed doctors and verified pharmacies across Jamaica. Whether you need a prescription reviewed, want to compare medication prices, or need your medications delivered to your doorstep, CareHub JA makes it simple, safe, and affordable.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We are committed to upholding the highest standards of pharmaceutical safety and patient privacy. Every pharmacy on our platform is licensed by the Pharmacy Council of Jamaica, and every prescription is verified by qualified medical professionals.
        </p>
      </div>
    </section>

    <section className="bg-surface py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl font-bold text-foreground text-center mb-10">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Heart, title: "Patient First", desc: "Every decision we make puts the health and well-being of our users at the centre." },
            { icon: Shield, title: "Trust & Safety", desc: "Licensed pharmacies, verified prescriptions, and secure data handling — always." },
            { icon: Users, title: "Community", desc: "Built by Jamaicans, for Jamaicans. We understand the unique healthcare challenges here." },
            { icon: Globe, title: "Accessibility", desc: "From Kingston to rural parishes, we're bridging the gap in healthcare access." },
          ].map((v) => (
            <div key={v.title} className="bg-card rounded-lg shadow-card p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <v.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { num: "6+", label: "Partner Pharmacies" },
          { num: "14", label: "Parishes Served" },
          { num: "100+", label: "Medications Available" },
          { num: "24/7", label: "Platform Access" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold text-primary mb-1">{s.num}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default About;
