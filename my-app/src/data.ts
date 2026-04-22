import { Delivery, RouteStats } from './types';

export const ROUTE_SUMMARIES: RouteStats[] = [
  { 
    routeId: 'MAD-NORTH-A1', 
    driverName: 'Carlos M.', 
    totalStops: 124, 
    health: 94, 
    potentialFailures: 3, 
    aiInterventions: 12,
    role: 'delivery',
    completedStops: [
      { id: 'D-1100', address: 'Calle de Velázquez 12, Madrid', status: 'success', time: '07:45' },
      { id: 'D-1101', address: 'Calle de Goya 4, Madrid', status: 'failed', time: '07:55' }
    ]
  },
  { 
    routeId: 'MAD-NORTH-A2', 
    driverName: 'Ricardo P.', 
    totalStops: 118, 
    health: 91, 
    potentialFailures: 4, 
    aiInterventions: 15,
    role: 'delivery',
    completedStops: []
  },
  { 
    routeId: 'MAD-CENTRAL-B2', 
    driverName: 'Elena G.', 
    totalStops: 142, 
    health: 68, 
    potentialFailures: 14, 
    aiInterventions: 28,
    role: 'pickup',
    completedStops: [
      { id: 'P-1001', address: 'Mango Store, Gran Vía 32, Madrid', status: 'success', time: '08:15' }
    ]
  },
  { 
    routeId: 'MAD-CENTRAL-B3', 
    driverName: 'Miguel S.', 
    totalStops: 130, 
    health: 82, 
    potentialFailures: 8, 
    aiInterventions: 21,
    role: 'pickup',
    completedStops: []
  },
  { 
    routeId: 'MAD-EAST-C4', 
    driverName: 'Javier R.', 
    totalStops: 110, 
    health: 89, 
    potentialFailures: 5, 
    aiInterventions: 8,
    role: 'delivery',
    completedStops: []
  },
  { 
    routeId: 'MAD-SOUTH-D8', 
    driverName: 'Sofia L.', 
    totalStops: 135, 
    health: 74, 
    potentialFailures: 11, 
    aiInterventions: 19,
    role: 'pickup',
    completedStops: [
      { id: 'P-1005', address: 'Inditex Hub, Valdemoro', status: 'success', time: '07:30' }
    ]
  },
  { 
    routeId: 'MAD-WEST-E1', 
    driverName: 'Antonio K.', 
    totalStops: 95, 
    health: 96, 
    potentialFailures: 2, 
    aiInterventions: 5,
    role: 'delivery',
    completedStops: []
  },
];

export const MOCK_DELIVERIES: Delivery[] = [
  // MAD-NORTH-A1
  {
    id: 'P-5521',
    userId: 'CORP-ZARA-IND',
    address: 'Zara Flagship, Calle de Serrano 23, Madrid',
    predictedProbability: 0.99,
    suggestedSlot: '08:00 - 08:30',
    assignedRoute: 'MAD-NORTH-A1',
    status: 'pending',
    priority: true,
    stopType: 'pickup',
    historyCount: 142,
    notes: 'High-volume morning pickup. Loading bay confirmed.',
    predictedArrival: '08:10',
    confidenceScore: 99
  },
  {
    id: 'D-2210',
    userId: 'USR-77321-Q',
    address: 'Avenida de América 101, Madrid',
    predictedProbability: 0.98,
    suggestedSlot: '08:30 - 09:30',
    assignedRoute: 'MAD-NORTH-A1',
    status: 'pending',
    priority: false,
    stopType: 'delivery',
    historyCount: 24,
    notes: 'Strong morning presence confirmed by multi-provider data',
    predictedArrival: '08:45',
    confidenceScore: 98
  },
  {
    id: 'D-9842',
    userId: 'USR-88219-X',
    address: 'Calle de Serrano 45, Madrid',
    predictedProbability: 0.94,
    suggestedSlot: '09:30 - 10:30',
    assignedRoute: 'MAD-NORTH-A1',
    status: 'pending',
    priority: false,
    stopType: 'delivery',
    historyCount: 12,
    notes: 'Usually receives in morning slots',
    predictedArrival: '10:05',
    confidenceScore: 92
  },
  {
    id: 'D-4415',
    userId: 'USR-12903-Y',
    address: 'Calle Mayor 10, Madrid',
    predictedProbability: 0.88,
    suggestedSlot: '11:00 - 12:00',
    assignedRoute: 'MAD-NORTH-A1',
    status: 'pending',
    priority: false,
    stopType: 'delivery',
    historyCount: 8,
    notes: 'Office delivery; high reliability',
    predictedArrival: '11:15',
    confidenceScore: 95
  },
  
  // MAD-NORTH-A2
  {
    id: 'D-3301',
    userId: 'USR-8822-M',
    address: 'Calle de Alcalá 44, Madrid',
    predictedProbability: 0.92,
    suggestedSlot: '09:00 - 10:00',
    assignedRoute: 'MAD-NORTH-A2',
    status: 'pending',
    priority: false,
    stopType: 'delivery',
    historyCount: 15,
    predictedArrival: '09:15',
    confidenceScore: 91
  },
  {
    id: 'D-3302',
    userId: 'USR-8823-N',
    address: 'Calle de Velázquez 88, Madrid',
    predictedProbability: 0.85,
    suggestedSlot: '10:30 - 11:30',
    assignedRoute: 'MAD-NORTH-A2',
    status: 'pending',
    priority: true,
    stopType: 'delivery',
    historyCount: 5,
    predictedArrival: '10:45',
    confidenceScore: 88
  },

  // MAD-CENTRAL-B2
  {
    id: 'P-2001',
    userId: 'CORP-MANGO-32',
    address: 'Mango, Gran Vía 32, Madrid',
    predictedProbability: 0.97,
    suggestedSlot: '10:00 - 11:00',
    assignedRoute: 'MAD-CENTRAL-B2',
    status: 'pending',
    priority: true,
    stopType: 'pickup',
    historyCount: 210,
    predictedArrival: '10:15',
    confidenceScore: 97
  },

  // EXTRA FOR BULK (Just a sample, component can generate more for the "big list" look)
  ...Array.from({ length: 40 }).map((_, i) => ({
    id: `B-${1000 + i}`,
    userId: `USR-BULK-${i}`,
    address: `Calle Ficticia ${i + 1}, Madrid`,
    predictedProbability: 0.7 + Math.random() * 0.25,
    suggestedSlot: '09:00 - 18:00',
    assignedRoute: 'MAD-NORTH-A1',
    status: 'pending' as const,
    priority: Math.random() > 0.8,
    stopType: (Math.random() > 0.5 ? 'delivery' : 'pickup') as any,
    historyCount: Math.floor(Math.random() * 50),
    predictedArrival: '12:00',
    confidenceScore: 70 + Math.floor(Math.random() * 25)
  }))
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    to: 'End Customer',
    message: 'Your package is expected between 13:00–15:00. This slot was chosen based on your previous successful deliveries.',
    type: 'success'
  },
  {
    id: 'n2',
    to: 'Retailer (Zara)',
    message: 'Delivery success probability improved by 22% after shifting slot from AM to PM.',
    type: 'insight'
  }
];

export const NETWORK_STATS = {
  totalDeliveriesLearned: '14,200,340',
  participatingProviders: 12,
  confidenceImprovement: '+18.4%',
  providerList: ['SEUR', 'Correos', 'Celeritas', 'MRW', 'TNT', 'DHL España', 'Zeleris', 'Glovo Business', 'TIPSA', 'CTT Express', 'GLS Spain', 'Ontime']
};
