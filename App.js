import * as React from 'react'
import {useEffect} from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions'
import {ToastAndroid, PermissionsAndroid} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import Main from './Screen/Main'
import Check_Pic from './Screen/Check_Pic'
import Search_Pill from './Screen/Search_Pill'
import Information_Pill from './Screen/Information_Pill'
import Manage_Pill from './Screen/Manage_Pill'
import Nearby_Pharmacies from './Screen/Nearby_Pharmacies'
import Pharmacy_info from './Screen/Pharmacy_info'
const Stack = createStackNavigator();

// 카메라, 내ㆍ외장 스토리지, GPS 권한 요청
async function requestPermission() {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  ]).then((result)=>{
    if (result['android.permission.CAMERA']
    && result['android.permission.WRITE_EXTERNAL_STORAGE']
    && result['android.permission.READ_EXTERNAL_STORAGE']
    && result['android.permission.ACCESS_COARSE_LOCATION']
    && result['android.permission.ACCESS_FINE_LOCATION']
    === 'granted'){
      ToastAndroid.showWithGravity('모든 권한 획득',ToastAndroid.LONG,ToastAndroid.CENTER)
    } else {
      ToastAndroid.showWithGravity('권한 거절',ToastAndroid.LONG,ToastAndroid.CENTER)
    }
  })
}

// 화면 이동을 위한 Stack
export default function App(){
  useEffect(()=>{setTimeout(() => {SplashScreen.hide()}, 2500)})
  
  requestPermission()
  return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'>
          <Stack.Screen name='Main' component={Main} options={{headerShown: false}}/>
          <Stack.Screen name='Check_Pic' component={Check_Pic} options={{headerShown: false}}/>
          <Stack.Screen name='Search_Pill' component={Search_Pill} options={{headerShown: false}}/>
          <Stack.Screen name='Information_Pill' component={Information_Pill} options={{headerShown: false}}/>
          <Stack.Screen name='Manage_Pill' component={Manage_Pill} options={{headerShown: false}}/>
          <Stack.Screen name='Nearby_Pharmacies' component={Nearby_Pharmacies} options={{headerShown: false}}/>
          <Stack.Screen name='Pharmacy_info' component={Pharmacy_info} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}
