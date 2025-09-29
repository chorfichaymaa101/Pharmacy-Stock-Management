import { useState } from 'react';
import { BarChart as BarIcon, PieChart as PieIcon, Download, Calendar, TrendingUp, Package, DollarSign, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { sampleReports } from '@/data/sampleData';



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Modal = ({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
      >
        <X className="h-5 w-5" />
      </button>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  </div>
);

const ReportsPage = () => {
  const { toast } = useToast();
  const [activeReport, setActiveReport] = useState<string | null>(null);

  const reportTypes = [
    { title: 'Stock Summary', icon: Package, chart: 'bar', description: 'Current inventory levels and valuation' },
    { title: 'Sales Report', icon: DollarSign, chart: 'bar', description: 'Revenue and transaction analysis' },
    { title: 'Expiry Report', icon: Calendar, chart: 'pie', description: 'Medicines expiring soon or expired' },
    { title: 'Usage Trends', icon: TrendingUp, chart: 'pie', description: 'Most dispensed medicines and patterns' },
  ];

  const handleExport = (reportTitle: string) => {
    const csvContent = `data:text/csv;charset=utf-8,Report,Value\n${reportTitle},Sample Data`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${reportTitle.replace(" ", "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    /*
    toast({
      title: "Export Successful",
      description: `${reportTitle} exported as CSV.`,
    });
    */
  };

  const renderChart = (report: typeof reportTypes[number]) => {
    const data = sampleReports[report.title];
    if (report.chart === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={report.title === 'Stock Summary' ? 'quantity' : 'revenue'} fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate insights and reports for your pharmacy</p>
        </div>
        {/*
        <Button
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-xl"
          onClick={() => {
            toast({
              title: "Custom Report",
              description: "Opening custom report builder",
            });
          }}
        >
          <BarIcon className="h-4 w-4 mr-2" />
          Custom Report
        </Button>
         */}
      </div>
     

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => (
          <Card
            key={report.title}
            className="shadow-lg rounded-2xl border border-gray-100 hover:shadow-2xl hover:border-gray-300 transition-all duration-300 group"
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gray-900 text-white shadow-md group-hover:scale-105 transition-transform">
                  <report.icon className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold">{report.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">{report.description}</p>
              <div className="flex space-x-3">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-90 rounded-xl"
                  onClick={() => setActiveReport(report.title)}
                >
                  Generate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-gray-400 text-gray-700 hover:bg-gray-100 hover:text-black"
                  onClick={() => handleExport(report.title)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {activeReport && (
        <Modal title={`${activeReport} Preview`} onClose={() => setActiveReport(null)}>
          {renderChart(reportTypes.find(r => r.title === activeReport)!)}
        </Modal>
      )}
    </div>
  );
};

export default ReportsPage;
