export interface ArticleSection {
  heading: string;
  body: string[];
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  bullets: string[];
  sections: ArticleSection[];
}

export const articlesData: Article[] = [
  {
    slug: 'beijing-first-time-guide',
    title: 'คู่มือเที่ยวปักกิ่งฉบับมือใหม่: เช็กลิสต์สถานที่ห้ามพลาด & เมนูดัง',
    category: 'คู่มือท่องเที่ยว',
    author: 'ทีมงาน CHINA PRIME',
    publishedAt: '12 ก.พ. 2025',
    readTime: 'อ่าน 5 นาที',
    coverImage: '/images/beijing-forbidden-city.jpg',
    excerpt: 'วางแผนเที่ยวปักกิ่งครั้งแรกให้ราบรื่น ทั้งการเดินทาง พระราชวังต้องห้าม กู้กง กำแพงเมืองจีน มู่เถียนยวี่ และชิมเป็ดปักกิ่งต้นตำรับ',
    bullets: [
      'ควรจองตั๋วกู้กงล่วงหน้าอย่างน้อย 7 วัน',
      'กำแพงเมืองจีนด่านมู่เถียนยวี่ คนน้อยกว่าและมีนั่งกระเช้า',
      'การเดินทางในปักกิ่งใช้รถไฟใต้ดินสะดวกที่สุด'
    ],
    sections: [
      {
        heading: '1. เที่ยวปักกิ่งฤดูไหนดีที่สุด?',
        body: [
          'ฤดูใบไม้ร่วง (กันยายน - พฤศจิกายน) เป็นช่วงเวลาที่ดีที่สุดสำหรับการท่องเที่ยวปักกิ่ง เนื่องจากอากาศเย็นสบาย อุณหภูมิประมาณ 15-22 องศาเซลเซียส ใบไม้เริ่มเปลี่ยนเป็นสีเหลืองทอง และท้องฟ้าสดใส'
        ]
      },
      {
        heading: '2. ไฮไลท์แลนด์มาร์กมรดกโลก',
        body: [
          'พระราชวังต้องห้าม (กู้กง) ศูนย์กลางอำนาจจักรพรรดิจีน 24 พระองค์, กำแพงเมืองจีน ด่านมู่เถียนยวี่ ที่มีทิวทัศน์งดงาม และหอเทียนถัน สถานที่ประกอบพิธีบวงสรวงสรวงสวรรค์'
        ]
      }
    ]
  },
  {
    slug: 'shanghai-disneyland-tips',
    title: 'คู่มือตะลุย Shanghai Disneyland: เทคนิคเก็บเครื่องเล่นฮิตแบบไม่รอคิวนาน',
    category: 'เทคนิคเดินทาง',
    author: 'ทีมงาน CHINA PRIME',
    publishedAt: '28 ม.ค. 2025',
    readTime: 'อ่าน 4 นาที',
    coverImage: '/images/shanghai-skyline.jpg',
    excerpt: 'แจกแพลนเที่ยวดิสนีย์แลนด์เซี่ยงไฮ้ โซนใหม่ Zootopia พร้อมวิธีใช้แอปพลิเคชันจองคิวออนไลน์',
    bullets: [
      'ดาวน์โหลดแอป Shanghai Disney Resort ก่อนวันเดินทาง',
      'เข้าสวนสนุกตั้งแต่ช่วงเปิดประตู 08:30 น.',
      'ห้ามพลาดโซน Zootopia และเครื่องเล่น TRON Lightcycle Power Run'
    ],
    sections: [
      {
        heading: 'เตรียมตัวก่อนเข้าสวนสนุก',
        body: [
          'แนะนำให้ซื้อตั๋วล่วงหน้าและเชื่อมโยงตั๋วเข้ากับแอปพลิเคชัน Shanghai Disney เพื่อกด Standby Pass และ Disney Premier Access สำหรับเครื่องเล่นยอดนิยม'
        ]
      }
    ]
  }
];
