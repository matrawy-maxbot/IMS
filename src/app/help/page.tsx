"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, FileText, BookOpen, ArrowRight, Package, ShoppingCart, Users, BarChart, Settings, Rocket, Image, Link, MessageCircle } from "lucide-react";
import { useTranslations } from 'next-intl';
import { GetStartedChecklist } from "@/components/get-started-checklist";
import EmojiPicker, { EmojiStyle, Theme, type EmojiClickData } from 'emoji-picker-react';
import { useTheme } from "next-themes";

export default function HelpPage() {
  const t = useTranslations('help');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');
  const { theme } = useTheme();
  
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleEmojiSelect = (data: EmojiClickData) => {
    setMessageInput(messageInput + data.emoji);
  };
  
  return (
    <div className="flex flex-col gap-4">
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

      <Tabs defaultValue="get-started" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full h-auto p-1 gap-1">
          <TabsTrigger value="get-started" className="py-3 px-4 flex-1">
            <div className="flex items-center justify-center gap-2">
              <Rocket className="h-4 w-4" />
              <span className="hidden sm:inline">{t('getStarted')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="faq" className="py-3 px-4 flex-1">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{t('faq')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="contact" className="py-3 px-4 flex-1">
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{t('contact')}</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Get Started Tab */}
        <TabsContent value="get-started" className="space-y-6">
          <GetStartedChecklist />
        </TabsContent>

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

        {/* اتصل بنا */}
        <TabsContent value="contact" className="space-y-6">
          <Card className="mx-auto rounded-[1.25rem]">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-[300px,1fr] h-[600px]">
                {/* Sidebar */}
                <div className="border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 overflow-y-auto rounded-bl-[1.25rem] rounded-tl-[1.25rem]">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-gray-100 flex gap-2"><MessageCircle className="h-4 w-4" />{t('liveChat')}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { name: "TClinet", email: "tclinet@gmail.com", time: "03:55 PM", message: "Hello man", status: "CLIENT", unread: false, isOnline: true },
                      { name: "DOEP", email: "", time: "06:42 PM", message: "كلامك صح زي ماتقول يعني دايما", status: "ADMIN", unread: false, isOnline: true },
                      { name: "محمد العلال", email: "transAdvnomo@gmail.com", time: "", message: "مش عارف والله بس ياريت نبقي نتواصل", status: "CLIENT", unread: false, isOnline: false },
                      { name: "TClinet", email: "tclinetahman1@gmail.com", time: "", message: "حلو نوص", status: "CLIENT", unread: false, isOnline: true },
                      { name: "lopeffer jualig", email: "lopeffer:8000@gmail.com", time: "", message: "No messages yet", status: "CLIENT", unread: false, isOnline: false }
                    ].map((chat, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          index === 0 ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                              {chat.name.charAt(0)}
                            </div>
                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                              chat.isOnline ? 'bg-green-500 dark:bg-green-400' : 'bg-slate-300 dark:bg-slate-700'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <div className="font-medium truncate text-slate-900 dark:text-gray-100 text-sm">{chat.name}
                                {chat.status && (
                                <div className={`text-xs px-2 py-0.5 rounded-full inline-block ml-2 ${
                                  chat.status === 'CLIENT' 
                                    ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400' 
                                    : 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400'
                                }`}>
                                  {chat.status}
                                </div>
                              )}
                              </div>
                              {chat.time && (
                                <div className="text-xs text-slate-500 dark:text-gray-400">{chat.time}</div>
                              )}
                            </div>
                            {chat.email && (
                              <div className="text-xs text-slate-600 dark:text-gray-500 truncate">{chat.email}</div>
                            )}
                            {chat.message && (
                              <div className="text-xs text-slate-600 dark:text-gray-400 truncate mt-1">
                                {chat.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex flex-col">
                  {/* Chat Header */}
                  <div className="border-b border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900 flex items-center justify-between rounded-tr-[1.25rem]">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                          T
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 bg-green-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-gray-100 text-sm">TClinet
                          <div className="text-xs px-2 py-0.5 rounded-full inline-block ml-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400">CLIENT</div>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-gray-400">tclinet@gmail.com</div>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-950">
                    <div className="space-y-4 p-6">
                      {/* Received Message */}
                      <div className="flex items-start gap-3">
                        <div className="relative h-8 w-8 flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                            T
                          </div>
                          <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white dark:border-slate-950 bg-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-slate-500 dark:text-gray-400 mb-2">TClinet • <div className="text-xs px-2 py-0.5 rounded-full inline-block bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400">CLIENT</div> • 06:02 PM</div>
                          <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3 w-fit">
                            <div className="text-sm text-slate-900 dark:text-gray-100">Hello broo!!</div>
                          </div>
                        </div>
                      </div>

                      {/* Sent Message */}
                      <div className="flex items-start gap-3 justify-end">
                        <div className="flex-1 flex flex-col items-end">
                          <div className="text-xs text-slate-500 dark:text-gray-400 mb-2">06:42 PM • <div className="text-xs px-2 py-0.5 rounded-full inline-block bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400">ADMIN</div> • Elshdaey</div>
                          <div className="bg-blue-600 dark:bg-blue-600 rounded-2xl px-4 py-3 w-fit">
                            <div className="text-sm text-white">Hello man</div>
                          </div>
                        </div>
                        <div className="relative h-8 w-8 flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                            E
                          </div>
                          <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white dark:border-slate-950 bg-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900 rounded-br-[1.25rem]">
                    <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 relative">
                      {/* Media Attachment Icons */}
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200"
                          title="إضافة صورة"
                        >
                          <Image className="h-5 w-5" />
                        </button>
                        <button 
                          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200"
                          title="إضافة فيديو"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        <button 
                          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200"
                          title="إضافة ملف"
                        >
                          <Link className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Input Field */}
                      <Input
                        placeholder={t('typeMessage')}
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-1 border-0 bg-transparent placeholder:text-slate-400 dark:placeholder:text-gray-500 focus-visible:ring-0 text-slate-900 dark:text-gray-100 text-sm"
                      />

                      {/* Emoji Button */}
                      <div className="relative">
                        <button 
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-lg"
                          title="أضف رموز تعبيرية"
                        >
                          😊
                        </button>

                        {/* Emoji Picker Dropdown */}
                        {showEmojiPicker && (
                          <div ref={emojiPickerRef} className="absolute bottom-full right-0 mb-2 z-50">
                            <EmojiPicker
                              theme={theme === 'dark' ? Theme.DARK : Theme.LIGHT}
                              width={320}
                              height={400}
                              lazyLoadEmojis
                              searchDisabled={true}
                              emojiStyle={EmojiStyle.NATIVE}
                              previewConfig={{ showPreview: false }}
                              onEmojiClick={handleEmojiSelect}
                            />
                          </div>
                        )}
                      </div>

                      {/* Send Button */}
                      <button 
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white flex items-center justify-center"
                        title="إرسال"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
