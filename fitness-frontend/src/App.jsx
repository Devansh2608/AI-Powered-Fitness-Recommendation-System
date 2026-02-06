import './App.css'
import { BrowserRouter as Router,  Navigate, Route, Routes } from 'react-router'
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { setCredentials } from './store/authSlice';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'react-oauth2-code-pkce';
import { Box } from '@mui/material';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import ActivityDetail from './components/ActivityDetail';

const ActivitiesPage= ()=>{
  return (
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <ActivityForm onActivityAdded={()=> window.location.reload()}/>
      <ActivityList />  
    </Box>
  );
}

function App() {
  
  const {token, tokenData, logIn, logOut, isAuthenticated} = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady]= useState(false);

  useEffect(()=>{
    if(token){
      //localStorage.setItem("token", token);
      dispatch(setCredentials({token, user: tokenData}));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
      <Button variant="contained"
      onClick={()=>{logIn();}}>
        
        LOGIN
      </Button>
      ): (
        <div>
          {/* <pre>
            {JSON.stringify(tokenData, null, 2)}
          </pre> */}
          <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
           <Button variant="contained" onClick={logOut}>
            LOGOUT
           </Button>

           <Routes>
             <Route path="/activities" element={<ActivitiesPage />}/>
             <Route path="/activities/:id" element={<ActivityDetail />}/>
             <Route path="/" element={token ? <Navigate to="/activities" replace/> : <div>Welocome, Please Login</div>
            }/>
             
             
           </Routes>
              </Box>
        </div>
      )}
    </Router>
  )
}

export default App
