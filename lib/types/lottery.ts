/**
 * Type definitions for Vietnamese Lottery system
 */

export type Region = 'mb' | 'mt' | 'mn';

export type PrizeClass =
  | 'special'
  | 'first'
  | 'second'
  | 'third'
  | 'fourth'
  | 'fifth'
  | 'sixth'
  | 'seventh'
  | 'eighth';

export interface Prize {
  label: string;           // "Giải đặc biệt", "Giải nhất", etc.
  numbers: string[];       // ["184384"], ["83137"], etc.
  cls: PrizeClass;         // CSS class for styling
}

export interface Province {
  name: string;            // "Hà Nội", "TP.HCM", "Khánh Hoà"
  prizes: Prize[];
}

export interface LotteryDataMB {
  region: 'mb';
  date: string;            // "2026-03-28"
  provinces: [string];     // ["Hà Nội"] - always single province for MB
  prizes: Prize[];         // 8 prizes (special → seventh)
}

export interface LotteryDataMulti {
  region: 'mt' | 'mn';
  date: string;
  provinces: Province[];   // Multiple provinces with 9 prizes each
}

export type LotteryData = LotteryDataMB | LotteryDataMulti;

// Type guards
export function isMB(data: LotteryData): data is LotteryDataMB {
  return data.region === 'mb';
}

export function isMT(data: LotteryData): data is LotteryDataMulti {
  return data.region === 'mt';
}

export function isMN(data: LotteryData): data is LotteryDataMulti {
  return data.region === 'mn';
}

// API Response Types (from xsapi.vn)
export interface XSApiResponseMB {
  data: {
    tinh: string;
    dacbiet: string;
    nhat: string;
    nhi: string[];
    ba: string[];
    bon: string[];
    nam: string[];
    sau: string[];
    bay: string[];
  };
}

export interface XSApiProvinceData {
  tinh: string;
  tam: string;
  bay: string;
  sau: string[];
  nam: string;
  bon: string[];
  ba: string[];
  nhi: string;
  nhat: string;
  dacbiet: string;
}

export interface XSApiResponseMulti {
  data: XSApiProvinceData[];
}
