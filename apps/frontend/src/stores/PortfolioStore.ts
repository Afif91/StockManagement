import { computed, makeAutoObservable } from 'mobx';
import axios from 'axios';
import { ResponseModel } from '../types/ResponseModel';
import { Stock } from '../types/Stock';
import { DEFAULT_USER_ID, ERROR_MESSAGES } from '../constants';

interface Filters {
  symbol?: string;
  priceRange?: [number, number];
  quantityRange?: [number, number];
}

class PortfolioStore {
  portfolio: Stock[] = [];
  filters: Filters = {};
  searchTerm = ''; // State for search term
  stockDetails: Stock | null = null;
  loading = false;
  error: string | null = null;
  userId = DEFAULT_USER_ID; 
  backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

  constructor() {
    makeAutoObservable(this);
  }

  setFilters(filters: Filters) {
    this.filters = filters;
  }

  setSearchTerm(term: string) {
    this.searchTerm = term;
  }

  @computed get filteredPortfolio(): Stock[] {
    const { symbol, priceRange, quantityRange } = this.filters;
    const searchTermLower = this.searchTerm.toLowerCase();

    return this.portfolio.filter((stock) => {
      let matches = true;

      // Search Term Filter
      if (
        searchTermLower &&
        !stock.name.toLowerCase().includes(searchTermLower) &&
        !stock.symbol.toLowerCase().includes(searchTermLower)
      ) {
        matches = false;
      }

      // Symbol Filter
      if (symbol && !stock.symbol.toLowerCase().includes(symbol.toLowerCase())) {
        matches = false;
      }

      // Price Range Filter
      if (
        priceRange &&
        (stock.price < priceRange[0] || stock.price > priceRange[1])
      ) {
        matches = false;
      }

      // Quantity Range Filter
      if (
        quantityRange &&
        (stock.quantity < quantityRange[0] || stock.quantity > quantityRange[1])
      ) {
        matches = false;
      }

      return matches;
    });
  }

  async fetchPortfolio(userId: string) {
    this.setLoading(true);
    this.setError(null);
    try {
      const response = await axios.get<ResponseModel<Stock[]>>(
        `${this.backendUrl}/portfolio/${userId}`
      );
      if (response.data.success) {
        this.portfolio = response.data.data || [];
      } else {
        this.setError(response.data.message || ERROR_MESSAGES.FETCH_PORTFOLIO);
      }
    } catch (error) {
      this.setError(ERROR_MESSAGES.FETCH_PORTFOLIO);
    } finally {
      this.setLoading(false);
    }
  }

  async addStock(stock: Partial<Stock>) {
    try {
      const response = await axios.post<ResponseModel<Stock>>(
        `${this.backendUrl}/portfolio`,
        { ...stock, userId: this.userId }
      );
      if (response.data.success) {
        if (response.data.data) {
          this.portfolio.push(response.data.data);
        } else {
          this.setError('Failed to add stock.');
        }
      } else {
        this.setError(response.data.message ?? 'An error occurred.');
      }
    } catch (error) {
      this.setError('Error adding stock.');
    }
  }

  async editStock(id: string, updatedStock: Partial<Stock>) {
    try {
      const response = await axios.put<ResponseModel<Stock>>(
        `${this.backendUrl}/portfolio/${id}`,
        updatedStock
      );
      if (response.data.success) {
        const index = this.portfolio.findIndex(stock => stock._id === id);
        if (index > -1) {
          if (response.data.data) {
            this.portfolio[index] = response.data.data;
          } else {
            this.setError('Failed to update stock.');
          }
        }
      } else {
        this.setError(response.data.message ?? 'An error occurred.');
      }
    } catch (error) {
      this.setError('Error editing stock.');
    }
  }

  async removeStock(id: string) {
    try {
      const response = await axios.delete<ResponseModel<Stock>>(
        `${this.backendUrl}/portfolio/${id}`
      );
      if (response.data.success) {
        this.portfolio = this.portfolio.filter(stock => stock._id !== id);
      } else {
        this.setError(response.data.message ?? 'An error occurred.');
      }
    } catch (error) {
      this.setError('Error removing stock.');
    }
  }

  async fetchStockDetails(symbol: string) {
    this.setLoading(true);
    this.setError(null);
    try {
      const response = await axios.get<ResponseModel<Stock>>(
        `${this.backendUrl}/portfolio/stockDetails/${symbol}`
      );
      if (response.data.success) {
        this.stockDetails = response.data.data ?? null;
      } else {
        this.setError(response.data.message ?? 'An error occurred.');
      }
    } catch (error) {
      this.setError('Error fetching stock details.');
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(value: boolean) {
    this.loading = value;
  }
  
  setError(message: string | null) {
    this.error = message;
  }
}

export const portfolioStore = new PortfolioStore();
