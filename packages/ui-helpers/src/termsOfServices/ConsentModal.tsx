import { COOKIE_POLICY_URL, PRIVACY_POLICY_URL } from "constants-helper";
const ConsentModal = () => {
  return (
    <>
      <div
        id="iubenda-cs-banner"
        style={{ zIndex: "99999998" }}
        className="iubenda-cs-default-floating iubenda-cs-center iubenda-cs-overlay iubenda-cs-slidein iubenda-cs-visible"
        role="alertdialog"
        aria-labelledby="iubenda-cs-title"
        aria-describedby="iubenda-cs-paragraph"
      >
        <div className="iubenda-cs-container iubenda-cs-themed">
          <div
            className="iubenda-cs-content"
            style={{
              backgroundColor: "#FBF6EF",
              color: "#010436",
              fontSize: "14px",
            }}
          >
            <div className="iubenda-cs-rationale">
              <button
                type="button"
                className="iubenda-cs-close-btn"
                tabIndex={0}
                role="button"
                aria-pressed="false"
                style={{ display: "none" }}
              >
                ×
              </button>
              <div
                className="iubenda-banner-content iubenda-custom-content"
                role="document"
              >
                <div id="iubenda-cs-title">We value your privacy!</div>
                <div id="iubenda-cs-paragraph">
                  <p className="iub-p">
                    We use cookies to enhance your browsing experience and
                    analyze our traffic. By clicking 'Accept All', you agree to
                    our
                    <a
                      href={PRIVACY_POLICY_URL}
                      className="iubenda-privacy-policy-link"
                    >
                      {" "}
                      privacy privacy
                    </a>
                    and
                    <a
                      href={COOKIE_POLICY_URL}
                      className="iubenda-privacy-policy-link"
                    >
                      {" "}
                      cookie policy
                    </a>
                    .
                  </p>
                  <p className="iub-p">
                    You can freely give, deny, or withdraw your consent at any
                    time.
                  </p>
                  <p className="iub-p"></p>
                  <p className="iub-p">
                    Use the “Accept” button to consent. Use the “Reject” button
                    to continue without accepting.
                  </p>
                </div>
              </div>
              <div className="iubenda-cs-counter" style={{ display: "none" }}>
                Press again to continue 0/1
              </div>
              <div
                className="iubenda-cs-opt-group"
                style={{ color: "#FBF6EF" }}
              >
                <div className="iubenda-cs-opt-group-custom">
                  <button
                    className="iubenda-cs-customize-btn"
                    tabIndex={0}
                    role="button"
                    aria-pressed="false"
                  >
                    Customize
                  </button>
                </div>
                <div className="iubenda-cs-opt-group-consent">
                  <button
                    className="iubenda-cs-reject-btn iubenda-cs-btn-primary"
                    tabIndex={0}
                    role="button"
                    aria-pressed="false"
                  >
                    Reject
                  </button>
                  <button
                    className="iubenda-cs-accept-btn iubenda-cs-btn-primary"
                    tabIndex={0}
                    role="button"
                    aria-pressed="false"
                  >
                    Accept
                  </button>
                </div>
              </div>
              <div className="iubenda-cs-brand-badge-text">
                Created with{" "}
                <a
                  href="https://www.iubenda.com/?utm_source=cs&utm_medium=web&utm_campaign=csbr2"
                  target="_blank"
                  rel="noopener"
                >
                  {" "}
                  Iubenda{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsentModal;
