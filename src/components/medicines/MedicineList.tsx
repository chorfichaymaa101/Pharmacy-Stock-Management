import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Search, Plus, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MedicineCard } from './MedicineCard';
import { sampleMedicines } from '@/data/sampleData';
import { Medicine } from '@/types/pharmacy';
import { useToast } from '@/hooks/use-toast';

// ✅ Import xlsx + file-saver
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const MedicineList = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [medicines, setMedicines] = useState<Medicine[]>(sampleMedicines);
  const { toast } = useToast();

  const categories = Array.from(new Set(medicines.map(med => med.category)));

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || medicine.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

   const handleExport = () => {
    const exportData = medicines.map(med => ({
      ID: med.id,
      Name: med.name,
      GenericName: med.genericName,
      Brand: med.brand,
      Category: med.category,
      sellingPrice: med.sellingPrice,
      unitCost: med.unitCost,
      barcode: med.barcode,
      packaging: med.packaging,
      dosageForm: med.dosageForm,
      strength: med.strength,
      supplierId: med.supplierId,
      description: med.description,
      createdAt: med.createdAt,
      updatedAt: med.updatedAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Medicines");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "medicines.xlsx");

    toast({
      title: "Export Successful",
      description: "Medicine list exported to Excel file",
    });
  };

  const handleEdit = (medicine: Medicine) => {
    toast({
      title: "Edit Medicine",
      description: `Opening edit form for ${medicine.name}`,
    });
  };

  const handleDelete = (medicineId: string) => {
    const medicine = medicines.find(m => m.id === medicineId);
    setMedicines(medicines.filter(m => m.id !== medicineId));
    toast({
      title: "Medicine Deleted",
      description: `${medicine?.name} has been removed from inventory`,
      variant: "destructive",
    });
  };

  const handleAddNew = () => {
    navigate("/add-medicine");
  };

  return (
     <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medicines</h1>
          <p className="text-muted-foreground">Manage your pharmacy inventory</p>
        </div>
        <div className="flex space-x-2 md:space-x-3">
          <Button
            variant="outline"
            className="flex items-center space-x-1 hover:bg-gray-100 hover:text-black"
            onClick={handleExport} // ✅ use the export handler
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button
            className="flex items-center space-x-1 bg-gradient-to-r from-green-500 to-teal-500 text-white hover:bg-gradient/20"
            onClick={handleAddNew}
          >
            <Plus className="h-4 w-4" />
            <span>Add Medicine</span>
          </Button>
        </div>
      </div>
      {/* Filters */}
      <Card className="shadow-sm rounded-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, generic name, or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-lg"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="rounded-lg border border-gray-300 hover:border-gray-400">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredMedicines.length} of {medicines.length} medicines
        </p>
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setSearchQuery('')}
          >
            Clear search
          </Button>
        )}
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map((medicine) => (
          <MedicineCard
            key={medicine.id}
            medicine={medicine}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredMedicines.length === 0 && (
        <Card className="shadow-sm rounded-xl border border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No medicines found</h3>
            <p className="text-gray-500 text-center max-w-sm">
              No medicines match your current search criteria. Try adjusting your filters or search terms.
            </p>
            <Button
              variant="outline"
              className="mt-4 hover:bg-gray-100"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
              }}
            >
              Reset filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
