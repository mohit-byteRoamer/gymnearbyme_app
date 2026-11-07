import { Gym, SimilarGym } from '../types/index'
import { GYMS } from '../../../data/gyms'

export const CULT_FIT_DETAILED: Gym = {
  id: 'cult-fit-sarabha',
  name: 'Cult.Fit Sarabha Nagar',
  tagline: 'Ludhiana’s Most Premium Athlete-Guided Fitness Experience',
  locality: 'Sarabha Nagar',
  localityId: 'sarabha-nagar',
  address: 'SCO 14-15, Kipps Market, Main Road, Sarabha Nagar, Ludhiana, Punjab 141001',
  landmarks: 'Opposite Kipps Market Clock Tower, 200m from Sacred Heart Convent',
  parkingInfo: 'Valet parking available + Dedicated basement member parking for 40+ vehicles',
  phone: '+919876543211',
  whatsapp: '+919876543211',
  distance: '2.5 km',
  distanceNum: 2.5,
  lat: 30.892,
  lng: 75.821,
  rating: 4.9,
  reviewsCount: 218,
  ratingBreakdown: {
    5: 184,
    4: 26,
    3: 6,
    2: 1,
    1: 1,
  },
  categories: ['Group Classes', 'Strength & Conditioning', 'Yoga & Mobility', 'Boxing Conditioning'],
  openUntil: '10:00 PM',
  minPrice: 1200,
  isFeatured: true,
  acceptsOnlineJoining: true,
  verified: true,
  coverPhoto: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1600&q=85',
  galleryPhotos: [
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1600&q=85',
  ],
  videoThumbnails: [
    {
      id: 'v21',
      title: 'Cult Group Classes Walkthrough',
      duration: '1:30',
      thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    {
      id: 'v22',
      title: 'Boxing & Functional Conditioning',
      duration: '2:00',
      thumbnail: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    },
    {
      id: 'v23',
      title: 'Core, Yoga & Flexibility Studio',
      duration: '1:10',
      thumbnail: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    },
  ],
  about:
    'Cult.Fit Sarabha Nagar combines athlete-guided group workouts, strength training, and restorative yoga in a premium, ultra-hygienic setting right at Kipps Market. Featuring certified master trainers, smart locker systems, and customized heart-rate tracked sessions, Cult.Fit ensures every workout is engaging, safe, and results-driven.',
  usps: [
    'Athlete-guided signature formats (HRX, S&C, Burn, Yoga)',
    '100% sanitized equipment with daily medical-grade disinfection',
    'Complimentary body composition and biometric analysis',
    'Instant QR mobile voucher check-in — no front desk paperwork',
  ],
  plans: [
    {
      id: 'plan-cult-monthly',
      name: 'Monthly Pass',
      durationDays: 30,
      price: 1200,
      features: [
        'Unlimited access to gym floor & group classes',
        'Digital smart locker & shower access',
        '1 complimentary trainer onboarding session',
        'Cancel anytime with instant pro-rata refund',
      ],
    },
    {
      id: 'plan-cult-quarterly',
      name: 'Quarterly Pass',
      durationDays: 90,
      price: 3200,
      badge: { text: 'Save ₹400', color: 'emerald' },
      features: [
        'Unlimited access to all format zones',
        'Free body composition analysis every 30 days',
        '2 complimentary guest passes included',
        '1 week membership freeze allowance',
      ],
    },
    {
      id: 'plan-cult-halfyearly',
      name: 'Half-yearly Pass',
      durationDays: 180,
      price: 5900,
      badge: { text: 'Save ₹1,300', color: 'emerald' },
      features: [
        'All class formats and strength floor included',
        '2 pause weeks available during travel',
        '4 complimentary guest passes',
        'Nutritional baseline consultation with coach',
      ],
    },
    {
      id: 'plan-cult-yearly',
      name: 'Yearly Elite',
      durationDays: 365,
      price: 9900,
      isRecommended: true,
      badge: { text: 'Best Value · Save ₹4,500', color: 'amber' },
      features: [
        '365 days unrestricted all-access to all centers in Punjab',
        'Free Cult sports kit and branded shaker bottle',
        'Monthly in-depth body scan and progress review',
        '4 pause weeks available anytime',
        'Unlimited free steam room and sauna sessions',
      ],
    },
  ],
  trainers: [
    {
      id: 'tr-21',
      name: 'Karanvir Bains',
      role: 'Head Coach & Functional Specialist',
      speciality: 'HIIT, Strength & Olympic Lifting',
      experienceYears: 8,
      certifications: ['CSCS Certified Strength Coach', 'CrossFit Level 2', 'CPR/AED Certified'],
      rating: 4.9,
      reviewCount: 94,
      clientsTrained: 620,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Former state-level powerlifter with 8+ years coaching athletes and working professionals in functional body transformations and injury prevention.',
    },
    {
      id: 'tr-22',
      name: 'Mehak Dhillon',
      role: 'Master Yoga & Mobility Instructor',
      speciality: 'Vinyasa Flow, Posture Rehab & Breathwork',
      experienceYears: 6,
      certifications: ['RYT-500 Yoga Alliance', 'Functional Movement Screen (FMS)'],
      rating: 4.95,
      reviewCount: 82,
      clientsTrained: 480,
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      bio: 'Specializes in high-intensity mobility and mindful alignment for lifters, runners, and sedentary professionals looking to eliminate joint pain.',
    },
  ],
  facilitiesCategorized: [
    {
      category: 'Amenities & Comfort',
      items: [
        { id: 'ac', name: 'Central Air Conditioning', icon: 'Wind', available: true, description: 'Medical-grade HEPA filtered HVAC' },
        { id: 'parking', name: 'Valet & Covered Parking', icon: 'Car', available: true, description: 'Dedicated spaces for members' },
        { id: 'lockers', name: 'Smart Digital Lockers', icon: 'Lock', available: true, description: 'RFID & PIN operated' },
        { id: 'showers', name: 'Hot Showers & Steam', icon: 'ShowerHead', available: true, description: 'Premium toiletries included' },
      ],
    },
    {
      category: 'Training Equipment',
      items: [
        { id: 'weights', name: 'Competition Free Weights', icon: 'Dumbbell', available: true, description: 'Dumbbells up to 50kg & Eleiko barbells' },
        { id: 'cardio', name: 'Smart Cardio Deck', icon: 'Activity', available: true, description: 'Interactive treadmills, rowers & ski-ergs' },
        { id: 'rigs', name: 'Functional CrossFit Rigs', icon: 'Grid', available: true, description: 'Climbing ropes, rings & pull-up stations' },
        { id: 'turf', name: 'Indoor Sprint Turf', icon: 'Maximize2', available: true, description: '20m sled push & agility track' },
      ],
    },
    {
      category: 'Services & Support',
      items: [
        { id: 'wifi', name: 'High-speed Member Wi-Fi', icon: 'Wifi', available: true, description: 'Seamless coverage across all floors' },
        { id: 'cafe', name: 'Protein & Shake Bar', icon: 'Coffee', available: true, description: 'Fresh post-workout nutrition' },
        { id: 'pool', name: 'Swimming Pool', icon: 'Waves', available: false, description: 'Not available at this location' },
      ],
    },
  ],
  timingsSchedule: [
    { day: 'Monday', openTime: '5:00 AM', closeTime: '10:00 PM', isToday: true },
    { day: 'Tuesday', openTime: '5:00 AM', closeTime: '10:00 PM' },
    { day: 'Wednesday', openTime: '5:00 AM', closeTime: '10:00 PM' },
    { day: 'Thursday', openTime: '5:00 AM', closeTime: '10:00 PM' },
    { day: 'Friday', openTime: '5:00 AM', closeTime: '10:00 PM' },
    { day: 'Saturday', openTime: '5:00 AM', closeTime: '10:00 PM' },
    { day: 'Sunday', openTime: '6:00 AM', closeTime: '12:00 PM' },
  ],
  reviews: [
    {
      id: 'r21',
      author: 'Navdeep Gill',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      date: '3 days ago',
      isVerifiedMember: true,
      planType: 'Yearly Elite',
      text: 'Top tier facility in Ludhiana! Group workouts keep motivation super high and the trainers actually pay close attention to posture during deadlifts and squats.',
    },
    {
      id: 'r22',
      author: 'Rahul Talwar',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      date: '1 week ago',
      isVerifiedMember: true,
      planType: 'Quarterly Pass',
      text: 'Clean locker rooms, excellent steam bath, and brand new cardio machines. Getting in via the QR voucher on GymApp took literally 10 seconds at the front desk.',
    },
    {
      id: 'r23',
      author: 'Esha Arora',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      rating: 4,
      date: '3 weeks ago',
      isVerifiedMember: true,
      planType: 'Monthly Pass',
      text: 'Loved the HRX and Yoga sessions. Mehak is an incredible coach. The only small hiccup is parking gets busy around 7 PM, but the valet handled it smoothly.',
    },
    {
      id: 'r24',
      author: 'Harmanjot Sandhu',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      date: '1 month ago',
      isVerifiedMember: true,
      planType: 'Yearly Elite',
      text: 'The best Cult center in Punjab. High ceilings, immaculate air conditioning, and zero crowded waiting on squat racks in the morning.',
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Do I get a trial pass before buying a plan?',
      answer: 'Yes! You can book a free 1-day pass to explore the gym floor and attend any group fitness class before choosing your membership.',
    },
    {
      id: 'faq-2',
      question: 'Can I freeze or pause my membership if I travel?',
      answer: 'Yes. Quarterly passes include 1 pause week, Half-yearly passes include 2 pause weeks, and Yearly passes allow up to 4 pause weeks with zero penalties.',
    },
    {
      id: 'faq-3',
      question: 'How does activation work after paying on GymApp?',
      answer: 'Your payment generates an instant digital QR voucher in your account. Your membership duration starts only on the day you scan your QR at the gym front desk.',
    },
    {
      id: 'faq-4',
      question: 'Can I bring a guest with me?',
      answer: 'Quarterly and Yearly members receive complimentary guest passes. Each guest pass provides 1 full day of unrestricted gym floor and locker access.',
    },
  ],
}

export const SIMILAR_GYMS: SimilarGym[] = [
  {
    id: 'iron-forge-fitness',
    name: 'Iron Forge Fitness & CrossFit',
    locality: 'Model Town',
    distance: '1.2 km',
    rating: 4.8,
    reviewsCount: 142,
    minPrice: 1000,
    coverPhoto: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
  },
  {
    id: 'gold-standard-brs',
    name: 'Gold Standard Gym & Spa',
    locality: 'BRS Nagar',
    distance: '3.8 km',
    rating: 4.7,
    reviewsCount: 96,
    minPrice: 1000,
    coverPhoto: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'titan-strength-pakhowal',
    name: 'Titan Strength Club',
    locality: 'Pakhowal Road',
    distance: '4.1 km',
    rating: 4.6,
    reviewsCount: 78,
    minPrice: 1000,
    coverPhoto: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
  },
]

/**
 * Fetch gym detail with realistic simulated latency
 */
export async function fetchGymDetail(id: string): Promise<Gym> {
  await new Promise((res) => setTimeout(res, 350))

  if (id === 'cult-fit-sarabha') {
    return CULT_FIT_DETAILED
  }

  // Fallback to match existing seed gyms
  const existing = (GYMS as any[]).find((g) => g.id === id)
  if (!existing) {
    throw new Error('Gym not found')
  }

  return {
    ...CULT_FIT_DETAILED,
    id: existing.id,
    name: existing.name,
    locality: existing.locality,
    localityId: existing.localityId,
    address: existing.address,
    distance: existing.distance,
    rating: existing.rating,
    reviewsCount: existing.reviewsCount,
    coverPhoto: existing.coverPhoto,
    galleryPhotos: existing.galleryPhotos || CULT_FIT_DETAILED.galleryPhotos,
    videoThumbnails: existing.videoThumbnails || CULT_FIT_DETAILED.videoThumbnails,
    about: existing.about,
    acceptsOnlineJoining: existing.acceptsOnlineJoining !== false,
  }
}

