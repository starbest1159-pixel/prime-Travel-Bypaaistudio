export const footerPolicyItems = [
  { label: 'นโยบายความเป็นส่วนตัว (Privacy Policy)', href: '/privacy-policy' },
  { label: 'ขั้นตอนการจองและชำระเงิน', href: '/booking-payment' },
  { label: 'เงื่อนไขการยกเลิกและการคืนเงิน', href: '/cancellation-refund' },
];

export const siteConfig = {
  brandName: 'CHINA PRIME',
  companyNameTh: 'บริษัท ไชน่าไพรม์ จำกัด',
  companyNameEn: 'China Prime Co., Ltd.',
  siteUrl: 'https://www.chinaprime.co.th',
  lineId: '@chinaprime',
  lineUrl: 'https://line.me/R/ti/p/@chinaprime',
  phoneDisplay: '02-123-4567',
  phoneHref: 'tel:021234567',
  email: 'contact@chinaprime.co.th',
  officeShort: 'อาคารสุขุมวิททาวเวอร์ ชั้น 12',
  officeLandmark: 'ใกล้ BTS อโศก / MRT สุขุมวิท',
  addressLines: [
    'อาคารสุขุมวิททาวเวอร์ ชั้น 12',
    'ถนนสุขุมวิท แขวงคลองเตยเหนือ',
    'เขตวัฒนา กรุงเทพฯ 10110',
  ],
  travelLicenseNumber: '11/09876',
  weekdayHoursShort: 'จ.-ศ. 08:30 - 17:30',
  weekdayHoursLong: 'จันทร์ - ศุกร์: 08:30 - 17:30 น.',
  weekendHoursLong: 'เสาร์ - อาทิตย์: 09:00 - 16:00 น.',
  footerCopyrightYear: '2026',
  heroBadgeText: 'ไม่เข้าร้านรัฐบาล 100%',
} as const;
