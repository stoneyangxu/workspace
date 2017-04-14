import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { DtPlaceholderDirective } from 'app/demo-components/load-component/dt-placeholder.directive';
import { DisplayTimeComponent } from 'app/demo-components/load-component/display-time/display-time.component';

@Component({
  selector: 'holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.scss']
})
export class HolderComponent implements OnInit {

  @ViewChild(DtPlaceholderDirective) dtPlaceholder: DtPlaceholderDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DisplayTimeComponent);
    const placeholderReference = this.dtPlaceholder.viewContainerRef;

    const componentRef = placeholderReference.createComponent(componentFactory);
    componentRef.instance.bgColor = 'yellow';
  }
}
