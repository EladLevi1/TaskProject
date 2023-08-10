import { TestBed } from '@angular/core/testing';

import { ChatSocketIoService } from './chatsocket.io.service';

describe('SocketIoService', () => {
  let service: ChatSocketIoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatSocketIoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
