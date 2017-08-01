import { PivotalSportPage } from './app.po';

describe('pivotal-sport App', () => {
  let page: PivotalSportPage;

  beforeEach(() => {
    page = new PivotalSportPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
