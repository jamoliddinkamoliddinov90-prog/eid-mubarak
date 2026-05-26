/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Student, ClassMemory } from './types';

export const STUDENTS_DATA: Student[] = [
  {
    id: 1,
    name: "Jamoliddin",
    role: "The Visionary Programmer (MJ)",
    wish: "Qurbon Hayiti muborak bo'lsin, qadrli sinfdoshlarim!",
    detailedWish: "Ilm, ijod va texnologiya yo'lida doim baland parvoz qiling. Ushbu muborak Qurbon Hayiti xonadoningizga tinchlik-omonlik va cheksiz baxt keltirsin. Do'stligimiz zanjiri hech qachon uzilmasin, doimo birga, eng yorqin cho'qqilarni zabt etaylik!",
    friendshipMemory: "Eslaysizlarmi, rus tilida men Michael Jackson - Billie Jean musiqasiga o'ynab bergandim",
    avatarColor: "#eab308", // Golden
    position: { x: -280, y: 150, z: -100 }
  },
  {
    id: 2,
    name: "Kumush",
    role: "Insta Star",
    wish: "Hayit ayyomi barchamizga quvonch va tinchlik keltirsin!",
    detailedWish: "Sinfimizning har bir a'zosi men uchun nihoyatda qadrli. Sizlarga hamisha porloq kelajak, ezgulik va ko'zlaringizda doimiy baxt porlashini tilayman. O'qishlarimiz va kelgusi orzularimiz aslo so'nmasin!",
    friendshipMemory: "Boshida sinf sardori bo'lib hammangizni nazorat qilmoqchi edim",
    avatarColor: "#22c55e", // Emerald
    position: { x: 280, y: 150, z: -100 }
  },
  {
    id: 3,
    name: "Muhammadsolih",
    role: "The Sports Champion",
    wish: "Yurtimiz tinch, Hayit bayramimiz dildan o'tsin do'stlar!",
    detailedWish: "Sog'lik, baxt va kuch-qudrat sizlarni hech qachon tark etmasin. Hayot deb atalmish bu ulkan maydonda hamisha chempion bo'ling. Hamisha bir-birimizni qo'llab-quvvatlashda davom etaylik!",
    friendshipMemory: "Sportzalda o'tkazgan darslarimiz va futbol o'yinlaridagi hayajonli lahzalar, qozongan shirin g'alabalarimiz umrbod xotiramda muhrlangan.",
    avatarColor: "#06b6d4", // Neon blue
    position: { x: -300, y: -100, z: 50 }
  },
  {
    id: 4,
    name: "Komila",
    role: "Volleyball Master",
    wish: "Qalbingiz quvonchga, hayotingiz go'zallikka to'lsin!",
    detailedWish: "Hayotingiz xuddi yorqin polotno kabi rang-barang, har bir kuningiz ijodiy muvaffaqiyatlar va go'zal lahzalar bilan bezatilgan bo'lsin. Qurbon Hayiti sizlarga xushkayfiyat va xotirjamlik olib kelsin!",
    friendshipMemory: "Deyarli hamma urga 'padacha'laring qiyshiq borardi",
    avatarColor: "#ec4899", // Pink
    position: { x: 300, y: -100, z: 50 }
  },
  {
    id: 5,
    name: "Sobirjon",
    role: "IELTS 4",
    wish: "Har bir niyat qilgan ezgu amalingiz qabul bo'lsin!",
    detailedWish: "Hayotingiz mazmunli va hikmatli o'tsin. Ushbu muqaddas bayram munosabati bilan barchangizga iymon nuri, qalb xotirjamligi va tinimsiz ruhan o'sish tilayman. Doimo teran fikrlaylik va oldinga qarab yuramiz.",
    friendshipMemory: "Ingliz tilida 1 ta guruh bo'lib, raqiblarimizni yer tishlatganmiz!",
    avatarColor: "#a855f7", // Purple
    position: { x: -100, y: 250, z: -200 }
  },
  {
    id: 6,
    name: "Sevinch",
    role: "The Math Genius",
    wish: "Kelajak tenglamangiz doimo muvaffaqiyat bilan yechilsin!",
    detailedWish: "Hayotda sizga eng to'g'ri formulalarni topishda va eng murakkab masalalarni osonlik bilan yechishda omad tilayman. Hayit sizning xonadoningizga baraka va ulkan farovonlik eshiklarini ochsin!",
    friendshipMemory: "Spelling Bee musobaqasida 3-o'rin olganimiz uchun yig'laganing esingdami!",
    avatarColor: "#3b82f6", // Blue
    position: { x: 100, y: 250, z: -200 }
  },
  {
    id: 7,
    name: "Fazliddin",
    role: "The Witty Dreamer",
    wish: "Kulgulardan iborat quvnoq bayram va uzoq umr!",
    detailedWish: "Sizlarga hech qachon tushkunlikka tushmaslikni va doimo hayotga tabassum bilan boqishingizni tilayman. Har bir orzuyingiz hayishingizning go'zal mo'jizasiga aylansin. Qurbon Hayitida omad yor bo'lsin!",
    friendshipMemory: "Orqa partada o'tirib aytgan jinniliklarim va hazillarimga hammangiz chin dildan kulganingiz, har qanday zerikarli darsni ham bayramga aylantirib yuborardi.",
    avatarColor: "#f97316", // Orange
    position: { x: -150, y: -250, z: -50 }
  },
  {
    id: 8,
    name: "Muxlisa",
    role: "The Latest Classmate",
    wish: "Mehr-oqibatimiz aslo yo'qolmasin, Hayit muborak!",
    detailedWish: "Hamisha atrofdagilarga nur ulashuvchi qalbingiz aslo so'nmasin. Sizlarga ezgulik, bebaholik va samimiylik yo'ldosh bo'lishini so'rayman. Bayram barcha ezgu hislarimizni yanada mustahkamlasin!",
    friendshipMemory: "",
    avatarColor: "#14b8a6", // Teal
    position: { x: 150, y: -250, z: -50 }
  },
  {
    id: 9,
    name: "Abdulaziz",
    role: "The Science",
    wish: "Hayotingiz chiroyli ohanglarga va quvonchga boy bo'lsin!",
    detailedWish: "Yuragingizdagi orzular biror kun ohang kabi chiroyli ijro etilsin. Qurbon Hayiti oilangizga xos va mos tinchlik-totuvlik keltirsin. Do'stlar, qo'shiqlarimiz doim birga jaranglasin!",
    friendshipMemory: "Tadbirlarda gitara jo'rligida butun sinf bo'lib qo'shiq kuylaganimiz va ovozimiz butun maktabga yetib borgan hayajonli oqshomlar sira esdan chiqmaydi.",
    avatarColor: "#f43f5e", // Rose
    position: { x: -400, y: 0, z: -150 }
  },
  {
    id: 10,
    name: "Mubina",
    role: "The Bookworm & Poet",
    wish: "Yurakdagi dildosh so'zlarimiz hamisha yorug'lik ulashsin!",
    detailedWish: "Kitoblar dunyosidagi kabi sarguzashtlarga boy, shirin va baxtli ssenariy bilan hayotingiz davom etsin. Bayram munosabati bilan uyimizga baraka, qut-fayz va doimiy mustahkam iroda so'rayman.",
    friendshipMemory: "Kutubxonada soatlab birga dars tayyorlab, so'ngra qahva ichib orzularimiz va o'qigan ajoyib kitoblarimiz haqida bahslashgan baxtiyor kunlarimiz.",
    avatarColor: "#facc15", // Amber
    position: { x: 400, y: 0, z: -150 }
  },
  {
    id: 11,
    name: "Maqsudali",
    role: "White Man",
    wish: "Muvaffaqiyatlar sari baland va ishonchli odimlar tilayman!",
    detailedWish: "Oldingizga qo'ygan har qanday maqsadga yetishing. Hech qachon to'xtamang. Ushbu muqaddas Hayit bayrami sizga yangi kuch va yuksak energiya ato etsin. Biz buyuk ishlarga qodirmiz!",
    friendshipMemory: "Sinf loyihalari va jamoaviy ishlarda hammamizni boshqarib, doimo birinchi o'rinlarni zabt etishimizga sababchi bo'lgan o'sha qiziqarli jamoaviy yig'ilishlarimiz qaytmas lahzadir.",
    avatarColor: "#6366f1", // Indigo
    position: { x: -200, y: 100, z: 120 }
  },
  {
    id: 12,
    name: "Nozima",
    role: "Komila's best friend",
    wish: "Sindirib bo'lmas g'ayrat va yorqin tabassum hamrohingiz bo'lsin!",
    detailedWish: "Har bir kunda faqat yaxshilikni ko'ra oling. Sizga tushkunlik begona bo'lsin. Muborak Qurbon Hayitida uyingiz quvonchga, yuzingiz kulguga to'lsin. Biz doimo birgamiz va baxtlimiz!",
    friendshipMemory: "Yomon baho olib xafa bo'lganimizda yoki kayfiyatimiz tushganda, mening gaplarimdan so'ng hamma kulib yuborib darmon topgan damlari eng samimiy holatimiz edi.",
    avatarColor: "#fb7185", // Rose-light
    position: { x: 200, y: 100, z: 120 }
  },
  {
    id: 13,
    name: "Jahongir",
    role: "The Singer",
    wish: "Kuylaringiz hamisha yoqimli bo'lsin! Bayrami muborak!",
    detailedWish: "Sizlarga baxt va doimiy intilish musiqa asbobida ishlashni orzu qilaman. Qurbon Hayitida ezgu tilaklarni ulashib, doimo ajoyib loyihalarni quramiz!",
    friendshipMemory: "Talant Show'da kuylagan musiqang Michael Jacksonda ham topilmagan!",
    avatarColor: "#10b981", // Emerald emerald
    position: { x: -50, y: -50, z: 200 }
  },
  {
    id: 14,
    name: "Begoyim",
    role: "Artist",
    wish: "Ezgulik va cheksiz jasorat qalbingizda muhrlansin!",
    detailedWish: "Sinfimizning har bir qizi va o'g'li mendan eng kuchli yordamni ola biladi. Qurbon Hayitida oilalaringizga sog'lik-salomatlik tilayman. Biz chin do'stlarmiz, ishonchingiz sira so'nmasin!",
    friendshipMemory: "Qiyin vaziyatlarda doimo sinfdoshlarim tarafida turib, ularni himoya qilganim va biror marta ham sinfimiz a'zolarini ranjitmaganim hayotimdagi eng faxrli amalimdir.",
    avatarColor: "#ef4444", // Red
    position: { x: 50, y: -50, z: 200 }
  },
  {
    id: 15,
    name: "Abbos",
    role: "King of CS",
    wish: "Hech qachon so'nmas yorqin alanga tilayman! Qutlug' bo'lsin!",
    detailedWish: "Sizlardagi olov kabi g'ayrat butun jahonni yoritsin. Bayram oilangizga baraka, salomatlik, tinchlik hamda abadiy quvonch hadya etsin. Biz kelajak qirollarimiz!",
    friendshipMemory: "Sinf kechalari va tug'ilgan kunlarda uyushtirgan g'aroyib raqslarimiz, diskotekalardagi jo'shqinlik butun o'smirlik davrimizga rang bag'ishlagan durlaridir.",
    avatarColor: "#f97316", // Tech orange
    position: { x: 100, y: -300, z: 80 }
  },
  {
    id: 16,
    name: "Shodiya",
    role: "Begoyim's best friend",
    wish: "Sindirib bo'lmas g'ayrat va yorqin tabassum hamrohingiz bo'lsin!",
    detailedWish: "Sinfdoshlarim orasidagi beg'ubor rishta hech qachon yo'qolmasin. Ushbu muqaddas Qurbon Hayiti kelgusi barcha say-harakatlarimizga va orzularimizga yorqin muvaffaqiyatlar olib kelsin!",
    friendshipMemory: "Begoyim bilan tanaffuslarda bir xil tushlik olib darslarimiz, sirlarimiz va kelajakdagi katta hayot orzulari haqida shirin suhbatlashgan kunlarimiz mutlaqo qimmatlidir.",
    avatarColor: "#ec4899", // Glamour pink
    position: { x: -100, y: -300, z: 80 }
  },
  {
    id: 17,
    name: "Tohir",
    role: "Football Player",
    wish: "G'ururing Maqsudaliga gol urganimdek kuchli bo'lsin! ",
    detailedWish: "Futbolda eng zo'ri bo'l, biz sen tarafdamiz! Qurbon hayiti oilangizga quvonch, dilingizga xotirjamlik keltirsin!",
    friendshipMemory: "Informatik fanidan CHSB imtihonida mendan ko'chirib, mendan baland ball olganingni doimo kulgi bilan eslayman!",
    avatarColor: "#06b6d4", // Neon cyan
    position: { x: -250, y: 150, z: 150 }
  },
  {
    id: 18,
    name: "Shoniyor",
    role: "Hazilkash",
    wish: "Boshqalarga mening hazillarim bilan xursandchilik ulash!",
    detailedWish: "Muborak Qurbon hayiti bayrami bilan barcha oila a'zolaringizni tabriklayman. Qalbingiz hamisha yayrasin!",
    friendshipMemory: "Sening o'sha g'aroyib kulgili hazillaringdan, dars paytida yig'ib qo'ygan zerikishlarimiz bir lahzada tarqab ketar va o'pkamiz yorilib ketguncha kular edik.",
    avatarColor: "#facc15", // Golden yellow
    position: { x: 250, y: 150, z: 150 }
  },
  {
    id: 19,
    name: "Asilbek",
    role: "The Wall in Football",
    wish: "Qalbing ochiq bo'lsin! Nafs balosidan asrasin!",
    detailedWish: "Senga toshdek mustahkam sabr, tinchlik, beg'ubor o'spirinlik quvnoqligi va iymon salomatligi tilayman. Qurbon hayiti muborak bo'lsin!",
    friendshipMemory: "Futbolda har safar raqiblar gollarini darvozamiz oldida devor kabi to'sib qaytarganingda, orqa chiziqdagi hotirjamligimiz qanchalar shirin edi!",
    avatarColor: "#14b8a6", // Emerald teal
    position: { x: -150, y: -150, z: 250 }
  },
  {
    id: 20,
    name: "Sanjarbek",
    role: "Adashgan shaxmatchi",
    wish: "Hanjardek o'tkir bo'l!",
    detailedWish: "Senga bir kun kelib, shaxmat taxtasida Jamoliddinni butunlay yutish baxti va nasibasi yetishini chin qalbimdan tilayman!",
    friendshipMemory: "Katta tanaffus payti senga qarshi darsliklar orasiga taxta solib, qaramasdan o'ynab g'olib bo'lganimni aslo esingdan chiqarma!",
    avatarColor: "#8b5cf6", // Electric purple
    position: { x: 150, y: -150, z: 250 }
  },
  {
    id: 21,
    name: "Ozodbek",
    role: "The ChessMan",
    wish: "Senga farzindek ko'p joyga qo'ling yetishini tilayman!",
    detailedWish: "Shaxmat san'ati yo'lida doim donishmand bo'ling. Bir kun kelib sinfdoshlaringizni, ayniqsa Jamoliddinni yutish omadi yo'ldosh bo'lsin!",
    friendshipMemory: "Senga qarshi shiddatli shaxmat o'yinida biz kutmaganda o'sha h4 yurishi bilan boshlab g'alaba qozonganing hamon qoniqarli xotiradir!",
    avatarColor: "#10b981", // Mint green
    position: { x: -75, y: 200, z: -100 }
  },
  {
    id: 22,
    name: "Davlatbek",
    role: "Minecraft Player",
    wish: "Steve'dek mardli bo'l!",
    detailedWish: "Eng katta hayotiy va virtual maqsadlaringga erishishingni tilab qolaman! Shaxsiy dunyolaringni eng go'zal bloklardan barpo et!",
    friendshipMemory: "Do'kondan olgan muzqaymog'ing yo'lakda yerga tushib sinib ketganida, xafa bo'lmasliging uchun darhol chopib borib yangisini olib bergan baxtli lahzamiz.",
    avatarColor: "#d946ef", // Neon fuchsia
    position: { x: 75, y: 200, z: -100 }
  },
];

export const CLASS_MEMORIES: ClassMemory[] = [
  {
    id: 1,
    title: "The Forest Picnic",
    description: "6.1 sinf tabiat qo'ynida va o'rmonlar quyoshida o'tkazgan eng shirin, unutilmas pikniklarimiz sadosi.",
    category: "friendship",
    glowingColor: "rgba(6, 182, 212, 0.8)", // neon blue
    orbitRadius: 180,
    orbitSpeed: 0.007,
    scale: 1.25
  },
  {
    id: 2,
    title: "Billie Jean Dance",
    description: "Rus tili darsida Jamoliddin (MJ) tomonidan ijro etilgan unutilmas Billie Jean raqs tomoshasi va barchaning jo'shqin kulgisi!",
    category: "school",
    glowingColor: "rgba(234, 179, 8, 0.85)", // gold
    orbitRadius: 260,
    orbitSpeed: -0.005,
    scale: 1.2
  },
  {
    id: 3,
    title: "Sports Battles",
    description: "Tohir va Asilbek himoya qilgan futbol g'alabalari, Komilaning padachalari va dars oralig'idagi shiddatli shaxmat bahslari.",
    category: "success",
    glowingColor: "rgba(16, 185, 129, 0.8)", // emerald green
    orbitRadius: 320,
    orbitSpeed: 0.004,
    scale: 1.15
  },
  {
    id: 4,
    title: "Sinf Kechalari",
    description: "Tug'ilgan kunlar va Yangi yil bayramlaridagi quvnoq davralar, Abbosning diskotekalardagi olovli raqslari.",
    category: "dream",
    glowingColor: "rgba(244, 63, 94, 0.8)", // rose pink
    orbitRadius: 390,
    orbitSpeed: -0.003,
    scale: 1.2
  }
];
