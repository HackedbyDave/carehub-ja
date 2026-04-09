export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  vendor: string;
  vendorLocation: string;
  rating: number;
  reviewCount: number;
  description: string;
  inStock: boolean;
  badge?: string;
  isFeatured?: boolean;
  isBundle?: boolean;
  bundleItems?: string[];
  requiresPrescription?: boolean;
  dosage?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: "prescription", name: "Prescription Drugs", icon: "📋", count: 86 },
  { id: "otc", name: "OTC Medications", icon: "💊", count: 124 },
  { id: "vitamins", name: "Vitamins & Supplements", icon: "🧬", count: 89 },
  { id: "medical", name: "Medical Devices", icon: "🩺", count: 56 },
  { id: "wellness", name: "Personal Care", icon: "🧴", count: 167 },
  { id: "bundles", name: "Health Bundles", icon: "📦", count: 34 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Metformin 500mg – 60 Tablets",
    price: 1200,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    category: "prescription",
    vendor: "MedPlus Pharmacy",
    vendorLocation: "Kingston, Jamaica",
    rating: 4.8,
    reviewCount: 312,
    description: "Metformin hydrochloride 500mg tablets are widely prescribed for the management of type 2 diabetes mellitus. This medication works by decreasing hepatic glucose production, reducing intestinal absorption of glucose, and improving insulin sensitivity. Take one tablet twice daily with meals, or as directed by your healthcare provider. Each bottle contains 60 film-coated tablets for a full month's supply. Metformin is considered a first-line treatment and is well tolerated by most patients. Store at room temperature away from moisture and heat. Always consult your physician before starting or stopping this medication.",
    inStock: true,
    badge: "Rx Required",
    requiresPrescription: true,
    isFeatured: true,
    dosage: "500mg twice daily",
  },
  {
    id: "2",
    name: "Amlodipine 5mg – 30 Tablets",
    price: 950,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    category: "prescription",
    vendor: "Island Care Pharmacy",
    vendorLocation: "Montego Bay, Jamaica",
    rating: 4.7,
    reviewCount: 198,
    description: "Amlodipine besylate 5mg is a calcium channel blocker commonly prescribed for the treatment of hypertension (high blood pressure) and certain types of angina (chest pain). By relaxing blood vessels, amlodipine allows blood to flow more easily, reducing the workload on the heart. Take one tablet daily, with or without food. This medication provides 24-hour blood pressure control with a single dose. Regular monitoring of blood pressure is recommended while taking amlodipine. Do not discontinue without consulting your doctor. Each pack contains 30 tablets for a full month's supply.",
    inStock: true,
    badge: "Rx Required",
    requiresPrescription: true,
    isFeatured: true,
    dosage: "5mg once daily",
  },
  {
    id: "3",
    name: "Paracetamol 500mg – 24 Tablets",
    price: 450,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    category: "otc",
    vendor: "MedPlus Pharmacy",
    vendorLocation: "Kingston, Jamaica",
    rating: 4.5,
    reviewCount: 567,
    description: "Paracetamol (acetaminophen) 500mg provides fast-acting relief from mild to moderate pain and fever. Suitable for headaches, toothaches, muscle aches, backaches, menstrual cramps, and cold or flu symptoms. Adults and children over 12 may take one to two tablets every four to six hours as needed, with a maximum of eight tablets in 24 hours. Paracetamol is generally well tolerated when taken as directed and does not irritate the stomach lining. Do not exceed the recommended dose to avoid liver damage. Keep out of reach of children. No prescription needed — available for same-day delivery across Kingston.",
    inStock: true,
    badge: "Bestseller",
    isFeatured: true,
    dosage: "500mg every 4-6 hours",
  },
  {
    id: "4",
    name: "Multivitamin Complex – 60 Tablets",
    price: 2200,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    category: "vitamins",
    vendor: "Wellness Hub JA",
    vendorLocation: "Kingston, Jamaica",
    rating: 4.6,
    reviewCount: 289,
    description: "A comprehensive daily multivitamin formulated specifically for Caribbean lifestyles and nutritional needs. This premium supplement contains essential vitamins A, B-complex, C, D3, and E, along with key minerals including zinc, iron, magnesium, and calcium. Designed to fill nutritional gaps in the average Jamaican diet, it supports immune function, energy production, bone health, and cognitive performance. Take one tablet daily with a meal for optimal absorption. Suitable for adults of all ages. Each bottle provides a two-month supply. Made with high-quality, bioavailable ingredients for maximum effectiveness.",
    inStock: true,
    isFeatured: true,
    dosage: "1 tablet daily with food",
  },
  {
    id: "5",
    name: "Digital Blood Pressure Monitor",
    price: 8500,
    originalPrice: 9500,
    image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=400&fit=crop",
    category: "medical",
    vendor: "MedTech Jamaica",
    vendorLocation: "Montego Bay, Jamaica",
    rating: 4.6,
    reviewCount: 78,
    description: "This clinically validated digital blood pressure monitor provides accurate and reliable readings for home blood pressure monitoring. Features include a large, easy-to-read LCD display, irregular heartbeat detection, and memory storage for up to 120 readings with date and time stamps. The adjustable cuff fits arm circumferences of 22-42cm. Automatic inflation and one-button operation make it suitable for users of all ages. Includes a carrying case for portability. Regular home monitoring helps patients and doctors manage hypertension more effectively. Powered by 4 AA batteries (included) or USB adapter.",
    inStock: true,
    badge: "Top Rated",
  },
  {
    id: "6",
    name: "Omeprazole 20mg – 28 Capsules",
    price: 1100,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    category: "otc",
    vendor: "Island Care Pharmacy",
    vendorLocation: "Montego Bay, Jamaica",
    rating: 4.4,
    reviewCount: 145,
    description: "Omeprazole 20mg delayed-release capsules are a proton pump inhibitor (PPI) used for the treatment of frequent heartburn, gastroesophageal reflux disease (GERD), and stomach ulcers. This medication works by reducing the amount of acid produced in the stomach, providing relief within one to four days. Take one capsule daily before eating, preferably in the morning. For short-term OTC use (14-day course), no prescription is needed. Each pack contains 28 capsules for a complete treatment course. Swallow whole — do not crush or chew. Consult your pharmacist if symptoms persist beyond 14 days.",
    inStock: true,
    dosage: "20mg once daily before eating",
  },
  {
    id: "7",
    name: "Cetirizine 10mg – 30 Tablets",
    price: 650,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    category: "otc",
    vendor: "MedPlus Pharmacy",
    vendorLocation: "Kingston, Jamaica",
    rating: 4.3,
    reviewCount: 201,
    description: "Cetirizine hydrochloride 10mg is a second-generation antihistamine that provides effective, non-drowsy relief from allergy symptoms including sneezing, runny nose, itchy and watery eyes, and skin hives. Each tablet provides 24 hours of continuous allergy protection, making it ideal for daily use during allergy season. Cetirizine works by blocking histamine, a substance released during allergic reactions. Take one tablet daily with water, with or without food. Suitable for adults and children over 12 years of age. This pack contains 30 tablets for a full month's supply. Available for delivery or pharmacy pickup.",
    inStock: true,
    dosage: "10mg once daily",
  },
  {
    id: "8",
    name: "Losartan 50mg – 30 Tablets",
    price: 1350,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    category: "prescription",
    vendor: "Wellness Hub JA",
    vendorLocation: "Spanish Town, Jamaica",
    rating: 4.7,
    reviewCount: 167,
    description: "Losartan potassium 50mg is an angiotensin II receptor blocker (ARB) used to treat high blood pressure (hypertension) and to protect the kidneys in patients with type 2 diabetes. By blocking the action of angiotensin II, losartan relaxes blood vessels and lowers blood pressure, reducing the risk of stroke, heart attack, and kidney problems. Take one tablet daily at the same time each day, with or without food. Blood pressure should be monitored regularly during treatment. This pack contains 30 tablets for a month's supply. Upload your prescription through CareHub JA to order online securely.",
    inStock: true,
    badge: "Rx Required",
    requiresPrescription: true,
    dosage: "50mg once daily",
  },
  {
    id: "9",
    name: "Chronic Care Bundle",
    price: 4500,
    originalPrice: 5800,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    category: "bundles",
    vendor: "MedPlus Pharmacy",
    vendorLocation: "Kingston, Jamaica",
    rating: 4.9,
    reviewCount: 98,
    description: "Our comprehensive Chronic Care Bundle is designed for patients managing long-term health conditions such as hypertension and diabetes. This curated package includes a digital blood pressure monitor, a 7-day pill organizer for medication adherence, Vitamin D3 supplements for bone and immune health, and a health tracking journal. By bundling these essential items together, you save over J$1,300 compared to purchasing individually. Perfect for patients who want to take a proactive approach to managing their health at home. All items are sourced from licensed pharmacies and meet quality standards.",
    inStock: true,
    badge: "Bundle Deal",
    isBundle: true,
    bundleItems: ["BP Monitor Strips", "Pill Organizer (7-day)", "Vitamin D3", "Health Journal"],
  },
  {
    id: "10",
    name: "Family Wellness Pack",
    price: 6200,
    originalPrice: 7500,
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop",
    category: "bundles",
    vendor: "Wellness Hub JA",
    vendorLocation: "Kingston, Jamaica",
    rating: 4.8,
    reviewCount: 67,
    description: "The Family Wellness Pack brings together everything your household needs for everyday health and emergency preparedness. Includes a fully stocked first aid kit with bandages, antiseptic wipes, and gauze; a bottle of family multivitamins suitable for adults and children over 12; a 24-pack of paracetamol for pain and fever relief; and a digital thermometer with fast, accurate readings. This bundle saves you over J$1,300 and ensures your family is prepared for common health concerns. All products are sourced from trusted Jamaican pharmacies and meet pharmaceutical quality standards.",
    inStock: true,
    badge: "Best Value",
    isBundle: true,
    bundleItems: ["First Aid Kit", "Family Multivitamins", "Paracetamol Pack", "Digital Thermometer"],
  },
  {
    id: "11",
    name: "Vitamin D3 1000 IU – 90 Softgels",
    price: 1800,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    category: "vitamins",
    vendor: "Wellness Hub JA",
    vendorLocation: "Kingston, Jamaica",
    rating: 4.5,
    reviewCount: 123,
    description: "High-potency Vitamin D3 (cholecalciferol) 1000 IU softgels provide essential support for bone health, immune function, and calcium absorption. Despite Jamaica's sunny climate, many individuals have suboptimal vitamin D levels due to indoor lifestyles, sunscreen use, and dietary factors. Each easy-to-swallow softgel delivers the recommended daily dose of vitamin D3 in a highly bioavailable form suspended in coconut oil for enhanced absorption. Take one softgel daily with a meal containing fat. This bottle contains 90 softgels — a three-month supply. Suitable for adults and adolescents. No artificial colors or preservatives.",
    inStock: true,
    dosage: "1000 IU (1 softgel) daily",
  },
  {
    id: "12",
    name: "First Aid Kit – Complete",
    price: 3200,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop",
    category: "medical",
    vendor: "MedTech Jamaica",
    vendorLocation: "Montego Bay, Jamaica",
    rating: 4.5,
    reviewCount: 89,
    description: "This comprehensive first aid kit contains over 150 essential medical supplies organized in a durable, water-resistant carrying case. Includes adhesive bandages in multiple sizes, sterile gauze pads, medical tape, antiseptic wipes, antibiotic ointment, scissors, tweezers, disposable gloves, an instant cold pack, and a CPR face shield. The kit also features a first aid guide with step-by-step instructions for common emergencies. Ideal for home, office, car, or travel use. Meets workplace safety requirements. All supplies are individually sealed for hygiene. Compact design fits easily in a cabinet, drawer, or travel bag.",
    inStock: true,
  },
  {
    id: "13",
    name: "Lisinopril 10mg – 30 Tablets",
    price: 1050,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    category: "prescription",
    vendor: "Parish Health Pharmacy",
    vendorLocation: "Mandeville, Jamaica",
    rating: 4.6,
    reviewCount: 234,
    description: "Lisinopril 10mg is an ACE (angiotensin-converting enzyme) inhibitor prescribed for the treatment of high blood pressure, heart failure, and to improve survival after a heart attack. This medication works by relaxing blood vessels, making it easier for the heart to pump blood throughout the body. Take one tablet daily at approximately the same time each day, with or without food. Regular blood pressure monitoring is recommended. Side effects may include a dry cough, dizziness, or headache. Do not use if pregnant or planning to become pregnant. This pack contains 30 tablets. A valid prescription is required to order.",
    inStock: true,
    badge: "Rx Required",
    requiresPrescription: true,
    dosage: "10mg once daily",
  },
  {
    id: "14",
    name: "Ibuprofen 400mg – 30 Tablets",
    price: 550,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    category: "otc",
    vendor: "QuickMeds Kingston",
    vendorLocation: "Half Way Tree, Jamaica",
    rating: 4.4,
    reviewCount: 389,
    description: "Ibuprofen 400mg is a nonsteroidal anti-inflammatory drug (NSAID) that provides effective relief from pain, inflammation, and fever. Commonly used for headaches, dental pain, menstrual cramps, muscle aches, arthritis, and minor injuries. Take one tablet every six to eight hours with food or milk to reduce stomach irritation. Do not exceed three tablets in 24 hours unless directed by a healthcare provider. Ibuprofen reduces inflammation at the source of pain, making it particularly effective for conditions involving swelling. Not suitable for individuals with stomach ulcers, kidney disease, or aspirin allergy. Each pack contains 30 film-coated tablets.",
    inStock: true,
    dosage: "400mg every 6-8 hours",
  },
];

export const vendors = [
  { id: "v1", name: "MedPlus Pharmacy", location: "Kingston", products: 156, rating: 4.8, image: "🏥", lat: 18.0179, lng: -76.8099 },
  { id: "v2", name: "Island Care Pharmacy", location: "Montego Bay", products: 124, rating: 4.7, image: "💊", lat: 18.4762, lng: -77.8939 },
  { id: "v3", name: "Wellness Hub JA", location: "Spanish Town", products: 89, rating: 4.6, image: "🌿", lat: 18.0126, lng: -76.9561 },
  { id: "v4", name: "MedTech Jamaica", location: "Montego Bay", products: 67, rating: 4.5, image: "🩺", lat: 18.4712, lng: -77.9216 },
  { id: "v5", name: "Parish Health Pharmacy", location: "Mandeville", products: 98, rating: 4.4, image: "⚕️", lat: 18.0410, lng: -77.5038 },
  { id: "v6", name: "QuickMeds Kingston", location: "Half Way Tree", products: 112, rating: 4.7, image: "🚀", lat: 18.0106, lng: -76.7984 },
];
