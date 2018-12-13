import { UrbanAirshipChannelDTO } from '../dtos/urban-airship-channel.dto';
import { UrbanAirshipChannel } from '../models/urban-airship-channel.model';

export abstract class UrbanAirshipChannelTranslator {
  static translate(dtos: UrbanAirshipChannelDTO[]): UrbanAirshipChannel[] {
    return dtos.map(dto => ({
      channelId: dto.channel_id,
      deviceType: dto.device_type,
      pushAddress: dto.push_address
    } as UrbanAirshipChannel));
  }
}
