"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowUpLeft, Bookmark, Bot, BrainCircuit, CalendarDays, ChevronLeft, Clock3, ExternalLink, Filter, Image as ImageIcon, Layers3, Newspaper, Search, Sparkles, Wrench } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Article = { id: string; title: string; summary: string | null; source_name: string; source_url: string; category: string; published_at: string | null; image_url: string | null };
const sections = ["الكل", "AI News", "AI Models", "AI Tools", "AI Image & Video", "AI Research", "Companies Updates"];
const sectionNames: Record<string,string> = { "الكل":"كل الأخبار", "AI News":"أخبار الذكاء الاصطناعي", "AI Models":"النماذج", "AI Tools":"الأدوات", "AI Image & Video":"الصورة والفيديو", "AI Research":"الأبحاث", "Companies Updates":"تحديثات الشركات" };

export default function Home() {
  const [articles,setArticles] = useState<Article[]>([]);
  const [active,setActive] = useState("الكل");
  const [query,setQuery] = useState("");
  const [loading,setLoading] = useState(true);
  const [saved,setSaved] = useState<string[]>([]);
  useEffect(() => { let alive = true; async function load(){ if(!supabase){setLoading(false);return;} const {data,error}=await supabase.from("articles").select("id,title,summary,source_name,source_url,category,published_at,image_url").eq("status","published").order("published_at",{ascending:false}).limit(60); if(alive){if(!error && data)setArticles(data as Article[]);setLoading(false);} } load(); return ()=>{alive=false}; },[]);
  const filtered = useMemo(()=>articles.filter(a=>(active==="الكل"||a.category===active) && (a.title+" "+(a.summary??"")+" "+a.source_name).toLowerCase().includes(query.toLowerCase())),[articles,active,query]);
  const toggleSave=(id:string)=>setSaved(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
  return <main className="shell">
    <aside className="sidebar"><div className="brand"><div className="brand-mark"><BrainCircuit size={25}/></div><div><b>AI HUB</b><small>مركز الذكاء الاصطناعي</small></div></div><div className="side-label">القائمة الرئيسية</div><nav>{sections.map((s,i)=><button key={s} onClick={()=>setActive(s)} className={active===s?"nav-item selected":"nav-item"}>{[<Layers3/>,<Newspaper/>,<Bot/>,<Wrench/>,<ImageIcon/>,<Activity/>,<Sparkles/>][i]}<span>{sectionNames[s]}</span>{active===s&&<i/>}</button>)}</nav><div className="sidebar-bottom"><div className="live-dot"/> <span>مركز المتابعة</span><small>تحديث الأخبار قيد الإعداد</small></div></aside>
    <section className="main"><header className="topbar"><div><span className="eyebrow">منصة متابعة الذكاء الاصطناعي</span><h1>اكتشف آخر تطورات <em>AI</em></h1><p>كل ما يحدث في عالم الذكاء الاصطناعي، في مكان واحد.</p></div><div className="top-actions"><span className="date-chip"><CalendarDays size={15}/> 5 نوفمبر 2026</span><div className="avatar">AI</div></div></header>
    <div className="hero"><div className="hero-glow"/><div className="hero-content"><span className="hero-tag"><Sparkles size={14}/> YOUR AI INTELLIGENCE CENTER</span><h2>ابقَ في قلب <strong>ثورة الذكاء الاصطناعي</strong></h2><p>تابع النماذج الجديدة، الأدوات، الأبحاث، وأخبار الشركات التقنية — بملخصات عربية واضحة ومصادر موثوقة.</p><div className="hero-stats"><div><b>06</b><small>أقسام معرفية</small></div><div><b>24/7</b><small>متابعة مستمرة</small></div><div><b>AR</b><small>شرح باللغة العربية</small></div></div></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="core"><BrainCircuit size={62}/></div><span className="float-chip chip-a">GPT</span><span className="float-chip chip-b">AI</span><span className="float-chip chip-c">LLM</span></div></div>
    <div className="section-head"><div><span className="eyebrow">LATEST UPDATES</span><h2>آخر الأخبار والتحديثات</h2><p>تابع الجديد أولًا بأول من المصادر الأصلية.</p></div><div className="feed-status"><span className="pulse"/> قاعدة الأخبار متصلة عند الإعداد</div></div>
    <div className="toolbar"><div className="searchbox"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث عن نموذج أو أداة أو خبر..."/></div><button className="filter-btn" onClick={()=>setActive("الكل")}><Filter size={16}/> كل التصنيفات</button></div>
    <div className="chips">{sections.map(s=><button key={s} onClick={()=>setActive(s)} className={active===s?"chip active":"chip"}>{sectionNames[s]}</button>)}</div>
    {loading?<div className="empty"><div className="loader"/><b>جارٍ تحميل الأخبار</b><p>نجهز أحدث التحديثات من قاعدة البيانات.</p></div>:filtered.length===0?<div className="empty"><div className="empty-icon"><Newspaper size={28}/></div><b>{articles.length===0?"قاعدة الأخبار جاهزة لاستقبال التحديثات":"لا توجد نتائج مطابقة"}</b><p>{articles.length===0?"تم إنشاء قاعدة البيانات ومصادر الأخبار. سنعرض هنا الأخبار بعد تشغيل خدمة جمع وتلخيص المحتوى.":"جرّب تغيير كلمة البحث أو التصنيف."}</p></div>:<div className="news-grid">{filtered.map(a=><article className="news-card" key={a.id}><div className="card-top"><span className="category">{sectionNames[a.category]??a.category}</span><button className={saved.includes(a.id)?"save saved":"save"} onClick={()=>toggleSave(a.id)} aria-label="حفظ"><Bookmark size={17}/></button></div><h3>{a.title}</h3><p>{a.summary}</p><div className="card-foot"><span>{a.source_name}</span><span><Clock3 size={13}/>{a.published_at?new Date(a.published_at).toLocaleDateString("ar-EG"):""}</span><a href={a.source_url} target="_blank" rel="noreferrer"><ExternalLink size={15}/></a></div></article>)}</div>}
    <footer><span>AI HUB © 2026</span><span>المعرفة تبدأ من متابعة المعلومة الصحيحة <Sparkles size={13}/></span></footer></section>
  </main>;
}
