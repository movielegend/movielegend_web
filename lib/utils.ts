import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serializePrisma<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      if (typeof value === 'bigint') {
        return value.toString();
      }
      if (value && typeof value === 'object' && 's' in value && 'e' in value && 'd' in value) {
        return Number(value);
      }
      return value;
    })
  );
}
