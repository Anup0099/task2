
import Import from './Import';
import Tables from './Tables';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Import />} />
        <Route path="/tables" element={<Tables />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
