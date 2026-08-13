'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

function WavingHandIcon() {
  return (
    <div className="animate-wave flex items-center justify-center me-3">
      <span className="text-xl leading-none">👋</span>
    </div>
  );
}

function SparkleIcon() {
  return (
    <div className="animate-pulse flex items-center justify-center me-3">
      <span className="text-xl leading-none">✨</span>
    </div>
  );
}

export function WelcomeToast() {
  const t = useTranslations('welcome');

  useEffect(() => {
    const hasShownWelcome = sessionStorage.getItem('welcome-toast-shown');
    
    if (hasShownWelcome) {
      return;
    }

    // الإشعار الأول
    const welcomeTimer = setTimeout(() => {
      toast(t('welcomeTitle'), {
        description: t('welcomeDescription'),
        duration: 8000,
        icon: <WavingHandIcon />,
      });
    }, 800);

    // الإشعار الثاني (سيتكدس خلف الأول تلقائياً)
    const motivationTimer = setTimeout(() => {
      toast(t('motivationTitle'), {
        description: t('motivationDescription'),
        duration: 9000,
        icon: <SparkleIcon />,
      });
    }, 7400);

    sessionStorage.setItem('welcome-toast-shown', 'true');

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(motivationTimer);
    };
  }, [t]);

  return null;
}