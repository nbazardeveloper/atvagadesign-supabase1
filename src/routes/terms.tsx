import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeIn } from "@/components/site/FadeIn";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms of Use | Asti Designs" },
      { name: "description", content: "Terms and conditions governing use of the Asti Designs website and engagement of decorative plaster services." },
      { name: "robots", content: "noindex" },
    ],
    links: [
      { rel: "canonical", href: "https://astidesigns.com/terms" },
    ],
  }),
});

const EFFECTIVE_DATE = "June 1, 2026";
const COMPANY = "Asti Designs";
const STATE = "Washington";
const EMAIL = "Asticonstructiontx@gmail.com";

const sections = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using the Asti Designs website (astidesigns.com) you agree to be bound by these Terms of Use. If you do not agree, please discontinue use of the site immediately. ${COMPANY} reserves the right to update these Terms at any time; continued use of the site following any change constitutes acceptance of the revised Terms.`,
  },
  {
    title: "Use of the Website",
    body: `This website is provided for informational purposes and to facilitate initial contact with the studio. You agree to use the site only for lawful purposes and in a manner that does not infringe the rights of others. You must not transmit any unsolicited commercial communications, attempt to gain unauthorised access to any part of the site, or introduce any malicious code.`,
  },
  {
    title: "Intellectual Property",
    body: `All content on this website — including photographs, text, graphics, the Asti Designs name and logo — is the exclusive property of ${COMPANY} or its licensors and is protected by United States and international copyright law. You may not reproduce, distribute, modify or create derivative works from any content without prior written permission from ${COMPANY}.`,
  },
  {
    title: "Project Estimates & Quotes",
    body: `Any estimate or quote provided through this website or by electronic communication is prepared in good faith based on information supplied by the prospective client. Estimates are not binding contracts. A formal written agreement signed by both parties constitutes the sole binding commitment for any project. Prices are subject to change if project scope, surface conditions or material costs change after the estimate is issued.`,
  },
  {
    title: "Limitation of Liability",
    body: `To the fullest extent permitted by law, ${COMPANY} shall not be liable for any indirect, incidental, special or consequential damages arising from your use of, or inability to use, this website or any information contained herein. The total liability of ${COMPANY} for any claim arising from your use of this site shall not exceed one hundred US dollars ($100).`,
  },
  {
    title: "Disclaimer of Warranties",
    body: `This website is provided on an "as is" and "as available" basis without warranties of any kind, express or implied. ${COMPANY} does not warrant that the site will be uninterrupted, error-free or free of viruses or other harmful components. We make no warranty regarding the accuracy or completeness of any content on the site.`,
  },
  {
    title: "Third-Party Links",
    body: `The site may contain links to third-party websites. These links are provided for convenience only. ${COMPANY} has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.`,
  },
  {
    title: "Governing Law",
    body: `These Terms of Use shall be governed by and construed in accordance with the laws of the State of ${STATE}, without regard to its conflict of law provisions. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in ${STATE}.`,
  },
  {
    title: "Contact",
    body: `If you have questions about these Terms, please contact us at ${EMAIL}.`,
  },
];

function Terms() {
  return (
    <>
      <section className="container-luxe pt-24 pb-16">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Legal</p>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] max-w-3xl">
            Terms of Use
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">Effective date: {EFFECTIVE_DATE}</p>
        </FadeIn>
      </section>

      <section className="container-luxe pb-32">
        <div className="max-w-3xl space-y-12">
          {sections.map((s, i) => (
            <FadeIn key={s.title} delay={i * 40}>
              <div className="border-t border-border pt-8">
                <h2 className="font-display text-2xl">{s.title}</h2>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row gap-4 text-[10px] uppercase tracking-[0.3em]">
            <Link to="/privacy" className="link-underline text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link to="/" className="link-underline text-muted-foreground hover:text-foreground">Return Home</Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
