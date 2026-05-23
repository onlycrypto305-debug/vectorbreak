// Case studies — single source of truth for /case-studies/ hub + [slug]/ pages.
// Matches components/Receipts.tsx data. Do not fabricate findings detail —
// content here is summary-grade only. Full reports available under NDA.

export type Verdict = "PASS" | "STRONG PASS" | "FAIL" | "UNDER NDA";

export interface CaseStudy {
  n: string;
  slug: string | null; // null = no individual page (NDA-redacted)
  target: string;
  family: string; // for grouping
  scope: string;
  findings: string;
  verdict: Verdict;
  publishedDate: string; // ISO yyyy-mm-dd
  /** 80-120 char meta description for the per-case page */
  metaDescription: string;
  /** 1-3 paragraph public narrative for the per-case page */
  narrative: string[];
  /** Hint to readers about what the verdict means in this context */
  takeaway: string;
}

export const CASES: CaseStudy[] = [
  // ---------- FAIL verdicts first (per Receipts.tsx ordering) ----------
  {
    n: "07",
    slug: "minimax-m2",
    target: "Direct-to-model · MiniMax-M2",
    family: "Direct-to-model (cross-family)",
    scope: "FS1 · FS3 · FS4",
    findings: "16 (12 HIGH)",
    verdict: "FAIL",
    publishedDate: "2026-05-23",
    metaDescription:
      "Five Surfaces assessment of MiniMax-M2 in a direct-to-model configuration. FAIL verdict: 16 findings, 12 rated HIGH across FS1, FS3, FS4.",
    narrative: [
      "MiniMax-M2 was assessed in a direct-to-model configuration — no Claude-SDK-style protective framework, no MCP server-side hardening, raw exposure of the model to user input and tool invocation.",
      "Sixteen findings, twelve of them rated HIGH, across three surfaces: FS1 (input/output injection, jailbreak susceptibility), FS3 (tool schema attacks, privilege escalation paths), and FS4 (model-level leakage including prompt extraction and policy-surface inference).",
      "The case demonstrates the empirical floor: when the Five Surfaces methodology is applied to a model that lacks defensive engineering, real high-severity findings surface. This is what insurers, acquirers, and compliance teams need to see — that the methodology is not a false-negative machine.",
    ],
    takeaway:
      "FAIL verdicts validate that the methodology detects real, high-severity issues in undefended systems. Cross-family failures matter for evidence-grade audit posture.",
  },
  {
    n: "08",
    slug: "gpt-oss-120b",
    target: "Direct-to-model · gpt-oss:120b",
    family: "Direct-to-model (open-source)",
    scope: "FS1 · FS3 · FS4 · FS5",
    findings: "38 (36 HIGH)",
    verdict: "FAIL",
    publishedDate: "2026-05-23",
    metaDescription:
      "Five Surfaces assessment of gpt-oss:120b in a direct-to-model configuration. FAIL verdict: 38 findings, 36 rated HIGH across all four assessed surfaces.",
    narrative: [
      "gpt-oss:120b was assessed in a direct-to-model configuration with the broadest surface scope of any published case: FS1, FS3, FS4, and FS5. No host-side guardrails, no Claude-SDK-style isolation, no defensive runtime envelope.",
      "Thirty-eight findings, thirty-six of them rated HIGH. The breadth indicates systematic vulnerabilities across all assessed surfaces when no defensive engineering is applied — input/output, tool-call, model-level, and runtime issues all surfaced.",
      "This is the deepest of the published FAILs. It is also the strongest argument for treating LLM deployment as a defense-in-depth problem: a capable open-source model used without a hardened runtime is a production incident waiting to happen.",
    ],
    takeaway:
      "Open-source model + no defensive engineering = systematic risk across all five surfaces. Deployment design is more decisive than model choice for security posture.",
  },
  // ---------- PASS verdicts ----------
  {
    n: "01",
    slug: "claude-code-opus-4-7",
    target: "Claude Code · Opus 4.7",
    family: "Claude family",
    scope: "FS3 · full battery",
    findings: "0",
    verdict: "PASS",
    publishedDate: "2026-05-23",
    metaDescription:
      "Five Surfaces FS3 (Tool-Call/MCP) full-battery assessment of Claude Code with Opus 4.7. PASS verdict: 0 findings.",
    narrative: [
      "Claude Code with Opus 4.7 backend, assessed against the full Surface 3 (Tool-Call/MCP) battery — 20 risk classes including tool poisoning, privilege escalation, parameter injection, code-execution sandbox tests, and scope-creep composition attacks.",
      "Zero findings. The combination of Claude's refusal training, the SDK's tool-handling discipline, and the host application's MCP server configuration held up across every probe in the battery.",
      "This is one of six PASS verdicts that establish the methodology's positive value: Five Surfaces can certify secure deployments, not just find problems in broken ones.",
    ],
    takeaway:
      "A clean Surface-3 battery on Claude Code + Opus 4.7 establishes the methodology's ability to certify, not just to flag.",
  },
  {
    n: "03",
    slug: "claude-code-opus-4-7-extended",
    target: "Claude Code · Opus 4.7 (extended)",
    family: "Claude family",
    scope: "FS1 · FS3",
    findings: "0",
    verdict: "STRONG PASS",
    publishedDate: "2026-05-23",
    metaDescription:
      "Extended Five Surfaces assessment of Claude Code with Opus 4.7 covering FS1 and FS3. STRONG PASS verdict: 0 findings.",
    narrative: [
      "Follow-up assessment to Case 01, expanding scope to Surface 1 (Input/Output) alongside the FS3 battery. Tested direct prompt injection, jailbreak coverage, conversation-history manipulation, multi-modal injection, and output sanitization in addition to the Surface 3 tool-call battery.",
      "Zero findings across both surfaces. STRONG PASS — the methodology's higher confidence rating, reserved for clean results on a broader scope.",
      "The extended Opus 4.7 case complements Case 01 by showing the deployment's input-handling defenses are as robust as its tool-call discipline.",
    ],
    takeaway:
      "Clean across both surfaces tested. STRONG PASS reflects confidence that scope expansion did not surface new gaps.",
  },
  {
    n: "04",
    slug: "antigravity-opus-4-6-thinking",
    target: "Antigravity · Opus 4.6 Thinking",
    family: "Claude family",
    scope: "FS1 · FS3 · FS5",
    findings: "1 disclosed",
    verdict: "STRONG PASS",
    publishedDate: "2026-05-23",
    metaDescription:
      "Five Surfaces assessment of Antigravity with Opus 4.6 in Thinking mode. STRONG PASS verdict: 1 disclosed finding across FS1, FS3, FS5.",
    narrative: [
      "Antigravity with Opus 4.6 in Thinking mode, assessed across Surface 1, Surface 3, and Surface 5. The case specifically tested whether reasoning-mode extensions (visible chain-of-thought) introduce new attack vectors within the surfaces in scope.",
      "STRONG PASS. One disclosed finding in an ancillary domain — not a security bypass and pending coordinated disclosure through vendor channels. The reasoning extensions did not introduce new attack vectors within the assessed scope.",
      "An important data point for teams shipping reasoning-mode features: thinking-style chain-of-thought is not an inherent security regression when the deployment is hardened.",
    ],
    takeaway:
      "Reasoning-mode does not introduce new in-scope attack vectors on this deployment. The disclosed finding is non-security-bypass and follows responsible-disclosure channels.",
  },
  {
    n: "05",
    slug: "claude-code-sonnet-4-6",
    target: "Claude Code · Sonnet 4.6",
    family: "Claude family",
    scope: "FS3 · full battery",
    findings: "0",
    verdict: "STRONG PASS",
    publishedDate: "2026-05-23",
    metaDescription:
      "Five Surfaces FS3 full-battery assessment of Claude Code with Sonnet 4.6. STRONG PASS verdict: 0 findings.",
    narrative: [
      "Claude Code with Sonnet 4.6 backend, assessed against the full Surface 3 (Tool-Call/MCP) battery — same scope as the Opus 4.7 baseline (Case 01) to enable apples-to-apples comparison across the Claude family.",
      "Zero findings. STRONG PASS. The methodology's higher confidence rating is supported by the consistency: Opus 4.7, Sonnet 4.6, and Haiku 4.5 all clear the same battery cleanly.",
      "Result strengthens the cross-model conclusion: the Claude SDK's tool-handling discipline holds across model sizes, not just at the flagship tier.",
    ],
    takeaway:
      "Surface 3 holds across Claude model sizes — not a flagship-only property.",
  },
  {
    n: "06",
    slug: "claude-code-haiku-4-5",
    target: "Claude Code · Haiku 4.5",
    family: "Claude family",
    scope: "FS3 · full battery",
    findings: "0",
    verdict: "STRONG PASS",
    publishedDate: "2026-05-23",
    metaDescription:
      "Five Surfaces FS3 full-battery assessment of Claude Code with Haiku 4.5. STRONG PASS verdict: 0 findings.",
    narrative: [
      "Claude Code with Haiku 4.5 backend, assessed against the full Surface 3 (Tool-Call/MCP) battery. Completes the Claude-family sweep: Opus 4.7 (Case 01, 03), Sonnet 4.6 (Case 05), and now Haiku 4.5.",
      "Zero findings. STRONG PASS. The smaller, faster Haiku model holds the same Surface 3 discipline as the larger Sonnet and Opus tiers.",
      "Material for buyers evaluating cost/performance trade-offs: tool-call security is not a tier-up feature on the Claude family in this configuration.",
    ],
    takeaway:
      "Haiku 4.5 matches Opus/Sonnet on Surface 3 hardening. Cost-tier choice does not need to compromise tool-call posture.",
  },
  // ---------- NDA-redacted (no individual page) ----------
  {
    n: "02",
    slug: null,
    target: "Redacted under NDA",
    family: "Under NDA",
    scope: "—",
    findings: "—",
    verdict: "UNDER NDA",
    publishedDate: "2026-05-23",
    metaDescription: "",
    narrative: [],
    takeaway: "",
  },
];

export const PUBLIC_CASES = CASES.filter((c) => c.slug !== null);
