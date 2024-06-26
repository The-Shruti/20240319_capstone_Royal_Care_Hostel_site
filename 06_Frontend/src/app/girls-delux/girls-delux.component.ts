import { Component, OnInit } from '@angular/core';  
/** 
 * Declare Razorpay as an external variable 
 */
declare var Razorpay: any;

@Component({
  selector: 'pm-girls-delux',
  templateUrl: './girls-delux.component.html',
  styleUrls: ['./girls-delux.component.css']
})
export class GirlsDeluxComponent implements OnInit { 
  paymentId:any 

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Loads the Razorpay SDK asynchronously
   * @returns A promise that resolves when the SDK is loaded successfully
   */
  loadRazorpaySdk() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(false);
      };
      document.body.appendChild(script);
    });
  } 

  /**
   * Handles the payment process using Razorpay
   */
  async payNow() {
    console.log("clicked");
  
    // Ensure the Razorpay SDK is loaded
    try {
      await this.loadRazorpaySdk();
      console.log('Razorpay SDK loaded successfully');
    } catch (error) {
      console.error('Failed to load Razorpay SDK', error);
      return;
    }
  
    // Razorpay SDK is now loaded, proceed with creating Razorpay instance
    const options = {
      // your options here
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 200000,
      name: 'Shruti',
      key: 'rzp_test_rcZDiWvY5D4oKi',
      image: '',
      prefill: {
        name:"Shruti Shrivastav",
        email: 'shrutishrivastav38@gmail.com',
        contact: '8624833069',
      },
      theme: {
        color: '#f37254',
      },
      modal: {
        ondismiss: () => {
          console.log('Payment dismissed');
        },
      },
  
    };
  
    const successCallback = (paymentId: any) => {
      console.log('Payment successful with ID:', paymentId);
    };
  
    const failureCallback = (error: any) => {
      console.error('Payment failed with error:', error);
    };
  
    // Create a new instance of Razorpay
    const rzp = new Razorpay(options);
    rzp.on('payment.success', successCallback);
    rzp.on('payment.failure', failureCallback);
    rzp.open();
  }
}
