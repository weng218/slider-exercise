import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  percent = 100;

  constructor() { }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded',  () => {
      // Query the element
      const knob:any = document.getElementById('knob');
      const leftSide = knob.previousElementSibling;
      const rightSide = knob.nextElementSibling;

      // The current position of mouse
      let x = 0;
      let y = 0;
      let leftWidth = 0;

      // Handle the mousedown event
      // that's triggered when user drags the knob
      const mouseDownHandler = function (e:any) {
          // Get the current mouse position
          x = e.clientX;
          y = e.clientY;
          leftWidth = leftSide.getBoundingClientRect().width;

          // Attach the listeners to `document`
          document.addEventListener('mousemove', mouseMoveHandler);
          document.addEventListener('mouseup', mouseUpHandler);
      };

      const mouseMoveHandler =  (e:any) => {
          // How far the mouse has been moved
          const dx = e.clientX - x;
          const dy = e.clientY - y;

          const containerWidth = knob.parentNode.getBoundingClientRect().width;
          let newLeftWidth = ((leftWidth + dx) * 100) / containerWidth;
          newLeftWidth = Math.max(newLeftWidth, 0);
          newLeftWidth = Math.min(newLeftWidth, 100);

          leftSide.style.width = `${newLeftWidth}%`;
          this.percent = Math.round(newLeftWidth * 2);

          

          leftSide.style.userSelect = 'none';
          leftSide.style.pointerEvents = 'none';

          rightSide.style.userSelect = 'none';
          rightSide.style.pointerEvents = 'none';
      };

      // Triggered when user drops the knob
      const mouseUpHandler = function () {
          leftSide.style.removeProperty('user-select');
          leftSide.style.removeProperty('pointer-events');

          rightSide.style.removeProperty('user-select');
          rightSide.style.removeProperty('pointer-events');

          // Remove the handlers of `mousemove` and `mouseup`
          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
      };

      // Attach the handler
      knob.addEventListener('mousedown', mouseDownHandler);
  });
  }

  handleClick(event:any): void {
    const knob:any = document.getElementById('knob');
    const leftSide = knob.previousElementSibling;
    const rightSide = knob.nextElementSibling;

    const leftStart = leftSide.getBoundingClientRect().left;
    const containerWidth = knob.parentNode.getBoundingClientRect().width;
    
    const dx = event.clientX - leftStart ;

    let newLeftWidth = (dx * 100) / containerWidth;



    console.log(containerWidth, event.clientX,  leftStart)
    newLeftWidth = Math.max(newLeftWidth, 0);
    newLeftWidth = Math.min(newLeftWidth, 100);

    leftSide.style.width = `${newLeftWidth}%`;
    this.percent = Math.round(newLeftWidth * 2);

  }
  handleInputChange(event:any): void {
    const knob:any = document.getElementById('knob');
    const leftSide = knob.previousElementSibling;
    if (event.target.value < 0 || event.target.value > 200) {
      event.target.value = 100;
      this.percent = 100;
      leftSide.style.width = `${this.percent / 2}%`;
    }else {
      this.percent = event.target.value
      leftSide.style.width = `${this.percent / 2 }%`;
    }
  }

}
