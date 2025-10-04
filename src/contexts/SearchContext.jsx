import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { 
  Search, 
  X, 
  Clock, 
  TrendingUp, 
  Star, 
  Filter,
  SlidersHorizontal,
  Sparkles,
  Zap,
  History,
  Hash
} from 'lucide-react'

// Premium Search Context with enhanced features
const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchHistory, setSearchHistory] = useState([])
  const [searchFilters, setSearchFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
    sortBy: 'relevance',
    inStock: false,
    onSale: false
  })
  const [trendingSearches, setTrendingSearches] = useState([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState([])

  // Load search history and trending searches from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('premium_search_history')
    const savedTrending = localStorage.getItem('premium_trending_searches')
    
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Error parsing search history:', error)
        localStorage.removeItem('premium_search_history')
      }
    }
    
    if (savedTrending) {
      try {
        setTrendingSearches(JSON.parse(savedTrending))
      } catch (error) {
        console.error('Error parsing trending searches:', error)
        localStorage.removeItem('premium_trending_searches')
      }
    } else {
      // Default trending searches
      setTrendingSearches([
        'Premium Products',
        'Summer Collection',
        'Limited Edition',
        'Best Sellers',
        'New Arrivals'
      ])
    }
  }, [])

  // Save search history to localStorage
  useEffect(() => {
    localStorage.setItem('premium_search_history', JSON.stringify(searchHistory))
  }, [searchHistory])

  // Enhanced search function with debouncing
  const performSearch = useCallback(async (query, filters = searchFilters) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    
    try {
      // Simulate API call with enhanced search logic
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock search results - in real app, this would be an API call
      const mockResults = generateMockResults(query, filters)
      setSearchResults(mockResults)
      
      // Add to search history if not already present
      if (query.trim() && !searchHistory.includes(query.trim())) {
        setSearchHistory(prev => [query.trim(), ...prev.slice(0, 9)]) // Keep last 10
      }
      
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [searchFilters, searchHistory])

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery)
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [searchQuery, performSearch])

  // Generate search suggestions
  useEffect(() => {
    if (searchQuery.length > 1) {
      const suggestions = generateSuggestions(searchQuery)
      setSearchSuggestions(suggestions)
    } else {
      setSearchSuggestions([])
    }
  }, [searchQuery])

  // Clear search
  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setSearchSuggestions([])
  }

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([])
  }

  // Remove single history item
  const removeFromHistory = (query) => {
    setSearchHistory(prev => prev.filter(item => item !== query))
  }

  // Quick search from history or trending
  const quickSearch = (query) => {
    setSearchQuery(query)
    setIsSearchOpen(false)
  }

  // Apply filters
  const applyFilters = (newFilters) => {
    setSearchFilters(newFilters)
    performSearch(searchQuery, newFilters)
  }

  // Reset filters
  const resetFilters = () => {
    const defaultFilters = {
      category: 'all',
      priceRange: [0, 1000],
      rating: 0,
      sortBy: 'relevance',
      inStock: false,
      onSale: false
    }
    setSearchFilters(defaultFilters)
    performSearch(searchQuery, defaultFilters)
  }

  // Get search statistics
  const getSearchStats = () => {
    return {
      totalResults: searchResults.length,
      hasResults: searchResults.length > 0,
      hasQuery: searchQuery.length > 0,
      historyCount: searchHistory.length,
      isFiltered: Object.values(searchFilters).some(value => 
        Array.isArray(value) ? value[0] > 0 || value[1] < 1000 : value !== false && value !== 'all' && value !== 'relevance'
      )
    }
  }

  const value = {
    // Core state
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    searchHistory,
    searchFilters,
    trendingSearches,
    isSearchOpen,
    setIsSearchOpen,
    searchSuggestions,

    // Actions
    performSearch,
    clearSearch,
    clearSearchHistory,
    removeFromHistory,
    quickSearch,
    applyFilters,
    resetFilters,

    // Enhanced features
    getSearchStats
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
      
      {/* Global Search Modal */}
      <SearchModal />
    </SearchContext.Provider>
  )
}

// Premium Search Modal Component
const SearchModal = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    searchHistory,
    trendingSearches,
    isSearchOpen,
    setIsSearchOpen,
    searchSuggestions,
    quickSearch,
    clearSearch,
    removeFromHistory,
    clearSearchHistory,
    getSearchStats
  } = useSearchContext()

  const searchStats = getSearchStats()

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
            onClick={() => setIsSearchOpen(false)}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl z-50 max-h-[80vh] overflow-hidden"
          >
            {/* Search Input */}
            <div className="relative p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands, or categories..."
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Search Content */}
            <div className="overflow-y-auto max-h-96">
              <AnimatePresence mode="wait">
                {isSearching ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 text-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-gray-600 dark:text-gray-400">Searching...</p>
                  </motion.div>
                ) : searchQuery ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Search Suggestions */}
                    {searchSuggestions.length > 0 && (
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                          Suggestions
                        </h3>
                        <div className="space-y-1">
                          {searchSuggestions.map((suggestion, index) => (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              onClick={() => quickSearch(suggestion)}
                              className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg flex items-center space-x-3"
                            >
                              <Search className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Search Results */}
                    {searchStats.hasResults ? (
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {searchStats.totalResults} results found
                          </h3>
                          <button className="text-sm text-blue-500 hover:text-blue-600">
                            <Filter className="w-4 h-4 inline mr-1" />
                            Filters
                          </button>
                        </div>
                        
                        <div className="space-y-2">
                          {searchResults.slice(0, 5).map((result, index) => (
                            <motion.div
                              key={result.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                              onClick={() => {
                                quickSearch(result.name)
                                setIsSearchOpen(false)
                              }}
                            >
                              <img
                                src={result.image}
                                alt={result.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {result.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  ${result.price}
                                </p>
                              </div>
                              <Star className="w-4 h-4 text-yellow-400" />
                            </motion.div>
                          ))}
                        </div>
                        
                        {searchStats.totalResults > 5 && (
                          <button className="w-full mt-4 py-2 text-center text-blue-500 hover:text-blue-600 border border-gray-200 dark:border-gray-700 rounded-lg">
                            View all {searchStats.totalResults} results
                          </button>
                        )}
                      </div>
                    ) : searchStats.hasQuery && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-8 text-center"
                      >
                        <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          No results found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Try different keywords or check out our trending searches
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6"
                  >
                    {/* Search History */}
                    {searchHistory.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                            <History className="w-4 h-4 mr-2" />
                            Recent Searches
                          </h3>
                          <button
                            onClick={clearSearchHistory}
                            className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            Clear all
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {searchHistory.map((query, index) => (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => quickSearch(query)}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              <Clock className="w-3 h-3" />
                              <span>{query}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeFromHistory(query)
                                }}
                                className="hover:text-red-500"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending Searches */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center mb-3">
                        <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                        Trending Now
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((trend, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => quickSearch(trend)}
                            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          >
                            <Hash className="w-3 h-3" />
                            <span>{trend}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Search Hook
export const useSearchContext = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }
  return context
}

// Search Icon Component
export const SearchIcon = ({ className }) => {
  const { setIsSearchOpen } = useSearchContext()

  return (
    <motion.button
      onClick={() => setIsSearchOpen(true)}
      className={clsx(
        'p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Search className="w-5 h-5" />
    </motion.button>
  )
}

// Mock data generators (replace with real API calls)
const generateMockResults = (query, filters) => {
  const mockProducts = [
    { id: 1, name: 'Premium Wireless Headphones', price: 299, image: '/headphones.jpg', category: 'electronics', rating: 4.5 },
    { id: 2, name: 'Smart Watch Pro', price: 399, image: '/watch.jpg', category: 'electronics', rating: 4.8 },
    { id: 3, name: 'Organic Cotton T-Shirt', price: 49, image: '/tshirt.jpg', category: 'clothing', rating: 4.2 },
    { id: 4, name: 'Designer Sunglasses', price: 199, image: '/sunglasses.jpg', category: 'accessories', rating: 4.6 },
    { id: 5, name: 'Premium Coffee Beans', price: 29, image: '/coffee.jpg', category: 'food', rating: 4.7 }
  ]

  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  )
}

const generateSuggestions = (query) => {
  const suggestions = [
    `${query} products`,
    `${query} collection`,
    `best ${query}`,
    `${query} on sale`,
    `premium ${query}`
  ]
  return suggestions.slice(0, 3)
}

// Usage examples:
/*
// In your main app:
<SearchProvider>
  <App />
</SearchProvider>

// Using search in components:
const { 
  searchQuery, 
  setSearchQuery, 
  searchResults,
  performSearch 
} = useSearchContext()

// Search icon in navigation:
<SearchIcon />

// Search input component:
<SearchInput />
*/