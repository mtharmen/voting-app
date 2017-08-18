import { Ng4AuthTestPage } from './app.po';

describe('ng4-auth-test App', () => {
  let page: Ng4AuthTestPage;

  beforeEach(() => {
    page = new Ng4AuthTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
