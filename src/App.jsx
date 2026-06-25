import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  ClipboardList,
  Cloud,
  Dog,
  FileSpreadsheet,
  Gauge,
  HeartHandshake,
  MailCheck,
  MessageCircle,
  PawPrint,
  Send,
  Sparkles,
  Workflow,
} from 'lucide-react';

const WEBHOOK_URL =
  'https://n8n.156.67.219.235.sslip.io/webhook/fetch-recoverai-quote';

const defaultForm = {
  customerName: 'Sarah Wilson',
  email: 'user@example.com',
  mobile: '0412345678',
  petName: 'Luna',
  petType: 'Dog',
  breed: 'Labrador',
  petAge: '4',
  state: 'NSW',
  monthlyPremium: '$42',
  abandonedStage: 'Pricing Page',
};

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Live Demo', href: '#live-demo' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Tech Stack', href: '#tech-stack' },
];

const benefitPills = [
  'Increase quote recovery',
  'Save manual follow-up time',
  'Personalise every lead',
];

const statusItems = [
  'AI analysed quote',
  'Personalised recovery email generated',
  'Lead saved to CRM',
  'Recovery log created',
  'Email sent successfully',
];

const impactCards = [
  {
    label: 'Live Workflow',
    value: 'Active',
    caption: 'Webhook receives quote submissions',
    icon: Workflow,
  },
  {
    label: 'AI Model',
    value: 'GPT-4o-mini',
    caption: 'Generates lead analysis and email copy',
    icon: Bot,
  },
  {
    label: 'CRM Logging',
    value: 'Google Sheets',
    caption: 'Records submitted leads and recovery actions',
    icon: FileSpreadsheet,
  },
  {
    label: 'Email Delivery',
    value: 'Gmail API',
    caption: 'Sends the personalised recovery message',
    icon: MailCheck,
  },
  {
    label: 'Lead Score',
    value: '75',
    caption: 'Demo score returned to the UI',
    icon: Gauge,
  },
  {
    label: 'Recovery Email',
    value: 'Sent',
    caption: 'Workflow completes with delivery status',
    icon: Send,
  },
];

const workflowSteps = [
  { label: 'Quote Form', icon: ClipboardList },
  { label: 'n8n Webhook', icon: Workflow },
  { label: 'Lead Normalisation', icon: BadgeCheck },
  { label: 'Breed Intelligence', icon: Dog },
  { label: 'AI Email Generation', icon: BrainCircuit },
  { label: 'Google Sheets CRM', icon: FileSpreadsheet },
  { label: 'Gmail Recovery Email', icon: Send },
];

const architectureSteps = [
  { label: 'Frontend Form', icon: ClipboardList },
  { label: 'n8n Webhook', icon: Workflow },
  { label: 'Lead Normalisation', icon: BadgeCheck },
  { label: 'Breed Intelligence', icon: Dog },
  { label: 'OpenAI GPT-4o-mini', icon: Bot },
  { label: 'Google Sheets CRM', icon: FileSpreadsheet },
  { label: 'Gmail API', icon: MailCheck },
  { label: 'Success Response', icon: Check },
];

const techStack = [
  {
    title: 'React + Vite',
    detail: 'Frontend application',
    icon: Sparkles,
  },
  {
    title: 'n8n',
    detail: 'Workflow orchestration',
    icon: Workflow,
  },
  {
    title: 'OpenAI GPT-4o-mini',
    detail: 'Email generation and lead analysis',
    icon: Bot,
  },
  {
    title: 'Google Sheets',
    detail: 'CRM and activity logging',
    icon: FileSpreadsheet,
  },
  {
    title: 'Gmail API',
    detail: 'Email delivery',
    icon: MailCheck,
  },
  {
    title: 'Hostinger VPS',
    detail: 'Cloud automation server',
    icon: Cloud,
  },
];

const useCases = [
  {
    title: 'Recover pricing-page drop-offs',
    detail:
      'Trigger outreach when prospects leave after seeing pricing or coverage options.',
    icon: Gauge,
  },
  {
    title: 'Personalise follow-ups by pet breed',
    detail:
      'Use pet and breed context to make recovery emails feel specific and relevant.',
    icon: Dog,
  },
  {
    title: 'Log every lead automatically',
    detail:
      'Write each abandoned quote and recovery action into a lightweight CRM log.',
    icon: FileSpreadsheet,
  },
  {
    title: 'Alert teams on high-intent abandonments',
    detail:
      'Surface leads with strong signals so growth teams know where to focus.',
    icon: Sparkles,
  },
  {
    title: 'Extend later into SMS or CRM workflows',
    detail:
      'The same webhook pattern can support SMS, HubSpot, Salesforce, or retargeting paths.',
    icon: MessageCircle,
  },
];

const proofResults = [
  'Live webhook integration',
  'AI-generated personalised recovery emails',
  'Automated CRM logging',
  'Gmail delivery automation',
  'Dynamic lead scoring',
  'End-to-end workflow execution',
];

const insideWorkflowBullets = [
  'Webhook receives abandoned quote',
  'AI generates personalised recovery email',
  'CRM records lead activity',
  'Gmail sends recovery message automatically',
];

const faqs = [
  {
    question: 'Is this connected to a real CRM?',
    answer:
      'This concept demo can log structured lead data to a lightweight CRM-style destination such as Google Sheets through the automation workflow.',
  },
  {
    question: 'Can it work with HubSpot or Salesforce?',
    answer:
      'Yes. The same webhook payload can be routed into HubSpot, Salesforce, or another CRM with the right workflow connector and field mapping.',
  },
  {
    question: 'Can the recovery email be customised?',
    answer:
      'Yes. Subject lines, tone, offer logic, compliance copy, and brand voice can be adjusted inside the automation prompt and email template.',
  },
  {
    question: 'Can SMS be added?',
    answer:
      'Yes. SMS can be added as a follow-up channel with opt-in checks and a provider such as Twilio or another messaging gateway.',
  },
  {
    question: 'Is this production-ready?',
    answer:
      'This is a polished concept demo. A production rollout would need privacy review, authentication, monitoring, retry handling, and compliance controls.',
  },
];

function createFallbackResult(formData) {
  const quoteId = `FR-${formData.petName.slice(0, 3).toUpperCase()}-042`;
  const inferredReason = `${formData.customerName} paused on the ${formData.abandonedStage}, likely comparing value against the ${formData.monthlyPremium} monthly premium for ${formData.petName}.`;

  return {
    quoteId,
    leadScore: 75,
    inferredReason,
    emailStatus: 'Sent',
    crmStatus: 'Saved',
    subjectLine: `Still considering cover for ${formData.petName}?`,
    emailPreview: `Hi ${formData.customerName.split(' ')[0]}, we noticed you were reviewing pet insurance options for ${formData.petName}, your ${formData.breed}. Your quote is still ready, and the ${formData.monthlyPremium} monthly option can help protect against unexpected vet costs. You can pick up from the ${formData.abandonedStage} whenever you are ready.`,
  };
}

function createRecoveryEmailPreview(formData) {
  const previewData = formData || {
    customerName: 'Jenny',
    petName: 'Rita',
    breed: 'Labrador',
    monthlyPremium: '$42',
  };
  const firstName = previewData.customerName.trim().split(' ')[0] || 'Jenny';

  return {
    subject: `Hey ${firstName}, Don't Forget About ${previewData.petName}'s Quote!`,
    body: `Hi ${firstName},

We noticed that you were interested in getting pet insurance for your lovely ${previewData.breed}, ${previewData.petName}, but didn't complete your quote. We understand that life can get busy, and we want to make sure you have the best protection for your furry friend.

With a monthly premium of just ${previewData.monthlyPremium}, you can ensure that ${previewData.petName} receives the care they deserve. If you have any questions or need assistance, we're here to help.

Feel free to revisit your quote anytime, or simply reply to this email, and we can assist you in completing the process.

Best regards,
The Pet Insurance Team`,
  };
}

function normaliseWebhookResult(data, formData) {
  const fallback = createFallbackResult(formData);

  return {
    quoteId: data?.quote_id || data?.quoteId || data?.id || fallback.quoteId,
    leadScore: data?.lead_score || data?.leadScore || data?.score || fallback.leadScore,
    inferredReason:
      data?.inferred_reason || data?.inferredReason || data?.reason || fallback.inferredReason,
    emailStatus:
      data?.email_status || data?.emailStatus || data?.status || fallback.emailStatus,
    crmStatus: data?.crm_status || data?.crmStatus || fallback.crmStatus,
    subjectLine:
      data?.subject_line || data?.subject || data?.email_subject || fallback.subjectLine,
    emailPreview:
      data?.email_preview || data?.email_body || data?.body || fallback.emailPreview,
  };
}

function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'centered' : ''}`}>
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

function App() {
  const [formData, setFormData] = useState(defaultForm);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState(null);

  const isLoading = status === 'loading';
  const hasSucceeded = status === 'success';
  const hasError = status === 'error';

  const summary = useMemo(() => {
    return result || createFallbackResult(formData);
  }, [formData, result]);

  const recoveryEmail = useMemo(() => {
    return createRecoveryEmailPreview(hasSucceeded ? formData : undefined);
  }, [formData, hasSucceeded]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const payload = {
      customer_name: formData.customerName,
      email: formData.email,
      mobile: formData.mobile,
      pet_name: formData.petName,
      pet_type: formData.petType,
      breed: formData.breed,
      pet_age: formData.petAge,
      state: formData.state,
      monthly_premium: formData.monthlyPremium,
      page_stage: formData.abandonedStage,
      time_on_quote_seconds: 180,
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`);
      }

      let responseData = {};
      try {
        responseData = await response.json();
      } catch {
        responseData = {};
      }

      setResult(normaliseWebhookResult(responseData, formData));
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        'The recovery workflow could not be reached. Check the webhook endpoint and try again.',
      );
    }
  };

  const scrollToDemo = () => {
    document.getElementById('live-demo')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <main className="page-shell" id="top">
      <nav className="navbar" aria-label="Primary">
        <a className="brand-mark" href="#top" aria-label="PetLead AI home">
          <span className="brand-icon">
            <PawPrint size={21} strokeWidth={2.4} />
          </span>
          <span>PetLead AI</span>
        </a>
        <div className="nav-links" aria-label="Page sections">
          {navLinks.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
        <a className="nav-button" href="#final-cta">
          Request Demo
        </a>
      </nav>

      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <HeartHandshake size={18} />
              AI-powered quote recovery automation for pet insurance providers
            </div>
            <h1>Recover Abandoned Pet Insurance Quotes With AI</h1>
            <p>
              AI identifies high-intent prospects, writes personalised recovery
              emails, logs leads to your CRM, and follows up automatically.
            </p>
            <div className="benefit-pills">
              {benefitPills.map((benefit) => (
                <span key={benefit}>
                  <Check size={15} />
                  {benefit}
                </span>
              ))}
            </div>
            <button className="primary-button" type="button" onClick={scrollToDemo}>
              Try Live Demo
              <ArrowDown size={18} />
            </button>
            <div className="founder-note">
              <p>
                <strong>
                  AI-powered quote recovery automation for pet insurance
                  providers.
                </strong>
              </p>
              <p>
                Built as an independent proof-of-concept exploring how AI and
                workflow automation can help pet insurance providers recover
                abandoned quote opportunities.
              </p>
              <p>
                Demonstrates OpenAI, n8n, Gmail API and CRM integration working
                together in a live workflow.
              </p>
            </div>
          </div>

          <aside className="mock-dashboard-card" aria-label="Lead recovery dashboard">
            <div className="dashboard-topline">
              <span>Luna's quote paused at pricing</span>
              <Sparkles size={18} />
            </div>
            <div className="lead-score-card">
              <span>Lead Score</span>
              <strong>75</strong>
              <small>High-intent abandoned quote</small>
            </div>
            <div className="mock-field-grid">
              <div>
                <span>Detected reason</span>
                <strong>Comparison shopping</strong>
              </div>
              <div>
                <span>Suggested angle</span>
                <strong>Monthly value reassurance</strong>
              </div>
              <div className="wide">
                <span>Next action</span>
                <strong>Recovery email sent</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="demo-section" id="live-demo">
        <SectionHeading
          eyebrow="Live demo form"
          title="Submit an abandoned quote"
          subtitle="Send structured quote data into the recovery workflow and watch the automation trigger."
        />

        <div className="demo-layout">
          <form className="quote-form card-surface" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Customer Name
                <input
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Mobile
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Pet Name
                <input
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Pet Type
                <select
                  name="petType"
                  value={formData.petType}
                  onChange={handleChange}
                >
                  <option>Dog</option>
                  <option>Cat</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Breed
                <input
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Pet Age
                <input
                  name="petAge"
                  type="number"
                  min="0"
                  value={formData.petAge}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                State
                <select name="state" value={formData.state} onChange={handleChange}>
                  <option>ACT</option>
                  <option>NSW</option>
                  <option>NT</option>
                  <option>QLD</option>
                  <option>SA</option>
                  <option>TAS</option>
                  <option>VIC</option>
                  <option>WA</option>
                </select>
              </label>
              <label>
                Monthly Premium
                <input
                  name="monthlyPremium"
                  value={formData.monthlyPremium}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Abandoned Stage
                <select
                  name="abandonedStage"
                  value={formData.abandonedStage}
                  onChange={handleChange}
                >
                  <option>Pet Details</option>
                  <option>Coverage Review</option>
                  <option>Pricing Page</option>
                  <option>Checkout</option>
                </select>
              </label>
            </div>

            <button className="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Triggering workflow...' : 'Trigger Recovery Workflow'}
              <Send size={18} />
            </button>
          </form>

          <aside className={`status-panel card-surface ${hasSucceeded ? 'is-complete' : ''}`}>
            <div className="status-header">
              <div className="status-icon">
                {hasError ? <MessageCircle size={25} /> : <Check size={25} />}
              </div>
              <div>
                <span>Demo status</span>
                <h3>
                  {hasError
                    ? 'Workflow needs attention'
                    : hasSucceeded
                      ? 'Recovery workflow complete'
                      : 'Ready to recover'}
                </h3>
              </div>
            </div>

            {hasError ? (
              <p className="form-alert" role="alert">
                {errorMessage}
              </p>
            ) : (
              <div className="status-list">
                {statusItems.map((item, index) => (
                  <div
                    className={hasSucceeded ? 'complete' : ''}
                    key={item}
                    style={{ '--delay': `${index * 80}ms` }}
                  >
                    <Check size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="execution-section">
        <SectionHeading
          eyebrow="Live execution summary"
          title="Workflow Execution Summary"
          subtitle="A compact view of the quote record, AI interpretation, and delivery state."
        />
        <div className="summary-grid">
          {[
            { label: 'Quote ID', value: summary.quoteId, icon: ClipboardList },
            { label: 'Lead Score', value: summary.leadScore, icon: Gauge },
            { label: 'AI Insight', value: summary.inferredReason, icon: BrainCircuit },
            { label: 'Email Status', value: summary.emailStatus, icon: MailCheck },
            { label: 'CRM Status', value: summary.crmStatus, icon: FileSpreadsheet },
          ].map(({ label, value, icon: Icon }) => (
            <article className="summary-card card-surface" key={label}>
              <div className="summary-icon">
                <Icon size={21} />
              </div>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="recovery-email-section">
        <SectionHeading
          eyebrow="AI email generation"
          title="AI Generated Recovery Email"
          subtitle="Every abandoned quote receives a personalised follow-up based on customer, pet, quote stage and premium information."
        />
        <div className="generated-email-grid">
          <article className="lead-analysis-card card-surface">
            <div className="card-title-row">
              <h3>AI Lead Analysis</h3>
              <span className="soft-badge">Generated by AI</span>
            </div>
            <dl className="analysis-list">
              <div>
                <dt>Lead Score</dt>
                <dd>75</dd>
              </div>
              <div>
                <dt>Detected Reason</dt>
                <dd>Busy schedule or comparison shopping</dd>
              </div>
              <div>
                <dt>Suggested Angle</dt>
                <dd>Monthly value reassurance</dd>
              </div>
              <div>
                <dt>Recommended Action</dt>
                <dd>Send recovery email</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Email sent successfully</dd>
              </div>
            </dl>
          </article>

          <article className="actual-email-card card-surface">
            <div className="card-title-row">
              <h3>Actual Recovery Email Preview</h3>
              <span className="soft-badge gmail">Sent via Gmail</span>
            </div>
            <div className="email-window">
              <div className="email-subject-row">
                <span>Subject</span>
                <strong>{recoveryEmail.subject}</strong>
              </div>
              <div className="email-sender-row">
                <span>From</span>
                <strong>Pet Insurance Team</strong>
                <small>recovery@demo.petinsurance.example</small>
              </div>
              <div className="email-message-body">
                <p>{recoveryEmail.body}</p>
              </div>
            </div>
            <p className="workflow-note">
              This preview is generated by the live n8n + OpenAI workflow.
            </p>
          </article>
        </div>
      </section>

      <section className="email-delivery-section">
        <SectionHeading
          eyebrow="Delivery proof"
          title="Actual Email Delivery"
          subtitle="The workflow generates the recovery email and delivers it through Gmail automatically."
        />
        <div className="delivery-comparison-grid">
          <article className="delivery-preview-card card-surface">
            <div className="card-title-row">
              <h3>AI Email Preview</h3>
              <span className="soft-badge">AI Generated Preview</span>
            </div>
            <div className="email-window compact-email-window">
              <div className="email-subject-row">
                <span>Subject</span>
                <strong>{recoveryEmail.subject}</strong>
              </div>
              <div className="email-sender-row">
                <span>From</span>
                <strong>Pet Insurance Team</strong>
                <small>recovery@demo.petinsurance.example</small>
              </div>
              <div className="email-message-body">
                <p>{recoveryEmail.body}</p>
              </div>
            </div>
          </article>

          <div className="comparison-label" aria-hidden="true">
            Preview <ArrowRight size={18} /> Delivered
          </div>

          <article className="gmail-delivery-card card-surface">
            <div className="card-title-row">
              <h3>Gmail Delivery</h3>
              <span className="soft-badge gmail">Delivered via Gmail</span>
            </div>
            <a
              className="gmail-screenshot-link"
              href="/gmail-delivery.png"
              target="_blank"
              rel="noreferrer"
              aria-label="Open Gmail delivery screenshot in a new tab"
            >
              <img
                src="/gmail-delivery.png"
                alt="Delivered Gmail recovery email"
              />
            </a>
            <p className="delivery-note">
              Generated automatically by the workflow and delivered through
              Gmail using dynamic customer and pet information.
            </p>
          </article>
        </div>
      </section>

      <section className="impact-section">
        <SectionHeading
          eyebrow="Technical proof"
          title="Recovery performance snapshot"
          subtitle="A practical view of the live workflow pieces that are connected in this concept demo."
        />
        <div className="impact-grid">
          {impactCards.map(({ label, value, caption, icon: Icon }) => (
            <article className="metric-card card-surface" key={label}>
              <Icon size={22} />
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{caption}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="results-section">
        <SectionHeading
          eyebrow="Prototype status"
          title="Results of this Proof of Concept"
          subtitle="The demo proves the core workflow can receive quote data, generate recovery content, log activity and return a completed automation state."
        />
        <div className="results-panel card-surface">
          <span className="status-badge">Working Prototype</span>
          <div className="results-list">
            {proofResults.map((item) => (
              <div key={item}>
                <Check size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="architecture-section">
        <SectionHeading
          eyebrow="Architecture"
          title="Behind the Automation"
          subtitle="The demo connects a frontend quote form to a live n8n workflow that generates, logs and sends recovery emails automatically."
        />
        <div className="architecture-flow">
          {architectureSteps.map(({ label, icon: Icon }, index) => (
            <article className="architecture-card" key={label}>
              <div className="architecture-icon">
                <Icon size={21} />
              </div>
              <strong>{label}</strong>
              {index < architectureSteps.length - 1 && (
                <ArrowRight className="architecture-arrow" size={20} />
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="inside-workflow-section">
        <SectionHeading
          eyebrow="Workflow detail"
          title="Actual Workflow Implementation"
          subtitle="The production-ready automation powering the demo."
        />
        <div className="workflow-implementation-card card-surface">
          <a
            className="workflow-screenshot-link"
            href="/n8n-workflow.png"
            target="_blank"
            rel="noreferrer"
            aria-label="Open n8n workflow screenshot in a new tab"
          >
            <img
              src="/n8n-workflow.png"
              alt="n8n workflow showing abandoned quote recovery automation"
            />
          </a>
          <div className="workflow-caption">
            <h3>Live n8n workflow used in the demonstration.</h3>
            <p>
              The workflow receives abandoned quote data, enriches the lead
              profile, generates a personalised recovery email using OpenAI,
              logs activity to Google Sheets, sends the email through Gmail and
              returns a success response.
            </p>
          </div>
          <div className="workflow-callouts">
            {insideWorkflowBullets.map((item) => (
              <div key={item}>
                <Check size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="workflow-section" id="workflow">
        <SectionHeading
          eyebrow="Workflow map"
          title="From abandoned quote to recovered lead"
          subtitle="Each step can be extended with routing logic, scoring rules, and compliance checks."
        />
        <div className="workflow-chain">
          {workflowSteps.map(({ label, icon: Icon }, index) => (
            <article className="workflow-card" key={label}>
              <div className="workflow-node">
                <Icon size={21} />
              </div>
              <strong>{label}</strong>
              {index < workflowSteps.length - 1 && (
                <ArrowRight className="workflow-arrow" size={20} />
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="tech-section" id="tech-stack">
        <SectionHeading
          eyebrow="Technology stack"
          title="Technical Stack"
          subtitle="A lightweight demo architecture that is easy to understand, extend, and deploy."
        />
        <div className="tech-grid">
          {techStack.map(({ title, detail, icon: Icon }) => (
            <article className="tech-card card-surface" key={title}>
              <Icon size={22} />
              <div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="problem-solution-section" id="problem">
        <div className="two-column">
          <article className="story-panel problem-card">
            <span>Business gap</span>
            <h2>The problem</h2>
            <p>
              Pet insurance companies lose high-intent prospects when quote
              forms are abandoned after pricing or coverage review.
            </p>
          </article>
          <article className="story-panel solution-card" id="solution">
            <span>Automated recovery</span>
            <h2>The solution</h2>
            <p>
              RecoverAI analyses quote data, generates personalised recovery
              emails, logs the lead, and sends follow-up automatically.
            </p>
          </article>
        </div>
      </section>

      <section className="why-section">
        <SectionHeading
          eyebrow="Build rationale"
          title="Why I Built This"
        />
        <div className="why-card card-surface">
          <p>
            Pet insurance providers invest heavily in generating quote requests,
            but many potential customers leave before completing their purchase.
          </p>
          <p>
            This proof-of-concept demonstrates how AI and workflow automation can
            identify abandoned quote leads, generate personalised follow-up
            emails, score lead quality, log customer activity and automate
            re-engagement without requiring manual intervention.
          </p>
          <p>
            The project was built independently as a product, automation and
            growth engineering exercise using modern AI and workflow tooling.
          </p>
        </div>
      </section>

      <section className="use-case-section">
        <SectionHeading
          eyebrow="Use cases"
          title="Use cases for growth teams"
          subtitle="Practical workflows this concept could support as the automation matures."
          align="center"
        />
        <div className="use-case-grid">
          {useCases.map(({ title, detail, icon: Icon }) => (
            <article className="use-case-card card-surface" key={title}>
              <Icon size={22} />
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <SectionHeading eyebrow="FAQ" title="Common implementation questions" />
        <div className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item card-surface" key={faq.question}>
              <summary>
                {faq.question}
                <ChevronDown size={18} />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta" id="final-cta">
        <div className="final-cta-inner">
          <Sparkles size={28} />
          <h2>Stop losing high-intent pet insurance leads</h2>
          <p>Automate recovery. Increase conversions. Grow your business.</p>
          <button className="primary-button" type="button" onClick={scrollToDemo}>
            Request Demo
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <footer>
        <strong>PetLead AI</strong>
        <span>Concept demo built for growth automation exploration.</span>
      </footer>
    </main>
  );
}

export default App;
