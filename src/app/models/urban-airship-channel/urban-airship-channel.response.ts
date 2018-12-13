import { UrbanAirshipChannel } from './models/urban-airship-channel.model';

export interface UrbanAirshipChannelResponse {
  readonly channels: UrbanAirshipChannel[],
  readonly nextPageUrl: string;
}
