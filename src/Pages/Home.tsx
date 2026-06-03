import "../styles/home.css"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Feature from "../components/Feature/Feature"
import MealsCard from "../components/MealsCard/MealsCard"
import { searchMeals as fetchMeals } from "../services/api"
import Category from "../components/Category/Category"

const MEALS_PER_PAGE = 9;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: meals,
    isLoading: isSearching,
    error: searchError,
  } = useQuery({
    queryKey: ['meals', submittedQuery],
    queryFn: () => fetchMeals(submittedQuery),
    enabled: !!submittedQuery,
  });

  // Pagination logic
  const totalMeals = meals?.length ?? 0;
  const totalPages = Math.ceil(totalMeals / MEALS_PER_PAGE);
  const paginatedMeals = meals?.slice(
    (currentPage - 1) * MEALS_PER_PAGE,
    currentPage * MEALS_PER_PAGE
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery.trim());
      setCurrentPage(1);
    }
  };

  if (isSearching) return <div className="message"><h2>Searching for meals...</h2></div>;
  if (searchError) return <div className="message"><h2>Error searching meals: {(searchError as Error).message}</h2></div>;

  return (
    <>
      <Feature />

      <div className="search-container">
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for recipes, ingredients, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" type="submit">Search</button>
        </form>
      </div>

      {paginatedMeals && paginatedMeals.length > 0 ? (
        <>
          <div className="meals-list">
            {paginatedMeals.map((singleMeal, index) => (
              <MealsCard key={index} meal={singleMeal} />
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                &larr; Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? "pagination-btn--active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next &rarr;
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          {!submittedQuery && <Category />}
        </div>
      )}

      
    </>
  );
}