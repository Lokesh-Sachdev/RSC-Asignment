import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navigation, Post, TablePage } from './components';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<TablePage />} />
        <Route path="/posts/:id" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
