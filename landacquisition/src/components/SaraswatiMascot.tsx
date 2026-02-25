import React from "react";
import { BookOpen, Scale, Sparkles } from "lucide-react";

interface SaraswatiMascotProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
}

const SaraswatiMascot: React.FC<SaraswatiMascotProps> = ({ 
  size = "md", 
  animated = true,
  className = "" 
}) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Main Circle with Gradient */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-hulu-green via-hulu-green-light to-hulu-purple ${animated ? "animate-pulse" : ""}`}>
        <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
          {/* Book Icon - Symbol of Knowledge */}
          <div className="relative">
            <BookOpen className={`${size === "xl" ? "w-12 h-12" : size === "lg" ? "w-10 h-10" : size === "md" ? "w-8 h-8" : "w-6 h-6"} text-hulu-green`} />
            {animated && (
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-hulu-purple animate-ping" />
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative Rings */}
      {animated && (
        <>
          <div className="absolute inset-0 rounded-full border-2 border-hulu-green/30 animate-ping" style={{ animationDuration: "3s" }}></div>
          <div className="absolute inset-0 rounded-full border-2 border-hulu-purple/20 animate-ping" style={{ animationDuration: "4s", animationDelay: "1s" }}></div>
        </>
      )}
      
      {/* Scale Icon - Symbol of Justice */}
      <div className={`absolute -bottom-2 -right-2 ${size === "xl" ? "w-10 h-10" : size === "lg" ? "w-8 h-8" : size === "md" ? "w-6 h-6" : "w-5 h-5"} bg-hulu-purple rounded-full flex items-center justify-center shadow-lg ${animated ? "animate-bounce" : ""}`} style={{ animationDuration: "2s" }}>
        <Scale className={`${size === "xl" ? "w-6 h-6" : size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3 h-3"} text-white`} />
      </div>
      
      {/* Sparkle Effects */}
      {animated && (
        <>
          <div className="absolute top-0 left-1/4 w-2 h-2 bg-hulu-green rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute top-1/4 right-0 w-2 h-2 bg-hulu-purple rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-1/4 left-0 w-2 h-2 bg-hulu-green-light rounded-full animate-ping" style={{ animationDelay: "1.5s" }}></div>
        </>
      )}
    </div>
  );
};

export default SaraswatiMascot;
