import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeIn } from "@/components/site/FadeIn";
import { SITE_EMAIL } from "@/lib/contact-info";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy | ATVAGA Design" },
      { name: "description", content: "How ATVAGA Design collects, uses and protects personal information submitted through our website." },
      { name: "robots", content: "noindex" },
    ],
    links: [
      { rel: "canonical", href: "https://www.atvaga.com/privacy" },
    ],
  }),
});

const EFFECTIVE_DATE = "May 24, 2026";
const COMPANY = "ATVAGA Design";
const EMAIL = SITE_EMAIL;

const sections = [
  {
    title: "Who We Are",
    body: `${COMPANY} is a residential design studio based in Seattle, Washington. This Privacy Policy explains how we collect, use, disclose and safeguard your personal information when you visit atvaga.com or submit an inquiry through our website.`,
  },
  {
    title: "Information We Collect",
    body: `We collect information you voluntarily provide when you submit a contact or estimate request form, including your name, phone number, email address and project details. We do not collect any payment information through this website. We may also collect standard technical data such as browser type, IP address and pages visited through analytics tools, solely to improve site performance.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use the information you provide to respond to your inquiry, prepare project estimates and communicate with you about our services. We do not use your information for automated decision-making or profiling. We will not send you marketing communications without your consent.`,
  },
  {
    title: "Sharing of Information",
    body: `${COMPANY} does not sell, rent or trade your personal information to third parties. We may share information with trusted service providers who assist us in operating our website (such as hosting and analytics providers) under strict confidentiality obligations. We may disclose information if required to do so by law or in response to valid legal process.`,
  },
  {
    title: "Data Retention",
    body: `We retain inquiry and project correspondence for up to three years after the last communication, or as long as required by applicable law. You may request deletion of your data at any time by contacting us at the address below.`,
  },
  {
    title: "Cookies & Analytics",
    body: `Our website may use cookies and similar tracking technologies to analyse site traffic and improve user experience. You can control cookie settings through your browser preferences. Disabling cookies will not prevent you from using any core features of the site.`,
  },
  {
    title: "Your Rights",
    body: `Depending on your location, you may have rights under applicable privacy law including the right to access, correct or delete personal information we hold about you, and the right to withdraw consent where processing is based on consent. To exercise any of these rights, please contact us at ${EMAIL}.`,
  },
  {
    title: "Security",
    body: `We implement reasonable technical and organisational measures to protect your personal information from unauthorised access, disclosure or loss. However, no transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "Children's Privacy",
    body: `This website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will indicate the effective date of the most recent version at the top of this page. Your continued use of the website after any update constitutes acceptance of the revised policy.`,
  },
  {
    title: "Contact Us",
    body: `If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at ${EMAIL}.`,
  },
];

function Privacy() {
  return (
    <>
      <section className="container-luxe pt-24 pb-16">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Legal</p>
          <h1 className="mt-6 font-heading text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] max-w-3xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">Effective date: {EFFECTIVE_DATE}</p>
        </FadeIn>
      </section>

      <section className="container-luxe pb-32">
        <div className="max-w-3xl space-y-12">
          {sections.map((s, i) => (
            <FadeIn key={s.title} delay={i * 40}>
              <div className="border-t border-border pt-8">
                <h2 className="font-heading text-2xl">{s.title}</h2>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={480}>
          <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row gap-4 text-[10px] uppercase tracking-[0.3em]">
            <Link to="/terms" className="link-underline text-muted-foreground hover:text-foreground">Terms of Use</Link>
            <Link to="/" className="link-underline text-muted-foreground hover:text-foreground">Return Home</Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
