# Gym Detail Page Architecture (Cult.Fit Sarabha Nagar & Multi-Gym)

A production-grade, consumer-facing gym detail experience built with **Vite, React 19, TypeScript, Tailwind CSS, Framer Motion, and Zustand**.

---

## 1. Folder Structure

```
src/features/gym-detail/
├── api/
│   └── gymApi.ts                  # Mock data layer & API contract for gyms, trainers & reviews
├── components/
│   ├── GymAboutSection.tsx        # Overview with expandable copy & 4 highlight USPs
│   ├── GymDetailSkeleton.tsx      # Multi-section shimmer loader matching desktop & mobile layouts
│   ├── GymFacilitiesSection.tsx   # Categorized grid (Amenities, Equipment, Services) with availability states
│   ├── GymFaqSection.tsx          # Keyboard-accessible accordion for membership policies
│   ├── GymHeaderBlock.tsx         # Title, verified badge, rating scroll trigger, live status, actions
│   ├── GymHeroGallery.tsx         # Bento-grid on desktop, touch carousel on mobile, video tab & lightbox
│   ├── GymLocationSection.tsx     # Leaflet map preview, address copy, distance & parking context
│   ├── GymMobilePlanSheet.tsx     # Animated bottom sheet for mobile plan selection & checkout
│   ├── GymMobileStickyBar.tsx     # Mobile sticky anchor ("From ₹27/day · Choose plan")
│   ├── GymPricingCard.tsx         # Sticky desktop card (zero clipping, segmented duration tabs, per-day cost)
│   ├── GymReviewsSection.tsx      # 5-star distribution bar breakdown, verified tags, filters
│   ├── GymSectionNav.tsx          # Sticky scroll-spy navigation with animated Framer Motion underline
│   ├── GymSimilarSection.tsx      # Nearby gym discovery cards
│   ├── GymTimingsSection.tsx      # Day-by-day timetable with today indicator & live status
│   ├── GymTopBar.tsx              # Breadcrumbs, light/dark theme toggle, save/favorite, share
│   └── TrainerModal.tsx           # Modal presenting trainer certifications, bio & track record
├── store/
│   └── gymDetailStore.ts          # Zustand store synchronizing plan selection, sheets, lightbox & theme
├── types/
│   └── index.ts                   # Strict TypeScript contracts (Gym, Plan, Trainer, Facility, Review)
├── utils/
│   ├── pricing.ts                 # formatINR, calculatePerDay, calculateSavings, getLiveOpenStatus
│   └── __tests__/
│       └── pricing.test.ts        # Vitest test suite covering financial calculations & schedule parser
├── GymDetailPage.tsx              # Main orchestrator with SEO JSON-LD schema & error boundaries
└── README.md
```

---

## 2. Key Design Decisions

1. **Zero-Clipping Sticky Booking Card (Desktop):**
   - Previous versions stacked 4 large cards vertically, causing the Yearly tier and the primary CTA to get clipped below the fold on screens under 900px height.
   - We engineered a **segmented duration selector** paired with a hero pricing card. Users can toggle between 30d, 90d, 180d, and 365d in a single click without page displacement.
   - The primary CTA ("Continue · ₹X,XXX") and trust row are permanently pinned within the card and always visible.

2. **Per-Day and Effective Monthly Anchoring:**
   - To drive conversion, prices are broken down into daily equivalents (e.g. Yearly ₹9,900 → **₹27/day** vs Monthly ₹1,200 → **₹40/day**).
   - "Save ₹4,500" and "Best Value" visual chips highlight the ROI of longer commitments.

3. **Unified Media Gallery (Photos + Video Walkthroughs):**
   - Replaced competing image and video sections with a single, harmonious hero gallery:
     - **Desktop:** Bento-grid (1 hero + 4 thumb tiles with "+N More" counter).
     - **Mobile:** Touch carousel with indicator dots.
     - **Videos Tab:** Embedded HTML5 player with 3 quick-switch video walkthroughs.
     - **Fullscreen Lightbox:** Fullscreen image modal supporting keyboard arrows (`←`, `→`), and `Esc` key dismissal.

4. **Live Operating Hours Engine:**
   - Timings are parsed dynamically against the user's current clock time, outputting real-time status chips such as `"Open now · closes at 10:00 PM"` or `"Closing soon · in 35m"` with animated pulse dots.

5. **Cross-Device State Synchronization via Zustand:**
   - Plan selection stays in 100% sync whether chosen on the desktop sticky card or inside the mobile bottom sheet.

6. **SEO & Structured Data:**
   - Automatic injection of `HealthClub` JSON-LD metadata for Google rich search results.

---

## 3. How to Connect a Real Backend / API

In `src/features/gym-detail/api/gymApi.ts`, replace the mock resolver with your API client (e.g. `fetch` or `axios`):

```typescript
export async function fetchGymDetail(id: string): Promise<Gym> {
  const response = await fetch(`/api/v1/gyms/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Failed to load gym details (${response.status})`)
  }

  const data = await response.json()
  return data
}
```
All UI components strictly adhere to the typed `Gym` model in `src/features/gym-detail/types/index.ts`. No UI component refactoring is required when switching to production endpoints.

