import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet
    }    
  }

  onFormChange = (event) => {
    if (event.target.name === 'user-name') {
      this.setState({name: event.target.value});
    } else if (event.target.name === 'user-age') {
      this.setState({age: event.target.value});
    } else if (event.target.name === 'user-pet') {
      this.setState({pet: event.target.value});
    }
  }

  onProfileUpdate = (data) => {
    const token = window.localStorage.getItem('token');
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        formInput: {
          name: data.name,
          age: data.age,
          pet: data.pet
        }
      })
    })
    .then(resp => {
      this.props.toggleModal();
      this.props.loadUser({ ...this.props.user, ...data});
    })
    .catch(console.log)
  }

  updateProfile = () => {
    fetch('http://localhost:3000/profile/' + this.props.user.id, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        formInput: {
          name: this.state.name,
          age: this.state.age,
          pet: this.state.pet
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }

  render() {
    const { user, isProfileOpen, toggleModal } = this.props;
    const { name, age, pet } = this.state;
    return (
      <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib" alt="avatar" />   
          <h1>{this.state.name}</h1>
          <h4>Images Submitted: {user.entries}</h4>
          <p>Member since: {new Date(user.joined).toLocaleDateString()}</p>      
          <hr />
          <label className="mt2 fw6" htmlFor="user-name">Name:</label>
          <input 
            className="pa2 ba w-100"
            placeholder={user.name}
            type="text"
            name="user-name"
            id="name"
            onChange={this.onFormChange}
          />
          <label className="mt2 fw6" htmlFor="user-name">Age:</label>
          <input 
            className="pa2 ba w-100"
            placeholder={user.age}
            type="text"
            name="user-age"
            id="age"
            onChange={this.onFormChange}
          />
          <label className="mt2 fw6" htmlFor="user-name">Pet:</label>
          <input 
            className="pa2 ba w-100"
            placeholder={user.pet}
            type="text"
            name="user-pet"
            id="pet"
            onChange={this.onFormChange}
          />
          <div className='mt4' style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              onClick={() => this.onProfileUpdate({ name, age, pet })}>
              Save
            </button>
            <button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20" 
              onClick={toggleModal}>
              Cancel
            </button>
          </div>
        </main>
        <div className="modal-close" onClick={toggleModal}>&times;</div>
      </article>


      </div>
    )

  }

}

export default Profile;