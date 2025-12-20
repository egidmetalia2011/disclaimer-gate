(()=>{const k="dg_ok_v1";try{if(localStorage.getItem(k)==="1")return}catch(e){};const lock=_=>{document.documentElement.style.overflow="hidden";document.body&&(document.body.style.overflow="hidden")},unlock=_=>{document.documentElement.style.overflow="";document.body&&(document.body.style.overflow="")};lock();addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault();e.stopPropagation()}},!0);
const t="By accessing this website, you agree this is informational only and not legal, financial, or professional advice. You assume all risk. To continue, you must accept.";
const css="#dg{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.65);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}#dg>div{width:min(720px,100%);background:#0b0b0c;color:#fff;border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:18px;font-family:system-ui}#dg h3{margin:0 0 10px;font-size:18px}#dg p{margin:0;font-size:14px;line-height:1.5;color:rgba(255,255,255,.85)}#dg button{width:100%;margin-top:14px;padding:12px;border:0;border-radius:12px;background:#fff;color:#111;font-weight:700;cursor:pointer}";
const s=document.createElement("style");s.textContent=css;document.head.appendChild(s);
const mount=_=>{if(document.getElementById("dg"))return;const o=document.createElement("div");o.id="dg";
o.innerHTML=`<div id="dgmodal" role="dialog" aria-modal="true"><h3>Disclaimer</h3><p>${t}</p><button id="dga" type="button">Accept</button></div>`;
document.body.appendChild(o);

// Only block clicks on the BACKDROP (not inside the modal)
o.addEventListener("click",e=>{if(e.target===o){e.preventDefault();e.stopPropagation()}},false);

document.getElementById("dga").addEventListener("click",_=>{
  try{localStorage.setItem(k,"1")}catch(e){}
  unlock();o.remove();s.remove();
});
};
document.body?mount():addEventListener("DOMContentLoaded",mount);
})();
