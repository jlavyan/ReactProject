import React from 'react';
import {View, Text, Platform} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Icon} from 'native-base';
import DashboardStack from '../AppTabNavigator';
import styles from './styles';

const Drawer = createDrawerNavigator();

const AppDrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeStack"
        component={DashboardStack}
        options={{
          drawerLabel: () => {
            return (
              <View style={styles.drawerLabelContainer}>
                <Icon type="AntDesign" style={styles.icon} name="home" />
                <Text style={styles.drawerLabel}>Medical Application</Text>
              </View>
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

const DrawerContent = (props) => {
  return (
    <View>
      <View style={{height: '100%'}}>
        <View>
          <View style={styles.drawerCloseContainer}>
            <Icon
              type="AntDesign"
              onPress={() => props.navigation.closeDrawer()}
              size={32}
              color={'#f2340f'}
              style={{marginTop: Platform.OS === 'ios' ? 25 : 0}}
              name="close"
            />
          </View>
        </View>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} activeTintColor={'#f2340f'} />
        </DrawerContentScrollView>
      </View>
    </View>
  );
};

export default AppDrawerNavigator;
