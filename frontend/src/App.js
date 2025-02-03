import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import UploadPkt from "./Components/UploadPkt";
import Login from "./Components/Login";
import { StateProvider } from "./StateContext";
import PrivateRoute from "./PrivateRoute";
import AdminLogin from "./Components/AdminLogin";
import PktScore from "./Components/PktScore";
import SubmittedTest from "./Components/SubmittedTest";
import ViewAllPkt from "./Components/ViewAllPkt";
import { Toaster } from 'react-hot-toast';
import RequestRetest from "./Components/RequestRetest";

function App() {
  return (
    <StateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route
            path="/uploadpkt"
            element={
              <PrivateRoute>
                <UploadPkt />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
           <Route
            path="/pktscore"
            element={
              <PrivateRoute>
                <PktScore />
              </PrivateRoute>
            }
          />
           <Route
            path="/submittedtest"
            element={
              <PrivateRoute>
                <SubmittedTest/>
              </PrivateRoute>
            }
          />
            <Route
            path="/viewallpkt"
            element={
              <PrivateRoute>
                <ViewAllPkt />
              </PrivateRoute>
            }
          />
          <Route
            path="/requestretest"
            element={
              <PrivateRoute>
                <RequestRetest/>
              </PrivateRoute>
            }
          />
        </Routes>
        <Toaster /> {/* Add Toaster here to enable toast notifications */}
      </Router>
    </StateProvider>
  );
}

export default App;
