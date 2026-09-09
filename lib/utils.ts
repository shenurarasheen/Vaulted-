import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateActualPrice = (basePrice: number, discountType: string, discountValue: number): number => {
  if (discountType === "percentage") {
    return basePrice - (basePrice * (discountValue / 100));
  }
  if (discountType === "fixed") {
    return basePrice - discountValue;
  }
  if (discountType === "none") {
    return basePrice;
  }
  return basePrice;
}
