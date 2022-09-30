import CustomNavbar from './Navbar';
import ContentWithRouter from './Content';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
    <CustomNavbar/>      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContentWithRouter type="post" typeOfPosts="top"/>} />
        <Route index element={<ContentWithRouter type="post" typeOfPosts="top"/>} />
        <Route path="hot" element={<ContentWithRouter type="post" typeOfPosts="hot" />} />
        <Route path="top" element={<ContentWithRouter type="post" typeOfPosts="top"/>} />
        <Route path="new" element={<ContentWithRouter type="post" typeOfPosts="new"/>} />
        <Route path="comment/:id" element={<ContentWithRouter type="comment" typeOfPosts="top" />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
