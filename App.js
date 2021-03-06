import React, { Component } from 'react';

import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {LinearGradient} from 'expo';

import { Constants } from 'expo';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const BACON_IPSUM =
    'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const CONTENT = [
  {
    title: 'Company Basics',
    content: BACON_IPSUM,
  },
  {
    title: 'Data Numbers',
    content: BACON_IPSUM,
  },
  {
    title: 'What Analysts Say',
    content: BACON_IPSUM,
  },
  {
    title: 'What People Say',
    content: BACON_IPSUM,
  },
  {
    title: 'More Info',
    content: BACON_IPSUM,
  },
];

const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Third',
    value: 2,
  },
  {
    title: 'None',
  },
];

export default class App extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (

        <Animatable.View
            duration={400}
            style={[styles.header, isActive ? styles.active : styles.inactive]}
            transition="backgroundColor">

          <Text style={styles.headerText}>
            {section.title}
          </Text>
        </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
        <LinearGradient
            colors={['#89f7fe', '#66a6ff']}>
        <Animatable.View
            duration={400}
            style={[styles.content, isActive ? styles.active : styles.inactive]}
            transition="backgroundColor">

          <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
            {section.content}
          </Animatable.Text>

        </Animatable.View>
        </LinearGradient>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
        <View style={styles.container}>

          <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
            <Text style={styles.title}>Welcome to Bread</Text>

            <View style={styles.multipleToggle}>
              <Text style={styles.multipleToggle__title}>Multiple Select?</Text>
              <Switch
                  value={multipleSelect}
                  onValueChange={multipleSelect =>
                      this.setState({ multipleSelect })
                  }
              />
            </View>


            {/*<View style={styles.selectors}>
              <Text style={styles.selectTitle}>Select:</Text>

              {SELECTORS.map(selector => (
                  <TouchableOpacity
                      key={selector.title}
                      onPress={() => this.setSections([selector.value])}
                  >
                    <View style={styles.selector}>
                      <Text
                          style={
                            activeSections.includes(selector.value) &&
                            styles.activeSelector
                          }
                      >
                        {selector.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
              ))}
            </View>*/}

            {/*<TouchableOpacity onPress={this.toggleExpanded}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Single Collapsible</Text>
              </View>
            </TouchableOpacity>*/}

            <Collapsible collapsed={this.state.collapsed} align="center">

              <View style={styles.content}>
                <Text>

                  Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
                  ribs
                </Text>
              </View>

            </Collapsible>

            <Accordion
                activeSections={activeSections}
                sections={CONTENT}
                touchableComponent={TouchableOpacity}
                expandMultiple={multipleSelect}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent}
                duration={400}
                onChange={this.setSections}
            />
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //background of the page
    flex: 1,
    backgroundColor: '#304352',
    paddingTop: Constants.statusBarHeight,

  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
    color:'#fff'

  },
  header: {
    //Single Collapsible Header
    backgroundColor: '#1db954',
    padding: 10,

  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',

  },
  content: {
    padding: 20,
   // backgroundColor: '#fff',
  },
  active: {
    //content background - Active
    //backgroundColor: 'rgba(0,255,255,1)',
  },
  inactive: {
    //unexpanded blocks
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d7d2cc',
    padding:50,
    //backgroundColor: 'rgba(25,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    color:'#fff',
    fontSize: 16,
    marginRight: 8,
  },
});