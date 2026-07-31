export interface SelectorOption {
  value: string;
  label: string;
}

export const DESTINATION_OPTIONS: SelectorOption[] = [
  { value: 'all', label: 'ทุกจุดหมายปลายทาง' },
  { value: 'ปักกิ่ง', label: 'ปักกิ่ง (Beijing)' },
  { value: 'เซี่ยงไฮ้', label: 'เซี่ยงไฮ้ (Shanghai)' },
  { value: 'จางเจียเจี้ย', label: 'จางเจียเจี้ย (Zhangjiajie)' },
  { value: 'เฉิงตู', label: 'เฉิงตู (Chengdu)' },
  { value: 'ซีอาน', label: 'ซีอาน (Xi\'an)' },
  { value: 'กุ้ยหลิน', label: 'กุ้ยหลิน (Guilin)' },
];

export const TRAVEL_MONTH_OPTIONS: SelectorOption[] = [
  { value: 'all', label: 'ทุกช่วงเดือน' },
  { value: 'ก.พ. 2568', label: 'กุมภาพันธ์ 2568' },
  { value: 'มี.ค. 2568', label: 'มีนาคม 2568' },
  { value: 'เม.ย. 2568', label: 'เมษายน 2568 (สงกรานต์)' },
  { value: 'พ.ค. 2568', label: 'พฤษภาคม 2568' },
  { value: 'มิ.ย. 2568', label: 'มิถุนายน 2568' },
];

export const PASSENGER_OPTIONS: SelectorOption[] = [
  { value: '1', label: '1 ท่าน' },
  { value: '2', label: '2 ท่าน (ยอดนิยม)' },
  { value: '3-4', label: '3-4 ท่าน (ครอบครัว)' },
  { value: '5+', label: '5 ท่านขึ้นไป (กรุ๊ปส่วนตัว)' },
];
