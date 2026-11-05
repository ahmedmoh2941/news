# AI HUB

منصة عربية لمتابعة أخبار الذكاء الاصطناعي والنماذج والأدوات والأبحاث.

## التقنية
- Next.js App Router + TypeScript
- Supabase (PostgreSQL + Row Level Security)
- Vercel deployment

## الإعداد
1. انسخ `.env.example` إلى `.env.local`.
2. أضف `NEXT_PUBLIC_SUPABASE_URL` و`NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. نفّذ `npm install` ثم `npm run dev`.

## قاعدة البيانات
تم إنشاء جداول `articles` و`sources` و`saved_articles` في Supabase. خدمة جمع الأخبار والتلخيص العربي والجدولة اليومية ما زالت تحتاج إلى إعداد منفصل قبل نشر أخبار فعلية.
