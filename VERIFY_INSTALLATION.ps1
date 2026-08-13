# ✅ سكريبت التحقق من تثبيت ميزة المخازن
# Warehouse Feature Installation Verification Script

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "   التحقق من ميزة إدارة المخازن" -ForegroundColor Cyan
Write-Host "  Warehouse Feature Verification" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$totalFiles = 0
$foundFiles = 0
$missingFiles = @()

function Test-FileExists {
    param (
        [string]$Path,
        [string]$Description
    )
    
    $script:totalFiles++
    
    if (Test-Path $Path) {
        Write-Host "✅ $Description" -ForegroundColor Green
        $script:foundFiles++
        return $true
    } else {
        Write-Host "❌ $Description" -ForegroundColor Red
        $script:missingFiles += $Description
        return $false
    }
}

Write-Host "📁 التحقق من الملفات الأساسية..." -ForegroundColor Yellow
Write-Host ""

# صفحة المخازن
Test-FileExists "src\app\warehouses\page.tsx" "صفحة المخازن (Warehouses Page)"

# Context & Hooks
Test-FileExists "src\contexts\warehouse-context.tsx" "Warehouse Context"
Test-FileExists "src\hooks\use-current-warehouse.ts" "Warehouse Hooks"

# المكونات
Test-FileExists "src\components\warehouse-stats-card.tsx" "Warehouse Stats Card"
Test-FileExists "src\components\sidebar.tsx" "Sidebar (Updated)"

Write-Host ""
Write-Host "🌍 التحقق من ملفات الترجمة..." -ForegroundColor Yellow
Write-Host ""

# ملفات الترجمة العربية
Test-FileExists "src\i18n\messages\ar\warehouses.json" "ترجمة المخازن (عربي)"
Test-FileExists "src\i18n\messages\ar\nav.json" "ترجمة القوائم (عربي)"

# ملفات الترجمة الإنجليزية
Test-FileExists "src\i18n\messages\en\warehouses.json" "ترجمة المخازن (English)"
Test-FileExists "src\i18n\messages\en\nav.json" "ترجمة القوائم (English)"

# تكوين الترجمة
Test-FileExists "src\i18n\request.ts" "Translations Config"

Write-Host ""
Write-Host "🎨 التحقق من ملفات التصميم والتخطيط..." -ForegroundColor Yellow
Write-Host ""

Test-FileExists "src\app\globals.css" "Global Styles"
Test-FileExists "src\app\layout.tsx" "Layout (Updated)"

Write-Host ""
Write-Host "📚 التحقق من ملفات التوثيق..." -ForegroundColor Yellow
Write-Host ""

Test-FileExists "WAREHOUSES_SUMMARY.md" "ملخص الميزة"
Test-FileExists "WAREHOUSES_README.md" "README"
Test-FileExists "WAREHOUSES_FEATURE.md" "شرح تفصيلي"
Test-FileExists "WAREHOUSES_QUICK_START.md" "دليل البدء السريع"
Test-FileExists "WAREHOUSE_INTEGRATION_EXAMPLE.md" "أمثلة التكامل"
Test-FileExists "RUN_PROJECT.md" "تعليمات التشغيل"
Test-FileExists "WAREHOUSES_FILES_CHECKLIST.md" "قائمة الملفات"

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "         النتائج / Results" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$percentage = [math]::Round(($foundFiles / $totalFiles) * 100, 2)

Write-Host "إجمالي الملفات (Total Files): $totalFiles" -ForegroundColor White
Write-Host "الملفات الموجودة (Found): $foundFiles" -ForegroundColor Green
Write-Host "الملفات المفقودة (Missing): $($totalFiles - $foundFiles)" -ForegroundColor $(if ($foundFiles -eq $totalFiles) { "Green" } else { "Red" })
Write-Host "نسبة الاكتمال (Completion): $percentage%" -ForegroundColor $(if ($percentage -eq 100) { "Green" } else { "Yellow" })
Write-Host ""

if ($foundFiles -eq $totalFiles) {
    Write-Host "🎉 جميع الملفات موجودة! الميزة جاهزة للاستخدام" -ForegroundColor Green
    Write-Host "🎉 All files present! Feature is ready to use" -ForegroundColor Green
    Write-Host ""
    Write-Host "▶️  لتشغيل المشروع (To run the project):" -ForegroundColor Cyan
    Write-Host "   npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "🌐 ثم افتح (Then open):" -ForegroundColor Cyan
    Write-Host "   http://localhost:3000/warehouses" -ForegroundColor White
} else {
    Write-Host "⚠️  بعض الملفات مفقودة!" -ForegroundColor Yellow
    Write-Host "⚠️  Some files are missing!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "الملفات المفقودة (Missing files):" -ForegroundColor Red
    foreach ($file in $missingFiles) {
        Write-Host "  - $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# فحص المكتبات المطلوبة
Write-Host "📦 فحص المكتبات المطلوبة..." -ForegroundColor Yellow
Write-Host ""

if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    
    $requiredPackages = @(
        "next-intl",
        "lucide-react",
        "@radix-ui/react-select",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu"
    )
    
    $allInstalled = $true
    foreach ($package in $requiredPackages) {
        if ($packageJson.dependencies.$package) {
            Write-Host "✅ $package: $($packageJson.dependencies.$package)" -ForegroundColor Green
        } else {
            Write-Host "❌ $package: Not installed" -ForegroundColor Red
            $allInstalled = $false
        }
    }
    
    Write-Host ""
    if ($allInstalled) {
        Write-Host "✅ جميع المكتبات مثبتة!" -ForegroundColor Green
        Write-Host "✅ All required packages installed!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  بعض المكتبات مفقودة. قم بتشغيل:" -ForegroundColor Yellow
        Write-Host "⚠️  Some packages missing. Run:" -ForegroundColor Yellow
        Write-Host "   npm install" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "✅ انتهى الفحص / Verification Complete" -ForegroundColor Cyan
Write-Host ""
