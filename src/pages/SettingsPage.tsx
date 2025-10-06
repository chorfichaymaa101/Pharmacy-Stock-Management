import { Bell, Shield, Database, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { settingsSections } from '@/data/sampleData';

const SettingsPage = () => {
  const { toast } = useToast();

  const handleSettingAction = (action: string) => {
    toast({
      title: "Settings Updated",
      description: `${action.replace('_', ' ')} settings have been updated`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Customize your pharmacy system preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsSections
          .filter(section => section.title !== "Profile") // remove profile section
          .map((section) => (
            <Card
              key={section.title}
              className="shadow-lg rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-lg font-semibold">
                  <section.icon className="h-5 w-5 text-primary" />
                  <span>{section.title}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors"
                  >
                    <Label htmlFor={item.action} className="flex-1 cursor-pointer text-sm font-medium">
                      {item.label}
                    </Label>
                    {item.toggle ? (
                      <Switch
                        id={item.action}
                        defaultChecked={true}
                        onCheckedChange={() => handleSettingAction(item.action)}
                      />
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500"
                        onClick={() => handleSettingAction(item.action)}
                      >
                        Configure
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Appearance / Theme Section 
      <Card className="shadow-lg rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-lg font-semibold">
            <Palette className="h-5 w-5 text-primary" />
            <span>Appearance & Themes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white text-center shadow-md">
              <p className="font-medium">Medical Blue Theme</p>
              <p className="text-sm opacity-90">Current</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-400 to-teal-500 rounded-xl text-white text-center shadow-md opacity-70">
              <p className="font-medium">Health Green Theme</p>
              <p className="text-sm opacity-90">Coming Soon</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl text-white text-center shadow-md opacity-70">
              <p className="font-medium">Pharmacy Gold Theme</p>
              <p className="text-sm opacity-90">Coming Soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
      */}
    </div>
  );
};

export default SettingsPage;
