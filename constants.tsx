
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
  timeLimit: 600, // 10 minutes
  difficulty: 'Medium',
  enabled: true,
  previewUrl: 'https://www.ritualfoundation.org/docs/overview/what-is-ritual',
  questions: [
    {
      id: 'q1',
      text: "What is Ritual’s primary focus as a blockchain?",
      options: [
        "Maximizing throughput for existing users",
        "Replacing Ethereum smart contracts",
        "Enriching what users can do on-chain to attract future users",
        "Becoming the fastest Layer 2"
      ],
      correctIndex: 2
    },
    {
      id: 'q2',
      text: "According to the overview, what historically drives large increases in blockchain users?",
      options: [
        "Lower gas fees",
        "Faster block times",
        "Better marketing",
        "Net-new innovations enabling new behavior"
      ],
      correctIndex: 3
    },
    {
      id: 'q3',
      text: "What key innovation did Bitcoin introduce in 2009?",
      options: [
        "Smart contracts",
        "Decentralized applications",
        "Permissionless money transfer without intermediaries",
        "On-chain governance"
      ],
      correctIndex: 2
    },
    {
      id: 'q4',
      text: "What did Ethereum introduce that expanded blockchain use cases in 2015?",
      options: [
        "ZK proofs",
        "Rollups",
        "Account abstraction",
        "Smart contracts"
      ],
      correctIndex: 3
    },
    {
      id: 'q5',
      text: "What does the overview criticize about most modern blockchains today?",
      options: [
        "Too much decentralization",
        "Poor developer tooling",
        "Optimizing latency and throughput over innovation",
        "Excessive regulation"
      ],
      correctIndex: 2
    },
    {
      id: 'q6',
      text: "From which intersection did Ritual’s development originally begin?",
      options: [
        "Gaming and NFTs",
        "DeFI and payments",
        "Crypto and Artificial Intelligence",
        "Privacy and governance"
      ],
      correctIndex: 2
    },
    {
      id: 'q7',
      text: "Why does Ritual believe AI should be on-chain?",
      options: [
        "To make AI cheaper",
        "To centralize AI models",
        "To ensure AI is open, neutral, and censorship resistant",
        "To replace smart contracts entirely"
      ],
      correctIndex: 2
    },
    {
      id: 'q8',
      text: "What does Ritual mean by “making smart contracts actually smart”?",
      options: [
        "Adding faster execution",
        "Embedding wallets",
        "Allowing native on-chain AI usage with trustless guarantees",
        "Removing human input"
      ],
      correctIndex: 2
    },
    {
      id: 'q9',
      text: "What type of compute is Ritual optimized to support?",
      options: [
        "Only AI inference",
        "Only EVM execution",
        "Only ZK proofs",
        "Any heterogeneous compute (AI, ZK, TEEs, and more)"
      ],
      correctIndex: 3
    },
    {
      id: 'q10',
      text: "What are Scheduled Transactions in Ritual?",
      options: [
        "Batch payments",
        "Delayed block confirmations",
        "Recurring or conditional smart contract execution without keepers",
        "Off-chain automation tools"
      ],
      correctIndex: 2
    },
    {
      id: 'q11',
      text: "What are Enshrined On-Chain AI Models designed to provide?",
      options: [
        "Faster inference",
        "Cheaper model training",
        "On-chain provenance, authenticity, and IP primitives",
        "Private model storage only"
      ],
      correctIndex: 2
    },
    {
      id: 'q12',
      text: "What is the purpose of Ritual’s Model Marketplace?",
      options: [
        "Hosting NFTs",
        "Selling compute hardware",
        "Transparent monetization of models with verifiable provenance",
        "Centralized AI distribution"
      ],
      correctIndex: 2
    },
    {
      id: 'q13',
      text: "What does Node Specialization mean in Ritual’s architecture?",
      options: [
        "All nodes do the same work",
        "Nodes are replaced by validators",
        "Nodes are specialized for different workloads",
        "Nodes only store data"
      ],
      correctIndex: 2
    },
    {
      id: 'q14',
      text: "What is Symphony in the Ritual ecosystem?",
      options: [
        "A storage layer",
        "A fee market",
        "A new consensus protocol with dual proof sharding and verification",
        "A developer SDK"
      ],
      correctIndex: 2
    },
    {
      id: 'q15',
      text: "Ultimately, how does Ritual define its broader vision?",
      options: [
        "A faster blockchain",
        "An AI platform",
        "A DeFi hub",
        "A decentralized, intelligent, and secure computational fabric"
      ],
      correctIndex: 3
    }
  ]
};

export const TOPICS: Topic[] = [
  RITUAL_OVERVIEW_TOPIC,
  {
    id: 'evm-plus-plus',
    title: 'EVM++',
    description: 'The evolution of Ethereum Virtual Machine within the Ritual ecosystem.',
    questions: [],
    timeLimit: 900,
    difficulty: 'Hard',
    enabled: false
  },
  {
    id: 'execution-sidecars',
    title: 'Execution Sidecars',
    description: 'Exploring the auxiliary computation units that empower the Sovereign Layer.',
    questions: [],
    timeLimit: 1200,
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
  <footer className="mt-auto py-12 flex flex-col items-center gap-4 text-gray-600">
    <div className="flex items-center gap-4">
      <img 
        src="https://pbs.twimg.com/profile_images/1801955577763094529/5qtIvl5X_400x400.jpg" 
        alt="Creator" 
        className="w-10 h-10 rounded-full border border-white/10"
      />
      <p className="text-xs uppercase tracking-[0.3em]">
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
