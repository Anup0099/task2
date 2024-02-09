
import Import from './Import';
import Tables from './Tables';
import { Routes, Route, HashRouter } from 'react-router-dom';
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Import />} />
        <Route path="/tables" element={<Tables />} />

      </Routes>

    </HashRouter>
  );
}

export default App;
