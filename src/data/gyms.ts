export interface PlanChip {
  text: string
  color: 'green' | 'blue' | 'yellow' | 'red' | 'slate'
}

export interface GymPlan {
  id: string
  name: string
  durationDays: number
  price: number
  isRecommended?: boolean
  features?: string[]
  chip?: PlanChip | null
}

export interface GymVideo {
  id: string
  title: string
  duration: string
  thumbnail: string
  videoUrl: string
}

export interface GymFacility {
  id: string
  name: string
  icon?: string
}

export interface GymTimings {
  weekday: string
  weekend: string
}

export interface GymTrainer {
  id: string
  name: string
  speciality: string
  photo: string
}

export interface GymReview {
  id: string
  author: string
  rating: number
  date: string
  text: string
}

export interface GymItem {
  id: string
  name: string
  locality: string
  localityId: string
  address: string
  phone: string
  distance: string
  distanceNum: number
  lat: number
  lng: number
  rating: number
  reviewsCount: number
  openUntil: string
  minPrice: number
  isFeatured: boolean
  acceptsOnlineJoining: boolean
  verified: boolean
  coverPhoto: string
  about?: string
  facilities?: GymFacility[]
  timings?: GymTimings
  trainers?: GymTrainer[]
  reviews?: GymReview[]
  galleryPhotos: string[]
  videoThumbnails: GymVideo[]
  plans: GymPlan[]
}

export const GYMS: GymItem[] = [
  {
    id: 'iron-forge-fitness',
    name: 'Iron Forge Fitness & CrossFit',
    locality: 'Model Town',
    localityId: 'model-town',
    address: 'SCO 24-25, Model Town Market, Near Gol Market, Ludhiana, Punjab 141002',
    phone: '+919876543210',
    distance: '1.2 km',
    distanceNum: 1.2,
    lat: 30.8936,
    lng: 75.8344,
    rating: 4.8,
    reviewsCount: 142,
    openUntil: '10:00 PM',
    minPrice: 1000,
    isFeatured: true,
    acceptsOnlineJoining: true,
    verified: true,
    coverPhoto: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1623874514711-0f321325f318?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590239926044-2454f8101a05?auto=format&fit=crop&w=1200&q=80',
    ],
    videoThumbnails: [
      {
        id: 'v1',
        title: 'Gym Tour & Equipment',
        duration: '1:45',
        thumbnail: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      },
      {
        id: 'v2',
        title: 'CrossFit Zone Training',
        duration: '2:10',
        thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      },
      {
        id: 'v3',
        title: 'Spin & Cardio Studio',
        duration: '1:15',
        thumbnail: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      },
    ],
    about: 'Iron Forge Fitness & CrossFit is Ludhiana’s premier strength and functional conditioning facility in Model Town. Spanning 12,000 sq.ft across 3 air-conditioned levels, we offer state-of-the-art Olympic barbells, imported cardio decks, dedicated CrossFit rigs, and personalized coaching for every fitness level.',
    facilities: [
      { id: 'ac', name: 'Air Conditioning', icon: 'Wind' },
      { id: 'parking', name: 'Valet Parking', icon: 'Car' },
      { id: 'lockers', name: 'Digital Lockers', icon: 'Lock' },
      { id: 'showers', name: 'Hot Showers & Steam', icon: 'ShowerHead' },
      { id: 'cardio', name: 'Cardio Zone', icon: 'Activity' },
      { id: 'weights', name: 'Free Weights', icon: 'Dumbbell' },
    ],
    timings: {
      weekday: 'Mon - Sat: 5:00 AM to 10:00 PM',
      weekend: 'Sunday: 6:00 AM to 12:00 PM',
    },
    trainers: [
      {
        id: 'tr-1',
        name: 'Harpreet Singh',
        speciality: 'Strength & Conditioning',
        photo: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=250&q=80',
      },
      {
        id: 'tr-2',
        name: 'Simran Kaur',
        speciality: 'HIIT & Functional Fitness',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      },
      {
        id: 'tr-3',
        name: 'Gaurav Sharma',
        speciality: 'Weight Loss & Rehab',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      },
      {
        id: 'tr-4',
        name: 'Amanpreet Cheema',
        speciality: 'Powerlifting Specialist',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      },
    ],
    plans: [
      {
        id: 'plan-iron-monthly',
        name: 'Monthly',
        durationDays: 30,
        price: 1000,
        chip: null,
        features: [
          'Full access to gym & cardio zone',
          'Free locker & shower facilities',
        ],
      },
      {
        id: 'plan-iron-quarterly',
        name: 'Quarterly',
        durationDays: 90,
        price: 2700,
        chip: { text: 'Save ₹300', color: 'green' },
        features: [
          'Full access to gym & cardio zone',
          'Free fitness assessment & diet guide',
        ],
      },
      {
        id: 'plan-iron-halfyearly',
        name: 'Half-yearly',
        durationDays: 180,
        price: 4800,
        chip: null,
        features: [
          'Full access + CrossFit zone',
          '2 complimentary personal training sessions',
        ],
      },
      {
        id: 'plan-iron-yearly',
        name: 'Yearly',
        durationDays: 365,
        price: 8400,
        chip: { text: 'Best value', color: 'blue' },
        features: [
          'Unrestricted access to all zones',
          'Free guest passes + steam room access',
        ],
      },
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Jaswinder Sandhu',
        rating: 5,
        date: '2 days ago',
        text: 'The best gym in Model Town without a doubt. Clean barbells, high-ceiling ventilation, and courteous trainers who genuinely help with form.',
      },
      {
        id: 'r2',
        author: 'Pooja Verma',
        rating: 5,
        date: '1 week ago',
        text: 'Clean steam rooms and zero wait time on squat racks in the morning. Buying the monthly pass through GymApp was instant and hassle-free.',
      },
      {
        id: 'r3',
        author: 'Manik Malhotra',
        rating: 4,
        date: '2 weeks ago',
        text: 'Great energy and music. The CrossFit zone on the 2nd floor is top notch. Plenty of parking near Gol Market.',
      },
    ],
  },
  {
    id: 'cult-fit-sarabha',
    name: 'Cult.Fit Sarabha Nagar',
    locality: 'Sarabha Nagar',
    localityId: 'sarabha-nagar',
    address: 'Kipps Market, Main Road, Sarabha Nagar, Ludhiana, Punjab 141001',
    phone: '+919876543211',
    distance: '2.5 km',
    distanceNum: 2.5,
    lat: 30.8920,
    lng: 75.8210,
    rating: 4.9,
    reviewsCount: 218,
    openUntil: '10:00 PM',
    minPrice: 1200,
    isFeatured: true,
    acceptsOnlineJoining: true,
    verified: true,
    coverPhoto: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    ],
    videoThumbnails: [
      { id: 'v21', title: 'Cult Group Classes', duration: '1:30', thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { id: 'v22', title: 'Boxing Conditioning', duration: '2:00', thumbnail: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4' },
      { id: 'v23', title: 'Core & Mobility', duration: '1:10', thumbnail: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
    ],
    about: 'Cult.Fit Sarabha Nagar combines athlete-guided group workouts, strength training, and restorative yoga in a premium, ultra-hygienic setting right at Kipps Market.',
    facilities: [
      { id: 'ac', name: 'Air Conditioning', icon: 'Wind' },
      { id: 'parking', name: 'Parking Available', icon: 'Car' },
      { id: 'lockers', name: 'Lockers', icon: 'Lock' },
      { id: 'showers', name: 'Hot Showers', icon: 'ShowerHead' },
      { id: 'cardio', name: 'Cardio Deck', icon: 'Activity' },
      { id: 'weights', name: 'Free Weights', icon: 'Dumbbell' },
    ],
    timings: {
      weekday: 'Mon - Sat: 5:00 AM to 10:00 PM',
      weekend: 'Sunday: 6:00 AM to 12:00 PM',
    },
    trainers: [
      { id: 'tr-21', name: 'Karanvir Bains', speciality: 'Functional Group Fitness', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80' },
      { id: 'tr-22', name: 'Mehak Dhillon', speciality: 'Yoga & Pilates', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80' },
    ],
    plans: [
      { id: 'plan-cult-monthly', name: 'Monthly', durationDays: 30, price: 1200, chip: null, features: ['Unlimited Cult classes', 'Smart locker access'] },
      { id: 'plan-cult-quarterly', name: 'Quarterly', durationDays: 90, price: 3200, chip: { text: 'Save ₹400', color: 'green' }, features: ['Unlimited Cult classes', 'Free body composition analysis'] },
      { id: 'plan-cult-halfyearly', name: 'Half-yearly', durationDays: 180, price: 5900, chip: null, features: ['All class formats included', '2 pause weeks available'] },
      { id: 'plan-cult-yearly', name: 'Yearly', durationDays: 365, price: 9900, chip: { text: 'Best value', color: 'blue' }, features: ['365 days unlimited all access', 'Free Cult sports kit'] },
    ],
    reviews: [
      { id: 'r21', author: 'Navdeep Gill', rating: 5, date: '3 days ago', text: 'Top tier facility. Group workouts keep motivation super high.' },
      { id: 'r22', author: 'Rahul Talwar', rating: 5, date: '1 week ago', text: 'Very modern equipment and welcoming vibe.' },
      { id: 'r23', author: 'Esha Arora', rating: 4, date: '3 weeks ago', text: 'Loved the HRX workouts. Parking gets busy around 7 PM.' },
    ],
  },
  {
    id: 'gold-standard-brs',
    name: 'Gold Standard Gym & Spa',
    locality: 'BRS Nagar',
    localityId: 'brs-nagar',
    address: 'Near Sun-View Enclave, BRS Nagar Main Road, Ludhiana, Punjab 141012',
    phone: '+919876543212',
    distance: '3.8 km',
    distanceNum: 3.8,
    lat: 30.8872,
    lng: 75.8015,
    rating: 4.7,
    reviewsCount: 96,
    openUntil: '10:00 PM',
    minPrice: 1000,
    isFeatured: false,
    acceptsOnlineJoining: true,
    verified: true,
    coverPhoto: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    ],
    videoThumbnails: [
      { id: 'v31', title: 'Spa & Sauna Tour', duration: '1:20', thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { id: 'v32', title: 'Heavy Dumbbell Section', duration: '1:40', thumbnail: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4' },
      { id: 'v33', title: 'Cardio Deck Preview', duration: '0:55', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
    ],
    about: 'Spacious fitness club featuring specialized bodybuilding equipment, personal training suites, and luxury steam and sauna amenities in BRS Nagar.',
    facilities: [
      { id: 'ac', name: 'Air Conditioning', icon: 'Wind' },
      { id: 'parking', name: 'Reserved Parking', icon: 'Car' },
      { id: 'lockers', name: 'Digital Lockers', icon: 'Lock' },
      { id: 'showers', name: 'Steam & Shower', icon: 'ShowerHead' },
      { id: 'cardio', name: 'Cardio Zone', icon: 'Activity' },
      { id: 'weights', name: 'Free Weights', icon: 'Dumbbell' },
    ],
    timings: {
      weekday: 'Mon - Sat: 5:00 AM to 10:00 PM',
      weekend: 'Sunday: 6:00 AM to 12:00 PM',
    },
    trainers: [
      { id: 'tr-31', name: 'Jagjit Johal', speciality: 'Bodybuilding & Hypertrophy', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80' },
    ],
    plans: [
      { id: 'plan-gold-monthly', name: 'Monthly', durationDays: 30, price: 1000, chip: null, features: ['Access to gym floor', 'Locker & shower facilities'] },
      { id: 'plan-gold-quarterly', name: 'Quarterly', durationDays: 90, price: 2700, chip: { text: 'Save ₹300', color: 'green' }, features: ['Access to gym & spa', 'Free initial nutrition consult'] },
      { id: 'plan-gold-halfyearly', name: 'Half-yearly', durationDays: 180, price: 4800, chip: null, features: ['Steam bath weekly access', '1 free personal training session'] },
      { id: 'plan-gold-yearly', name: 'Yearly', durationDays: 365, price: 8400, chip: { text: 'Best value', color: 'blue' }, features: ['Full club privileges all year', 'Unlimited steam & sauna'] },
    ],
    reviews: [
      { id: 'r31', author: 'Baldev Singh', rating: 5, date: '4 days ago', text: 'Clean and spacious. Friendly staff and good machines.' },
      { id: 'r32', author: 'Tarun Mehra', rating: 4, date: '1 week ago', text: 'Good gym, steam bath is very clean.' },
      { id: 'r33', author: 'Raman Grewal', rating: 5, date: '2 weeks ago', text: 'Best gym in BRS Nagar. Worth the price.' },
    ],
  },
  {
    id: 'titan-strength-pakhowal',
    name: 'Titan Strength Club',
    locality: 'Pakhowal Road',
    localityId: 'pakhowal-road',
    address: 'Basement & Ground Floor, Phullanwal Chowk, Pakhowal Road, Ludhiana, Punjab 141013',
    phone: '+919876543213',
    distance: '4.1 km',
    distanceNum: 4.1,
    lat: 30.8711,
    lng: 75.8198,
    rating: 4.6,
    reviewsCount: 78,
    openUntil: '10:00 PM',
    minPrice: 1000,
    isFeatured: false,
    acceptsOnlineJoining: true,
    verified: true,
    coverPhoto: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    ],
    videoThumbnails: [
      { id: 'v41', title: 'Heavy Deadlift Platform', duration: '1:10', thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { id: 'v42', title: 'Calisthenics & Rig Tour', duration: '1:50', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4' },
      { id: 'v43', title: 'Warmup & Mobility Corner', duration: '0:45', thumbnail: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
    ],
    about: 'Dedicated strength, powerlifting and functional fitness box equipped with calibrated competition plates, deadlift platforms, and experienced strength coaches.',
    facilities: [
      { id: 'ac', name: 'Air Conditioning', icon: 'Wind' },
      { id: 'parking', name: 'Ample Parking', icon: 'Car' },
      { id: 'lockers', name: 'Lockers', icon: 'Lock' },
      { id: 'showers', name: 'Showers', icon: 'ShowerHead' },
      { id: 'cardio', name: 'Rowers & Air Bikes', icon: 'Activity' },
      { id: 'weights', name: 'Competition Free Weights', icon: 'Dumbbell' },
    ],
    timings: {
      weekday: 'Mon - Sat: 5:00 AM to 10:00 PM',
      weekend: 'Sunday: 6:00 AM to 12:00 PM',
    },
    trainers: [
      { id: 'tr-41', name: 'Manpreet Deol', speciality: 'Powerlifting Coach', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80' },
    ],
    plans: [
      { id: 'plan-titan-monthly', name: 'Monthly', durationDays: 30, price: 1000, chip: null, features: ['Full platform access', 'Locker access'] },
      { id: 'plan-titan-quarterly', name: 'Quarterly', durationDays: 90, price: 2700, chip: { text: 'Save ₹300', color: 'green' }, features: ['Full platform access', 'Technique review session'] },
      { id: 'plan-titan-halfyearly', name: 'Half-yearly', durationDays: 180, price: 4800, chip: null, features: ['Strength programming assist', 'Free chalk & belt usage'] },
      { id: 'plan-titan-yearly', name: 'Yearly', durationDays: 365, price: 8400, chip: { text: 'Best value', color: 'blue' }, features: ['Yearly unlimited access', 'Exclusive club tee'] },
    ],
    reviews: [
      { id: 'r41', author: 'Amrik Singh', rating: 5, date: '1 week ago', text: 'Best deadlift bars in town. Chalk allowed!' },
      { id: 'r42', author: 'Sartaj Gill', rating: 4, date: '2 weeks ago', text: 'Hardcore gym environment, very serious lifters.' },
      { id: 'r43', author: 'Deepak Jain', rating: 5, date: '1 month ago', text: 'Loved the energy. Coaches know their biomechanics.' },
    ],
  },
  {
    id: 'legacy-fitness-civil-lines',
    name: 'Legacy Fitness & Gym',
    locality: 'Civil Lines',
    localityId: 'civil-lines',
    address: 'Old Session Chowk, Near Club Road, Civil Lines, Ludhiana, Punjab 141001',
    phone: '+919876543214',
    distance: '5.2 km',
    distanceNum: 5.2,
    lat: 30.9080,
    lng: 75.8450,
    rating: 4.5,
    reviewsCount: 64,
    openUntil: '10:00 PM',
    minPrice: 1000,
    isFeatured: false,
    // SPEC REQUIREMENT: Variant where gym is not accepting online joining yet
    acceptsOnlineJoining: false,
    verified: true,
    coverPhoto: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    ],
    videoThumbnails: [
      { id: 'v51', title: 'Club Overview', duration: '1:00', thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { id: 'v52', title: 'Trainer Introduction', duration: '1:30', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4' },
      { id: 'v53', title: 'Cardio Room', duration: '0:50', thumbnail: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
    ],
    about: 'One of the oldest fitness institutions in Civil Lines Ludhiana, boasting classic iron weights, experienced trainers, and a loyal community.',
    facilities: [
      { id: 'ac', name: 'Air Conditioning', icon: 'Wind' },
      { id: 'parking', name: 'Parking', icon: 'Car' },
      { id: 'lockers', name: 'Lockers', icon: 'Lock' },
      { id: 'showers', name: 'Showers', icon: 'ShowerHead' },
      { id: 'cardio', name: 'Cardio Area', icon: 'Activity' },
      { id: 'weights', name: 'Free Weights', icon: 'Dumbbell' },
    ],
    timings: {
      weekday: 'Mon - Sat: 5:00 AM to 10:00 PM',
      weekend: 'Sunday: 6:00 AM to 12:00 PM',
    },
    trainers: [
      { id: 'tr-51', name: 'Virender Pathak', speciality: 'Classic Bodybuilding', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80' },
    ],
    plans: [
      { id: 'plan-legacy-monthly', name: 'Monthly', durationDays: 30, price: 1000, chip: null, features: ['Access to all floors', 'Locker availability'] },
      { id: 'plan-legacy-quarterly', name: 'Quarterly', durationDays: 90, price: 2700, chip: { text: 'Save ₹300', color: 'green' }, features: ['Access to all floors', 'Diet guide included'] },
      { id: 'plan-legacy-halfyearly', name: 'Half-yearly', durationDays: 180, price: 4800, chip: null, features: ['Locker + shower perks', '1 PT intro session'] },
      { id: 'plan-legacy-yearly', name: 'Yearly', durationDays: 365, price: 8400, chip: { text: 'Best value', color: 'blue' }, features: ['365 days full access', '2 guest passes per month'] },
    ],
    reviews: [
      { id: 'r51', author: 'Sukhman Brar', rating: 5, date: '2 days ago', text: 'Old school feel with modern hygiene. Very respectful members.' },
      { id: 'r52', author: 'Kabir Thapar', rating: 4, date: '1 week ago', text: 'Classic gym with heavy dumbbells.' },
      { id: 'r53', author: 'Ravi Sood', rating: 4, date: '3 weeks ago', text: 'Great for focused workouts without unnecessary noise.' },
    ],
  },
  {
    id: 'urban-flex-dugri',
    name: 'Urban Flex Fitness Studio',
    locality: 'Dugri',
    localityId: 'dugri',
    address: 'Phase 1, Dugri Main Market, Ludhiana, Punjab 141013',
    phone: '+919876543215',
    distance: '4.5 km',
    distanceNum: 4.5,
    lat: 30.8654,
    lng: 75.8420,
    rating: 4.7,
    reviewsCount: 88,
    openUntil: '10:00 PM',
    minPrice: 1000,
    isFeatured: false,
    acceptsOnlineJoining: true,
    verified: true,
    coverPhoto: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1200&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
    ],
    videoThumbnails: [
      { id: 'v61', title: 'Studio Walkthrough', duration: '1:15', thumbnail: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { id: 'v62', title: 'Kettlebell & Functional Area', duration: '1:45', thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4' },
      { id: 'v63', title: 'Cardio Deck & View', duration: '0:50', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
    ],
    about: 'Vibrant boutique studio in Dugri specializing in high-intensity circuit training, modern cardio machines, and functional strength conditioning.',
    facilities: [
      { id: 'ac', name: 'Air Conditioning', icon: 'Wind' },
      { id: 'parking', name: 'Parking', icon: 'Car' },
      { id: 'lockers', name: 'Lockers', icon: 'Lock' },
      { id: 'showers', name: 'Hot Showers', icon: 'ShowerHead' },
      { id: 'cardio', name: 'Cardio Zone', icon: 'Activity' },
      { id: 'weights', name: 'Free Weights', icon: 'Dumbbell' },
    ],
    timings: {
      weekday: 'Mon - Sat: 5:00 AM to 10:00 PM',
      weekend: 'Sunday: 6:00 AM to 12:00 PM',
    },
    trainers: [
      { id: 'tr-61', name: 'Gurpreet Ghuman', speciality: 'Functional Aerobics & HIIT', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80' },
    ],
    plans: [
      { id: 'plan-urban-monthly', name: 'Monthly', durationDays: 30, price: 1000, chip: null, features: ['Unlimited studio sessions', 'Locker access'] },
      { id: 'plan-urban-quarterly', name: 'Quarterly', durationDays: 90, price: 2700, chip: { text: 'Save ₹300', color: 'green' }, features: ['Unlimited studio sessions', 'Free body fat measurement'] },
      { id: 'plan-urban-halfyearly', name: 'Half-yearly', durationDays: 180, price: 4800, chip: null, features: ['All-access studio card', '1 free guest pass per month'] },
      { id: 'plan-urban-yearly', name: 'Yearly', durationDays: 365, price: 8400, chip: { text: 'Best value', color: 'blue' }, features: ['365 days unlimited classes', 'Free fitness tracking app access'] },
    ],
    reviews: [
      { id: 'r61', author: 'Simrat Khurana', rating: 5, date: '3 days ago', text: 'Loved the energy! Studio music is energetic and trainers motivate you through every set.' },
      { id: 'r62', author: 'Inderjeet Chadha', rating: 4, date: '1 week ago', text: 'Convenient location in Dugri Phase 1.' },
      { id: 'r63', author: 'Priya Narang', rating: 5, date: '2 weeks ago', text: 'Clean changing rooms and brand new treadmills.' },
    ],
  },
]

