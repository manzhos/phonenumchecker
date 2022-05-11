// import React, {useState} from 'react';
import React, {Component} from 'react';

export class PhoneForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phonenumber: '',
      code: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value  = target.type==='checkbox' ? target.checked : target.value;
    const name   = target.name;

    this.setState({
      [name]:value
    });
  }

  // handleChange(event) {
  //   console.log('event:', event);
  //   this.setState({phonenumber: event.target.phonenumber, code: event.target.code});
  // }

  getCode() {
    console.log('phonenumber:',this.state.phonenumber);
    try {
        const data = fetch(`http://localhost:5000/phone?phonenumber=${this.state.phonenumber}`)
        console.log('data:', data);
    } catch (e) {}
    // event.preventDefault();
  }

  handleSubmit(event) {
    console.log('phonenumber:',this.state.phonenumber, ' / code:', this.state.code);
    try {
        const data = fetch(`http://localhost:5000/verify?phonenumber=${this.state.phonenumber}&code=${this.state.code}`)
        console.log('data:', data);
    } catch (e) {}
    event.preventDefault();
  }

  render() {
    return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Phone:
              <input type="text" name="phonenumber" value={this.state.phonenumber} onChange={this.handleInputChange} />
            </label>
            <button type="button" onClick={this.getCode()}>Get verification sms</button>
            <div>&nbsp;</div>
            <label>
              Code:
              <input type="text" name="code" value={this.state.code} onChange={this.handleInputChange} />
            </label>
            <input type="submit" value="Check the phone" />
          </form>
        </div>
    )
  }
}
