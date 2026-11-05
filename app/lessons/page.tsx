"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BookOpen, Check, Copy, ExternalLink, Lightbulb, PlayCircle, Target, WandSparkles } from "lucide-react";
import "./lessons.css";

const prompts = [
  {
    label: "1. أساسي — تقرير أسبوعي",
    use: "لما تكون محتاج تحول نقاط سريعة إلى تقرير مفهوم ومنظم.",
    text: "حوّل النقاط التالية إلى تقرير أسبوعي منظم لأعمال الدعم الفني بالمدرسة. استخدم اللغة العربية الرسمية، ورتب الأعمال في نقاط واضحة، مع الحفاظ على جميع المهام وعدم حذف أي مهمة أو إضافة معلومات غير موجودة.\n\nالنقاط:\n[ضع المهام هنا]"
  },
  {
    label: "2. احترافي — تقرير إداري جاهز لـ Word",
    use: "لما تحتاج صياغة رسمية وتقسيمًا واضحًا مع الحفاظ على التفاصيل.",
    text: "تصرّف كمتخصص في إعداد التقارير الإدارية والدعم الفني بالمدارس. حوّل سجل الأعمال التالي إلى تقرير أسبوعي احترافي.\n\nالمطلوب:\n- تقسيم الأعمال حسب أيام الأسبوع.\n- استخدام صياغة إدارية واضحة ومختصرة.\n- تصنيف الأعمال المتشابهة عند الحاجة دون إسقاط التفاصيل.\n- تصحيح الأخطاء اللغوية دون تغيير المعنى.\n- الحفاظ على أسماء البرامج والأجهزة كما وردت.\n- عدم اختراع أي أعمال أو تفاصيل.\n\nأخرج التقرير بتنسيق جاهز للنسخ إلى Word.\n\nسجل الأعمال:\n[ضع المهام هنا]"
  },
  {
    label: "3. تحسين — راجع النتيجة",
    use: "بعد ما ChatGPT يطلع المسودة الأولى وتحتاج تحسينًا محددًا.",
    text: "راجع التقرير السابق وحسّن الصياغة الإدارية واللغة والتنسيق. لا تحذف أي معلومة، ولا تضف أي معلومة جديدة. اجعل العبارات مختصرة وواضحة، وتجنب تكرار نفس المعنى. اعرض النسخة النهائية فقط."
  },
  {
    label: "4. تدقيق — اكتشف الحذف والإضافات",
    use: "قبل اعتماد التقرير أو إرساله للتأكد أن كل نقطة أصلية موجودة.",
    text: "افحص التقرير السابق وقارنه بالنقاط الأصلية. أنشئ جدولًا يوضح: (1) المهام المنقولة بشكل صحيح، (2) المهام المحذوفة أو المختصرة بما أخل بالمعنى، (3) أي معلومة أضيفت دون وجودها في النص الأصلي. لا تعدّل التقرير قبل عرض نتائج المراجعة."
  }
];

const videos = [
  {
    title: "Introduction to Prompt Engineering",
    publisher: "OpenAI Academy",
    note: "مقدمة رسمية لتعلّم صياغة التعليمات وتحسين النتائج.",
    href: "https://academy.openai.com/public/videos/introduction-to-prompt-engineering-2025-02-13"
  },
  {
    title: "Advanced Prompt Engineering",
    publisher: "OpenAI Academy",
    note: "مستوى متقدم لتطوير الأوامر والتعامل مع المهام الأكثر تعقيدًا.",
    href: "https://academy.openai.com/public/videos/advanced-prompt-engineering-2025-02-13"
  }
];

export default function LessonsPage() {
  const [copied, setCopied] = useState(-1);
  const [choice, setChoice] = useState("عام");
  const [checked, setChecked] = useState(false);

  async function copyPrompt(value: string, index: number) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(index);
      window.setTimeout(() => setCopied(-1), 1600);
    } catch {
      setCopied(-1);
    }
  }

  return (
    <main className="lessons-page" dir="rtl">
      <header className="lessons-header">
        <Link href="/" className="lessons-back"><ArrowRight size={17}/> العودة إلى AI HUB</Link>
        <div className="lessons-kicker"><WandSparkles size={16}/> AI HUB • أكاديمية التطبيق</div>
        <div className="lessons-meta"><span>الدرس 01</span><span>5–10 دقائق</span><span>5 نوفمبر 2026</span></div>
        <h1>اكتب Prompt احترافيًا<br/><em>واحصل على نتيجة أدق</em></h1>
        <p>درس عملي يعلّمك كيف توجّه ChatGPT بوضوح، مع أمثلة من تقارير الدعم الفني، وأوامر جاهزة للنسخ، وفيديوهات تعليمية رسمية.</p>
      </header>

      <section className="lesson-outcome">
        <Target size={25}/>
        <div><b>النتيجة العملية</b><p>هتتعلم تحول الطلب العام إلى تعليمات واضحة تحدد المطلوب والسياق وشكل النتيجة والحدود، ثم تطوّر الإجابة بالمراجعة.</p></div>
      </section>

      <section className="lesson-section">
        <div className="lesson-heading"><span>01</span><div><h2>يعني إيه Prompt؟</h2><p>الـ Prompt هو التعليمات أو المدخلات اللي بتقدمها للمساعد علشان ينفذ مهمة معينة.</p></div></div>
        <div className="lesson-compare">
          <article><small>طلب عام</small><p>اكتب لي تقرير عن شغل الأسبوع.</p><span>النتيجة غالبًا هتكون عامة ومحتاجة تعديلات.</span></article>
          <article className="better"><small>طلب محدد</small><p>حوّل نقاط الدعم الفني التالية إلى تقرير أسبوعي رسمي باللغة العربية، مرتب حسب أيام الأسبوع، مع الحفاظ على كل المهام وعدم إضافة معلومات غير موجودة.</p><span>المطلوب واللغة والترتيب والقيود أصبحوا واضحين.</span></article>
        </div>
      </section>

      <section className="lesson-section">
        <div className="lesson-heading"><span>02</span><div><h2>تركيبة Prompt قوي في 4 عناصر</h2><p>استخدم العناصر دي كقائمة مراجعة قبل إرسال طلبك.</p></div></div>
        <div className="prompt-framework">
          <article><b>01 · Goal — الهدف</b><p>عايز المساعد يعمل إيه تحديدًا؟ تلخيص، تحليل، كتابة، مقارنة، أو إصلاح مشكلة؟</p></article>
          <article><b>02 · Context — السياق</b><p>اشرح خلفية المهمة، والجمهور، والملفات أو البيانات المتاحة.</p></article>
          <article><b>03 · Output — شكل النتيجة</b><p>حدد هل تريد جدولًا أو نقاطًا أو تقريرًا أو خطوات تنفيذ.</p></article>
          <article><b>04 · Boundaries — الحدود</b><p>حدد ما لا يجب تغييره أو افتراضه، وما يحتاج إلى مصدر أو تحقق.</p></article>
        </div>
      </section>

      <section className="lesson-section">
        <div className="lesson-heading"><span>03</span><div><h2>تطبيق عملي من شغلك</h2><p>تحويل سجل أعمال الدعم الفني في المدرسة إلى تقرير أسبوعي.</p></div></div>
        <ol className="lesson-steps">
          <li><b>افتح ChatGPT</b><span>من المتصفح أو تطبيق الهاتف.</span></li>
          <li><b>انسخ الأمر المناسب</b><span>ابدأ بالـ Prompt الأساسي أو الاحترافي أدناه.</span></li>
          <li><b>أضف سجل الأعمال</b><span>الصق النقاط أو ارفع ملفًا يحتوي عليها، بعد إزالة أي بيانات شخصية أو سرية.</span></li>
          <li><b>راجع النتيجة</b><span>استخدم أمر التحسين، ثم أمر التدقيق للتأكد من عدم حذف أي مهمة.</span></li>
        </ol>
      </section>

      <section className="lesson-section">
        <div className="lesson-heading"><span>04</span><div><h2>مكتبة Prompts جاهزة للنسخ</h2><p>جرّب كل أمر في الموقف المناسب، وعدّل النص الموجود بين الأقواس حسب احتياجك.</p></div></div>
        <div className="lesson-prompts">
          {prompts.map((item, i) => (
            <article className="lesson-prompt" key={item.label}>
              <div className="lesson-prompt-top"><div><b>{item.label}</b><small>{item.use}</small></div><button onClick={() => copyPrompt(item.text, i)}>{copied === i ? <Check size={15}/> : <Copy size={15}/>} {copied === i ? "تم النسخ" : "نسخ Prompt"}</button></div>
              <pre>{item.text}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className="lesson-section">
        <div className="lesson-heading"><span>05</span><div><h2>فيديوهات للتعلم</h2><p>مصادر فيديو مباشرة من OpenAI Academy، مناسبة للمبتدئ ثم المستوى المتقدم.</p></div></div>
        <div className="lesson-videos">
          {videos.map((video) => <article key={video.href}>
            <div className="lesson-play"><PlayCircle size={27}/></div>
            <div><b>{video.title}</b><small>{video.publisher} • المحتوى باللغة الإنجليزية</small><p>{video.note}</p><a href={video.href} target="_blank" rel="noreferrer">مشاهدة الفيديو <ExternalLink size={14}/></a></div>
          </article>)}
        </div>
      </section>

      <section className="lesson-section">
        <div className="lesson-heading"><span>06</span><div><h2>ما الجديد والمصدر الرسمي</h2><p>إرشادات حديثة وموثوقة لتحسين طريقة كتابة التعليمات.</p></div></div>
        <div className="lesson-update">
          <div><Lightbulb size={21}/><b>أفضل الممارسات في كتابة Prompts</b></div>
          <p>دليل OpenAI الرسمي يوصي بالوضوح والتحديد، وتوفير السياق الكافي، ثم تحسين الطلب تدريجيًا بناءً على النتيجة. دي إرشادات استخدام وليست ميزة مدفوعة منفصلة.</p>
          <a href="https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt" target="_blank" rel="noreferrer">دليل OpenAI الرسمي <ExternalLink size={14}/></a>
          <a href="https://developers.openai.com/api/docs/guides/prompt-engineering" target="_blank" rel="noreferrer">دليل Prompt Engineering للمطورين <ExternalLink size={14}/></a>
          <small>مراجعة المحتوى: 5 نوفمبر 2026. تحقق من صفحات OpenAI الرسمية عند العودة للدرس لأن الإرشادات قد تتطور.</small>
        </div>
      </section>

      <section className="lesson-section">
        <div className="lesson-heading"><span>07</span><div><h2>اختبر نفسك</h2><p>اختار أفضل Prompt للمهمة التالية.</p></div></div>
        <div className="lesson-quiz">
          <b>عايز تحلل ملف Excel لدرجات الطلاب وتحدد كل طالب درجته أقل من 50%، مع عرض الاسم والدرجة فقط.</b>
          {[
            ["عام", "حلل ملف Excel."],
            ["محدد", "حلل ملف Excel المرفق، وحدد الطلاب الذين تقل درجاتهم عن 50%، واعرض الاسم والدرجة في جدول. لا تفترض أي بيانات غير موجودة في الملف."],
            ["مختصر", "اعمل جدول للطلاب."]
          ].map(([value, label]) => <label key={value}><input type="radio" name="lesson-quiz" checked={choice === value} onChange={() => {setChoice(value);setChecked(false);}}/>{label}</label>)}
          <button onClick={() => setChecked(true)}>تحقق من الإجابة</button>
          {checked && <p className={choice === "محدد" ? "quiz-correct" : "quiz-try"}>{choice === "محدد" ? "إجابة صحيحة! حددت المهمة وشكل النتيجة والحدود." : "حاول مرة تانية: اختار الطلب اللي يحدد المهمة والنتيجة ويمنع افتراض بيانات غير موجودة."}</p>}
        </div>
      </section>

      <aside className="lesson-tip"><BookOpen size={22}/><div><b>نصيحة الدرس</b><p>ابدأ بطلب واضح، راجع النتيجة، وبعدها اطلب تعديلًا واحدًا محددًا. مش لازم تكتب Prompt ضخم من أول مرة.</p></div></aside>
      <footer className="lessons-footer">AI HUB • دروس عملية متدرجة في الذكاء الاصطناعي</footer>
    </main>
  );
}
