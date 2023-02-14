import { MySelectorComponent } from './my-selector.component';

describe('MySelectorComponent', () => {
  let component: MySelectorComponent;

  beforeEach(() => {
    component = new MySelectorComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default label value', () => {
    expect(component.label).toEqual('');
  });

  it('should set default values array', () => {
    expect(component.values).toEqual([]);
  });

  it('should emit value when sendDataToParant is called', () => {
    const spy = jest.spyOn(component.sendData, 'emit');

    const event = {
      target: { value: 'test' }
    };

    component.sendDataToParant(event as unknown as Event);

    expect(spy).toHaveBeenCalledWith('test');
  });
});