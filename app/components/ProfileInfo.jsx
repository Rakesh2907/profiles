import React from 'react';
import moment from 'moment';
import Razorpayment from 'Razorpayment';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


var formsteps = 1;
class LeftSide extends React.Component
{

	constructor(props) 
	{
        super(props);
        this.state={
          mydata: [],
          profile_image: base_url+'assets/img/profile.jpg',
          mySelect: props.handleSelect
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSelect = props.handleSelect.bind(this);
    }
    componentWillReceiveProps(props) 
    {
         
    }
    componenetDidMount()
    {

    }
    componentWillMount()
    {
    		$.ajax({
              	url: base_url+'admission_con/current_status',
              	dataType: 'json',
              	type: 'POST',
              	data: {
                	applicant_id: applicant_id
              	},
              	success: function(resdata) {

                	if(resdata.length > 0)
                	{    
                		  formsteps=resdata[0]['steps'];
                      this.setState({
                          mydata: resdata
                      });

                      if(resdata[0]['candidate_img']==null || resdata[0]['candidate_img']=='')
                      {
                         var img_path = base_url+'assets/img/profile.jpg'
                      }else{
                         var img_path = base_url+"uploads/candidate/"+resdata[0]['candidate_img'];
                      }

                       this.setState({
                              profile_image:img_path
                       }) 

                      //alert('inn'+formsteps);
                	}else{
                  		formsteps=1;
                       this.setState({mydata: []});
                	}
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });
    }
    handleLogout()
    {
    		$.ajax({
              	url: base_url+'admission_con/admission_logout',
              	dataType: 'json',
              	type: 'POST',
              	data: {
                	applicant_id: applicant_id
              	},
              	success: function(resdata) {

                	if(!resdata.is_login)
                	{
                		  window.location.href=base_url+'admission_con/'
                	}else{
                  		window.location.href=base_url+'admission_con/profile/'+applicant_id
                	}
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });
    }
    render(){
       
    	 var _inlineStyle = {
	      		 color:"green"  
	     }

       const myformSteps = [
            {id: 1, param: 'myprofile', content: 'Profile', link: '#profile'},
            {id: 2, param: 'myclass', content: 'Class', link: '#class'},
            {id: 3, param: 'child', content: 'Candidate', link: '#candidate'},
            {id: 4, param: 'father', content: 'Father', link: '#father'},
            {id: 5, param: 'mother', content: 'Mother', link: '#mother'},
            {id: 6, param: 'guardian', content: 'Guardian', link: '#guardian'},
            {id: 7, param: 'application_payment', content: 'Application Payment', link: '#payment'},
            {id: 8, param: 'application_print', content: 'Application Print/Download', link: '#download'},
            {id: 9, param: 'interview_result', content: 'Interview Shedule/Result', link: '#interview_result'},
            {id: 10, param: 'upload_document', content: 'Upload Document', link: '#upload_doc'}
      ];

       if(this.state.mydata.length > 0)
       {
          let add_new;
          var Lists = myformSteps.map(function(steps){
              //alert(formsteps);
              if(formsteps >= steps.id)
              {
                var customClass = 'fa fa-check-square';
              }else{
                var customClass = 'fa';
              }
              return <li className="list-group-item-sidebar text-left"><a id={steps.id} href={steps.link}><i style={_inlineStyle} className={customClass}></i>{steps.content}</a></li>      
           })

           if(formsteps == 10)
           { 
             // alert('1');  
              add_new = (
                        <ul className="list-group">
                          <li className="list-group-item-sidebar text-left"><a href="#new_application" className="fa fa-plus-square"> Add New</a></li>
                        </ul>
               )   
           }
    	   return (
    		 <div className="col-sm-3">
    		 		<ul className="list-group">
		                <li className="list-group-item text-muted" contenteditable="false">Profile</li>
		                <li className="list-group-item text-right profile-image">
			                <a href="javascript:void(0)" className="pull-center">
				      				<img title="profile image" className="img-circle img-responsive" id="profile_img" src={this.state.profile_image} />
				      		    </a>
			      		    </li>
		              	<li className="list-group-item text-right"><a href="javascript:void(0)" onClick={this.handleLogout}><span className="pull-left"><strong className="">Logout</strong></span></a>&nbsp;&nbsp;</li>
                    </ul>
		           <div className="panel panel-default">
		             	<div className="panel-heading">Steps</div>
			                <div className="panel-body">
			                	<ul className="list-group">
			                	 	{Lists}
			                	</ul> 
			                </div>
		           </div>
        	  </div>
            
    	   );
       }else{
          return (
              <div className="col-sm-3">Loading...</div>
          );
       }  
    }    
}
class NewApplication extends React.Component {


  constructor(props) 
  {
        super(props);
        this.state = {
          finished: false,
          stepIndex: 0,
        }
  }      

  getChildContext() {
    return {
      muiTheme: getMuiTheme(darkBaseTheme)
    };
  }
  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {finished, stepIndex} = this.state;

    return (
      <div style={{maxHeight: 400, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Select Class</StepLabel>
            <StepContent>
              <p>
                For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.
              </p>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Candidate</StepLabel>
            <StepContent>
              <p>An ad group contains one or more ads which target a shared set of keywords.</p>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Payment</StepLabel>
            <StepContent>
              <p>
                Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.
              </p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        )}
      </div>
    );
  }
}

class UploadDocument extends React.Component
{
	  constructor(props) 
	  {
        super(props);
        this.state = {
            candidate_img_file: '',
        };
        this.handleCandidateImg = this.handleCandidateImg.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.uploadCandidateImg = this.uploadCandidateImg.bind(this);
    } 
    componentWillMount()
    {
          $("#candi_profile_Img").html("Loading...");
          $.ajax({
                url: base_url+'admission_con/get_document',
                dataType: 'json',
                type: 'POST',
                data: {
                  applicant_id: applicant_id
                },
                success: function(resdata) {

                  if(resdata.length > 0)
                  {
                      if(resdata[0]['candidate_img']!=null || resdata[0]['candidate_img']!='')
                      {
                          var img_path = base_url+"uploads/candidate/"+resdata[0]['candidate_img'];
                          //alert(img_path);
                          $("#profile_img").attr('src',img_path);
                          $("#candi_profile_Img").html("");
                          $("#candi_profile_Img").html("<span class='pull-left'>Successfully uploaded image</span><img src='"+img_path+"' height='30' width='30'/>")
                      }
                  }else{
                     
                  }
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });  
    }
    handleChange(e)
    {
        $("#mycandidate_img").val($("#candidate_img").val());

         e.preventDefault();
         let reader = new FileReader();
         //let cimgfile = $("#candidate_img")[0].files[0];
         let cimgfile = e.target.files[0];

         reader.onloadend = () => {
          this.setState({
              candidate_img_file: cimgfile
          });
        }

        reader.readAsDataURL(cimgfile)
    }
    handleCandidateImg()
    {
        $("#candidate_img").click();
    }
    uploadCandidateImg(e)
    {
        var cfile = this.state.candidate_img_file
        var cfd = new FormData();
        cfd.append("candidateimg",cfile);

        $("#candi_profile_Img").html("Uploading...!")
        $.ajax({
                url: base_url+'admission_con/upload_candidate_img?id='+applicant_id,
                dataType: 'json',
                type: 'POST',
                data: cfd,
                contentType: false,
                processData: false,
                success: function(resdata) {
                  if(resdata.length > 0)
                  {
                       var img_path = base_url+"uploads/candidate/"+resdata[0]['file_name'];
                       $("#profile_img").attr('src',img_path);
                       $("#candi_profile_Img").html("<span class='pull-left'>Successfully uploaded image</span><img src='"+img_path+"' height='30' width='30'/>")
                    
                  }else{
                      
                  }
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });
        console.log('handle uploading-', this.state.candidate_img_file);
    }
    render(){
         var _style = {
                    display:"none"   
          };

         //alert(formsteps);
         if(formsteps > 8)
         {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">Upload Document</div>
                    <div className="panel-body">
                       <ul className="list-group">
                          <li className="list-group-item text-right" id="candi_profile_Img">
                            <span className="pull-left">
                              <input type="file" id="candidate_img" name="candidate_img" style={_style} onChange={this.handleChange}/>
                              <input type="button" value="Candidate Passport Image" id="selectCandidateImg" onClick={this.handleCandidateImg} className="mybutton"/>
                              <input type="text" id="mycandidate_img" readOnly data-required="true"/>
                             </span> 
                              <input type="button" value="Upload" id="uploadImg" className="mybutton" onClick={this.uploadCandidateImg}/>
                          </li>
                          <li className="list-group-item text-right">
                            <span className="pull-left">
                              <input type="file" id="candidate_adharcard" name="candidate_adharcard" style={_style}/>
                              <input type="button" value="Candidate Adhar Card" id="selectCandidateAc"  className="mybutton"/>
                              <input type="text" id="mycandidate_ac" readOnly data-required="true"/>
                             </span> 
                              <input type="button" value="Upload" id="uploadImg" className="mybutton"/>
                          </li>
                       </ul>
                    </div>
                 </div>
           );
         }else{
           return (
              <div className="panel panel-default">
                    <div className="panel-heading">Upload Document</div>
                    <div className="panel-body">
                    <ul className="list-group">
                      <li className="list-group-item text-right"><span className="pull-left">Right now this link not active for you.</span><span>&nbsp;</span></li>
                    </ul>
                    </div>
             </div>
           ); 
         } 
      	 
      } 
}

class InterviewResult extends React.Component
{
	  constructor(props) 
	  {
        super(props);
        this.state = {
        	inteview_date: null,
        	inteview_result: null,
        	english_percentage: 0,
        	gk_percentage:0,
        	maths_percentage:0
        }
      } 
      componentWillMount()
	  {
	  	  	$.ajax({
              	url: base_url+'admission_con/interview_result',
              	dataType: 'json',
              	type: 'POST',
              	data: {
                	applicant_id: applicant_id
              	},
              	success: function(resdata) {
                	if(resdata.length > 0)
                	{
                		if(resdata[0]['interview_shedule']!=null && resdata[0]['result']!=null)
                		{
                			this.setState({
                					inteview_date:resdata[0]['interview_shedule'],
                					inteview_result:resdata[0]['result'],
                					english_percentage:resdata[0]['english_percentage'],
                					gk_percentage:resdata[0]['gk_percentage'],
                					maths_percentage:resdata[0]['maths_percentage']
                			});
                			
                		}else{
                			this.setState({inteview_date:resdata[0]['interview_shedule']});
                		}
                		
                	}else{
                  		
                	}
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });
	  }
      render(){

      	 let inteview_status;
     
      	 if(this.state.inteview_date!=null && this.state.inteview_result==null){
      	 		inteview_status = (
      	 			<ul className="list-group">
      	 			 <li className="list-group-item text-right"><span className="pull-left"><strong className="">Shedule Date/Time</strong></span>{moment(this.state.inteview_date).format('llll')}</li>
      	 			</ul> 
      	 		)
      	 }else if(this.state.inteview_date!=null && this.state.inteview_result!=null){
      	 		inteview_status = (
      	 		  <ul className="list-group">
	      	 			<li className="list-group-item text-right"><span className="pull-left"><strong className="">Shedule Date/Time</strong></span>{moment(this.state.inteview_date).format('llll')}</li>
			            <li className="list-group-item text-right"><span className="pull-left"><strong className="">English</strong></span><span id="english_percentage">{this.state.english_percentage}</span></li>
			            <li className="list-group-item text-right"><span className="pull-left"><strong className="">GK</strong></span><span id="gk_percentage">{this.state.gk_percentage}</span></li>
			            <li className="list-group-item text-right"><span className="pull-left"><strong className="">Maths</strong></span><span id="maths_percentage">{this.state.maths_percentage}</span></li>
			            <li className="list-group-item text-right"><span className="pull-left"><strong className="">Result</strong></span><span id="result">{this.state.inteview_result}</span></li>
			            <li className="list-group-item text-right"><span className="pull-left"><strong className="">Teachers Name</strong></span>dfsdfsdf</li>
		          </ul>  
      	 		)
      	 }else{
      	 	 inteview_status = (
      	 		<ul className="list-group">
      	 			<li className="list-group-item text-right"><span className="pull-left"><strong className="">Date/Time</strong></span>Interview date not shedule.Please contact to school administration.</li>
      	 		</ul>
      	 	 )	
      	 }
      	 return (
      	 	<div className="panel panel-default">
                <div className="panel-heading">Interview Result</div>
                <div className="panel-body">
                	    {inteview_status}
                </div>
             </div>
      	 );
      } 
}

class ApplicationPrint extends React.Component
{
	  constructor(props) 
	  {
        super(props);
      } 
      render(){
         let dowload_url = base_url+"admission_con/download_form/"+applicant_id
      	 return (
      	 	<div className="panel panel-default">
                <div className="panel-heading">Application Download</div>
                <div className="panel-body">
                	<ul className="list-group">
		                <li className="list-group-item text-right"><span className="pull-left"><strong className="">Application Print</strong></span><a target="_blank" href={dowload_url}>Download</a></li>
                    </ul>
                </div>
             </div>
      	 );
      } 
}

class ApplicationPayment extends React.Component
{
	  constructor(props) 
	  {
        super(props);
        this.state = {
          form_status: 'incomplete'
        }
    } 
    componentDidMount()
	  {
	  	  	$.ajax({
              	url: base_url+'admin_con/get_status',
              	dataType: 'json',
              	type: 'POST',
              	data: {
                	applicant_id: applicant_id
              	},
              	success: function(resdata) {
                	if(resdata.length > 0)
                	{
                    if(resdata[0]['form_status'] == 'incomplete'){
                         this.setState({
                            form_status: 'incomplete'
                          })
                    }else{
                        this.setState({
                            form_status: 'completed'
                        })
                    }

                		$("#form_status").html(resdata[0]['form_status']);
                		$("#admission_registration_number").html(resdata[0]['admission_registration_number']);
                		$("#payment_option").html(resdata[0]['payment_option'])
                		$("#transaction_id").html(resdata[0]['transaction_id']);
                   
                	}else{
                  		
                	}
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });
	  }
      render(){

          let payment_content;
          if(this.state.form_status == 'incomplete')
          {
              payment_content = (
                <ul className="list-group">
                  <li className="list-group-item text-right"><span className="pull-left"><strong className="">Razorpay</strong></span><span><Razorpayment applicantId={applicant_id}/></span></li>
                </ul>  
              ) 
          }else{
              payment_content = (
                  <ul className="list-group">
                   <li className="list-group-item text-right"><span className="pull-left"><strong className="">Payment Status</strong></span><span id="form_status">&nbsp;&nbsp;</span></li>
                   <li className="list-group-item text-right"><span className="pull-left"><strong className="">Transaction Id</strong></span><span id="transaction_id">&nbsp;&nbsp;</span></li>
                   <li className="list-group-item text-right"><span className="pull-left"><strong className="">Payment Options</strong></span><span id="payment_option">&nbsp;&nbsp;</span></li>
                   <li className="list-group-item text-right"><span className="pull-left"><strong className="">Registration Number</strong></span><span id="admission_registration_number">&nbsp;&nbsp;</span></li>
                  </ul> 
              )
          }
      	 return (
      	 	<div className="panel panel-default">
                <div className="panel-heading">Application Payment</div>
                <div className="panel-body">
		                   {payment_content}
                </div>
             </div>
      	 );
      } 
}
class GuardianInfo extends React.Component
{
	  constructor(props) 
	  {
        super(props);
      }
      componentDidMount()
	  {
	  	  	$.ajax({
              	url: base_url+'admin_con/get_guardian',
              	dataType: 'json',
              	type: 'POST',
              	data: {
                	applicant_id: applicant_id
              	},
              	success: function(resdata) {
                	if(resdata.length > 0)
                	{
                		$("#guardian_full_name").html(resdata[0]['guardian_full_name']);
                		$("#relation_to_candidate").html(resdata[0]['relation_to_candidate']);
                		$("#guardian_adhar_card").html(resdata[0]['guardian_adhar_card'])
                		$("#guardian_dob").html(resdata[0]['guardian_dob']);
                		$("#guardian_qualification").html(resdata[0]['guardian_qualification']);
                		$("#guardian_occupation").html(resdata[0]['guardian_occupation']);
                		$("#guardian_mobile").html(resdata[0]['guardian_mobile']);
                		$("#office_address1").html(resdata[0]['office_address1']);
                		$("#city").html(resdata[0]['city']);
                		$("#guardian_email").html(resdata[0]['guardian_email']);
                	}else{
                  		
                	}
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });
	  }
      render(){
      	 return (
      	 	<div className="panel panel-default">
                <div className="panel-heading">Guardian Info</div>
                <div className="panel-body"> 
                	<ul className="list-group">
		                <li className="list-group-item text-right"><span className="pull-left"><strong className="">Fullname</strong></span> <span id="guardian_full_name">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Relation To Candidate</strong></span><span id="relation_to_candidate">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Adhar Card Number</strong></span><span id="guardian_adhar_card">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Birth Date</strong></span><span id="guardian_dob">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Education</strong></span><span id="guardian_qualification">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Occupation</strong></span><span id="guardian_occupation">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Mobile</strong></span><span id="guardian_mobile">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Address</strong></span><span id="office_address1">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">City</strong></span><span id="city">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Email</strong></span><span id="guardian_email">&nbsp;&nbsp;</span></li>
                    </ul>
                </div>
             </div>
      	 );
      } 
}
class FatherInfo extends React.Component
{
	  constructor(props) 
	  {
        super(props);
      } 

      componentDidMount()
	  {
	  	  	$.ajax({
              	url: base_url+'admin_con/get_father',
              	dataType: 'json',
              	type: 'POST',
              	data: {
                	applicant_id: applicant_id
              	},
              	success: function(resdata) {
                	if(resdata.length > 0)
                	{
                		$("#father_full_name").html(resdata[0]['father_full_name']);
                		$("#father_adhar_card").html(resdata[0]['father_adhar_card']);
                		$("#father_dob").html(resdata[0]['father_dob']);
                		$("#father_qualification").html(resdata[0]['father_qualification']);
                		$("#father_occupation").html(resdata[0]['father_occupation']);
                		$("#father_designation").html(resdata[0]['father_designation']);
                		$("#job_transferable").html(resdata[0]['job_transferable']);
                		$("#office_address1").html(resdata[0]['office_address1']);
                		$("#city").html(resdata[0]['city']);
                		$("#father_email").html(resdata[0]['father_email']);
                		$("#father_alumni").html(resdata[0]['father_alumni']);
                	}else{
                  		
                	}
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });
	  }

      render(){
      	 return (
      	 	<div className="panel panel-default">
                <div className="panel-heading">Father Info</div>
                <div className="panel-body"> 
                	<ul className="list-group">
		                <li className="list-group-item text-right"><span className="pull-left"><strong className="">Father Name</strong></span><span id="father_full_name">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Adhar Card</strong></span><span id="father_adhar_card">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Birth Date</strong></span><span id="father_dob">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Education</strong></span><span id="father_qualification">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Occupation</strong></span><span id="father_occupation">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Designation</strong></span><span id="father_designation">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Is Job Transferable</strong></span><span id="job_transferable">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Office Address</strong></span><span id="office_address1">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">City</strong></span><span id="city">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Email</strong></span><span id="father_email">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Whether an Alumni of the school</strong></span><span id="father_alumni">&nbsp;&nbsp;</span></li>
                    </ul>
                </div>
             </div>
      	 );
      } 
}

class MotherInfo extends React.Component
{
	  constructor(props) 
	  {
        super(props);
      }

      componentDidMount()
	  {
	  	  	$.ajax({
              	url: base_url+'admin_con/get_mother',
              	dataType: 'json',
              	type: 'POST',
              	data: {
                	applicant_id: applicant_id
              	},
              	success: function(resdata) {
                	if(resdata.length > 0)
                	{
                		$("#mother_full_name").html(resdata[0]['mother_full_name']);
                		$("#mother_adhar_card").html(resdata[0]['mother_adhar_card']);
                		$("#mother_dob").html(resdata[0]['mother_dob']);
                		$("#mother_qualification").html(resdata[0]['mother_qualification']);
                		$("#mother_occupation").html(resdata[0]['mother_occupation']);
                		$("#mother_designation").html(resdata[0]['mother_designation']);
                		$("#job_transferable").html(resdata[0]['job_transferable']);
                		$("#office_address1").html(resdata[0]['office_address1']);
                		$("#city").html(resdata[0]['city']);
                		$("#mother_email").html(resdata[0]['mother_email']);
                		$("#mother_alumni").html(resdata[0]['mother_alumni']);
                	}else{
                  		
                	}
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });
	  }


      render(){
      	 return (
      	 	<div className="panel panel-default">
                <div className="panel-heading">Mother Info</div>
                <div className="panel-body"> 
                	<ul className="list-group">
		                <li className="list-group-item text-right"><span className="pull-left"><strong className="">Mother Name</strong></span> <span id="mother_full_name">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Adhar Card</strong></span><span id="mother_adhar_card">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Birth Date</strong></span><span id="mother_dob">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Education</strong></span><span id="mother_qualification">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Occupation</strong></span><span id="mother_occupation">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Address /Office Address</strong></span><span id="office_address1">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">City</strong></span><span id="city">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Email</strong></span><span id="mother_email">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Whether an Alumni of the school</strong></span><span id="mother_alumni">&nbsp;&nbsp;</span></li>
                    </ul>
                </div>
             </div>
      	 );
      } 
}

class ChildInfo extends React.Component
{
	  constructor(props) 
	  {
        super(props);
      } 

      componentDidMount()
	  {
	  		$.ajax({
              	url: base_url+'admin_con/get_child',
              	dataType: 'json',
              	type: 'POST',
              	data: {
                	applicant_id: applicant_id
              	},
              	success: function(resdata) {
                	if(resdata.length > 0)
                	{
                		$("#child_firstname").html(resdata[0]['child_firstname']);
                		$("#child_lastname").html(resdata[0]['child_lastname']);
                		$("#child_adhar_card").html(resdata[0]['child_adhar_card']);
                		$("#siblings").html(resdata[0]['siblings']);
                		$("#child_dob").html(resdata[0]['child_dob']);
                		$("#gender").html(resdata[0]['gender']);
                		$("#address_line1").html(resdata[0]['address_line1']);
                		$("#city").html(resdata[0]['city']);
                		$("#pin").html(resdata[0]['pin']);
                		$("#email").html(resdata[0]['email']);
                		$("#child_medical_aware").html(resdata[0]['child_medical_aware']);
                		$("#previous_school_name").html(resdata[0]['previous_school_name']);
                	}else{
                  		
                	}
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });
	  }

      render(){
      	 return (
      	 	<div className="panel panel-default">
                <div className="panel-heading">Child Info</div>
                <div className="panel-body"> 
                	<ul className="list-group">
		                <li className="list-group-item text-right"><span className="pull-left"><strong className="">First Name</strong></span><span id="child_firstname">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Last Name</strong></span><span id="child_lastname">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Adhar Card</strong></span><span id="child_adhar_card">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Siblings (Real brothers / Sisters)</strong></span><span id="siblings">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Birth Date</strong></span><span id="child_dob">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Gender</strong></span><span id="gender">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Address</strong></span><span id="address_line1">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">City</strong></span><span id="city">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Pin</strong></span><span id="pin">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Email</strong></span><span id="email">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Madical Aware</strong></span><span id="child_medical_aware">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Previous School</strong></span><span id="previous_school_name">&nbsp;&nbsp;</span></li>
                    </ul>
                </div>
             </div>
      	 );
      } 
}

class CandidateClass extends React.Component
{
	  constructor(props) 
	  {
        super(props);
      } 

      componentDidMount()
	  {
	  		$.ajax({
              	url: base_url+'admission_con/myclass_name',
              	dataType: 'json',
              	type: 'POST',
              	data: {
                	applicant_id: applicant_id
              	},
              	success: function(resdata) {
                	if(resdata.length > 0)
                	{
                		$("#applicant_classname").html(resdata[0]['class_name']);
                		$("#admission_years").html(resdata[0]['admission_years']);
                	}else{
                  		
                	}
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });	
	  }

      render(){
      	 return (
      	 	<div className="panel panel-default">
                <div className="panel-heading">Candidate Class</div>
                <div className="panel-body">
                	<ul className="list-group">
		                <li className="list-group-item text-right"><span className="pull-left"><strong className="">Selected Class</strong></span><span id="applicant_classname">&nbsp;&nbsp;</span></li>
		                <li className="list-group-item text-right"><span className="pull-left"><strong className="">Years</strong></span><span id="admission_years">&nbsp;&nbsp;</span></li>
                    </ul>
                </div>
             </div>
      	 );
      } 
}

class ApplicantProfile extends React.Component
{
	  constructor(props) 
	  {
        super(props);
      } 
      componentDidMount()
	  {
    		$.ajax({
              	url: base_url+'admin_con/get_applicant',
              	dataType: 'json',
              	type: 'POST',
              	data: {
                	applicant_id: applicant_id
              	},
              	success: function(resdata) {
                	if(resdata.length > 0)
                	{
                		$("#head_applicant_name").html(resdata[0]['applicant_name']);
                		$("#profile_name").html(resdata[0]['applicant_name']);
                  		$("#applicant_name").html(resdata[0]['applicant_name']);
                  		$("#applicant_email").html(resdata[0]['applicant_email']);
                  		$("#profile_email").html(resdata[0]['applicant_email']);
                  		$("#applicant_mobile").html(resdata[0]['applicant_mobile']);
                  		$("#applicant_adhar_card").html(resdata[0]['applicant_adhar_card']);
                  		$("#applicant_password").html('********');
                	}else{
                  		
                	}
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });
      }
      render(){
      	 return (
      	 	<div className="panel panel-default">
                <div className="panel-heading">Applicant Profile</div>
                <div className="panel-body"> 
                	<ul className="list-group">
		                <li className="list-group-item text-right"><span className="pull-left"><strong className="">Applicant name</strong></span><span id="applicant_name">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Email</strong></span><span id="applicant_email">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Mobile</strong></span><span id="applicant_mobile">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Adhar Card</strong></span><span id="applicant_adhar_card">&nbsp;&nbsp;</span></li>
		              	<li className="list-group-item text-right"><span className="pull-left"><strong className="">Password</strong></span><span id="applicant_password">&nbsp;&nbsp;</span></li>
                    </ul>
                </div>
             </div>
      	 );
      }
}

class ProfileInfo extends React.Component 
{

	constructor(props) 
	{
        super(props);
        this.state ={
        	condentLoad: 'profile'
        }
        this.handleSelect = this.handleSelect.bind(this);
    }  
    handleSelect(key)
    {
        //alert(key);
      	this.setState({
      			  		condentLoad: ""+key+""
      	});
    }  
	render(){
   
		//alert(this.props.current_path);
		if(this.state.condentLoad=='myclass' || this.props.current_path=='/class')
		{
			return (
			   <div id="profile_info" className="row">
			      <LeftSide handleSelect={this.handleSelect}/>
	        	  <div className="col-sm-9">
	        	  		<CandidateClass />
	        	  </div>	
			   </div>	
			);
		}else if(this.state.condentLoad=='child' || this.props.current_path=='/candidate'){
			return (
			   <div id="profile_info" className="row">
			      <LeftSide handleSelect={this.handleSelect}/>
	        	  <div className="col-sm-9">
	        	  		<ChildInfo />
	        	  </div>	
			   </div>	
			);
		}else if(this.state.condentLoad=='father' || this.props.current_path=='/father'){
			return (
			   <div id="profile_info" className="row">
			      <LeftSide handleSelect={this.handleSelect}/>
	        	  <div className="col-sm-9">
	        	  		<FatherInfo />
	        	  </div>	
			   </div>	
			);	
		}else if(this.state.condentLoad=='mother' || this.props.current_path=='/mother'){
			return (
			   <div id="profile_info" className="row">
			      <LeftSide handleSelect={this.handleSelect}/>
	        	  <div className="col-sm-9">
	        	  		<MotherInfo />
	        	  </div>	
			   </div>	
			);
		}else if(this.state.condentLoad=='guardian' || this.props.current_path=='/guardian'){
			return (
			   <div id="profile_info" className="row">
			      <LeftSide handleSelect={this.handleSelect}/>
	        	  <div className="col-sm-9">
	        	  		<GuardianInfo />
	        	  </div>	
			   </div>	
			);
		}else if(this.state.condentLoad=='application_payment' || this.props.current_path=='/payment'){
			return (
			   <div id="profile_info" className="row">
			      <LeftSide handleSelect={this.handleSelect}/>
	        	  <div className="col-sm-9">
	        	  		<ApplicationPayment />
	        	  </div>	
			   </div>	
			);
		}else if(this.state.condentLoad=='application_print' || this.props.current_path=='/download'){
			return (
			   <div id="profile_info" className="row">
			      <LeftSide handleSelect={this.handleSelect}/>
	        	  <div className="col-sm-9">
	        	  		<ApplicationPrint />
	        	  </div>	
			   </div>	
			);
		}else if(this.state.condentLoad=='interview_result' || this.props.current_path=='/interview_result'){
			return (
			   <div id="profile_info" className="row">
			      <LeftSide handleSelect={this.handleSelect}/>
	        	  <div className="col-sm-9">
	        	  		<InterviewResult />
	        	  </div>	
			   </div>	
			);
		}else if(this.state.condentLoad=='upload_document' || this.props.current_path=='/upload_doc'){
			return (
			   <div id="profile_info" className="row">
			      <LeftSide handleSelect={this.handleSelect}/>
	        	  <div className="col-sm-9">
	        	  		<UploadDocument />
	        	  </div>	
			   </div>	
			);
		}else if(this.state.condentLoad=='myprofile' || this.props.current_path=='/profile'){
			return (
			   <div id="profile_info" className="row">
			      <LeftSide handleSelect={this.handleSelect}/>
	        	  <div className="col-sm-9">
	        	  	 	<ApplicantProfile />
	        	  </div>	
			   </div>	
			);
		}else if(this.props.current_path=='/new_application'){
      return (
        <div id="profile_info" className="row">
            <LeftSide handleSelect={this.handleSelect}/>
              <div className="col-sm-9">
                <div className="panel panel-default">
                  <div className="panel-heading">Add new Application</div>
                  <div className="panel-body"> 
                    <NewApplication />
                  </div>
                 </div>   
              </div>  
         </div>
      );   
    }else{
			return (
			   <div id="profile_info" className="row">
			      <LeftSide handleSelect={this.handleSelect}/>
	        	  <div className="col-sm-9">
	        	  	 	<ApplicantProfile />
	        	  </div>	
			   </div>	
			);
		}	
	}
}

NewApplication.childContextTypes = {
  muiTheme: React.PropTypes.object
};


export default ProfileInfo;