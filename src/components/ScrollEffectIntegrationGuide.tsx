/**
 * SCROLL EFFECT INTEGRATION GUIDE
 * 
 * This file demonstrates how to integrate the ScrollEffect component
 * into your existing pages. You have flexibility in how to use it.
 */

import { ScrollEffectWrapper, ScrollEffectSection } from "@/components/ScrollEffect";

/**
 * PATTERN 1: Add scroll sections to existing pages
 * 
 * This is the recommended approach. Add ScrollEffectWrapper at the top level
 * and insert ScrollEffectSection where you want the effects.
 */

export const IntegrationPattern1 = () => {
  // Your existing page content
  const existingContent = <div>{/* Your hero, services, etc */}</div>;

  // Add scroll effect sections between existing sections
  return (
    <ScrollEffectWrapper>
      {/* Existing page content */}
      {existingContent}

      {/* NEW: Add scroll effect section */}
      <ScrollEffectSection
        content={["Explore", "Our", "Services"]}
        variant="v1" // text animation
        title="Premium Solutions"
        subtitle="Discover what we offer"
        backgroundColor="bg-slate-900"
        textColor="text-white"
      />

      {/* More existing content or more scroll sections */}
    </ScrollEffectWrapper>
  );
};

/**
 * PATTERN 2: Use as standalone showcase page
 * 
 * Create dedicated pages that showcase the scroll effects
 */

export const IntegrationPattern2 = () => {
  const technologies = [
    "/tech/ai.png",
    "/tech/cloud.png",
    "/tech/security.png",
    "/tech/data.png",
    "/tech/automation.png",
  ];

  return (
    <ScrollEffectWrapper>
      <main className="w-full">
        {/* Section 1: Text animation with V1 variant */}
        <ScrollEffectSection
          content={["Transform", "Your", "Enterprise"]}
          variant="v1"
          backgroundColor="bg-gradient-to-b from-slate-900 to-slate-800"
          textColor="text-white"
        />

        {/* Section 2: Image animation with V2 variant (wave effect) */}
        <ScrollEffectSection
          content={technologies}
          variant="v2"
          isImageContent={true}
          title="Our Technology Stack"
          backgroundColor="bg-slate-50"
          textColor="text-slate-900"
        />

        {/* Section 3: Complex animation with V3 variant */}
        <ScrollEffectSection
          content={["Powered", "By", "Innovation"]}
          variant="v3"
          backgroundColor="bg-gradient-to-b from-violet-900 to-indigo-900"
          textColor="text-white"
        />
      </main>
    </ScrollEffectWrapper>
  );
};

/**
 * ANIMATION VARIANTS EXPLAINED:
 * 
 * V1 - Text Spread (Best for: headlines, titles)
 *      Characters spread horizontally with 3D rotation
 *      - Static text looks cleaner
 *      - High impact on scroll
 * 
 * V2 - Wave Up (Best for: icons, images, tech stack)
 *      Characters wave upward with scale effect
 *      - Great for product images or icons
 *      - Creates fountain/wave effect
 * 
 * V3 - Spinning Wave (Best for: dramatic sections, feature showcases)
 *      Characters spin and wave with maximum distance spread
 *      - Most complex and dynamic
 *      - Best for premium/flagship sections
 */

/**
 * INTEGRATION EXAMPLES BY PAGE:
 */

// ============================================
// EXAMPLE 1: Home Page Integration
// ============================================
export const HomePageExample = () => {
  return (
    <ScrollEffectWrapper>
      {/* Existing hero section - unchanged */}
      {/* <ExistingHeroSection /> */}

      {/* NEW: Add scroll effect between sections */}
      <ScrollEffectSection
        content={["Enterprise", "Grade", "Solutions"]}
        variant="v1"
        title="Why Choose AGZUS"
        backgroundColor="bg-slate-900"
        textColor="text-white"
        containerClassName="-mt-32" // Adjust to overlap if desired
      />

      {/* Continue with existing services section */}
      {/* <ServicesSection /> */}
    </ScrollEffectWrapper>
  );
};

// ============================================
// EXAMPLE 2: Services Page Integration
// ============================================
export const ServicesPageExample = () => {
  const serviceIcons = [
    "/services/ai.png",
    "/services/cloud.png",
    "/services/security.png",
  ];

  return (
    <ScrollEffectWrapper>
      {/* Hero section */}
      {/* <ExistingServicesHero /> */}

      {/* NEW: Scroll effect showcase of services */}
      <ScrollEffectSection
        content={serviceIcons}
        variant="v2"
        isImageContent={true}
        title="Our Expertise"
        backgroundColor="bg-slate-50"
        containerClassName="-mt-20"
      />

      {/* Service details */}
      {/* <ServiceDetails /> */}
    </ScrollEffectWrapper>
  );
};

// ============================================
// EXAMPLE 3: Portfolio/Work Page Integration
// ============================================
export const PortfolioPageExample = () => {
  return (
    <ScrollEffectWrapper>
      {/* Featured projects */}
      {/* <FeaturedProjects /> */}

      {/* NEW: Dynamic section */}
      <ScrollEffectSection
        content={["Transforming", "Industries", "Globally"]}
        variant="v3"
        title="Our Impact"
        subtitle="250+ successful deployments"
        backgroundColor="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900"
        textColor="text-white"
        containerClassName="-mt-24"
      />

      {/* Case studies */}
      {/* <CaseStudies /> */}
    </ScrollEffectWrapper>
  );
};

/**
 * CUSTOMIZATION OPTIONS:
 * 
 * ScrollEffectSection Props:
 * - content: string[] - Array of text or image paths
 * - variant: "v1" | "v2" | "v3" - Animation style
 * - title?: string - Optional section title
 * - subtitle?: string - Optional subtitle
 * - height?: string - Default: "h-[210vh]" (Tailwind height class)
 * - backgroundColor?: string - Tailwind bg class
 * - textColor?: string - Tailwind text color class
 * - isImageContent?: boolean - Set to true for images
 * - textClassName?: string - Customize text styling
 * - containerClassName?: string - Customize container
 */

/**
 * PERFORMANCE TIPS:
 * 
 * 1. Use images that are already optimized (compress them first)
 * 2. Don't use too many scroll sections on one page (2-3 is ideal)
 * 3. The default height of 210vh creates a good scroll range
 * 4. For mobile, consider wrapping in responsive conditions
 * 5. Test in production mode (next build && next start) for true performance
 */

/**
 * STYLING TIPS:
 * 
 * 1. Match the background colors to your page theme
 * 2. Use contrasting text colors for readability
 * 3. Negative margin classes (containerClassName="-mt-24") create overlap
 * 4. Gradient backgrounds work great: "bg-gradient-to-b from-slate-900 to-slate-800"
 * 5. Make sections feel like natural transitions between content
 */
