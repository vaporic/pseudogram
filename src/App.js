import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './FileUpload';
import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      user: null,
      pictures: []
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });

    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout() {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha salido`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleUpload (event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/photos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      })
    }, error => {
      console.log(error.message);
    }, () => {
      const record = {
        photoURL: this.state.user.photoURL,
        displayName: this.state.user.displayName,
        image: task.snapshot.downloadURL
      };

      const dbRef = firebase.database().ref('pictures');
      const newPicture = dbRef.push();
      newPicture.set(record);
    });
  }

  renderLoginButton () {
    // Si el usuario está logueado
    if(this.state.user) {
      return (
        <div>
          <img className="avatar" src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola {this.state.user.displayName}!</p>
          <button className="btn" onClick={this.handleLogout}><i className="fa fa-sign-out"></i> Salir</button>
          <FileUpload onUpload={ this.handleUpload } />
          <div className="container">
          {
            this.state.pictures.map(picture => (
                <div className="card card-2">
                  <img src={picture.image} className="img-responsive" />
                  <br/>
                  <div className="text-ctn">
                    <img width="50" className="img-rounded" src={picture.photoURL} alt={picture.displayName} />
                    <br/>
                    <p className="text-card">{picture.displayName}</p>
                  </div>
                </div>
            )).reverse()
          }
          </div>
        </div>
      );
    } else {
      return (
        <button  className="btn" onClick={this.handleAuth}><i className="fa fa-google"></i> Login con Google</button>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Pseudogram</h1>
        </div>
        <p className="App-intro">
          { this.renderLoginButton() }
        </p>
      </div>
    );
  }
}

export default App;
