"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, FileText, MessageCircle, Phone, Mail, Video, BookOpen, ArrowRight, Package, ShoppingCart, Users, BarChart, Settings } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">المساعدة والدعم</h1>
      </div>

      <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="ابحث في مركز المساعدة..."
            className="pl-8"
          />
        </div>
        <Button>بحث</Button>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid grid-cols-4 h-auto p-1">
          <TabsTrigger value="faq" className="py-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>الأسئلة الشائعة</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="guides" className="py-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>أدلة الاستخدام</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="videos" className="py-2">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>فيديوهات تعليمية</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="contact" className="py-2">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>اتصل بنا</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* الأسئلة الشائعة */}
        <TabsContent value="faq" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>الأسئلة الشائعة حول المنتجات</CardTitle>
                <CardDescription>الأسئلة المتكررة حول إدارة المنتجات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { question: "كيف يمكنني إضافة منتج جديد؟", answer: "يمكنك إضافة منتج جديد من خلال الانتقال إلى صفحة المنتجات والنقر على زر 'إضافة منتج'. قم بتعبئة المعلومات المطلوبة مثل اسم المنتج، الكود، السعر، الكمية، وحفظ المنتج." },
                  { question: "كيف يمكنني تعديل معلومات منتج؟", answer: "انتقل إلى صفحة المنتجات، ابحث عن المنتج المطلوب، ثم انقر على زر 'تعديل' المقابل للمنتج. قم بتعديل المعلومات المطلوبة ثم احفظ التغييرات." },
                  { question: "كيف يمكنني تتبع مخزون المنتجات؟", answer: "يمكنك تتبع مخزون المنتجات من خلال صفحة المنتجات حيث تظهر كمية كل منتج. كما يمكنك الاطلاع على تقارير المخزون من صفحة التقارير لمعرفة المنتجات منخفضة المخزون والمنتجات الأكثر مبيعاً." },
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
                <CardTitle>الأسئلة الشائعة حول الطلبات</CardTitle>
                <CardDescription>الأسئلة المتكررة حول إدارة الطلبات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { question: "كيف يمكنني إنشاء طلب جديد؟", answer: "يمكنك إنشاء طلب جديد من خلال النقر على 'إضافة طلب' من القائمة الجانبية. قم باختيار العميل، وإضافة المنتجات المطلوبة، وتحديد الكميات، ثم إكمال معلومات الطلب والدفع." },
                  { question: "كيف يمكنني تتبع حالة الطلبات؟", answer: "يمكنك تتبع حالة الطلبات من خلال صفحة الطلبات، حيث تظهر جميع الطلبات مع حالتها الحالية. يمكنك النقر على أي طلب لعرض تفاصيله الكاملة وتحديث حالته." },
                  { question: "كيف يمكنني إلغاء طلب؟", answer: "لإلغاء طلب، انتقل إلى صفحة الطلبات، ابحث عن الطلب المطلوب، ثم انقر على زر 'عرض'. من صفحة تفاصيل الطلب، يمكنك النقر على زر 'إلغاء الطلب' وتأكيد الإلغاء." },
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
                <CardTitle>الأسئلة الشائعة حول العملاء</CardTitle>
                <CardDescription>الأسئلة المتكررة حول إدارة العملاء</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { question: "كيف يمكنني إضافة عميل جديد؟", answer: "يمكنك إضافة عميل جديد من خلال الانتقال إلى صفحة العملاء والنقر على زر 'إضافة عميل'. قم بتعبئة المعلومات المطلوبة مثل الاسم، رقم الهاتف، البريد الإلكتروني، والعنوان، ثم احفظ بيانات العميل." },
                  { question: "كيف يمكنني عرض سجل مشتريات العميل؟", answer: "انتقل إلى صفحة العملاء، ابحث عن العميل المطلوب، ثم انقر على زر 'عرض'. في صفحة تفاصيل العميل، ستجد قسماً خاصاً بسجل المشتريات يعرض جميع الطلبات السابقة للعميل." },
                  { question: "كيف يمكنني تعديل حد الائتمان للعميل؟", answer: "انتقل إلى صفحة تفاصيل العميل، ثم انقر على زر 'تعديل حد الائتمان'. أدخل الحد الائتماني الجديد واحفظ التغييرات. يمكنك أيضاً تعديل هذه المعلومات من خلال تعديل بيانات العميل." },
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
                <CardTitle>الأسئلة الشائعة حول التقارير</CardTitle>
                <CardDescription>الأسئلة المتكررة حول التقارير والإحصائيات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { question: "كيف يمكنني عرض تقارير المبيعات؟", answer: "يمكنك عرض تقارير المبيعات من خلال الانتقال إلى صفحة التقارير واختيار تبويب 'المبيعات'. ستجد تحليلاً للمبيعات الشهرية، وأفضل المنتجات مبيعاً، والمبيعات حسب الفئة." },
                  { question: "كيف يمكنني تصدير التقارير؟", answer: "في صفحة التقارير، اختر التقرير الذي ترغب في تصديره، ثم انقر على زر 'تصدير' في أعلى الصفحة. يمكنك اختيار تنسيق التصدير (Excel، PDF، CSV) ثم تأكيد التصدير." },
                  { question: "هل يمكنني تخصيص نطاق التقارير الزمني؟", answer: "نعم، يمكنك تخصيص النطاق الزمني للتقارير من خلال النقر على زر 'تحديد الفترة' في أعلى صفحة التقارير. حدد تاريخ البداية والنهاية للفترة المطلوبة، ثم انقر على 'تطبيق'." },
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
              { title: "دليل البدء السريع", description: "تعرف على أساسيات استخدام نظام إدارة المخزون", icon: BookOpen },
              { title: "إدارة المنتجات", description: "دليل شامل لإضافة وتعديل وإدارة المنتجات", icon: Package },
              { title: "إدارة الطلبات", description: "كيفية إنشاء ومتابعة وإدارة الطلبات", icon: ShoppingCart },
              { title: "إدارة العملاء", description: "دليل إدارة بيانات العملاء وسجلات المشتريات", icon: Users },
              { title: "التقارير والإحصائيات", description: "كيفية استخدام وتحليل التقارير المختلفة", icon: BarChart },
              { title: "إعدادات النظام", description: "تخصيص إعدادات النظام حسب احتياجاتك", icon: Settings }
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
                    <span>قراءة الدليل</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>أدلة متقدمة</CardTitle>
              <CardDescription>أدلة متخصصة لمستخدمي النظام المتقدمين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "إدارة المخزون المتقدمة", description: "تعلم كيفية إدارة المخزون بكفاءة عالية، وتتبع حركة المنتجات، وتنظيم المستودعات" },
                  { title: "التحليلات وذكاء الأعمال", description: "استخدام تقارير النظام لاتخاذ قرارات تجارية مدروسة وتحسين الأداء" },
                  { title: "تكامل النظام مع الأنظمة الأخرى", description: "كيفية ربط نظام إدارة المخزون مع أنظمة المحاسبة والتجارة الإلكترونية" },
                  { title: "إدارة المستخدمين والصلاحيات", description: "إعداد أدوار المستخدمين وإدارة الصلاحيات لفريق العمل" }
                ].map((guide, index) => (
                  <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <FileText className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">{guide.title}</div>
                      <div className="text-sm text-muted-foreground">{guide.description}</div>
                      <Button variant="link" className="px-0 py-1 h-auto">
                        قراءة الدليل
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
              { title: "مقدمة في نظام إدارة المخزون", duration: "5:30", thumbnail: "bg-gray-200" },
              { title: "كيفية إضافة وإدارة المنتجات", duration: "8:45", thumbnail: "bg-gray-200" },
              { title: "إنشاء وإدارة الطلبات", duration: "7:20", thumbnail: "bg-gray-200" },
              { title: "إدارة بيانات العملاء", duration: "6:15", thumbnail: "bg-gray-200" }
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
                    مشاهدة الفيديو
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>سلسلة تعليمية: إتقان نظام إدارة المخزون</CardTitle>
              <CardDescription>سلسلة فيديوهات متكاملة لتعلم جميع جوانب النظام</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "الدرس 1: نظرة عامة على النظام", duration: "10:15" },
                  { title: "الدرس 2: إدارة المنتجات والمخزون", duration: "12:30" },
                  { title: "الدرس 3: إدارة الطلبات والمبيعات", duration: "15:45" },
                  { title: "الدرس 4: إدارة العملاء والموردين", duration: "11:20" },
                  { title: "الدرس 5: التقارير والتحليلات", duration: "14:10" }
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
                        مشاهدة
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
                  <span>الدعم الفني عبر الهاتف</span>
                </CardTitle>
                <CardDescription>تواصل مع فريق الدعم الفني مباشرة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-xl font-bold">+966 12 345 6789</div>
                <div className="text-sm text-muted-foreground">
                  متاح من الأحد إلى الخميس<br />
                  9:00 صباحاً - 5:00 مساءً
                </div>
                <Button className="w-full">
                  اتصل الآن
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>الدعم عبر البريد الإلكتروني</span>
                </CardTitle>
                <CardDescription>أرسل استفسارك وسنرد عليك في أقرب وقت</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-xl font-bold">support@example.com</div>
                <div className="text-sm text-muted-foreground">
                  نرد على جميع الاستفسارات خلال 24 ساعة
                </div>
                <Button className="w-full">
                  إرسال بريد إلكتروني
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <span>الدردشة المباشرة</span>
                </CardTitle>
                <CardDescription>تحدث مع أحد ممثلي خدمة العملاء مباشرة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-xl font-bold">متاح الآن</div>
                <div className="text-sm text-muted-foreground">
                  متوسط وقت الانتظار: 2 دقيقة
                </div>
                <Button className="w-full">
                  بدء الدردشة
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>إرسال استفسار</CardTitle>
              <CardDescription>أرسل استفسارك وسنرد عليك في أقرب وقت ممكن</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">الاسم</label>
                    <Input id="name" placeholder="أدخل اسمك" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">البريد الإلكتروني</label>
                    <Input id="email" type="email" placeholder="أدخل بريدك الإلكتروني" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">الموضوع</label>
                  <Input id="subject" placeholder="أدخل موضوع الاستفسار" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">الرسالة</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full p-2 border rounded-md resize-none"
                  ></textarea>
                </div>
                <Button className="w-full">
                  إرسال الاستفسار
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}