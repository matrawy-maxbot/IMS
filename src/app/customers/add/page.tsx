"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, User, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function AddCustomerPage() {
  const t = useTranslations('customers');
  const tCommon = useTranslations('common');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/customers">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{t('addCustomer')}</h1>
        </div>
        <Button className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          <span>{tCommon('save')}</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{t('basicInfo')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('customerName')}</Label>
              <div className="flex gap-2 items-center">
                <User className="h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder={t('customerName')} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <div className="flex gap-2 items-center">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder={t('email')} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">{t('phone')}</Label>
              <div className="flex gap-2 items-center">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <Input id="phone" placeholder={t('phone')} />
              </div>
            </div>
            
              <div className="space-y-2">
                <Label htmlFor="type">{t('customerType')}</Label>
                <select id="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="individual">{t('individual')}</option>
                  <option value="company">{t('company')}</option>
                  <option value="government">{t('government')}</option>
                </select>
              </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">{t('gender')}</Label>
              <select id="gender" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="male">{t('male')}</option>
                <option value="female">{t('female')}</option>
              </select>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{t('address')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">{t('address')}</Label>
                <div className="flex gap-2 items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input id="address" placeholder={t('address')} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">{t('city')}</Label>
                <Input id="city" placeholder={t('city')} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">{t('state')}</Label>
                <Input id="state" placeholder={t('state')} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postal-code">{t('postalCode')}</Label>
                <Input id="postal-code" placeholder={t('postalCode')} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">{t('country')}</Label>
                <select id="country" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="sa">{t('countrySA')}</option>
                  <option value="ae">{t('countryAE')}</option>
                  <option value="kw">{t('countryKW')}</option>
                  <option value="bh">{t('countryBH')}</option>
                  <option value="qa">{t('countryQA')}</option>
                  <option value="om">{t('countryOM')}</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}