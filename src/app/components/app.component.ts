import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';

import { isNil as _isNil } from 'lodash';

import { UrbanAirshipChannelResponse } from '../models/urban-airship-channel/urban-airship-channel.response';
import { UrbanAirshipChannelTranslator } from '../models/urban-airship-channel/translators/urban-airship-channel.translator';
import { UrbanAirshipDeviceTypes } from '../models/urban-airship-channel/models/urban-airship-channel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly _messageSubject = new Subject<string>();
  private readonly _resultSubject = new Subject<UrbanAirshipChannelResponse>();
  readonly inputFormControlName = 'inputFormControl';
  readonly parserFormGroup: FormGroup;
  readonly message$ = this._messageSubject.asObservable();
  readonly result$ = this._resultSubject.asObservable();

  constructor(formBuilder: FormBuilder
  ) {
    this.parserFormGroup = formBuilder.group({
      [this.inputFormControlName]: ''
    });
  }

  onParseButtonClick() {
    const input = this.parserFormGroup.controls[this.inputFormControlName].value;

    this._resultSubject.next(undefined);
    this._messageSubject.next(undefined);

    if (_isNil(input)) {
      this._messageSubject.next('Input JSON is missing!');
      return;
    }

    try {
      const json: any = JSON.parse(input);
      const result: UrbanAirshipChannelResponse = {
        channels: UrbanAirshipChannelTranslator.translate(json.channels)
          .filter(d => d.deviceType === UrbanAirshipDeviceTypes.iOS && !_isNil(d.pushAddress)),
        nextPageUrl: json.next_page
      };

      this._resultSubject.next(result);
    } catch (e) {
      this._messageSubject.next(e.message);
    }
  }
}
