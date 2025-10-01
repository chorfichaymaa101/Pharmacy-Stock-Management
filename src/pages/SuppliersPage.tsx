import { useState } from 'react';
import { Plus, Search, Star, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { sampleSuppliers } from '@/data/sampleData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useNavigate  } from 'react-router-dom';

const SuppliersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredSuppliers = sampleSuppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-muted-foreground"
        )}
      />
    ));
  };

  const getLeadTimeColor = (leadTime: number) => {
    if (leadTime <= 3) return "text-green-600 font-semibold";
    if (leadTime <= 5) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  const handleAddSupplier = () => {
    navigate("/add-supplier");
  };

  const handleEditSupplier = (supplierId: string) => {
    navigate(`/edit-supplier/${supplierId}`);
  };


  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Suppliers
          </h1>
          <p className="text-muted-foreground">Manage your pharmacy suppliers and contacts</p>
        </div>
        <Button
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:shadow-lg transition-all duration-200"
           onClick={handleAddSupplier}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      {/* Search */}
      <Card className="shadow-card border border-gray-100">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search suppliers by name or contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card
            key={supplier.id}
            className="shadow-card border border-gray-100 hover:shadow-elevated hover:-translate-y-1 transition-all duration-200 rounded-xl"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">{supplier.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{supplier.contact}</p>
                </div>
                <Badge
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    supplier.isActive
                      ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  )}
                >
                  {supplier.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex">{getRatingStars(supplier.rating)}</div>
                <span className="text-sm font-medium">{supplier.rating}</span>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{supplier.email}</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground leading-relaxed">{supplier.address}</span>
                </div>
              </div>

              {/* Lead Time */}
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Lead Time</span>
                  </div>
                  <span className={cn("text-sm", getLeadTimeColor(supplier.leadTime))}>
                    {supplier.leadTime} days
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500 hover:text-white transition-all"
                  onClick={() => handleEditSupplier(supplier.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500 hover:text-white transition-all"
                  onClick={()=> window.location.href = `mailto:${supplier.email}?subject=Order%20Inquiry&body=Hello%20${supplier.contact},`}
                >
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredSuppliers.length === 0 && (
        <Card className="shadow-card border border-gray-100">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No suppliers found</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              No suppliers match your search criteria. Try adjusting your search terms.
            </p>
            <Button
              variant="outline"
              className="mt-4 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500 hover:text-white transition-all"
              onClick={() => setSearchQuery('')}
            >
              Clear search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SuppliersPage;
