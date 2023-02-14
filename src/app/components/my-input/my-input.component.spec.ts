import { MyInputComponent } from './my-input.component';

describe('MyInputComponent', () => {
  let component: MyInputComponent;

  beforeEach(() => {
    component = new MyInputComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit data when sendDataToParent is called', () => {
    const mockData = 'test data';
    const spy = jest.spyOn(component.sendData, 'emit');
    component.sendDataToParent({ target: { value: mockData } } as any);
    expect(spy).toHaveBeenCalledWith(mockData);
  });
});