export interface UrbanAirshipChannel {
  channelId: string;
  deviceType: UrbanAirshipDeviceTypes;
  pushAddress: string;
}

export enum UrbanAirshipDeviceTypes {
  iOS = 'ios',
  Android = 'android'
}
