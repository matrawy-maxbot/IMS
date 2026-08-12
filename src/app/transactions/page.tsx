"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  FileEdit, 
  Trash2,
  TrendingUp,
  TrendingDown,
  ArrowDownCircle,
  ArrowUpCircle,
  RotateCcw,
  Wallet,
  Calendar,
  DollarSign
} from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TransactionType = "revenue" | "expense" | "return" | "withdrawal";

type Transaction = {
  id: number;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: string;
  reference?: string;
  paymentMethod?: string;
  status: string;
};

export default function TransactionsPage() {
  const t = useTranslations('transactions');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [activeTab, setActiveTab] = useState<TransactionType>("revenue");

  // Form states
  const [formType, setFormType] = useState<TransactionType>("revenue");
  const [formAmount, setFormAmount] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formReference, setFormReference] = useState("");
  const [formPaymentMethod, setFormPaymentMethod] = useState("");

  // Mock data
  const transactions: Transaction[] = [
    { id: 1, type: "revenue", amount: 15000, category: "مبيعات منتجات", description: "مبيعات شهر يونيو", date: "2023-06-15", reference: "REV-001", paymentMethod: "نقدي", status: "مكتمل" },
    { id: 2, type: "expense", amount: 5000, category: "رواتب", description: "رواتب الموظفين", date: "2023-06-10", reference: "EXP-001", paymentMethod: "تحويل بنكي", status: "مكتمل" },
    { id: 3, type: "revenue", amount: 8500, category: "خدمات", description: "إيرادات الخدمات", date: "2023-06-12", reference: "REV-002", paymentMethod: "بطاقة", status: "مكتمل" },
    { id: 4, type: "expense", amount: 3200, category: "إيجار", description: "إيجار المحل", date: "2023-06-05", reference: "EXP-002", paymentMethod: "شيك", status: "مكتمل" },
    { id: 5, type: "return", amount: 1500, category: "مرتجعات منتجات", description: "إرجاع طلب #1045", date: "2023-06-08", reference: "RET-001", paymentMethod: "نقدي", status: "معالج" },
    { id: 6, type: "expense", amount: 2500, category: "مشتريات", description: "شراء مخزون", date: "2023-06-11", reference: "EXP-003", paymentMethod: "نقدي", status: "مكتمل" },
    { id: 7, type: "withdrawal", amount: 10000, category: "سحب مالك", description: "سحب نقدي", date: "2023-06-14", reference: "WTH-001", paymentMethod: "نقدي", status: "مكتمل" },
    { id: 8, type: "revenue", amount: 12000, category: "مبيعات جملة", description: "مبيعات للموزعين", date: "2023-06-13", reference: "REV-003", paymentMethod: "تحويل بنكي", status: "مكتمل" },
  ];

  // Statistics
  const totalRevenue = transactions.filter(t => t.type === "revenue").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const totalReturns = transactions.filter(t => t.type === "return").reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = transactions.filter(t => t.type === "withdrawal").reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalRevenue - totalExpenses - totalReturns - totalWithdrawals;

  // Filter transactions by type
  const filteredTransactions = transactions.filter(t => t.type === activeTab);

  // Reset form
  const resetForm = () => {
    setFormAmount("");
    setFormCategory("");
    setFormDescription("");
    setFormDate("");
    setFormReference("");
    setFormPaymentMethod("");
  };

  // Handle add transaction
  const handleAddTransaction = () => {
    setFormType(activeTab);
    resetForm();
    setIsAddDialogOpen(true);
  };

  // Handle edit transaction
  const handleEditTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setFormType(transaction.type);
    setFormAmount(transaction.amount.toString());
    setFormCategory(transaction.category);
    setFormDescription(transaction.description);
    setFormDate(transaction.date);
    setFormReference(transaction.reference || "");
    setFormPaymentMethod(transaction.paymentMethod || "");
    setIsEditDialogOpen(true);
  };

  // Handle delete transaction
  const handleDeleteTransaction = (transactionId: number) => {
    console.log("Deleting transaction:", transactionId);
    // Implement actual delete functionality
  };

  // Handle save transaction
  const handleSaveTransaction = () => {
    console.log("Saving transaction:", {
      type: formType,
      amount: formAmount,
      category: formCategory,
      description: formDescription,
      date: formDate,
      reference: formReference,
      paymentMethod: formPaymentMethod
    });
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    resetForm();
  };

  // Get transaction icon
  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case "revenue":
        return <ArrowUpCircle className="h-4 w-4 text-green-500" />;
      case "expense":
        return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
      case "return":
        return <RotateCcw className="h-4 w-4 text-yellow-500" />;
      case "withdrawal":
        return <Wallet className="h-4 w-4 text-blue-500" />;
    }
  };

  // Get transaction color
  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case "revenue":
        return "text-green-600";
      case "expense":
        return "text-red-600";
      case "return":
        return "text-yellow-600";
      case "withdrawal":
        return "text-blue-600";
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalRevenue')}</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalRevenue.toLocaleString()} {t('currency')}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {transactions.filter(t => t.type === "revenue").length} {t('transactions')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalExpenses')}</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalExpenses.toLocaleString()} {t('currency')}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {transactions.filter(t => t.type === "expense").length} {t('transactions')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalReturns')}</CardTitle>
            <RotateCcw className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{totalReturns.toLocaleString()} {t('currency')}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {transactions.filter(t => t.type === "return").length} {t('transactions')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalWithdrawals')}</CardTitle>
            <Wallet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalWithdrawals.toLocaleString()} {t('currency')}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {transactions.filter(t => t.type === "withdrawal").length} {t('transactions')}
            </p>
          </CardContent>
        </Card>

        <Card className={netProfit >= 0 ? "border-green-200" : "border-red-200"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('netProfit')}</CardTitle>
            {netProfit >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {netProfit.toLocaleString()} {t('currency')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('afterDeductions')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">{t('transactionsList')}</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{tCommon('export')}</span>
            </Button>
            <Button className="flex items-center gap-1" onClick={handleAddTransaction}>
              <Plus className="h-4 w-4" />
              <span>{t('addTransaction')}</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="revenue" value={activeTab} onValueChange={(value) => setActiveTab(value as TransactionType)}>
            <TabsList className="grid grid-cols-4 w-full h-auto p-1 mb-6">
              <TabsTrigger value="revenue" className="py-2">
                <div className="flex items-center gap-2">
                  <ArrowUpCircle className="h-4 w-4" />
                  <span>{t('revenues')}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="expense" className="py-2">
                <div className="flex items-center gap-2">
                  <ArrowDownCircle className="h-4 w-4" />
                  <span>{t('expenses')}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="return" className="py-2">
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>{t('returns')}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="withdrawal" className="py-2">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  <span>{t('withdrawals')}</span>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Input 
                  placeholder={tCommon('search')}
                  className="max-w-sm" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline">
                  <Search className="h-4 w-4 ml-2" />
                  <span>{tCommon('search')}</span>
                </Button>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Input 
                  type="date" 
                  className="w-auto" 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
                <Button variant="outline">
                  <Filter className="h-4 w-4 ml-2" />
                  <span>{tCommon('filter')}</span>
                </Button>
              </div>
            </div>

            {/* Transactions Table */}
            <TabsContent value={activeTab} className="mt-0">
              <div className="rounded-md border overflow-hidden">
                <Table style={locale === 'en' ? { direction: 'ltr', textAlignLast: 'left' } : { direction: 'rtl', textAlignLast: 'right' }}>
                  <TableHeader>
                    <TableRow>
                      <TableHead >{t('date')}</TableHead>
                      <TableHead>{t('reference')}</TableHead>
                      <TableHead>{t('category')}</TableHead>
                      <TableHead>{tCommon('description')}</TableHead>
                      <TableHead>{t('paymentMethod')}</TableHead>
                      <TableHead>{t('amount')}</TableHead>
                      <TableHead>{tCommon('status')}</TableHead>
                      <TableHead className="text-left">{tCommon('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                          {t('noTransactions')}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell className="font-medium">{transaction.reference}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTransactionIcon(transaction.type)}
                              {transaction.category}
                            </div>
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.paymentMethod === 'نقدي' ? t('cash') : transaction.paymentMethod === 'بطاقة' ? t('card') : transaction.paymentMethod === 'تحويل بنكي' ? t('bankTransfer') : transaction.paymentMethod === 'شيك' ? t('check') : transaction.paymentMethod}</TableCell>
                          <TableCell>
                            <span className={`font-bold ${getTransactionColor(transaction.type)}`}>
                              {transaction.amount.toLocaleString()} {t('currency')}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              {transaction.status === 'مكتمل' ? t('completed') : transaction.status === 'معالج' ? t('processing') : transaction.status === 'قيد الانتظار' ? t('pending') : transaction.status === 'ملغي' ? t('cancelled') : transaction.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEditTransaction(transaction)}
                              >
                                <FileEdit className="h-4 w-4 text-muted-foreground" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-destructive"
                                onClick={() => handleDeleteTransaction(transaction.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Transaction Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="font-tajawal sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('addTransaction')}</DialogTitle>
            <DialogDescription>
              {t('addTransactionDesc')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">{t('transactionType')}</Label>
                <Select value={formType} onValueChange={(value) => setFormType(value as TransactionType)}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">{t('revenue')}</SelectItem>
                    <SelectItem value="expense">{t('expense')}</SelectItem>
                    <SelectItem value="return">{t('return')}</SelectItem>
                    <SelectItem value="withdrawal">{t('withdrawal')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">{t('amount')}</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="0.00"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">{t('category')}</Label>
                <Input 
                  id="category" 
                  placeholder={t('category')}
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">{t('date')}</Label>
                <Input 
                  id="date" 
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reference">{t('reference')}</Label>
                <Input 
                  id="reference" 
                  placeholder={t('reference')}
                  value={formReference}
                  onChange={(e) => setFormReference(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment">{t('paymentMethod')}</Label>
                <Select value={formPaymentMethod} onValueChange={setFormPaymentMethod}>
                  <SelectTrigger id="payment">
                    <SelectValue placeholder={t('selectPayment')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">{t('cash')}</SelectItem>
                    <SelectItem value="card">{t('card')}</SelectItem>
                    <SelectItem value="bank">{t('bankTransfer')}</SelectItem>
                    <SelectItem value="check">{t('check')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{tCommon('description')}</Label>
              <Textarea 
                id="description" 
                placeholder={tCommon('description')}
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {tCommon('cancel')}
            </Button>
            <Button onClick={handleSaveTransaction}>
              {tCommon('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Transaction Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="font-tajawal sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('editTransaction')}</DialogTitle>
            <DialogDescription>
              {t('editTransactionDesc')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-type">{t('transactionType')}</Label>
                <Select value={formType} onValueChange={(value) => setFormType(value as TransactionType)} disabled>
                  <SelectTrigger id="edit-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">{t('revenue')}</SelectItem>
                    <SelectItem value="expense">{t('expense')}</SelectItem>
                    <SelectItem value="return">{t('return')}</SelectItem>
                    <SelectItem value="withdrawal">{t('withdrawal')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-amount">{t('amount')}</Label>
                <Input 
                  id="edit-amount" 
                  type="number" 
                  placeholder="0.00"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category">{t('category')}</Label>
                <Input 
                  id="edit-category" 
                  placeholder={t('category')}
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-date">{t('date')}</Label>
                <Input 
                  id="edit-date" 
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-reference">{t('reference')}</Label>
                <Input 
                  id="edit-reference" 
                  placeholder={t('reference')}
                  value={formReference}
                  onChange={(e) => setFormReference(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-payment">{t('paymentMethod')}</Label>
                <Select value={formPaymentMethod} onValueChange={setFormPaymentMethod}>
                  <SelectTrigger id="edit-payment">
                    <SelectValue placeholder={t('selectPayment')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">{t('cash')}</SelectItem>
                    <SelectItem value="card">{t('card')}</SelectItem>
                    <SelectItem value="bank">{t('bankTransfer')}</SelectItem>
                    <SelectItem value="check">{t('check')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">{tCommon('description')}</Label>
              <Textarea 
                id="edit-description" 
                placeholder={tCommon('description')}
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {tCommon('cancel')}
            </Button>
            <Button onClick={handleSaveTransaction}>
              {tCommon('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
