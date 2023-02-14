import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let router: Router;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    });

    component = TestBed.createComponent(HomeComponent).componentInstance;
    router = TestBed.get(Router);
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /sign route', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.gotoFromRegister();
    expect(navigateSpy).toHaveBeenCalledWith(['/sign']);
  });
});

class RouterStub {
  navigate() {}
}