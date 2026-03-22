import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockPost, MockPostData } from './mock-post';

describe('MockPost', () => {
  let component: MockPost;
  let fixture: ComponentFixture<MockPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockPost]
    }).compileComponents();

    fixture = TestBed.createComponent(MockPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mock post data', () => {
    const mockData: MockPostData = {
      title: 'Példa poszt',
      hook: '„3 dolog, amit a bőröd imádni fog télen ❄️"',
      caption: 'A hideg sárít.',
      cta: 'Foglalj időpontot üzenetben',
      tags: ['#kozmetika', '#szeged'],
      meta: ['1 hook', '1 caption', 'CTA + hashtagek']
    };

    component.data = mockData;
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.mockTitle').textContent;
    expect(title).toContain('Példa poszt');
  });
});
