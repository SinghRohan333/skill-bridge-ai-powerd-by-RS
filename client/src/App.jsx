import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<div>Landing Page</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/register" element={<div>Register Page</div>} />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        <Route path="/upload" element={<div>Upload Page</div>} />
        <Route path="/analysis/:id" element={<div>Analysis Page</div>} />
        <Route path="/latex/:id" element={<div>LaTeX Page</div>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
