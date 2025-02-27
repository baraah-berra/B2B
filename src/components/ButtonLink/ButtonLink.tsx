import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// Define interfaces for TypeScript
interface HotspotPosition {
  x: number;
  y: number;
  color: string;
  icon: string;
}

interface Positions {
  [key: string]: HotspotPosition;
}

interface TranslationCategories {
  protection: string;
  tires: string;
  accessories: string;
  polishing: string;
}

interface TranslationAriaLabels {
  car: string;
  hotspot: string;
}

interface TranslationUI {
  tooltipLabel: string;
}

interface LanguageTranslation {
  categories: TranslationCategories;
  ariaLabels: TranslationAriaLabels;
  ui: TranslationUI;
}

interface Translations {
  en: LanguageTranslation;
  ar: LanguageTranslation;
}

interface InteractiveCarProps {
  initialLanguage?: 'en' | 'ar';
  customPositions?: Positions;
  width?: number;
  height?: number;
  carColor?: string;
  onCategorySelect?: (category: string) => void;
  productsListId?: string;
}

// Define translations
const translations: Translations = {
  en: {
    categories: {
      protection: "Protection Films & Tinting",
      tires: "Car Tires",
      accessories: "Car Accessories",
      polishing: "Polishing Materials"
    },
    ariaLabels: {
      car: "Interactive 3D SUV with clickable category hotspots",
      hotspot: "Click to filter products by"
    },
    ui: {
      tooltipLabel: "Select category"
    }
  },
  ar: {
    categories: {
      protection: "أفلام حماية و تظليل",
      tires: "إطارات السيارات",
      accessories: "إكسسوارات السيارات",
      polishing: "مواد التلميع"
    },
    ariaLabels: {
      car: "سيارة دفع رباعي ثلاثية الأبعاد تفاعلية مع نقاط فئات قابلة للنقر",
      hotspot: "انقر لتصفية المنتجات حسب"
    },
    ui: {
      tooltipLabel: "اختر الفئة"
    }
  }
};

// Default category positions with improved visual cues - scaled up by 100%
const defaultPositions: Positions = {
  protection: {
    x: 1900, // 950 * 2
    y: 500,  // 250 * 2
    color: "#E67E22",
    icon: "🛡️"
  },
  tires: {
    x: 600,  // 300 * 2
    y: 840,  // 420 * 2
    color: "#3498DB",
    icon: "🛞"
  },
  accessories: {
    x: 1200, // 600 * 2
    y: 300,  // 150 * 2
    color: "#27AE60",
    icon: "🔧"
  },
  polishing: {
    x: 1200, // 600 * 2
    y: 640,  // 420 * 2
    color: "#8E44AD",
    icon: "✨"
  }
};

// The enhanced InteractiveCar component
const InteractiveCar: React.FC<InteractiveCarProps> = ({
  initialLanguage = 'ar',
  customPositions,
  width = 2400, // Increased from 1200 by 100%
  height = 1200, // Increased from 600 by 100%
  carColor = "#2C3E50",
  onCategorySelect,
  productsListId = "products-list"
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [language, setLanguage] = useState<'en' | 'ar'>(initialLanguage);
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);
  const [positions, setPositions] = useState<Positions>(customPositions || defaultPositions);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Current translation objects
  const t = translations[language];
  
  // Set initial document direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  
  // Check for user's motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReducedMotion);
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Handle category selection
  const handleFilter = useCallback((categoryKey: string) => {
    const category = t.categories[categoryKey as keyof TranslationCategories];
    
    // Update search parameters
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("category", category);
    setSearchParams(newSearchParams);
    
    // Call the provided callback
    if (onCategorySelect) {
      onCategorySelect(category);
    }
    
    // Smooth scroll to products list (respecting user preferences)
    try {
      const productsList = document.getElementById(productsListId);
      if (productsList) {
        productsList.scrollIntoView({ 
          behavior: reducedMotion ? "auto" : "smooth" 
        });
      } else {
        window.scrollTo({ 
          top: window.innerHeight, 
          behavior: reducedMotion ? "auto" : "smooth" 
        });
      }
    } catch (e) {
      // Fallback for older browsers
      window.scrollTo(0, window.innerHeight);
    }
  }, [searchParams, setSearchParams, t, onCategorySelect, productsListId, reducedMotion]);

  // Check if a category is selected
  const isSelected = useCallback((categoryKey: string) => {
    const category = t.categories[categoryKey as keyof TranslationCategories];
    return searchParams.get("category") === category;
  }, [searchParams, t.categories]);

  // Generate wheel spokes for more realistic wheels - scaled up by 100%
  const renderWheelSpokes = useMemo(() => {
    return {
      leftWheel: Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        return (
          React.createElement('line', {
            key: `spoke-left-${i}`,
            x1: 600 + 50 * Math.cos(angle), // 300 * 2, 25 * 2
            y1: 840 + 50 * Math.sin(angle), // 420 * 2, 25 * 2
            x2: 600 + 130 * Math.cos(angle), // 300 * 2, 65 * 2
            y2: 840 + 130 * Math.sin(angle), // 420 * 2, 65 * 2
            stroke: "#777",
            strokeWidth: "8" // Increased from 4
          })
        );
      }),
      rightWheel: Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        return (
          React.createElement('line', {
            key: `spoke-right-${i}`,
            x1: 1800 + 50 * Math.cos(angle), // 900 * 2, 25 * 2
            y1: 840 + 50 * Math.sin(angle),  // 420 * 2, 25 * 2
            x2: 1800 + 130 * Math.cos(angle), // 900 * 2, 65 * 2
            y2: 840 + 130 * Math.sin(angle),  // 420 * 2, 65 * 2
            stroke: "#777",
            strokeWidth: "8" // Increased from 4
          })
        );
      })
    };
  }, []);

  // Darker color for selected states
  const getDarkerColor = (color: string): string => {
    // Simple way to darken hex colors
    return color.replace(/[0-9a-f]/gi, 
      char => {
        const num = parseInt(char, 16);
        return Math.max(0, num - 3).toString(16);
      }
    );
  };

  // SVG gradient definitions
  const renderGradients = useMemo(() => (
    React.createElement('defs', {}, [
      /* Car body gradient */
      React.createElement('linearGradient', { 
        id: "carBodyGradient", 
        x1: "0%", 
        y1: "0%", 
        x2: "100%", 
        y2: "100%",
        key: "gradient-1"
      }, [
        React.createElement('stop', { offset: "0%", stopColor: carColor, key: "stop-1" }),
        React.createElement('stop', { offset: "50%", stopColor: getDarkerColor(carColor), key: "stop-2" }),
        React.createElement('stop', { offset: "100%", stopColor: getDarkerColor(getDarkerColor(carColor)), key: "stop-3" })
      ]),
      
      /* Glass gradient with reflections */
      React.createElement('linearGradient', { 
        id: "glassGradient", 
        x1: "0%", 
        y1: "0%", 
        x2: "100%", 
        y2: "100%",
        key: "gradient-2" 
      }, [
        React.createElement('stop', { offset: "0%", stopColor: "#D6EAF8", key: "stop-4" }),
        React.createElement('stop', { offset: "40%", stopColor: "#85C1E9", key: "stop-5" }),
        React.createElement('stop', { offset: "100%", stopColor: "#3498DB", key: "stop-6" })
      ]),
      
      /* Metallic effect */
      React.createElement('linearGradient', { 
        id: "metallicEffect", 
        x1: "0%", 
        y1: "0%", 
        x2: "100%", 
        y2: "0%",
        key: "gradient-3"
      }, [
        React.createElement('stop', { offset: "0%", stopColor: "#777", stopOpacity: "0.3", key: "stop-7" }),
        React.createElement('stop', { offset: "50%", stopColor: "#FFF", stopOpacity: "0.8", key: "stop-8" }),
        React.createElement('stop', { offset: "100%", stopColor: "#777", stopOpacity: "0.3", key: "stop-9" })
      ]),
      
      /* Headlight gradient */
      React.createElement('radialGradient', { 
        id: "headlightGradient", 
        cx: "50%", 
        cy: "50%", 
        r: "50%", 
        fx: "50%", 
        fy: "50%",
        key: "gradient-4"
      }, [
        React.createElement('stop', { offset: "0%", stopColor: "#FFFDE7", key: "stop-10" }),
        React.createElement('stop', { offset: "70%", stopColor: "#FFF59D", key: "stop-11" }),
        React.createElement('stop', { offset: "100%", stopColor: "#FBC02D", key: "stop-12" })
      ]),
      
      /* Taillight gradient */
      React.createElement('radialGradient', { 
        id: "taillightGradient", 
        cx: "50%", 
        cy: "50%", 
        r: "50%", 
        fx: "50%", 
        fy: "50%",
        key: "gradient-5"
      }, [
        React.createElement('stop', { offset: "0%", stopColor: "#FFEBEE", key: "stop-13" }),
        React.createElement('stop', { offset: "70%", stopColor: "#EF9A9A", key: "stop-14" }),
        React.createElement('stop', { offset: "100%", stopColor: "#C62828", key: "stop-15" })
      ]),
      
      /* Car shadow effect */
      React.createElement('filter', { 
        id: "carShadow", 
        x: "-20%", 
        y: "-20%", 
        width: "140%", 
        height: "140%",
        key: "filter-1"
      }, [
        React.createElement('feGaussianBlur', { in: "SourceAlpha", stdDeviation: "20", key: "blur-1" }), // Increased from 15
        React.createElement('feOffset', { dx: "0", dy: "13", result: "offsetblur", key: "offset-1" }), // Increased from 10
        React.createElement('feComponentTransfer', { key: "component-1" }, [
          React.createElement('feFuncA', { type: "linear", slope: "0.5", key: "func-1" })
        ]),
        React.createElement('feMerge', { key: "merge-1" }, [
          React.createElement('feMergeNode', { key: "node-1" }),
          React.createElement('feMergeNode', { in: "SourceGraphic", key: "node-2" })
        ])
      ]),
      
      /* Glow effect for selected hotspots */
      React.createElement('filter', { 
        id: "glow", 
        x: "-50%", 
        y: "-50%", 
        width: "200%", 
        height: "200%",
        key: "filter-2"
      }, [
        React.createElement('feGaussianBlur', { stdDeviation: "6.5", result: "blur", key: "blur-2" }), // Increased from 5
        React.createElement('feFlood', { floodColor: "#FFF", result: "glow", key: "flood-1" }),
        React.createElement('feComposite', { in: "glow", in2: "blur", operator: "in", result: "coloredBlur", key: "composite-1" }),
        React.createElement('feMerge', { key: "merge-2" }, [
          React.createElement('feMergeNode', { in: "coloredBlur", key: "node-3" }),
          React.createElement('feMergeNode', { in: "SourceGraphic", key: "node-4" })
        ])
      ]),
      
      /* Category hotspot gradients */
      ...Object.entries(positions).map(([key, position], idx) => (
        React.createElement('radialGradient', { 
          key: `${key}-gradient`,
          id: `${key}Gradient`, 
          cx: "50%", 
          cy: "50%", 
          r: "50%", 
          fx: "40%", 
          fy: "40%"
        }, [
          React.createElement('stop', { 
            offset: "0%", 
            stopColor: position.color, 
            stopOpacity: "0.9", 
            key: `hotspot-stop-${idx}-1` 
          }),
          React.createElement('stop', { 
            offset: "100%", 
            stopColor: getDarkerColor(position.color), 
            stopOpacity: "1", 
            key: `hotspot-stop-${idx}-2` 
          })
        ])
      )),
      
      /* Selected state gradients */
      ...Object.entries(positions).map(([key, position], idx) => (
        React.createElement('radialGradient', { 
          key: `${key}-selected-gradient`,
          id: `${key}SelectedGradient`, 
          cx: "50%", 
          cy: "50%", 
          r: "50%", 
          fx: "30%", 
          fy: "30%"
        }, [
          React.createElement('stop', { 
            offset: "0%", 
            stopColor: "#FFF", 
            stopOpacity: "0.9", 
            key: `selected-stop-${idx}-1` 
          }),
          React.createElement('stop', { 
            offset: "70%", 
            stopColor: position.color, 
            stopOpacity: "1", 
            key: `selected-stop-${idx}-2` 
          }),
          React.createElement('stop', { 
            offset: "100%", 
            stopColor: getDarkerColor(position.color), 
            stopOpacity: "1", 
            key: `selected-stop-${idx}-3` 
          })
        ])
      ))
    ])
  ), [carColor, positions, getDarkerColor]);

  return React.createElement('div', { 
    className: "relative w-full max-w-full mx-auto" // Changed to max-w-full to allow maximum size
  }, [
    /* SVG Car */
    React.createElement('svg', {
      viewBox: `0 0 ${width} ${height}`,
      className: "w-full h-auto car-svg", // Added car-svg class but will override it with inline style
      style: { width: '800px', height: '400px', minWidth: '600px' }, // Force larger size
      'aria-label': t.ariaLabels.car,
      role: "img",
      key: "svg"
    }, [
      /* Render all gradients and filters */
      renderGradients,
      
      /* Ground shadow */
      React.createElement('ellipse', {
        cx: "1200", // 600 * 2
        cy: "1000", // 500 * 2
        rx: "1100", // 550 * 2
        ry: "50", // 25 * 2
        fill: "#000",
        opacity: "0.2",
        key: "shadow"
      }),
      
      /* Car main group with shadow effect */
      React.createElement('g', {
        filter: "url(#carShadow)",
        key: "car-body"
      }, [
        /* Main body - modern SUV - scaled by 2x */
        React.createElement('path', {
          d: `M 440,740 
             L 360,740 
             C 320,740 280,720 240,680 
             C 200,640 180,600 180,580 
             L 180,640 
             C 180,680 200,700 240,740 
             L 280,740 
             L 280,840 
             L 2120,840 
             L 2120,740 
             L 2160,740 
             C 2200,740 2220,720 2240,680 
             C 2260,640 2260,600 2260,560 
             L 2260,580 
             C 2260,540 2240,500 2220,460 
             C 2200,420 2160,420 2120,420 
             L 1800,420 
             L 1740,360 
             L 1700,260 
             L 700,260 
             L 640,360 
             L 580,420 
             L 440,420 
             C 380,420 340,440 300,480 
             C 260,520 240,560 240,600 
             L 240,640 
             C 240,680 280,720 320,720 
             L 440,740`,
          fill: "url(#carBodyGradient)",
          stroke: "#111",
          strokeWidth: "4", // Increased from 2
          key: "body-path"
        }),
        
        /* Windows with realistic glass effect - scaled by 2x */
        React.createElement('path', {
          d: `M 700,300 
             L 1700,300 
             L 1660,420 
             L 700,420 
             L 700,300`,
          fill: "url(#glassGradient)",
          stroke: "#222",
          strokeWidth: "3", // Increased from 1.5
          key: "windows"
        }),
        
        /* Window pillars and other car details - scaled by 2x */
        React.createElement('path', { 
          d: "M 800,420 L 760,300 L 700,300 L 740,420 Z", 
          fill: getDarkerColor(carColor), 
          stroke: "#111", 
          strokeWidth: "2", // Increased from 1
          key: "pillar-1"
        }),
        
        React.createElement('path', { 
          d: "M 1040,420 L 1040,300 L 1000,300 L 1000,420 Z", 
          fill: getDarkerColor(carColor), 
          stroke: "#111", 
          strokeWidth: "2", // Increased from 1
          key: "pillar-2"
        }),
        
        React.createElement('path', { 
          d: "M 1400,420 L 1400,300 L 1360,300 L 1360,420 Z", 
          fill: getDarkerColor(carColor), 
          stroke: "#111", 
          strokeWidth: "2", // Increased from 1
          key: "pillar-3"
        }),
        
        React.createElement('path', { 
          d: "M 1660,420 L 1620,300 L 1660,300 L 1700,420 Z", 
          fill: getDarkerColor(carColor), 
          stroke: "#111", 
          strokeWidth: "2", // Increased from 1
          key: "pillar-4"
        }),
        
        /* Headlights - scaled by 2x */
        React.createElement('path', {
          d: `M 280,600 
             C 280,580 290,560 310,550 
             C 330,540 350,530 370,530 
             L 370,650 
             C 350,650 330,640 310,630 
             C 290,620 280,610 280,600`,
          fill: "url(#headlightGradient)",
          stroke: "#555",
          strokeWidth: "2", // Increased from 1
          key: "headlight"
        }),
        
        React.createElement('circle', {
          cx: "320",  // 160 * 2
          cy: "580",  // 290 * 2
          r: "20",    // 10 * 2
          fill: "#FFFDE7",
          opacity: "0.7",
          key: "headlight-glow"
        })
      ]),
      
      /* Wheels with realistic details - scaled by 2x */
      React.createElement('g', { key: "wheels" }, [
        /* Left wheel */
        React.createElement('circle', {
          cx: "600",   // 300 * 2
          cy: "840",   // 420 * 2
          r: "160",    // 80 * 2
          fill: "#222",
          stroke: "#111",
          strokeWidth: "6", // Increased from 3
          key: "left-wheel-outer"
        }),
        
        React.createElement('circle', {
          cx: "600",   // 300 * 2
          cy: "840",   // 420 * 2
          r: "140",    // 70 * 2
          fill: "#333",
          stroke: "#111",
          strokeWidth: "2", // Increased from 1
          key: "left-wheel-mid"
        }),
        
        React.createElement('circle', {
          cx: "600",   // 300 * 2
          cy: "840",   // 420 * 2
          r: "130",    // 65 * 2
          fill: "#444",
          stroke: "#333",
          strokeWidth: "4", // Increased from 2
          key: "left-wheel-inner"
        }),
        
        React.createElement('circle', {
          cx: "600",   // 300 * 2
          cy: "840",   // 420 * 2
          r: "50",     // 25 * 2
          fill: "#666",
          stroke: "#555",
          strokeWidth: "2", // Increased from 1
          key: "left-wheel-hub"
        }),
        
        /* Left wheel spokes */
        ...renderWheelSpokes.leftWheel,
        
        /* Right wheel and spokes similar to left wheel */
        React.createElement('circle', {
          cx: "1800",  // 900 * 2
          cy: "840",   // 420 * 2
          r: "160",    // 80 * 2
          fill: "#222",
          stroke: "#111",
          strokeWidth: "6", // Increased from 3
          key: "right-wheel-outer"
        }),
        
        React.createElement('circle', {
          cx: "1800",  // 900 * 2
          cy: "840",   // 420 * 2
          r: "130",    // 65 * 2
          fill: "#444",
          stroke: "#333",
          strokeWidth: "4", // Increased from 2
          key: "right-wheel-inner"
        }),
        
        /* Right wheel spokes */
        ...renderWheelSpokes.rightWheel
      ]),
      
      /* Interactive Category Hotspots */
      ...Object.entries(positions).map(([key, position]) => {
        const selected = isSelected(key);
        const hovered = hoverCategory === key;
        const categoryName = t.categories[key as keyof TranslationCategories];
        
        return React.createElement('g', {
          key: `hotspot-${key}`,
          onClick: () => handleFilter(key),
          onMouseEnter: () => setHoverCategory(key),
          onMouseLeave: () => setHoverCategory(null),
          className: "cursor-pointer",
          role: "button",
          'aria-label': `${t.ariaLabels.hotspot} ${categoryName}`,
          'aria-pressed': selected,
          tabIndex: 0,
          filter: selected ? "url(#glow)" : "none"
        }, [
          /* Animated pulse ring (always visible now, not just when selected or hovered) */
          !reducedMotion && 
            React.createElement('circle', {
              cx: position.x,
              cy: position.y,
              r: "64",   // 32 * 2
              fill: "none",
              stroke: position.color,
              strokeWidth: "6", // Increased from 3
              opacity: "0.5",
              key: "pulse-ring"
            }, [
              React.createElement('animate', {
                attributeName: "r",
                values: "60;90;60", // 30 * 2; 45 * 2; 30 * 2
                dur: "2s",
                repeatCount: "indefinite",
                key: "animate-r"
              }),
              React.createElement('animate', {
                attributeName: "opacity",
                values: "0.6;0.2;0.6",
                dur: "2s",
                repeatCount: "indefinite",
                key: "animate-opacity"
              })
            ]),
          
          /* Main hotspot circle - increased size by 100% */
          React.createElement('circle', {
            cx: position.x,
            cy: position.y,
            r: hovered ? "60" : "50", // 30 * 2 : 25 * 2
            fill: selected ? `url(#${key}SelectedGradient)` : `url(#${key}Gradient)`,
            stroke: selected ? "#FFF" : "#333",
            strokeWidth: "4", // Increased from 2
            className: `transition-all duration-300 ${selected ? 'opacity-100' : 'opacity-90'}`,
            key: "main-circle"
          }),
          
          /* Icon - increased size */
          React.createElement('text', {
            x: position.x,
            y: position.y,
            textAnchor: "middle",
            dominantBaseline: "middle",
            fontSize: hovered ? "40" : "32", // 20 * 2 : 16 * 2
            className: "pointer-events-none transition-all duration-300",
            key: "icon"
          }, position.icon),
          
          /* Tooltip (visible on hover) - scaled up */
          hovered && React.createElement('g', { 
            className: "pointer-events-none",
            key: "tooltip" 
          }, [
            React.createElement('rect', {
              x: position.x - 160,  // 80 * 2
              y: position.y + 70,   // 35 * 2
              width: "320",         // 160 * 2
              height: "60",         // 30 * 2
              rx: "10",             // 5 * 2
              fill: "rgba(0,0,0,0.8)",
              key: "tooltip-bg"
            }),
            React.createElement('text', {
              x: position.x,
              y: position.y + 100,  // 50 * 2
              textAnchor: "middle",
              dominantBaseline: "middle",
              fill: "#FFF",
              fontSize: "24",       // 12 * 2
              fontWeight: "bold",
              key: "tooltip-text"
            }, categoryName)
          ])
        ]);
      })
    ]),
    
    /* Category buttons for improved UX and accessibility - styled like your button-link */
    React.createElement('div', {
      className: `mt-5 button-link-container ${language === 'ar' ? 'rtl' : 'ltr'}`,
      role: "group",
      'aria-label': t.ui.tooltipLabel,
      key: "category-buttons"
    }, 
      Object.entries(positions).map(([key, position]) => {
        const selected = isSelected(key);
        const categoryName = t.categories[key as keyof TranslationCategories];
        
        return React.createElement('button', {
          key: `button-${key}`,
          onClick: () => handleFilter(key),
          className: `
            button-link button-content
            transition-all duration-300 flex items-center gap-3
            ${selected 
              ? 'bg-gray-800 text-white scale-105' 
              : ''}
          `,
          style: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '25px',
            fontWeight: 'bold'
          },
          'aria-pressed': selected
        }, [
          React.createElement('span', { 
            className: "text-2xl",
            style: { fontSize: '32px' },
            key: "btn-icon" 
          }, position.icon),
          React.createElement('span', { 
            className: `${language === 'ar' ? 'font-arabic' : ''}`,
            key: "btn-text"
          }, categoryName)
        ]);
      })
    )
  ]);
};

export default React.memo(InteractiveCar);