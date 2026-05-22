import { VocabularyTerm } from '@/types'

export const vocabularyDatabase: VocabularyTerm[] = [
  // Network Terms - Beginner
  {
    id: 'net-001',
    term: 'Router',
    definition: 'A device that forwards data packets between computer networks',
    category: 'network',
    difficulty: 'beginner',
    example: 'The router connects your home network to the internet.',
    synonyms: ['Gateway'],
    relatedTerms: ['Switch', 'Modem'],
  },
  {
    id: 'net-002',
    term: 'IP Address',
    definition: 'A unique numerical label assigned to each device connected to a network',
    category: 'network',
    difficulty: 'beginner',
    example: 'Every computer on the internet has a unique IP address.',
    relatedTerms: ['DNS', 'MAC Address'],
  },
  {
    id: 'net-003',
    term: 'Bandwidth',
    definition: 'The maximum rate of data transfer across a network path',
    category: 'network',
    difficulty: 'beginner',
    example: 'Higher bandwidth allows for faster internet speeds.',
    synonyms: ['Data rate'],
    relatedTerms: ['Latency', 'Throughput'],
  },
  {
    id: 'net-004',
    term: 'Firewall',
    definition: 'A security system that monitors and controls network traffic',
    category: 'network',
    difficulty: 'beginner',
    example: 'The firewall blocked the suspicious connection attempt.',
    relatedTerms: ['Security', 'Packet filtering'],
  },
  {
    id: 'net-005',
    term: 'DNS',
    definition: 'Domain Name System - translates domain names to IP addresses',
    category: 'network',
    difficulty: 'beginner',
    example: 'DNS converts www.example.com to an IP address.',
    relatedTerms: ['IP Address', 'Domain'],
  },

  // Network Terms - Intermediate
  {
    id: 'net-101',
    term: 'Subnet Mask',
    definition: 'A 32-bit number that divides an IP address into network and host portions',
    category: 'network',
    difficulty: 'intermediate',
    example: 'The subnet mask 255.255.255.0 is commonly used in home networks.',
    relatedTerms: ['IP Address', 'CIDR'],
  },
  {
    id: 'net-102',
    term: 'VPN',
    definition: 'Virtual Private Network - creates a secure connection over the internet',
    category: 'network',
    difficulty: 'intermediate',
    example: 'Employees use VPN to securely access company resources remotely.',
    synonyms: ['Virtual Private Network'],
    relatedTerms: ['Encryption', 'Tunneling'],
  },
  {
    id: 'net-103',
    term: 'Load Balancer',
    definition: 'Distributes network traffic across multiple servers',
    category: 'network',
    difficulty: 'intermediate',
    example: 'The load balancer ensures no single server gets overwhelmed.',
    relatedTerms: ['Server', 'Scalability'],
  },

  // Network Terms - Advanced
  {
    id: 'net-201',
    term: 'BGP',
    definition: 'Border Gateway Protocol - routing protocol for the internet',
    category: 'network',
    difficulty: 'advanced',
    example: 'BGP is used to exchange routing information between autonomous systems.',
    synonyms: ['Border Gateway Protocol'],
    relatedTerms: ['Routing', 'AS'],
  },
  {
    id: 'net-202',
    term: 'MPLS',
    definition: 'Multiprotocol Label Switching - data forwarding technique',
    category: 'network',
    difficulty: 'advanced',
    example: 'MPLS improves network performance by using labels instead of addresses.',
    relatedTerms: ['QoS', 'Traffic Engineering'],
  },

  // Coding Terms - Beginner
  {
    id: 'code-001',
    term: 'Variable',
    definition: 'A named storage location in memory that holds a value',
    category: 'coding',
    difficulty: 'beginner',
    example: 'let name = "John" creates a variable called name.',
    relatedTerms: ['Data type', 'Assignment'],
  },
  {
    id: 'code-002',
    term: 'Function',
    definition: 'A reusable block of code that performs a specific task',
    category: 'coding',
    difficulty: 'beginner',
    example: 'function add(a, b) { return a + b; }',
    synonyms: ['Method', 'Procedure'],
    relatedTerms: ['Parameter', 'Return value'],
  },
  {
    id: 'code-003',
    term: 'Loop',
    definition: 'A programming construct that repeats a block of code',
    category: 'coding',
    difficulty: 'beginner',
    example: 'for (let i = 0; i < 10; i++) { console.log(i); }',
    synonyms: ['Iteration'],
    relatedTerms: ['For loop', 'While loop'],
  },
  {
    id: 'code-004',
    term: 'Array',
    definition: 'A data structure that stores multiple values in a single variable',
    category: 'coding',
    difficulty: 'beginner',
    example: 'let numbers = [1, 2, 3, 4, 5];',
    synonyms: ['List'],
    relatedTerms: ['Index', 'Element'],
  },
  {
    id: 'code-005',
    term: 'String',
    definition: 'A sequence of characters used to represent text',
    category: 'coding',
    difficulty: 'beginner',
    example: 'let greeting = "Hello, World!";',
    relatedTerms: ['Character', 'Text'],
  },

  // Coding Terms - Intermediate
  {
    id: 'code-101',
    term: 'API',
    definition: 'Application Programming Interface - allows software to communicate',
    category: 'coding',
    difficulty: 'intermediate',
    example: 'The weather API provides current weather data to applications.',
    synonyms: ['Application Programming Interface'],
    relatedTerms: ['REST', 'Endpoint'],
  },
  {
    id: 'code-102',
    term: 'Asynchronous',
    definition: 'Code execution that doesn\'t block other operations',
    category: 'coding',
    difficulty: 'intermediate',
    example: 'async function fetchData() { await fetch(url); }',
    synonyms: ['Non-blocking'],
    relatedTerms: ['Promise', 'Callback'],
  },
  {
    id: 'code-103',
    term: 'Recursion',
    definition: 'A function that calls itself to solve a problem',
    category: 'coding',
    difficulty: 'intermediate',
    example: 'function factorial(n) { return n <= 1 ? 1 : n * factorial(n-1); }',
    relatedTerms: ['Base case', 'Stack'],
  },

  // Coding Terms - Advanced
  {
    id: 'code-201',
    term: 'Closure',
    definition: 'A function that has access to variables in its outer scope',
    category: 'coding',
    difficulty: 'advanced',
    example: 'Closures enable data privacy and factory functions.',
    relatedTerms: ['Scope', 'Lexical environment'],
  },
  {
    id: 'code-202',
    term: 'Memoization',
    definition: 'Optimization technique that caches function results',
    category: 'coding',
    difficulty: 'advanced',
    example: 'Memoization improves performance by avoiding redundant calculations.',
    relatedTerms: ['Caching', 'Dynamic programming'],
  },

  // Hardware Terms - Beginner
  {
    id: 'hw-001',
    term: 'CPU',
    definition: 'Central Processing Unit - the brain of the computer',
    category: 'hardware',
    difficulty: 'beginner',
    example: 'The CPU executes instructions from programs.',
    synonyms: ['Processor', 'Central Processing Unit'],
    relatedTerms: ['Core', 'Clock speed'],
  },
  {
    id: 'hw-002',
    term: 'RAM',
    definition: 'Random Access Memory - temporary storage for running programs',
    category: 'hardware',
    difficulty: 'beginner',
    example: 'More RAM allows you to run more programs simultaneously.',
    synonyms: ['Memory', 'Random Access Memory'],
    relatedTerms: ['Storage', 'Volatile'],
  },
  {
    id: 'hw-003',
    term: 'Hard Drive',
    definition: 'A storage device that permanently stores data',
    category: 'hardware',
    difficulty: 'beginner',
    example: 'The hard drive stores your operating system and files.',
    synonyms: ['HDD', 'Storage'],
    relatedTerms: ['SSD', 'Disk'],
  },
  {
    id: 'hw-004',
    term: 'Motherboard',
    definition: 'The main circuit board that connects all computer components',
    category: 'hardware',
    difficulty: 'beginner',
    example: 'The motherboard houses the CPU, RAM, and expansion slots.',
    synonyms: ['Mainboard'],
    relatedTerms: ['Chipset', 'Socket'],
  },
  {
    id: 'hw-005',
    term: 'GPU',
    definition: 'Graphics Processing Unit - handles graphics rendering',
    category: 'hardware',
    difficulty: 'beginner',
    example: 'A powerful GPU is essential for gaming and video editing.',
    synonyms: ['Graphics card', 'Video card'],
    relatedTerms: ['VRAM', 'Rendering'],
  },

  // Hardware Terms - Intermediate
  {
    id: 'hw-101',
    term: 'PCIe',
    definition: 'Peripheral Component Interconnect Express - high-speed interface',
    category: 'hardware',
    difficulty: 'intermediate',
    example: 'Modern GPUs use PCIe slots for connection to the motherboard.',
    relatedTerms: ['Expansion slot', 'Bandwidth'],
  },
  {
    id: 'hw-102',
    term: 'BIOS',
    definition: 'Basic Input/Output System - firmware that initializes hardware',
    category: 'hardware',
    difficulty: 'intermediate',
    example: 'The BIOS runs when you first turn on your computer.',
    synonyms: ['Firmware'],
    relatedTerms: ['UEFI', 'POST'],
  },
  {
    id: 'hw-103',
    term: 'Cache',
    definition: 'Small, fast memory located close to the CPU',
    category: 'hardware',
    difficulty: 'intermediate',
    example: 'CPU cache reduces the time to access frequently used data.',
    relatedTerms: ['L1', 'L2', 'L3'],
  },

  // Hardware Terms - Advanced
  {
    id: 'hw-201',
    term: 'RAID',
    definition: 'Redundant Array of Independent Disks - data storage virtualization',
    category: 'hardware',
    difficulty: 'advanced',
    example: 'RAID 1 mirrors data across multiple drives for redundancy.',
    relatedTerms: ['Redundancy', 'Striping'],
  },
  {
    id: 'hw-202',
    term: 'ECC Memory',
    definition: 'Error-Correcting Code memory - detects and corrects data corruption',
    category: 'hardware',
    difficulty: 'advanced',
    example: 'ECC memory is crucial for servers and mission-critical systems.',
    relatedTerms: ['RAM', 'Data integrity'],
  },
]

export function getTermsByCategory(category: string) {
  return vocabularyDatabase.filter(term => term.category === category)
}

export function getTermsByDifficulty(difficulty: string) {
  return vocabularyDatabase.filter(term => term.difficulty === difficulty)
}

export function getTermsByCategoryAndDifficulty(category: string, difficulty: string) {
  return vocabularyDatabase.filter(
    term => term.category === category && term.difficulty === difficulty
  )
}

export function getRandomTerms(count: number, category?: string, difficulty?: string) {
  let terms = vocabularyDatabase
  
  if (category) {
    terms = terms.filter(term => term.category === category)
  }
  
  if (difficulty) {
    terms = terms.filter(term => term.difficulty === difficulty)
  }
  
  const shuffled = [...terms].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
