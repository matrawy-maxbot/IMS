"use client";

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Save, User, Mail, Phone, MapPin, Lock, Bell, Globe, Palette } from "lucide-react";
import { useUI } from "@/components/providers";

export default function UserSettingsPage() {
  const t = useTranslations('userSettings');
  const tCommon = useTranslations('common');
  
  const { showToast } = useUI();
  
  const handleSaveProfile = () => {
    showToast({
      title: t('saveSuccessTitle'),
      description: t('profileSaveSuccessDesc'),
      variant: "success"
    });
  };

  const handleSavePassword = () => {
    showToast({
      title: t('saveSuccessTitle'),
      description: t('passwordSaveSuccessDesc'),
      variant: "success"
    });
  };

  const handleSaveNotifications = () => {
    showToast({
      title: t('saveSuccessTitle'),
      description: t('notificationsSaveSuccessDesc'),
      variant: "success"
    });
  };

  const handleSavePreferences = () => {
    showToast({
      title: t('saveSuccessTitle'),
      description: t('preferencesSaveSuccessDesc'),
      variant: "success"
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-4 h-auto p-1">
          <TabsTrigger value="profile" className="py-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{t('profile')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="security" className="py-2">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>{t('security')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="py-2">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>{t('notifications')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="py-2">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>{t('preferences')}</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* الملف الشخصي */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('profileInfo')}</CardTitle>
              <CardDescription>{t('updateProfileInfo')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage 
                    src="https://static.vecteezy.com/system/resources/thumbnails/053/738/782/small_2x/3d-icon-avatar-cartoon-freelancer-man-working-on-laptop-with-transparent-background-png.png" 
                    alt="User Avatar" 
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{t('profilePicture')}</h3>
                  <p className="text-sm text-muted-foreground">{t('profilePictureDesc')}</p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">{t('changePhoto')}</Button>
                    <Button variant="outline" size="sm" className="text-destructive">{t('removePhoto')}</Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">
                    <User className="h-4 w-4 inline me-2" />
                    {t('fullName')}
                  </Label>
                  <Input id="full-name" placeholder={t('fullName')} defaultValue="أحمد محمد" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="h-4 w-4 inline me-2" />
                    {t('email')}
                  </Label>
                  <Input id="email" type="email" placeholder={t('email')} defaultValue="ahmed@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="h-4 w-4 inline me-2" />
                    {t('phone')}
                  </Label>
                  <Input id="phone" placeholder={t('phone')} defaultValue="+966 50 123 4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-title">
                    {t('jobTitle')}
                  </Label>
                  <Input id="job-title" placeholder={t('jobTitle')} defaultValue="مدير النظام" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">
                    <MapPin className="h-4 w-4 inline me-2" />
                    {t('address')}
                  </Label>
                  <Input id="address" placeholder={t('address')} defaultValue="الرياض، المملكة العربية السعودية" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-2" onClick={handleSaveProfile}>
                  <Save className="h-4 w-4" />
                  <span>{t('saveChanges')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الأمان */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('changePassword')}</CardTitle>
              <CardDescription>{t('updatePassword')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">{t('currentPassword')}</Label>
                <Input id="current-password" type="password" placeholder={t('currentPassword')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">{t('newPassword')}</Label>
                <Input id="new-password" type="password" placeholder={t('newPassword')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t('confirmPassword')}</Label>
                <Input id="confirm-password" type="password" placeholder={t('confirmPassword')} />
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-2" onClick={handleSavePassword}>
                  <Save className="h-4 w-4" />
                  <span>{t('updatePassword')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('twoFactorAuth')}</CardTitle>
              <CardDescription>{t('twoFactorAuthDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="space-y-0.5">
                  <div className="font-medium">{t('enable2FA')}</div>
                  <div className="text-sm text-muted-foreground">{t('enable2FADesc')}</div>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="2fa-enable" className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('activeSessions')}</CardTitle>
              <CardDescription>{t('activeSessionsDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { device: "Windows PC - Chrome", location: "الرياض، السعودية", time: "نشط الآن", current: true },
                { device: "iPhone - Safari", location: "جدة، السعودية", time: "منذ ساعتين", current: false },
                { device: "Android - Chrome", location: "الدمام، السعودية", time: "منذ يوم", current: false }
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between border p-4 rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">{session.device}</div>
                    <div className="text-sm text-muted-foreground">{session.location} • {session.time}</div>
                    {session.current && (
                      <div className="text-xs text-green-600">{t('currentSession')}</div>
                    )}
                  </div>
                  {!session.current && (
                    <Button variant="outline" size="sm" className="text-destructive">{t('endSession')}</Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* الإشعارات */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('notificationPreferences')}</CardTitle>
              <CardDescription>{t('notificationPreferencesDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('emailNotifications')}</h3>
                <div className="space-y-3">
                  {[
                    { id: "email-orders", label: t('orderNotifications'), desc: t('orderNotificationsDesc') },
                    { id: "email-products", label: t('productNotifications'), desc: t('productNotificationsDesc') },
                    { id: "email-reports", label: t('reportNotifications'), desc: t('reportNotificationsDesc') }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between border p-4 rounded-md">
                      <div className="space-y-0.5">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.desc}</div>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id={item.id} className="h-4 w-4" defaultChecked />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('systemNotifications')}</h3>
                <div className="space-y-3">
                  {[
                    { id: "system-low-stock", label: t('lowStockAlerts'), desc: t('lowStockAlertsDesc') },
                    { id: "system-new-customer", label: t('newCustomerAlerts'), desc: t('newCustomerAlertsDesc') },
                    { id: "system-updates", label: t('systemUpdates'), desc: t('systemUpdatesDesc') }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between border p-4 rounded-md">
                      <div className="space-y-0.5">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.desc}</div>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id={item.id} className="h-4 w-4" defaultChecked />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-2" onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4" />
                  <span>{t('saveChanges')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التفضيلات */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('displayPreferences')}</CardTitle>
              <CardDescription>{t('displayPreferencesDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">
                    <Globe className="h-4 w-4 inline me-2" />
                    {t('language')}
                  </Label>
                  <select id="language" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">
                    <Palette className="h-4 w-4 inline me-2" />
                    {t('theme')}
                  </Label>
                  <select id="theme" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                    <option value="light">{t('light')}</option>
                    <option value="dark">{t('dark')}</option>
                    <option value="system">{t('system')}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">{t('dateFormat')}</Label>
                  <select id="date-format" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                    <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                    <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                    <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-format">{t('timeFormat')}</Label>
                  <select id="time-format" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                    <option value="12">12 {t('hour')}</option>
                    <option value="24">24 {t('hour')}</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-2" onClick={handleSavePreferences}>
                  <Save className="h-4 w-4" />
                  <span>{t('saveChanges')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboardPreferences')}</CardTitle>
              <CardDescription>{t('dashboardPreferencesDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { id: "show-sales", label: t('showSalesChart'), desc: t('showSalesChartDesc') },
                  { id: "show-inventory", label: t('showInventoryStatus'), desc: t('showInventoryStatusDesc') },
                  { id: "show-recent-orders", label: t('showRecentOrders'), desc: t('showRecentOrdersDesc') },
                  { id: "show-top-products", label: t('showTopProducts'), desc: t('showTopProductsDesc') }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id={item.id} className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-2" onClick={handleSavePreferences}>
                  <Save className="h-4 w-4" />
                  <span>{t('saveChanges')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
