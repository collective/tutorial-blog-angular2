import { BlogpostPage } from './app.po';

describe('blogpost App', function() {
  let page: BlogpostPage;

  beforeEach(() => {
    page = new BlogpostPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
