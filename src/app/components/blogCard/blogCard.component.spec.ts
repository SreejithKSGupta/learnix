import {  ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlogCardComponent } from './blogCard.component';

describe('BlogCardComponent', () => {
    let component: BlogCardComponent;
    let fixture: ComponentFixture<BlogCardComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ BlogCardComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BlogCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
