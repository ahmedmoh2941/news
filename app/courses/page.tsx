"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft, ArrowUpRight, Award, BookOpen, Bot, BrainCircuit, CheckCircle2,
  Clock3, Code2, ExternalLink, Filter, GraduationCap, Languages, Layers3,
  Library, PlayCircle, Search, Sparkles, Target, WandSparkles, Workflow
} from "lucide-react";
import "./courses.css";

type Topic = "أساسيات AI" | "ChatGPT" | "Gemini" | "Claude" | "NotebookLM" | "Copilot" | "Perplexity" | "صور وفيديو" | "العمل والإنتاجية" | "البرمجة والنماذج" | "الأتمتة";
type Course = {
  id: string; title: string; provider: string; topic: Topic; level: string;
  duration: string; price: string; language: string; description: string;
  takeaway: string; href: string; official: boolean; icon: LucideIcon;
};

const courses: Course[] = [
  {
    id:"chatgpt-ar-video", title:"ChatGPT من الصفر إلى الاستخدام العملي", provider:"فتحي وأبوسريع – YouTube",
    topic:"ChatGPT", level:"مبتدئ", duration:"حوالي ساعة ونصف", price:"مجاني • فيديو",
    language:"العربية", description:"شرح عملي للواجهة والحساب والنماذج ورفع الملفات والصوت والمشروعات وكتابة الأوامر واستخدامات الدراسة والعمل.",
    takeaway:"بداية عربية عملية؛ راجع اختلاف أسماء الخصائص حسب تحديث التطبيق.", href:"https://www.youtube.com/watch?v=kELkBDg_uyo", official:false, icon:PlayCircle
  },
  {
    id:"openai-foundations", title:"AI Foundations – أساسيات الذكاء الاصطناعي", provider:"OpenAI Academy",
    topic:"أساسيات AI", level:"مبتدئ", duration:"60–75 دقيقة", price:"مجاني",
    language:"تحقق من لغة الدروس داخل الدورة", description:"أساسيات الذكاء الاصطناعي، كتابة أوامر أوضح، إضافة السياق، مراجعة المخرجات والاستخدام المسؤول.",
    takeaway:"ابدأ به لفهم الأساسيات قبل التعمق في أداة واحدة.", href:"https://academy.openai.com/public/courses/ai-foundations-dnq5w", official:true, icon:BrainCircuit
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
    takeaway:"درس قصير مناسب كبداية سريعة.", href:"https://ai.google/learn-ai-skills/", official:true, icon:Sparkles
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
    topic:"ChatGPT", level:"مبتدئ", duration:"3 ساعات و4 دقائق • 21 فيديو", price:"التسجيل مجاني؛ بعض المختبرات والشهادة ضمن PRO",
    language:"الإنجليزية", description:"21 درس فيديو عن البحث والكتابة والتفكير مع المساعد والعمل بالصور والبيانات وبناء تطبيقات بسيطة.",
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
    takeaway:"مناسب لمن يستخدم تطبيقات Google في العمل.", href:"https://www.skills.google/paths/249/course_templates/888", official:true, icon:Layers3
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
  },
  {
    id:"grok-guide", title:"Grok 4.7 – دليل الاستخدام الرسمي", provider:"xAI Documentation",
    topic:"البرمجة والنماذج", level:"مبتدئ", duration:"دليل مرجعي", price:"مجاني",
    language:"الإنجليزية", description:"شرح استخدام Grok للمحادثة والبحث وإنشاء الصور والفيديو والصوت ورفع الملفات وربط الأدوات.",
    takeaway:"مرجع رسمي لتعلم التطبيق ومراجعة خصائصه الحالية.", href:"https://docs.x.ai/grok/overview", official:true, icon:Bot
  },
  {
    id:"qwen-api-video", title:"How to Use Qwen 3.8 Max API – Step by Step", provider:"OTorresDev – YouTube",
    topic:"البرمجة والنماذج", level:"متوسط", duration:"فيديو تطبيقي", price:"مجاني على YouTube؛ API قد يكون مدفوعًا",
    language:"الإنجليزية", description:"إنشاء مشروع JavaScript وربط Qwen3.8-Max عبر API وOpenAI SDK وإرسال أول طلب.",
    takeaway:"مناسب للمطورين، وليس كورسًا عامًا للمستخدم العادي.", href:"https://www.youtube.com/watch?v=AYfShtysvm8", official:false, icon:PlayCircle
  },
  {
    id:"qwen-docs", title:"Qwen3.8 – الدليل الرسمي للنماذج", provider:"Qwen / QwenCloud",
    topic:"البرمجة والنماذج", level:"متوسط", duration:"توثيق وأمثلة API", price:"الوثائق مجانية؛ استخدام API حسب الأسعار والمنطقة",
    language:"الإنجليزية", description:"مواصفات Qwen3.8-Max وFlash، السياق، الاستدلال، الرؤية، استدعاء الأدوات وطرق الدمج.",
    takeaway:"اعتمد على التوثيق الرسمي لتأكيد أسماء النماذج والإتاحة والسعر.", href:"https://docs.qwencloud.com/changelog/models", official:true, icon:Code2
  },
  {
    id:"meta-muse-build", title:"Build and Deploy with Muse Spark", provider:"Meta Connect – Session",
    topic:"البرمجة والنماذج", level:"متوسط إلى متقدم", duration:"جلسة فيديو تقنية", price:"مجاني",
    language:"الإنجليزية", description:"جلسة تطبيقية عن Muse Code وMeta Model API ومسارات الدمج والنشر وتحويل النموذج إلى تطبيق عملي.",
    takeaway:"مصدر مناسب للمطورين بعد فهم أساسيات النماذج وواجهات API.", href:"https://developers.meta.com/resources/videos/build-and-deploy-with-muse-spark/", official:true, icon:PlayCircle
  },
  {
    id:"meta-muse-docs", title:"Muse Spark Open – Quickstart & Prompting Guide", provider:"Meta Model API",
    topic:"البرمجة والنماذج", level:"متوسط إلى متقدم", duration:"دليل ومختبرات قصيرة", price:"الوثائق مجانية؛ الاستضافة والـ API حسب المزود",
    language:"الإنجليزية", description:"أول طلب API، كتابة System Prompts، ضبط الاستدلال، استدعاء الأدوات، وفهم الصور والفيديو والصوت.",
    takeaway:"مرجع رسمي لاستخدام النموذج المفتوح عبر مزود مستضاف أو بنية ذاتية.", href:"https://dev.meta.ai/docs/overview", official:true, icon:Code2
  },
  {
    id:"deepseek-v41-video", title:"DeepSeek V4.1 Flash – Setup and API Tutorial", provider:"Akash Singh – YouTube",
    topic:"البرمجة والنماذج", level:"متوسط", duration:"فيديو تطبيقي قصير", price:"مجاني على YouTube؛ بعض المنصات لها حدود أو رسوم",
    language:"الإنجليزية", description:"شرح خطوة بخطوة لبدء استخدام DeepSeek V4.1 Flash وربطه بأدوات ومهام برمجية عبر API.",
    takeaway:"الفيديو يشرح منصة وسيطة؛ راجع أسعار DeepSeek API الأصلية قبل الاعتماد عليها.", href:"https://www.youtube.com/watch?v=Rimpba7xd_k", official:false, icon:PlayCircle
  },
  {
    id:"mistral-workflows", title:"Build your First Workflow with Mistral", provider:"Mistral Learn",
    topic:"الأتمتة", level:"متوسط", duration:"فيديو 5 دقائق و42 ثانية", price:"مجاني للمشاهدة؛ تشغيل المنصة حسب الخطة",
    language:"الإنجليزية", description:"عرض عملي لبناء أول Workflow باستخدام Mistral Python SDK وتنظيم تنفيذ مهام AI ومتابعتها.",
    takeaway:"مدخل تطبيقي إلى منظومة Mistral Workflows.", href:"https://learn.mistral.ai/", official:true, icon:Workflow
  },
];


type VideoLanguage = "الكل" | "العربية" | "الإنجليزية";
type VideoTool = "الكل" | "ChatGPT" | "Gemini" | "Claude" | "NotebookLM" | "Copilot" | "Perplexity" | "Grok" | "Qwen" | "Meta" | "DeepSeek" | "Mistral" | "صور وفيديو" | "برمجة وأتمتة";
const videoCourses = [
 {id:"chatgpt-ar",tool:"ChatGPT",title:"ChatGPT من الصفر إلى الاستخدام العملي",creator:"فتحي وأبوسريع – YouTube",lang:"العربية",level:"مبتدئ",duration:"حوالي 1.5 ساعة",access:"مجاني على YouTube",kind:"فيديو كامل",description:"شرح الحساب والواجهة والنماذج ورفع الملفات والصوت والمشروعات وكتابة Prompts واستخدامات الدراسة والعمل.",href:"https://www.youtube.com/watch?v=kELkBDg_uyo"},
 {id:"openai-ar",tool:"ChatGPT",title:"انطلق مع ChatGPT – الدليل الرسمي",creator:"OpenAI Academy",lang:"العربية",level:"مبتدئ",duration:"شرح تمهيدي",access:"مجاني",kind:"دورة منظمة",description:"أول محادثة واستكشاف واجهة ChatGPT من شرح رسمي عربي.",href:"https://openai.com/ar/academy/getting-started/"},
 {id:"openai-using",tool:"ChatGPT",title:"Using ChatGPT – من الأساسيات إلى الأدوات",creator:"OpenAI Academy",lang:"الإنجليزية",level:"مبتدئ إلى متقدم",duration:"مسار من دروس قصيرة",access:"مجاني",kind:"دليل رسمي",description:"مهارات المحادثة وكتابة الأوامر وتخصيص ChatGPT والعمل مع الملفات والبحث والمهام.",href:"https://openai.com/academy/using-chatgpt/"},
 {id:"openai-videos",tool:"ChatGPT",title:"ChatGPT Learn – فيديوهات الميزات الجديدة",creator:"OpenAI",lang:"الإنجليزية",level:"مبتدئ إلى متقدم",duration:"فيديوهات قصيرة متجددة",access:"مجاني",kind:"دليل رسمي",description:"عروض عملية لخصائص ChatGPT وCodex وسير العمل الجديد، وتحديثات الفيديو عند صدورها.",href:"https://learn.chatgpt.com/videos"},
 {id:"gemini-ar",tool:"Gemini",title:"دليلك الشامل لتعلم Gemini 2026",creator:"احتراف البرامج – YouTube",lang:"العربية",level:"مبتدئ إلى متوسط",duration:"كورس فيديو شامل",access:"مجاني على YouTube",kind:"فيديو كامل",description:"شرح واجهة Gemini وأدواته وطرق استخدامه، من الصفر إلى استخدام أكثر تقدمًا.",href:"https://www.youtube.com/watch?v=JxUaznXmn5w"},
 {id:"gemini-google-skills",tool:"Gemini",title:"Google Workspace with Gemini: Foundations",creator:"Google Skills",lang:"الإنجليزية",level:"مبتدئ",duration:"30 دقيقة",access:"مسار رسمي؛ تحقق من شروط الشارة",kind:"دورة منظمة",description:"أساسيات استخدام Gemini داخل Gmail وDocs وSlides وSheets ورفع الإنتاجية.",href:"https://www.skills.google/paths/249/course_templates/888"},
 {id:"gemini-help-ar",tool:"Gemini",title:"مركز مساعدة Gemini بالعربية",creator:"Google",lang:"العربية",level:"مبتدئ إلى متقدم",duration:"دروس حسب الخاصية",access:"مجاني",kind:"دليل رسمي",description:"شرح الصور والفيديو وCanvas وDeep Research والاختبارات والخصائص التعليمية الجديدة.",href:"https://support.google.com/gemini/?hl=ar"},
 {id:"claude-ar",tool:"Claude",title:"Claude من الصفر – كورس عربي",creator:"غريب الشيخ – YouTube",lang:"العربية",level:"مبتدئ إلى متوسط",duration:"كورس كامل بفصول",access:"مجاني على YouTube",kind:"فيديو كامل",description:"شرح عملي للمحادثة وكتابة الأوامر وProjects وArtifacts وSkills واستخدام Claude في العمل.",href:"https://www.youtube.com/watch?v=oz44Wp22iCU"},
 {id:"claude101",tool:"Claude",title:"Claude 101",creator:"Claude Academy – Anthropic",lang:"الإنجليزية",level:"مبتدئ",duration:"ساعتان ونصف • 13 درسًا واختبار",access:"مجاني • شارة إتمام",kind:"دورة منظمة",description:"المسار الرسمي من المحادثة الأولى إلى Prompting وProjects وArtifacts وSkills والموصلات والبحث.",href:"https://academy.claude.com/courses/claude-101"},
 {id:"claudecode",tool:"Claude",title:"Claude Code 101",creator:"Claude Academy – Anthropic",lang:"الإنجليزية",level:"متوسط",duration:"ساعة ونصف • 12 درسًا",access:"مجاني • شارة إتمام",kind:"دورة منظمة",description:"تعلم فهم المشاريع البرمجية وتخطيط التغييرات وكتابة الكود ومراجعته.",href:"https://academy.claude.com/courses/claude-code-101"},
 {id:"claudecowork",tool:"Claude",title:"Introduction to Claude Cowork",creator:"Claude Academy – Anthropic",lang:"الإنجليزية",level:"مبتدئ إلى متوسط",duration:"ساعتان ونصف • 14 درسًا",access:"مجاني • شارة إتمام",kind:"دورة منظمة",description:"مسار رسمي لفهم تفويض المهام إلى Claude Cowork ومتابعة التنفيذ ومراجعة النتائج.",href:"https://academy.claude.com/courses"},
 {id:"notebooklm-full",tool:"NotebookLM",title:"How to Use Google NotebookLM – Full Tutorial",creator:"Kevin Stratvert – YouTube",lang:"الإنجليزية",level:"مبتدئ",duration:"فيديو كامل بفصول",access:"مجاني على YouTube",kind:"فيديو كامل",description:"إنشاء الدفاتر وإضافة PDF والمواقع والفيديوهات، وطرح الأسئلة مع الاقتباسات، وحفظ الملاحظات والخرائط الذهنية والملخصات الصوتية.",href:"https://www.youtube.com/watch?v=uSVBfyHBiDU"},
 {id:"notebooklm-ar",tool:"NotebookLM",title:"NotebookLM خطوة بخطوة بالعربي",creator:"Ahmed Salah | Doctors Academy",lang:"العربية",level:"مبتدئ",duration:"شرح بفصول",access:"مجاني للمشاهدة",kind:"فيديو كامل",description:"شرح عربي لإنشاء دفتر وإضافة ملفات PDF والمواقع وفيديوهات YouTube وطرح الأسئلة واستخراج إجابات مع المراجع.",href:"https://www.youtube.com/watch?v=UpCowqsBMWM"},
 {id:"copilot-video",tool:"Copilot",title:"Start using Microsoft Copilot",creator:"Microsoft Support",lang:"الإنجليزية",level:"مبتدئ",duration:"1 دقيقة و48 ثانية",access:"مجاني",kind:"فيديو كامل",description:"فيديو رسمي تمهيدي لبدء استخدام Copilot على الأجهزة المختلفة.",href:"https://support.microsoft.com/en-us/microsoft-365-copilot/copilot-tutorial-start-using-copilot"},
 {id:"copilot-hub",tool:"Copilot",title:"Microsoft Copilot Learning Hub",creator:"Microsoft",lang:"الإنجليزية",level:"مبتدئ إلى متوسط",duration:"مسارات ودروس متعددة",access:"مواد كثيرة مجانية",kind:"دليل رسمي",description:"تعلم Copilot Chat وكتابة الأوامر وتحليل البيانات والعروض والعمل داخل Word وExcel وPowerPoint وTeams.",href:"https://support.microsoft.com/en-us/microsoft-365-copilot/index"},
 {id:"perplexity-help",tool:"Perplexity",title:"Perplexity Help Center",creator:"Perplexity",lang:"الإنجليزية",level:"مبتدئ",duration:"أدلة قصيرة حسب الميزة",access:"مجاني",kind:"دليل رسمي",description:"تعلم البحث بالمصادر والاقتباسات ومراجعة الروابط والخصائص المتاحة.",href:"https://www.perplexity.ai/help-center"},
 {id:"runway-academy",tool:"صور وفيديو",title:"AI for Advertising – Runway Academy",creator:"Runway",lang:"الإنجليزية",level:"مبتدئ",duration:"10 وحدات تعليمية",access:"التسجيل مجاني",kind:"دورة منظمة",description:"إنشاء إعلان باستخدام الفيديو التوليدي من الفكرة إلى التنفيذ، مع مسار تطبيقي من أكاديمية Runway.",href:"https://academy.runway.com/courses"},
 {id:"midjourney-start",tool:"صور وفيديو",title:"Midjourney Getting Started",creator:"Midjourney",lang:"الإنجليزية",level:"مبتدئ",duration:"دليل وفيديوهات قصيرة",access:"الدليل مجاني؛ إنشاء الصور يتطلب اشتراكًا",kind:"دليل رسمي",description:"إنشاء أول صورة واستخدام Image Prompts وStyle References والتخصيص وتنظيم النتائج.",href:"https://docs.midjourney.com/hc/en-us/articles/33329261836941-Getting-Started-Guide"},
 {id:"canva-design",tool:"صور وفيديو",title:"AI Essentials 2026 – Canva Design School",creator:"Canva",lang:"الإنجليزية",level:"مبتدئ",duration:"ساعة واحدة",access:"حسب توفر الدورة والخطة",kind:"دورة منظمة",description:"مقدمة عملية إلى أدوات التصميم المدعومة بالذكاء الاصطناعي داخل Canva.",href:"https://www.canva.com/design-school/courses/"},
 {id:"cursor-learn",tool:"برمجة وأتمتة",title:"Cursor Learn – AI Foundations & Coding Agents",creator:"Cursor",lang:"الإنجليزية",level:"مبتدئ إلى متوسط",duration:"مسار تفاعلي بعدة فصول",access:"مجاني",kind:"دورة منظمة",description:"فهم النماذج والهلوسة والسياق والأدوات والوكلاء، ثم تطوير الميزات وإصلاح الأخطاء ومراجعة الكود.",href:"https://cursor.com/learn"},
 {id:"hf-agents",tool:"برمجة وأتمتة",title:"Hugging Face Agents Course",creator:"Hugging Face",lang:"الإنجليزية",level:"متوسط",duration:"وحدات تفاعلية ومشروع ختامي",access:"مجاني؛ يتضمن مسار شهادة",kind:"دورة منظمة",description:"مبادئ الوكلاء والأدوات وأطر smolagents وLangGraph وLlamaIndex وبناء مشروع عملي.",href:"https://huggingface.co/agents-course"},
 {id:"n8n-academy",tool:"برمجة وأتمتة",title:"n8n Academy – AI Automation",creator:"n8n",lang:"الإنجليزية",level:"مبتدئ إلى متقدم",duration:"4 دورات منظمة",access:"مجاني مع شهادات إتمام وشارات",kind:"دورة منظمة",description:"من أول Workflow وربط التطبيقات وواجهات API إلى بناء AI Agents واختبارها وتصحيحها.",href:"https://n8n.io/education/"},
 {id:"mistral-learn",tool:"برمجة وأتمتة",title:"Learn with Mistral AI",creator:"Mistral AI",lang:"الإنجليزية",level:"مبتدئ إلى متقدم",duration:"دورات وندوات وفيديوهات",access:"تختلف حسب المادة",kind:"دليل رسمي",description:"تعلم نماذج Mistral وStudio وVibe وWorkflows وتطبيقات المطورين.",href:"https://learn.mistral.ai/public/courses"},
 {id:"deepseek-docs",tool:"برمجة وأتمتة",title:"DeepSeek Developer Docs",creator:"DeepSeek",lang:"الإنجليزية",level:"متوسط",duration:"أدلة وأمثلة تطبيقية",access:"الدليل مجاني؛ استخدام API حسب الأسعار",kind:"دليل رسمي",description:"مقدمة إلى API والأمثلة البرمجية وبناء تطبيقات تعتمد على نماذج DeepSeek؛ مورد للمطورين وليس كورس محادثة عام.",href:"https://api-docs.deepseek.com/"},
 {id:"prompting-everyone",tool:"ChatGPT",title:"AI Prompting for Everyone",creator:"DeepLearning.AI – Andrew Ng",lang:"الإنجليزية",level:"مبتدئ",duration:"3 ساعات و4 دقائق • 21 فيديو",access:"التسجيل متاح مجانًا؛ بعض المختبرات والشهادة ضمن PRO",kind:"دورة منظمة",description:"استخدام AI للبحث والكتابة والتفكير والعمل بالصور والبيانات وبناء تطبيقات بسيطة.",href:"https://www.deeplearning.ai/courses/ai-prompting-for-everyone"},

 {id:"grok-47-guide",tool:"Grok",title:"Grok 4.7 – Official Product Guide",creator:"xAI Documentation",lang:"الإنجليزية",level:"مبتدئ",duration:"دليل مرجعي",access:"مجاني",kind:"دليل رسمي",description:"شرح المحادثة والبحث وإنشاء الصور والفيديو والصوت ورفع الملفات وربط الأدوات داخل Grok.",href:"https://docs.x.ai/grok/overview"},
 {id:"qwen-max-video",tool:"Qwen",title:"How to Use Qwen 3.8 Max API – Step by Step",creator:"OTorresDev – YouTube",lang:"الإنجليزية",level:"متوسط",duration:"فيديو تطبيقي",access:"مجاني على YouTube؛ API قد يكون مدفوعًا",kind:"فيديو كامل",description:"إنشاء مشروع JavaScript وربط Qwen3.8-Max عبر API وOpenAI SDK وإرسال أول طلب.",href:"https://www.youtube.com/watch?v=AYfShtysvm8"},
 {id:"qwen-docs-video",tool:"Qwen",title:"QwenCloud Model Changelog & API Guides",creator:"Qwen",lang:"الإنجليزية",level:"متوسط",duration:"توثيق وأمثلة",access:"الوثائق مجانية؛ استخدام API حسب الأسعار والمنطقة",kind:"دليل رسمي",description:"مواصفات Qwen3.8-Max وFlash والسياق والاستدلال والرؤية واستدعاء الأدوات وطرق الدمج.",href:"https://docs.qwencloud.com/changelog/models"},
 {id:"meta-muse-video",tool:"Meta",title:"Build and Deploy with Muse Spark",creator:"Meta Connect – Session",lang:"الإنجليزية",level:"متوسط إلى متقدم",duration:"جلسة فيديو تقنية",access:"مجاني",kind:"فيديو كامل",description:"جلسة تطبيقية عن Muse Code وMeta Model API ومسارات الدمج والنشر وتحويل النموذج إلى تطبيق عملي.",href:"https://developers.meta.com/resources/videos/build-and-deploy-with-muse-spark/"},
 {id:"meta-muse-guide",tool:"Meta",title:"Muse Spark Open – Quickstart & Prompting Guide",creator:"Meta Model API",lang:"الإنجليزية",level:"متوسط إلى متقدم",duration:"دليل ومختبرات قصيرة",access:"الوثائق مجانية؛ الاستضافة والـ API حسب المزود",kind:"دليل رسمي",description:"أول طلب API، كتابة System Prompts، ضبط الاستدلال، استدعاء الأدوات، وفهم الصور والفيديو والصوت.",href:"https://dev.meta.ai/docs/overview"},
 {id:"deepseek-flash-video",tool:"DeepSeek",title:"DeepSeek V4.1 Flash – Setup and API Tutorial",creator:"Akash Singh – YouTube",lang:"الإنجليزية",level:"متوسط",duration:"فيديو تطبيقي قصير",access:"مجاني على YouTube؛ بعض المنصات لها حدود أو رسوم",kind:"فيديو كامل",description:"شرح خطوة بخطوة لبدء استخدام DeepSeek V4.1 Flash وربطه بأدوات ومهام برمجية عبر API.",href:"https://www.youtube.com/watch?v=Rimpba7xd_k"},
 {id:"mistral-workflow-video",tool:"Mistral",title:"Build your First Workflow with Mistral",creator:"Mistral Learn",lang:"الإنجليزية",level:"متوسط",duration:"فيديو 5 دقائق و42 ثانية",access:"مجاني للمشاهدة؛ تشغيل المنصة حسب الخطة",kind:"فيديو كامل",description:"عرض عملي لبناء أول Workflow باستخدام Mistral Python SDK وتنظيم مهام AI.",href:"https://learn.mistral.ai/"}
];

const topics = ["الكل","أساسيات AI","ChatGPT","Gemini","Claude","NotebookLM","Copilot","Perplexity","صور وفيديو","العمل والإنتاجية","البرمجة والنماذج","الأتمتة"];
const learningHubs = [
  {name:"OpenAI Academy",by:"OpenAI",what:"دورات AI Foundations وChatGPT وAgents وCodex والتعليم.",type:"أكاديمية رسمية",lang:"يتوفر محتوى عربي؛ لغة كل دورة قد تختلف.",url:"https://academy.openai.com/pages/courses"},
  {name:"ChatGPT Learn",by:"OpenAI",what:"مكتبة فيديوهات قصيرة وعروض عملية لخصائص ChatGPT وCodex وسير العمل الجديد.",type:"فيديوهات رسمية",lang:"معظم الفيديوهات بالإنجليزية.",url:"https://learn.chatgpt.com/videos"},
  {name:"Claude Academy",by:"Anthropic",what:"Claude 101 وClaude Code وAI Fluency وMCP ودورات API.",type:"أكاديمية رسمية",lang:"المحتوى الظاهر حاليًا بالإنجليزية.",url:"https://academy.claude.com/courses"},
  {name:"Google AI Skills",by:"Google",what:"أساسيات AI وGemini وGoogle Workspace ومواد للمطورين.",type:"أكاديمية رسمية",lang:"تحقق من لغة كل مقرر.",url:"https://ai.google/learn-ai-skills/"},
  {name:"Gemini Apps Help",by:"Google",what:"شرح خصائص تطبيق Gemini: الملفات، الصور، البحث، الدفاتر، الإعدادات والخصوصية.",type:"دليل استخدام رسمي",lang:"يمكن تغيير لغة المساعدة من الموقع.",url:"https://support.google.com/gemini/"},
  {name:"DeepLearning.AI",by:"Andrew Ng وفريق متخصص",what:"كورسات قصيرة عن Prompting وGenAI وAgents وRAG والنماذج.",type:"منصة كورسات",lang:"معظم الكورسات بالإنجليزية.",url:"https://www.deeplearning.ai/courses/"},
  {name:"MaharaTech",by:"معهد تكنولوجيا المعلومات – مصر",what:"دورات عربية وتقنية في الذكاء الاصطناعي والتطوير والمهارات الرقمية.",type:"منصة تعلم مصرية",lang:"العربية متاحة في مقررات مختارة.",url:"https://maharatech.gov.eg/course/index.php?categoryid=5&lang=ar"},
  {name:"Hugging Face Learn",by:"Hugging Face",what:"مسارات LLM وAgents وComputer Vision وAudio والنماذج المفتوحة.",type:"تعلم تقني",lang:"الإنجليزية.",url:"https://huggingface.co/learn"},
  {name:"Microsoft Learn",by:"Microsoft",what:"وحدات قصيرة ومسارات في AI التوليدي وCopilot وAgents وAzure AI.",type:"منصة تعلم رسمية",lang:"بعض الصفحات تتوفر بلغات مختلفة؛ راجع إعداد اللغة.",url:"https://learn.microsoft.com/training/"},
  {name:"Elements of AI",by:"University of Helsinki / MinnaLearn",what:"مقرر تأسيسي لفهم الذكاء الاصطناعي وتعلم الآلة وتطبيقاته.",type:"مساق تأسيسي",lang:"تتوفر لغات متعددة؛ راجع جودة النسخة العربية.",url:"https://course.elementsofai.com/"},
  {name:"Google Skills",by:"Google Cloud",what:"مسارات عملية ومختبرات وشارات مهارية مرتبطة بـ Gemini وVertex AI.",type:"تعلم ومختبرات",lang:"لغة كل نشاط موضحة داخل المسار.",url:"https://www.skills.google/"},

  {name:"NotebookLM Help",by:"Google",what:"شرح إضافة المصادر وإنشاء الدفاتر والملخصات والمراجع والميزات الجديدة.",type:"دليل رسمي",lang:"العربية متاحة لبعض المقالات.",url:"https://support.google.com/notebooklm/?hl=ar"},
  {name:"Perplexity Help Center",by:"Perplexity",what:"شرح البحث بالمصادر وSpaces والملفات والخصائص المتاحة.",type:"دليل رسمي",lang:"الإنجليزية.",url:"https://www.perplexity.ai/help-center"},
  {name:"Microsoft Copilot Learning",by:"Microsoft",what:"مسارات Copilot Chat وكتابة الأوامر وتحليل البيانات والعمل مع تطبيقات Microsoft 365.",type:"مركز تعلم رسمي",lang:"اللغة تختلف حسب المسار.",url:"https://support.microsoft.com/en-us/microsoft-365-copilot/index"},
  {name:"Runway Academy",by:"Runway",what:"دورات وفيديوهات حديثة لصناعة الفيديو والإعلانات والتحريك وسير العمل.",type:"أكاديمية رسمية",lang:"الإنجليزية.",url:"https://academy.runway.com/courses"},
  {name:"Canva Design School",by:"Canva",what:"دورات AI Essentials وWork smarter with AI والتصميم والعروض.",type:"أكاديمية رسمية",lang:"تحقق من لغة الدورة.",url:"https://www.canva.com/design-school/courses/"},
  {name:"Cursor Learn",by:"Cursor",what:"دروس AI Foundations وCoding Agents وفهم المشاريع وإصلاح الأخطاء.",type:"مسار تفاعلي رسمي",lang:"الإنجليزية.",url:"https://cursor.com/learn"},
  {name:"n8n Academy",by:"n8n",what:"دورات عملية مجانية في الأتمتة وربط التطبيقات والوكلاء مع شارات إتمام.",type:"أكاديمية رسمية",lang:"الإنجليزية.",url:"https://n8n.io/education/"},
  {name:"Mistral Learn",by:"Mistral AI",what:"دورات وندوات ومواد تعلم عن نماذج Mistral وStudio وVibe.",type:"أكاديمية رسمية",lang:"الإنجليزية.",url:"https://learn.mistral.ai/public/courses"},
  {name:"DeepSeek API Docs",by:"DeepSeek",what:"أدلة API وتحديثات النماذج وأمثلة للمطورين.",type:"وثائق رسمية",lang:"الإنجليزية.",url:"https://api-docs.deepseek.com/"},
  {name:"Midjourney Documentation",by:"Midjourney",what:"دليل إنشاء الصور والفيديو والتخصيص وكتابة الأوامر.",type:"وثائق رسمية",lang:"الإنجليزية.",url:"https://docs.midjourney.com/"},
  {name:"Grok Help & Docs",by:"xAI",what:"شرح Grok للمحادثة والبحث والصور والفيديو والصوت والملفات والموصلات.",type:"دليل رسمي",lang:"الإنجليزية.",url:"https://docs.x.ai/grok/overview"},
  {name:"QwenCloud Docs",by:"Alibaba Qwen",what:"توثيق النماذج وتحديثات الإصدارات والواجهات والسياق والأسعار والإتاحة الإقليمية.",type:"وثائق رسمية",lang:"الإنجليزية.",url:"https://docs.qwencloud.com/changelog/models"},
  {name:"Meta Model API",by:"Meta",what:"Quickstarts وCookbooks وMuse Spark وMuse Spark Open وMuse Code وأدلة الصور والفيديو والصوت.",type:"دليل ومختبرات رسمية",lang:"الإنجليزية.",url:"https://dev.meta.ai/docs/overview"}

];

export default function CoursesPage() {
  const [topic,setTopic] = useState("الكل");
  const [query,setQuery] = useState("");
  const [showAll,setShowAll] = useState(false);
  const [onlyFree,setOnlyFree] = useState(false);
  const [videoLanguage,setVideoLanguage] = useState<VideoLanguage>("الكل");
  const [videoTool,setVideoTool] = useState<VideoTool>("الكل");
  const filteredVideoCourses = videoCourses.filter(v => (videoLanguage === "الكل" || v.lang === videoLanguage) && (videoTool === "الكل" || v.tool === videoTool));
  const topicPriority: Record<Topic, number> = {
    "أساسيات AI": 0, "Gemini": 1, "Claude": 2, "NotebookLM": 3, "Copilot": 4,
    "Perplexity": 5, "صور وفيديو": 6, "العمل والإنتاجية": 7, "ChatGPT": 8,
    "البرمجة والنماذج": 9, "الأتمتة": 10
  };
  const filtered = useMemo(() => courses.filter(c => {
    const text = [c.title,c.provider,c.description,c.topic,c.level,c.language].join(" ").toLowerCase();
    return (topic === "الكل" || c.topic === topic) && text.includes(query.toLowerCase()) &&
      (!onlyFree || c.price.toLowerCase().includes("مجاني") || c.price.toLowerCase().includes("free"));
  }).sort((a,b)=>topicPriority[a.topic]-topicPriority[b.topic]),[topic,query,onlyFree]);
  const visible = showAll ? filtered : filtered.slice(0,8);

  return (
    <main className="courses-page" dir="rtl">
      <header className="courses-topbar">
        <a className="courses-brand" href="/"><span><BrainCircuit size={24}/></span><b>AI HUB <small>LEARNING</small></b></a>
        <nav><a href="/">الرئيسية</a><a href="/models">النماذج والتطبيقات</a><a href="/guide">دليل الاستخدام</a><a href="/lessons">Prompts</a></nav>
        <a className="topbar-back" href="/"><ArrowLeft size={16}/> الرجوع للموقع</a>
      </header>

      <section className="courses-hero">
        <div className="courses-hero-copy">
          <div className="courses-kicker"><Sparkles size={15}/> مكتبة تعلم الذكاء الاصطناعي</div>
          <h1>اتعلّم AI من <em>الصفر إلى التطبيق</em></h1>
          <p>كورسات مختارة لتتعلم أساسيات الذكاء الاصطناعي، وتستخدم ChatGPT وGemini وClaude، وتكتشف أدوات ونماذج جديدة خطوة بخطوة.</p>
          <div className="courses-hero-actions">
            <a href="#top-paths">أفضل المسارات <Award size={16}/></a>
            <a className="secondary" href="#video-paths">كورسات الفيديو <PlayCircle size={16}/></a>
            <a className="secondary" href="#catalog">كل المسارات <ArrowLeft size={16}/></a>
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


      <section className="top-paths-section" id="top-paths">
        <div className="section-intro">
          <span><Award size={14}/> أفضل ترشيحات البداية</span>
          <h2>ابدأ بأقوى مسار لكل منصة</h2>
          <p>ترشيحات تحريرية مبنية على وضوح الشرح ووجود محتوى رسمي أو تطبيقي حديث؛ ليست ترتيبًا مطلقًا للنماذج أو تقييمًا مدفوعًا.</p>
        </div>
        <div className="top-paths-grid">
          <article className="top-path-card top-choice"><div className="top-path-rank">01 · البداية العامة</div><h3>أساسيات AI وPrompting</h3><p>افهم كيف تتعامل مع أي مساعد قبل أن تتخصص في تطبيق معين.</p><small>OpenAI Academy + DeepLearning.AI</small><a href="https://academy.openai.com/public/courses/ai-foundations-dnq5w" target="_blank" rel="noreferrer">ابدأ المسار <ArrowUpRight size={15}/></a></article>
          <article className="top-path-card"><div className="top-path-rank">02 · ChatGPT</div><h3>ChatGPT من الأساسيات للأدوات</h3><p>محادثة وملفات وبحث وميزات حديثة وشرح عربي تمهيدي.</p><small>OpenAI Academy + ChatGPT Learn</small><a href="https://openai.com/ar/academy/getting-started/" target="_blank" rel="noreferrer">ابدأ ChatGPT <ArrowUpRight size={15}/></a></article>
          <article className="top-path-card"><div className="top-path-rank">03 · Gemini</div><h3>Gemini وتطبيقات Google</h3><p>كورس عربي شامل، ثم مسار Google الرسمي للعمل داخل Workspace.</p><small>احتراف البرامج + Google Skills</small><a href="https://www.youtube.com/watch?v=JxUaznXmn5w" target="_blank" rel="noreferrer">شاهد كورس Gemini <ArrowUpRight size={15}/></a></article>
          <article className="top-path-card"><div className="top-path-rank">04 · Claude</div><h3>Claude وCowork وClaude Code</h3><p>ابدأ بالدورة الرسمية ثم انتقل إلى العمل الوكيلي أو البرمجة.</p><small>Claude Academy + شرح عربي</small><a href="https://academy.claude.com/courses/claude-101" target="_blank" rel="noreferrer">ابدأ Claude 101 <ArrowUpRight size={15}/></a></article>
          <article className="top-path-card"><div className="top-path-rank">05 · NotebookLM</div><h3>المذاكرة والبحث من ملفاتك</h3><p>حوّل PDF ومصادر الكورس وفيديوهات YouTube إلى دفتر بحث ومراجعة.</p><small>Google NotebookLM + Kevin Stratvert</small><a href="https://www.youtube.com/watch?v=uSVBfyHBiDU" target="_blank" rel="noreferrer">شاهد الشرح الكامل <ArrowUpRight size={15}/></a></article>
          <article className="top-path-card"><div className="top-path-rank">06 · Copilot</div><h3>AI داخل تطبيقات Microsoft</h3><p>تعلم استخدام Copilot في Word وExcel وPowerPoint وTeams.</p><small>Microsoft Copilot Learning</small><a href="https://support.microsoft.com/en-us/microsoft-365-copilot/index" target="_blank" rel="noreferrer">ابدأ Copilot <ArrowUpRight size={15}/></a></article>
          <article className="top-path-card"><div className="top-path-rank">07 · الصور والفيديو</div><h3>التصميم والفيديو بالذكاء الاصطناعي</h3><p>تعلم Runway وMidjourney وCanva من أكاديمياتها ومصادرها.</p><small>Runway Academy + Midjourney + Canva</small><a href="https://academy.runway.com/courses" target="_blank" rel="noreferrer">استكشف أكاديمية الفيديو <ArrowUpRight size={15}/></a></article>
          <article className="top-path-card"><div className="top-path-rank">08 · البرمجة والأتمتة</div><h3>Agents وCoding وWorkflows</h3><p>Cursor وHugging Face وn8n لبناء مشاريع وأتمتة خطوات فعلية.</p><small>Cursor Learn + Hugging Face + n8n</small><a href="https://n8n.io/education/" target="_blank" rel="noreferrer">ابدأ الأتمتة <ArrowUpRight size={15}/></a></article>
        </div>
      </section>
      <section className="start-section">
        <div className="section-intro"><span>ابدأ من هنا</span><h2>مسار مقترح للمبتدئين</h2><p>مش محتاج تبدأ بكل الأدوات مرة واحدة. امشِ بالترتيب ده، وبعدها اختار التخصص اللي يناسبك.</p></div>
        <div className="start-grid">
          <article className="start-card main-start">
            <div className="start-label"><span>01</span><b>ابدأ بفهم المجال</b></div>
            <h3>AI Foundations – أساسيات الذكاء الاصطناعي</h3>
            <p>مسار تأسيسي من OpenAI يشرح المفاهيم الأساسية وكتابة الأوامر والسياق ومراجعة النتائج. لغة الدورة قد تختلف داخل صفحة التسجيل.</p>
            <div className="start-meta"><span><Clock3 size={14}/> 60–75 دقيقة</span><span><CheckCircle2 size={14}/> مجاني</span></div>
            <a href="https://academy.openai.com/public/courses/ai-foundations-dnq5w" target="_blank" rel="noreferrer">ابدأ الأساسيات <ArrowUpRight size={16}/></a>
          </article>
          <article className="start-card">
            <div className="start-label"><span>02</span><b>جرّب نموذجًا مختلفًا</b></div>
            <h3>Gemini من الصفر إلى الاستخدام العملي</h3>
            <p>شرح عربي لواجهة Gemini، مع مسار Google الرسمي لاستخدامه في Gmail وDocs وSlides وSheets.</p>
            <div className="start-meta"><span><Languages size={14}/> العربية + مسار إنجليزي رسمي</span><span><PlayCircle size={14}/> فيديو مجاني</span></div>
            <a href="https://www.youtube.com/watch?v=JxUaznXmn5w" target="_blank" rel="noreferrer">شاهد شرح Gemini <ArrowUpRight size={16}/></a>
          </article>
          <article className="start-card">
            <div className="start-label"><span>03</span><b>تعرّف على Claude</b></div>
            <h3>Claude 101</h3>
            <p>دورة مجانية رسمية من Anthropic عن المحادثة وPrompting وProjects وArtifacts وSkills والبحث.</p>
            <div className="start-meta"><span><Clock3 size={14}/> ساعتان ونصف</span><span><CheckCircle2 size={14}/> شارة إتمام</span><span>إنجليزي</span></div>
            <a href="https://academy.claude.com/courses/claude-101" target="_blank" rel="noreferrer">ابدأ Claude 101 <ArrowUpRight size={16}/></a>
          </article>
        </div>
        <p className="start-note">بعد المسار ده، ادخل على كورس الأداة اللي هتستخدمها باستمرار: ChatGPT أو Gemini أو Claude. لغة الدروس وشروط التسجيل موضحة في صفحة كل جهة.</p>
      </section>


      <section className="video-paths-section" id="video-paths">
        <div className="section-intro">
          <span><PlayCircle size={14}/> كورسات فيديو مختارة</span>
          <h2>اتفرج واتعلم خطوة بخطوة</h2>
          <p>دورات فيديو طويلة وشروحات عملية، مرتبة من البداية إلى التخصص. بعض البطاقات تفتح فيديو مباشرًا، وبعضها دورة تفاعلية أو صفحة ملخص لفيديو.</p>
        </div>
        <div className="video-filter-block">
          <span>اختر المنصة</span>
          <div className="video-language-tabs">
            {(["الكل","ChatGPT","Gemini","Claude","NotebookLM","Copilot","Perplexity","Grok","Qwen","Meta","DeepSeek","Mistral","صور وفيديو","برمجة وأتمتة"] as VideoTool[]).map(t=><button key={t} onClick={()=>setVideoTool(t)} className={videoTool===t?"active":""}>{t}</button>)}
          </div>
          <span>لغة المحتوى</span>
          <div className="video-language-tabs">
            {(["الكل","العربية","الإنجليزية"] as VideoLanguage[]).map(l=><button key={l} onClick={()=>setVideoLanguage(l)} className={videoLanguage===l?"active":""}>{l}</button>)}
          </div>
        </div>
        <div className="video-course-grid">
          {filteredVideoCourses.map(v=><article className="video-course-card" key={v.id}>
            <div className="video-course-head">
              <span className="video-play-icon"><PlayCircle size={23}/></span>
              <span className={v.kind==="فيديو كامل"?"video-kind direct":v.kind==="شرح مع ملخص"?"video-kind notes":v.kind==="دليل رسمي"?"video-kind official":"video-kind structured"}>{v.kind}</span>
            </div>
            <small className="video-creator">{v.creator}</small>
            <h3>{v.title}</h3>
            <p>{v.description}</p>
            <div className="video-course-meta"><span><Languages size={14}/>{v.lang}</span><span><GraduationCap size={14}/>{v.level}</span><span><Clock3 size={14}/>{v.duration}</span></div>
            <div className="video-course-bottom"><b>{v.access}</b><a href={v.href} target="_blank" rel="noreferrer">{v.kind==="فيديو كامل"?"شاهد الفيديو":v.kind==="شرح مع ملخص"?"افتح الشرح":v.kind==="دليل رسمي"?"افتح الدليل":"افتح الدورة"} <ArrowUpRight size={16}/></a></div>
          </article>)}
        </div>
        <p className="video-disclaimer">ملحوظة: روابط YouTube مجانية للمشاهدة، أما منصات الكورسات فقد تتيح التسجيل مجانًا مع رسوم لبعض الشهادات أو المزايا. الترجمة التلقائية ليست ترجمة عربية أصلية. راجع تاريخ تحديث كل دورة قبل الاعتماد على شرح خصائص الواجهة.</p>
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


      <section className="fresh-learning-section" id="fresh-learning">
        <div className="section-intro">
          <span><Sparkles size={14}/> الجديد ومصادر المتابعة</span>
          <h2>تابع أحدث الشروحات والميزات</h2>
          <p>روابط مباشرة إلى صفحات التحديثات والفيديوهات الرسمية؛ افتحها لمشاهدة أحدث المواد عند صدورها بدل الاعتماد على فيديو قديم لواجهة تغيرت.</p>
        </div>
        <div className="fresh-learning-grid">
          <a href="https://learn.chatgpt.com/videos" target="_blank" rel="noreferrer"><b>ChatGPT وCodex</b><span>فيديوهات أحدث الميزات وسير العمل</span><small>OpenAI · فيديوهات رسمية</small><ArrowUpRight size={16}/></a>
          <a href="https://academy.claude.com/courses" target="_blank" rel="noreferrer"><b>Claude Academy</b><span>Claude Cowork وClaude Code وMCP ومسارات جديدة</span><small>Anthropic · أكاديمية رسمية</small><ArrowUpRight size={16}/></a>
          <a href="https://support.google.com/gemini/?hl=ar" target="_blank" rel="noreferrer"><b>Gemini Apps Help</b><span>التحديثات وCanvas وDeep Research والتعلم الموجّه</span><small>Google · دليل عربي رسمي</small><ArrowUpRight size={16}/></a>
          <a href="https://academy.runway.com/courses" target="_blank" rel="noreferrer"><b>Runway Academy</b><span>أحدث دورات وفيديوهات إنشاء الفيديو والتحريك</span><small>Runway · أكاديمية رسمية</small><ArrowUpRight size={16}/></a>
          <a href="https://www.deepseek.com/en/news/" target="_blank" rel="noreferrer"><b>DeepSeek News</b><span>إعلانات النماذج والتحديثات التقنية</span><small>DeepSeek · أخبار رسمية</small><ArrowUpRight size={16}/></a>
          <a href="https://mistral.ai/news/" target="_blank" rel="noreferrer"><b>Mistral News</b><span>النماذج والأدوات والمنتجات الجديدة</span><small>Mistral AI · أخبار رسمية</small><ArrowUpRight size={16}/></a>
          <a href="https://x.ai/news/grok-4-7" target="_blank" rel="noreferrer"><b>Grok 4.7</b><span>إصدارات Grok والتحديثات وأدلة الاستخدام الرسمية</span><small>xAI · إعلانات النماذج</small><ArrowUpRight size={16}/></a>
          <a href="https://qwen.ai/blog/" target="_blank" rel="noreferrer"><b>Qwen News</b><span>إعلانات Qwen3.8 والتحديثات الجديدة للنماذج</span><small>Qwen · أخبار رسمية</small><ArrowUpRight size={16}/></a>
          <a href="https://research.meta.ai/" target="_blank" rel="noreferrer"><b>Meta AI Research</b><span>Muse Spark ونماذج Meta والبحوث الجديدة</span><small>Meta · بحث وإصدارات</small><ArrowUpRight size={16}/></a>
        </div>
        <p className="fresh-learning-note">ملاحظة: روابط المصادر تتجدد عند نشر الجهات لمواد جديدة. مكتبة AI HUB نفسها حاليًا قائمة ترشيحات مُراجَعة وليست مزامنة تلقائية مع هذه المواقع.</p>
      </section>
\n      <section className="hubs-section" id="learning-hubs">
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
