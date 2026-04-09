import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, Truck, CheckCircle, Clock, LogOut, Upload, FileText, Pill, Users, ClipboardList, Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const mockOrders = [
  { id: "CH-2026-001", date: "Mar 28, 2026", status: "delivered", total: 3550, items: 3 },
  { id: "CH-2026-002", date: "Mar 31, 2026", status: "shipping", total: 8500, items: 1 },
  { id: "CH-2026-003", date: "Apr 1, 2026", status: "processing", total: 2050, items: 2 },
];

const statusConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  delivered: { icon: CheckCircle, label: "Delivered", color: "text-primary" },
  shipping: { icon: Truck, label: "In Transit", color: "text-accent" },
  processing: { icon: Clock, label: "Processing", color: "text-muted-foreground" },
};

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState<any[]>([]);
  const [pharmacyId, setPharmacyId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMed, setEditingMed] = useState<any>(null);
  const [medForm, setMedForm] = useState({ name: "", description: "", price: "", category: "otc", in_stock: true, dosage: "", requires_prescription: false });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();
      setProfile(profileData);

      // If pharmacy role, load their pharmacy and medications
      if (profileData?.role === "pharmacy") {
        const { data: pharmacyData } = await supabase
          .from("pharmacies")
          .select("*")
          .eq("owner_id", session.user.id)
          .single();
        if (pharmacyData) {
          setPharmacyId(pharmacyData.id);
          const { data: meds } = await supabase
            .from("medications")
            .select("*")
            .eq("pharmacy_id", pharmacyData.id);
          setMedications(meds || []);
        }
      }
      setLoading(false);
    };
    init();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out" });
    navigate("/auth");
  };

  const handleSaveMedication = async () => {
    if (!pharmacyId) return;
    const payload = {
      name: medForm.name,
      description: medForm.description,
      price: parseInt(medForm.price),
      category: medForm.category,
      in_stock: medForm.in_stock,
      dosage: medForm.dosage || null,
      requires_prescription: medForm.requires_prescription,
      pharmacy_id: pharmacyId,
    };

    if (editingMed) {
      const { error } = await supabase.from("medications").update(payload).eq("id", editingMed.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      setMedications((prev) => prev.map((m) => (m.id === editingMed.id ? { ...m, ...payload } : m)));
      toast({ title: "Medication updated!" });
    } else {
      const { data, error } = await supabase.from("medications").insert(payload).select().single();
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      setMedications((prev) => [...prev, data]);
      toast({ title: "Medication added!" });
    }
    setShowAddForm(false);
    setEditingMed(null);
    setMedForm({ name: "", description: "", price: "", category: "otc", in_stock: true, dosage: "", requires_prescription: false });
  };

  const handleDeleteMedication = async (id: string) => {
    const { error } = await supabase.from("medications").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    setMedications((prev) => prev.filter((m) => m.id !== id));
    toast({ title: "Medication removed" });
  };

  const openEditForm = (med: any) => {
    setEditingMed(med);
    setMedForm({
      name: med.name,
      description: med.description,
      price: String(med.price),
      category: med.category,
      in_stock: med.in_stock,
      dosage: med.dosage || "",
      requires_prescription: med.requires_prescription || false,
    });
    setShowAddForm(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const role = profile?.role || "customer";

  // Doctor Dashboard
  if (role === "doctor") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Doctor Dashboard</h1>
            <p className="text-muted-foreground">Welcome, Dr. {profile?.display_name || user?.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-lg shadow-card p-6 text-center">
            <ClipboardList className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Pending Reviews</p>
          </div>
          <div className="bg-card rounded-lg shadow-card p-6 text-center">
            <FileText className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Prescriptions Issued</p>
          </div>
          <div className="bg-card rounded-lg shadow-card p-6 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Patients</p>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-card p-8 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading text-lg font-semibold mb-2">No Prescription Requests Yet</h3>
          <p className="text-sm text-muted-foreground">Patient prescription requests will appear here for your review.</p>
        </div>
      </div>
    );
  }

  // Pharmacy Dashboard
  if (role === "pharmacy") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Pharmacy Dashboard</h1>
            <p className="text-muted-foreground">Welcome, {profile?.display_name || user?.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg shadow-card p-6 text-center">
            <Package className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">New Orders</p>
          </div>
          <div className="bg-card rounded-lg shadow-card p-6 text-center">
            <FileText className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Pending Prescriptions</p>
          </div>
          <div className="bg-card rounded-lg shadow-card p-6 text-center">
            <Pill className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{medications.length}</p>
            <p className="text-sm text-muted-foreground">Products Listed</p>
          </div>
          <div className="bg-card rounded-lg shadow-card p-6 text-center">
            <Truck className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">In Delivery</p>
          </div>
        </div>

        {/* Medication Management */}
        <div className="bg-card rounded-lg shadow-card overflow-hidden mb-8">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-heading font-semibold text-lg">Manage Medications</h2>
            <button
              onClick={() => { setShowAddForm(true); setEditingMed(null); setMedForm({ name: "", description: "", price: "", category: "otc", in_stock: true, dosage: "", requires_prescription: false }); }}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
            >
              <Plus className="h-4 w-4" /> Add Medication
            </button>
          </div>

          {showAddForm && (
            <div className="p-6 border-b border-border bg-surface space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input value={medForm.name} onChange={(e) => setMedForm({ ...medForm, name: e.target.value })} placeholder="Medication name" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
                <input value={medForm.price} onChange={(e) => setMedForm({ ...medForm, price: e.target.value })} placeholder="Price (JMD)" type="number" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
                <input value={medForm.dosage} onChange={(e) => setMedForm({ ...medForm, dosage: e.target.value })} placeholder="Dosage (optional)" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
                <select value={medForm.category} onChange={(e) => setMedForm({ ...medForm, category: e.target.value })} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  <option value="otc">OTC</option>
                  <option value="prescription">Prescription</option>
                  <option value="vitamins">Vitamins</option>
                  <option value="medical">Medical Device</option>
                  <option value="wellness">Personal Care</option>
                </select>
              </div>
              <textarea value={medForm.description} onChange={(e) => setMedForm({ ...medForm, description: e.target.value })} placeholder="Description" rows={2} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={medForm.in_stock} onChange={(e) => setMedForm({ ...medForm, in_stock: e.target.checked })} /> In Stock
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={medForm.requires_prescription} onChange={(e) => setMedForm({ ...medForm, requires_prescription: e.target.checked })} /> Requires Prescription
                </label>
              </div>
              <div className="flex gap-2">
                <button onClick={handleSaveMedication} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
                  {editingMed ? "Update" : "Save"}
                </button>
                <button onClick={() => { setShowAddForm(false); setEditingMed(null); }} className="px-4 py-2 rounded-lg text-sm border border-border hover:bg-secondary">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="divide-y divide-border">
            {medications.length === 0 ? (
              <div className="p-8 text-center">
                <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">No medications listed yet. Click "Add Medication" to start.</p>
              </div>
            ) : (
              medications.map((med) => (
                <div key={med.id} className="p-4 flex items-center justify-between hover:bg-surface transition-colors">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{med.name}</p>
                    <p className="text-xs text-muted-foreground">{med.category} · J${med.price?.toLocaleString()} · {med.in_stock ? "In Stock" : "Out of Stock"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditForm(med)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                      <Edit className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button onClick={() => handleDeleteMedication(med.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // Customer Dashboard (default)
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-1">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {profile?.display_name || user?.email}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-lg shadow-card p-6 text-center">
          <Package className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{mockOrders.length}</p>
          <p className="text-sm text-muted-foreground">Total Orders</p>
        </div>
        <div className="bg-card rounded-lg shadow-card p-6 text-center">
          <Truck className="h-8 w-8 text-accent mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{mockOrders.filter((o) => o.status === "shipping").length}</p>
          <p className="text-sm text-muted-foreground">In Transit</p>
        </div>
        <div className="bg-card rounded-lg shadow-card p-6 text-center">
          <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{mockOrders.filter((o) => o.status === "delivered").length}</p>
          <p className="text-sm text-muted-foreground">Delivered</p>
        </div>
      </div>

      {/* Upload Prescription */}
      <div className="bg-card rounded-lg shadow-card p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-semibold text-lg">Upload a Prescription</h3>
            <p className="text-sm text-muted-foreground">Submit your prescription for review by a licensed doctor</p>
          </div>
          <label className="cursor-pointer inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Upload className="h-4 w-4" /> Upload
            <input type="file" accept="image/*,.pdf" className="hidden" onChange={() => toast({ title: "Prescription uploaded!", description: "A doctor will review it shortly." })} />
          </label>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-lg shadow-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-lg">Recent Orders</h2>
        </div>
        <div className="divide-y divide-border">
          {mockOrders.map((order) => {
            const status = statusConfig[order.status];
            const Icon = status.icon;
            return (
              <div key={order.id} className="p-6 flex items-center justify-between hover:bg-surface transition-colors">
                <div>
                  <p className="font-semibold text-foreground">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date} · {order.items} items</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-1.5 ${status.color}`}>
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{status.label}</span>
                  </div>
                  <span className="font-bold text-foreground">J${order.total.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/products" className="text-sm text-primary font-medium hover:underline">Browse Medications →</Link>
      </div>
    </div>
  );
};

export default Dashboard;
