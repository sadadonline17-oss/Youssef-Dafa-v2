// Types for Payment Components

import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export interface PaymentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export interface PaymentCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  noPadding?: boolean;
}

export interface PaymentFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'flat';
}

export interface ProgressStep {
  id: string;
  label: string;
  description?: string;
}

export interface PaymentProgressProps {
  steps: ProgressStep[];
  currentStepIndex: number;
  className?: string;
}

export interface PaymentHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  className?: string;
  logoPosition?: 'left' | 'center' | 'right';
}
