"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, FileText, MessageCircle, Phone, Mail, Video, BookOpen, ArrowRight, Package, ShoppingCart, Users, BarChart, Settings } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function HelpPage() {
  const t = useTranslations('help');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      </div>

      <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('searchHelp')}
            className="pl-8"
          />
        </div>
        <Button>{t('search')}</Button>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid grid-cols-4 h-auto p-1">
          <TabsTrigger value="faq" className="py-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>{t('faq')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="guides" className="py-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>{t('guides')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="videos" className="py-2">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>{t('videos')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="contact" className="py-2">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>{t('contact')}</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* الأسئلة الشائعة */}
        <TabsContent value="faq" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('faqProducts')}</CardTitle>
                <CardDescription>{t('faqProductsDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { question: t('faqProduct1'), answer: t('faqProduct1Answer') },
                  { question: t('faqProduct2'), answer: t('faqProduct2Answer') },
                  { question: t('faqProduct3'), answer: t('faqProduct3Answer') },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="font-medium">{item.question}</div>
                    <div className="text-sm text-muted-foreground">{item.answer}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('faqOrders')}</CardTitle>
                <CardDescription>{t('faqOrdersDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { question: t('faqOrder1'), answer: t('faqOrder1Answer') },
                  { question: t('faqOrder2'), answer: t('faqOrder2Answer') },
                  { question: t('faqOrder3'), answer: t('faqOrder3Answer') },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="font-medium">{item.question}</div>
                    <div className="text-sm text-muted-foreground">{item.answer}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('faqCustomers')}</CardTitle>
                <CardDescription>{t('faqCustomersDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { question: t('faqCustomer1'), answer: t('faqCustomer1Answer') },
                  { question: t('faqCustomer2'), answer: t('faqCustomer2Answer') },
                  { question: t('faqCustomer3'), answer: t('faqCustomer3Answer') },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="font-medium">{item.question}</div>
                    <div className="text-sm text-muted-foreground">{item.answer}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('faqReports')}</CardTitle>
                <CardDescription>{t('faqReportsDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { question: t('faqReport1'), answer: t('faqReport1Answer') },
                  { question: t('faqReport2'), answer: t('faqReport2Answer') },
                  { question: t('faqReport3'), answer: t('faqReport3Answer') },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="font-medium">{item.question}</div>
                    <div className="text-sm text-muted-foreground">{item.answer}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* أدلة الاستخدام */}
        <TabsContent value="guides" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: t('quickStartGuide'), description: t('quickStartGuideDesc'), icon: BookOpen },
              { title: t('productManagement'), description: t('productManagementDesc'), icon: Package },
              { title: t('orderManagement'), description: t('orderManagementDesc'), icon: ShoppingCart },
              { title: t('customerManagement'), description: t('customerManagementDesc'), icon: Users },
              { title: t('reportsAndAnalytics'), description: t('reportsAndAnalyticsDesc'), icon: BarChart },
              { title: t('systemSettings'), description: t('systemSettingsDesc'), icon: Settings }
            ].map((guide, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-2">
                    <guide.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                  </div>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Button variant="outline" className="w-full justify-between">
                    <span>{t('readGuide')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('advancedGuides')}</CardTitle>
              <CardDescription>{t('advancedGuidesDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: t('advancedInventory'), description: t('advancedInventoryDesc') },
                  { title: t('analyticsAndBI'), description: t('analyticsAndBIDesc') },
                  { title: t('systemIntegration'), description: t('systemIntegrationDesc') },
                  { title: t('userManagementGuide'), description: t('userManagementGuideDesc') }
                ].map((guide, index) => (
                  <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <FileText className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">{guide.title}</div>
                      <div className="text-sm text-muted-foreground">{guide.description}</div>
                      <Button variant="link" className="px-0 py-1 h-auto">
                        {t('readGuide')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* فيديوهات تعليمية */}
        <TabsContent value="videos" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: t('videoIntro'), duration: "5:30", thumbnail: "bg-gray-200" },
              { title: t('videoProducts'), duration: "8:45", thumbnail: "bg-gray-200" },
              { title: t('videoOrders'), duration: "7:20", thumbnail: "bg-gray-200" },
              { title: t('videoCustomers'), duration: "6:15", thumbnail: "bg-gray-200" }
            ].map((video, index) => (
              <Card key={index} className="overflow-hidden">
                <div className={`aspect-video ${video.thumbnail} relative flex items-center justify-center`}>
                  <div className="h-12 w-12 rounded-full bg-black/50 flex items-center justify-center">
                    <div className="h-0 w-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="outline" className="w-full">
                    {t('watchVideo')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('videoSeriesTitle')}</CardTitle>
              <CardDescription>{t('videoSeriesDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: t('lesson1'), duration: "10:15" },
                  { title: t('lesson2'), duration: "12:30" },
                  { title: t('lesson3'), duration: "15:45" },
                  { title: t('lesson4'), duration: "11:20" },
                  { title: t('lesson5'), duration: "14:10" }
                ].map((lesson, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <div className="font-medium">{lesson.title}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                      <Button variant="ghost" size="sm">
                        {t('watch')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* اتصل بنا */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{t('phoneSupport')}</span>
                </CardTitle>
                <CardDescription>{t('phoneSupportDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-xl font-bold">+966 12 345 6789</div>
                <div className="text-sm text-muted-foreground">
                  {t('availableTime')}<br />
                  {t('workingHours')}
                </div>
                <Button className="w-full">
                  {t('callNow')}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>{t('emailSupport')}</span>
                </CardTitle>
                <CardDescription>{t('emailSupportDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-xl font-bold">support@example.com</div>
                <div className="text-sm text-muted-foreground">
                  {t('emailResponseTime')}
                </div>
                <Button className="w-full">
                  {t('sendEmail')}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <span>{t('liveChat')}</span>
                </CardTitle>
                <CardDescription>{t('liveChatDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-xl font-bold">{t('availableNow')}</div>
                <div className="text-sm text-muted-foreground">
                  {t('avgWaitTime')}
                </div>
                <Button className="w-full">
                  {t('startChat')}
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('sendInquiry')}</CardTitle>
              <CardDescription>{t('sendInquiryDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">{tCommon('name')}</label>
                    <Input id="name" placeholder={t('enterName')} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">{tCommon('email')}</label>
                    <Input id="email" type="email" placeholder={t('enterEmail')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">{t('subject')}</label>
                  <Input id="subject" placeholder={t('enterSubject')} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">{t('message')}</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder={t('writeMessage')}
                    className="w-full p-2 border rounded-md resize-none"
                  ></textarea>
                </div>
                <Button className="w-full">
                  {t('sendInquiry')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
