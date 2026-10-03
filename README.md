# Maram Ahmed Portfolio (React + Vite)

## التشغيل على جهازك
```
npm install
npm run dev      # يفتح على http://localhost:5173
```

## أعدّل فين؟
| عاوزة أغيّر | الملف |
|---|---|
| اسمي، الإيميل، اللينكات، نبذة عني | `src/data/profile.js` |
| صورتي | حطي الصورة في `public/images/profile.jpg` |
| الخبرات والتعليم | `src/data/experience.js` |
| المهارات (كل مجموعة = تاب) | `src/data/skills.js` |
| المشاريع | `src/data/projects.js` |
| الخدمات | `src/data/services.js` |
| الألوان والخطوط | أول الملف `src/styles/global.css` (المتغيرات في `:root`) |
| شكل صفحة معينة | `src/pages/` (صفحة = ملف) |

لإضافة مشروع: انسخي أي block في `projects.js` وغيّري القيم. مفيش حاجة تانية تتلمس.

## النشر على Vercel
1. ارفعي المشروع على GitHub (`git init`, `git add .`, `git commit`, `git push`).
2. من vercel.com: Add New > Project > اختاري الريبو.
3. Vercel هيتعرف على Vite لوحده (Build: `npm run build`, Output: `dist`). اضغطي Deploy.
4. أي push بعد كده بيتنشر تلقائي. ملف `vercel.json` موجود عشان الصفحات تشتغل مع refresh.
