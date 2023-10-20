import { Injectable } from '@angular/core';
import { LoginModule } from '../login/login.module';
import { CoreModule } from './core.module';

@Injectable()
export class CustomFieldsService {
  constructor() {
    console.log('Custom Fields service created.');
  }

  getCustomFields() {
    return [
      {
        type: 'TEXT',
        value: 'Some custom field data.',
      },
    ];
  }
}
