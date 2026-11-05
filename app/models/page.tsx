"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search, Sparkles, ChevronRight } from "lucide-react";

type Item = { name:string; maker:string; kind:string; best:string; use:string; how:string; note:string; url:string; tags:string[] };
const items: Item[] = [
  {name:"GPT-6 Astra",maker:"OpenAI",kind:"تفكير وبحث",best:"المهام الصعبة، التحليل العميق، البحث متعدد الخطوات، والبرمجة المعقدة.",use:"عندما تحتاج نتيجة دقيقة ومترابطة أو خطة عمل كاملة من ملفات ومصادر متعددة.",how:"افتح ChatGPT، اختر النموذج الأعلى المتاح في قائمة النماذج، ثم ارفع ملفاتك وحدد المطلوب والنتيجة النهائية.",note:"قد يختلف توفره حسب الخطة أو مساحة العمل.",url:"https://chatgpt.com/",tags:["بحث","تحليل","برمجة"]},
  {name:"GPT-6.1 Terra",maker:"OpenAI",kind:"استخدام يومي",best:"الكتابة الواضحة، فهم الصور، استخدام الكمبيوتر، والمهام اليومية السريعة.",use:"لإنجاز المهام العملية بسرعة، مثل ترتيب البيانات وشرح مشكلة أو التعامل مع واجهة برنامج.",how:"استخدم ChatGPT، اكتب المطلوب بوضوح، وأرفق صورة الشاشة أو الملف عند الحاجة.",note:"يتوفر في مسارات Work وCodex وفق إعلان OpenAI؛ تحقق من قائمة النماذج داخل حسابك.",url:"https://chatgpt.com/",tags:["كتابة","صور","مهام يومية"]},
  {name:"Gemini 4 Argon",maker:"Google",kind:"تفكير وبحث",best:"المشروعات المعقدة، تحليل التقارير، البرمجة، والمهام متعددة الخطوات.",use:"مناسب عندما تريد تحويل مجموعة مصادر أو ملفات إلى تقرير أو عرض أو خطة متكاملة.",how:"افتح Gemini، اختر Argon إن كان متاحًا، أرفق ملفاتك، واطلب المخرجات المطلوبة مع مصادرها.",note:"الإتاحة مرتبطة بخطط Google AI Pro وUltra وبعض خدمات المطورين.",url:"https://gemini.google.com/",tags:["بحث","ملفات","برمجة"]},
  {name:"Gemini 4 Carbon",maker:"Google",kind:"متخصص",best:"الأمن السيبراني والمهام الهندسية طويلة المدى.",use:"نموذج متخصص واعد، وليس الاختيار اليومي لمعظم المستخدمين.",how:"تابع إتاحته الرسمية؛ الإعلان الحالي يصفه كإصدار اختباري محدود لشركاء موثوقين.",note:"ليس متاحًا للجمهور على نطاق واسع حتى الآن.",url:"https://deepmind.google/blog/",tags:["أمن سيبراني","هندسة"]},
  {name:"Claude Opus 5.5",maker:"Anthropic",kind:"برمجة وكتابة",best:"البرمجة الوكيلة، تحليل المستندات، والمهام المهنية المعقدة.",use:"اختره لمراجعة مشروع برمجي كبير أو صياغة مستند طويل يحتاج تنظيمًا ودقة.",how:"افتح Claude، ارفع الملفات أو أضف سياق المشروع، ثم اطلب خطة قبل تنفيذ التعديلات.",note:"قد تختلف الحدود والميزات حسب الخطة.",url:"https://claude.ai/",tags:["برمجة","كتابة","ملفات"]},
  {name:"Claude Sonnet 5.5",maker:"Anthropic",kind:"استخدام يومي",best:"التوازن بين الجودة والسرعة والتكلفة في البرمجة والعمل اليومي.",use:"اختيار عملي لمعظم مهام الكتابة والتحليل والكود دون الحاجة لأعلى فئة.",how:"ابدأ بالمهمة مباشرة، واطلب منه عرض الخطوات أو الكود مع شرح مختصر.",note:"تذكر Anthropic أنه أسرع وأقل تكلفة من الجيل السابق وفق إعلانها.",url:"https://claude.ai/",tags:["برمجة","كتابة","تحليل"]},
  {name:"Claude Haiku 5.5",maker:"Anthropic",kind:"سرعة وتلخيص",best:"التلخيص السريع، تصنيف النصوص، والمهام المتكررة.",use:"مفيد عند معالجة عدد كبير من النصوص أو طلب إجابات سريعة.",how:"أرسل النص أو الملف وحدد طول الملخص وشكل النتيجة المطلوبة.",note:"فئة سريعة للأعمال ذات الحجم الكبير.",url:"https://claude.ai/",tags:["تلخيص","سرعة"]},
  {name:"ChatGPT Images",maker:"OpenAI",kind:"صور وفيديو",best:"إنشاء الصور وتعديلها وشرح الصور المرفوعة.",use:"لعمل صور تعليمية وتصميم أفكار بصرية وتعديل صورة موجودة.",how:"من ChatGPT اختر إنشاء صورة، اكتب وصفًا يحدد الموضوع والأسلوب والمقاس، ثم اطلب التعديلات.",note:"قد تختلف أدوات الصور المتاحة حسب الخطة.",url:"https://chatgpt.com/",tags:["صور","تصميم"]},
  {name:"Google Nano Banana 2.1",maker:"Google",kind:"صور وفيديو",best:"إنشاء الصور وتعديلها ضمن منظومة Google.",use:"مناسب للتجارب البصرية وتطوير صورة عبر تعليمات متتابعة.",how:"افتح Gemini أو أداة Google التي تتيح النموذج، أضف وصف الصورة ثم اطلب التعديل المطلوب.",note:"راجع توفر النموذج داخل التطبيق في منطقتك.",url:"https://gemini.google.com/",tags:["صور","تصميم"]},
  {name:"NotebookLM",maker:"Google",kind:"تعلم وملفات",best:"فهم ملفات PDF والمراجع وتلخيص المحاضرات وبناء أسئلة للمذاكرة.",use:"مفيد جدًا لتحويل ملفات الكورس والمراجع إلى ملخص منظم وأسئلة مراجعة.",how:"أنشئ دفترًا جديدًا، أضف ملفات PDF أو روابط المصادر، ثم اسأل عن الملخص أو اطلب أسئلة واختبارًا.",note:"يعتمد على المصادر التي تضيفها؛ راجع الاقتباسات قبل اعتماد المعلومات.",url:"https://notebooklm.google.com/",tags:["تعليم","PDF","تلخيص"]},
  {name:"Perplexity",maker:"Perplexity",kind:"بحث ومصادر",best:"البحث على الويب مع عرض المصادر والروابط.",use:"لجمع أحدث المعلومات ومقارنة المنتجات والأخبار والتحقق من الادعاءات.",how:"اكتب سؤالًا محددًا، افتح المصادر المرتبطة، وقارن المعلومات المهمة من أكثر من مصدر.",note:"تحقق من المصدر الأصلي خاصة في الأخبار والمعلومات الحساسة.",url:"https://www.perplexity.ai/",tags:["بحث","مصادر","أخبار"]},
  {name:"Cursor",maker:"Cursor",kind:"برمجة وكتابة",best:"تطوير المشاريع البرمجية والعمل داخل ملفات الكود.",use:"لمن يريد تعديل مشروع كامل وفهم الملفات وتشغيل اختبارات من محرر واحد.",how:"افتح مجلد المشروع في Cursor، راجع خطة التغييرات التي يقترحها، ثم اختبر التعديلات قبل اعتمادها.",note:"أداة تطوير وليست مجرد روبوت محادثة.",url:"https://cursor.com/",tags:["برمجة","تطوير"]},
  {name:"GPT-6.1 Sol",maker:"OpenAI",kind:"تفكير وبحث",best:"مهام التفكير المعقدة والبرمجة واستخدام الكمبيوتر مع تكلفة أقل من الفئة الأعلى.",use:"عندما تحتاج جودة عالية في الشغل المعقد وتريد توازنًا أفضل بين الأداء والتكلفة.",how:"راجع قائمة النماذج المتاحة داخل ChatGPT Work أو Codex، أو وثائق API، ثم اختبر المهمة على عينة صغيرة.",note:"توافره يختلف حسب المنتج والخطة؛ راجع صفحات OpenAI الرسمية.",url:"https://developers.openai.com/api/docs/models/all",tags:["تفكير","برمجة","computer use"]},
  {name:"GPT-Image-2.6",maker:"OpenAI",kind:"صور وفيديو",best:"إنشاء الصور وتعديلها بدقة أعلى وإنشاء GIFs وتحكم أكبر عبر API.",use:"للصور التعليمية والتصميم والتحرير التتابعي، مع اختيار وضع الجودة أو السرعة حسب المهمة.",how:"استخدم أدوات الصور داخل ChatGPT أو وثائق Images API، واكتب وصفًا للمشهد والتكوين وما تريد تغييره.",note:"أعلنت OpenAI عن الإصدار في 4 نوفمبر 2026؛ بعض الضوابط تختلف بين التطبيق وواجهة API.",url:"https://openai.com/index/introducing-images-2-6/",tags:["صور","تعديل","GIF"]},
  {name:"Gemini 4 Carbon",maker:"Google",kind:"متخصص",best:"المهام الهندسية والأمن السيبراني وفق وصف Google للنموذج.",use:"للمهام المتخصصة التي تتطلب قدرات هندسية وأمنية؛ ليس الاختيار العام لكل مستخدم.",how:"راجع بوابة نماذج Google DeepMind لمعرفة الإتاحة وشروط الوصول قبل التخطيط لاستخدامه.",note:"تحقق من حالة الإتاحة العامة أو المقيدة في صفحة النموذج الرسمية.",url:"https://deepmind.google/models/",tags:["هندسة","أمن سيبراني"]},
  {name:"Grok 4.7",maker:"xAI",kind:"برمجة وكتابة",best:"البرمجة والمهام المعرفية الطويلة والتحقق الذاتي من النتائج.",use:"جرّبه في المشكلات البرمجية طويلة الخطوات ومهام المعرفة التي تحتاج مراجعة داخلية.",how:"افتح Grok، اشرح النتيجة المطلوبة، واطلب خطة واختبارات أو مصادر عند وجود ادعاءات واقعية.",note:"أعلنت xAI عنه في 21 سبتمبر 2026؛ راجع الإتاحة داخل Grok أو واجهة المطورين.",url:"https://x.ai/news/grok-4-7",tags:["برمجة","تحليل","معرفة"]},
  {name:"DeepSeek V4.1 Flash",maker:"DeepSeek",kind:"سرعة وتلخيص",best:"الاستدلال السريع والمهام متعددة الوسائط مع تركيز على الكفاءة والتكلفة.",use:"للأسئلة اليومية والتحليل والمهام التي تحتاج سرعة، أو للتجربة عبر API.",how:"استخدم تطبيق DeepSeek للمحادثة أو نموذج deepseek-flash في API؛ راجع سجل التحديث لأن الاسم يشير إلى أحدث إصدار Flash.",note:"تحديث API الرسمي بتاريخ 17 أكتوبر 2026 يشير إلى V4.1-Flash-1017.",url:"https://api-docs.deepseek.com/updates/",tags:["سرعة","استدلال","صور"]},
  {name:"Mistral Large 4",maker:"Mistral AI",kind:"تفكير وبحث",best:"البرمجة والمهام الوكيلة وفهم المستندات والبيانات متعددة الوسائط.",use:"خيار للمطورين والفرق التي تحتاج نموذجًا مفتوح الأوزان نسبيًا واستضافة أكثر تحكمًا.",how:"جرّبه عبر Mistral Studio أو منصة استضافة متوافقة، ثم راجع الترخيص والأوزان وخيارات النشر.",note:"أُعلن عنه في 6 أكتوبر، ونُشرت الأوزان في 29 أكتوبر 2026؛ راجع الترخيص وطريقة الاستضافة.",url:"https://mistral.ai/news/mistral-large-4/",tags:["برمجة","ملفات","open weights"]},
  {name:"Muse Spark Open",maker:"Meta",kind:"برمجة وكتابة",best:"مهام الوكلاء طويلة الأمد والبرمجة متعددة الخطوات والعمل متعدد الوسائط.",use:"للمطورين والفرق التي تحتاج تشغيل نموذج بأوزان مفتوحة عبر مزود مستضاف أو بنية ذاتية.",how:"راجع ترخيص Muse Model License ومتطلبات الذاكرة أولًا؛ النموذج 816B إجماليًا و42B نشطة، ويدعم مدخلات النص والصورة والصوت والفيديو.",note:"أُعلن عنه في 15 أكتوبر 2026. يحتاج عتادًا ضخمًا للتشغيل الذاتي؛ التوفر المستضاف أسهل.",url:"https://research.meta.ai/blog/muse-spark-open",tags:["مفتوح الأوزان","وكلاء","متعدد الوسائط"]},
  {name:"Qwen3.8-Max",maker:"Alibaba Qwen",kind:"تفكير وبحث",best:"البرمجة والبحث والعمل طويل الأمد والمهام المركبة.",use:"خيار قوي لمن يريد نموذجًا عامًا عالي القدرة ضمن منظومة QwenCloud.",how:"جرّبه عبر Qwen Chat أو QwenCloud؛ راجع منطقة الاستضافة وسعر الاستخدام ومواصفات السياق قبل إرسال بيانات عمل.",note:"أُعلن عنه في 3 أغسطس 2026؛ تحديث QwenCloud في 27 أكتوبر يذكر إتاحته ضمن نطاق US بذاكرة سياق مليون token.",url:"https://qwen.ai/blog?id=qwen3.8",tags:["برمجة","بحث","سياق طويل"]},
  {name:"Qwen3.8-Flash",maker:"Alibaba Qwen",kind:"سرعة وتلخيص",best:"المهام اليومية السريعة والاستدلال وفهم الصور واستدعاء الأدوات.",use:"مناسب للمهام المتكررة التي تحتاج سرعة وكفاءة أعلى من النموذج الكبير.",how:"استخدم Qwen Chat أو QwenCloud؛ راجع منطقة الإتاحة، حيث توجد نطاقات Frankfurt وHong Kong وفق تحديثات الخدمة.",note:"تحديث QwenCloud في 27 أكتوبر 2026 يذكر إتاحة نسخة EU في Frankfurt بسياق مليون token.",url:"https://docs.qwencloud.com/changelog/models",tags:["سرعة","صور","API"]},
];
const recentReleases = [
  {date:"4 نوفمبر 2026",name:"OpenAI Images 2.6",summary:"توليد أسرع للصور، تحرير أدق، ثبات أفضل للتفاصيل، وإنشاء GIFs.",maker:"OpenAI",href:"https://openai.com/index/introducing-images-2-6/"},
  {date:"29 أكتوبر 2026",name:"Mistral Le Chonk",summary:"إتاحة أوزان Mistral Large 4 المفتوحة، مع تركيز على البرمجة والوكلاء والأمن.",maker:"Mistral AI",href:"https://mistral.ai/news/"},
  {date:"27 أكتوبر 2026",name:"Qwen3.8-Max وFlash",summary:"تحديثات إتاحة إقليمية، مع سياق مليون token ودعم الاستدلال والرؤية واستدعاء الأدوات.",maker:"Qwen",href:"https://docs.qwencloud.com/changelog/models"},
  {date:"15 أكتوبر 2026",name:"Muse Spark Open",summary:"نموذج مفتوح الأوزان متعدد الوسائط للعمل الوكيلي والبرمجة والمهام طويلة الأمد.",maker:"Meta",href:"https://research.meta.ai/blog/muse-spark-open"},
  {date:"13 أكتوبر 2026",name:"Gemini 4 Argon",summary:"نموذج استدلال متعدد الوسائط للبرمجة والعمل المؤسسي والبحث والمهام المعقدة.",maker:"Google DeepMind",href:"https://deepmind.google/models/model-cards/gemini-4-argon/"},
  {date:"7 أكتوبر 2026",name:"Claude Haiku 5.5",summary:"نموذج سريع للمهام ذات الحجم الكبير والتلخيص والوكلاء الفرعيين واستخدام المتصفح.",maker:"Anthropic",href:"https://www.anthropic.com/news/models"},
  {date:"21 سبتمبر 2026",name:"Grok 4.7",summary:"تحسينات في البرمجة والعمل المعرفي والمهام الطويلة والتحقق الذاتي من النتائج.",maker:"xAI",href:"https://x.ai/news/grok-4-7"},
  {date:"10 سبتمبر 2026",name:"DeepSeek V4.1 Flash",summary:"نموذج أسرع متعدد الوسائط مع أسعار API أقل وتحديثات في الاستدلال والأدوات.",maker:"DeepSeek",href:"https://api-docs.deepseek.com/updates/"}
];

const categories = ["الكل","تفكير وبحث","برمجة وكتابة","استخدام يومي","سرعة وتلخيص","تعلم وملفات","صور وفيديو","بحث ومصادر","متخصص"];
const picks = [
  ["بحث موثق على الإنترنت","Perplexity","يجمع نتائج الويب ويعرض روابط المصادر."],
  ["تحليل صعب ومهام متعددة الخطوات","GPT-6 Astra أو Gemini 4 Argon","ابدأ بتحديد المطلوب والملفات وشكل التسليم."],
  ["برمجة مشروع كامل","Claude Opus 5.5 أو Cursor","اطلب خطة أولًا، ثم نفّذ واختبر كل تغيير."],
  ["تلخيص محاضرات وملفات PDF","NotebookLM","ارفع المصادر واطلب ملخصًا وأسئلة مراجعة."],
  ["إنشاء صورة","ChatGPT Images أو Nano Banana","صف العناصر والأسلوب والمقاس بوضوح."],
  ["إنشاء فيديو","Runway أو Veo","حدد المشهد والحركة والمدة ونمط التصوير."],
  ["كتابة وتحليل يومي","ChatGPT أو Gemini أو Claude","قارن ناتجًا واحدًا على نفس المهمة بدل الاعتماد على ترتيب ثابت."],
  ["نماذج مفتوحة وAPI","DeepSeek أو Mistral","راجع الترخيص وطريقة الاستضافة قبل الاستخدام."]
];

export default function ModelsPage(){
 const [category,setCategory]=useState("الكل");
 const [query,setQuery]=useState("");
 const shown=useMemo(()=>items.filter(x=>(category==="الكل"||x.kind===category)&&[x.name,x.maker,x.best,x.use,...x.tags].join(" ").toLowerCase().includes(query.toLowerCase())),[category,query]);
 return <main className="models-page" dir="rtl">
  <header className="models-header">
   <a className="back-home" href="/"><ChevronRight size={17}/> العودة للأخبار</a>
   <span className="models-kicker"><Sparkles size={15}/> AI HUB • دليل الاستخدام العملي</span>
   <h1>أفضل نماذج وتطبيقات الذكاء الاصطناعي</h1>
   <p>مش لازم تعرف كل النماذج؛ اختار الأداة حسب المهمة. هنا هتلاقي كل نموذج بيعمل إيه، إمتى تستخدمه، وتبدأ إزاي.</p>
   <div className="models-updated">آخر مراجعة: 5 نوفمبر 2026 • راجع صفحة المصدر لمعرفة الإتاحة الحالية</div>
  </header>
  <section className="quick-picks">
   <h2>اختار حسب استخدامك</h2>
   <div className="pick-grid">{picks.map(([task,name,desc])=><article className="pick-card" key={task}><b>{task}</b><strong>{name}</strong><p>{desc}</p></article>)}</div>
  </section>
  <section className="catalog">
   <div className="catalog-title"><div><span>MODEL & APP DIRECTORY</span><h2>دليل النماذج والتطبيقات</h2></div><b>{shown.length} أداة</b></div>
   <div className="models-tools"><label className="models-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث عن نموذج أو استخدام..."/></label><div className="models-filters">{categories.map(x=><button key={x} onClick={()=>setCategory(x)} className={category===x?"active":""}>{x}</button>)}</div></div>
   <div className="model-grid">{shown.map(x=><article className="model-card" key={x.name}>
    <div className="model-card-head"><span>{x.maker}</span><small>{x.kind}</small></div><h3>{x.name}</h3><div className="model-best"><b>الأفضل في</b><p>{x.best}</p></div><div className="model-usage"><b>تستخدمه إمتى؟</b><p>{x.use}</p></div><div className="model-how"><b>طريقة الاستخدام</b><p>{x.how}</p></div><div className="model-note">{x.note}</div><a href={x.url} target="_blank" rel="noreferrer">افتح التطبيق أو الموقع <ArrowUpRight size={15}/></a>
   </article>)}</div>
   {shown.length===0&&<div className="models-empty">مفيش نتائج مطابقة. جرّب كلمة بحث مختلفة.</div>}
  </section>
  <footer className="models-footer">AI HUB • دليل عملي قابل للتحديث مع ظهور نماذج وأدوات جديدة</footer>
 </main>
}
