import { Component, OnInit, ViewChild, ComponentFactoryResolver, Injector, Renderer2 } from '@angular/core';
import { DtPlaceholderDirective } from 'app/demo-components/load-component/dt-placeholder.directive';
import { DisplayTimeComponent } from 'app/demo-components/load-component/display-time/display-time.component';

@Component({
  selector: 'holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.scss']
})
export class HolderComponent implements OnInit {

  @ViewChild(DtPlaceholderDirective) dtPlaceholder: DtPlaceholderDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DisplayTimeComponent);
    const placeholderReference = this.dtPlaceholder.viewContainerRef;

    const textElement1 = this.renderer.createText('text1');
    const textElement2 = this.renderer.createText('text2');

    const nodes = [[textElement1, textElement2]];

    const componentRef = placeholderReference.createComponent(componentFactory, 0, this.injector, nodes);
    componentRef.instance.bgColor = 'yellow';
  }
}
