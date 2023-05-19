import Script from "next/script";

const Consent = () => {
  // { showIubenda }: { showIubenda: boolean }

  return (
    <>
      <Script
        id="consent-modal"
        type="text/javascript"
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        async
      ></Script>
      {/* {showIubenda && ( */}
      {/* eslint-disable no-secrets/no-secrets  */}
      <Script type="text/javascript">
        {`var _iub = _iub || [];
       
        _iub.csConfiguration = {"askConsentAtCookiePolicyUpdate":true,"enableLgpd":true,"lang":"en","perPurposeConsent":true,"siteId":3129343,"whitelabel":false,"cookiePolicyId":69051412, "banner":{"acceptButtonCaptionColor":"#000000","acceptButtonColor":"#E1DDD7","acceptButtonDisplay":true,"backgroundColor":"#FBF6EF","backgroundOverlay":true,"closeButtonDisplay":false,"customizeButtonCaptionColor":"#010436","customizeButtonColor":"#E1DDD7","customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"logo":null,"position":"float-center","rejectButtonCaptionColor":"#000000","rejectButtonColor":"#E1DDD7","rejectButtonDisplay":true,"showPurposesToggles":true,"theme":"autumn-neutral","textColor":"#010436","customizeButtonCaption":"Customize",
        "html":"<div id='iubenda-cs-banner-local' style='z-index:99999998 !important; visibility:hidden' class='iubenda-cs-default-floating iubenda-cs-center iubenda-cs-overlay iubenda-cs-slidein iubenda-cs-visible' role='alertdialog' aria-labelledby='iubenda-cs-title' aria-describedby='iubenda-cs-paragraph'><div class='iubenda-cs-container iubenda-cs-themed'><div class='iubenda-cs-content' style='background-color: #FBF6EF !important;color: #010436 !important;font-size: 14px !important;'><div class='iubenda-cs-rationale'><button type='button' class='iubenda-cs-close-btn' tabindex='0' role='button' aria-pressed='false' style='display:none!important;'>×</button><div class='iubenda-banner-content iubenda-custom-content' role='document'><div id='iubenda-cs-title'>We value your privacy!</div><div id='iubenda-cs-paragraph'><p class='iub-p'>We use cookies to enhance your browsing experience and analyze our traffic. By clicking 'Accept All', you agree to our <a href=javascript:void(0) class='iubenda-privacy-policy-link'>privacy policy</a> and <a href='https://www.iubenda.com/privacy-policy/69051412/cookie-policy?an=no&amp;s_ck=false&amp;newmarkup=yes' class='iubenda-cs-cookie-policy-lnk' target='_blank' rel='noopener'>cookie policy</a>.</p></div></div><div class='iubenda-cs-opt-group' style='color:#FBF6EF!important;'><div class='iubenda-cs-opt-group-custom'><button class='iubenda-cs-customize-btn' tabindex='0' role='button' aria-pressed='false'>Customize</button></div><div class='iubenda-cs-opt-group-consent'><button class='iubenda-cs-reject-btn iubenda-cs-btn-primary' tabindex='0' role='button' aria-pressed='false'>Reject</button><button class='iubenda-cs-accept-btn iubenda-cs-btn-primary' tabindex='0' role='button' aria-pressed='false'>Accept</button></div></div></div></div></div></div>" }}
     
  `}
      </Script>
      {/* eslint-enable no-secrets/no-secrets */}
      {/* )} */}
    </>
  );
};

export default Consent;
