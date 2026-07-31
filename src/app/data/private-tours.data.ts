export interface PrivateTourHighlight {
  title: string;
  description: string;
}

export interface PrivatePackage {
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  highlights: string[];
  image: string;
  price: string;
}

export interface PrivateToursContent {
  title: string;
  subtitle: string;
  heroImage: string;
  features: string[];
  packages: PrivatePackage[];
}

export const privateToursData: PrivateToursContent = {
  title: 'ทัวร์ส่วนตัวระดับพรีเมียม (Private Custom Tours)',
  subtitle: 'วางแผนและกำหนดการเดินทางตามใจคุณ บริการรถตู้ VIP ส่วนตัว ไกด์ผู้เชี่ยวชาญภาษาไทยตลอดทริป',
  heroImage: '/images/hero-china-prime.jpg',
  features: [
    'อิสระเลือกวันเดินทางและเที่ยวแบบส่วนตัว',
    'เลือกระดับโรงแรม 4-5 ดาวตามงบประมาณ',
    'ไม่มีบังคับเข้าร้านรัฐบาล ทานอาหารเลิศรส',
    'ยืดหยุ่นปรับเปลี่ยนโปรแกรมได้ตลอดเวลา'
  ],
  packages: [
    {
      slug: 'beijing-private-vip',
      title: 'ทัวร์ส่วนตัวปักกิ่ง เจาะลึกมรดกโลก 5 วัน 4 คืน',
      tagline: 'มรดกโลกปักกิ่ง VIP',
      overview: 'สัมผัสความยิ่งใหญ่ของพระราชวังต้องห้าม กู้กง กำแพงเมืองจีนด่านมู่เถียนยวี่ พักโรงแรม 5 ดาวใจกลางเมือง ทานเป็ดปักกิ่งต้นตำรับ',
      highlights: ['พระราชวังต้องห้าม กู้กง', 'กำแพงเมืองจีนด่านมู่เถียนยวี่ (ขึ้นกระเช้า)', 'เป็ดปักกิ่งภัตตาคารใหญ่', 'รถ VIP และไกด์ส่วนตัว'],
      image: '/images/beijing-forbidden-city.jpg',
      price: 'เริ่มต้น 32,900.- / ท่าน'
    },
    {
      slug: 'shanghai-private-luxury',
      title: 'ทัวร์ส่วนตัวเซี่ยงไฮ้ ดิสนีย์แลนด์ อู๋เจิ้น 4 วัน 3 คืน',
      tagline: 'มหานครเซี่ยงไฮ้ & เมืองโบราณ',
      overview: 'เที่ยวเซี่ยงไฮ้สไตล์ลักชัวรี ล่องเรือเมืองโบราณอู๋เจิ้น ช้อปปิ้งย่านซินเทียนตี้ เดอะบันด์ พร้อมบริการรถรับส่งสวนสนุกดิสนีย์แลนด์',
      highlights: ['Shanghai Disneyland', 'เมืองโบราณสายน้ำอู๋เจิ้น', 'วิวหอไข่มุกเดอะบันด์', 'เสี่ยวหลงเปาภัตตาคารดัง'],
      image: '/images/shanghai-skyline.jpg',
      price: 'เริ่มต้น 27,900.- / ท่าน'
    },
    {
      slug: 'zhangjiajie-private-nature',
      title: 'ทัวร์ส่วนตัวจางเจียเจี้ย เขาอวตาร เทียนเหมินซาน 5 วัน 4 คืน',
      tagline: 'ธรรมชาติขุนเขาตระการตา',
      overview: 'ตะลุยหุบเขาอวตาร ขึ้นลิฟต์แก้วไป่หลง นั่งกระเช้าเทียนเหมินซาน และชมเมืองโบราณฟู่หรงเจิ้นกลางน้ำตกอลังการ',
      highlights: ['ลิฟต์แก้วไป่หลง', 'เขาเทียนเหมินซาน & ระเบียงแก้ว', 'เมืองโบราณฟู่หรงเจิ้น', 'สุกี้เห็ดพื้นเมือง'],
      image: '/images/zhangjiajie-mountains.jpg',
      price: 'เริ่มต้น 29,900.- / ท่าน'
    }
  ]
};
