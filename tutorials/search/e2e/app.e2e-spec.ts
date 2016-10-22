import { SearchPage } from './app.po';

describe('search App', function() {
  let page: SearchPage;

  beforeEach(() => {
    page = new SearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
