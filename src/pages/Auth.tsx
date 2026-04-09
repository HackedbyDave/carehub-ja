import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "register";
type Role = "customer" | "doctor" | "pharmacy";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<Role>("customer");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [pharmacyName, setPharmacyName] = useState("");
  const [pharmacyAddress, setPharmacyAddress] = useState("");
  const [pharmacyParish, setPharmacyParish] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "register") {
        const metadata: Record<string, string> = { display_name: displayName, role };
        if (role === "doctor") metadata.registration_number = registrationNumber;
        if (role === "pharmacy") {
          metadata.pharmacy_name = pharmacyName;
          metadata.pharmacy_address = pharmacyAddress;
          metadata.pharmacy_parish = pharmacyParish;
          metadata.license_number = licenseNumber;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast({ title: "Account created!", description: "Check your email to verify your account." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back!" });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const roles: { value: Role; label: string; desc: string; icon: string }[] = [
    { value: "customer", label: "Customer", desc: "Order medications and track prescriptions", icon: "👤" },
    { value: "doctor", label: "Doctor", desc: "Review and issue digital prescriptions", icon: "🩺" },
    { value: "pharmacy", label: "Pharmacy", desc: "Manage inventory and fulfill orders", icon: "🏥" },
  ];

  const parishes = [
    "Kingston", "St. Andrew", "St. Thomas", "Portland", "St. Mary",
    "St. Ann", "Trelawny", "St. James", "Hanover", "Westmoreland",
    "St. Elizabeth", "Manchester", "Clarendon", "St. Catherine",
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl mb-3 block">🏥</span>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "login" ? "Sign in to your CareHub JA account" : "Join Jamaica's trusted digital pharmacy"}
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">I am a...</label>
                  <div className="grid grid-cols-3 gap-2">
                    {roles.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setRole(r.value)}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          role === r.value
                            ? "border-primary bg-primary/5 ring-2 ring-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="text-2xl block mb-1">{r.icon}</span>
                        <span className="text-xs font-semibold block">{r.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{roles.find((r) => r.value === role)?.desc}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Doctor-specific fields */}
                {role === "doctor" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Medical Registration Number</label>
                    <input
                      type="text"
                      required
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g. MCJ-12345"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Your Medical Council of Jamaica registration number</p>
                  </div>
                )}

                {/* Pharmacy-specific fields */}
                {role === "pharmacy" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pharmacy Name</label>
                      <input
                        type="text"
                        required
                        value={pharmacyName}
                        onChange={(e) => setPharmacyName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g. MedPlus Pharmacy"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pharmacy License Number</label>
                      <input
                        type="text"
                        required
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g. PCOJ-56789"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pharmacy Address</label>
                      <input
                        type="text"
                        required
                        value={pharmacyAddress}
                        onChange={(e) => setPharmacyAddress(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Street address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Parish</label>
                      <select
                        required
                        value={pharmacyParish}
                        onChange={(e) => setPharmacyParish(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select parish</option>
                        {parishes.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Min. 6 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            {mode === "login" ? (
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <button onClick={() => setMode("register")} className="text-primary font-medium hover:underline">
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-primary font-medium hover:underline">
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
