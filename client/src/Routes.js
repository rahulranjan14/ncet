//modules import
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//custom created route import
import AdminRoute from './customRoutes/AdminRoute'

//admin pages import
import AdminDashboardPage from './pages/adminDashboard/AdminDashboardPage'
import CreateTestPage from './pages/adminDashboard/CreateTestPage'
import ViewAllSubmissionsPage from './pages/adminDashboard/ViewAllSubmissionsPage'
import ViewSubmissionsByTest from './pages/adminDashboard/ViewSubmissionsByTest'
import ViewAllTestsPage from './pages/adminDashboard/ViewAllTestsPage'
import DeleteTestsPage from './pages/adminDashboard/DeleteTestsPage'

//public pages import
import Home from './pages/homepage/HomePage'
import Signup from './pages/signup/Signup'
import Signin from './pages/signin/Signin'
import SubmitTest from './pages/userpage/SubmitTest'



const Routes = () => {
    console.log("env", process.env)
    return(
        <BrowserRouter>
            <Switch>
            
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/test/submit/:testId" exact component={SubmitTest} />

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboardPage} />
                <AdminRoute path="/admin/createtest" exact component={CreateTestPage} />
                <AdminRoute path="/admin/submissions/all" exact component={ViewAllSubmissionsPage} />
                <AdminRoute path="/admin/tests/all" exact component={ViewAllTestsPage} />
                <AdminRoute path="/admin/tests/delete" exact component={DeleteTestsPage} />
                <AdminRoute path="/test/submissions/:testId" exact component={ViewSubmissionsByTest} />
                
                
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;