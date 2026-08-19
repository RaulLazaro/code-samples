import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Input, OnInit, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef, @Inject(DOCUMENT) private document, private r: Renderer2) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    let modal = this;

    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    this.document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'app-modal') {
        modal.close();
      }
    });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    this.r.addClass(document.body, 'app-modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('app-modal-open');
    this.r.removeClass(document.body, 'app-modal-open');
  }

}
