import React , { Component } from 'react';
import  { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

    state = {   email: '', 
                pass: '', 
                error: '', 
                loading: false 
            };


    onButtonPress() {
        const { email,  pass } = this.state;
        this.setState( {error: '', loading: true} );
        
        firebase.auth().signInWithEmailAndPassword(email, pass)
                .then( ()=> {                                                            
                                this.onLoginSuccess.bind(this) 
                            }
                    )
                .catch( () => {
                    firebase.auth().createUserWithEmailAndPassword(email,pass)
                        .then(      //this.onLoginSuccess.bind(this) 
                                    ()=> {                                                
                                            this.onLoginSuccess.bind(this) 
                                        }
                                )
                        .catch(
                            this.onLoginFail.bind(this)                                           
                        );
                });
    }

    onLoginFail() {
        this.setState({ 
                error: 'auth is failed!',
                loading: false
                        });
    }

    onLoginSuccess() {
        this.setSatete({ 
            email: '',
            pass: '',            
            loading:false,
            error : ''
                        });
    }

    renderButton() {

        if (this.state.loading) {
            return (
                <Spinner size="small" />
            );
        }

        return (
            <Button 
                text="Login" 
                onPress={this.onButtonPress.bind(this)} />                                     
        );

    };

    render() {
        return (
            <Card>
                <CardSection>
                    <Input                        
                        placeHolder="Enter email"
                        labelText="Email"
                        value={ this.state.email}
                        onChangeText={ email=> this.setState({ email}) }
                    />
                    
                </CardSection>

                <CardSection>
                    <Input  
                        secureTextEntry                      
                        placeHolder="password"
                        labelText="Pass"
                        value={ this.state.pass}
                        onChangeText={ pass=> this.setState({ pass}) }
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    { this.state.error }
                </Text>

                <CardSection>
                    {this.renderButton() }
                </CardSection>

            </Card>
        );
    }
}


const styles = {
    errorTextStyle : {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm;