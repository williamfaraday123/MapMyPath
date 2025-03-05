import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import SearchResults from './pages/SearchResults';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/search-results" Component={SearchResults} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
