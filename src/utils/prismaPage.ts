type Page =
  | {
      page: number;
      size: number;
    }
  | undefined
  | null;

const pagination = (page: Page, defaultPage = 0, defaultSize = 100) => {
  if (!page) {
    return {
      take: defaultSize,
      skip: defaultPage,
    };
  }

  return {
    take: page.size,
    skip: page.page * page.size,
  };
};

export default pagination;
