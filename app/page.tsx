"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, Bookmark, Bot, BrainCircuit, CalendarDays, Clock3, ExternalLink, Filter, Image as ImageIcon, Layers3, Newspaper, Search, Sparkles, Wrench } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Article = { id: string; title: string; summary: string | null; source_name: string; source_url: string; category: string; published_at: string | null; image_url: string | null };
const sections = ["الكل", "AI News", "AI Models", "AI Tools", "AI Image & Video", "AI Research", "Companies Updates"];
const sectionNames: Record<string,string> = { "الكل":"كل الأخبار", "AI News":"أخبار الذكاء الاصطناعي", "AI Models":"النماذج", "AI Tools":"الأدوات", "AI Image & Video":"الصورة والفيديو", "AI Research":"الأبحاث", "Companies Updates":"تحديثات الشركات" };

function cleanKey(value: string) {
  return value.toLocaleLowerCase("ar").replace(/[\u064B-\u065F\u0670]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
function shortPoints(summary: string | null) {
  if (!summary) return [];
  const parts = summary.split(/(?<=[.!؟])\s+|\n+/).map(x => x.trim()).filter(Boolean);
  return parts.slice(0, 3);
}

export default function Home() {
  const [articles,setArticles] = useState<Article[]>([]);
  const [active,setActive] = useState("الكل");
  const [query,setQuery] = useState("");
  const [loading,setLoading] = useState(true);
  const [saved,setSaved] = useState<string[]>([]);
  const [today,setToday] = useState("");
  useEffect(() => {
    setToday(new Intl.DateTimeFormat("ar-EG",{day:"numeric",month:"long",year:"numeric"}).format(new Date()));
    let alive = true;
    async function load(){
      if(!supabase){setLoading(false);return;}
      const {data,error}=await supabase.from("articles").select("id,title,summary,source_name,source_url,category,published_at,image_url").eq("status","published").order("published_at",{ascending:false}).limit(100);
      if(alive){if(!error && data)setArticles(data as Article[]);setLoading(false);}
    }
    load(); return ()=>{alive=false};
  },[]);
  const uniqueArticles = useMemo(()=>{
    const seen = new Set<string>();
    return articles.filter(a=>{
      const key=cleanKey(a.title);
      if(!key || seen.has(key)) return false;
      seen.add(key); return true;
    });
  },[articles]);
  const filtered = useMemo(()=>uniqueArticles.filter(a=>(active==="الكل"||a.category===active) && (a.title+" "+(a.summary??"")+" "+a.source_name).toLowerCase().includes(query.toLowerCase())),[uniqueArticles,active,query]);
  const toggleSave=(id:string)=>setSaved(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
  return <main className="shell">
    <aside className="sidebar"><div className="brand"><div className="brand-mark"><BrainCircuit size={25}/></div><div><b>AI HUB</b><small>مركز الذكاء الاصطناعي</small></div></div><div className="side-label">القائمة الرئيسية</div><nav>{sections.map((s,i)=><button key={s} onClick={()=>setActive(s)} className={active===s?"nav-item selected":"nav-item"}>{[<Layers3/>,<Newspaper/>,<Bot/>,<Wrench/>,<ImageIcon/>,<Activity/>,<Sparkles/>][i]}<span>{sectionNames[s]}</span>{active===s&&<i/>}</button>)}</nav><div className="sidebar-bottom"><div className="live-dot"/> <span>مركز المتابعة</span><small>ملخصات مركزة بلا تكرار</small></div></aside>
    <section className="main"><header className="topbar"><div><span className="eyebrow">منصة متابعة الذكاء الاصطناعي</span><h1>اكتشف آخر تطورات <em>AI</em></h1><p>أهم الأخبار والمميزات في ملخصات عربية سهلة وسريعة.</p></div><div className="top-actions"><span className="date-chip"><CalendarDays size={15}/> {today || "اليوم"}</span><div className="avatar">AI</div></div></header>
    <div className="hero"><div className="hero-glow"/><div className="hero-content"><span className="hero-tag"><Sparkles size={14}/> YOUR AI INTELLIGENCE CENTER</span><h2>المعلومة المهمة، <strong>من غير حشو</strong></h2><p>كل تحديث في نقاط: ما الجديد؟ أهم المميزات؟ وكيف تستفيد منه؟ مع صورة توضيحية ورابط المصدر عند توفرهما.</p><div className="hero-stats"><div><b>06</b><small>أقسام معرفية</small></div><div><b>3</b><small>نقاط كحد أقصى للملخص</small></div><div><b>AR</b><small>شرح باللغة العربية</small></div></div></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="core"><BrainCircuit size={62}/></div><span className="float-chip chip-a">GPT</span><span className="float-chip chip-b">AI</span><span className="float-chip chip-c">LLM</span></div></div>
    <div className="section-head"><div><span className="eyebrow">LATEST UPDATES</span><h2>آخر الأخبار والتحديثات</h2><p>الأحدث أولًا — مع إخفاء العناوين المتكررة.</p></div><div className="feed-status"><span className="pulse"/> {uniqueArticles.length} تحديثًا مميزًا</div></div>
    <div className="toolbar"><div className="searchbox"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث عن نموذج أو أداة أو خبر..."/></div><button className="filter-btn" onClick={()=>setActive("الكل")}><Filter size={16}/> كل التصنيفات</button></div>
    <div className="chips">{sections.map(s=><button key={s} onClick={()=>setActive(s)} className={active===s?"chip active":"chip"}>{sectionNames[s]}</button>)}</div>
    {loading?<div className="empty"><div className="loader"/><b>جارٍ تحميل الأخبار</b><p>نجهز التحديثات من قاعدة البيانات.</p></div>:filtered.length===0?<div className="empty"><div className="empty-icon"><Newspaper size={28}/></div><b>{articles.length===0?"بانتظار وصول الأخبار":"لا توجد نتائج مطابقة"}</b><p>{articles.length===0?"الواجهة جاهزة، وسيظهر المحتوى هنا بمجرد تشغيل خدمة جمع الأخبار وإضافتها لقاعدة البيانات.":"جرّب تغيير كلمة البحث أو التصنيف."}</p></div>:<div className="news-grid">{filtered.map(a=><article className="news-card" key={a.id}>
      {a.image_url ? <div className="news-image-wrap"><img className="news-image" src={a.image_url} alt={a.title} loading="lazy"/></div> : <div className="news-image-placeholder"><BrainCircuit size={30}/><span>AI UPDATE</span></div>}
      <div className="card-top"><span className="category">{sectionNames[a.category]??a.category}</span><button className={saved.includes(a.id)?"save saved":"save"} onClick={()=>toggleSave(a.id)} aria-label="حفظ"><Bookmark size={17}/></button></div>
      <h3>{a.title}</h3>
      <div className="quick-label">الخلاصة وأهم ما يميز التحديث</div>
      {shortPoints(a.summary).length ? <ul className="summary-points">{shortPoints(a.summary).map((point,i)=><li key={i}>{point}</li>)}</ul> : <p className="summary-empty">ملخص الخبر غير متاح حاليًا.</p>}
      <div className="card-foot"><span>{a.source_name}</span><span><Clock3 size={13}/>{a.published_at?new Date(a.published_at).toLocaleDateString("ar-EG"):""}</span><a href={a.source_url} target="_blank" rel="noreferrer" aria-label="المصدر الأصلي"><ExternalLink size={15}/></a></div>
    </article>)}</div>}
    <footer><span>AI HUB © 2026</span><span>مختصر، واضح، ومن مصادره الأصلية <Sparkles size={13}/></span></footer></section>
  </main>;
}
