import { Pipe, PipeTransform } from '@angular/core';

import { Poll } from './models/poll.model';

@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {
  transform(polls: Poll[], filter: string) {
    return polls.filter(poll => poll.title.toLowerCase().indexOf(filter) > -1)
  }
}
