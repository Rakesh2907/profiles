import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import Profile from 'Profile';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Profile}>
     <Route path="/profile" component={Profile}/>
	 <Route path="/class" component={Profile}/>  
	 <Route path="/candidate" component={Profile}/>
	 <Route path="/father" component={Profile}/>
	 <Route path="/mother" component={Profile}/>
	 <Route path="/guardian" component={Profile}/>
	 <Route path="/payment" component={Profile}/>
	 <Route path="/download" component={Profile}/>
	 <Route path="/interview_result" component={Profile}/>
	 <Route path="/upload_doc" component={Profile}/>
	 <Route path="/new_application" component={Profile}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
