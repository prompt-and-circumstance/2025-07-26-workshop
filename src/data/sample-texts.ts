export const sampleTexts = {
  english:
    "Welcome to the tokenizer demo! This comprehensive text demonstrates how different artificial intelligence models break down English text into individual tokens. The process of tokenization is fundamental to how large language models understand and process human language. Each token represents a unit of meaning that the model can work with, whether it's a complete word, a part of a word, or even punctuation marks. Understanding tokenization helps us appreciate the complexity behind seemingly simple AI interactions and provides insight into why certain phrases or languages might be more efficiently processed than others.",
  complexEnglish:
    "The pseudohypothetical methodology employed in this psychopharmacological investigation demonstrates the interconnectedness of neuroplasticity and epigenetic modifications. Researchers hypothesized that the bioavailability of nootropic compounds would be significantly enhanced through nanotechnology-mediated delivery systems. The study's findings suggest that antioxidant-rich adaptogens, when combined with phosphatidylserine supplementation, exhibit synergistic effects on cognitive performance. Furthermore, the electroencephalographic data revealed substantial improvements in theta-wave oscillations during meditation-induced states of consciousness, indicating enhanced neurogenesis and synaptic plasticity.",
  scientific:
    "The Schrödinger equation: iℏ∂ψ/∂t = Ĥψ describes quantum mechanical systems. Einstein's mass-energy equivalence E = mc² combined with the Lorentz factor γ = 1/√(1-v²/c²) governs relativistic mechanics. The Maxwell equations: ∇·E = ρ/ε₀, ∇·B = 0, ∇×E = -∂B/∂t, ∇×B = μ₀J + μ₀ε₀∂E/∂t describe electromagnetic fields. Chemical equilibrium: K = [C]^c[D]^d/[A]^a[B]^b for reaction aA + bB ⇌ cC + dD. The Navier-Stokes equation: ρ(∂v/∂t + v·∇v) = -∇p + μ∇²v + f describes fluid dynamics. Thermodynamic entropy: ΔS = ∫(dQ/T) ≥ 0 for irreversible processes. The wave function normalization: ∫|ψ|²dτ = 1 ensures probability conservation.",
  chinese:
    "欢迎使用分词器演示！这个综合性的文本展示了不同的人工智能模型如何将中文文本分解为单独的词元。分词过程是大型语言模型理解和处理人类语言的基础。每个词元代表模型可以使用的意义单位，无论是完整的词汇、词汇的一部分，还是标点符号。理解分词有助于我们欣赏看似简单的人工智能交互背后的复杂性，并深入了解为什么某些短语或语言可能比其他语言更高效地处理。中文分词面临着独特的挑战，因为中文没有明确的词汇边界，这使得分词算法必须依赖上下文和语言模型来确定最佳的分割点。",
  japanese:
    "トークナイザーデモへようこそ！この包括的なテキストは、異なる人工知能モデルが日本語テキストを個別のトークンに分解する方法を示しています。トークン化プロセスは、大規模言語モデルが人間の言語を理解し処理するための基盤となります。各トークンは、完全な単語、単語の一部、または句読点であっても、モデルが扱うことができる意味の単位を表します。トークン化を理解することで、一見単純なAIの相互作用の背後にある複雑さを理解し、なぜ特定のフレーズや言語が他の言語よりも効率的に処理される可能性があるかについての洞察を得ることができます。日本語のトークン化は、ひらがな、カタカナ、漢字という異なる文字体系の組み合わせにより、独特の課題を提示します。",
  code: "function calculateCompoundInterest(principal, rate, time, compoundFrequency) {\n  // Compound interest formula: A = P(1 + r/n)^(nt)\n  const amount = principal * Math.pow((1 + rate / compoundFrequency), compoundFrequency * time);\n  const interest = amount - principal;\n  \n  return {\n    finalAmount: parseFloat(amount.toFixed(2)),\n    interestEarned: parseFloat(interest.toFixed(2)),\n    principal: principal,\n    rate: rate,\n    time: time,\n    compoundFrequency: compoundFrequency\n  };\n}\n\n// Usage example\nconst investment = calculateCompoundInterest(10000, 0.07, 15, 12);\nconsole.log(`Initial investment: $${investment.principal}`);\nconsole.log(`Final amount: $${investment.finalAmount}`);\nconsole.log(`Interest earned: $${investment.interestEarned}`);\n\n// ES6 arrow function version\nconst simpleInterest = (p, r, t) => p * r * t;\nconst result = simpleInterest(5000, 0.05, 10);",
  logs: "[2024-01-15 10:30:45.123] INFO: Application server started successfully on port 3000\n[2024-01-15 10:30:45.456] DEBUG: Database connection pool initialized with max connections: 20\n[2024-01-15 10:30:45.789] INFO: Redis cache connection established at redis://localhost:6379\n[2024-01-15 10:30:46.012] WARN: Environment variable API_KEY not found, using default configuration\n[2024-01-15 10:30:46.345] ERROR: Failed to load configuration file: /config/app.json - File not found\n[2024-01-15 10:30:46.678] INFO: JWT secret loaded from environment variables\n[2024-01-15 10:30:46.901] DEBUG: Middleware stack initialized: [cors, helmet, compression, rateLimit]\n[2024-01-15 10:30:47.234] INFO: Health check endpoint registered at /health\n[2024-01-15 10:30:47.567] ERROR: MongoDB connection failed: MongoNetworkError: connection refused\n[2024-01-15 10:30:47.890] INFO: Fallback to local SQLite database activated\n[2024-01-15 10:30:48.123] DEBUG: API routes loaded: 45 endpoints registered\n[2024-01-15 10:30:48.456] INFO: WebSocket server initialized on port 3001\n[2024-01-15 10:30:48.789] WARN: SSL certificate expires in 30 days, renewal recommended",
};

export type SampleTextType = keyof typeof sampleTexts;

export const sampleTextOrder: SampleTextType[] = [
  "english",
  "complexEnglish",
  "scientific",
  "chinese",
  "japanese",
  "code",
  "logs",
];
