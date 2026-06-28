import Header from '@/components/Header';
import AdBanner from '@/components/AdBanner';
import './PrivacyPolicy.css';

function PrivacyPolicy(): JSX.Element {
  return (
    <>
      <Header />

      <AdBanner
        adKey="7b6b0557815796b9a0463495207a9fa7"
        format="iframe"
        height={90}
        width={728}
        className="ad-top"
      />

      <div className="ad-page-layout">
        <AdBanner
          adKey="9f4efef015cafc796bf969fdfc8d2cc5"
          format="iframe"
          height={300}
          width={160}
          className="ad-side-left"
        />

        <div className="ad-center-content">
          <div className="privacy-container">
            <div className="privacy-content">
              <h1>Privacy Policy</h1>
              <p className="date">Last updated: December 01, 2025</p>

              <p>
                This Privacy Policy describes our policies and procedures on the collection, use and
                disclosure of your information when you use the Service and tells you about your privacy
                rights and how the law protects you.
              </p>

              <h2>Interpretation and Definitions</h2>
              <p>
                The words of which the initial letter is capitalized have meanings defined under the
                following conditions. The following definitions shall have the same meaning regardless of
                whether they appear in singular or in plural.
              </p>

              <h2>Collecting and Using Your Personal Data</h2>
              <p>
                We do not collect any personal data directly from you when you use our Twitch Message
                Creator tool. The tool runs locally in your browser and does not send your generated
                messages or inputs to our servers.
              </p>

              <h3>Usage Data</h3>
              <p>
                Usage Data is collected automatically when using the Service. This may include information
                such as your Device's Internet Protocol address (e.g. IP address), browser type, browser
                version, the pages of our Service that you visit, the time and date of your visit, the
                time spent on those pages, unique device identifiers and other diagnostic data.
              </p>

              <h3>Tracking Technologies and Cookies</h3>
              <p>
                We use Cookies and similar tracking technologies to track the activity on our Service and
                store certain information. Tracking technologies used are beacons, tags, and scripts to
                collect and track information and to improve and analyze our Service.
              </p>
              <p>We use third-party services that may collect information used to identify you:</p>

              <h2>Third-Party Privacy Policies</h2>
              <p>
                Our Privacy Policy does not apply to other advertisers or websites. Thus, we are advising
                you to consult the respective Privacy Policies of these third-party ad servers for more
                detailed information. It may include their practices and instructions about how to opt-out
                of certain options.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our Service does not address anyone under the age of 13. We do not knowingly collect
                personally identifiable information from anyone under the age of 13.
              </p>

              <h2>Changes to this Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, you can contact us by visiting the
                main page of our website.
              </p>

              <h2>Ezoic Privacy Policy</h2>
              <p>
                This site uses Ezoic to manage advertising and analytics. For more information about how
                Ezoic collects and uses data, please see their privacy policy below:
              </p>

              {/* Ezoic Privacy Policy Embed */}
              <span id="ezoic-privacy-policy-embed"></span>

              <footer className="privacy-footer">
                &copy; 2025 Twitch Message Creator. All rights reserved.
              </footer>
            </div>
          </div>

          <AdBanner
            adKey="67814030039a58aa0669864c58376dfc"
            format="iframe"
            height={250}
            width={300}
            className="ad-mid"
          />

          <AdBanner
            adKey="b8cf93107d603df2727232c920686599"
            format="iframe"
            height={60}
            width={468}
            className="ad-mid"
          />
        </div>

        <AdBanner
          adKey="db589995e674f18306ba71a948ad2e7c"
          format="iframe"
          height={600}
          width={160}
          className="ad-side-right"
        />
      </div>

      <AdBanner
        adKey="22b9356eb2dd3193d628264ff2ae6d5c"
        network="effectivecpm"
        className="ad-bottom"
      />

      <AdBanner
        adKey="90024b897148298cd3785fe151ea9109"
        format="iframe"
        height={50}
        width={320}
        className="ad-bottom"
      />
    </>
  );
}

export default PrivacyPolicy;
