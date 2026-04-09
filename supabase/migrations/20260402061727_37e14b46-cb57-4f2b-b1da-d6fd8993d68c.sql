
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('customer', 'doctor', 'pharmacy');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  phone TEXT,
  address TEXT,
  parish TEXT,
  avatar_url TEXT,
  role app_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Pharmacies table
CREATE TABLE public.pharmacies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  parish TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  license_number TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  operating_hours TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pharmacies viewable by everyone" ON public.pharmacies FOR SELECT USING (true);
CREATE POLICY "Pharmacy owners can update" ON public.pharmacies FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Pharmacy owners can insert" ON public.pharmacies FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Medications table
CREATE TABLE public.medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pharmacy_id UUID REFERENCES public.pharmacies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  dosage TEXT,
  image_url TEXT,
  requires_prescription BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  badge TEXT,
  rating NUMERIC(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Medications viewable by everyone" ON public.medications FOR SELECT USING (true);
CREATE POLICY "Pharmacy owners can manage medications" ON public.medications
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.pharmacies WHERE id = pharmacy_id AND owner_id = auth.uid())
  );

-- Prescriptions table
CREATE TABLE public.prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES auth.users(id),
  pharmacy_id UUID REFERENCES public.pharmacies(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'declined', 'fulfilled')),
  image_url TEXT,
  notes TEXT,
  doctor_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own prescriptions" ON public.prescriptions
  FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers can create prescriptions" ON public.prescriptions
  FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Doctors can view assigned prescriptions" ON public.prescriptions
  FOR SELECT USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors can update assigned prescriptions" ON public.prescriptions
  FOR UPDATE USING (auth.uid() = doctor_id);
CREATE POLICY "Pharmacy can view assigned prescriptions" ON public.prescriptions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.pharmacies WHERE id = pharmacy_id AND owner_id = auth.uid())
  );

-- Orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pharmacy_id UUID REFERENCES public.pharmacies(id),
  prescription_id UUID REFERENCES public.prescriptions(id),
  status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'confirmed', 'shipping', 'delivered', 'cancelled')),
  delivery_address TEXT,
  delivery_parish TEXT,
  total_amount INTEGER NOT NULL DEFAULT 0,
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers can create orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Pharmacy can view assigned orders" ON public.orders
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.pharmacies WHERE id = pharmacy_id AND owner_id = auth.uid())
  );
CREATE POLICY "Pharmacy can update assigned orders" ON public.orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.pharmacies WHERE id = pharmacy_id AND owner_id = auth.uid())
  );

-- Order items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  medication_id UUID REFERENCES public.medications(id),
  medication_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order items viewable by order owner" ON public.order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND customer_id = auth.uid())
  );
CREATE POLICY "Order items insertable by order owner" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND customer_id = auth.uid())
  );

-- Timestamps trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pharmacies_updated_at BEFORE UPDATE ON public.pharmacies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_medications_updated_at BEFORE UPDATE ON public.medications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_prescriptions_updated_at BEFORE UPDATE ON public.prescriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'customer')
  );
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Prescription uploads storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('prescriptions', 'prescriptions', false);

CREATE POLICY "Users can upload prescriptions" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'prescriptions' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view own prescriptions" ON storage.objects
  FOR SELECT USING (bucket_id = 'prescriptions' AND auth.uid()::text = (storage.foldername(name))[1]);
