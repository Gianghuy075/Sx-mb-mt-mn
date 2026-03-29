/**
 * Province Schedules for MT (Miền Trung) and MN (Miền Nam)
 * Each region draws on specific provinces based on day of week
 * Ported from original app.js lines 105-123
 */

type DaySchedule = {
  [key: number]: string[];  // Day of week (0=Sunday) → provinces
};

/**
 * Miền Trung (Central Vietnam) Schedule
 */
export const MT_SCHEDULE: DaySchedule = {
  0: ['Khánh Hoà', 'Đà Nẵng'],                    // Sunday
  1: ['Thừa Thiên Huế', 'Phú Yên'],               // Monday
  2: ['Đắk Lắk', 'Quảng Nam'],                    // Tuesday
  3: ['Đà Nẵng', 'Khánh Hoà'],                    // Wednesday
  4: ['Bình Định', 'Quảng Trị', 'Quảng Bình'],    // Thursday
  5: ['Gia Lai', 'Ninh Thuận'],                   // Friday
  6: ['Đà Nẵng', 'Quảng Ngãi', 'Đắk Nông'],       // Saturday
};

/**
 * Miền Nam (South Vietnam) Schedule
 */
export const MN_SCHEDULE: DaySchedule = {
  0: ['Tiền Giang', 'Kiên Giang', 'Đà Lạt'],                   // Sunday
  1: ['TP.HCM', 'Đồng Tháp', 'Cần Thơ'],                       // Monday
  2: ['Bến Tre', 'Vũng Tàu', 'Bạc Liêu'],                      // Tuesday
  3: ['TP.HCM', 'Đồng Nai', 'An Giang', 'Bình Thuận'],         // Wednesday
  4: ['Cần Thơ', 'Sóc Trăng', 'Tây Ninh'],                     // Thursday
  5: ['TP.HCM', 'Vĩnh Long', 'Bình Dương', 'Trà Vinh'],        // Friday
  6: ['TP.HCM', 'Long An', 'Bình Phước', 'Hậu Giang'],         // Saturday
};

/**
 * Get provinces for a specific region and date
 */
export function getProvincesForDate(region: 'mt' | 'mn', dateStr: string): string[] {
  const dow = new Date(dateStr).getDay();

  if (region === 'mt') {
    return MT_SCHEDULE[dow] || ['Khánh Hoà'];
  } else {
    return MN_SCHEDULE[dow] || ['TP.HCM'];
  }
}
