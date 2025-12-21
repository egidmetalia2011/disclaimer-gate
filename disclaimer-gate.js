(()=>{const KEY="tdr_disclaimer_24h",TTL=864e5,ACC="#136BC2";
let ok=0;try{const v=+localStorage.getItem(KEY);if(v&&Date.now()-v<TTL)ok=1}catch(e){}
if(ok)return;

const lock=()=>{document.documentElement.style.overflow="hidden";document.body&&(document.body.style.overflow="hidden")};
const unlock=()=>{document.documentElement.style.overflow="";document.body&&(document.body.style.overflow="")};
lock();

// block ESC
addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault();e.stopPropagation()}},!0);

const TITLE="Disclaimer";
const TEXT=`We work with US real estate investors for Non-QM, Non-RESPA, and Non-Owner Occupied properties. We do not work on residential, single family, or 1-4-unit multi-family deals.

Terra Digital Realty, LLC is not a loan originator and/or mortgage broker and cannot provide underwriting services and/or provide rate quotes. All financing is subject to lender approval; we do not guarantee funding and/or closing.`;

const base=(()=>{try{const u=new URL(document.currentScript.src);u.pathname=u.pathname.split("/").slice(0,-1).join("/")+"/";u.search="";u.hash="";return u.toString()}catch(e){return ""}})();
const LOGO=base+"Logo.png";

const css=`
#tdr_g{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:28px;background:rgba(0,0,0,.35)}
#tdr_m{width:min(760px,100%);background:#fff;border-radius:14px;box-shadow:0 30px 90px rgba(0,0,0,.25);overflow:hidden;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial}
#tdr_h{display:flex;align-items:center;gap:12px;padding:18px 18px 12px;border-bottom:1px solid rgba(0,0,0,.08)}
#tdr_logo{width:28px;height:28px;object-fit:contain;border-radius:6px}
#tdr_twrap{flex:1;min-width:0;text-align:center}
#tdr_title{margin:0;font-size:20px;line-height:1.2;font-weight:700;color:#0f172a}
#tdr_sub{margin:4px 0 0;font-size:12px;color:rgba(15,23,42,.55)}
#tdr_xsp{width:28px;height:28px} /* keeps title centered */
#tdr_b{padding:14px 18px 0}
#tdr_sec{display:flex;gap:10px;align-items:flex-start}
#tdr_dot{width:8px;height:8px;border-radius:99px;background:${ACC};margin-top:8px;flex:0 0 auto}
#tdr_over{font-weight:700;font-size:18px;margin:0;color:#0f172a}
#tdr_sc{margin-top:10px;max-height:42vh;overflow:auto;padding-right:10px}
#tdr_sc::-webkit-scrollbar{width:8px}
#tdr_sc::-webkit-scrollbar-thumb{background:${ACC};border-radius:999px}
#tdr_p{white-space:pre-wrap;margin:10px 0 0;font-size:14px;line-height:1.7;color:rgba(15,23,42,.72)}
#tdr_f{display:flex;justify-content:flex-end;padding:16px 18px 18px}
#tdr_btn{background:${ACC};color:#fff;border:0;border-radius:8px;padding:12px 18px;font-weight:700;cursor:pointer}
#tdr_btn:active{transform:translateY(1px)}
`;

const mount=()=>{
  if(document.getElementById("tdr_g"))return;

  const st=document.createElement("style");
  st.id="tdr_s"; st.textContent=css;
  document.head.appendChild(st);

  const g=document.createElement("div");
  g.id="tdr_g";
  g.innerHTML=`
    <div id="tdr_m" role="dialog" aria-modal="true" aria-label="${TITLE}">
      <div id="tdr_h">
        <img id="tdr_logo" alt="Logo" src="${LOGO}">
        <div id="tdr_twrap">
          <h2 id="tdr_title">${TITLE}</h2>
          <div id="tdr_sub"></div>
        </div>
        <div id="tdr_xsp"></div>
      </div>

      <div id="tdr_b">
        <div id="tdr_sec">
          <div id="tdr_dot"></div>
          <div>
            <div id="tdr_over">Overview</div>
            <div id="tdr_sc">
              <div id="tdr_p">${TEXT.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>
            </div>
          </div>
        </div>
      </div>

      <div id="tdr_f">
        <button id="tdr_btn" type="button">Understood</button>
      </div>
    </div>
  `;
  document.body.appendChild(g);

  // do NOT allow closing by clicking backdrop
  g.addEventListener("click",e=>{if(e.target===g){e.preventDefault();e.stopPropagation()}},!0);

  // logo fallback if image path/caching is weird
  const img=g.querySelector("#tdr_logo");
  img.addEventListener("error",()=>{img.style.display="none"});

  g.querySelector("#tdr_btn").addEventListener("click",()=>{
    try{localStorage.setItem(KEY,Date.now().toString())}catch(e){}
    unlock();
    g.remove();
    const s=document.getElementById("tdr_s"); s&&s.remove();
  });
};

document.body?mount():addEventListener("DOMContentLoaded",mount);
})();
