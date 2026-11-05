"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, Archive, Bookmark, Bot, BrainCircuit, CalendarDays, Clock3, ExternalLink, Filter, History, Image as ImageIcon, Layers3, Newspaper, Search, Sparkles, Wrench, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Article = { id: string; title: string; summary: string | null; source_name: string; source_url: string; category: string; published_at: string | null; image_url: string | null };
const PAGE_SIZE = 50;
const START_DATE = "2026-11-01T00:00:00+02:00";
const sections = ["الكل", "AI News", "AI Models", "AI Tools", "AI Image & Video", "AI Research", "Companies Updates"];
const sectionNames: Record<string,string> = { "الكل":"كل الأخبار", "AI News":"أخبار الذكاء الاصطناعي", "AI Models":"النماذج", "AI Tools":"الأدوات", "AI Image & Video":"الصورة والفيديو", "AI Research":"الأبحاث", "Companies Updates":"تحديثات الشركات" };

function cleanKey(value: string) {
  return value.toLocaleLowerCase("ar").replace(/[\u064B-\u065F\u0670]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
function summaryPoints(summary: string | null) {
  if (!summary) return [];
  return summary.split(/\n+|(?<=[.!؟])\s+/).map(x => x.replace(/^[-•*\d.)\s]+/, "").trim()).filter(Boolean);
}
function startOfToday() {
  const d = new Date(); d.setHours(0,0,0,0); return d.getTime();
}

export default function Home() {
  const [articles,setArticles] = useState<Article[]>([]);
  const [active,setActive] = useState("الكل");
  const [query,setQuery] = useState("");
  const [loading,setLoading] = useState(true);
  const [loadingMore,setLoadingMore] = useState(false);
  const [hasMore,setHasMore] = useState(false);
  const [archiveMode,setArchiveMode] = useState(false);
  const [saved,setSaved] = useState<string[]>([]);
  const [today,setToday] = useState("");
  useEffect(() => {
    setToday(new Intl.DateTimeFormat("ar-EG",{day:"numeric",month:"long",year:"numeric"}).format(new Date()));
    let alive = true;
    async function load(){
      if(!supabase){setLoading(false);return;}
      const {data,error}=await supabase.from("articles").select("id,title,summary,source_name,source_url,category,published_at,image_url").eq("status","published").gte("published_at",START_DATE).order("published_at",{ascending:false}).range(0,PAGE_SIZE-1);
      if(alive){if(!error && data){setArticles(data as Article[]);setHasMore(data.length===PAGE_SIZE);}setLoading(false);}
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
  const filtered = useMemo(()=>uniqueArticles.filter(a=>{
    const time=a.published_at ? new Date(a.published_at).getTime() : 0;
    const inArchive= time>0 && time<startOfToday();
    return (archiveMode ? inArchive : !inArchive) &&
      (active==="الكل"||a.category===active) &&
      (a.title+" "+(a.summary??"")+" "+a.source_name).toLowerCase().includes(query.toLowerCase());
  }),[uniqueArticles,active,query,archiveMode]);
  const archiveCount = uniqueArticles.filter(a=>a.published_at && new Date(a.published_at).getTime()<startOfToday()).length;
  const toggleSave=(id:string)=>setSaved(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
  async function loadMore(){
    if(!supabase || loadingMore || !hasMore) return;
    setLoadingMore(true);
    const from=articles.length;
    const {data,error}=await supabase.from("articles").select("id,title,summary,source_name,source_url,category,published_at,image_url").eq("status","published").order("published_at",{ascending:false}).range(from,from+PAGE_SIZE-1);
    if(!error && data){setArticles(current=>[...current,...data as Article[]]);setHasMore(data.length===PAGE_SIZE);}
    setLoadingMore(false);
  }
  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><BrainCircuit size={25}/></div><div><b>AI HUB</b><small>منصة المعرفة والابتكار</small></div></div>
      <div className="side-label">استكشف المحتوى</div>
      <nav>{sections.map((s,i)=><button key={s} onClick={()=>setActive(s)} className={active===s?"nav-item selected":"nav-item"}>{[<Layers3/>,<Newspaper/>,<Bot/>,<Wrench/>,<ImageIcon/>,<Activity/>,<Sparkles/>][i]}<span>{sectionNames[s]}</span>{active===s&&<i/>}</button>)}</nav>
      <a className="nav-item models-link" href="/models"><BrainCircuit size={17}/><span>أفضل النماذج والتطبيقات</span></a>
      <div className="sidebar-bottom"><div className="live-dot"/> <span>مكتبة AI HUB</span><small>أخبار • نماذج • أدوات • أبحاث</small></div>
    </aside>
    <section className="main">
      <header className="topbar"><div><span className="eyebrow">AI INTELLIGENCE & TECHNOLOGY BRIEFING</span><h1>مرجعك لمستجدات <em>الذكاء الاصطناعي</em></h1><p>تغطية منظمة لأحدث الأخبار والنماذج والأدوات والأبحاث من مصادرها الأصلية.</p></div><div className="top-actions"><span className="date-chip"><CalendarDays size={15}/> {today || "اليوم"}</span><div className="avatar">AI</div></div></header>
      <div className="hero"><div className="hero-glow"/><div className="hero-content"><span className="hero-tag"><Sparkles size={14}/> ARTIFICIAL INTELLIGENCE INSIGHT</span><h2>الصورة الكاملة لعالم <strong>AI</strong></h2><p>تابع كل تحديث بتفاصيله المهمة: أبرز المستجدات، المزايا، الاستخدامات، والتأثير العملي — مع روابط المصادر والصور التوضيحية عند توفرها.</p><div className="hero-stats"><div><b>06</b><small>مجالات للتغطية</small></div><div><b>FULL</b><small>ملخصات دون حذف النقاط</small></div><div><b>AR</b><small>محتوى عربي واضح</small></div></div></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="core"><BrainCircuit size={62}/></div><span className="float-chip chip-a">GPT</span><span className="float-chip chip-b">AI</span><span className="float-chip chip-c">LLM</span></div></div>
      <div className="section-head"><div><span className="eyebrow">{archiveMode?"NEWS ARCHIVE":"LATEST COVERAGE"}</span><h2>{archiveMode?"أرشيف الأخبار السابقة":"آخر الأخبار والتحديثات"}</h2><p>{archiveMode?"ارجع إلى الأخبار والتحديثات المنشورة قبل اليوم.":"الأحدث أولًا، مع الاحتفاظ بالتفاصيل والنقاط المهمة لكل خبر."}</p></div><div className="feed-status"><span className="pulse"/> {filtered.length} خبرًا معروضًا</div></div>
      <div className="toolbar"><div className="searchbox"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث في الأخبار والنماذج والأدوات..."/></div><button className="filter-btn" onClick={()=>setActive("الكل")}><Filter size={16}/> كل التصنيفات</button><button className={archiveMode?"archive-btn active":"archive-btn"} onClick={()=>setArchiveMode(v=>!v)}><History size={17}/>{archiveMode?"العودة لآخر التحديثات":"الأرشيف"}<span>{archiveCount}</span></button></div>
      <div className="chips">{sections.map(s=><button key={s} onClick={()=>setActive(s)} className={active===s?"chip active":"chip"}>{sectionNames[s]}</button>)}</div>
      {loading?<div className="empty"><div className="loader"/><b>جارٍ تحميل الأخبار</b><p>يتم استرجاع المحتوى من مكتبة الأخبار.</p></div>:filtered.length===0?<div className="empty"><div className="empty-icon"><Archive size={28}/></div><b>{archiveMode?"لا توجد أخبار سابقة محمّلة حاليًا":articles.length===0?"بانتظار وصول الأخبار":"لا توجد نتائج مطابقة"}</b><p>{archiveMode?"حمّل أخبارًا أقدم لعرض المزيد من الأرشيف.":articles.length===0?"ستظهر الأخبار هنا بعد تشغيل خدمة جمع المحتوى وإضافته إلى قاعدة البيانات.":"جرّب تغيير كلمة البحث أو التصنيف."}</p></div>:<div className="news-grid">{filtered.map(a=><article className="news-card" key={a.id}>
        {a.image_url ? <div className="news-image-wrap"><img className="news-image" src={a.image_url} alt={a.title} loading="lazy"/></div> : <div className="news-image-placeholder"><BrainCircuit size={30}/><span>AI UPDATE</span></div>}
        <div className="card-top"><span className="category">{sectionNames[a.category]??a.category}</span><button className={saved.includes(a.id)?"save saved":"save"} onClick={()=>toggleSave(a.id)} aria-label="حفظ"><Bookmark size={17}/></button></div>
        <h3>{a.title}</h3><div className="quick-label">أهم التفاصيل والمميزات</div>
        {summaryPoints(a.summary).length ? <ul className="summary-points">{summaryPoints(a.summary).map((point,i)=><li key={i}>{point}</li>)}</ul> : <p className="summary-empty">لا يتوفر ملخص لهذا الخبر حتى الآن.</p>}
        <div className="card-foot"><span>{a.source_name}</span><span><Clock3 size={13}/>{a.published_at?new Date(a.published_at).toLocaleString("ar-EG",{dateStyle:"medium",timeZone:"Africa/Cairo"}):""}</span><a href={a.source_url} target="_blank" rel="noreferrer" aria-label="المصدر الأصلي"><ExternalLink size={15}/></a></div>
      </article>)}</div>}
      {!loading && hasMore && <div className="load-more-wrap"><button className="load-more" onClick={loadMore} disabled={loadingMore}>{loadingMore?"جارٍ تحميل الأخبار...":"تحميل أخبار أقدم"}<ChevronDown size={17}/></button></div>}
      <footer><span>AI HUB © 2026</span><span>معرفة موثوقة. تغطية منظمة. ومصادر أصلية <Sparkles size={13}/></span></footer>
    </section>
  </main>;
}
