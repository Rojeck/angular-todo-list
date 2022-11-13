import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

 describe('ModalComponent', () => {
   let component: ModalComponent;
   let fixture: ComponentFixture<ModalComponent>;
 
   beforeEach(async () => {
     await TestBed.configureTestingModule({
       declarations: [ ModalComponent ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA]
     })
     .compileComponents();
 
     fixture = TestBed.createComponent(ModalComponent);
     component = fixture.componentInstance;

     fixture.detectChanges();
   });
 
   it('should create', () => {
     expect(component).toBeTruthy();
   });
 });
