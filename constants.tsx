
import React from 'react';
import { Topic } from './types';

export const COLORS = {
  black: '#000000',
  darkGray: '#0D0F0D',
  neonGreen: '#39FF14',
  white: '#FFFFFF',
};

export const RITUAL_OVERVIEW_TOPIC: Topic = {
  id: 'ritual-overview-v1',
  title: 'What is Ritual?',
  description: 'The inaugural tome detailing the vision, innovation, and architecture of the community-owned AI network.',
  timeLimit: 300, // 5 minutes
  difficulty: 'Medium',
  enabled: true,
  previewUrl: 'https://www.ritualfoundation.org/docs/overview/what-is-ritual',
  questions: [
    { id: 'q1', text: "What is Ritual’s primary focus as a blockchain?", options: ["Maximizing throughput for existing users", "Replacing Ethereum smart contracts", "Enriching what users can do on-chain to attract future users", "Becoming the fastest Layer 2"], correctIndex: 2 },
    { id: 'q2', text: "According to the overview, what historically drives large increases in blockchain users?", options: ["Lower gas fees", "Faster block times", "Better marketing", "Net-new innovations enabling new behavior"], correctIndex: 3 },
    { id: 'q3', text: "What key innovation did Bitcoin introduce in 2009?", options: ["Smart contracts", "Decentralized applications", "Permissionless money transfer without intermediaries", "On-chain governance"], correctIndex: 2 },
    { id: 'q4', text: "What did Ethereum introduce that expanded blockchain use cases in 2015?", options: ["ZK proofs", "Rollups", "Account abstraction", "Smart contracts"], correctIndex: 3 },
    { id: 'q5', text: "What does the overview criticize about most modern blockchains today?", options: ["Too much decentralization", "Poor developer tooling", "Optimizing latency and throughput over innovation", "Excessive regulation"], correctIndex: 2 },
    { id: 'q6', text: "From which intersection did Ritual’s development originally begin?", options: ["Gaming and NFTs", "DeFI and payments", "Crypto and Artificial Intelligence", "Privacy and governance"], correctIndex: 2 },
    { id: 'q7', text: "Why does Ritual believe AI should be on-chain?", options: ["To make AI cheaper", "To centralize AI models", "To ensure AI is open, neutral, and censorship resistant", "To replace smart contracts entirely"], correctIndex: 2 },
    { id: 'q8', text: "What does Ritual mean by “making smart contracts actually smart”?", options: ["Adding faster execution", "Embedding wallets", "Allowing native on-chain AI usage with trustless guarantees", "Removing human input"], correctIndex: 2 },
    { id: 'q9', text: "What type of compute is Ritual optimized to support?", options: ["Only AI inference", "Only EVM execution", "Only ZK proofs", "Any heterogeneous compute (AI, ZK, TEEs, and more)"], correctIndex: 3 },
    { id: 'q10', text: "What are Scheduled Transactions in Ritual?", options: ["Batch payments", "Delayed block confirmations", "Recurring or conditional smart contract execution without keepers", "Off-chain automation tools"], correctIndex: 2 },
    { id: 'q11', text: "What are Enshrined On-Chain AI Models designed to provide?", options: ["Faster inference", "Cheaper model training", "On-chain provenance, authenticity, and IP primitives", "Private model storage only"], correctIndex: 2 },
    { id: 'q12', text: "What is the purpose of Ritual’s Model Marketplace?", options: ["Hosting NFTs", "Selling compute hardware", "Transparent monetization of models with verifiable provenance", "Centralized AI distribution"], correctIndex: 2 },
    { id: 'q13', text: "What does Node Specialization mean in Ritual’s architecture?", options: ["All nodes do the same work", "Nodes are replaced by validators", "Nodes are specialized for different workloads", "Nodes only store data"], correctIndex: 2 },
    { id: 'q14', text: "What is Symphony in the Ritual ecosystem?", options: ["A storage layer", "A fee market", "A new consensus protocol with dual proof sharding and verification", "A developer SDK"], correctIndex: 2 },
    { id: 'q15', text: "Ultimately, how does Ritual define its broader vision?", options: ["A faster blockchain", "An AI platform", "A DeFi hub", "A decentralized, intelligent, and secure computational fabric"], correctIndex: 3 },
    { id: 'q16', text: "What does Ritual aim to optimize instead of only latency and throughput?", options: ["Validator rewards", "Network fees", "Expressive and expansive computation", "Cross-chain bridges"], correctIndex: 2 },
    { id: 'q17', text: "According to the overview, why are performance improvements alone insufficient?", options: ["They increase centralization", "They slow down innovation", "They scale existing use cases without unlocking new ones", "They reduce security"], correctIndex: 2 },
    { id: 'q18', text: "What risk does Ritual associate with adopting closed AI technologies?", options: ["Higher costs", "Slower inference", "Loss of neutrality and censorship resistance", "Poor UX"], correctIndex: 2 },
    { id: 'q19', text: "Beyond AI, what other compute types does Ritual explicitly support?", options: ["Only DeFi-related computation", "Storage-only workloads", "ZK proofs, TEEs, and cross-chain state access", "Gaming engines"], correctIndex: 2 },
    { id: 'q20', text: "What does Ritual mean by becoming the “schelling point” for web3?", options: ["The cheapest blockchain", "The fastest execution layer", "The natural coordination layer for compute across web3", "The default NFT marketplace"], correctIndex: 2 },
    { id: 'q21', text: "How do other blockchains benefit from Ritual?", options: ["By migrating entirely to Ritual", "By outsourcing consensus", "By using Ritual for specialized compute needs", "By sharing validators"], correctIndex: 2 },
    { id: 'q22', text: "Which type of blockchain would need Ritual’s prover network support?", options: ["Meme chains", "Payment chains", "High-performance chains requiring provers", "Governance-only chains"], correctIndex: 2 },
    { id: 'q23', text: "What role does Ritual play for Rollup-as-a-Service platforms?", options: ["Hosting frontends", "Managing token launches", "Executing heterogeneous compute efficiently", "Providing liquidity"], correctIndex: 2 },
    { id: 'q24', text: "How does Ritual approach data storage?", options: ["On-chain only", "Off-chain only", "Storage-agnostic across web2 and web3 systems", "Centralized storage"], correctIndex: 2 },
    { id: 'q25', text: "What problem do Guardians solve in the Ritual network?", options: ["Validator slashing", "Smart contract bugs", "Allowing nodes to opt into execution while staying in consensus", "Data compression"], correctIndex: 2 },
    { id: 'q26', text: "Why is Modular Computational Integrity important to Ritual?", options: ["It simplifies wallets", "It removes trust assumptions", "It enables opt-in guarantees across privacy, provenance, and integrity", "It improves gas efficiency"], correctIndex: 2 },
    { id: 'q27', text: "What does Native Infernet Integration provide to Ritual nodes?", options: ["Faster block times", "Cheaper gas fees", "Seamless access to a compute oracle network", "Centralized AI models"], correctIndex: 2 },
    { id: 'q28', text: "What does Verifiable Provenance ensure in Ritual?", options: ["Lower inference cost", "Model anonymity", "Immutable records of model origin and transformation", "Faster deployment"], correctIndex: 2 },
    { id: 'q29', text: "What is the purpose of pricing and orchestration in Ritual’s architecture?", options: ["To maximize validator profit", "To reduce hardware costs", "To efficiently expose and manage all forms of compute", "To simplify UI design"], correctIndex: 2 },
    { id: 'q30', text: "What does Ritual ultimately position itself as?", options: ["A developer toolkit", "A blockchain for AI only", "Infrastructure for decentralized, intelligent, and trustworthy computation", "A rollup framework"], correctIndex: 2 }
  ]
};

export const EVM_PLUS_PLUS_TOPIC: Topic = {
  id: 'evm-plus-plus',
  title: 'EVM++',
  description: 'The evolution of Ethereum Virtual Machine within the Ritual ecosystem, featuring native scheduling and expressive compute.',
  timeLimit: 300, // 5 minutes
  difficulty: 'Hard',
  enabled: true,
  previewUrl: 'https://www.ritualfoundation.org/docs/architecture/evm++',
  questions: [
    { id: 'e1', text: "What is EVM++ primarily described as?", options: ["A replacement for the Ethereum Virtual Machine", "A Layer 2 execution engine", "A backwards-compatible extension of the EVM", "A new smart contract language"], correctIndex: 2 },
    { id: 'e2', text: "What is the main goal of EVM++?", options: ["Reduce gas fees", "Increase block speed", "Enable actually smart contracts with expressive compute", "Remove EVM limitations entirely"], correctIndex: 2 },
    { id: 'e3', text: "Which property ensures EVM++ does not break existing Ethereum contracts?", options: ["New opcode support", "Native scheduling", "Backwards compatibility", "Account abstraction"], correctIndex: 2 },
    { id: 'e4', text: "Which of the following is NOT a core feature of EVM++?", options: ["Native scheduling", "Built-in account abstraction", "Expressive compute precompiles", "Replacing EOAs entirely"], correctIndex: 3 },
    { id: 'e5', text: "What is the Scheduler in EVM++?", options: ["A validator role", "A Layer 2 service", "A predeploy contract enabling scheduled callbacks", "An off-chain keeper"], correctIndex: 2 },
    { id: 'e6', text: "What can developers register using the Scheduler?", options: ["Gas limits", "Block producers", "Callback frequency for contract invocation", "Signature types"], correctIndex: 2 },
    { id: 'e7', text: "Who maintains the mapping of pending scheduled invocations?", options: ["Smart contracts", "Validators", "Block producers", "Execution sidecars"], correctIndex: 2 },
    { id: 'e8', text: "Where may scheduled transactions be included within a block?", options: ["Randomly", "At the end of the block", "At the top of each block", "Only in empty blocks"], correctIndex: 2 },
    { id: 'e9', text: "What conditions must scheduled transactions satisfy?", options: ["Governance approval", "Keeper validation", "Transaction validity and sufficient fees", "External oracle confirmation"], correctIndex: 2 },
    { id: 'e10', text: "What mechanism ensures inclusion of compute-intensive scheduled transactions?", options: ["Symphony", "Scheduler", "Resonance", "Account abstraction"], correctIndex: 2 },
    { id: 'e11', text: "Scheduled Transactions in EVM++ remove the need for what?", options: ["Validators", "Rollups", "External keepers", "Smart contract wallets"], correctIndex: 2 },
    { id: 'e12', text: "What does account abstraction aim to blur?", options: ["Validators and sequencers", "L1 and L2", "The line between EOAs and smart contract accounts", "On-chain and off-chain execution"], correctIndex: 2 },
    { id: 'e13', text: "How does EVM++ provide native account abstraction?", options: ["Custom wallet software", "Multisig enforcement", "EIP-7702 inclusion", "Layer 2 bundlers"], correctIndex: 2 },
    { id: 'e14', text: "What does EIP-7702 allow?", options: ["Removing EOAs", "Dynamic gas pricing", "Setting code on EOA accounts", "Contract migration"], correctIndex: 2 },
    { id: 'e15', text: "What are accounts enabled by EIP-7702?", options: ["Validator accounts", "Custodial accounts", "Native smart contract accounts", "Proxy-only accounts"], correctIndex: 2 },
    { id: 'e16', text: "Why do most EVM chains lag in EIP support historically?", options: ["Governance delays", "Security concerns", "Development overhead and naive gas pricing", "User demand"], correctIndex: 2 },
    { id: 'e17', text: "What is the purpose of EVM++ EIP Extensions?", options: ["Replace Ethereum governance", "Speed up block times", "Continuously support in-demand EIPs", "Remove precompiles"], correctIndex: 2 },
    { id: 'e18', text: "What does EIP-665 add support for?", options: ["secp256k1 signatures", "BLS signatures", "Ed25519 signature verification", "Multisig validation"], correctIndex: 2 },
    { id: 'e19', text: "Which EIP removes smart contract code size limits?", options: ["EIP-5920", "EIP-7212", "EIP-5027", "EIP-665"], correctIndex: 2 },
    { id: 'e20', text: "How does EIP-5027 manage unlimited contract size?", options: ["Fixed gas increase", "Compression", "Dynamic gas metering", "External storage"], correctIndex: 2 },
    { id: 'e21', text: "What does EIP-5920 introduce?", options: ["New signature scheme", "New storage opcode", "PAY opcode to send ether without execution context transfer", "Contract batching"], correctIndex: 2 },
    { id: 'e22', text: "Which EIP adds secp256r1 signature verification?", options: ["EIP-665", "EIP-5920", "EIP-7212", "EIP-7702"], correctIndex: 2 },
    { id: 'e23', text: "What sits at the heart of EVM++?", options: ["Rollup execution", "Consensus upgrades", "Heterogeneous compute precompiles", "New VM language"], correctIndex: 2 },
    { id: 'e24', text: "How do developers interact with heterogeneous compute in EVM++?", options: ["New SDK", "Custom RPCs", "Standard precompile contract interfaces", "Off-chain scripts"], correctIndex: 2 },
    { id: 'e25', text: "What lies behind these standard interfaces?", options: ["Validators", "Keepers", "Optimized execution sidecars", "Rollup sequencers"], correctIndex: 2 },
    { id: 'e26', text: "What do execution sidecars generate?", options: ["Governance votes", "Storage proofs only", "Execution outputs and proofs", "Block headers"], correctIndex: 2 },
    { id: 'e27', text: "Who consumes the outputs from execution sidecars?", options: ["Ethereum mainnet", "Wallets", "Ritual execution client", "Off-chain indexers"], correctIndex: 2 },
    { id: 'e28', text: "Which compute types are explicitly supported by execution sidecars?", options: ["DeFi only", "Gaming logic", "AI inference, ZK verification, TEE execution, and more", "Storage replication"], correctIndex: 2 },
    { id: 'e29', text: "Why does EVM++ naturally support new execution environments like SVM or MoveVM?", options: ["Custom governance", "Centralized control", "Standardized interfaces and generic sidecar architecture", "Hard forks"], correctIndex: 2 },
    { id: 'e30', text: "What future capability will EVM++ enable for heavy computation?", options: ["Validator delegation", "Faster block production", "Long-running precompiles via async execution", "Contract sharding"], correctIndex: 2 },
    { id: 'e31', text: "What does “lazy execution” mean in this context?", options: ["Delayed finality", "Skipped validation", "Offloading long computations while preserving chain properties", "Reduced security"], correctIndex: 2 },
    { id: 'e32', text: "What core blockchain properties do async executions still inherit?", options: ["Centralized trust", "Off-chain guarantees", "Trustless and state-preserving chain properties", "External arbitration"], correctIndex: 2 }
  ]
};

export const TOPICS: Topic[] = [
  RITUAL_OVERVIEW_TOPIC,
  EVM_PLUS_PLUS_TOPIC,
  {
    id: 'execution-sidecars',
    title: 'Execution Sidecars',
    description: 'Exploring the auxiliary computation units that empower the Sovereign Layer.',
    questions: [],
    timeLimit: 300, // 5 minutes
    difficulty: 'Eldritch',
    enabled: false
  }
];

export const RuneIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v20M5 7l7 5 7-5M5 17l7-5 7 5" />
  </svg>
);

export const HourglassIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 22h14" /><path d="M5 2h14" /><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" /><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
  </svg>
);

export const Footer = () => (
  <footer className="mt-auto py-12 flex flex-col items-center gap-4 text-gray-600 px-4 text-center">
    <div className="flex items-center gap-4">
      <img 
        src="https://pbs.twimg.com/profile_images/1801955577763094529/5qtIvl5X_400x400.jpg" 
        alt="Creator" 
        className="w-10 h-10 rounded-full border border-white/10"
      />
      <p className="text-[10px] md:text-xs uppercase tracking-[0.3em]">
        EVOKED FROM THE VOID BY{' '}
        <a 
          href="https://x.com/aliorbz" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-[#39FF14] transition-all duration-300 hover:glow-neon cursor-pointer"
        >
          aliorbz
        </a>
      </p>
    </div>
  </footer>
);
