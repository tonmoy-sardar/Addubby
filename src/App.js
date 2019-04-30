import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './components/navigation';
import Colors from './helpers/Colors';
import { store, persist } from './reducers';
import Home from './components/Home';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
   
  }
  state = {
    ready: false,
  };
  


  // performTimeConsumingTask = async() => {
  //   return new Promise((resolve) =>
  //     setTimeout(
  //       () => { resolve('result') },
  //       2000
  //     )
  //   );
  // }

  // async componentDidMount() {
  //   // Preload data from an external API
  //   // Preload data using AsyncStorage
  //   const data = await this.performTimeConsumingTask();
  
  //   if (data !== null) {
  //     this.setState({ isLoading: false });
  //   }
  // }

  componentDidMount() {
    persist(() => {
      this.setState({ ready: true });
    });
  }

  renderEmpty = () => (
    <View style={styles.container}>
      <Home />
    </View>
  );

  render() {
    const { ready } = this.state;
    if (!ready) return this.renderEmpty();
    // if (this.state.isLoading) {
    //   return <Home />;
    // }
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;

