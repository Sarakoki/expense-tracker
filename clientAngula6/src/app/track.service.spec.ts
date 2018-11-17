import { TestBed, inject } from "@angular/core/testing";

import { trackService } from "./track.service";

describe("trackService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [trackService]
    });
  });

  it("should be created", inject([trackService], (service: trackService) => {
    expect(service).toBeTruthy();
  }));
});
