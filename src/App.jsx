import { useState, useRef } from "react";

// ─── TRANSLATIONS ───────────────────────────────────────────────
const T = {
  en: {
    dashboard:"Dashboard", messages:"Messages", campaigns:"Social", googleAds:"Ads",
    post:"Post", leads:"Leads",
    send:"Send", platforms:"Platforms",
    newMessages:"New Messages", activeCampaigns:"Active Campaigns", responseRate:"Response Rate",
    writeMessage:"Write a message...", adTitle:"Campaign Title", adBody:"Ad Text",
    budget:"Daily Budget ($)", selectPlatforms:"Select Platforms", launch:"Launch Campaign",
    offer:"Use This Template", newOffer:"Send Quote", active:"Active", paused:"Paused",
    reach:"Reach", clicks:"Clicks", language:"TR", phone:"(602) 309-3035",
    selectService:"Select Service Type",
    commercial:"Commercial Office", residential:"Residential", construction:"Post-Construction",
    floor:"Floor Cleaning", hospital:"Medical Facility", landscape:"Landscape",
    beforeAfterPost:"Before & After Post", beforePhoto:"BEFORE", afterPhoto:"AFTER",
    tapToAdd:"Tap to add photo", caption:"Caption",
    captionPlaceholder:"Amazing transformation at our latest commercial cleaning job in Chandler! ✨\n\n#OfficeCleana #ChandlerAZ #OfficeCleaning #BeforeAfter",
    shareOn:"Share on", publishNow:"Publish Now", publishing:"Publishing...",
    published:"Posted Successfully!", postHistory:"Recent Posts",
    noPhotos:"Add both photos to preview", swipeToCompare:"Drag to compare",
    totalSpend:"Total Spend", impressions:"Impressions", conversions:"Conversions",
    cpc:"Avg. CPC", ctr:"CTR", allCampaigns:"All Campaigns",
    searchCampaigns:"Search", displayCampaigns:"Display",
    adStrength:"Ad Strength", keywords:"Keywords", excellent:"Excellent", good:"Good", poor:"Poor",
    pausing:"Pause", resuming:"Resume", adPreview:"Ad Preview",
    // Leads
    leadsTitle:"Lead Pipeline", newLead:"+ New Lead",
    allLeads:"All", hotLeads:"Hot", followUp:"Follow-up", wonLeads:"Won", lostLeads:"Lost",
    leadName:"Name", leadPhone:"Phone", leadEmail:"Email", leadService:"Service",
    leadNote:"Notes", leadSource:"Source", saveLead:"Save Lead",
    sendQuote:"Send Quote", markWon:"Mark Won", markLost:"Mark Lost",
    followUpReminder:"Follow-up reminder", reminderSent:"Reminder sent!",
    quoteAmount:"Quote Amount ($)", quoteSent:"Quote Sent ✓",
    reviewRequest:"Request Review", reviewSent:"Review link sent!",
    conversionRate:"Win Rate", totalLeads:"Total Leads", openLeads:"Open",
    wonCount:"Won", pipeline:"Pipeline Value",
    statusNew:"New", statusQuoted:"Quoted", statusFollowUp:"Follow-up",
    statusWon:"Won ✓", statusLost:"Lost",
    addNote:"Add note...", noteSaved:"Note saved",
    followUpIn:"Follow-up in", hours24:"24h", hours48:"48h", days7:"7 days",
    reviewMsg:"Hi! Thank you for choosing Office Cleana! We hope you're loving your spotless space 🌟 If you're happy with our service, we'd really appreciate a quick Google review — it helps us grow!\n\n👉 https://g.page/officecleana/review\n\nThank you!\nOffice Cleana Team\n📞 (602) 309-3035",
    offerTemplates: {
      commercial: "Hi! Thank you for reaching out to Office Cleana! 🌟 We specialize in commercial office cleaning across the Chandler & Phoenix area. Our packages start from $150. FREE on-site estimate available!\n\n📞 (602) 309-3035 | info@officecleana.com",
      residential: "Hi! Thanks for contacting Office Cleana! 🏡 Professional residential cleaning from $80. Available Sun–Sat, 8AM–5PM.\n\n📞 (602) 309-3035 | info@officecleana.com",
      construction: "Hi! Office Cleana provides thorough post-construction cleaning. 🏗️ FREE walkthrough for an accurate quote!\n\n📞 (602) 309-3035 | info@officecleana.com",
      floor: "Hi! Office Cleana here! ✨ Professional floor cleaning for all floor types. FREE assessment available!\n\n📞 (602) 309-3035 | info@officecleana.com",
      hospital: "Hi! Office Cleana specializes in medical-grade facility cleaning in Arizona. 🏥 Strict sanitation protocols.\n\n📞 (602) 309-3035 | info@officecleana.com",
      landscape: "Hi! Office Cleana landscape cleaning — debris removal, pressure washing & more. 🌿 FREE estimate!\n\n📞 (602) 309-3035 | info@officecleana.com",
    },
  },
  tr: {
    dashboard:"Panel", messages:"Mesajlar", campaigns:"Sosyal", googleAds:"Ads",
    post:"Post", leads:"Leadler",
    send:"Gönder", platforms:"Platformlar",
    newMessages:"Yeni Mesaj", activeCampaigns:"Aktif Kampanya", responseRate:"Yanıt Oranı",
    writeMessage:"Mesaj yaz...", adTitle:"Kampanya Başlığı", adBody:"Reklam Metni",
    budget:"Günlük Bütçe ($)", selectPlatforms:"Platform Seç", launch:"Kampanyayı Başlat",
    offer:"Bu Şablonu Kullan", newOffer:"Teklif Gönder", active:"Aktif", paused:"Durduruldu",
    reach:"Erişim", clicks:"Tıklama", language:"EN", phone:"(602) 309-3035",
    selectService:"Hizmet Türü Seç",
    commercial:"Ticari Ofis", residential:"Konut", construction:"İnşaat Sonrası",
    floor:"Zemin Temizliği", hospital:"Medikal Tesis", landscape:"Dış Alan",
    beforeAfterPost:"Önce & Sonra Post", beforePhoto:"ÖNCE", afterPhoto:"SONRA",
    tapToAdd:"Fotoğraf ekle", caption:"Açıklama",
    captionPlaceholder:"Chandler'daki son temizlik işimiz! ✨\n\n#OfficeCleana #ChandlerAZ #OfisTemizlik",
    shareOn:"Paylaş", publishNow:"Şimdi Paylaş", publishing:"Yayınlanıyor...",
    published:"Başarıyla Paylaşıldı!", postHistory:"Son Postlar",
    noPhotos:"Her iki fotoğrafı da ekle", swipeToCompare:"Karşılaştır",
    totalSpend:"Toplam Harcama", impressions:"Gösterim", conversions:"Dönüşüm",
    cpc:"Ort. TBM", ctr:"TO", allCampaigns:"Tüm Kampanyalar",
    searchCampaigns:"Arama", displayCampaigns:"Görüntülü",
    adStrength:"Reklam Gücü", keywords:"Anahtar Kelimeler", excellent:"Mükemmel", good:"İyi", poor:"Zayıf",
    pausing:"Duraklat", resuming:"Devam Et", adPreview:"Reklam Önizleme",
    leadsTitle:"Lead Takibi", newLead:"+ Yeni Lead",
    allLeads:"Tümü", hotLeads:"Sıcak", followUp:"Takip", wonLeads:"Kazanıldı", lostLeads:"Kaybedildi",
    leadName:"İsim", leadPhone:"Telefon", leadEmail:"E-posta", leadService:"Hizmet",
    leadNote:"Not", leadSource:"Kaynak", saveLead:"Kaydet",
    sendQuote:"Teklif Gönder", markWon:"Müşteri Oldu ✓", markLost:"Kaybedildi",
    followUpReminder:"Takip hatırlatıcısı", reminderSent:"Hatırlatıcı gönderildi!",
    quoteAmount:"Teklif Tutarı ($)", quoteSent:"Teklif Gönderildi ✓",
    reviewRequest:"Yorum İste", reviewSent:"Yorum linki gönderildi!",
    conversionRate:"Kazanma Oranı", totalLeads:"Toplam Lead", openLeads:"Açık",
    wonCount:"Kazanılan", pipeline:"Pipeline Değeri",
    statusNew:"Yeni", statusQuoted:"Teklif Verildi", statusFollowUp:"Takipte",
    statusWon:"Kazanıldı ✓", statusLost:"Kaybedildi",
    addNote:"Not ekle...", noteSaved:"Not kaydedildi",
    followUpIn:"Takip zamanı", hours24:"24 saat", hours48:"48 saat", days7:"7 gün",
    reviewMsg:"Merhaba! Office Cleana'yı tercih ettiğiniz için teşekkürler! 🌟 Tertemiz alanınızdan memnun olduğunuzu umuyoruz. Hizmetimizden memnunsanız Google'da kısa bir yorum bırakır mısınız?\n\n👉 https://g.page/officecleana/review\n\nTeşekkürler!\nOffice Cleana\n📞 (602) 309-3035",
    offerTemplates: {
      commercial: "Merhaba! Office Cleana'ya ulaştığınız için teşekkürler! 🌟 Paketlerimiz $150'dan başlıyor. ÜCRETSİZ keşif için zaman belirleyelim mi?\n\n📞 (602) 309-3035 | info@officecleana.com",
      residential: "Merhaba! Konut temizliği $80'dan başlıyor. 🏡 Paz–Cmt 08:00–17:00 hizmet veriyoruz.\n\n📞 (602) 309-3035 | info@officecleana.com",
      construction: "Merhaba! İnşaat sonrası temizlik için Office Cleana! 🏗️ Ücretsiz keşif ziyareti ayarlayalım.\n\n📞 (602) 309-3035 | info@officecleana.com",
      floor: "Merhaba! Tüm zemin türleri için profesyonel temizlik. ✨ Ücretsiz değerlendirme için gelelim.\n\n📞 (602) 309-3035 | info@officecleana.com",
      hospital: "Merhaba! Medikal tesis temizliği konusunda uzmanız. 🏥\n\n📞 (602) 309-3035 | info@officecleana.com",
      landscape: "Merhaba! Dış alan temizliği ve basınçlı yıkama. 🌿 Ücretsiz keşif!\n\n📞 (602) 309-3035 | info@officecleana.com",
    },
  },
};

// ─── MOCK DATA ──────────────────────────────────────────────────
const INIT_LEADS = [
  { id:1, name:"Sarah Mitchell", phone:"(480) 555-0192", email:"sarah@techcorp.com", service:"commercial", source:"instagram", status:"follow-up", quote:250, note:"200sqm office, wants weekly contract. Called once, no answer.", createdAt:"2d ago", followUpAt:"Today 3pm", reviewSent:false },
  { id:2, name:"David Kim", phone:"(602) 555-0847", email:"dkim@gmail.com", service:"residential", source:"facebook", status:"quoted", quote:120, note:"3BR home in Chandler. Sent quote $120.", createdAt:"1d ago", followUpAt:"Tomorrow", reviewSent:false },
  { id:3, name:"Emma Rodriguez", phone:"(480) 555-3311", email:"emma.r@medclinic.com", service:"hospital", source:"google", status:"new", quote:0, note:"Medical office, needs deep clean monthly.", createdAt:"3h ago", followUpAt:null, reviewSent:false },
  { id:4, name:"Tom & Lisa Burns", phone:"(623) 555-7720", email:"burns@home.com", service:"construction", source:"instagram", status:"won", quote:380, note:"Post-construction cleanup done. Very happy!", createdAt:"5d ago", followUpAt:null, reviewSent:false },
  { id:5, name:"Nina Patel", phone:"(480) 555-2290", email:"npatel@office.com", service:"floor", source:"facebook", status:"lost", quote:180, note:"Went with another company. Price was the issue.", createdAt:"1w ago", followUpAt:null, reviewSent:false },
];

const MOCK_MESSAGES = [
  { id:1, platform:"instagram", name:"Sarah M.", avatar:"SM", time:"2m ago", text:"Hi, do you do office cleaning in downtown Chandler?", unread:true, color:"#E1306C" },
  { id:2, platform:"facebook", name:"David K.", avatar:"DK", time:"15m ago", text:"What are your rates for a 200sqm weekly office cleaning?", unread:true, color:"#1877F2" },
  { id:3, platform:"google", name:"Emma R.", avatar:"ER", time:"1h ago", text:"Interested in monthly contract for medical office.", unread:true, color:"#34A853" },
  { id:4, platform:"instagram", name:"Tom L.", avatar:"TL", time:"2h ago", text:"Do you offer post-construction cleanup?", unread:false, color:"#E1306C" },
];

const MOCK_SOCIAL = [
  { id:1, title:"Spring Commercial Special", platforms:["instagram","facebook","google"], status:"active", reach:4820, clicks:312, budget:50 },
  { id:2, title:"30% Off First Clean", platforms:["facebook","instagram"], status:"active", reach:2100, clicks:189, budget:30 },
];

const MOCK_GADS = [
  { id:1, name:"Office Cleaning Chandler", type:"search", status:"active", budget:25, spend:18.40, impressions:1842, clicks:94, conversions:7, cpc:0.20, ctr:5.1, roas:4.2, keywords:["office cleaning chandler az","commercial cleaning service"], adStrength:"excellent", headline:"Professional Office Cleaning AZ", description:"Reliable office cleaning in Chandler & Phoenix. Free estimate. Call (602) 309-3035!" },
  { id:2, name:"Residential Cleaning Phoenix", type:"search", status:"active", budget:20, spend:14.20, impressions:1240, clicks:61, conversions:4, cpc:0.23, ctr:4.9, roas:3.8, keywords:["house cleaning phoenix","home cleaners chandler"], adStrength:"good", headline:"Top-Rated Home Cleaning AZ", description:"Professional residential cleaning starting from $80." },
  { id:3, name:"Post-Construction Display", type:"display", status:"paused", budget:15, spend:0, impressions:3200, clicks:28, conversions:1, cpc:0.31, ctr:0.9, roas:1.1, keywords:["post construction cleaning az"], adStrength:"poor", headline:"Post-Construction Cleanup AZ", description:"Fast & thorough post-construction cleaning." },
];

const MOCK_POSTS = [
  { id:1, platforms:["instagram","facebook"], caption:"Incredible office transformation in Chandler! ✨", time:"2 days ago", likes:34, reach:892 },
];

// ─── CONSTANTS ──────────────────────────────────────────────────
const PC = { instagram:"#E1306C", facebook:"#1877F2", google:"#34A853" };
const SVC_ICONS = { commercial:"🏢", residential:"🏡", construction:"🏗️", floor:"✨", hospital:"🏥", landscape:"🌿" };
const SVC_TYPES = ["commercial","residential","construction","floor","hospital","landscape"];
const SC = { excellent:"#25C68A", good:"#FFB84D", poor:"#FF6B6B" };
const SB = { excellent:"#25C68A18", good:"#FFB84D18", poor:"#FF6B6B18" };
const STATUS_CONFIG = {
  new:      { color:"#60CFFF", bg:"#60CFFF18", border:"#60CFFF44", label:"statusNew" },
  quoted:   { color:"#FFB84D", bg:"#FFB84D18", border:"#FFB84D44", label:"statusQuoted" },
  "follow-up": { color:"#E1306C", bg:"#E1306C18", border:"#E1306C44", label:"statusFollowUp" },
  won:      { color:"#25C68A", bg:"#25C68A18", border:"#25C68A44", label:"statusWon" },
  lost:     { color:"#666688", bg:"#66668818", border:"#66668844", label:"statusLost" },
};

const B = { g1:"#1A9E6E", g2:"#25C68A", dark:"#0B1510", card:"#0E1F16", border:"#1A3326", surface:"#071009", text:"#E4F2EC", muted:"#4E7D65", dim:"#1D3828" };

// ─── ICONS ──────────────────────────────────────────────────────
const PIcon = ({ p, s=16 }) => ({
  instagram: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="#E1306C" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="#E1306C"/></svg>,
  facebook: <svg width={s} height={s} viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  google: <svg width={s} height={s} viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>,
}[p] || null);

const GAdsIcon = ({ s=16 }) => <svg width={s} height={s} viewBox="0 0 24 24"><path d="M3.5 17.5L8 9l4.5 7.8H3.5z" fill="#FBBC05"/><path d="M14.5 6.5L19 14.5l-2.25 3.9-4.5-7.8L14.5 6.5z" fill="#4285F4"/><circle cx="19" cy="17.5" r="2.5" fill="#34A853"/></svg>;

const Spark = ({ data, color }) => {
  const max=Math.max(...data), min=Math.min(...data);
  const norm=data.map(v=>1-(v-min)/(max-min||1));
  const w=60,h=24,pad=2;
  const pts=norm.map((y,i)=>`${pad+(i/(data.length-1))*(w-pad*2)},${pad+y*(h-pad*2)}`).join(" ");
  return <svg width={w} height={h}><polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/></svg>;
};

const BeforeAfterSlider = ({ before, after }) => {
  const [pos,setPos]=useState(50);
  const ref=useRef(null);
  const dragging=useRef(false);
  const getPos=(cx)=>{ const r=ref.current?.getBoundingClientRect(); if(!r) return; setPos(Math.max(0,Math.min((cx-r.left)/r.width*100,100))); };
  return (
    <div ref={ref} style={{ position:"relative",width:"100%",aspectRatio:"4/3",borderRadius:14,overflow:"hidden",userSelect:"none",cursor:"ew-resize" }}
      onMouseMove={e=>dragging.current&&getPos(e.clientX)} onMouseUp={()=>{dragging.current=false;}} onMouseLeave={()=>{dragging.current=false;}}
      onTouchMove={e=>getPos(e.touches[0].clientX)}>
      <img src={after} alt="after" style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover" }}/>
      <div style={{ position:"absolute",inset:0,width:`${pos}%`,overflow:"hidden" }}>
        <img src={before} alt="before" style={{ width:`${100/pos*100}%`,maxWidth:"none",height:"100%",objectFit:"cover" }}/>
      </div>
      <div style={{ position:"absolute",top:8,left:8,background:"#00000099",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:5 }}>BEFORE</div>
      <div style={{ position:"absolute",top:8,right:8,background:`${B.g1}dd`,color:"#fff",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:5 }}>AFTER</div>
      <div style={{ position:"absolute",top:0,bottom:0,left:`${pos}%`,width:2,background:"#fff",transform:"translateX(-50%)" }}/>
      <div onMouseDown={()=>{dragging.current=true;}} onTouchStart={e=>getPos(e.touches[0].clientX)}
        style={{ position:"absolute",top:"50%",left:`${pos}%`,transform:"translate(-50%,-50%)",width:30,height:30,borderRadius:"50%",background:"#fff",border:`2px solid ${B.g1}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"ew-resize",boxShadow:"0 2px 12px #00000055",zIndex:10 }}>
        <span style={{ fontSize:11,color:B.g1,fontWeight:700 }}>⇔</span>
      </div>
    </div>
  );
};

// ─── MAIN APP ───────────────────────────────────────────────────
export default function App() {
  const [lang,setLang]=useState("en");
  const [tab,setTab]=useState("dashboard");
  const t=T[lang];

  // Messages
  const [messages,setMessages]=useState(MOCK_MESSAGES);
  const [selMsg,setSelMsg]=useState(null);
  const [reply,setReply]=useState("");
  const [offerOpen,setOfferOpen]=useState(false);
  const [selSvc,setSelSvc]=useState(null);
  const [sent,setSent]=useState(false);

  // Social campaigns
  const [socialCamps,setSocialCamps]=useState(MOCK_SOCIAL);
  const [newCamp,setNewCamp]=useState(false);
  const [nc,setNc]=useState({title:"",body:"",budget:"",platforms:[]});
  const [launching,setLaunching]=useState(false);

  // Google Ads
  const [gCamps,setGCamps]=useState(MOCK_GADS);
  const [selGCamp,setSelGCamp]=useState(null);

  // Post
  const [beforeImg,setBeforeImg]=useState(null);
  const [afterImg,setAfterImg]=useState(null);
  const [caption,setCaption]=useState("");
  const [postPlatforms,setPostPlatforms]=useState(["instagram","facebook"]);
  const [publishing,setPublishing]=useState(false);
  const [published,setPublished]=useState(false);
  const [posts,setPosts]=useState(MOCK_POSTS);

  // Leads
  const [leads,setLeads]=useState(INIT_LEADS);
  const [leadFilter,setLeadFilter]=useState("all");
  const [selLead,setSelLead]=useState(null);
  const [showNewLead,setShowNewLead]=useState(false);
  const [newLead,setNewLead]=useState({name:"",phone:"",email:"",service:"commercial",source:"instagram",note:""});
  const [toast,setToast]=useState(null);
  const [quoteAmt,setQuoteAmt]=useState("");

  const unread=messages.filter(m=>m.unread).length;
  const followUpCount=leads.filter(l=>l.status==="follow-up").length;
  const totalSpend=gCamps.reduce((a,c)=>a+c.spend,0);
  const totalClicks=gCamps.reduce((a,c)=>a+c.clicks,0);
  const totalImpressions=gCamps.reduce((a,c)=>a+c.impressions,0);
  const totalConversions=gCamps.reduce((a,c)=>a+c.conversions,0);
  const wonLeads=leads.filter(l=>l.status==="won");
  const openLeads=leads.filter(l=>!["won","lost"].includes(l.status));
  const winRate=leads.length>0?Math.round((wonLeads.length/leads.length)*100):0;
  const pipelineValue=openLeads.reduce((a,l)=>a+(l.quote||0),0);

  const spendData=[8,11,14,10,16,18,15,19,18,20,17,18];
  const clickData=[40,55,61,48,72,85,70,94,88,96,80,94];

  const showToast=(msg)=>{ setToast(msg); setTimeout(()=>setToast(null),2200); };

  const filteredLeads = leadFilter==="all" ? leads
    : leadFilter==="hot" ? leads.filter(l=>l.status==="follow-up"||l.status==="quoted")
    : leads.filter(l=>l.status===leadFilter);

  const toggleP=(p)=>setNc(prev=>({...prev,platforms:prev.platforms.includes(p)?prev.platforms.filter(x=>x!==p):[...prev.platforms,p]}));
  const togglePostP=(p)=>setPostPlatforms(prev=>prev.includes(p)?prev.filter(x=>x!==p):[...prev,p]);

  const doSend=()=>{ if(!reply.trim()) return; setSent(true); setTimeout(()=>setSent(false),700); setMessages(prev=>prev.map(m=>m.id===selMsg?.id?{...m,unread:false}:m)); setReply(""); };

  const doLaunch=()=>{
    if(!nc.title||nc.platforms.length===0) return;
    setLaunching(true);
    setTimeout(()=>{ setSocialCamps(prev=>[{id:Date.now(),title:nc.title,platforms:nc.platforms,status:"active",reach:0,clicks:0,budget:parseInt(nc.budget)||0},...prev]); setNc({title:"",body:"",budget:"",platforms:[]}); setNewCamp(false); setLaunching(false); setTab("campaigns"); },1100);
  };

  const doPublish=()=>{
    if(!beforeImg||!afterImg||postPlatforms.length===0) return;
    setPublishing(true);
    setTimeout(()=>{ setPosts(prev=>[{id:Date.now(),platforms:postPlatforms,caption:caption||t.captionPlaceholder,time:"Just now",likes:0,reach:0},...prev]); setPublishing(false); setPublished(true); setTimeout(()=>{ setPublished(false); setBeforeImg(null); setAfterImg(null); setCaption(""); setPostPlatforms(["instagram","facebook"]); },2200); },1800);
  };

  const handleImg=(e,type)=>{ const f=e.target.files[0]; if(!f) return; const url=URL.createObjectURL(f); type==="before"?setBeforeImg(url):setAfterImg(url); };

  const saveNewLead=()=>{
    if(!newLead.name.trim()) return;
    setLeads(prev=>[{id:Date.now(),...newLead,status:"new",quote:0,createdAt:"Just now",followUpAt:null,reviewSent:false},...prev]);
    setNewLead({name:"",phone:"",email:"",service:"commercial",source:"instagram",note:""});
    setShowNewLead(false);
    showToast("✓ Lead added!");
  };

  const updateLeadStatus=(id,status)=>{ setLeads(prev=>prev.map(l=>l.id===id?{...l,status}:l)); if(selLead?.id===id) setSelLead(prev=>({...prev,status})); };

  const sendQuote=(lead)=>{
    const amt=quoteAmt||lead.quote;
    setLeads(prev=>prev.map(l=>l.id===lead.id?{...l,status:"quoted",quote:parseFloat(amt)||l.quote}:l));
    if(selLead?.id===lead.id) setSelLead(prev=>({...prev,status:"quoted",quote:parseFloat(amt)||lead.quote}));
    setQuoteAmt("");
    showToast("💬 Quote sent!");
  };

  const sendFollowUp=(lead)=>{ updateLeadStatus(lead.id,"follow-up"); showToast("🔔 Follow-up reminder set!"); };

  const sendReview=(lead)=>{
    setLeads(prev=>prev.map(l=>l.id===lead.id?{...l,reviewSent:true}:l));
    if(selLead?.id===lead.id) setSelLead(prev=>({...prev,reviewSent:true}));
    showToast("⭐ Review request sent!");
  };

  const saveNote=(id,note)=>{ setLeads(prev=>prev.map(l=>l.id===id?{...l,note}:l)); showToast("📝 Note saved"); };

  const toggleGStatus=(id)=>setGCamps(prev=>prev.map(c=>c.id===id?{...c,status:c.status==="active"?"paused":"active"}:c));

  const inp={ width:"100%",fontSize:14,background:"none",border:"none",outline:"none",color:B.text,fontFamily:"inherit" };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif",background:B.dark,minHeight:"100vh",maxWidth:430,margin:"0 auto",color:B.text,position:"relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:2px} ::-webkit-scrollbar-thumb{background:#1A9E6E33;border-radius:2px}
        .t{transition:all .15s;cursor:pointer;border:none;background:none;font-family:inherit}
        .t:active{transform:scale(.95);opacity:.8}
        .fi{animation:fi .22s ease forwards}
        @keyframes fi{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
        .su{animation:su .3s cubic-bezier(.16,1,.3,1) forwards}
        @keyframes su{from{transform:translateY(100%)}to{transform:translateY(0)}}
        .gl{animation:gl 2.5s ease-in-out infinite}
        @keyframes gl{0%,100%{opacity:1}50%{opacity:.3}}
        .sp{animation:sp .85s linear infinite}
        @keyframes sp{to{transform:rotate(360deg)}}
        .sb{animation:sb .45s ease}
        @keyframes sb{50%{background:#25C68A!important}}
        .pop{animation:pop .35s cubic-bezier(.16,1,.3,1)}
        @keyframes pop{from{transform:scale(.85) translateY(10px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
        .toast{animation:toastIn .3s ease,toastOut .3s ease 1.9s forwards}
        @keyframes toastIn{from{transform:translateY(20px) translateX(-50%);opacity:0}to{transform:translateY(0) translateX(-50%);opacity:1}}
        @keyframes toastOut{to{transform:translateY(20px) translateX(-50%);opacity:0}}
        textarea,input,select{background:none;border:none;outline:none;color:#E4F2EC;font-family:inherit;resize:none}
        textarea::placeholder,input::placeholder{color:#1D3828}
        select option{background:#0E1F16;color:#E4F2EC}
      `}</style>

      {/* Toast */}
      {toast && <div className="toast" style={{ position:"fixed",bottom:110,left:"50%",transform:"translateX(-50%)",background:B.g1,color:"#fff",padding:"10px 20px",borderRadius:20,fontSize:13,fontWeight:600,zIndex:200,whiteSpace:"nowrap",boxShadow:"0 4px 20px #00000066" }}>{toast}</div>}

      {/* Header */}
      <div style={{ padding:"50px 18px 14px",background:`linear-gradient(180deg,${B.card} 0%,${B.dark} 100%)`,borderBottom:`1px solid ${B.border}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:36,height:36,borderRadius:9,background:`linear-gradient(135deg,${B.g1},${B.g2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>✦</div>
          <div>
            <div style={{ fontFamily:"'Outfit',sans-serif",fontSize:19,fontWeight:900,letterSpacing:-.5,color:"#fff",lineHeight:1 }}>office<span style={{ color:B.g2 }}>cleana</span></div>
            <div style={{ fontSize:8.5,color:B.muted,fontWeight:700,letterSpacing:1.3,marginTop:2 }}>MANAGER · CHANDLER AZ</div>
          </div>
        </div>
        <div style={{ display:"flex",gap:8,alignItems:"center" }}>
          <button className="t" onClick={()=>setLang(lang==="en"?"tr":"en")} style={{ background:B.dim,color:B.muted,padding:"5px 11px",borderRadius:20,fontSize:9.5,fontWeight:700,letterSpacing:1 }}>{t.language}</button>
          <div style={{ width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${B.g1},${B.g2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff" }}>M</div>
        </div>
      </div>

      <div style={{ padding:"18px 15px 115px",overflowY:"auto",maxHeight:"calc(100vh - 125px)" }}>

        {/* ══ DASHBOARD ══ */}
        {tab==="dashboard" && <div className="fi">
          {/* Stats row */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9,marginBottom:16 }}>
            {[
              { label:t.newMessages, val:unread, color:B.g2, icon:"💬" },
              { label:t.openLeads, val:openLeads.length, color:"#FFB84D", icon:"🎯" },
              { label:t.conversionRate, val:`${winRate}%`, color:"#60CFFF", icon:"🏆" },
            ].map((s,i)=>(
              <div key={i} style={{ background:B.card,borderRadius:14,padding:"13px 8px",textAlign:"center",border:`1px solid ${s.color}20` }}>
                <div style={{ fontSize:16,marginBottom:5 }}>{s.icon}</div>
                <div style={{ fontSize:21,fontWeight:800,color:s.color,fontFamily:"'Outfit',sans-serif" }}>{s.val}</div>
                <div style={{ fontSize:8,color:B.muted,marginTop:3,fontWeight:700,letterSpacing:.4 }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>

          {/* Follow-up alert */}
          {followUpCount>0 && (
            <button className="t pop" onClick={()=>setTab("leads")}
              style={{ width:"100%",background:"linear-gradient(135deg,#3A1A1A,#4A2020)",border:"1px solid #E1306C44",borderRadius:14,padding:"13px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12 }}>
              <div style={{ width:38,height:38,borderRadius:10,background:"#E1306C22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>🔔</div>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontSize:13,fontWeight:700,color:"#FFB4B4" }}>{followUpCount} lead{followUpCount>1?"s":""} need follow-up!</div>
                <div style={{ fontSize:11,color:"#CC8888",marginTop:2 }}>Tap to view and send reminders →</div>
              </div>
            </button>
          )}

          {/* Lead pipeline mini */}
          <div style={{ background:B.card,borderRadius:16,padding:"14px 16px",marginBottom:14,border:`1px solid #FFB84D22`,cursor:"pointer" }} onClick={()=>setTab("leads")}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}><span style={{ fontSize:16 }}>🎯</span><span style={{ fontSize:13,fontWeight:700,color:B.text }}>{t.leadsTitle}</span></div>
              <span style={{ fontSize:10,color:B.g2,fontWeight:600 }}>View all →</span>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:7 }}>
              {[
                { l:t.totalLeads, v:leads.length, c:B.text },
                { l:t.openLeads, v:openLeads.length, c:"#FFB84D" },
                { l:t.wonCount, v:wonLeads.length, c:B.g2 },
                { l:t.pipeline, v:`$${pipelineValue}`, c:"#60CFFF" },
              ].map((s,i)=>(
                <div key={i} style={{ background:B.surface,borderRadius:9,padding:"8px 5px",textAlign:"center" }}>
                  <div style={{ fontSize:13,fontWeight:700,color:s.c }}>{s.v}</div>
                  <div style={{ fontSize:7.5,color:B.muted,marginTop:2 }}>{s.l.toUpperCase()}</div>
                </div>
              ))}
            </div>
            {/* Pipeline visual */}
            <div style={{ display:"flex",gap:3,marginTop:12,height:5,borderRadius:3,overflow:"hidden" }}>
              {[
                { s:"new", count:leads.filter(l=>l.status==="new").length },
                { s:"quoted", count:leads.filter(l=>l.status==="quoted").length },
                { s:"follow-up", count:leads.filter(l=>l.status==="follow-up").length },
                { s:"won", count:leads.filter(l=>l.status==="won").length },
              ].map(seg=>(
                seg.count>0 && <div key={seg.s} style={{ flex:seg.count,background:STATUS_CONFIG[seg.s].color,opacity:.7,borderRadius:3 }}/>
              ))}
            </div>
          </div>

          {/* ── MAIN GRID: Left content + Right message strip ── */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 72px", gap:10, marginBottom:14 }}>
            {/* LEFT: Quick actions */}
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>

              {/* Before/After shortcut */}
              <button className="t" onClick={()=>setTab("post")}
                style={{ width:"100%",background:"linear-gradient(135deg,#1A3A28,#1F4A32)",border:`1px solid ${B.g1}55`,borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ width:34,height:34,borderRadius:9,background:`linear-gradient(135deg,${B.g1},${B.g2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0 }}>📸</div>
                <div style={{ textAlign:"left", minWidth:0 }}>
                  <div style={{ fontSize:12,fontWeight:700,color:B.text }}>{t.beforeAfterPost}</div>
                  <div style={{ fontSize:10,color:B.muted,marginTop:1 }}>Shoot → Post</div>
                </div>
                <div style={{ marginLeft:"auto",fontSize:14,color:B.muted }}>›</div>
              </button>

              {/* Google Ads mini */}
              <div style={{ background:B.card,borderRadius:14,padding:"12px 14px",border:"1px solid #4285F422",cursor:"pointer" }} onClick={()=>setTab("googleads")}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:7 }}><GAdsIcon s={15}/><span style={{ fontSize:11,fontWeight:700,color:B.text }}>Google Ads</span></div>
                  <div style={{ display:"flex",alignItems:"center",gap:4 }}><div className="gl" style={{ width:5,height:5,borderRadius:"50%",background:"#34A853" }}/><span style={{ fontSize:8,color:"#34A853",fontWeight:700 }}>LIVE</span></div>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                  <div><div style={{ fontSize:8.5,color:B.muted,marginBottom:2 }}>{t.totalSpend}</div><div style={{ fontSize:17,fontWeight:800,color:"#FBBC05",fontFamily:"'Outfit',sans-serif" }}>${totalSpend.toFixed(2)}</div><Spark data={spendData} color="#FBBC05"/></div>
                  <div><div style={{ fontSize:8.5,color:B.muted,marginBottom:2 }}>{t.clicks}</div><div style={{ fontSize:17,fontWeight:800,color:"#4285F4",fontFamily:"'Outfit',sans-serif" }}>{totalClicks}</div><Spark data={clickData} color="#4285F4"/></div>
                </div>
              </div>

              {/* Platform status row */}
              <div style={{ background:B.card,borderRadius:13,padding:"10px 13px",border:`1px solid ${B.border}` }}>
                <div style={{ fontSize:8.5,fontWeight:700,color:B.muted,letterSpacing:1,marginBottom:9 }}>{t.platforms.toUpperCase()}</div>
                <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
                  {[
                    { id:"instagram", label:"Instagram" },
                    { id:"facebook", label:"Facebook" },
                    { id:"google", label:"Google Maps" },
                  ].map(p=>(
                    <div key={p.id} style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:7 }}>
                        <div style={{ width:26,height:26,borderRadius:7,background:`${PC[p.id]}15`,display:"flex",alignItems:"center",justifyContent:"center" }}><PIcon p={p.id} s={13}/></div>
                        <span style={{ fontSize:11,color:B.text,fontWeight:500 }}>{p.label}</span>
                      </div>
                      <div style={{ display:"flex",alignItems:"center",gap:4 }}>
                        <div className="gl" style={{ width:5,height:5,borderRadius:"50%",background:B.g2 }}/>
                        <span style={{ fontSize:8,color:B.g2,fontWeight:700 }}>LIVE</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Compact message strip */}
            <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
              <div style={{ fontSize:8,fontWeight:700,color:B.muted,letterSpacing:.8,marginBottom:2,textAlign:"center" }}>MSG</div>
              {messages.slice(0,5).map(msg=>(
                <button key={msg.id} className="t" onClick={()=>{setSelMsg(msg);setTab("messages");}}
                  style={{ position:"relative",width:56,height:56,borderRadius:14,background:msg.unread?"#0E2318":B.card,border:msg.unread?`1.5px solid ${B.g1}66`:`1px solid ${B.border}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,padding:4 }}>
                  {/* Avatar */}
                  <div style={{ width:28,height:28,borderRadius:"50%",background:`${msg.color}20`,color:msg.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800 }}>{msg.avatar}</div>
                  {/* Platform icon */}
                  <div style={{ opacity:.8 }}><PIcon p={msg.platform} s={9}/></div>
                  {/* Unread dot */}
                  {msg.unread&&<div style={{ position:"absolute",top:4,right:4,width:7,height:7,borderRadius:"50%",background:B.g2,border:`1.5px solid ${B.dark}` }}/>}
                </button>
              ))}
              {/* All messages button */}
              <button className="t" onClick={()=>setTab("messages")}
                style={{ width:56,height:32,borderRadius:10,background:B.dim,border:`1px solid ${B.border}`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontSize:9,color:B.muted,fontWeight:700 }}>All →</span>
              </button>
            </div>
          </div>
        </div>}

        {/* ══ LEADS ══ */}
        {tab==="leads" && !selLead && !showNewLead && <div className="fi">
          {/* Stats */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:7,marginBottom:16 }}>
            {[
              { l:t.totalLeads, v:leads.length, c:B.text },
              { l:t.openLeads, v:openLeads.length, c:"#FFB84D" },
              { l:t.wonCount, v:wonLeads.length, c:B.g2 },
              { l:t.conversionRate, v:`${winRate}%`, c:"#60CFFF" },
            ].map((s,i)=>(
              <div key={i} style={{ background:B.card,borderRadius:12,padding:"10px 6px",textAlign:"center",border:`1px solid ${s.c}18` }}>
                <div style={{ fontSize:15,fontWeight:800,color:s.c,fontFamily:"'Outfit',sans-serif" }}>{s.v}</div>
                <div style={{ fontSize:7.5,color:B.muted,marginTop:2,fontWeight:600 }}>{s.l.toUpperCase()}</div>
              </div>
            ))}
          </div>

          {/* Pipeline bar */}
          <div style={{ background:B.card,borderRadius:12,padding:"10px 14px",marginBottom:14,border:`1px solid ${B.border}` }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <span style={{ fontSize:10,fontWeight:700,color:B.muted }}>{t.pipeline.toUpperCase()}</span>
              <span style={{ fontSize:13,fontWeight:800,color:"#60CFFF",fontFamily:"'Outfit',sans-serif" }}>${pipelineValue}</span>
            </div>
            <div style={{ display:"flex",height:8,borderRadius:4,overflow:"hidden",gap:2 }}>
              {Object.entries(STATUS_CONFIG).filter(([s])=>s!=="lost").map(([s,cfg])=>{
                const count=leads.filter(l=>l.status===s).length;
                return count>0 ? <div key={s} style={{ flex:count,background:cfg.color,opacity:.75,borderRadius:3 }}/> : null;
              })}
            </div>
            <div style={{ display:"flex",gap:10,marginTop:8 }}>
              {Object.entries(STATUS_CONFIG).filter(([s])=>s!=="lost").map(([s,cfg])=>(
                <div key={s} style={{ display:"flex",alignItems:"center",gap:3 }}>
                  <div style={{ width:7,height:7,borderRadius:"50%",background:cfg.color }}/>
                  <span style={{ fontSize:8.5,color:B.muted }}>{t[cfg.label]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filter tabs + add button */}
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
            <div style={{ display:"flex",gap:5,overflowX:"auto" }}>
              {[["all",t.allLeads],["hot",t.hotLeads],["follow-up",t.followUp],["won",t.wonLeads]].map(([f,label])=>(
                <button key={f} className="t" onClick={()=>setLeadFilter(f)}
                  style={{ padding:"5px 11px",borderRadius:14,fontSize:10,fontWeight:700,whiteSpace:"nowrap",background:leadFilter===f?B.g1:B.dim,color:leadFilter===f?"#fff":B.muted,border:"none" }}>
                  {label}{f==="follow-up"&&followUpCount>0?` (${followUpCount})`:""}
                </button>
              ))}
            </div>
            <button className="t" onClick={()=>setShowNewLead(true)} style={{ background:`linear-gradient(135deg,${B.g1},${B.g2})`,color:"#fff",padding:"6px 13px",borderRadius:14,fontSize:11,fontWeight:700,flexShrink:0,marginLeft:8 }}>+ New</button>
          </div>

          {/* Lead cards */}
          {filteredLeads.length===0 && <div style={{ textAlign:"center",padding:"30px",color:B.muted,fontSize:13 }}>No leads in this category</div>}
          {filteredLeads.map(lead=>{
            const sc=STATUS_CONFIG[lead.status];
            return (
              <div key={lead.id} className="t" onClick={()=>setSelLead(lead)}
                style={{ background:B.card,borderRadius:14,padding:"13px 14px",marginBottom:10,border:`1px solid ${sc.border}` }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <div style={{ width:38,height:38,borderRadius:"50%",background:`${sc.color}18`,color:sc.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0 }}>
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize:13,fontWeight:700,color:B.text }}>{lead.name}</div>
                      <div style={{ display:"flex",alignItems:"center",gap:6,marginTop:3 }}>
                        <span style={{ fontSize:9.5 }}>{SVC_ICONS[lead.service]}</span>
                        <span style={{ fontSize:10,color:B.muted,textTransform:"capitalize" }}>{t[lead.service]}</span>
                        <span style={{ fontSize:9,color:B.muted }}>· via</span>
                        <PIcon p={lead.source} s={10}/>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ padding:"3px 8px",borderRadius:10,fontSize:8.5,fontWeight:700,background:sc.bg,color:sc.color,border:`1px solid ${sc.border}`,marginBottom:4 }}>{t[sc.label].toUpperCase()}</div>
                    {lead.quote>0&&<div style={{ fontSize:11,fontWeight:700,color:"#60CFFF" }}>${lead.quote}</div>}
                  </div>
                </div>
                {lead.note&&<div style={{ fontSize:11,color:B.muted,fontStyle:"italic",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",paddingTop:6,borderTop:`1px solid ${B.border}` }}>"{lead.note}"</div>}
                {lead.followUpAt&&<div style={{ fontSize:10,color:"#FFB84D",marginTop:5 }}>🔔 Follow-up: {lead.followUpAt}</div>}
                {lead.status==="won"&&!lead.reviewSent&&<div style={{ fontSize:10,color:B.g2,marginTop:5 }}>⭐ Review not sent yet — tap to send</div>}
              </div>
            );
          })}
        </div>}

        {/* ══ NEW LEAD FORM ══ */}
        {tab==="leads" && showNewLead && <div className="fi">
          <button className="t" onClick={()=>setShowNewLead(false)} style={{ background:B.dim,color:B.muted,padding:"6px 13px",borderRadius:20,fontSize:11,fontWeight:600,marginBottom:18,display:"flex",alignItems:"center",gap:5 }}>← {t.leads}</button>
          <div style={{ fontSize:19,fontWeight:900,color:B.text,marginBottom:20,fontFamily:"'Outfit',sans-serif" }}>{t.newLead}</div>
          {[
            { key:"name", label:t.leadName, ph:"Sarah Mitchell", required:true },
            { key:"phone", label:t.leadPhone, ph:"(480) 555-0192" },
            { key:"email", label:t.leadEmail, ph:"sarah@company.com" },
          ].map(f=>(
            <div key={f.key} style={{ marginBottom:13 }}>
              <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:.8,marginBottom:7 }}>{f.label.toUpperCase()}{f.required?" *":""}</div>
              <div style={{ background:B.card,border:`1px solid ${B.border}`,borderRadius:12,padding:"11px 13px" }}>
                <input placeholder={f.ph} value={newLead[f.key]} onChange={e=>setNewLead(p=>({...p,[f.key]:e.target.value}))} style={{ ...inp,width:"100%" }}/>
              </div>
            </div>
          ))}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:13 }}>
            <div>
              <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:.8,marginBottom:7 }}>{t.leadService.toUpperCase()}</div>
              <div style={{ background:B.card,border:`1px solid ${B.border}`,borderRadius:12,padding:"11px 13px" }}>
                <select value={newLead.service} onChange={e=>setNewLead(p=>({...p,service:e.target.value}))} style={{ ...inp,width:"100%" }}>
                  {SVC_TYPES.map(s=><option key={s} value={s}>{SVC_ICONS[s]} {t[s]}</option>)}
                </select>
              </div>
            </div>
            <div>
              <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:.8,marginBottom:7 }}>{t.leadSource.toUpperCase()}</div>
              <div style={{ background:B.card,border:`1px solid ${B.border}`,borderRadius:12,padding:"11px 13px" }}>
                <select value={newLead.source} onChange={e=>setNewLead(p=>({...p,source:e.target.value}))} style={{ ...inp,width:"100%" }}>
                  {["instagram","facebook","google"].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:.8,marginBottom:7 }}>{t.leadNote.toUpperCase()}</div>
            <div style={{ background:B.card,border:`1px solid ${B.border}`,borderRadius:12,padding:"11px 13px" }}>
              <textarea rows={3} placeholder={t.addNote} value={newLead.note} onChange={e=>setNewLead(p=>({...p,note:e.target.value}))} style={{ ...inp,lineHeight:1.5,width:"100%" }}/>
            </div>
          </div>
          <button className="t" onClick={saveNewLead} disabled={!newLead.name.trim()}
            style={{ width:"100%",padding:"15px",background:newLead.name.trim()?`linear-gradient(135deg,${B.g1},${B.g2})`:B.dim,color:newLead.name.trim()?"#fff":B.muted,borderRadius:15,fontSize:15,fontWeight:700 }}>
            ✓ {t.saveLead}
          </button>
        </div>}

        {/* ══ LEAD DETAIL ══ */}
        {tab==="leads" && selLead && <div className="fi">
          {(() => {
            const lead=leads.find(l=>l.id===selLead.id)||selLead;
            const sc=STATUS_CONFIG[lead.status];
            const [noteText,setNoteText]=useState(lead.note||"");
            return <>
              <button className="t" onClick={()=>setSelLead(null)} style={{ background:B.dim,color:B.muted,padding:"6px 13px",borderRadius:20,fontSize:11,fontWeight:600,marginBottom:18,display:"flex",alignItems:"center",gap:5 }}>← {t.leads}</button>

              {/* Lead header */}
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:18 }}>
                <div style={{ width:50,height:50,borderRadius:"50%",background:`${sc.color}18`,color:sc.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,flexShrink:0 }}>{lead.name.charAt(0)}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:17,fontWeight:800,color:B.text,fontFamily:"'Outfit',sans-serif" }}>{lead.name}</div>
                  <div style={{ display:"flex",alignItems:"center",gap:6,marginTop:4 }}>
                    <span style={{ padding:"2px 8px",borderRadius:10,fontSize:9,fontWeight:700,background:sc.bg,color:sc.color,border:`1px solid ${sc.border}` }}>{t[sc.label]}</span>
                    <span style={{ fontSize:10 }}>{SVC_ICONS[lead.service]}</span>
                    <span style={{ fontSize:10,color:B.muted }}>{t[lead.service]}</span>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div style={{ background:B.card,borderRadius:14,padding:"13px 14px",marginBottom:14,border:`1px solid ${B.border}` }}>
                {[
                  { icon:"📞", val:lead.phone||"—" },
                  { icon:"✉️", val:lead.email||"—" },
                  { icon:"📅", val:`Added ${lead.createdAt}` },
                  { icon:"📍", val:`via ${lead.source.charAt(0).toUpperCase()+lead.source.slice(1)}` },
                ].map((row,i)=>(
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:10,paddingBottom:i<3?10:0,marginBottom:i<3?10:0,borderBottom:i<3?`1px solid ${B.border}`:"none" }}>
                    <span style={{ fontSize:14 }}>{row.icon}</span>
                    <span style={{ fontSize:13,color:B.text }}>{row.val}</span>
                  </div>
                ))}
              </div>

              {/* Quote section */}
              {!["won","lost"].includes(lead.status) && <div style={{ background:B.card,borderRadius:14,padding:"13px 14px",marginBottom:14,border:`1px solid #60CFFF22` }}>
                <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:1,marginBottom:10 }}>{t.quoteAmount.toUpperCase()}</div>
                <div style={{ display:"flex",gap:9 }}>
                  <div style={{ flex:1,background:B.surface,border:`1px solid ${B.border}`,borderRadius:11,padding:"10px 13px" }}>
                    <input type="number" placeholder={lead.quote||"0"} value={quoteAmt} onChange={e=>setQuoteAmt(e.target.value)} style={{ ...inp,width:"100%",fontSize:16,fontWeight:700 }}/>
                  </div>
                  <button className="t" onClick={()=>sendQuote(lead)}
                    style={{ background:`linear-gradient(135deg,${B.g1},${B.g2})`,color:"#fff",padding:"10px 16px",borderRadius:11,fontSize:12,fontWeight:700,whiteSpace:"nowrap" }}>
                    {lead.status==="quoted"?t.quoteSent:t.sendQuote}
                  </button>
                </div>
              </div>}

              {/* Action buttons */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:14 }}>
                {lead.status!=="won" && lead.status!=="lost" && <>
                  <button className="t" onClick={()=>sendFollowUp(lead)} style={{ padding:"11px",background:"#FFB84D18",border:"1px solid #FFB84D44",borderRadius:12,color:"#FFB84D",fontSize:12,fontWeight:700 }}>🔔 Follow-up</button>
                  <button className="t" onClick={()=>updateLeadStatus(lead.id,"won")} style={{ padding:"11px",background:`${B.g2}18`,border:`1px solid ${B.g2}44`,borderRadius:12,color:B.g2,fontSize:12,fontWeight:700 }}>✓ {t.markWon}</button>
                  <button className="t" onClick={()=>updateLeadStatus(lead.id,"lost")} style={{ padding:"11px",background:"#66668818",border:"1px solid #66668844",borderRadius:12,color:"#888888",fontSize:12,fontWeight:700 }}>✗ {t.markLost}</button>
                  <button className="t" onClick={()=>{ setReply(t.offerTemplates[lead.service]||""); setSelMsg({name:lead.name,platform:"instagram",avatar:lead.name.charAt(0),color:B.g2}); setTab("messages"); }} style={{ padding:"11px",background:"#4285F418",border:"1px solid #4285F444",borderRadius:12,color:"#4285F4",fontSize:12,fontWeight:700 }}>💬 Message</button>
                </>}
                {lead.status==="won" && !lead.reviewSent && (
                  <button className="t" onClick={()=>sendReview(lead)} style={{ padding:"11px",background:"#FFB84D18",border:"1px solid #FFB84D44",borderRadius:12,color:"#FFB84D",fontSize:13,fontWeight:700,gridColumn:"1/-1" }}>⭐ {t.reviewRequest}</button>
                )}
                {lead.status==="won" && lead.reviewSent && (
                  <div style={{ padding:"11px",background:`${B.g2}10`,border:`1px solid ${B.g2}33`,borderRadius:12,color:B.g2,fontSize:12,fontWeight:600,textAlign:"center",gridColumn:"1/-1" }}>⭐ Review link sent ✓</div>
                )}
              </div>

              {/* Review message preview */}
              {lead.status==="won" && !lead.reviewSent && (
                <div style={{ background:B.card,borderRadius:13,padding:"12px 14px",marginBottom:14,border:`1px solid #FFB84D22` }}>
                  <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:1,marginBottom:8 }}>REVIEW MESSAGE PREVIEW</div>
                  <div style={{ fontSize:11.5,color:"#9ac8b0",lineHeight:1.7,whiteSpace:"pre-line" }}>{t.reviewMsg}</div>
                </div>
              )}

              {/* Note */}
              <div style={{ background:B.card,borderRadius:13,padding:"12px 14px",border:`1px solid ${B.border}` }}>
                <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:1,marginBottom:8 }}>{t.leadNote.toUpperCase()}</div>
                <textarea rows={3} placeholder={t.addNote} value={noteText} onChange={e=>setNoteText(e.target.value)} style={{ ...inp,lineHeight:1.55,width:"100%",fontSize:13 }}/>
                <div style={{ display:"flex",justifyContent:"flex-end",marginTop:8 }}>
                  <button className="t" onClick={()=>saveNote(lead.id,noteText)} style={{ background:`${B.g1}22`,color:B.g2,padding:"6px 14px",borderRadius:10,fontSize:11,fontWeight:600,border:`1px solid ${B.g1}44` }}>Save note</button>
                </div>
              </div>
            </>;
          })()}
        </div>}

        {/* ══ MESSAGES ══ */}
        {tab==="messages" && !selMsg && <div className="fi">
          <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:1.2,marginBottom:14 }}>{t.messages.toUpperCase()}</div>
          {messages.map(msg=>(
            <div key={msg.id} className="t" onClick={()=>setSelMsg(msg)}
              style={{ background:msg.unread?"#0E2318":B.card,borderRadius:14,padding:"13px 15px",marginBottom:9,display:"flex",alignItems:"center",gap:12,border:msg.unread?`1px solid ${B.g1}55`:`1px solid ${B.border}` }}>
              <div style={{ position:"relative",flexShrink:0 }}>
                <div style={{ width:42,height:42,borderRadius:"50%",background:`${msg.color}18`,color:msg.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700 }}>{msg.avatar}</div>
                <div style={{ position:"absolute",bottom:-2,right:-2,width:16,height:16,borderRadius:"50%",background:B.dark,display:"flex",alignItems:"center",justifyContent:"center" }}><PIcon p={msg.platform} s={9}/></div>
              </div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                  <span style={{ fontSize:14,fontWeight:600,color:B.text }}>{msg.name}</span>
                  <span style={{ fontSize:10,color:B.muted }}>{msg.time}</span>
                </div>
                <div style={{ fontSize:12,color:B.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{msg.text}</div>
              </div>
              {msg.unread&&<div style={{ width:8,height:8,borderRadius:"50%",background:B.g2,flexShrink:0 }}/>}
            </div>
          ))}
        </div>}

        {tab==="messages" && selMsg && <div className="fi">
          <button className="t" onClick={()=>setSelMsg(null)} style={{ background:B.dim,color:B.muted,padding:"6px 13px",borderRadius:20,fontSize:11,fontWeight:600,marginBottom:18,display:"flex",alignItems:"center",gap:5 }}>← {t.messages}</button>
          <div style={{ display:"flex",alignItems:"center",gap:11,marginBottom:18 }}>
            <div style={{ width:46,height:46,borderRadius:"50%",background:`${selMsg.color}1A`,color:selMsg.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700 }}>{selMsg.avatar}</div>
            <div>
              <div style={{ fontSize:16,fontWeight:700,color:B.text }}>{selMsg.name}</div>
              <div style={{ display:"flex",alignItems:"center",gap:5,marginTop:3 }}>
                {selMsg.platform && <PIcon p={selMsg.platform} s={11}/>}
                <span style={{ fontSize:11,color:B.muted,textTransform:"capitalize" }}>{selMsg.platform||"direct"}</span>
              </div>
            </div>
          </div>
          {selMsg.text&&<div style={{ background:B.card,borderRadius:"4px 16px 16px 16px",padding:"13px 15px",marginBottom:18,fontSize:14,color:"#b8d8c8",lineHeight:1.65,borderLeft:`3px solid ${selMsg.color}` }}>{selMsg.text}</div>}
          <button className="t" onClick={()=>{setOfferOpen(true);setSelSvc(null);}} style={{ width:"100%",padding:"11px",background:`${B.g1}18`,border:`1px solid ${B.g1}44`,borderRadius:12,marginBottom:13,color:B.g2,fontSize:13,fontWeight:600,textAlign:"center" }}>✦ {t.newOffer}</button>
          <div style={{ background:B.card,borderRadius:16,padding:13,border:`1px solid ${B.border}` }}>
            <textarea value={reply} onChange={e=>setReply(e.target.value)} placeholder={t.writeMessage} rows={3} style={{ ...inp,lineHeight:1.55,width:"100%" }}/>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10 }}>
              <span style={{ fontSize:10,color:B.muted }}>📞 {t.phone}</span>
              <button className={`t ${sent?"sb":""}`} onClick={doSend} style={{ background:`linear-gradient(135deg,${B.g1},${B.g2})`,color:"#fff",padding:"9px 20px",borderRadius:11,fontSize:13,fontWeight:700 }}>{t.send} →</button>
            </div>
          </div>
        </div>}

        {/* ══ POST ══ */}
        {tab==="post" && <div className="fi">
          <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:1.2,marginBottom:16 }}>{t.beforeAfterPost.toUpperCase()}</div>
          {published&&<div className="pop" style={{ background:`${B.g2}18`,border:`1px solid ${B.g2}55`,borderRadius:16,padding:"18px",textAlign:"center",marginBottom:16 }}><div style={{ fontSize:28,marginBottom:8 }}>🎉</div><div style={{ fontSize:16,fontWeight:800,color:B.g2 }}>{t.published}</div></div>}
          {!published&&<>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14 }}>
              {[{type:"before",label:t.beforePhoto,img:beforeImg,color:"#FF6B6B"},{type:"after",label:t.afterPhoto,img:afterImg,color:B.g2}].map(slot=>(
                <label key={slot.type} style={{ cursor:"pointer",display:"block" }}>
                  <input type="file" accept="image/*" capture="environment" onChange={e=>handleImg(e,slot.type)} style={{ display:"none" }}/>
                  <div style={{ aspectRatio:"1",borderRadius:14,border:slot.img?"none":`2px dashed ${slot.color}55`,background:slot.img?"none":`${slot.color}08`,overflow:"hidden",position:"relative",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
                    {slot.img?<><img src={slot.img} alt={slot.type} style={{ width:"100%",height:"100%",objectFit:"cover" }}/><div style={{ position:"absolute",top:6,left:6,background:slot.type==="before"?"#00000099":`${B.g1}dd`,color:"#fff",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:5 }}>{slot.label}</div></>:<><div style={{ fontSize:26,marginBottom:5 }}>📷</div><div style={{ fontSize:10,fontWeight:700,color:slot.color }}>{slot.label}</div><div style={{ fontSize:9,color:B.muted,marginTop:2 }}>{t.tapToAdd}</div></>}
                  </div>
                </label>
              ))}
            </div>
            {beforeImg&&afterImg&&<div style={{ marginBottom:14 }}><div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:1,marginBottom:8 }}>PREVIEW</div><BeforeAfterSlider before={beforeImg} after={afterImg}/></div>}
            {(!beforeImg||!afterImg)&&<div style={{ background:B.card,borderRadius:12,padding:"14px",textAlign:"center",marginBottom:14,border:`1px solid ${B.border}` }}><div style={{ fontSize:11,color:B.muted }}>{t.noPhotos}</div></div>}
            <div style={{ marginBottom:13 }}>
              <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:1,marginBottom:8 }}>{t.caption.toUpperCase()}</div>
              <div style={{ background:B.card,border:`1px solid ${B.border}`,borderRadius:13,padding:"12px 14px" }}>
                <textarea rows={4} placeholder={t.captionPlaceholder} value={caption} onChange={e=>setCaption(e.target.value)} style={{ ...inp,lineHeight:1.6,fontSize:13,width:"100%" }}/>
              </div>
            </div>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:1,marginBottom:10 }}>{t.shareOn.toUpperCase()}</div>
              <div style={{ display:"flex",gap:9 }}>
                {["instagram","facebook"].map(p=>{const sel=postPlatforms.includes(p);return(
                  <button key={p} className="t" onClick={()=>togglePostP(p)} style={{ flex:1,padding:"11px 6px",borderRadius:13,background:sel?`${PC[p]}18`:B.card,border:sel?`1.5px solid ${PC[p]}88`:`1.5px solid ${B.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:6 }}>
                    <PIcon p={p} s={20}/><span style={{ fontSize:9,fontWeight:700,color:sel?PC[p]:B.muted,textTransform:"capitalize" }}>{p.charAt(0).toUpperCase()+p.slice(1)}</span>
                  </button>
                );})}
              </div>
            </div>
            <button className="t" onClick={doPublish} disabled={!beforeImg||!afterImg||postPlatforms.length===0||publishing}
              style={{ width:"100%",padding:"15px",background:beforeImg&&afterImg&&postPlatforms.length>0?`linear-gradient(135deg,${B.g1},${B.g2})`:B.dim,color:beforeImg&&afterImg&&postPlatforms.length>0?"#fff":B.muted,borderRadius:15,fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
              {publishing?<><div className="sp" style={{ width:15,height:15,border:"2px solid #ffffff44",borderTopColor:"#fff",borderRadius:"50%" }}/> {t.publishing}</>:`📤 ${t.publishNow}`}
            </button>
          </>}
          {posts.length>0&&<><div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:1.2,marginTop:22,marginBottom:11 }}>{t.postHistory.toUpperCase()}</div>
          {posts.map(p=>(
            <div key={p.id} style={{ background:B.card,borderRadius:13,padding:"11px 13px",marginBottom:8,border:`1px solid ${B.border}` }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                <div style={{ display:"flex",gap:5 }}>{p.platforms.map(pl=><div key={pl} style={{ width:20,height:20,borderRadius:5,background:`${PC[pl]}15`,display:"flex",alignItems:"center",justifyContent:"center" }}><PIcon p={pl} s={11}/></div>)}</div>
                <span style={{ fontSize:9.5,color:B.muted }}>{p.time}</span>
              </div>
              <div style={{ fontSize:11.5,color:"#9ac8b0",lineHeight:1.5,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical" }}>{p.caption}</div>
              <div style={{ display:"flex",gap:12,marginTop:7 }}><span style={{ fontSize:10,color:B.muted }}>❤️ {p.likes}</span><span style={{ fontSize:10,color:B.muted }}>👁 {p.reach}</span></div>
            </div>
          ))}</>}
        </div>}

        {/* ══ SOCIAL CAMPAIGNS ══ */}
        {tab==="campaigns" && !newCamp && <div className="fi">
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
            <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:1.2 }}>{t.campaigns.toUpperCase()}</div>
            <button className="t" onClick={()=>setNewCamp(true)} style={{ background:`linear-gradient(135deg,${B.g1},${B.g2})`,color:"#fff",padding:"7px 15px",borderRadius:20,fontSize:12,fontWeight:700 }}>+ New</button>
          </div>
          {socialCamps.map(c=>(
            <div key={c.id} style={{ background:B.card,borderRadius:16,padding:15,marginBottom:11,border:c.status==="active"?`1px solid ${B.g1}33`:`1px solid ${B.border}` }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:11 }}>
                <div><div style={{ fontSize:14,fontWeight:700,color:B.text,marginBottom:6 }}>{c.title}</div><div style={{ display:"flex",gap:5 }}>{c.platforms.map(p=><div key={p} style={{ width:22,height:22,borderRadius:6,background:`${PC[p]}15`,display:"flex",alignItems:"center",justifyContent:"center" }}><PIcon p={p} s={12}/></div>)}</div></div>
                <div style={{ padding:"3px 9px",borderRadius:20,fontSize:9,fontWeight:700,background:c.status==="active"?`${B.g2}18`:"#ff666618",color:c.status==="active"?B.g2:"#ff8888",border:`1px solid ${c.status==="active"?B.g2+"44":"#ff666644"}` }}>{c.status==="active"?t.active.toUpperCase():t.paused.toUpperCase()}</div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7 }}>
                {[{l:t.reach,v:c.reach.toLocaleString()},{l:t.clicks,v:c.clicks},{l:t.budget,v:`$${c.budget}/d`}].map((s,i)=>(
                  <div key={i} style={{ background:B.surface,borderRadius:9,padding:"8px",textAlign:"center" }}><div style={{ fontSize:14,fontWeight:700,color:B.text }}>{s.v}</div><div style={{ fontSize:8,color:B.muted,marginTop:2 }}>{s.l.toUpperCase()}</div></div>
                ))}
              </div>
            </div>
          ))}
        </div>}

        {tab==="campaigns" && newCamp && <div className="fi">
          <button className="t" onClick={()=>setNewCamp(false)} style={{ background:B.dim,color:B.muted,padding:"6px 13px",borderRadius:20,fontSize:11,fontWeight:600,marginBottom:18 }}>← {t.campaigns}</button>
          <div style={{ fontSize:19,fontWeight:900,color:B.text,marginBottom:20,fontFamily:"'Outfit',sans-serif" }}>New Campaign</div>
          {[{key:"title",label:t.adTitle,ph:"Spring Commercial Special..."},{key:"body",label:t.adBody,ph:"Professional office cleaning...",ta:true},{key:"budget",label:t.budget,ph:"50",type:"number"}].map(f=>(
            <div key={f.key} style={{ marginBottom:13 }}>
              <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:.8,marginBottom:7 }}>{f.label.toUpperCase()}</div>
              <div style={{ background:B.card,border:`1px solid ${B.border}`,borderRadius:12,padding:"11px 13px" }}>
                {f.ta?<textarea rows={3} placeholder={f.ph} value={nc[f.key]} onChange={e=>setNc(p=>({...p,[f.key]:e.target.value}))} style={{ ...inp,lineHeight:1.5,width:"100%" }}/>:<input type={f.type||"text"} placeholder={f.ph} value={nc[f.key]} onChange={e=>setNc(p=>({...p,[f.key]:e.target.value}))} style={{ ...inp,width:"100%" }}/>}
              </div>
            </div>
          ))}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:9.5,fontWeight:700,color:B.muted,letterSpacing:.8,marginBottom:10 }}>{t.selectPlatforms.toUpperCase()}</div>
            <div style={{ display:"flex",gap:9 }}>
              {["instagram","facebook","google"].map(p=>{const sel=nc.platforms.includes(p);return(
                <button key={p} className="t" onClick={()=>toggleP(p)} style={{ flex:1,padding:"11px 6px",borderRadius:13,background:sel?`${PC[p]}18`:B.card,border:sel?`1.5px solid ${PC[p]}88`:`1.5px solid ${B.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:6 }}>
                  <PIcon p={p} s={19}/><span style={{ fontSize:8.5,fontWeight:700,color:sel?PC[p]:B.muted,textTransform:"capitalize" }}>{p==="google"?"Google":p.charAt(0).toUpperCase()+p.slice(1)}</span>
                </button>
              );})}
            </div>
          </div>
          <button className="t" onClick={doLaunch} disabled={!nc.title||nc.platforms.length===0}
            style={{ width:"100%",padding:"15px",background:nc.title&&nc.platforms.length>0?`linear-gradient(135deg,${B.g1},${B.g2})`:B.dim,color:nc.title&&nc.platforms.length>0?"#fff":B.muted,borderRadius:15,fontSize:15,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
            {launching?<><div className="sp" style={{ width:15,height:15,border:"2px solid #ffffff44",borderTopColor:"#fff",borderRadius:"50%" }}/> Launching...</>:`🚀 ${t.launch}`}
          </button>
        </div>}

        {/* ══ GOOGLE ADS ══ */}
        {tab==="googleads" && !selGCamp && <div className="fi">
          <div style={{ background:B.card,borderRadius:16,padding:"14px 16px",marginBottom:14,border:"1px solid #4285F422" }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:12 }}><GAdsIcon s={16}/><span style={{ fontSize:13,fontWeight:700,color:B.text }}>Google Ads Overview</span></div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12 }}>
              <div style={{ background:B.surface,borderRadius:11,padding:"11px" }}><div style={{ fontSize:9,color:B.muted,marginBottom:4 }}>{t.totalSpend}</div><div style={{ fontSize:20,fontWeight:800,color:"#FBBC05",fontFamily:"'Outfit',sans-serif" }}>${totalSpend.toFixed(2)}</div><Spark data={spendData} color="#FBBC05"/></div>
              <div style={{ background:B.surface,borderRadius:11,padding:"11px" }}><div style={{ fontSize:9,color:B.muted,marginBottom:4 }}>{t.clicks}</div><div style={{ fontSize:20,fontWeight:800,color:"#4285F4",fontFamily:"'Outfit',sans-serif" }}>{totalClicks}</div><Spark data={clickData} color="#4285F4"/></div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:7 }}>
              {[{l:t.impressions,v:totalImpressions.toLocaleString(),c:"#9AA0A6"},{l:t.conversions,v:totalConversions,c:"#34A853"},{l:t.cpc,v:`$${(gCamps.reduce((a,c)=>a+c.cpc,0)/gCamps.length).toFixed(2)}`,c:"#FBBC05"},{l:t.ctr,v:`${((totalClicks/totalImpressions)*100).toFixed(1)}%`,c:"#4285F4"}].map((s,i)=>(
                <div key={i} style={{ background:B.surface,borderRadius:8,padding:"7px 5px",textAlign:"center" }}><div style={{ fontSize:12,fontWeight:700,color:s.c }}>{s.v}</div><div style={{ fontSize:7.5,color:B.muted,marginTop:2 }}>{s.l.toUpperCase()}</div></div>
              ))}
            </div>
          </div>
          {gCamps.map(c=>(
            <div key={c.id} className="t" onClick={()=>setSelGCamp(c)} style={{ background:B.card,borderRadius:14,padding:"13px 14px",marginBottom:10,border:c.status==="active"?"1px solid #4285F422":`1px solid ${B.border}` }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10 }}>
                <div style={{ flex:1,minWidth:0,paddingRight:8 }}>
                  <div style={{ fontSize:13,fontWeight:700,color:B.text,marginBottom:4 }}>{c.name}</div>
                  <div style={{ display:"flex",gap:5 }}>
                    <span style={{ fontSize:9,padding:"2px 7px",borderRadius:9,background:c.type==="search"?"#4285F418":"#34A85318",color:c.type==="search"?"#4285F4":"#34A853",fontWeight:700 }}>{c.type==="search"?t.searchCampaigns:t.displayCampaigns}</span>
                    <span style={{ fontSize:9,padding:"2px 7px",borderRadius:9,background:SB[c.adStrength],color:SC[c.adStrength],fontWeight:700 }}>{t[c.adStrength]}</span>
                  </div>
                </div>
                <button className="t" onClick={e=>{e.stopPropagation();toggleGStatus(c.id);}} style={{ padding:"4px 10px",borderRadius:12,fontSize:9,fontWeight:700,background:c.status==="active"?`${B.g2}18`:"#FF6B6B18",color:c.status==="active"?B.g2:"#FF6B6B",border:`1px solid ${c.status==="active"?B.g2+"44":"#FF6B6B44"}` }}>
                  {c.status==="active"?t.active:t.paused}
                </button>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6 }}>
                {[{l:t.totalSpend,v:`$${c.spend.toFixed(2)}`,c:"#FBBC05"},{l:t.impressions,v:c.impressions.toLocaleString(),c:"#9AA0A6"},{l:t.clicks,v:c.clicks,c:"#4285F4"},{l:t.conversions,v:c.conversions,c:"#34A853"}].map((s,i)=>(
                  <div key={i} style={{ background:B.surface,borderRadius:8,padding:"7px 4px",textAlign:"center" }}><div style={{ fontSize:11,fontWeight:700,color:s.c }}>{s.v}</div><div style={{ fontSize:7,color:B.muted,marginTop:2 }}>{s.l.toUpperCase()}</div></div>
                ))}
              </div>
            </div>
          ))}
        </div>}

        {tab==="googleads" && selGCamp && <div className="fi">
          <button className="t" onClick={()=>setSelGCamp(null)} style={{ background:B.dim,color:B.muted,padding:"6px 13px",borderRadius:20,fontSize:11,fontWeight:600,marginBottom:18,display:"flex",alignItems:"center",gap:5 }}>← Google Ads</button>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16 }}>
            <div><div style={{ fontSize:16,fontWeight:800,color:B.text,marginBottom:5,fontFamily:"'Outfit',sans-serif" }}>{selGCamp.name}</div><div style={{ display:"flex",gap:5 }}><span style={{ fontSize:9,padding:"2px 7px",borderRadius:9,background:selGCamp.type==="search"?"#4285F418":"#34A85318",color:selGCamp.type==="search"?"#4285F4":"#34A853",fontWeight:700 }}>{selGCamp.type==="search"?t.searchCampaigns:t.displayCampaigns}</span></div></div>
            <button className="t" onClick={()=>toggleGStatus(selGCamp.id)} style={{ padding:"6px 12px",borderRadius:12,fontSize:10,fontWeight:700,background:selGCamp.status==="active"?`${B.g2}18`:"#FF6B6B18",color:selGCamp.status==="active"?B.g2:"#FF6B6B",border:`1px solid ${selGCamp.status==="active"?B.g2+"44":"#FF6B6B44"}` }}>
              {selGCamp.status==="active"?`⏸ ${t.pausing}`:`▶ ${t.resuming}`}
            </button>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:14 }}>
            {[{l:t.totalSpend,v:`$${selGCamp.spend.toFixed(2)}`,c:"#FBBC05",sub:`Budget: $${selGCamp.budget}/day`},{l:t.impressions,v:selGCamp.impressions.toLocaleString(),c:"#9AA0A6",sub:`CTR ${selGCamp.ctr}%`},{l:t.clicks,v:selGCamp.clicks,c:"#4285F4",sub:`Avg CPC $${selGCamp.cpc}`},{l:t.conversions,v:selGCamp.conversions,c:"#34A853",sub:`ROAS ${selGCamp.roas}x`}].map((s,i)=>(
              <div key={i} style={{ background:B.card,borderRadius:13,padding:"12px 13px",border:`1px solid ${s.c}22` }}><div style={{ fontSize:9,color:B.muted,marginBottom:4 }}>{s.l}</div><div style={{ fontSize:20,fontWeight:800,color:s.c,fontFamily:"'Outfit',sans-serif" }}>{s.v}</div><div style={{ fontSize:9,color:B.muted,marginTop:4 }}>{s.sub}</div></div>
            ))}
          </div>
          <div style={{ background:B.card,borderRadius:13,padding:"12px 13px",marginBottom:12,border:`1px solid ${B.border}` }}>
            <div style={{ fontSize:9,fontWeight:700,color:B.muted,letterSpacing:1,marginBottom:9 }}>{t.adPreview.toUpperCase()}</div>
            <div style={{ background:"#fff",borderRadius:9,padding:"11px 13px" }}><div style={{ fontSize:8.5,color:"#5F6368",marginBottom:2 }}>Ad · officecleana.com</div><div style={{ fontSize:13,color:"#1A0DAB",fontWeight:600,marginBottom:3,lineHeight:1.3 }}>{selGCamp.headline}</div><div style={{ fontSize:11,color:"#4D5156",lineHeight:1.5 }}>{selGCamp.description}</div></div>
          </div>
          <div style={{ background:B.card,borderRadius:13,padding:"12px 13px",border:`1px solid ${B.border}` }}>
            <div style={{ fontSize:9,fontWeight:700,color:B.muted,letterSpacing:1,marginBottom:9 }}>{t.keywords.toUpperCase()}</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>{selGCamp.keywords.map((kw,i)=><span key={i} style={{ padding:"4px 10px",borderRadius:18,background:"#4285F415",color:"#4285F4",fontSize:11,fontWeight:600,border:"1px solid #4285F430" }}>🔍 {kw}</span>)}</div>
          </div>
        </div>}
      </div>

      {/* OFFER MODAL */}
      {offerOpen&&<div style={{ position:"fixed",inset:0,background:"#000000AA",zIndex:100,display:"flex",alignItems:"flex-end" }} onClick={()=>setOfferOpen(false)}>
        <div className="su" onClick={e=>e.stopPropagation()} style={{ background:B.card,borderRadius:"22px 22px 0 0",padding:"18px 17px 40px",width:"100%",border:`1px solid ${B.border}`,maxHeight:"80vh",overflowY:"auto" }}>
          <div style={{ width:34,height:4,background:B.dim,borderRadius:2,margin:"0 auto 14px" }}/>
          <div style={{ fontSize:14,fontWeight:800,color:B.text,marginBottom:12 }}>✦ {t.newOffer}</div>
          {!selSvc?<><div style={{ fontSize:9,fontWeight:700,color:B.muted,letterSpacing:1,marginBottom:10 }}>{t.selectService.toUpperCase()}</div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:7 }}>
            {SVC_TYPES.map(s=><button key={s} className="t" onClick={()=>setSelSvc(s)} style={{ background:B.surface,border:`1px solid ${B.border}`,borderRadius:11,padding:"10px 9px",display:"flex",alignItems:"center",gap:7 }}><span style={{ fontSize:17 }}>{SVC_ICONS[s]}</span><span style={{ fontSize:11.5,fontWeight:600,color:B.text }}>{t[s]}</span></button>)}
          </div></>:<>
          <button className="t" onClick={()=>setSelSvc(null)} style={{ background:B.dim,color:B.muted,padding:"4px 11px",borderRadius:18,fontSize:10,fontWeight:600,marginBottom:12 }}>← back</button>
          <div style={{ display:"flex",alignItems:"center",gap:7,marginBottom:11 }}><span style={{ fontSize:18 }}>{SVC_ICONS[selSvc]}</span><span style={{ fontSize:13,fontWeight:700,color:B.g2 }}>{t[selSvc]}</span></div>
          <div style={{ background:B.surface,borderRadius:11,padding:"12px 14px",fontSize:12.5,color:"#9ac8b0",lineHeight:1.8,marginBottom:14,border:`1px solid ${B.border}`,whiteSpace:"pre-line" }}>{t.offerTemplates[selSvc]}</div>
          <button className="t" onClick={()=>{setReply(t.offerTemplates[selSvc]);setOfferOpen(false);setSelSvc(null);}} style={{ width:"100%",padding:"13px",background:`linear-gradient(135deg,${B.g1},${B.g2})`,color:"#fff",borderRadius:13,fontSize:14,fontWeight:700 }}>{t.offer} →</button>
          </>}
        </div>
      </div>}

      {/* BOTTOM NAV — 6 tabs */}
      <div style={{ position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:B.card,borderTop:`1px solid ${B.border}`,display:"grid",gridTemplateColumns:"repeat(6,1fr)",padding:"10px 0 22px",zIndex:50 }}>
        {[
          { id:"dashboard", icon:"⊞", label:"Home" },
          { id:"leads", icon:"🎯", label:t.leads, badge:followUpCount },
          { id:"messages", icon:"💬", label:t.messages, badge:unread },
          { id:"post", icon:"📸", label:"Post" },
          { id:"campaigns", icon:"📣", label:"Social" },
          { id:"googleads", icon:<GAdsIcon s={18}/>, label:"Ads" },
        ].map(item=>(
          <button key={item.id} className="t" onClick={()=>{setTab(item.id);setSelMsg(null);setNewCamp(false);setSelGCamp(null);setSelLead(null);setShowNewLead(false);}} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative" }}>
            <div style={{ fontSize:typeof item.icon==="string"?18:undefined,filter:tab===item.id?"none":"grayscale(1) opacity(.28)",transform:tab===item.id?"scale(1.12)":"scale(1)",transition:"all .2s" }}>{item.icon}</div>
            <div style={{ fontSize:7.5,fontWeight:700,letterSpacing:.4,color:tab===item.id?B.g2:B.muted,transition:"color .2s" }}>{item.label.toUpperCase()}</div>
            {item.badge>0&&<div style={{ position:"absolute",top:0,right:"12%",width:14,height:14,borderRadius:"50%",background:"#E1306C",color:"#fff",fontSize:8,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center" }}>{item.badge}</div>}
          </button>
        ))}
      </div>
    </div>
  );
}
