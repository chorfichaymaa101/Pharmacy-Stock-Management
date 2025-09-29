import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Medicine } from "@/types/pharmacy";

export const UpdateMedicineForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Expecting medicine object passed via location state
  const selectedMedicine: Medicine = location.state?.medicine;

  const [form, setForm] = useState<Medicine>({
    id: "",
    name: "",
    genericName: "",
    brand: "",
    dosageForm: "",
    strength: "",
    packaging: "",
    barcode: "",
    supplierId: "",
    unitCost: 0,
    sellingPrice: 0,
    category: "",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Prefill form when component mounts
  useEffect(() => {
    if (selectedMedicine) {
      setForm(selectedMedicine);
    }
  }, [selectedMedicine]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "✅ Medicine Updated",
      description: `${form.name} has been updated (mock).`,
    });

    setTimeout(() => {
      navigate("/medicines", { replace: true, state: { scrollToTop: true } });
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="shadow-md rounded-2xl border border-gray-200">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            ✏️ Update Medicine
          </h2>
          <p className="text-gray-500 text-sm">
            Modify the fields below to update the medicine details.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Medicine Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Paracetamol"
                  required
                />
              </div>
              <div>
                <Label htmlFor="genericName">Generic Name</Label>
                <Input
                  id="genericName"
                  name="genericName"
                  value={form.genericName}
                  onChange={handleChange}
                  placeholder="Acetaminophen"
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="Tylenol"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Analgesic"
                />
              </div>
            </div>

            {/* Dosage & Packaging */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dosageForm">Dosage Form</Label>
                <Input
                  id="dosageForm"
                  name="dosageForm"
                  value={form.dosageForm}
                  onChange={handleChange}
                  placeholder="Tablet"
                />
              </div>
              <div>
                <Label htmlFor="strength">Strength</Label>
                <Input
                  id="strength"
                  name="strength"
                  value={form.strength}
                  onChange={handleChange}
                  placeholder="500mg"
                />
              </div>
              <div>
                <Label htmlFor="packaging">Packaging</Label>
                <Input
                  id="packaging"
                  name="packaging"
                  value={form.packaging}
                  onChange={handleChange}
                  placeholder="Bottle of 100"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="unitCost">Unit Cost</Label>
                <Input
                  id="unitCost"
                  name="unitCost"
                  type="number"
                  value={form.unitCost}
                  onChange={handleChange}
                  placeholder="0.15"
                />
              </div>
              <div>
                <Label htmlFor="sellingPrice">Selling Price</Label>
                <Input
                  id="sellingPrice"
                  name="sellingPrice"
                  type="number"
                  value={form.sellingPrice}
                  onChange={handleChange}
                  placeholder="0.25"
                />
              </div>
            </div>

            {/* Supplier & Barcode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="barcode">Barcode</Label>
                <Input
                  id="barcode"
                  name="barcode"
                  value={form.barcode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="supplierId">Supplier ID</Label>
                <Input
                  id="supplierId"
                  name="supplierId"
                  value={form.supplierId}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Pain relief and fever reducer"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg"
              >
                Update Medicine
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
