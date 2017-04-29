import { TreegalaxyPage } from './app.po';

describe('treegalaxy App', () => {
  let page: TreegalaxyPage;

  beforeEach(() => {
    page = new TreegalaxyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
