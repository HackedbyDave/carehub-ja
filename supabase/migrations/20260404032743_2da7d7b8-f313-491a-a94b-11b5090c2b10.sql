CREATE POLICY "Pharmacy owners can delete medications"
ON public.medications
FOR DELETE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM pharmacies
  WHERE pharmacies.id = medications.pharmacy_id
  AND pharmacies.owner_id = auth.uid()
));