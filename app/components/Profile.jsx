import React from 'react';
import Header from 'Header';
import ProfileInfo from 'ProfileInfo';

class Profile extends React.Component 
{
	componentDidMount()
	{
    	
    }

	render(){
		return (
		   <div className="container">
		      <Header />
		      <ProfileInfo current_path={this.props.location.pathname}/>
		   </div>	
		);
	}
}

export default Profile;