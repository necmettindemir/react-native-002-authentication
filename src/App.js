import React, { Component } from 'react';
import { View } from 'react-native';

import firebase from 'firebase';

import { Card,CardSection, Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';



class App extends Component {

    

    state = { loggedIn: null };

    componentWillMount() {

        // for github
		firebase.initializeApp(
        {
                apiKey: 'your-apiKey',
                authDomain: 'your-authDomain',
                databaseURL: 'your-databaseURL',
                projectId: 'your-projectId',
                storageBucket: 'your-storageBucket',
                messagingSenderId: 'your-messagingSenderId',
                appId: 'your-appId'  
        });

        
        firebase.auth().onAuthStateChanged( (user) => {

            if (user)
                this.setState({loggedIn:true});
            else
                this.setState({loggedIn:false});

        });
    }

   

    renderLoginContent() {
        
        switch(this.state.loggedIn) {
            case true:
                    return (
                    <Card>
                        <CardSection>
                          <Button 
                            text="Log Out" 
                            onPress={ () => firebase.auth().signOut() }
                            />  
                        </CardSection>
                    </Card>
                        
                    );
            case false :
                    return (<LoginForm />);
            default : 
                    return (<Spinner size='large' />)
        }

        

        
    }


   
    render () {
        return (
            <View>
                <Header headerText="Authentication Example" />
               
                {this.renderLoginContent()} 
                                                
            </View>
        );
    }
}

export default App;