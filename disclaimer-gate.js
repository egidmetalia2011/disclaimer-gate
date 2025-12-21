(()=>{const KEY="tdr_disclaimer_24h",TTL=864e5,ACC="#136BC2";
try{const t=+localStorage.getItem(KEY);if(t&&Date.now()-t<TTL)return}catch(e){}

const lock=()=>{document.documentElement.style.overflow="hidden";document.body&&(document.body.style.overflow="hidden")};
const unlock=()=>{document.documentElement.style.overflow="";document.body&&(document.body.style.overflow="")};
lock();

// block ESC
addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault();e.stopPropagation()}},!0);

const TITLE="Disclaimer";
const TEXT=`We work with US real estate investors for Non-QM, Non-RESPA, and Non-Owner Occupied properties. We do not work on residential, single family, or 1-4-unit multi-family deals.

Terra Digital Realty, LLC is not a loan originator and/or mortgage broker and cannot provide underwriting services and/or provide rate quotes. All financing is subject to lender approval; we do not guarantee funding and/or closing.`;

const css=`
#tdr_g{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:28px;background:rgba(0,0,0,.75)}
#tdr_m{width:min(760px,100%);background:#000;color:#fff;border-radius:14px;box-shadow:0 30px 90px rgba(0,0,0,.6);font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial}
#tdr_h{padding:22px 22px 12px;text-align:center}
#tdr_title{margin:0;font-size:22px;font-weight:700;letter-spacing:.2px}
#tdr_b{padding:0 22px}
#tdr_sc{max-height:45vh;overflow:auto;padding-right:10px}
#tdr_sc::-webkit-scrollbar{width:8px}
#tdr_sc::-webkit-scrollbar-thumb{background:${ACC};border-radius:999px}
#tdr_p{white-space:pre-wrap;margin:10px 0 0;font-size:14px;line-height:1.7;color:rgba(255,255,255,.85)}
#tdr_f{display:flex;justify-content:flex-end;padding:18px 22px 22px}
#tdr_btn{background:${ACC};color:#fff;border:0;border-radius:10px;padding:12px 20px;font-weight:700;cursor:pointer}
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
        <h2 id="tdr_title">${TITLE}</h2>
      </div>
      <div id="tdr_b">
        <div id="tdr_sc">
          <div id="tdr_p">${TEXT.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>
        </div>
      </div>
      <div id="tdr_f">
        <button id="tdr_btn" type="button">Acknowledge</button>
      </div>
    </div>
  `;
  document.body.appendChild(g);

  // block backdrop clicks
  g.addEventListener("click",e=>{if(e.target===g){e.preventDefault();e.stopPropagation()}},!0);

  g.querySelector("#tdr_btn").addEventListener("click",()=>{
    try{localStorage.setItem(KEY,Date.now().toString())}catch(e){}
    unlock();
    g.remove();
    const s=document.getElementById("tdr_s"); s&&s.remove();
  });
};

document.body?mount():addEventListener("DOMContentLoaded",mount);
})();
