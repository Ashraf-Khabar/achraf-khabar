import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchProjectsProps {
  onSearch: (query: string) => void;
  onFilterByTech: (tech: string) => void;
  availableTechnologies: string[];
  activeTechFilter: string | null;
}

const SearchProjects = ({ 
  onSearch, 
  onFilterByTech, 
  availableTechnologies, 
  activeTechFilter 
}: SearchProjectsProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Rechercher des projets..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Technology Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        <Badge
          variant={activeTechFilter === null ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary/20 transition-colors"
          onClick={() => onFilterByTech("")}
        >
          Toutes
        </Badge>
        {availableTechnologies.map((tech) => (
          <Badge
            key={tech}
            variant={activeTechFilter === tech ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/20 transition-colors"
            onClick={() => onFilterByTech(tech)}
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SearchProjects;