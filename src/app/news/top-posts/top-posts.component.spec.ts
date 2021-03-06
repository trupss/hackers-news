import { ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { TopPostsComponent } from './top-posts.component';
import {NewsService} from '../../services/news.service'
import { Observable, of } from 'rxjs';
import  { Pipe, PipeTransform } from '@angular/core';
import {delay} from 'rxjs/operators'


export class NamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    
  }
}
describe('TopPostsComponent', () => {
  let component: TopPostsComponent;
  let fixture: ComponentFixture<TopPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
       ],
      declarations: [ TopPostsComponent ],
      providers:[NewsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should call getPost and return the news object', fakeAsync(() => {
    let fixture = TestBed.createComponent(TopPostsComponent);
    let component = fixture.componentInstance;
    let newsService = fixture.debugElement.injector.get(NewsService);
    let stub = spyOn(newsService,"getNews").and.callFake(()=>{
      return of([]).pipe(delay(300));
    })
  component.getPost("newstories");
  component.showMore();
   expect(component.isLoading).toEqual(true);
   tick(300);
   expect(component.isLoading).toEqual(false);
    expect(component.storyList).toEqual([]);

  }));
});
