import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MarkPage from './LecturesMarksPage';
import ResultView from './ResultViewPage';
import MarksAdd from './MarksAddPage';
import EditUser from './MarkEditPage';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Marks</Link>
                        </li>
                        <li>
                            <Link to="/ResultViewPage">Result</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<MarkPage />} />
                    <Route path="/ResultViewPage" element={<ResultView />} />
                    <Route path="/MarksAddPage" element={<MarksAdd />} />
                    <Route path="/mark/:id/MarkEditPage" element={<EditUser />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
