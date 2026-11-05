"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft, ArrowUpRight, Award, BookOpen, Bot, BrainCircuit, CheckCircle2,
  Clock3, Code2, ExternalLink, Filter, GraduationCap, Languages, Layers3,
  Library, PlayCircle, Search, Sparkles, Target, WandSparkles, Workflow
} from "lucide-react";
import "./courses.css";

type Topic = "أساسيات AI" | "ChatGPT" | "Gemini" | "Claude" | "العمل والإنتاجية" | "البرمجة والنماذج";
type Course = {
  id: string; title: string; provider: string; topic: Topic; level: string;
  duration: string; price: string; language: string; description: string;
  takeaway: string; href: string; official: boolean; icon: LucideIcon;
};

const courses: Course[] = [
  {
    id:"hala-foundations", title:"أساسيات الذكاء الاصطناعي وChatGPT", provider:"أكاديمية HalaGPT",
    topic:"أساسيات AI", level:"مبتدئ", duration:"ساعتان • 7 دروس", price:"مجاني",
    language:"العربية", description:"مدخل عملي من معنى الذكاء الاصطناعي إلى أول محادثة فعّالة، مع أمثلة للدراسة والعمل ومقارنة المساعدات.",
    takeaway:"مناسب جدًا كبداية عربية بدون خلفية تقنية.", href:"https://hala.academy/courses/foundations", official:false, icon:GraduationCap
  },
  {
    id:"openai-foundations", title:"AI Foundations – أساسيات الذكاء الاصطناعي", provider:"OpenAI Academy",
    topic:"أساسيات AI", level:"مبتدئ", duration:"60–75 دقيقة", price:"مجاني",
    language:"تحقق من لغة الدروس داخل الدورة", description:"أساسيات الذكاء الاصطناعي، كتابة أوامر أوضح، إضافة السياق، مراجعة المخرجات والاستخدام المسؤول.",
    takeaway:"ابدأ به لفهم الأساسيات قبل التعمق في أداة واحدة.", href:"https://academy.openai.com/public/courses", official:true, icon:BrainCircuit
  },
  {
    id:"elements-ai", title:"Elements of AI – أساسيات الذكاء الاصطناعي", provider:"University of Helsinki / MinnaLearn",
    topic:"أساسيات AI", level:"مبتدئ", duration:"دورة متعددة الوحدات", price:"مجاني",
    language:"عدة لغات؛ راجع اختيار اللغة", description:"مساق تأسيسي لفهم ماهية الذكاء الاصطناعي، حل المشكلات، تطبيقات العالم الحقيقي ومبادئ تعلم الآلة.",
    takeaway:"اختيار مناسب للتأسيس النظري المنظم.", href:"https://course.elementsofai.com/", official:true, icon:BookOpen
  },
  {
    id:"google-genai", title:"Introduction to Generative AI", provider:"Google Skills",
    topic:"أساسيات AI", level:"مبتدئ", duration:"45 دقيقة", price:"مجاني • شارة إتمام",
    language:"تحقق من لغة المادة", description:"شرح مفهوم الذكاء الاصطناعي التوليدي واستخداماته والاختلاف بينه وبين تعلم الآلة التقليدي.",
    takeaway:"درس قصير مناسب كبداية سريعة.", href:"https://www.skills.google/paths/118/course_templates/536", official:true, icon:Sparkles
  },
  {
    id:"openai-applied", title:"Applied AI Foundations", provider:"OpenAI Academy",
    topic:"العمل والإنتاجية", level:"مبتدئ", duration:"75–90 دقيقة", price:"مجاني",
    language:"تحقق من لغة الدروس داخل الدورة", description:"حوّل الأوامر المفيدة إلى خطوات عمل متكررة، وحدد المدخلات والمخرجات ونقاط المراجعة.",
    takeaway:"مفيد لنقل استخدام AI من سؤال وجواب إلى إنجاز مهام فعلية.", href:"https://academy.openai.com/public/courses", official:true, icon:Workflow
  },
  {
    id:"openai-agents", title:"Agents and Workflows", provider:"OpenAI Academy",
    topic:"العمل والإنتاجية", level:"متوسط", duration:"75–90 دقيقة", price:"مجاني",
    language:"تحقق من لغة الدروس داخل الدورة", description:"تعلّم توجيه الوكلاء لتنفيذ مهام منظمة، وتحديد السياق والحدود ومراجعة النتائج.",
    takeaway:"ابدأ به بعد فهم أساسيات استخدام المساعدات.", href:"https://academy.openai.com/public/courses", official:true, icon:Bot
  },
  {
    id:"openai-educators", title:"AI for Educators – الذكاء الاصطناعي للمعلّمين", provider:"OpenAI Academy",
    topic:"العمل والإنتاجية", level:"مبتدئ", duration:"45 دقيقة", price:"مجاني",
    language:"الإنجليزية والبرتغالية بحسب صفحة الدورة", description:"استخدام ChatGPT لإعداد خطط الدروس والأنشطة والتقييمات والمواد التعليمية.",
    takeaway:"مفيد للمعلمين والعاملين في التعليم.", href:"https://academy.openai.com/public/courses", official:true, icon:BookOpen
  },
  {
    id:"chatgpt-prompt", title:"ChatGPT Prompt Engineering for Developers", provider:"DeepLearning.AI + OpenAI",
    topic:"ChatGPT", level:"مبتدئ تقني", duration:"ساعة ونصف • 9 دروس فيديو", price:"قد تتغير شروط المجانية والشهادة",
    language:"الإنجليزية", description:"هندسة الأوامر، التلخيص والتصنيف وتحويل النصوص وبناء روبوت محادثة باستخدام OpenAI API.",
    takeaway:"لمن يريد الانتقال من استخدام ChatGPT إلى بناء تطبيقات.", href:"https://www.deeplearning.ai/alpha/short-courses/chatgpt-prompt-engineering-for-developers", official:false, icon:Code2
  },
  {
    id:"ai-prompting", title:"AI Prompting for Everyone", provider:"DeepLearning.AI – Andrew Ng",
    topic:"ChatGPT", level:"مبتدئ", duration:"3 ساعات و4 دقائق • 21 فيديو", price:"الإتاحة والشهادة حسب الخطة",
    language:"الإنجليزية", description:"استخدام AI للبحث وكتابة المحتوى والتفكير مع المساعد وإنشاء الصور والتطبيقات البسيطة.",
    takeaway:"من أفضل الخيارات لتطوير مهارات الاستخدام اليومي عبر أدوات متعددة.", href:"https://www.deeplearning.ai/courses/ai-prompting-for-everyone", official:false, icon:WandSparkles
  },
  {
    id:"genai-everyone", title:"Generative AI for Everyone", provider:"DeepLearning.AI – Andrew Ng",
    topic:"أساسيات AI", level:"مبتدئ", duration:"5 ساعات • 32 درس فيديو", price:"الإتاحة والشهادة حسب المنصة",
    language:"الإنجليزية", description:"كيف يعمل الذكاء الاصطناعي التوليدي، ما الذي يستطيع فعله، حدوده، وأمثلة عملية في العمل والمجتمع.",
    takeaway:"مناسب لمن يريد فهم المجال دون برمجة.", href:"https://www.deeplearning.ai/courses/generative-ai-for-everyone", official:false, icon:GraduationCap
  },
  {
    id:"claude-101", title:"Claude 101", provider:"Claude Academy – Anthropic",
    topic:"Claude", level:"مبتدئ", duration:"ساعتان ونصف • 13 درسًا واختبار", price:"مجاني • شارة إتمام",
    language:"الإنجليزية", description:"تعلم استخدام Claude في المهام اليومية وفهم خصائصه والانتقال إلى موارد أكثر تقدمًا.",
    takeaway:"المسار الرسمي الأول للتعامل مع تطبيق Claude.", href:"https://academy.claude.com/courses/claude-101", official:true, icon:Bot
  },
  {
    id:"claude-fluency", title:"AI Fluency: Framework and Foundations", provider:"Claude Academy – Anthropic",
    topic:"أساسيات AI", level:"مبتدئ", duration:"4 ساعات • 14 درسًا واختبار", price:"مجاني • شارة إتمام",
    language:"الإنجليزية", description:"إطار عملي للتعاون مع الذكاء الاصطناعي: التفويض، وصف المطلوب، التمييز والتحقق، والمسؤولية.",
    takeaway:"مهارات تنفع مع ChatGPT وGemini وClaude وأي نموذج جديد.", href:"https://academy.claude.com/courses/ai-fluency-framework-foundations", official:true, icon:BrainCircuit
  },
  {
    id:"claude-code", title:"Claude Code 101", provider:"Claude Academy – Anthropic",
    topic:"Claude", level:"متوسط", duration:"ساعة ونصف • 12 درسًا", price:"مجاني • شارة إتمام",
    language:"الإنجليزية", description:"استخدام Claude Code في فهم مشروع برمجي وتخطيط التغييرات وكتابة الكود واكتشاف الأخطاء.",
    takeaway:"للمهتمين بالبرمجة وتطوير التطبيقات.", href:"https://academy.claude.com/courses/claude-code-101", official:true, icon:Code2
  },
  {
    id:"google-ai-essentials", title:"Google AI Essentials", provider:"Google / Coursera",
    topic:"العمل والإنتاجية", level:"مبتدئ", duration:"حوالي 4 ساعات", price:"شهادة • تفاصيل السعر على صفحة التسجيل",
    language:"تحقق من الترجمة والترجمة النصية المتاحة", description:"مقدمة عملية في استخدام أدوات الذكاء الاصطناعي التوليدي لرفع الإنتاجية وإنشاء المحتوى وتوليد الأفكار.",
    takeaway:"مناسب لتطبيق AI في الشغل اليومي.", href:"https://ai.google/learn-ai-skills/", official:true, icon:Award
  },
  {
    id:"gemini-workspace", title:"Google Workspace with Gemini", provider:"Google Skills",
    topic:"Gemini", level:"مبتدئ", duration:"8 أنشطة تعليمية", price:"تحقق من شروط Google Skills",
    language:"الإنجليزية غالبًا؛ راجع صفحة المسار", description:"التعامل مع Gemini داخل Gmail وDocs وSlides وSheets واستخدامه لتحسين الإنتاجية.",
    takeaway:"مناسب لمن يستخدم تطبيقات Google في العمل.", href:"https://www.skills.google/paths/249Gemini", official:true, icon:Layers3
  },
  {
    id:"google-genai-path", title:"Introduction to Generative AI – Learning Path", provider:"Google Skills",
    topic:"Gemini", level:"مبتدئ", duration:"5 أنشطة تعليمية", price:"تختلف الأنشطة؛ راجع صفحة المسار",
    language:"تحقق من لغة كل نشاط", description:"مسار يبدأ بمفاهيم GenAI وLarge Language Models والاستخدام المسؤول وتصميم الأوامر.",
    takeaway:"مسار Google جيد للانتقال من المفاهيم إلى التجربة.", href:"https://www.skills.google/paths/118", official:true, icon:GraduationCap
  },
  {
    id:"google-ai-studio", title:"التعلم باستخدام Gemini API وAI Studio", provider:"Google AI for Developers",
    topic:"Gemini", level:"متوسط", duration:"دروس ومختبرات حسب الموضوع", price:"المستندات مجانية؛ استخدام API قد يتطلب دفعًا",
    language:"الإنجليزية", description:"تعلم تجربة نماذج Gemini في AI Studio ثم استخدام API للنصوص والصور والأدوات والوكلاء.",
    takeaway:"للمستخدم المتقدم والمطور، وليس شرطًا للمبتدئ.", href:"https://ai.google.dev/gemini-api/docs/get-started", official:true, icon:Code2
  },
  {
    id:"microsoft-genai", title:"Introduction to Generative AI and Agents", provider:"Microsoft Learn",
    topic:"أساسيات AI", level:"مبتدئ", duration:"37 دقيقة • 7 وحدات", price:"متاح على Microsoft Learn",
    language:"الإنجليزية", description:"شرح مبادئ GenAI وLLMs وكتابة الأوامر ومفهوم AI Agents مع اختبار قصير.",
    takeaway:"وحدة صغيرة منظمة للمراجعة السريعة.", href:"https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/", official:true, icon:BookOpen
  },
  {
    id:"hf-llm", title:"LLM Course", provider:"Hugging Face",
    topic:"البرمجة والنماذج", level:"متوسط", duration:"مسار متعدد الفصول", price:"مجاني",
    language:"الإنجليزية", description:"فهم النماذج اللغوية الكبيرة واستخدام Transformers وDatasets وTokenizers ومشاركة النماذج.",
    takeaway:"للمهتمين بفهم النماذج المفتوحة والعمل عليها؛ يحتاج معرفة جيدة بـ Python.", href:"https://huggingface.co/learn/llm-course", official:true, icon:Code2
  },
  {
    id:"hf-agents", title:"AI Agents Course", provider:"Hugging Face",
    topic:"البرمجة والنماذج", level:"متوسط", duration:"مسار عملي", price:"مجاني",
    language:"الإنجليزية", description:"تعلم بناء ونشر وكلاء ذكاء اصطناعي باستخدام منظومة Hugging Face.",
    takeaway:"مناسب بعد فهم الأساسيات ومبادئ البرمجة.", href:"https://huggingface.co/learn/agents-course", official:true, icon:Bot
  },
  {
    id:"maharatech", title:"مقررات الذكاء الاصطناعي – MaharaTech", provider:"MaharaTech / ITI مصر",
    topic:"البرمجة والنماذج", level:"مبتدئ إلى متقدم", duration:"عدة مقررات ومسارات", price:"توجد مقررات مجانية",
    language:"العربية والإنجليزية حسب المقرر", description:"بوابة مصرية للتعلم التقني تضم مقررات في الذكاء الاصطناعي التوليدي وتعلم الآلة والتطوير.",
    takeaway:"ابدأ من المسارات العربية، ثم اختر تخصصًا تقنيًا مناسبًا.", href:"https://maharatech.gov.eg/course/index.php?categoryid=5&lang=ar", official:true, icon:Library
  }
];

const topics = ["الكل","أساسيات AI","ChatGPT","Gemini","Claude","العمل والإنتاجية","البرمجة والنماذج"];
const learningHubs = [
  {name:"OpenAI Academy",by:"OpenAI",what:"دورات AI Foundations وChatGPT وAgents وCodex والتعليم.",type:"أكاديمية رسمية",lang:"بعض صفحات المحتوى بالعربية؛ لغة الدورة تختلف.",url:"https://academy.openai.com/public/courses"},
  {name:"Claude Academy",by:"Anthropic",what:"Claude 101 وClaude Code وAI Fluency وMCP ودورات API.",type:"أكاديمية رسمية",lang:"المحتوى الظاهر حاليًا بالإنجليزية.",url:"https://academy.claude.com/courses"},
  {name:"Google AI Skills",by:"Google",what:"أساسيات AI وGemini وGoogle Workspace ومواد للمطورين.",type:"أكاديمية رسمية",lang:"تحقق من لغة كل مقرر.",url:"https://ai.google/learn-ai-skills/"},
  {name:"Gemini Apps Help",by:"Google",what:"شرح خصائص تطبيق Gemini: الملفات، الصور، البحث، الدفاتر، الإعدادات والخصوصية.",type:"دليل استخدام رسمي",lang:"يمكن تغيير لغة المساعدة من الموقع.",url:"https://support.google.com/gemini/"},
  {name:"DeepLearning.AI",by:"Andrew Ng وفريق متخصص",what:"كورسات قصيرة عن Prompting وGenAI وAgents وRAG والنماذج.",type:"منصة كورسات",lang:"معظم الكورسات بالإنجليزية.",url:"https://www.deeplearning.ai/courses/"},
  {name:"MaharaTech",by:"معهد تكنولوجيا المعلومات – مصر",what:"دورات عربية وتقنية في الذكاء الاصطناعي والتطوير والمهارات الرقمية.",type:"منصة تعلم مصرية",lang:"العربية متاحة في مقررات مختارة.",url:"https://maharatech.gov.eg/course/index.php?categoryid=5&lang=ar"},
  {name:"Hugging Face Learn",by:"Hugging Face",what:"مسارات LLM وAgents وComputer Vision وAudio والنماذج المفتوحة.",type:"تعلم تقني",lang:"الإنجليزية.",url:"https://huggingface.co/learn"},
  {name:"Microsoft Learn",by:"Microsoft",what:"وحدات قصيرة ومسارات في AI التوليدي وCopilot وAgents وAzure AI.",type:"منصة تعلم رسمية",lang:"بعض الصفحات تتوفر بلغات مختلفة؛ راجع إعداد اللغة.",url:"https://learn.microsoft.com/training/"},
  {name:"Elements of AI",by:"University of Helsinki / MinnaLearn",what:"مقرر تأسيسي لفهم الذكاء الاصطناعي وتعلم الآلة وتطبيقاته.",type:"مساق تأسيسي",lang:"تتوفر لغات متعددة؛ راجع جودة النسخة العربية.",url:"https://course.elementsofai.com/"},
  {name:"Google Skills",by:"Google Cloud",what:"مسارات عملية ومختبرات وشارات مهارية مرتبطة بـ Gemini وVertex AI.",type:"تعلم ومختبرات",lang:"لغة كل نشاط موضحة داخل المسار.",url:"https://www.skills.google/"}
];

export default function CoursesPage() {
  const [topic,setTopic] = useState("الكل");
  const [query,setQuery] = useState("");
  const [showAll,setShowAll] = useState(false);
  const [onlyFree,setOnlyFree] = useState(false);
  const filtered = useMemo(() => courses.filter(c => {
    const text = [c.title,c.provider,c.description,c.topic,c.level,c.language].join(" ").toLowerCase();
    return (topic === "الكل" || c.topic === topic) && text.includes(query.toLowerCase()) &&
      (!onlyFree || c.price.toLowerCase().includes("مجاني") || c.price.toLowerCase().includes("free"));
  }),[topic,query,onlyFree]);
  const visible = showAll ? filtered : filtered.slice(0,8);

  return (
    <main className="courses-page" dir="rtl">
      <header className="courses-topbar">
        <a className="courses-brand" href="/"><span><BrainCircuit size={24}/></span><b>AI HUB <small>LEARNING</small></b></a>
        <nav><a href="/">الرئيسية</a><a href="/models">النماذج والتطبيقات</a><a href="/guide">دليل الاستخدام</a></nav>
        <a className="topbar-back" href="/"><ArrowLeft size={16}/> الرجوع للموقع</a>
      </header>

      <section className="courses-hero">
        <div className="courses-hero-copy">
          <div className="courses-kicker"><Sparkles size={15}/> مكتبة تعلم الذكاء الاصطناعي</div>
          <h1>اتعلّم AI من <em>الصفر إلى التطبيق</em></h1>
          <p>كورسات مختارة لتتعلم أساسيات الذكاء الاصطناعي، وتستخدم ChatGPT وGemini وClaude، وتكتشف أدوات ونماذج جديدة خطوة بخطوة.</p>
          <div className="courses-hero-actions">
            <a href="#catalog">استكشف الكورسات <ArrowLeft size={16}/></a>
            <a className="secondary" href="#learning-hubs">مواقع تتعلم منها <ExternalLink size={15}/></a>
          </div>
          <div className="courses-stats">
            <div><b>{courses.length}</b><span>كورس ومسار مختار</span></div>
            <div><b>{learningHubs.length}</b><span>أكاديميات ومصادر تعلم</span></div>
            <div><b>AR / EN</b><span>عربي وإنجليزي</span></div>
          </div>
        </div>
        <div className="courses-hero-art" aria-hidden="true">
          <div className="learning-orbit orbit-a"/><div className="learning-orbit orbit-b"/>
          <div className="learning-core"><GraduationCap size={62}/></div>
          <span className="orbit-chip chip-gpt">ChatGPT</span><span className="orbit-chip chip-gemini">Gemini</span><span className="orbit-chip chip-claude">Claude</span>
        </div>
      </section>

      <section className="start-section">
        <div className="section-intro"><span>ابدأ من هنا</span><h2>مسار مقترح للمبتدئين</h2><p>مش محتاج تبدأ بكل الأدوات مرة واحدة. امشِ بالترتيب ده، وبعدها اختار التخصص اللي يناسبك.</p></div>
        <div className="start-grid">
          <article className="start-card main-start">
            <div className="start-label"><span>01</span><b>بداية عربية سهلة</b></div>
            <h3>أساسيات الذكاء الاصطناعي وChatGPT</h3>
            <p>ابدأ بكورس عربي يشرح المفاهيم وأول محادثة واختيار المساعد المناسب.</p>
            <div className="start-meta"><span><Languages size={14}/> العربية</span><span><Clock3 size={14}/> ساعتان</span><span><CheckCircle2 size={14}/> مجاني</span></div>
            <a href="https://hala.academy/courses/foundations" target="_blank" rel="noreferrer">ابدأ الكورس <ArrowUpRight size={16}/></a>
          </article>
          <article className="start-card">
            <div className="start-label"><span>02</span><b>أساسيات موثوقة</b></div>
            <h3>AI Foundations</h3>
            <p>راجع مبادئ AI وصياغة الطلبات والتأكد من جودة النتائج من أكاديمية OpenAI.</p>
            <div className="start-meta"><span><Clock3 size={14}/> 60–75 دقيقة</span><span><CheckCircle2 size={14}/> مجاني</span></div>
            <a href="https://academy.openai.com/public/courses" target="_blank" rel="noreferrer">اعرض الدورات <ArrowUpRight size={16}/></a>
          </article>
          <article className="start-card">
            <div className="start-label"><span>03</span><b>اتقن طريقة الطلب</b></div>
            <h3>AI Prompting for Everyone</h3>
            <p>تعلم توجيه ChatGPT وGemini وClaude للبحث والكتابة والتفكير وإنشاء المحتوى.</p>
            <div className="start-meta"><span><Clock3 size={14}/> 3 ساعات تقريبًا</span><span>مبتدئ</span></div>
            <a href="https://www.deeplearning.ai/courses/ai-prompting-for-everyone" target="_blank" rel="noreferrer">اعرض الكورس <ArrowUpRight size={16}/></a>
          </article>
        </div>
        <p className="start-note">بعد المسار ده، ادخل على كورس الأداة اللي هتستخدمها باستمرار: ChatGPT أو Gemini أو Claude. لغة الدروس وشروط التسجيل موضحة في صفحة كل جهة.</p>
      </section>

      <section className="catalog-section" id="catalog">
        <div className="section-intro catalog-intro"><span>دليل الكورسات</span><h2>اختار هتتعلم إيه</h2><p>ابحث باسم الأداة أو الموضوع، وصفّي النتائج حسب المجال. اضغط على الكورس للانتقال إلى موقعه الأصلي.</p></div>
        <div className="catalog-controls">
          <label className="course-search"><Search size={19}/><input value={query} onChange={e=>{setQuery(e.target.value);setShowAll(false);}} placeholder="ابحث عن ChatGPT أو Gemini أو Claude أو أساسيات AI..."/></label>
          <label className="free-filter"><input type="checkbox" checked={onlyFree} onChange={e=>{setOnlyFree(e.target.checked);setShowAll(false);}}/> المجاني فقط</label>
        </div>
        <div className="topic-tabs" role="group" aria-label="تصنيف الكورسات">
          {topics.map(t=><button key={t} onClick={()=>{setTopic(t);setShowAll(false);}} className={topic===t?"active":""}>{t}</button>)}
        </div>
        <div className="catalog-result"><span><Filter size={15}/> {filtered.length} نتيجة</span><small>الترشيحات مرتبة لتسهيل بداية التعلم، وليست ترتيبًا عالميًا.</small></div>
        {visible.length ? <div className="course-grid">
          {visible.map(c=>{
            const Icon=c.icon;
            return <article className="course-card" key={c.id}>
              <div className="course-card-top"><span className="provider-mark"><Icon size={20}/></span><span className={c.official?"official-tag":"independent-tag"}>{c.official?"مصدر رسمي":"منصة مستقلة"}</span></div>
              <div className="course-provider">{c.provider}</div>
              <h3>{c.title}</h3>
              <p className="course-description">{c.description}</p>
              <div className="course-takeaway"><Target size={15}/><span>{c.takeaway}</span></div>
              <div className="course-meta">
                <span><GraduationCap size={14}/>{c.level}</span>
                <span><Clock3 size={14}/>{c.duration}</span>
              </div>
              <div className="course-bottom">
                <div><b>{c.price}</b><small><Languages size={13}/>{c.language}</small></div>
                <a href={c.href} target="_blank" rel="noreferrer">افتح الكورس <ArrowUpRight size={16}/></a>
              </div>
            </article>;
          })}
        </div> : <div className="no-courses"><Search size={27}/><b>مفيش كورسات مطابقة</b><p>جرّب كلمة بحث مختلفة أو اختار تصنيف تاني.</p><button onClick={()=>{setTopic("الكل");setQuery("");setOnlyFree(false);}}>عرض كل الكورسات</button></div>}
        {filtered.length>8 && <div className="show-more-wrap"><button onClick={()=>setShowAll(v=>!v)}>{showAll?"عرض عدد أقل":"عرض باقي الكورسات"} <ArrowLeft size={16}/></button></div>}
      </section>

      <section className="hubs-section" id="learning-hubs">
        <div className="section-intro"><span>مواقع وأكاديميات</span><h2>مصادر تتعلم منها باستمرار</h2><p>بعضها يقدم كورسات كاملة، وبعضها مكتبات شرح رسمية لطريقة استخدام التطبيق وخصائصه.</p></div>
        <div className="hub-grid">
          {learningHubs.map((h)=><article className="hub-card" key={h.name}>
            <div><span className="hub-icon"><Library size={19}/></span><small>{h.type}</small></div>
            <h3>{h.name}</h3><label>{h.by}</label><p>{h.what}</p><footer><span>{h.lang}</span><a href={h.url} target="_blank" rel="noreferrer">زيارة المصدر <ExternalLink size={14}/></a></footer>
          </article>)}
        </div>
      </section>

      <section className="course-guidance">
        <div><CheckCircle2 size={23}/><b>قبل ما تبدأ أي كورس</b></div>
        <p>راجع تاريخ تحديث الدورة، واللغة، وهل الشهادة مجانية أم مدفوعة. بعض الأكاديميات تتيح مشاهدة المحتوى مجانًا بينما تفرض رسومًا على الشهادة أو بعض الأنشطة. لا تعتبر أي شهادة إتمام مساوية لاعتماد مهني إلا لو الجهة توضح ذلك صراحة.</p>
      </section>
      <footer className="courses-footer"><span>AI HUB • مكتبة كورسات الذكاء الاصطناعي</span><span>روابط خارجية إلى الجهات التعليمية الأصلية • آخر مراجعة: 5 نوفمبر 2026</span></footer>
    </main>
  );
}
