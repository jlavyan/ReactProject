import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ScrollView, StatusBar} from 'react-native';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {Button, Text} from 'native-base';
import CardKit from '../../components/CardKit';
import getLogoutClient from '../../functions/loggedOutClient';
import styles from './styles';

import allActions from '../../actions';
import {colors} from '../../globals/styles';

const VitalsKit = () => {
  const [showBtn, setShowBtn] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  const [temperature, setTemperature] = useState(0);
  const [blood, setBlood] = useState(0);
  const [oximeter, setOximeter] = useState(0);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleShowButton = (value) => {
    setShowBtn(value);
    setIsDisable(false);
  };

  const handleSubmit = () => {
    let data = {
      temperature: temperature,
      blood: blood,
      oximeter: oximeter,
      registrationDate: moment(new Date()).format('MM/DD/YYYY'),
    };

    const stranger = getLogoutClient();
    stranger
      .post('/measurements', data)
      .then((response) => {
        dispatch(allActions.measurementActions.loadMeasurements());
        Toast.showWithGravity(
          'Measurements uploaded correctly',
          Toast.LONG,
          Toast.TOP,
        );
        setTimeout(() => {
          navigation.navigate('Vitals', {reload: true});
        }, 1000);
      })
      .catch(function (error) {
        Toast.showWithGravity('Something wrong happend', Toast.LONG, Toast.TOP);
      });
  };

  const processValues = (values, type) => {
    _.isEqual(type, 1)
      ? setTemperature(values[0])
      : _.isEqual(type, 2)
      ? setBlood(values)
      : setOximeter(values);
  };

  return (
    <>
      <StatusBar 
        backgroundColor={colors.white} 
        barStyle="dark-content" />
      <ScrollView style={styles.container}>
        <CardKit
          symbol="°F"
          showButton={handleShowButton}
          type={1}
          message="Waer thermometer view temperature"
          processValues={processValues}
        />
        <CardKit
          symbol="mmHg"
          showButton={handleShowButton}
          type={2}
          message="Wear blood pressure monitor to view blood press"
          processValues={processValues}
        />
        <CardKit
          symbol="% bpm"
          showButton={handleShowButton}
          type={3}
          message="Wear oximeter to view SpO2 and bpm"
          processValues={processValues}
        />
        {showBtn && (
          <Button
            block
            disabled={isDisable}
            onPress={() => handleSubmit()}
            style={styles.btn}>
            <Text style={styles.text}>Complete</Text>
          </Button>
        )}
      </ScrollView>
    </>
  );
};

export default VitalsKit;
