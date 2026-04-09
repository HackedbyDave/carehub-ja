import { useState, useEffect } from "react";
import { MapPin, Star, Phone, Clock, Navigation } from "lucide-react";
import { vendors } from "@/data/products";

const pharmacyDetails = [
  { id: "v1", phone: "(876) 555-0101", hours: "Mon-Sat: 8am-8pm, Sun: 9am-4pm" },
  { id: "v2", phone: "(876) 555-0102", hours: "Mon-Fri: 8am-7pm, Sat: 9am-5pm" },
  { id: "v3", phone: "(876) 555-0103", hours: "Mon-Sat: 7am-9pm" },
  { id: "v4", phone: "(876) 555-0104", hours: "Mon-Fri: 8am-6pm, Sat: 9am-3pm" },
  { id: "v5", phone: "(876) 555-0105", hours: "Mon-Sat: 8am-7pm" },
  { id: "v6", phone: "(876) 555-0106", hours: "Mon-Sun: 7am-10pm" },
];

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const Pharmacies = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLat(pos.coords.latitude);
          setUserLng(pos.coords.longitude);
        },
        () => {
          setLocationError("Location access denied. Showing all pharmacies.");
        }
      );
    } else {
      setLocationError("Geolocation not supported. Showing all pharmacies.");
    }
  }, []);

  // Sort by distance if user location available, show nearest
  const sortedVendors = userLat && userLng
    ? [...vendors]
        .map((v) => ({ ...v, distance: getDistance(userLat, userLng, v.lat, v.lng) }))
        .sort((a, b) => a.distance - b.distance)
    : vendors.map((v) => ({ ...v, distance: null as number | null }));

  const selectedVendor = sortedVendors.find((v) => v.id === selected);
  const mapLat = selectedVendor?.lat ?? userLat ?? 18.1096;
  const mapLng = selectedVendor?.lng ?? userLng ?? -77.2975;
  const mapZoom = selectedVendor ? 0.05 : userLat ? 0.15 : 0.5;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Find a Pharmacy</h1>
        <p className="text-muted-foreground">Licensed pharmacies across Jamaica on CareHub JA</p>
        {locationError && (
          <p className="text-sm text-accent mt-2 flex items-center gap-1">
            <Navigation className="h-3 w-3" /> {locationError}
          </p>
        )}
        {userLat && userLng && (
          <p className="text-sm text-primary mt-2 flex items-center gap-1">
            <Navigation className="h-3 w-3" /> Showing pharmacies nearest to you
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map */}
        <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-card" style={{ height: "500px" }}>
          <iframe
            title="Pharmacy Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapLng - mapZoom}%2C${mapLat - mapZoom}%2C${mapLng + mapZoom}%2C${mapLat + mapZoom}&layer=mapnik&marker=${mapLat}%2C${mapLng}`}
          />
        </div>

        {/* Pharmacy List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {sortedVendors.map((v) => {
            const details = pharmacyDetails.find((d) => d.id === v.id);
            return (
              <button
                key={v.id}
                onClick={() => setSelected(selected === v.id ? null : v.id)}
                className={`w-full text-left bg-card rounded-lg shadow-card p-4 transition-all hover:shadow-card-hover ${
                  selected === v.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{v.image}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm">{v.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" /> {v.location}
                      {v.distance !== null && (
                        <span className="ml-1 text-primary font-medium">· {v.distance.toFixed(1)} km away</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span className="text-xs font-medium">{v.rating}</span>
                      <span className="text-xs text-muted-foreground">· {v.products} items</span>
                    </div>
                    {selected === v.id && details && (
                      <div className="mt-3 pt-3 border-t border-border space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3 text-primary" /> {details.phone}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 text-primary" /> {details.hours}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pharmacies;
