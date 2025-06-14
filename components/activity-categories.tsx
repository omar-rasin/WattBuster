"use client"
import { Button } from "@/components/ui/button"
import { Monitor, Headphones, ShoppingBag, Users, Globe } from "lucide-react"

interface ActivityCategoriesProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function ActivityCategories({ selectedCategory, onCategoryChange }: ActivityCategoriesProps) {
  const categories = [
    { id: "all", name: "All Activities", icon: <Globe className="w-5 h-5" /> },
    { id: "entertainment", name: "Entertainment", icon: <Monitor className="w-5 h-5" /> },
    { id: "communication", name: "Communication", icon: <Users className="w-5 h-5" /> },
    { id: "audio", name: "Audio", icon: <Headphones className="w-5 h-5" /> },
    { id: "productivity", name: "Productivity", icon: <ShoppingBag className="w-5 h-5" /> },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          variant={selectedCategory === category.id ? "default" : "outline"}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
            selectedCategory === category.id
              ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25"
              : "border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20 bg-white/10 backdrop-blur-sm"
          }`}
        >
          {category.icon}
          <span className="text-sm font-medium">{category.name}</span>
        </Button>
      ))}
    </div>
  )
}
