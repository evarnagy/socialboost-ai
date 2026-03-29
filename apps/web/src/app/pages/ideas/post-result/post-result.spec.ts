import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostResult } from './post-result';
import { StructuredPost } from '../ideas.service';

describe('PostResult', () => {
  let component: PostResult;
  let fixture: ComponentFixture<PostResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display post data', () => {
    const testPost: StructuredPost = {
      hook: 'Test hook',
      caption: 'Test caption',
      cta: 'Test CTA',
      hashtags: ['test1', 'test2'],
    };
    component.post = testPost;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.post-result')?.textContent).toContain('Test hook');
    expect(compiled.querySelectorAll('.hashtag-tag').length).toBe(2);
  });
});