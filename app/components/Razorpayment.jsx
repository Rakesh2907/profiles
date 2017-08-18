import React from 'react';

export default class Razorpayment extends React.Component {
  state = {
    amount: 20000,
    applicant_id: 0,
    applicant_name: '',
    applicant_email: ''
  };

  constructor(props) {
    super(props)
    this.openCheckout = this.openCheckout.bind(this);
  }
  componentWillReceiveProps(props) 
  {
        $.ajax({
              	url: base_url+'admin_con/get_applicant',
              	dataType: 'json',
              	type: 'POST',
              	data: {
                	applicant_id: props.applicantId
              	},
              	success: function(resdata) {
                	if(resdata.length > 0)
                	{
                		this.setState({
                			applicant_name:resdata[0]['applicant_name'],
                			applicant_email:resdata[0]['applicant_email']
                		});
                	}else{
                  		
                	}
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });
  }
  openCheckout() 
  {
    let options = {
      "key": "rzp_test_aGJAxWa9YiMfra",
      "amount": this.state.amount, // 2000 paise = INR 20, amount in paisa
      "name": "Rakesh Ahirrao",
      "description": "School Admission Process Amount",
      "image": "/your_logo.png",
      "handler": function (response){
        	alert(response.razorpay_payment_id);
        	if(response.razorpay_payment_id)
        	{
	        		$.ajax({
	              	url: base_url+'admission_con/profile_razorpay',
	              	dataType: 'json',
	              	type: 'POST',
	              	data: {
	                	applicant_id: applicant_id,
	                	payment_id:response.razorpay_payment_id
	              	},
	              	success: function(resdata) {
	              		if(resdata.success){
	              			location.reload();
	              		}
	                	
	              }.bind(this),
	              error: function(xhr, status, err) {
	                console.error(err.toString());
	              }.bind(this)  
	          });
        	}
      },
      "prefill": {
        "name": this.state.applicant_name,
        "email": this.state.applicant_email
      },
      "notes": {
        "address": ""
      },
      "theme": {
        "color": "#F37254"
      }
    };
    
    let rzp = new Razorpay(options);
    rzp.open();
  }
  
  render () {
    return (
      <div>
        <button onClick={this.openCheckout}>Pay Rs. {this.state.amount/100}</button> 
      </div>
    )
  }
}