import { TestBed, inject } from "@angular/core/testing";

import { appService } from "./app.service";

describe("appService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [appService]
    });
  });

  it("should be created", inject([appService], (service: appService) => {
    expect(service).toBeTruthy();
  }));
});
