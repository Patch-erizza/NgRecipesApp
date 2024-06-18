import {TagsService} from "./tags.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {TestBed} from "@angular/core/testing";

describe('TagsService', () => {
  const testData: string[] = ['Test Data'];
  let service: TagsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers:[
        TagsService
      ]
    })
    httpClient = TestBed.inject(HttpClient);
    // @ts-ignore
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TagsService);

  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('#getObservableValue should return value from observable', (done: DoneFn) => {

    service.getTags$().subscribe((value) => {
      expect(value).toBe(testData);
      done();
    });

    const req = httpTestingController.expectOne('https://dummyjson.com/recipes/tags');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

})
