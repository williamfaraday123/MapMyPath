import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchResults from './pages/SearchResults';
import SortFilter from './pages/SortFilter';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={SortFilter} />
        <Route path="/search-results" Component={SearchResults} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
