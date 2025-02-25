import { useSearchParams } from "react-router-dom";

const defaultPositions = {
  front: { x: 1100, y: 300 },  // أفلام حماية و تظليل
  back: { x: 100, y: 300 },    // إطارات السيارات
  top: { x: 600, y: 90 },      // إكسسوارات السيارات
  bottom: { x: 600, y: 420 },  // مواد التلميع
};

const CarWithPlaceholders = ({ positions = defaultPositions }) => {
  const [searchParams, setSearchParams] = useSearchParams();
 
  const handleFilter = (category) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("category");
    newSearchParams.append("category", category);
    setSearchParams(newSearchParams);
    // Scroll to products list with smooth behavior
    const productsList = document.getElementById('products-list');
    if (productsList) {
      productsList.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback if ID not found - scroll to approximate position
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const isSelected = (category) => {
    return searchParams.getAll("category").includes(category);
  };

  return (
    <svg viewBox="0 0 1200 600" className="w-52 h-24">
      {/* Car body */}
      <path
        d="M 100,420 L 1100,420 L 1100,300 Q 1100,180 930,180 L 720,180 L 600,90 L 360,90 L 270,180 L 100,180 Q 40,180 40,300 L 100,420"
        fill="#4A90E2"
        stroke="black"
        strokeWidth="4"
      />
      {/* Wheels */}
      <circle cx="300" cy="420" r="90" fill="#333" />
      <circle cx="900" cy="420" r="90" fill="#333" />
      {/* Windows */}
      <path
        d="M 360,120 L 720,120 L 800,180 L 360,180 Z"
        fill="#B8E2F2"
        stroke="black"
        strokeWidth="2"
      />
      {/* Category Filter Spots */}
      <circle
        cx={positions.front.x}
        cy={positions.front.y}
        r="20"
        fill={isSelected("أفلام حماية و تظليل") ? "#ff4444" : "red"}
        className={`cursor-pointer transition-colors duration-300 hover:fill-yellow-300 ${isSelected("أفلام حماية و تظليل") ? "selected" : ""}`}
        onClick={() => handleFilter("أفلام حماية و تظليل")}
      >
        <title>أفلام حماية و تظليل</title>
      </circle>
      <circle
        cx={positions.back.x}
        cy={positions.back.y}
        r="20"
        fill={isSelected("إطارات السيارات") ? "#4444ff" : "blue"}
        className={`cursor-pointer transition-colors duration-300 hover:fill-yellow-300 ${isSelected("إطارات السيارات") ? "selected" : ""}`}
        onClick={() => handleFilter("إطارات السيارات")}
      >
        <title>إطارات السيارات</title>
      </circle>
      <circle
        cx={positions.top.x}
        cy={positions.top.y}
        r="20"
        fill={isSelected("إكسسوارات السيارات") ? "#44ff44" : "green"}
        className={`cursor-pointer transition-colors duration-300 hover:fill-yellow-300 ${isSelected("إكسسوارات السيارات") ? "selected" : ""}`}
        onClick={() => handleFilter("إكسسوارات السيارات")}
      >
        <title>إكسسوارات السيارات</title>
      </circle>
      <circle
        cx={positions.bottom.x}
        cy={positions.bottom.y}
        r="20"
        fill={isSelected("مواد التلميع") ? "#ffff44" : "yellow"}
        className={`cursor-pointer transition-colors duration-300 hover:fill-yellow-300 ${isSelected("مواد التلميع") ? "selected" : ""}`}
        onClick={() => handleFilter("مواد التلميع")}
      >
        <title>مواد التلميع</title>
      </circle>
    </svg>
  );
};

export default CarWithPlaceholders;

// Tailwind classes for the button link components (not part of the CarWithPlaceholders component)
// Usage example:
// <div className="flex flex-col items-center gap-4">
//   <a href="#" className="w-fit mx-auto py-5 px-5 font-bold text-2xl border-2 border-[var(--main-color)] rounded-[var(--main-border-radius)] transition duration-300 hover:bg-[var(--main-color)] hover:text-[var(--darker-color)] text-[var(--main-text-color)]">
//     <div className="text-center">Button Content</div>
//   </a>
// </div>