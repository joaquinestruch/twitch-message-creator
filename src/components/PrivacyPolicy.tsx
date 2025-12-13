import './PrivacyPolicy.css';

function PrivacyPolicy(): JSX.Element {
  return (
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
  );
}

export default PrivacyPolicy;
