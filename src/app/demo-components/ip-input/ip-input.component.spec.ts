import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpInputComponent } from './ip-input.component';
import { ViewChild, Component } from '@angular/core';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(IpInputComponent) ipInputComponent: IpInputComponent;
}

describe('IpInputComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, IpInputComponent]
    });
  }));


  describe('mode', () => {
    it('should use ipv4 as default mode', () => {
      fixture = createGenericTestComponent(`
        <ip-input></ip-input>
      `, TestComponent);

      component = fixture.componentInstance;
      expect(component.ipInputComponent.mode).toBe('ipv4');
    });


    it('should be specified to ipv6', () => {
      fixture = createGenericTestComponent(`
        <ip-input mode='ipv6'></ip-input>
      `, TestComponent);

      component = fixture.componentInstance;
      expect(component.ipInputComponent.mode).toBe('ipv6');
    });
  });


  describe('layout', () => {

    it('should contains 4 blocks for ipv4', () => {
      fixture = createGenericTestComponent(`
        <ip-input></ip-input>
      `, TestComponent);

      component = fixture.componentInstance;

      const inputBlocks = fixture.debugElement.queryAll(By.css('.ip-input-block'));
      expect(inputBlocks.length).toBe(4);
    });

    it('should contains 8 blocks for ipv6', () => {
      fixture = createGenericTestComponent(`
        <ip-input mode="ipv6"></ip-input>
      `, TestComponent);

      component = fixture.componentInstance;

      const inputBlocks = fixture.debugElement.queryAll(By.css('.ip-input-block'));
      expect(inputBlocks.length).toBe(8);
    });

    it('should contains seprates for ipv4', () => {
      fixture = createGenericTestComponent(`
        <ip-input></ip-input>
      `, TestComponent);

      component = fixture.componentInstance;

      const seps = fixture.debugElement.queryAll(By.css('.ip-input-sep'));
      expect(seps.length).toBe(3);

      const sep = fixture.debugElement.query(By.css('.ip-input-sep')).nativeElement;
      expect(sep.textContent).toBe('.');
    });

    it('should contains seprates for ipv6', () => {
      fixture = createGenericTestComponent(`
        <ip-input mode="ipv6"></ip-input>
      `, TestComponent);

      component = fixture.componentInstance;

      const seps = fixture.debugElement.queryAll(By.css('.ip-input-sep'));
      expect(seps.length).toBe(7);

      const sep = fixture.debugElement.query(By.css('.ip-input-sep')).nativeElement;
      expect(sep.textContent).toBe(':');
    });
  });

});
