import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSecreAdminCrudComponent } from './group-secre-admin-crud.component';

describe('GroupSecreAdminCrudComponent', () => {
  let component: GroupSecreAdminCrudComponent;
  let fixture: ComponentFixture<GroupSecreAdminCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSecreAdminCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSecreAdminCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
