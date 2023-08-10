import { TestBed } from '@angular/core/testing';

import { ListSocketIoService } from './listsocket.io.service';

describe('ListsocketService', () => {
  let service: ListSocketIoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListSocketIoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
