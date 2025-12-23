(() => {
  const LINK_ATTR = "data-tdr-terms-link"
  const STYLE_ID = "tdr_terms_style"
  const OVERLAY_ID = "tdr_terms_overlay"
  const MODAL_ID = "tdr_terms_modal"
  const ACCENT = "#136BC2"
  const LOGO_SRC = "Logo.png"

  const html = `
    <div id="${MODAL_ID}" role="dialog" aria-modal="true" aria-label="Terms and Disclosures">
      <div id="tdr_terms_header">
        <img id="tdr_terms_logo" src="${LOGO_SRC}" alt="Terra Digital Realty logo" />
        <div>
          <div id="tdr_terms_title">Terms and Disclosures</div>
          <div id="tdr_terms_date">Effective Date: December 20, 2025</div>
        </div>
      </div>
      <div id="tdr_terms_scroll">
        <h3>General Disclosure</h3>
        <p>Terra Digital Realty, LLC ("Terra") is not a loan originator, mortgage broker, or lender. Terra does not provide underwriting services, rate quotes, or loan terms of any kind. Any information shared through this website or in subsequent communications is for informational purposes only.</p>
        <p>All financing is subject to third-party lender review, approval, and discretion. Terra does not guarantee financing, funding, approvals, or closings.</p>

        <h3>Geographic Restrictions</h3>
        <p>Terra Digital Realty, LLC does not operate in or provide services related to properties located in the following states/jurisdictions: Arizona, California, Washington DC, Illinois, Michigan, Nebraska, Nevada, New Jersey, New York, North Carolina, North Dakota, Oregon, Pennsylvania, South Dakota, and Vermont.</p>
        <p>By submitting information through this website, you represent and warrant that the property or transaction you are inquiring about is not located in any of the foregoing jurisdictions.</p>

        <h3>No Advice or Fiduciary Relationship</h3>
        <p>Information provided through this website and any related communications should not be construed as financial, legal, tax, or investment advice.</p>
        <p>Submission of information to Terra or engagement with Terra does not create a fiduciary relationship, advisory relationship, agency relationship, or brokerage relationship of any kind. Terra does not facilitate, arrange, or broker transactions of any kind.</p>
        <p>You are encouraged to consult with qualified professionals including attorneys, accountants, and financial advisors before making any financial or investment decisions.</p>

        <h3>No Obligation or Commitment</h3>
        <p>Submission of information through this website does not obligate Terra to provide services, make introductions, or continue discussions. Terra does not facilitate, structure, or arrange transactions. Likewise, submission of information does not obligate the submitting party to proceed with any inquiry or communication.</p>

        <h3>Reliance on Information Provided</h3>
        <p>Terra relies on information provided by users and does not independently verify the accuracy or completeness of submitted information. Terra is not responsible for errors, omissions, or misrepresentations contained in information provided by users or third parties.</p>

        <h3>Privacy and Data Use Disclosure</h3>
        <h4>Information We Collect</h4>
        <p>When you submit information through our website, we may collect personal and business-related information, including but not limited to your name, contact details, entity information, property details, and other information you voluntarily provide.</p>
        <p>We may also automatically collect certain technical information when you visit our website, including IP addresses, browser type, device information, and pages visited.</p>

        <h4>Cookies and Tracking Technologies</h4>
        <p>Our website may use cookies, web beacons, and similar tracking technologies to enhance user experience, analyze site traffic, and understand usage patterns. You may disable cookies through your browser settings, though some features of the website may not function properly if cookies are disabled.</p>

        <h4>How We Use Your Information</h4>
        <p>Information submitted through our forms and collected through our website is used solely for the purpose of:</p>
        <ul>
          <li>Reviewing inquiries and submissions</li>
          <li>Understanding the nature of a transaction or request</li>
          <li>Communicating with you regarding your inquiry</li>
          <li>Determining whether and how we may be able to engage further</li>
          <li>Operating, maintaining, and improving our website</li>
          <li>Analyzing website usage and trends</li>
        </ul>
        <p>We do not sell, rent, or trade your personal information to third parties.</p>

        <h4>Data Storage and Security</h4>
        <p>We take reasonable administrative and technical measures to safeguard the information you provide. Data is stored securely, and access is limited to individuals who require it for legitimate business purposes.</p>
        <p>While we take steps to protect your information, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>

        <h4>Sharing of Information</h4>
        <p>We do not share your information with third parties except:</p>
        <ul>
          <li>With your consent</li>
          <li>When required to comply with applicable laws or regulations</li>
          <li>As necessary to operate our website or internal systems (for example, secure hosting, form-processing services, or analytics providers)</li>
        </ul>
        <p>Any such service providers are expected to maintain appropriate confidentiality and security standards.</p>

        <h4>Data Retention</h4>
        <p>We retain submitted information only for as long as reasonably necessary to fulfill the purposes outlined above or to comply with legal or regulatory obligations.</p>

        <h4>Your Choices and Rights</h4>
        <p>You may request to access, update, or remove your information by contacting us directly at terradigitalcorp@gmail.com. We will make reasonable efforts to accommodate such requests, subject to applicable legal requirements.</p>
        <p>You may opt out of marketing communications at any time by following the unsubscribe instructions in any marketing email we send or by contacting us directly.</p>

        <h4>State-Specific Privacy Rights</h4>
        <p>Residents of certain states may have additional privacy rights under applicable state laws. However, as Terra does not operate in California, we do not provide CCPA/CPRA-specific disclosures. If you believe you have privacy rights under your state's laws, please contact us.</p>

        <h4>Children's Privacy</h4>
        <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from anyone under 18 years of age. If we become aware that we have collected information from someone under 18, we will take steps to delete that information promptly.</p>

        <h4>Changes to This Privacy Disclosure</h4>
        <p>We may update this Privacy and Data Use Disclosure from time to time. Any changes will be reflected on this page with an updated effective date. We encourage you to review this page periodically.</p>

        <h4>Third-Party Links</h4>
        <p>Our website may contain links to third-party websites or services. Terra is not responsible for the content, privacy practices, or terms of service of any third-party sites. We encourage you to review the policies of any third-party sites you visit.</p>

        <h3>Intellectual Property</h3>
        <p>All content on this website, including text, graphics, logos, and software, is the property of Terra Digital Realty, LLC or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on this website without our express written permission.</p>

        <h3>Limitation of Liability</h3>
        <p>To the fullest extent permitted by law, Terra Digital Realty, LLC and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:</p>
        <ul>
          <li>Your access to or use of or inability to access or use the website</li>
          <li>Any conduct or content of any third-party on the website</li>
          <li>Any content obtained from the website</li>
          <li>Unauthorized access, use, or alteration of your transmissions or content</li>
        </ul>
        <p>In no event shall Terra's aggregate liability for any claims arising from your use of this website exceed $100.</p>

        <h3>Governing Law and Jurisdiction</h3>
        <p>These terms and disclosures are governed by and construed in accordance with the laws of the United States and applicable state laws, without regard to conflict of law principles.</p>
        <p>Any disputes arising out of or relating to these terms or your use of this website shall be resolved in accordance with applicable federal or state law. You agree that venue for any such dispute shall be determined based on the location of the property or subject matter of the dispute, or as otherwise required by law.</p>

        <h3>Severability</h3>
        <p>If any provision of these terms and disclosures is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.</p>

        <h3>Contact Information</h3>
        <p>For questions about these terms and disclosures, to exercise your privacy rights, or to contact us for any other reason, please reach out to:</p>
        <p>Terra Digital Realty, LLC<br>Email: <a href="mailto:terradigitalcorp@gmail.com">terradigitalcorp@gmail.com</a></p>

        <p id="tdr_terms_updated">Last Updated: December 20, 2025</p>
      </div>
      <div id="tdr_terms_footer">
        <button id="tdr_terms_close" type="button">Close</button>
      </div>
    </div>
  `

  const css = `
    #${OVERLAY_ID}{position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.78);display:flex;align-items:center;justify-content:center;padding:26px}
    #${MODAL_ID}{width:min(960px,100%);max-height:90vh;background:#f8fafc;color:#0f172a;border-radius:18px;box-shadow:0 30px 90px rgba(0,0,0,.48);display:flex;flex-direction:column;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}
    #tdr_terms_header{display:flex;align-items:center;gap:16px;padding:22px 24px 10px;border-bottom:1px solid rgba(19,107,194,.1)}
    #tdr_terms_logo{width:82px;height:auto;display:block}
    #tdr_terms_title{font-size:22px;font-weight:700;letter-spacing:.2px;color:${ACCENT}}
    #tdr_terms_date{font-size:14px;color:#334155;margin-top:4px}
    #tdr_terms_scroll{padding:10px 24px 6px;overflow:auto;flex:1;scrollbar-width:thin}
    #tdr_terms_scroll::-webkit-scrollbar{width:8px}
    #tdr_terms_scroll::-webkit-scrollbar-thumb{background:${ACCENT};border-radius:999px}
    #tdr_terms_scroll h3{margin:18px 0 10px;font-size:18px;color:#0f172a}
    #tdr_terms_scroll h4{margin:14px 0 8px;font-size:16px;color:#0f172a}
    #tdr_terms_scroll p{margin:0 0 12px;font-size:14px;line-height:1.7;color:#1f2937}
    #tdr_terms_scroll ul{margin:0 0 14px 18px;padding:0 0 0 6px;color:#1f2937;font-size:14px;line-height:1.6}
    #tdr_terms_scroll li{margin-bottom:6px}
    #tdr_terms_scroll a{color:${ACCENT};text-decoration:none}
    #tdr_terms_scroll a:hover{text-decoration:underline}
    #tdr_terms_updated{font-weight:600;color:#0f172a}
    #tdr_terms_footer{padding:12px 24px 20px;border-top:1px solid rgba(19,107,194,.1);display:flex;justify-content:flex-end}
    #tdr_terms_close{background:${ACCENT};color:#fff;border:0;border-radius:10px;padding:12px 20px;font-weight:700;cursor:pointer}
    #tdr_terms_close:active{transform:translateY(1px)}
    @media(max-width:640px){
      #${MODAL_ID}{max-height:92vh}
      #tdr_terms_header{flex-direction:column;align-items:flex-start}
      #tdr_terms_logo{width:68px}
    }
  `

  function lockScroll() {
    document.documentElement.style.overflow = "hidden"
    if (document.body) document.body.style.overflow = "hidden"
  }

  function unlockScroll() {
    document.documentElement.style.overflow = ""
    if (document.body) document.body.style.overflow = ""
  }

  function mount() {
    if (document.getElementById(OVERLAY_ID)) return

    const style = document.createElement("style")
    style.id = STYLE_ID
    style.textContent = css
    document.head.appendChild(style)

    const overlay = document.createElement("div")
    overlay.id = OVERLAY_ID
    overlay.innerHTML = html
    document.body.appendChild(overlay)

    const close = () => {
      unlockScroll()
      overlay.remove()
      const st = document.getElementById(STYLE_ID)
      st && st.remove()
    }

    overlay.addEventListener("click", e => {
      if (e.target === overlay) {
        e.preventDefault()
        close()
      }
    })

    const btn = overlay.querySelector("#tdr_terms_close")
    btn && btn.addEventListener("click", close)

    addEventListener(
      "keydown",
      e => {
        if (e.key === "Escape") {
          e.preventDefault()
          close()
        }
      },
      { once: true, capture: true }
    )

    lockScroll()
  }

  function attachLinks() {
    const links = document.querySelectorAll(`[${LINK_ATTR}]`)
    links.forEach(link => {
      if (link.dataset.tdrTermsBound) return
      link.dataset.tdrTermsBound = "1"
      link.addEventListener("click", e => {
        e.preventDefault()
        mount()
      })
    })
  }

  // Expose a manual trigger so you can call window.showTdrTermsModal()
  window.showTdrTermsModal = mount

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachLinks)
  } else {
    attachLinks()
  }
})()
