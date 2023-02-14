import { FormSignComponent } from './form-sign.component';

describe('FormSignComponent', () => {
  let component: FormSignComponent;

  beforeEach(() => {
    component = new FormSignComponent();
  });

  it('should have a cargos property', () => {
    expect(component.cargos).toBeDefined();
    expect(component.cargos instanceof Array).toBeTruthy();
  });

  it('should have a datasCaptured property', () => {
    expect(component.datasCaptured).toBeDefined();
    expect(typeof component.datasCaptured).toEqual('object');
  });

  it('getData should update datasCaptured correctly', () => {
    component.getData('John Doe', 'name');
    component.getData('123 Main St', 'address');
    component.getData('New York', 'city');
    component.getData('Desenvolvedor', 'position');

    expect(component.datasCaptured).toEqual({
      name: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      position: 'Desenvolvedor'
    });
  });

  it('formIsDisabled should return true if any field is empty', () => {
    component.getData('John Doe', 'name');
    component.getData('123 Main St', 'address');
    component.getData('New York', 'city');

    expect(component.formIsDisabled()).toBeTruthy();

    component.getData('Desenvolvedor', 'position');

    expect(component.formIsDisabled()).toBeFalsy();
  });

  it('calledWindow should display an alert with all the data', () => {
    component.getData('John Doe', 'name');
    component.getData('123 Main St', 'address');
    component.getData('New York', 'city');
    component.getData('Desenvolvedor', 'position');

    const spy = jest.spyOn(window, 'alert');
    component.calledWindow();

    expect(spy).toHaveBeenCalledWith(`Nome: John Doe \n Endereço: 123 Main St \n Cidade New York \n Cargo Desenvolvedor`);
  });
});