import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const AddMedicineForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    id: "",
    name: "",
    genericName: "",
    brand: "",
    dosageForm: "",
    strength: "",
    packaging: "",
    barcode: "",
    supplierId: "",
    unitCost: "",
    sellingPrice: "",
    category: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "✅ Medicine Added",
      description: `${form.name || "Unnamed medicine"} has been added.`,
    });

   setTimeout(() => {
      navigate("/medicines"); 
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="shadow-md rounded-2xl border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-gray-800">
            ➕ Add New Medicine
          </CardTitle>
          <p className="text-sm text-gray-500">
            Fill in the details below to add a new medicine.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">General Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="id">Medicine ID</Label>
                  <Input id="id" name="id" value={form.id} onChange={handleChange} placeholder="e.g., med001" required />
                </div>
                <div>
                  <Label htmlFor="name">Medicine Name</Label>
                  <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="e.g., Paracetamol" required />
                </div>
                <div>
                  <Label htmlFor="genericName">Generic Name</Label>
                  <Input id="genericName" name="genericName" value={form.genericName} onChange={handleChange} placeholder="e.g., Acetaminophen" required />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" name="brand" value={form.brand} onChange={handleChange} placeholder="e.g., Tylenol" required />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" value={form.category} onChange={handleChange} placeholder="e.g., Analgesic" required/>
                </div>
              </div>
            </div>

            {/* Dosage & Packaging */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Dosage & Packaging</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dosageForm">Dosage Form</Label>
                  <Input id="dosageForm" name="dosageForm" value={form.dosageForm} onChange={handleChange} placeholder="e.g., Tablet" required />
                </div>
                <div>
                  <Label htmlFor="strength">Strength</Label>
                  <Input id="strength" name="strength" value={form.strength} onChange={handleChange} placeholder="e.g., 500mg" required />
                </div>
                <div>
                  <Label htmlFor="packaging">Packaging</Label>
                  <Input id="packaging" name="packaging" value={form.packaging} onChange={handleChange} placeholder="e.g., Bottle of 100" required />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unitCost">Unit Cost</Label>
                  <Input id="unitCost" name="unitCost" type="number" value={form.unitCost} onChange={handleChange} placeholder="e.g., 0.15" required/>
                </div>
                <div>
                  <Label htmlFor="sellingPrice">Selling Price</Label>
                  <Input id="sellingPrice" name="sellingPrice" type="number" value={form.sellingPrice} onChange={handleChange} placeholder="e.g., 0.25" required/>
                </div>
              </div>
            </div>

            {/* Inventory / Supplier */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Inventory & Supplier</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="barcode">Barcode</Label>
                  <Input id="barcode" name="barcode" value={form.barcode} onChange={handleChange} placeholder="e.g., 123456789012" required/>
                </div>
                <div>
                  <Label htmlFor="supplierId">Supplier ID</Label>
                  <Input id="supplierId" name="supplierId" value={form.supplierId} onChange={handleChange} placeholder="e.g., sup1" required/>
                </div>
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
                placeholder="Short description of the medicine"
                rows={3}
                required
              />
            </div>

            {/* Submit */}
            <div className="pt-6 flex justify-end">
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 text-white px-6 py-2 rounded-lg"
              >
                Add Medicine
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
